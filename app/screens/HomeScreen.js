import React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider'
import Preview from "../components/Preview"

const images = [
  {
   image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
   desc: 'Silent Waters in the mountains in midst of Himalayas',
  },
  {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  }
 ]

function HomeScreen(props) {
  const windowWidth = useWindowDimensions().width;
  return (
    <SafeAreaView style={styles.container}>
      <FlatListSlider
            data={images}
            imageKey={'image'}
            local={false}
            width={windowWidth}
            separator={0}
            loop={true}
            autoscroll={false}
            currentIndexCallback={index => console.log('Index', index)}
            onPress={item => props.navigation.navigate('Content')}
            indicator
            animation
          />
      <FlatListSlider
        data={images}
        width={160}
        height={90}
        component={<Preview />}
        onPress={item => props.navigation.navigate('Content')}
        contentContainerStyle={{paddingHorizontal: 16}}
        autoscroll={false}
        indicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})

export default HomeScreen