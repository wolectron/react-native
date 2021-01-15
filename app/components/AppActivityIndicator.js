import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { prototype } from 'react-native/Libraries/Image/ImageBackground'

const AppActivityIndicator = (props) => (
  <ActivityIndicator animating={props.animating} color={props.color} style={props.style}/>
)

export default AppActivityIndicator