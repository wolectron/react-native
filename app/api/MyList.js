import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';

const axios = require('axios');

export async function MyList(sessionid){
    let lists = null;

    console.log(`In API MyList API is https://api.wolectron.com/ott/test1?api=userlist&sessionid=${sessionid}`);

    try {
        response = await axios.get(`https://api.wolectron.com/ott/test1?api=userlist&sessionid=${sessionid}`);
        lists = response.data.lists;

        return lists;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function DeleteItemFromMyList(sessionid, listname, contentid){

    console.log(`In DeleteItemFromMyList sessionid ${sessionid} listname ${listname} and contentid ${contentid}`);

    try{
        response = await axios.delete('https://api.wolectron.com/ott/test1?api=userlistitem', {
                                        data: {
                                            sessionid: sessionid,
                                            title: listname,
                                            display_title: listname,
                                            contentid: contentid
                                        }
                                    });
          
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}