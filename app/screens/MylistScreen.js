import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, View } from 'react-native'
import Carousel from '../components/Carousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'
import { useSelector, useDispatch } from 'react-redux'
import {Text} from 'react-native-paper'

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
  const [mylist, setMylist] = React.useState(null);
  const [deleteItem, setDeleteItem] = React.useState("");
  let renderList = [];

  const session = useSelector(state => state)

  function OnDeleteUserListItem(item){
      console.log(`Delete ${item.id}`);
      console.log(`DeleteItem is ${deleteItem}`);

      DeleteItemFromMyList(session.sessionId, item.listname, item.id).then(resp => {
          console.log(resp);
          //setDeleteItem(`${item.listname}-${item.id}`);
          setMylist(null);
        });
  }

  // Mylist is an async function. It returns a promise.
  
  if(mylist === null){
    MyList(session.sessionId).then(lists => {
      console.log(lists);
      if (lists !== null && lists !== undefined) {
        setMylist(lists);
      } else {
        let emptyList = [];
        setMylist(emptyList);
        console.log(`MyLists is ${mylist}`);
      }
    });
  }

  if (mylist !== null && mylist.length !== 0) {
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
        mylist !== null && renderList.length === 0 ? (
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={styles.textHeading}>Add content to lists to access your favorite content here</Text>
          </View>
        ) : renderList.length === 0? (
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
  },
  textHeading:{
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20
  },
})

export default MylistScreen