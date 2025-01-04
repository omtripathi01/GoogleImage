import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet, Platform, PermissionsAndroid, Modal, Dimensions, BackHandler } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import ImageEditor from '@react-native-community/image-editor';
//assets
import SearchIcon from '../../assets/images/search.svg';
//styles
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [latestImage, setLatestImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 100, y: 100, size: 200 });
  const [croppedPreview, setCroppedPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLayout, setImageLayout] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [imageDisplayDimensions, setImageDisplayDimensions] = useState({ width: 0, height: 0 });

  const translateX = useSharedValue(100);
  const translateY = useSharedValue(100);
  const scale = useSharedValue(200);

  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (devices && devices.length > 0) {
      const backDevice = devices.find((dev) => dev.position === 'back');
      setDevice(backDevice || devices[0]);
    }
  }, [devices]);

  useEffect(() => {
    (async () => {
      const permissionGranted = await requestPermissions();
      setHasPermission(permissionGranted);
    })();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (latestImage) {
        setLatestImage(null);
        setCroppedPreview(null);
        return true;
      } else {
        navigation?.goBack();
        return true;
      }
    });

    return () => backHandler.remove();
  }, [latestImage]);

  useEffect(() => {
    if (latestImage) {
      Image.getSize(latestImage, (width, height) => {
        setImageSize({ width, height });

        // Calculate display dimensions maintaining aspect ratio
        const screenRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
        const imageRatio = width / height;
        let displayWidth, displayHeight;

        if (imageRatio > screenRatio) {
          // Image is wider than screen ratio
          displayWidth = SCREEN_WIDTH;
          displayHeight = SCREEN_WIDTH / imageRatio;
        } else {
          // Image is taller than screen ratio
          displayHeight = SCREEN_HEIGHT;
          displayWidth = SCREEN_HEIGHT * imageRatio;
        }

        setImageDisplayDimensions({ width: displayWidth, height: displayHeight });

        // Reset crop position and scale
        translateX.value = displayWidth / 4;
        translateY.value = displayHeight / 4;
        scale.value = Math.min(displayWidth, displayHeight) / 2;

        // Update crop preview immediately after loading image
        updateCropPreview();
      });
    }
  }, [latestImage]);

  const requestAndroidPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      if (granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Camera permission is required');
        return false;
      }

      return true;
    } catch (err) {
      console.warn('Error requesting permissions:', err);
      return false;
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      return await requestAndroidPermissions();
    } else {
      const cameraStatus = await Camera.requestCameraPermission();
      return cameraStatus === 'authorized';
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        setIsLoading(true);
        const photo = await cameraRef.takePhoto({
          qualityPrioritization: 'quality',
          flash: 'off',
          enableAutoRedEyeReduction: true,
          enableAutoStabilization: true,
          quality: 1,
        });
        const imagePath = Platform.OS === 'android' ? 'file://' + photo.path : photo.path;
        setLatestImage(imagePath);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openGallery = async () => {
    try {
      setIsLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });
      if (result.assets?.[0]?.uri) {
        setLatestImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCropDimensions = () => {
    if (!imageSize.width || !imageSize.height || !imageDisplayDimensions.width || !imageDisplayDimensions.height) return null;

    // Calculate scale factors between original and displayed image
    const scaleX = imageSize.width / imageDisplayDimensions.width;
    const scaleY = imageSize.height / imageDisplayDimensions.height;

    // Convert display coordinates to actual image coordinates
    const x = Math.max(0, Math.min(translateX.value * scaleX, imageSize.width - (scale.value * scaleX)));
    const y = Math.max(0, Math.min(translateY.value * scaleY, imageSize.height - (scale.value * scaleY)));

    return {
      offset: {
        x: Math.round(x),
        y: Math.round(y),
      },
      size: {
        width: Math.round(scale.value * scaleX),
        height: Math.round(scale.value * scaleY),
      }
    };
  };

  const updateCropPreview = async () => {
    if (!latestImage) return;

    try {
      const dimensions = calculateCropDimensions();
      if (!dimensions) return;

      if (dimensions.offset.x + dimensions.size.width > imageSize.width) {
        dimensions.size.width = imageSize.width - dimensions.offset.x;
      }
      if (dimensions.offset.y + dimensions.size.height > imageSize.height) {
        dimensions.size.height = imageSize.height - dimensions.offset.y;
      }

      const croppedImageUri = await ImageEditor.cropImage(latestImage, dimensions);
      setCroppedPreview(croppedImageUri?.uri);
    } catch (error) {
      console.error('Error cropping preview:', error);
    }
  };

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      const newX = ctx.startX + event.translationX;
      const newY = ctx.startY + event.translationY;

      // Use display dimensions for bounds
      const minX = 0;
      const maxX = imageDisplayDimensions.width - scale.value;
      const minY = 0;
      const maxY = imageDisplayDimensions.height - scale.value;

      // Constrain movement strictly within image bounds
      translateX.value = Math.max(minX, Math.min(newX, maxX));
      translateY.value = Math.max(minY, Math.min(newY, maxY));
    },
    onEnd: () => {
      runOnJS(updateCropPreview)();
    },
  });

  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      const newScale = ctx.startScale + event.translationY;

      // Use display dimensions for scale constraints
      const maxScale = Math.min(imageDisplayDimensions.width, imageDisplayDimensions.height);
      const minScale = 50; // Minimum crop area size

      if (newScale >= minScale && newScale <= maxScale) {
        scale.value = newScale;

        // Adjust position using display dimensions
        const maxX = imageDisplayDimensions.width - newScale;
        const maxY = imageDisplayDimensions.height - newScale;

        translateX.value = Math.max(0, Math.min(translateX.value, maxX));
        translateY.value = Math.max(0, Math.min(translateY.value, maxY));
      }
    },
    onEnd: () => {
      runOnJS(updateCropPreview)();
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    width: scale.value,
    height: scale.value,
  }));

  const onImageLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setImageLayout(layout);

    // Update display dimensions based on actual layout
    const layoutRatio = layout.width / layout.height;
    const imageRatio = imageSize.width / imageSize.height;

    let displayWidth, displayHeight;
    if (layoutRatio > imageRatio) {
      displayHeight = layout.height;
      displayWidth = layout.height * imageRatio;
    } else {
      displayWidth = layout.width;
      displayHeight = layout.width / imageRatio;
    }

    setImageDisplayDimensions({ width: displayWidth, height: displayHeight });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Camera access is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermissions}>
          <Text style={styles.permissionButtonText}>Grant Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {latestImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: latestImage.toString() }}
            style={styles.fullScreenImage}
            resizeMode="contain"
            onLayout={onImageLayout}
          />
          <View style={styles.overlay}>
            <GestureHandlerRootView style={StyleSheet.absoluteFill}>
              <PanGestureHandler onGestureEvent={panGestureHandler}>
                <Animated.View>
                  <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
                    <Animated.View style={[styles.cropArea, animatedStyle]}>
                      <View style={styles.resizeHandle} />
                    </Animated.View>
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </GestureHandlerRootView>
          </View>

          {croppedPreview && (
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: croppedPreview.toString() }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      ) : (
        <Camera
          ref={setCameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
          enableHighQualityPhotos={true}
        />
      )}

      {!latestImage && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.galleryButton} onPress={openGallery} disabled={isLoading}>
            <View style={styles.emptyThumbnail} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={isLoading}>
            <View style={styles.captureButtonInner} >
              <SearchIcon width={32} height={32} fill={'black'} /></View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
