import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View, Image, Text } from 'react-native'
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper'
import Modal from 'react-native-modal'
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
import {MyOrgs,DeleteOrgFromMyOrgs} from '../api/MyOrgs'

const LOGOUT_ADD_MSG = "Please sign in to add app to your list.\nDon't have an account? Sign up for free!";

function OrgdetailsScreen(props) {

  const windowWidth = useWindowDimensions().width;
  
  const session = useSelector(state => state)
  const dispatch = useDispatch()
  let renderList = [];
  let item = props.route.params.org;
  //const theme = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false)
  const [buttonAddTitle, setButtonAddTitle] = React.useState(item.buttonAddTitle);

  console.log(props.route.params.org);

  function  onExploreClicked(item) {
    console.log(item);
    dispatch(switchApp(session.sessionState, session.sessionId,item.data));
    console.log(session);
    props.navigation.navigate('Home');
  }

  async function  onRemoveClicked(item) {
    console.log(`Remove orgid ${item.orgid}`);
    let res = await DeleteOrgFromMyOrgs(session.sessionId, item.orgid);
    console.log(res);
  }

  async function  onAddClicked(item) {
    console.log(`Add orgid ${item.orgid}`);
    if(session.sessionState === LOGIN){
      if(buttonAddTitle == "Remove"){
        await onRemoveClicked(item);
        setButtonAddTitle("Add");
      } else {
        await AddOrg(session.sessionId, item.orgid, item.title);
        setButtonAddTitle("Remove");
      }
      
    } else {
      setModalVisible(true);
    }
  }

  function OnModalPress(){
    setModalVisible(false);
    props.navigation.navigate('Login');
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
        <Text style={styles.textDesc} >{item.description}</Text> 
        <View style={{flex:1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-start'}}>    
            <Button mode="text"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onAddClicked(item)}><Text>{buttonAddTitle}</Text></Button>
            <Button mode="text"   style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onExploreClicked(item)}><Text>Explore</Text></Button> 
        </View>

        <View>
            <Modal 
                isVisible={modalVisible} 
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['down']}
                propagateSwipe={true}
                > 

                <View style={styles.modalcontent}>
                <Text style={styles.modalcontentTitle}>{LOGOUT_ADD_MSG}</Text>
                <Button mode="contained" onPress={() => OnModalPress()} dark={true}>SIGN IN</Button>
                </View>
            </Modal>
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
    color: 'white',
  },
  textDesc:{
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    margin: 10,
    color: 'white',
  },
  appButtonContainer: {
    borderRadius: 15,
    margin: 10
   },
  appButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase"
  },
  modalcontent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalcontentTitle: {
      fontSize: 18,
      marginBottom: 12,
  }
})

export default OrgdetailsScreen