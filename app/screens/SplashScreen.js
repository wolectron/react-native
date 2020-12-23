import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AppButton from './AppButton';
import LoginScreen from './LoginScreen';

function OnRegister(){
    console.log("Register button pressed");
}

function SplashScreen(props) {
    console.log(props.navigation);
    return (
        <ImageBackground 
            style={styles.background}
            source={require("../assets/splashscreen.png")}>
            <AppButton title="Login" size="sm" backgroundColor="#007bff" onPress={() => {console.log("Login button pressed"); props.navigation.navigate('Login')}}/>
            <AppButton title="Register" size="sm" backgroundColor="#fc5c65" onPress={OnRegister}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    loginButton: {
        width: "70%",
        height: 70,
        backgroundColor: "#fc5c65"
    },

    registerButton: {
        width: "70%",
        height: 70,
        backgroundColor: "#4e4e4e"
    },
})

export default SplashScreen;