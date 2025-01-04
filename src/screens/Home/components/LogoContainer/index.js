import React from "react";

import { Image, View, } from 'react-native';
import styles from "./styles";


const LogoContainer = (props) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/googlelogo.png')}
        style={styles.image}
      />
    </View>
  )


}

export default LogoContainer;