import React from "react";

import { View, } from 'react-native';
//styles
import styles from "./styles";
//assets
import ImageSearchIcon from '../../../../assets/images/imageSearch.svg';
import TranslateIcon from '../../../../assets/images/translateText.svg';
import KnowledgeIcon from '../../../../assets/images/knowlegde.svg';
import MusicNote from '../../../../assets/images/musicNote.svg';

const IconList = (props) => {
  const iconsList = [
    {
      name: 'ImageSearch',
      icon: <ImageSearchIcon />,
      backgroundColor: "#4d4430"
    },
    {
      name: 'Translate',
      icon: <TranslateIcon />,
      backgroundColor: "#363f4e"
    },
    {
      name: 'Knowledge',
      icon: <KnowledgeIcon />,
      backgroundColor: "#33423a"
    },
    {
      name: 'MusicNote',
      icon: <MusicNote />,
      backgroundColor: "#483034"
    },
  ]


  return (
    <>
      <View style={styles.container}>
        {iconsList.map((item) => {
          return (
            <View key={item?.name} style={[{ backgroundColor: item?.backgroundColor,  }, styles.itemContainer]}>
              {item?.icon}
            </View>
          )
        })}
      </View>
      <View style={styles.seperator} />
    </>
  )


}

export default IconList;