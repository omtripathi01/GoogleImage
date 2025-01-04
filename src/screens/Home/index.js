import React, { useRef, useState } from "react";
import { View, Animated, FlatList, Modal, TouchableOpacity, Text, Dimensions } from "react-native";
//styles
import styles from "./styles";
//components
import Header from "./components/Header";
import LogoContainer from "./components/LogoContainer";
import SearchBarContainer from "./components/SearchBarContainer";
import IconList from "./components/IconList";
import NewsWidget from "./components/NewsWidget";
import HorizontalWidget from "./components/HorizontalWidget";

const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeScreen = (props) => {
  const navigation = props.navigation;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const modalScrollY = useRef(new Animated.Value(0)).current;
  
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
    extrapolate: 'clamp'
  });

  const modalMarginTop = modalScrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.1, 0],
    extrapolate: 'clamp'
  });

  const modalMarginHorizontal = modalScrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [32, 16, 0],
    extrapolate: 'clamp'
  });

  const modalBorderRadius = modalScrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [30, 20, 0],
    extrapolate: 'clamp'
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    modalScrollY.setValue(0);
  };

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  const ListHeaderComponent = () => (
    <View>
      <Header onOpenModal={openModal} />
      <LogoContainer />
    </View>
  );

  const renderItem = ({item}) => (
    <View key={item.key} style={{marginTop: 54}}>
      <IconList />
      <HorizontalWidget />
      <NewsWidget />
    </View>
  );

  const modalOptions = Array(20).fill().map((_, i) => ({
    id: i,
    title: `Option ${i + 1}`
  }));

  const renderModalItem = ({ item }) => (
    <TouchableOpacity 
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2b2d2f'
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <AnimatedFlatList
        ListHeaderComponent={ListHeaderComponent}
        data={[{ key: 'content' }]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      
      <Animated.View style={[
        styles.searchBarContainer,
        { 
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          zIndex: 1,
          transform: [{ translateY: searchBarTranslateY }]
        }
      ]}>
        <SearchBarContainer />
      </Animated.View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <Animated.View style={{
            backgroundColor: '#1f2125',
            borderTopLeftRadius: modalBorderRadius,
            borderTopRightRadius: modalBorderRadius,
            flex: 1,
            marginTop: modalMarginTop,
            marginHorizontal: modalMarginHorizontal,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#2b2d2f',
            overflow: 'hidden'
          }}>
            <View style={{
              backgroundColor: '#262829',
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#2b2d2f',
            }}>
              <TouchableOpacity 
                onPress={closeModal}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#303133',
                  borderRadius: 20,
                  marginLeft: 16
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>

            <AnimatedFlatList
              data={modalOptions}
              renderItem={renderModalItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              bounces={true}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: modalScrollY } } }],
                { useNativeDriver: false }
              )}
              decelerationRate="fast"
              scrollEventThrottle={1}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeScreen;