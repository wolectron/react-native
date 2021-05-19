import React, { useState, useEffect, useCallback } from 'react'
import { ImageBackground, StyleSheet, View, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Text, useTheme, Menu, List, DefaultTheme } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import AppButton from '../components/AppButton'
import {AppTextInput, AppTextInputSmall} from '../components/AppTextInput'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, LOGIN, LOGOUT } from '../redux/sessionApp'

import {Picker, PickerIOS} from '@react-native-picker/picker';

const axios = require('axios')



function AddtolistScreen(props) {
    const [userList, setUserlist] = React.useState([]);
    const [newList, setNewlist] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [pickerValue, setPickerValue] = React.useState("java");

    const session = useSelector(state => state)

    console.log("Session :")
    console.log(session);

    const theme = useTheme();

    console.log(`In AddtolistScreen for ${props.route.params.item.data.title}`);

    const openMenu = () => setMenuVisible(true);

    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        function GetUserList(){
            setLoading(true);

            console.log(`GetUserList ${session.sessionId}`);
    
            axios.get(`https://api.wolectron.com/ott/test1?api=userlist&sessionid=${session.sessionId}`).then(function (response){
            console.log(response.data.lists.length);  
            if(response.data.success === true){
                    let userlists = [];
                    for(let i=0;i<response.data.lists.length;i++){
                        userlists.push(response.data.lists[i].title);
                    }
                    console.log(`userlists ${userlists}`);

                    setPickerValue(userlists[0]);
                    setUserlist(userlists);
                }

                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            })
        }

        console.log(`In useeffect ${session.sessionState}`);

        if (session.sessionState === LOGIN){
            GetUserList();
        }

        return () => {
          
        };
    }, [session]); // Only run when session changes

    console.log(`userlist ${userList}`);

    function GetMenuItems(){
        console.log("GetMenuItems");
        if(userList !== null){
            return userList.map((list) => {
                return (
                    <Menu.Item onPress={() => {}} title={list} />
                );
            })
        }
    }

    function OnAddToList(){
        setLoading(true)

        let listname = newList;
        
        if (newList === "") {
            listname = pickerValue;
        }

        console.log(`Adding to list ${listname}`);

        axios.put('https://api.wolectron.com/ott/test1?api=userlistitem', {
            sessionid: session.sessionId,
            title: listname,
            display_title: listname,
            contentid: props.route.params.item.data.contentid,
          })
          .then(function (response) {
            console.log(response);
            setLoading(false);
            props.onClose();
          })
          .catch(function (error) {
            console.log(error)
            setLoading(false);
          })
    }

    return (
        <SafeAreaView 
            style={[styles.background]}>
            {
                loading === true ? (
                    <AppActivityIndicator animating={true}/>
                ) : (
                    session.sessionState === LOGOUT ? (
                        <View>
                            <Text style={styles.appText}>
                                Sign in to add content to your list
                                {"\n"}
                            </Text>
                            <Button mode="contained" onPress={() => props.navigation.navigate('Login')}><Text>SIGN IN</Text></Button>
                        </View>
                    ) : (
                        <View style={{marginBottom: 20}}>
                            
                            
                                    <Text style={[styles.appText,{marginTop: 20}]}>Select from existing list</Text>
                                    {
                                        /*
                                        userList.map((list) => {
                                            return (
                                                <List.Item title={list} key={list} right={props => <List.Icon {...props} icon="plus" style={{color:'black'}} color='black'/>} titleStyle={{color: 'black'}}onPress={() => OnAddToList(list)}/>
                                            );
                                        })
                                        */

                                    }
                                    <Picker
                                        selectedValue={pickerValue}
                                        //style={{height: 100, width: 200, alignSelf: 'center'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setPickerValue(itemValue)
                                        }>
                                            {
                                                userList.map((list) => {
                                                    return (
                                                        <Picker.Item label={list} value={list} key={list}/>
                                                    );
                                                })
                                            }
                                    </Picker>
                           
                            
                                <Text style={styles.appText}>
                                    {"\n"}
                                    OR
                                </Text>
                                <AppTextInput label="Enter new list name" onChange={setNewlist} isPassword={false} theme={DefaultTheme}/>
                            
                            <Button mode="contained"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => OnAddToList()}><Text>Add to list</Text></Button>
                        </View>
                    )
                )
            }
        </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    background: {
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'white',
        //height: "50%",
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    appButtonContainer: {
        borderRadius: 15
    },
    appButtonText: {
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000"
        //textTransform: "uppercase"
    },
    appText:{
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000",
    },
    appHeadingText:{
        fontSize: 36,
        //fontWeight: "bold",
        alignSelf: "center",
        color: "#000"
    },
    appTouchableOpacity:{
        alignSelf: "center"
    }

})

export default AddtolistScreen