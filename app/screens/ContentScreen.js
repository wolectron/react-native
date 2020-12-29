import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import { WebView } from 'react-native-webview'

const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <h1>This section is for rendering content information</h1>
        </body>
    </html>
    `

function ContentScreen(props) {
    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <Video
                style={styles.video}
                source={{ uri: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={{ flex: 1 }}
                useNativeControls
                onFullscreenUpdate={async (state) => {
                    if(state.fullscreenUpdate % 2 === 0) {
                        await ScreenOrientation.lockAsync(
                            orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
                        )
                        setOrientationIsLandscape(!orientationIsLandscape)
                    }
                }}
            />
            <WebView source={{ html: htmlContent }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    video: {
        flex: 1
    },
    info: {
        flex: 1
    }
})

export default ContentScreen