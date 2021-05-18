import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ActivityIndicator, StyleSheet, SafeAreaView, Platform, StatusBar, Image, View, TouchableOpacity, Text, Alert, Share } from 'react-native'

import { WebView } from 'react-native-webview'
import EStyleSheet from 'react-native-extended-stylesheet';

function WebviewScreen(props) {

    console.log(props.route.params.page);

    let jsCode = `
                    setTimeout(function(){
                        document.body.style.background = "black"; 

                        var classes = ["fixed-top", "breadcrumbs", "footer"];
                        for(var j = 0; j < classes.length; j++){
                            var all = document.getElementsByClassName(classes[j]);
                        
                            for (var i = 0; i < all.length; i++) {
                                all[i].style.display = "none";
                            }
                        }

                        var all = document.getElementsByClassName('inner-page');
                        for (var i = 0; i < all.length; i++) {
                            all[i].style.color = 'white';
                        }

                        var all = document.getElementsByClassName('body_text');
                        for (var i = 0; i < all.length; i++) {
                            all[i].style.color = 'white';
                        }
                    }, 50);
                    true; // note: this is required, or you'll sometimes get silent failures
                    `;

    let uri;
    if(props.route.params.page == "terms"){
        uri = "https://flexstream.app/terms.html";
    } else if(props.route.params.page == "privacy"){
        uri = "https://flexstream.app/privacy-policy.html";
    }

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: uri }} 
                javaScriptEnabled={true}
                injectedJavaScript={jsCode} 
                //injectedJavaScript={'alert("hello")'} 
                javaScriptEnabledAndroid={true} 
                onMessage={(event) => {
                    console.log('event: ', event)
                  }}
            />
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

export default WebviewScreen