import * as React from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'

export default function Carousel({data, title, onPress}) {
  return (
    <View style={styles.container}>
      <Text style={styles.carousel_title}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={onPress}>
          <View style={styles.card_template} >
            <Image
            style={styles.card_image}
            source={{
                uri:
                item.thumbnail,
            }}
            />
            <View style={styles.text_container}>
              <Text style={styles.card_title}>{item.title.toUpperCase().substr(0, 10)+"..."}</Text>
              <Text style={styles.card_subtitle}>{item.id}</Text>
            </View>
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
  carousel_title: {
    color: '#ffffff'
  },
  card_template: {
    width: 150,
    height: 150,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  card_image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 150,
    height: 50,
    bottom: 0,
    paddingVertical: 2,
    backgroundColor: 'rgba(255,255,255, 1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
  },
  card_subtitle:{
    color: 'grey',
    fontSize: 14,
    marginLeft: 10,
  }
})