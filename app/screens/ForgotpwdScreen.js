import React from 'react'
import { ImageBackground, StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper';
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'

const axios = require('axios')

function ForgotpwdScreen(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [otp, setOtp] = React.useState('')
    const [otpSent, setOtpSent] = React.useState(false)
    const [sessionid, setSessionid] = React.useState('')
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const session = useSelector(state => state)
    const dispatch = useDispatch()

    console.log("Session :")
    console.log(session)

    function OnForgotPassword(){
        setLoading(true)

        axios.post('https://api.wolectron.com/ott/test1?api=forgotpassword', {
            email: email,
          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                setOtpSent(true);
                setLoading(false);
            } else {
                setLoading(false);
                Alert.alert(
                    "Failed to send OTP to email!",
                    response.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  )
            }
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
          })
    }

    function OnResetPassword(){
        console.log(`Reset password email=${email}, otp=${otp} password=${password}`)
        setLoading(true)

        if (password !== confirmPassword) {
            setLoading(false);
            console.log("Password and confirm password do not match!");

            Alert.alert(
                "Error",
                "New Password and confirm new password do not match!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              )

            return;
        }
    
        axios.post('https://api.wolectron.com/ott/test1?api=resetpassword', {
            email: email,
            pwd_reset_code: otp,
            new_password: password,

          })
          .then(function (response) {
            console.log(response.data)
            if (response.data.status == true) {
                
                setOtpSent(false)

                console.log("Password reset successfully!")
                Alert.alert(
                    "Success",
                    "Password reset successfully",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  )
                
                props.navigation.navigate('Login')
                setLoading(false)
            } else {
                
                setLoading(false)
                setOtpSent(false)
                console.log("Failed to reset password!")

                Alert.alert(
                    "Failed to reset password",
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
                    otpSent == false ? (
                        <View>
                            <Text style={styles.appHeadingText}>
                                Forgot password
                                {"\n"}
                            </Text>
                            <Text style={styles.appText}>
                                Enter your email to continue
                                {"\n"}
                            </Text>
                            <AppTextInput label="E-mail" onChange={setEmail} isPassword={false}/>
                            <Text>{"\n"}</Text>
                            <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnForgotPassword()}><Text>Get OTP</Text></Button>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.appHeadingText}>
                                Reset password
                                {"\n"}
                            </Text>
                            <Text style={styles.appText}>
                                Enter OTP and new password 
                                {"\n"}
                            </Text>
                            <AppTextInput label="OTP" onChange={setOtp} isPassword={false}/>
                            <AppTextInput label="New Password" onChange={setPassword} isPassword={true}/>
                            <AppTextInput label="Confirm new password" onChange={setConfirmPassword} isPassword={true}/>
                            <Text>{"\n"}</Text>
                            <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnResetPassword()}><Text>Reset Password</Text></Button>
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

export default ForgotpwdScreen