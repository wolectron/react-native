import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View } from 'react-native'
import {Text, Button} from 'react-native-paper'
import OrgCarousel from '../components/OrgCarousel'
import UserorgCarousel from '../components/UserorgCarousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import Modal from 'react-native-modal'
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp'

const LOGOUT_ADD_MSG = "Please sign in to add app to your list.\nDon't have an account? Sign up for free!";

// Icon green RGB - 8,151,39

//API
import OrgList from '../api/OrgList'
import AddOrg from '../api/AddOrg'
import {MyOrgs,DeleteOrgFromMyOrgs} from '../api/MyOrgs'

function OrgScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [orglist, setOrglist] = React.useState([]);
  const [myorglist, setMyOrglist] = React.useState(null);
  const session = useSelector(state => state)
  const dispatch = useDispatch()
  let renderList = [];
  const [modalVisible, setModalVisible] = React.useState(false);

  function OnModalPress(){
    setModalVisible(false);
    props.props.navigation.navigate('Login');
  }


  let desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // HomeList is an async function. It returns a promise.
  if(orglist.length === 0){
    OrgList().then(list => {

      if (list !== null) {
        setOrglist(list);
        console.log(list);
      } else {
        console.log("List is null in orglist");
      }
    });

    if(session.sessionState === LOGIN){
      MyOrgs(session.sessionId).then(list => {
  
        if (list !== null) {
          setMyOrglist(list);
          console.log(list);
        } else {
          console.log("List is null in MyOrgs");
        }
      });
    }

    if(myorglist !== null){
      console.log(`myorglist is ${myorglist}`);
    }
  }

  if (orglist.length !== 0) {
    let listitems = [];
    for(var i = 0; i < orglist.length; i++){
        let buttonAddTitle = "Add";
        if(myorglist != null){
          for(var j = 0; j < myorglist.length; j++){
            if(myorglist[j].orgid == orglist[i].orgid){
              buttonAddTitle = "Remove";
              break;
            }
          }
        }

        let item = {thumbnail: orglist[i].images[0], title: orglist[i].orgname, id: i.toString(), orgid: orglist[i].orgid, description: orglist[i].description, data: orglist[i], buttonAddTitle: buttonAddTitle};
        listitems.push(item);
    }
    renderList.push({items: listitems});
  }

  function  onExploreClicked(item) {
    console.log(item);
    dispatch(switchApp(session.sessionState, session.sessionId,item.data));
    console.log(session);
  }

  async function  onRemoveClicked(item) {
    console.log(`Remove orgid ${item.orgid}`);
    let res = await DeleteOrgFromMyOrgs(session.sessionId, item.orgid);
    console.log(res);
    setOrglist([]);
  }

  async function  onAddClicked(item) {
    if(item.buttonAddTitle == "Remove"){
      return await onRemoveClicked(item); 
    }

    console.log(`Add orgid ${item.orgid}`);
    console.log(session);
    if(session.sessionState === LOGIN){
      AddOrg(session.sessionId, item.orgid, item.title);
      setOrglist([]);
    } else {
      setModalVisible(true);
    }
  }

  function onItemClicked(item){
    console.log(`OnItemClicked ${item}`);
    props.props.navigation.navigate('Orgdetails', {org:item});
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        renderList.length === 0 ? (
                        <AppActivityIndicator animating={true} style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}/>
                  ) : (
                        <View>
                          {
                            /*
                            <Text style={styles.textHeading}>Welcome to Flexstream!</Text>
                            <Text style={styles.textDesc}>Experience a unique dedicated app without installing multiple apps. Add a creation or explore one today!</Text>
                            <Text style={styles.textDesc}>Are you a content creator? Contact us to publish your content. See https://flexstream.app for more details.</Text>
                            */
                          }
                            
                            <UserorgCarousel data={renderList[0].items} buttonAddTitle="Add" onPress={item => onItemClicked(item)} onAdd={item => onAddClicked(item)} onExplore={item => onExploreClicked(item)}/>
                            
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
                        </View>
                        
                  )
      }
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
      color: 'black'
  }
})

export default OrgScreen