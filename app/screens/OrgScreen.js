import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View } from 'react-native'
import {Text} from 'react-native-paper'
import OrgCarousel from '../components/OrgCarousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp'

//API
import OrgList from '../api/OrgList'
import AddOrg from '../api/AddOrg'

function OrgScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [orglist, setOrglist] = React.useState([]);
  const session = useSelector(state => state)
  const dispatch = useDispatch()
  let renderList = [];

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
  }

  if (orglist.length !== 0) {
    let listitems = [];
    for(var i = 0; i < orglist.length; i++){
        let item = {thumbnail: orglist[i].images[0], title: orglist[i].orgname, id: i.toString(), orgid: orglist[i].orgid, description: orglist[i].description, data: orglist[i]};
        listitems.push(item);
    }
    renderList.push({items: listitems});
  }

  function  onExploreClicked(item) {
    console.log(item);
    dispatch(switchApp(session.sessionState, session.sessionId,item.data));
    console.log(session);
  }

  function  onAddClicked(item) {
    console.log(`Add orgid ${item.orgid}`);
    AddOrg(session.sessionId, item.orgid, item.title);
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
                            <ScrollView>
                                <OrgCarousel data={renderList[0].items} onPress={item => onExploreClicked(item)} onAdd={item => onAddClicked(item)} onExplore={item => onExploreClicked(item)}/>
                            </ScrollView>
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
  }
})

export default OrgScreen