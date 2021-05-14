import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View } from 'react-native'
import {Text} from 'react-native-paper'
import OrgCarousel from '../components/OrgCarousel'
import UserorgCarousel from '../components/UserorgCarousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp'

//API
import {MyOrgs,DeleteOrgFromMyOrgs} from '../api/MyOrgs'

function MyOrgsScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [orglist, setOrglist] = React.useState(null);
  const session = useSelector(state => state)
  const dispatch = useDispatch()
  let renderList = [];

  // HomeList is an async function. It returns a promise.
  if(orglist === null){
    MyOrgs(session.sessionId).then(list => {

      if (list !== null) {
        setOrglist(list);
        console.log(list);
      } else {
        console.log("List is null in orglist");
      }
    });
  }

  if (orglist !== null && orglist.length !== 0) {
    let listitems = [];
    for(var i = 0; i < orglist.length; i++){
        let item = {thumbnail: orglist[i].images[0], title: orglist[i].orgname, id: i.toString(), orgid: orglist[i].orgid, description: orglist[i].description, data: orglist[i], buttonAddTitle: "Remove"};
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
    setOrglist(null);
  }

  function onItemClicked(item){
    console.log(`OnItemClicked ${item}`);
    props.navigation.navigate('Orgdetails', {org:item});
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        renderList.length === 0 && orglist === null ? (
                        <AppActivityIndicator animating={true} style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}/>
                  ) : renderList.length === 0 ? (
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                      <Text style={styles.textHeading}>Add apps to your list to view them here</Text>
                    </View>
                    
                  ) : (
                        <View>
                          {
                            /*
                            <Text style={styles.textHeading}>Welcome to Flexstream!</Text>
                            <Text style={styles.textDesc}>Experience a unique dedicated app without installing multiple apps. Add a creation or explore one today!</Text>
                            <Text style={styles.textDesc}>Are you a content creator? Contact us to publish your content. See https://flexstream.app for more details.</Text>
                            */
                          }
                            
                            <UserorgCarousel data={renderList[0].items} onPress={item => onItemClicked(item)} onAdd={item => onRemoveClicked(item)} onExplore={item => onExploreClicked(item)}/>
                            
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
    fontSize: 24,
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

export default MyOrgsScreen