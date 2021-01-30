import * as React from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import {IconButton} from 'react-native-paper'

export default function Carousel({data, title, onPress, showDelete = false, onDeletePress}) {
  return (
    <View style={styles.container}>
      <Text style={styles.carousel_title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight onPress={() => onPress(item)}>
            <View style={styles.card_template} >
              <Image
              style={styles.card_image}
              source={{
                  uri:
                  item.thumbnail,
              }}
              />
              
            </View>
            </TouchableHighlight>
            <View style={styles.text_container}>
                <Text style={styles.card_title}>{item.title.toUpperCase().substr(0, 30)}</Text>
                {
                    showDelete === true ? (
                        <IconButton
                          icon="trash-can-outline"
                          size={20}
                          style={{marginTop: -5, marginRight: -10}} 
                          onPress={() => onDeletePress(item)}
                        />
                    ) : (
                      <View></View>
                    )
                }
                
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //backgroundColor: '#000000',
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
    //backgroundColor: 'rgba(0,0,0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between'
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