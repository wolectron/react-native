import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, Image, View, TouchableOpacity, Text, Alert } from 'react-native'
import { Video } from 'expo-av'
import YoutubePlayer from "react-native-youtube-iframe"
import * as ScreenOrientation from 'expo-screen-orientation'
import { WebView } from 'react-native-webview'
import { useWindowDimensions } from 'react-native'
import VideoPlayback  from '../api/VideoPlayback'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { FontAwesome5 } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import {Button, IconButton, Colors} from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'

const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="initial-scale=1, maximum-scale=1">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;500&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            <style>
                body {
                    font-family: 'Cabin Condensed', sans-serif;
                    font-size: 0.5em;
                    background-color: #000000;
                    color: #FFFFFF;
                }
                .title {
                    font-weight: bold;
                    font-size: 4em;
                }
                ul.play-feature {
                    list-style: none;
                    display: inline;
                    padding: 0px;
                    margin: 0px;
                }
                ul.play-feature li {
                    line-height: 1em;
                    padding: 0px 0.5em;
                    display: inline;
                    font-weight: bold;
                }
                ul.play-feature li:not(:last-child) {
                    border-right: 2px solid #FFF;
                }
            </style>
        </head>
        <body>
            <div class="container-fluid">
                <h1 class="title">Tanhaji</h1>
                <ul class="play-feature">
                    <li>Family</li>
                    <li>Hindi</li>
                    <li>2017</li>
                    <li>U</li>
                    <li>2h:13m:36s</li>
                </ul>
                <br/>
                <br/>
                <p>An ace lawyer fights the case of an abused woman, taking on the village Sarpanch and his gang of conceited party people. Seeing that they...</p>
                <p>
                    <b>Starring:</b>
                    <br/>
                   Nishigandha Wad,Mehal Buch,Sudhir Pandey,Surbhi Kakkar,Ayush Shah,Pooja Dixit,Ragini Dixit
                </p>
                <p>
                    <b>Directed By:</b>
                    <br/>
                    Premraaj, Rajinder Verma
                </p>
                <div class="btn btn-primary fas fa-plus"> Add to list</div>
            </div>
        </body>
    </html>
    `

function ContentScreen(props) {
    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false)
    const [ytplaying, setYtplaying] = useState(false)
    const [videourl, setVideourl] = React.useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const windowWidth = useWindowDimensions().width

    const playImgPaddingLeft = windowWidth/2

    const session = useSelector(state => state)

    console.log(props)

    function useAsync(asyncFn, param, onSuccess) {
        useEffect(() => {
          let isMounted = true
          asyncFn(param).then(data => {
            if (isMounted) onSuccess(data)
          })
          return () => { isMounted = false }
        }, [asyncFn, onSuccess])
    }

    function OnVideoUrlLoaded(videourl){
        if (videourl !== null) {
            console.log(videourl)
        
            setVideourl(videourl)
        } else {
            console.log("videourl is null")
        }
    }

    function OnLogoutPlay(){
        console.log("OnLogoutPlay")
        setModalVisible(true)
    }

    function OnModalPress(){
        setModalVisible(false)
        props.navigation.navigate('Login')

    }

    if(props.route.params.item.data.youtube_videoid === undefined || props.route.params.item.data.youtube_videoid === null || props.route.params.item.data.youtube_videoid === ""){
        useAsync(VideoPlayback, props.route.params.item.data.videoid, OnVideoUrlLoaded)
    } else if(videourl === null){
        setVideourl("youtube")
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
                session.sessionState === LOGIN ? (
                videourl === null ? (
                    
                        <AppActivityIndicator animating={true} style={{position: "absolute", left: 0, right: 0, alignItems: "center", justifyContent: 'center', alignSelf: 'center'}}/>
                
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

                            <WebView source={{ html: htmlContent }}/>
                        </SafeAreaView>
                    ) 
                )
            ): (
                <SafeAreaView style={styles.container}>
                    
                    <Image source={{uri: props.route.params.item.thumbnail}} style={{height: 300, resizeMode: "cover", flex: 1, opacity: 0.6}} onPress={() =>  OnLogoutPlay()}/>
                    <IconButton
                        icon="play-circle-outline"
                        size={40}
                        style={{marginLeft: playImgPaddingLeft-20, marginTop: 140, position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center'}} 
                        onPress={() => OnLogoutPlay()}
                    />

                    <View>
                        <Modal isVisible={modalVisible}>
                            <View style={styles.modalcontent}>
                            <Text style={styles.modalcontentTitle}>Please sign in to play. {"\n"}Don't have an account? Sign up for free!</Text>
                            <Button mode="contained" onPress={() => OnModalPress()} dark={true}>SIGN IN</Button>
                            </View>
                        </Modal>
                    </View>
                    
                
                    <WebView source={{ html: htmlContent }}/>
                
                </SafeAreaView>
                )
            }
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    video: {
        flex: 1
    },
    info: {
        flex: 1
    },
    poster:{
        resizeMode: "cover"
    },
    modalcontent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    modalcontentTitle: {
        fontSize: 18,
        marginBottom: 12,
      },
})

export default ContentScreen