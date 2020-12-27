import React, { useState, useCallback, useRef } from "react"
import { Button, Alert, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"

function YoutubeScreen () {
    const [playing, setPlaying] = useState(false)
  
    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false)
        Alert.alert("video has finished playing!")
      }
    }, [])
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev)
    }, [])
  
    return (
      <SafeAreaView style={styles.container}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={"iee2TATGMyI"}
          onChangeState={onStateChange}
        />
        <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})

export default YoutubeScreen