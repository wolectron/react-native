const axios = require('axios');

import { Alert } from 'react-native'

export default async function AddOrg(sessionid, orgid, orgname){
    axios.put('https://api.wolectron.com/ott/test1?api=addorg', {
        sessionid: sessionid,
        orgid: orgid
        })
        .then(function (response) {
        console.log(response.data)
        if (response.data.status == true) {
            console.log("Addorg success")
            Alert.alert(
                `Successfully added ${orgname}!`,
                response.data.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
                )
        } else {
            console.log("Addorg failed !!!!")

            Alert.alert(
                "Adding channel failed!",
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