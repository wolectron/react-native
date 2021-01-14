import React from 'react'
import { TextInput, StyleSheet } from 'react-native-paper'

function AppTextInput(props) {

    const [text, setText] = React.useState('')

    return (
        <TextInput
            label={props.label}
            value={text}
            onChangeText={text => {setText(text);props.onChange(text);}}
            style={ { marginVertical: 5, width: 300, textAlign: 'left', alignSelf: 'center' } }
            secureTextEntry={props.isPassword}
            autoCapitalize = 'none'
        />
    )
}

export default AppTextInput