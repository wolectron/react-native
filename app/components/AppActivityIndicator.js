import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const AppActivityIndicator = (props) => (
  <ActivityIndicator animating={props.animating} color={props.color} />
)

export default AppActivityIndicator