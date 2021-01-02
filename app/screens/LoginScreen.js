import React from 'react'
import { ImageBackground, StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper';
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'

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
    console.log(session)

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
                dispatch(logout())
                props.navigation.navigate('Splash')
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
            password: password
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                setSessionid(response.data.sessionid)
                setLoggedIn(true)

                console.log("Logged in!")
                dispatch(login(response.data.sessionid,response.data.orgid))
                //login(response.data.sessionid, response.data.orgid)
                props.navigation.navigate('Splash')
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

    return (
        <View 
            style={styles.background}
            source={require("../assets/splashscreen.png")}>
            {
                loading === true ? (
                    <AppActivityIndicator animating={true} color="0x0000FF"/>
                ) : (
                    session.sessionState === LOGIN ? (
                        <Button mode="contained" onPress={() => OnLogout()}>SIGN OUT</Button>
                    ) : (
                        <View>
                            <Text style={styles.appHeadingText}>
                                Sign In
                                {"\n"}
                            </Text>
                            <Text style={styles.appText}>
                                Enter your email and password to login
                                {"\n"}
                            </Text>
                            <AppTextInput label="E-mail" onChange={setEmail} isPassword={false}/>
                            <AppTextInput label="Password" onChange={setPassword} isPassword={true}/>
                            <Text>{"\n"}</Text>
                            <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnLogin()}><Text>SIGN IN</Text></Button>
                            <Text>{"\n"}</Text>
                            <TouchableOpacity style={styles.appTouchableOpacity}>
                                <Text style={{textDecorationLine: 'underline'}}>Forgot password?</Text>
                            </TouchableOpacity>
                            <Text>{"\n"}</Text>
                            
                            <Text style={styles.appTouchableOpacity}>If you are a new user, sign up here</Text>
                            <Text>{"\n"}</Text>
                            <Button mode="contained"  style={{borderRadius: 15}} color="lightblue" labelStyle={{color: "#FFFFFFFF"}} compact={true} onPress={() => OnLogin()}><Text>SIGN UP</Text></Button>
                        
                        
                        </View>
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFFFF",
    },
    appButtonContainer: {
        borderRadius: 15
    },
    appButtonText: {
        color: "red",
        fontWeight: "bold",
        alignSelf: "center",
        //textTransform: "uppercase"
    },
    appText:{
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
    },
    appHeadingText:{
        fontSize: 36,
        //fontWeight: "bold",
        alignSelf: "center",
    },
    appTouchableOpacity:{
        alignSelf: "center"
    }

})

export default LoginScreen