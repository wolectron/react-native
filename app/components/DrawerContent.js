import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp';

const axios = require('axios');

export const PreferencesContext = React.createContext({
    rtl: 'left',
    theme: 'light',
    toggleTheme: () => {},
    toggleRTL: () => {},
  });

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    PreferencesContext
  );
  const session = useSelector(state => state);
  const dispatch = useDispatch();

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  function OnLogout(){
    //setLoading(true)

    axios.post('https://api.wolectron.com/ott/test1?api=signout', {
        sessionid: session.sessionId,
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data.status == true) {
            dispatch(logout(session.org))
            props.navigation.goBack();
        } else {
            dispatch(logout(session.org));
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

function OnExploreApps(){
  dispatch(switchApp(session.sessionState, session.sessionId, null));
  props.navigation.goBack();
}

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        
        
          {
            session.sessionState === "LOGIN" ? (
              <Drawer.Section style={styles.drawerSection}>
                  <DrawerItem
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-outline"
                        color={color}
                        size={size}
                      />
                    )}
                    label="Sign Out"
                    onPress={() => OnLogout()}
                  />
                  <DrawerItem
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="playlist-play"
                        color={color}
                        size={size}
                      />
                    )}
                    label="My Lists"
                    onPress={() => props.navigation.navigate('Mylist')}
                  />
              </Drawer.Section>
            ) : (
              <Drawer.Section style={styles.drawerSection}>
                  <DrawerItem
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-outline"
                        color={color}
                        size={size}
                      />
                    )}
                    label="Sign In"
                    onPress={() => props.navigation.navigate('Login')}
                  />
                      <DrawerItem
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-plus-outline"
                        color={color}
                        size={size}
                      />
                    )}
                    label="Sign Up"
                    onPress={() => props.navigation.navigate('Signup')}
                  />
              </Drawer.Section>
            )
          }
          <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-switch"
                    color={color}
                    size={size}
                  />
                )}
                label="Explore apps"
                onPress={() => OnExploreApps()}
              />

          </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});