import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const AppActivityIndicator = (props) => (
  <ActivityIndicator animating={props.animating} color={props.color} />
);

export default AppActivityIndicator;