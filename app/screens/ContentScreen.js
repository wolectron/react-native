import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, Image } from 'react-native'
import { Video } from 'expo-av'
import YoutubePlayer from "react-native-youtube-iframe"
import * as ScreenOrientation from 'expo-screen-orientation'
import { WebView } from 'react-native-webview'
import { useWindowDimensions } from 'react-native';
import VideoPlayback  from '../api/VideoPlayback'
import AppActivityIndicator from '../components/AppActivityIndicator'

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
    const [ytplaying, setYtplaying] = useState(false)
    const [videourl, setVideourl] = React.useState(null);
    const windowWidth = useWindowDimensions().width;

    console.log(props);

    function useAsync(asyncFn, param, onSuccess) {
        useEffect(() => {
          let isMounted = true;
          asyncFn(param).then(data => {
            if (isMounted) onSuccess(data);
          });
          return () => { isMounted = false };
        }, [asyncFn, onSuccess]);
    }

    function OnVideoUrlLoaded(videourl){
        if (videourl !== null) {
            console.log(videourl);
        
            setVideourl(videourl);
        } else {
            console.log("videourl is null");
        }
    }

    
    //console.log("videourl is null");
    if(props.route.params.item.data.youtube_videoid === undefined || props.route.params.item.data.youtube_videoid === null || props.route.params.item.data.youtube_videoid === ""){
        useAsync(VideoPlayback, props.route.params.item.data.videoid, OnVideoUrlLoaded);
    } else if(videourl === null){
        setVideourl("youtube");
    }
    
    
    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setYtplaying(false)
      }
    }, [])

    // Videoplayback is an async function. It returns a promise.
    /*
    VideoPlayback(props.route.params.item.data.videoid).then(videourl => {

        if (videourl !== null) {
            console.log(videourl);
        
            setVideourl(videourl);
        } else {
            console.log("videourl is null");
        }
    });
    */

    return (
        <SafeAreaView style={styles.container}>
            {
                videourl === null ? (
                    <AppActivityIndicator animating={true} style={{ alignItems: "center", justifyContent: 'center', flex: 1}}/>
                ) : ( videourl === "youtube" ? (
                    <SafeAreaView style={styles.container}>
                        <YoutubePlayer
                            height={250}
                            play={ytplaying}
                            videoId={props.route.params.item.data.youtube_videoid}
                            onChangeState={onStateChange}
                        />
                        <WebView source={{ html: htmlContent }} />
                    </SafeAreaView>
                ) : (
                        <SafeAreaView style={styles.container}>
                            <Video
                                style={styles.video}
                                source={{ uri: videourl.videourl[0].adaptive_urls[0].url }}
                                posterSource={{uri: props.route.params.item.thumbnail}}
                                posterStyle={styles.poster}
                                usePoster={false}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
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
                )
            }
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
    },
    poster:{
        resizeMode: "cover"
    }
})

export default ContentScreen