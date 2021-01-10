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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => onPress(item)}>
          <View style={styles.card_template} >
            <Image
            style={styles.card_image}
            source={{
                uri:
                item.thumbnail,
            }}
            />
            <View style={styles.text_container}>
              <Text style={styles.card_title}>{item.title.toUpperCase().substr(0, 30)}</Text>
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
    //paddingTop: Constants.statusBarHeight,
  },
  carousel_title: {
    color: '#ffffff',
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  card_template: {
    width: 160,
    height: 140,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  card_image: {
    width: 160,
    height: 90,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 160,
    height: 50,
    bottom: 0,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0, 1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  card_subtitle:{
    color: 'grey',
    fontSize: 14,
    marginLeft: 10,
  }
})