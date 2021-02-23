import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Carousel from '../components/Carousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'

//API
import {MyList, DeleteItemFromMyList} from '../api/MyList'

  function navigateContent () {
    props.navigation.navigate('Content')
  }

  function navigateYoutube () {
    props.navigation.navigate('Youtube')
  }

function MylistScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [mylist, setMylist] = React.useState([]);
  const [deleteItem, setDeleteItem] = React.useState("");
  let renderList = [];

  const session = useSelector(state => state)

  function OnDeleteUserListItem(item){
      console.log(`Delete ${item.id}`);
      console.log(`DeleteItem is ${deleteItem}`);

      DeleteItemFromMyList(session.sessionId, item.listname, item.id).then(resp => {
          console.log(resp);
          //setDeleteItem(`${item.listname}-${item.id}`);
          setMylist([]);
        });
  }

  // Mylist is an async function. It returns a promise.
  console.log(mylist);
  if(mylist.length === 0){
    MyList(session.sessionId).then(lists => {

      if (lists !== null) {
        setMylist(lists);
      } else {
        console.log("Lists is null");
      }
    });
  }

  if (mylist.length !== 0) {
    for(var i = 0; i < mylist.length; i++){
        if(mylist[i].items.length === 0){
            continue;
        }
        
        let listitems = [];
        for(var j = 0; j < mylist[i].items.length; j++){
            let item = {thumbnail: mylist[i].items[j].content.images[0].imageurl, title: mylist[i].items[j].content.title, id: mylist[i].items[j].content.contentid, data: mylist[i].items[j].content, listname: mylist[i].title};
            listitems.push(item);
        }
        renderList.push({items: listitems, title: mylist[i].title, listid: mylist[i].listid});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        renderList.length === 0 ? (
                        <AppActivityIndicator animating={true} style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}/>
                  ) : (

                        <ScrollView>
                          {
                            renderList.map((list) => {
                              return (
                                <Carousel data={list.items} title={list.title} key={list.listid} onPress={item => props.navigation.navigate('Content', {item})} showDelete={true} onDeletePress={item => OnDeleteUserListItem(item)}/>
                              );
                            })
                          }
                        </ScrollView>
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

export default MylistScreen