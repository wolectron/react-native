import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width; 
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const SLIDER_HEIGHT = ITEM_HEIGHT;



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
        style={styles.carouselView}     
      >
        <Carousel
          ref={(c) => carousel = c}
          data={DATA}
          renderItem={({item}) => _renderItem({item})}
          sliderWidth={SLIDER_WIDTH}
          sliderHeight={SLIDER_HEIGHT}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(i) => setIndex({ i })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
          layoutCardOffset={2}     
        />
        <Carousel
          ref={(c) => carousel = c}
          data={DATA}
          renderItem={({item}) => _renderItem({item})}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(i) => setIndex({ i })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
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