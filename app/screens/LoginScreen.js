import React from 'react'
import { ImageBackground, StyleSheet, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper';
import AppButton from '../components/AppButton'
import { AppTextInput } from '../components/AppTextInput'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'
import { ScrollView } from 'react-native-gesture-handler';
import EStyleSheet from 'react-native-extended-stylesheet';

const axios = require('axios')



function LoginScreen(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [sessionid, setSessionid] = React.useState('')
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const session = useSelector(state => state)
    const dispatch = useDispatch()

    console.log("Session :")
    console.log(session);

    const theme = useTheme();

    function OnLogout(){
        setLoading(true)

        axios.post('https://api.wolectron.com/ott/test1?api=signout', {
            sessionid: session.sessionId,
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                setSessionid(null)
                setLoggedIn(false)
                dispatch(logout(session.org))
                setLoading(false);
                props.navigation.goBack();
            } else {
                Alert.alert(
                    "Logout failed!",
                    response.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  )
            }
          })
          .catch(function (error) {
            console.log(error)
          })
    }

    function OnLogin(){
        console.log(`Login button pressed email=${email}, password=${password}`)
        setLoading(true)
    
        axios.post('https://api.wolectron.com/ott/test1?api=signin', {
            email: email,
            password: password,
            orgid: "flexstream"
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                setSessionid(response.data.sessionid)
                setLoggedIn(true)

                console.log("Logged in!")
                dispatch(login(response.data.sessionid,session.org))
                //login(response.data.sessionid, response.data.orgid)
                props.navigation.goBack();
                setLoading(false)
            } else {
                setLoggedIn(false)
                setLoading(false)
                console.log("Logged in failed !!!!")

                Alert.alert(
                    "Login failed!",
                    response.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  )
            }
          })
          .catch(function (error) {
            setLoading(false)
            console.log(error)
          })
    }

    function OnSignup(){
        props.navigation.navigate('Signup');
    }

    function OnForgotpwd(){
        props.navigation.navigate('Forgotpwd');
    }

    function OnMylists(){
        props.navigation.navigate('Mylist');
    }

    function OnTerms(){
        props.navigation.navigate("Webview", {page: "terms"});
    }

    function OnPrivacy(){
        props.navigation.navigate("Webview", {page: "privacy"});
    }

    console.log(theme);
    return (
        <SafeAreaView 
            style={[styles.background]}
            //source={require("../assets/splashscreen.png")}
            >
                <ScrollView contentContainerStyle={styles.background}>
            {
                loading === true ? (
                    <AppActivityIndicator animating={true}/>
                ) : (
                
                    <View>
                        <Text style={styles.appHeadingText}>
                            Sign In
                        </Text>
                        <Text style={styles.appText}>
                            Enter your email and password to sign in
                            {"\n"}
                        </Text>
                        <AppTextInput label="E-mail" onChange={setEmail} isPassword={false}/>
                        <AppTextInput label="Password" onChange={setPassword} isPassword={true}/>
                        
                        <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnLogin()}><Text>SIGN IN</Text></Button>
                        
                        <TouchableOpacity style={styles.appTouchableOpacity} onPress={() => OnForgotpwd()}>
                            <Text style={{textDecorationLine: 'underline'}}>Forgot password?</Text>
                        </TouchableOpacity>
                        <Text>{"\n"}</Text>
                        
                        <Text style={styles.appTouchableOpacity}>Don't have an account? Sign up for free to get started</Text>
                        
                        <Button mode="contained"  style={styles.appButtonContainer} compact={true} onPress={() => OnSignup()}><Text>SIGN UP FOR FREE</Text></Button>
                    
                        <Text style={styles.appTermsText}>By signing in you agree to our </Text>
                            <View style={styles.appTermsTextView}>
                                
                                <TouchableOpacity style={styles.appTouchableOpacity} onPress={() => OnTerms()}>
                                    <Text style={{textDecorationLine: 'underline'}}>terms of service</Text>
                                </TouchableOpacity> 
                                <Text> and </Text>
                                <TouchableOpacity style={styles.appTouchableOpacity} onPress={() => OnPrivacy()}>
                                    <Text style={{textDecorationLine: 'underline'}}>privacy policy</Text>
                                </TouchableOpacity>  
                            </View>  
                    </View>
                )
            }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        
    },
    appButtonContainer: {
        borderRadius: 15,
        margin: "20rem"
    },
    appButtonText: {
        color: "red",
        fontWeight: "bold",
        alignSelf: "center",
        //textTransform: "uppercase"
    },
    appText:{
        fontSize: "16rem",
        fontWeight: "bold",
        alignSelf: "center",
    },
    appHeadingText:{
        fontSize: "26rem",
        //fontWeight: "bold",
        alignSelf: "center",
        paddingBottom: "20rem",
    },
    appTouchableOpacity:{
        alignSelf: "center"
    },
    appTermsText: {
        paddingTop: "10rem",
        alignSelf: "center"
    },
    appTermsTextView:{
        flexDirection: 'row',
        alignSelf: "center"
    }

})

export default LoginScreen