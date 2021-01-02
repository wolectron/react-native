import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { configureFonts, DefaultTheme, Provider as PaperProvider, DarkTheme } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import store from './app/redux/store'
import DrawerNavigator from "./app/navigation/DrawerNavigator"

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  }
}

const theme = {
  ...DarkTheme,
  roundness: 2,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
  //fonts: configureFonts(fontConfig)
}

export default function App() {
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DarkTheme}>
        <NavigationContainer theme={navigationTheme}>
        <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
