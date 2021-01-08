import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Carousel from '../components/Carousel'
import TopCarousel from '../components/TopCarousel'
import { useWindowDimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider' 
import AppActivityIndicator from '../components/AppActivityIndicator'

//API
import HomeList from '../api/HomeList'

  const videos = [
    {
      id: 'WpIAc9by5iU',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/1a203647be186786d4fed48a881351d1_1920x1080.jpg',
      title: 'Panga',
    },
    {
      id: 'sNPnbI1arSE',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/aceb4497634ae95b03cf09a4d00af8cf_1920x1080.jpg',
      title: 'Tanhaji: The Unsung Warrior',
    },
    {
      id: 'VOgFZfRVaww',
      thumbnail: 'https://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/images/5ecb0a047063dffc6b03f8d63ca7eb73_1920x1080.jpg',
      title: 'Shimla Mirchi',
    }
  ]

  function navigateContent () {
    props.navigation.navigate('Content')
  }

  function navigateYoutube () {
    props.navigation.navigate('Youtube')
  }

function HomeScreen(props) {

  const windowWidth = useWindowDimensions().width;
  const [homelist, setHomelist] = React.useState([]);
 

  // HomeList is an async function. It returns a promise.
  HomeList().then(list => {
    let hl = [];
    

    if (list !== null) {
      console.log("List isnot null");
      
      for(var i = 0; i < list.items.length; i++){
        let listitems = [];
        for(var j = 0; j < list.items[i].data.items.length; j++){
          let item = {thumbnail: list.items[i].data.items[j].data.images[0].imageurl, title: list.items[i].data.items[j].data.title, id: list.items[i].data.items[j].data.contentid};
          listitems.push(item);
        }
        hl.push({items: listitems, title: list.items[i].data.title, listid: list.items[i].data.listid});
      }

      setHomelist(hl);
      
    } else {
      console.log("List is null");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      {
        homelist.length === 0 ? (
                      <AppActivityIndicator animating={true}/>
                  ) : (

                        <ScrollView>
                          <FlatListSlider
                                data={homelist.shift().items}
                                imageKey={'thumbnail'}
                                local={false}
                                width={windowWidth}
                                separator={0}
                                loop={true}
                                autoscroll={false}
                                currentIndexCallback={index => console.log('Index', index)}
                                onPress={item => props.navigation.navigate('Content')}
                                indicator
                                animation
                              />
                          {
                            homelist.map((list) => {
                              return (
                                <Carousel data={list.items} title={list.title} key={list.listid} onPress={item => props.navigation.navigate('Content')}/>
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

export default HomeScreen