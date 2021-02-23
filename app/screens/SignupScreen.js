import React from 'react'
import { ImageBackground, StyleSheet, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper';
import AppButton from '../components/AppButton'
import { AppTextInput } from '../components/AppTextInput'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'

const axios = require('axios')

function SignupScreen(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [isSignedUp, setSignedUp] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const session = useSelector(state => state)

    console.log("Session :")
    console.log(session)

    function OnSignup(){
        console.log(`Signup button pressed email=${email}, password=${password}`)
        setLoading(true)

        if (password !== confirmPassword) {
            setSignedUp(false);
            setLoading(false);
            console.log("Password and confirm password do not match!");

            Alert.alert(
                "Error",
                "Password and confirm password do not match!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              )

            return;
        }
    
        axios.post('https://api.wolectron.com/ott/test1?api=newuser', {
            email: email,
            password: password,
            org: "flexstream"
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                setSignedUp(true)

                console.log("Signed up!")
                
                props.navigation.goBack();
                setLoading(false)
            } else {
                setSignedUp(false)
                setLoading(false)
                console.log("Sign up failed !!!!")

                Alert.alert(
                    "Sign up failed!",
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
        <SafeAreaView 
            style={styles.background}
            source={require("../assets/splashscreen.png")}>
            {
                loading === true ? (
                    <AppActivityIndicator animating={true}/>
                ) : (
                    
                        <View>
                            <Text style={styles.appHeadingText}>
                                Sign Up for a free account
                                {"\n"}
                            </Text>
                            <Text style={styles.appText}>
                                Enter your email and password to sign up
                                {"\n"}
                            </Text>
                            <AppTextInput label="E-mail" onChange={setEmail} isPassword={false}/>
                            <AppTextInput label="Password" onChange={setPassword} isPassword={true}/>
                            <AppTextInput label="Confirm password" onChange={setConfirmPassword} isPassword={true}/>
                            <Text>{"\n"}</Text>
                            <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnSignup()}><Text>SIGN UP</Text></Button>        
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
        fontSize: 34,
        //fontWeight: "bold",
        alignSelf: "center",
    },
    appTouchableOpacity:{
        alignSelf: "center"
    }

})

export default SignupScreen