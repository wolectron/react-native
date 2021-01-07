import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Carousel from '../components/Carousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider'
import Preview from "../components/Preview"

export default function App(props) {
  const videos = [
    {
      id: 'WpIAc9by5iU',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/1a203647be186786d4fed48a881351d1_1920x1080.jpg',
      title: 'Panga',
    },
    {
      id: 'sNPnbI1arSE',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/aceb4497634ae95b03cf09a4d00af8cf_1920x1080.jpg',
      title: 'Tanhaji: The Unsung Warrior',
    },
    {
      id: 'VOgFZfRVaww',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/5ecb0a047063dffc6b03f8d63ca7eb73_1920x1080.jpg',
      title: 'Shimla Mirchi',
    }
  ]

  function navigateContent () {
    props.navigation.navigate('Content')
  }

  function navigateYoutube () {
    props.navigation.navigate('Youtube')
  }

function HomeScreen(props) {
  const windowWidth = useWindowDimensions().width;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <TopCarousel data={videos} title='first' onPress={navigateContent} />
        <Carousel data={videos} title='first' onPress={navigateContent} />
        <Carousel data={videos} title='second' onPress={navigateContent} />
        <Carousel data={videos} title='third' onPress={navigateYoutube} />
        <Carousel data={videos} title='fourth' onPress={navigateYoutube} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    backgroundColor: "#000000",
    height: '100%'
  },
  carousel: {
    flex: 1
  }
})