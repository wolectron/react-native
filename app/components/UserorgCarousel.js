import * as React from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Constants from 'expo-constants'
import {IconButton} from 'react-native-paper'

export default function UserorgCarousel({data, title, onPress, onAdd, onExplore}) {
  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        
          <View style={{margin: 10, flexDirection: 'row', flex: 1}}>
            <TouchableHighlight onPress={() => onPress(item)}>
            <View style={styles.card_template} >
              <Image
              style={styles.card_image}
              source={{
                  uri:
                  item.thumbnail,
              }}
              />
            </View>
            </TouchableHighlight>

            <View style={styles.text_container}>
                <Text style={styles.card_title}>{item.title.substr(0, 30)}</Text>  
                <Text style={styles.card_description}>{item.description.substr(0, 100)}</Text> 
                <View style={{flex:1, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'flex-start'}}>    
                    <Button mode="text"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onAdd(item)}><Text>Add</Text></Button>
                    <Button mode="text"  style={styles.appButtonContainer} labelStyle={styles.appButtonText} compact={true} onPress={() => onExplore(item)}><Text>Explore</Text></Button> 
                </View>
            </View>
            
            

          </View>
          
         /*
         <Card>
             <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Title title="Card Title" />
            <Card.Content>
            <Paragraph>Card content</Paragraph>
            </Card.Content>
            
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card>
        */
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //backgroundColor: '#000000',
    padding: 8,
    //paddingTop: Constants.statusBarHeight,
  },
  carousel_title: {
    color: '#ffffff',
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  card_template: {
    width: 170,
    height: 100,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  card_image: {
    width: 170,
    height: 100,
  },
  text_container: {
    //position: 'absolute',
    width: 200,
    height: 200,
    bottom: 0,
    //backgroundColor: 'rgba(0,0,0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
  },
  card_title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  card_description:{
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 15,
    textAlign: 'justify',
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
})