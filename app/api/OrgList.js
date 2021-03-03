const axios = require('axios');

export default async function OrgList(){
    let orglist = null;

    try {
        response = await axios.get('https://api.wolectron.com/ott/test1?api=orgs&orgid=flexstream');
        orglist = response.data;

        console.log(orglist.orgs[0].orgs_app);

        return orglist.orgs[0].orgs_app;
    } catch (error) {
        console.log(error);
        return null;
    }
}