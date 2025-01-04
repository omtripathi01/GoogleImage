import React, { useState } from "react";
import { View, Text, Pressable } from 'react-native';
//styles
import styles from "./styles";
//assets
import SearchIcon from '../../../../assets/images/search.svg';
import Mic from '../../../../assets/images/mic.svg';
import Camera from '../../../../assets/images/camera.svg';
import { useNavigation } from "@react-navigation/native";

const SearchBarContainer = (props) => {
  const navigation = useNavigation();
  const [pressedIcon, setPressedIcon] = useState(null);

  const handlePressIn = (iconName) => {
    setPressedIcon(iconName);
    if(iconName === 'camera') navigation.navigate('Camera')
  };

  const handlePressOut = () => {
    setPressedIcon(null);
  };

  const navigateToSearchScreen = () => {
    navigation.navigate('Search')
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchIcon />
        <Pressable onPress={navigateToSearchScreen} style={styles.searchTextView}>
          <Text style={styles.serachText}>Search</Text>
        </Pressable>
        <Pressable
          onPressIn={() => handlePressIn('mic')}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.micIconContainer,
            pressed || pressedIcon === 'mic' ? styles.iconPressed : null,
          ]}
        >
          <Mic />
        </Pressable>
        <Pressable
          onPressIn={() => handlePressIn('camera')}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.iconContainer,
            pressed || pressedIcon === 'camera' ? styles.iconPressed : null,
          ]}
        >
          <Camera />
        </Pressable>
      </View>
    </View>
  )


}

export default SearchBarContainer;