import React from "react";
import { FlatList, View, Text } from 'react-native';
//styles
import styles from "./styles";
//assets
import Cloudy from '../../../../assets/images/cloudy.svg';

const HorizontalWidget = (props) => {
  const data = Array(3);
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.itemView, { marginStart: index === 0 ? 18 : 0 }]}>
        <Text style={styles.text}>Gurugram</Text>
        <View style={styles.bottomView}>
          <Text style={styles.text}>30°</Text>
          <Cloudy />
        </View>
      </View>
    )
  }
  const getItemLayout = (data, index) => ({
    length: 162,
    offset: 162 * index,
    index
  });
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
    </View>
  )


}

export default HorizontalWidget;