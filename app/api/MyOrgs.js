import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';

const axios = require('axios');

export async function MyOrgs(sessionid){
    let orgs = null;

    console.log(`In API MyOrgs API is https://api.wolectron.com/ott/test1?api=listorg&sessionid=${sessionid}`);

    try {
        response = await axios.get(`https://api.wolectron.com/ott/test1?api=listorg&sessionid=${sessionid}`);
        orgs = response.data.orgs;

        return orgs;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function DeleteOrgFromMyOrgs(sessionid, orgid){

    console.log(`In DeleteOrgFromMyOrgs sessionid ${sessionid} orgid ${orgid}`);

    try{
        response = await axios.put('https://api.wolectron.com/ott/test1?api=removeorg', {
                                            sessionid: sessionid,
                                            orgid: orgid
                                    });
          
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}