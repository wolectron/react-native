const axios = require('axios');

export default async function OrgList(){
    let orglist = null;

    try {
        response = await axios.get('https://api.wolectron.com/ott/test1?api=orgs');
        orglist = response.data;

        return orglist;
    } catch (error) {
        console.log(error);
        return null;
    }
}