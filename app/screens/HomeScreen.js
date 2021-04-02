import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Carousel from '../components/Carousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import OrgScreen from './OrgScreen'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout, switchApp, LOGIN, LOGOUT } from '../redux/sessionApp';

//API
import HomeList from '../api/HomeList'

  function navigateContent () {
    props.navigation.navigate('Content')
  }

  function navigateYoutube () {
    props.navigation.navigate('Youtube')
  }

function HomeScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [homelist, setHomelist] = React.useState([]);
  let renderList = [];
  let carouselList = [];
  const session = useSelector(state => state);
  const dispatch = useDispatch();
  

  React.useEffect(() => {
      // HomeList is an async function. It returns a promise.
      if(session.org !== null){
        console.log(`React.useEffect orgid ${session.org.orgid}`);
      } else {
        console.log(`React.useEffect org1 ${session.org}`);
      }
      
      if(session.org !== null){
        renderList = [];
        carouselList = [];

        console.log(`React.useEffect org2 ${session.org}`);

        HomeList(session.org).then(list => {

          if (list !== null) {
            setHomelist(list);
          } else {
            console.log("List is null2");
            dispatch(switchApp(session.sessionState, session.sessionId, null));
          }
        });
      }
  }, [session.org]);

  if (homelist.length !== 0) {
    for(var i = 0; i < homelist.items.length; i++){
      let listitems = [];
      for(var j = 0; j < homelist.items[i].data.items.length; j++){
        let item = {thumbnail: homelist.items[i].data.items[j].data.images[0].imageurl, title: homelist.items[i].data.items[j].data.title, id: homelist.items[i].data.items[j].data.contentid, data: homelist.items[i].data.items[j].data};
        listitems.push(item);
      }
      renderList.push({items: listitems, title: homelist.items[i].data.title, listid: homelist.items[i].data.listid});
      
    }
    carouselList = renderList.shift().items;
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        session.org === null ? (
            <OrgScreen props={props}/>
        ) : (
              renderList.length === 0 ? (
                              <AppActivityIndicator animating={true} style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}/>
                        ) : (

                              <ScrollView>
                                <FlatListSlider
                                      data={carouselList}
                                      imageKey={'thumbnail'}
                                      local={false}
                                      width={windowWidth}
                                      separator={0}
                                      loop={true}
                                      autoscroll={false}
                                      currentIndexCallback={index => console.log('Index')}
                                      onPress={item => props.navigation.navigate('Content', {item:carouselList[item]})}
                                      indicator
                                      animation
                                    />
                                {
                                  renderList.map((list) => {
                                    return (
                                      <Carousel data={list.items} title={list.title} key={list.listid} onPress={item => props.navigation.navigate('Content', {item})}/>
                                    );
                                  })
                                }
                              </ScrollView>
                        )
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
  }
})

export default HomeScreen