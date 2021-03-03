import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ActivityIndicator, StyleSheet, SafeAreaView, Platform, StatusBar, Image, View, TouchableOpacity, Text, Alert, Share } from 'react-native'
import { AVPlaybackStatus, Video } from 'expo-av'
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

import AddtolistScreen from './AddtolistScreen';

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
            <script type="text/javascript">
                function OnAddToList(msg) {
                    setTimeout(function () {
                        window.ReactNativeWebView.postMessage(msg)
                        /*window.postMessage("AddToList")*/
                    }, 0); // *** here ***
                }
            </script>
            <style>
                body {
                    font-family: 'Cabin Condensed', sans-serif;
                    font-size: 0.9em;
                    background-color: #000000;
                    color: #FFFFFF;
                }
                .title {
                    font-weight: bold;
                    font-size: 3em;
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
                <div class="btn btn-primary fas fa-plus" onclick="OnAddToList('addtolist');"> Add to list</div>
            </div>
        </body>
    </html>
    `

function ContentScreen(props) {
    const [orientationIsLandscape, setOrientationIsLandscape] = useState(false)
    const [ytplaying, setYtplaying] = useState(false)
    const [videourl, setVideourl] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [addtolistModalVisible, setAddtolistModalVisible] = useState(false)
    const [videoFullscreen, setVideoFullscreen] = useState(false)
    const [playerHeight, setPlayerHeight] = React.useState(300);
    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height
    const [playerLoaded, setPlayerLoaded] = useState(false)

    const playImgPaddingLeft = windowWidth/2

    const session = useSelector(state => state)

    const youtubePlayerRef = useRef();

    //console.log(props)
    //console.log(`In contentscreen of ${props.route.params.item.data.title}`);

    function useAsync(asyncFn, param, onSuccess) {
        useEffect(() => {
          let isMounted = true
          asyncFn(param).then(data => {
            if (isMounted) onSuccess(data)
          })
          return () => { isMounted = false }
        }, [asyncFn, onSuccess])
    }

    function OnVideoUrlLoaded(url){
         setVideourl(url);
    }

    function OnLogoutPlay(){
        console.log("OnLogoutPlay")
        setModalVisible(true)
    }

    function OnModalPress(){
        setModalVisible(false);
        props.navigation.navigate('Login');

    }

    function onMessage(event){
        console.log('action result coming from the webview: ', event.nativeEvent.data);
        if("addtolist" === event.nativeEvent.data){
            //props.navigation.navigate('Addtolist', {item:props.route.params.item});
            setAddtolistModalVisible(true);

        }
        //onShare();
    };

    function onError(event){
        console.log('Error result coming from the webview: ', event.nativeEvent);
    };

    
    const onShare = async () => {
        try {
        const result = await Share.share({
            message: 'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
        alert(error.message);
        }
    };
    

    /*
    if(props.route.params.item.data.youtube_videoid === undefined || props.route.params.item.data.youtube_videoid === null || props.route.params.item.data.youtube_videoid === ""){
        useAsync(VideoPlayback, props.route.params.item.data.videoid, OnVideoUrlLoaded)
    } else if(videourl === null){
        setVideourl("youtube")
    }
    */
    
    
    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setYtplaying(false)
      }
    }, [])

    setInterval(function(){
        youtubePlayerRef.current?.getCurrentTime().then(
        currentTime => console.log({currentTime})
      );
    }, 5000);

    // Videoplayback is an async function. It returns a promise.
    if (videourl === null){
        if(props.route.params.item.data.youtube_videoid !== undefined && props.route.params.item.data.youtube_videoid !== null && props.route.params.item.data.youtube_videoid !== "" && videourl !== "youtube"){
            setVideourl("youtube");
        }
        else {
            //useAsync(VideoPlayback, props.route.params.item.data.videoid, OnVideoUrlLoaded);
            VideoPlayback(props.route.params.item.data.videoid).then(url => {

                if (url !== null) {
                    //console.log("Got VideoPlayback response");
                    //console.log(url);
                    setVideourl(url);
                } else {
                  console.log("URL is null");
                  setVideourl("error");
                }
            });
        }
    }

    const updatePlaybackCallback = (status) => {
        if (status.isLoaded) {
            if (!playerLoaded) {
                setPlayerLoaded(true)
            }
        }

        console.log(status);
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                session.sessionState === LOGIN ? (
                videourl === null ? (
                    
                        <AppActivityIndicator animating={true} style={{flex:1, alignItems: "center", justifyContent: 'center', alignSelf: 'center'}}/>
                
                ) : ( videourl === "youtube" ? (
                    <SafeAreaView style={styles.container}>
                        <YoutubePlayer
                            ref={youtubePlayerRef}
                            height={250}
                            play={ytplaying}
                            videoId={props.route.params.item.data.youtube_videoid}
                            onChangeState={onStateChange}
                        />
                        <WebView 
                            source={{ html: props.route.params.item.data.html_content_body }} 
                            onMessage={onMessage}
                        />
                        <Modal 
                                isVisible={addtolistModalVisible} 
                                onBackdropPress={() => setAddtolistModalVisible(false)}
                                onSwipeComplete={() => setAddtolistModalVisible(false)}
                                propagateSwipe={true}
                                style={{
                                    justifyContent: 'flex-end',
                                    margin: 0,
                                    height: 200
                                  }}
                                > 
                    
                                <AddtolistScreen {...props} onClose={() => setAddtolistModalVisible(false)}/>
                            </Modal>
                    </SafeAreaView>
                ) : (
                        <SafeAreaView style={styles.container}>
                            <ActivityIndicator
                                style={!playerLoaded ? styles.video : styles.hideElement}
                                size="large" color="#FFFFFF"
                            />
                            <Video
                                style={playerLoaded ? styles.video : styles.hideElement}
                                source={{ uri: videourl.videourl[0].adaptive_urls[0].url }}
                                posterSource={{uri: props.route.params.item.thumbnail}}
                                posterStyle={styles.poster}
                                usePoster={false}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={true}
                                useNativeControls
                                onPlaybackStatusUpdate={updatePlaybackCallback}
                                onFullscreenUpdate={async (state) => {
                                    if(state.fullscreenUpdate % 2 === 0) {
                                        await ScreenOrientation.lockAsync(
                                            orientationIsLandscape ? ScreenOrientation.OrientationLock.PORTRAIT : ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
                                        )
                                        setOrientationIsLandscape(!orientationIsLandscape)
                                    }
                                }}
                            />

                            <WebView 
                                source={{ html: props.route.params.item.data.html_content_body }} 
                                //source={{html: htmlContent}}
                                javaScriptEnabled={true}
                                onMessage={onMessage}
                            />

                            <Modal 
                                isVisible={addtolistModalVisible} 
                                onBackdropPress={() => setAddtolistModalVisible(false)}
                                onSwipeComplete={() => setAddtolistModalVisible(false)}
                                propagateSwipe={true}
                                style={{
                                    justifyContent: 'flex-end',
                                    margin: 0,
                                    height: 200
                                  }}
                                > 
                    
                                <AddtolistScreen {...props} onClose={() => setAddtolistModalVisible(false)}/>
                            </Modal>
                        </SafeAreaView>
                    ) 
                )
            ): (
                <SafeAreaView style={styles.container}>
                    
                    <Image source={{uri: props.route.params.item.thumbnail}} style={{height: 300, resizeMode: "cover", flex: 1, opacity: 0.6}} onPress={() =>  OnLogoutPlay()}/>
                    <IconButton
                        icon="play-circle-outline"
                        size={40}
                        style={{marginLeft: playImgPaddingLeft-40, marginTop: 150, position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center'}} 
                        onPress={() => OnLogoutPlay()}
                    />

                    <View>
                        <Modal 
                            isVisible={modalVisible} 
                            onBackdropPress={() => setModalVisible(false)}
                            onSwipeComplete={() => setModalVisible(false)}
                            swipeDirection={['down']}
                            propagateSwipe={true}
                            > 

                            <View style={styles.modalcontent}>
                            <Text style={styles.modalcontentTitle}>Please sign in to play. {"\n"}Don't have an account? Sign up for free!</Text>
                            <Button mode="contained" onPress={() => OnModalPress()} dark={true}>SIGN IN</Button>
                            </View>
                        </Modal>
                    </View>
                    
                
                    <WebView 
                        source={{ html: props.route.params.item.data.html_content_body }} 
                        //source={{html: htmlContent}}
                        javaScriptEnabled={true}
                        onMessage={onMessage}
                        onError={onError}
                    />
                
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
    hideElement: {
        display: "none"
    },
    loadingIcon: {
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