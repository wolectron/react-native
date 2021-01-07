import * as React from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import { useWindowDimensions } from 'react-native';



export default function TopCarousel({data, title, onPress}) {
    const windowWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={onPress}>
          <View style={[styles.card_template,{width: windowWidth-20}]} >
            <Image
            style={[styles.card_image,{width: windowWidth-20}]}
            source={{
                uri:
                item.thumbnail,
            }}
            />
          </View>
          </TouchableHighlight>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 8,
    paddingTop: Constants.statusBarHeight,
  },
  card_template: {
    height: 270,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  card_image: {
    height: 270,
    borderRadius: 10,
  }
})