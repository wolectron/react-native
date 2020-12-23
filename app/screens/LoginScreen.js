import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Alert } from 'react-native';
import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
import AppActivityIndicator from '../components/AppActivityIndicator';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'

const axios = require('axios');



function LoginScreen(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [sessionid, setSessionid] = React.useState('');
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const session = useSelector(state => state)
    const dispatch = useDispatch()

    console.log("Session :");
    console.log(session);

    function OnLogout(){
        setLoading(true);

        axios.post('https://api.wolectron.com/ott/test1?api=signout', {
            sessionid: session.sessionId,
          })
          .then(function (response) {
            console.log(response.data);
            if (response.data.status == true) {
                setSessionid(null);
                setLoggedIn(false);

                console.log("Logged out!");
                dispatch(logout());
                props.navigation.navigate('Splash');
            } else {
                
                console.log("Logout failed !!!!");

                Alert.alert(
                    "Logout failed!",
                    response.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function OnLogin(){
        console.log(`Login button pressed email=${email}, password=${password}`);
        setLoading(true);
    
        axios.post('https://api.wolectron.com/ott/test1?api=signin', {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log(response.data);
            if (response.data.status == true) {
                setSessionid(response.data.sessionid);
                setLoggedIn(true);

                console.log("Logged in!");
                dispatch(login(response.data.sessionid,response.data.orgid));
                //login(response.data.sessionid, response.data.orgid);
                props.navigation.navigate('Splash');
            } else {
                setLoggedIn(false);
                setLoading(false);
                console.log("Logged in failed !!!!");

                Alert.alert(
                    "Login failed!",
                    response.data.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
            }
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
    
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
                        <AppButton title="        SIGN OUT      " size="sm" backgroundColor="#0030FF" onPress={() => OnLogout()}/>
                    ) : (
                        <View>
                            <AppTextInput label="E-mail" onChange={setEmail} isPassword={false}/>
                            <AppTextInput label="Password" onChange={setPassword} isPassword={true}/>
                            <AppButton title="        SIGN IN      " size="sm" backgroundColor="#0030FF" onPress={() => OnLogin()}/>
                        </View>
                    )
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e89d51",
    },
})

export default LoginScreen;