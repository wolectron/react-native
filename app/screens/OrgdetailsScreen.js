import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View, Image } from 'react-native'
import { Button, Card, Title, Paragraph, Text, useTheme } from 'react-native-paper'
import OrgCarousel from '../components/OrgCarousel'
import UserorgCarousel from '../components/UserorgCarousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp'

//API
import AddOrg from '../api/AddOrg'

function OrgdetailsScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [orglist, setOrglist] = React.useState([]);
  const session = useSelector(state => state)
  const dispatch = useDispatch()
  let renderList = [];
  let item = props.route.params.org;
  const theme = useTheme();

  console.log(props.route.params.org);

  function  onExploreClicked(item) {
    console.log(item);
    dispatch(switchApp(session.sessionState, session.sessionId,item.data));
    console.log(session);
    props.navigation.goBack();
  }

  function  onAddClicked(item) {
    console.log(`Add orgid ${item.orgid}`);
    AddOrg(session.sessionId, item.orgid, item.title);
  }

  return (
    <SafeAreaView style={styles.container}>
       
        <Text style={styles.textHeading}>{item.title}</Text>  
        <Image
              style={{flex:1, width:windowWidth, marginTop: 10, marginBottom: 10, resizeMode: "center"}}
              source={{
                  uri:
                  item.thumbnail,
              }}
              />
        <Text style={styles.textDesc}>{item.description}</Text> 
        <View style={{flex:1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-start'}}>    
            <Button mode="text"  theme={theme} style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onAddClicked(item)}><Text>Add</Text></Button>
            <Button mode="text"  theme={theme} style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onExploreClicked(item)}><Text>Explore</Text></Button> 
        </View>
           
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    backgroundColor: "#000000",
    height: '100%'
  },
  carousel: {
    flex: 1
  },
  textHeading:{
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  textDesc:{
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    margin: 10,
  },
  appButtonContainer: {
    borderRadius: 15,
    margin: 10
   },
  appButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase"
 }
})

export default OrgdetailsScreen