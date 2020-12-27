import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width; 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const SLIDER_HEIGHT = ITEM_HEIGHT;

const images = [
  {
   image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
   desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
 {
   image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
   desc:
     'Red fort in India New Delhi is a magnificient masterpeiece of humans',
 },
 ]

function HomeScreen(props) {
 const [index, setIndex] = React.useState(0);

 const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}

    console.log(index); 
  function _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
      </View>
    );
  }
  
    return (
      <View
        //style={styles.carouselView}     
      >
        
        
        <FlatListSlider 
          data={images}
          width={275}
          onPress={item => alert(JSON.stringify(item))}
          indicatorActiveWidth={40}
          contentContainerStyle={{paddingHorizontal: 16}}
          separatorWidth={25}
          autoscroll={false}
          animation={false}
        />

        <FlatListSlider 
          data={images}
          width={275}
          onPress={item => alert(JSON.stringify(item))}
          indicatorActiveWidth={40}
          contentContainerStyle={{paddingHorizontal: 16}}
          separatorWidth={25}
          autoscroll={false}
          animation={false}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  carouselView:{
      marginTop: 200,
      alignItems: 'flex-start',
  }
});


export default HomeScreen;