import React from "react";
import { Image, TouchableWithoutFeedback, View, } from 'react-native';

import styles from "./styles";
//assests
import Filter from '../../../../assets/images/filter.svg'


const Header = (props) => {

  return (
    <View style={styles.container}>
      <Filter />
      <TouchableWithoutFeedback onPress={props.onOpenModal}>
      <Image
        source={require('../../../../assets/images/account.png')}
        style={styles.image}
      />
      </TouchableWithoutFeedback>
    </View>
  )


}

export default Header;