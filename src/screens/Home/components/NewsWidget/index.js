import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import SearchIcon from '../../../../assets/images/search.svg';

const NewsWidget = (props) => {
  const navigation = useNavigation()
  const data = Array(5).fill().map((_, index) => ({
    id: index,
    title: `Breaking News Story ${index + 1}`,
    imageUrl: 'https://www.usmagazine.com/wp-content/uploads/2024/12/carey.jpg?crop=0px%2C82px%2C1447px%2C760px&resize=1200%2C630&quality=86&strip=all',
    channelName: `Channel ${index + 1}`,
    postedTime: '2d',
    snippet: `Channel ${index + 1}`
  }));

  const ItemView = (item) => {
    return (
      <View key={item.id} style={[{
        marginVertical: 8,
        borderRadius: 12,
        overflow: 'visible',
        height: 280,
        width: '90%',
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: 16,
      }]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <TouchableOpacity 
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#404246',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.navigate('Search', { initialQuery: item.title })}
          >
            <SearchIcon width={20}height={20} />
          </TouchableOpacity>

          <Text 
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: '#999',
              fontSize: 14,
              marginHorizontal: 12
            }}
          >
            {item.snippet}
          </Text>
          
          <TouchableOpacity 
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{color: 'white', fontSize: 20}}>⋮</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{
            height: 180,
            backgroundColor: '#404246',
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            <Image 
              source={{uri: item.imageUrl}}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12
              }}
              resizeMode="cover"
            />
          </View>

          <View style={{
            padding: 12,
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: 1
          }}>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 4
            }}>
              {item.title}
            </Text>

            <Text style={{
              color: '#999',
              fontSize: 14
            }}>
              {`${item.channelName} • ${item.postedTime}`}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[{ 
      flexDirection: 'column',
      marginTop: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }]}>
      {data.map((item, index) => (
        <>
          {ItemView(item)}
          {index < data.length - 1 && (
            <View style={{
              height: 1,
              backgroundColor: '#2b2d2f',
              width: '100%',
              marginVertical: 12
            }} />
          )}
        </>
      ))}
    </View>
  )
}

export default NewsWidget;