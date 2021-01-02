import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Carousel from '../components/Carousel'

export default function App() {
  const videos = [
    {
      id: 'WpIAc9by5iU',
      thumbnail: 'https://source.unsplash.com/random',
      title: 'Led Zeppelin - Stairway To Heaven',
    },
    {
      id: 'sNPnbI1arSE',
      thumbnail: 'https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg',
      title: 'Eminem - My Name Is',
    },
    {
      id: 'VOgFZfRVaww',
      thumbnail: 'https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg',
      title: 'some title',
    }
  ]

  return (
    <SafeAreaView style={styles.container, styles.background}>
      <ScrollView>
        <Carousel data={videos} title='first' />
        <Carousel data={videos} title='second' />
        <Carousel data={videos} title='third' />
        <Carousel data={videos} title='fourth' />
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