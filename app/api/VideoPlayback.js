

const axios = require('axios');

export default async function VideoPlayback(videoid){
    let videourl = null;

    try {
        response = await axios.get(`https://api.wolectron.com/ott/test1?api=videourl&videoid=${videoid}`);
        videourl = response.data;

        return videourl;
    } catch (error) {
        console.log(error);
        return null;
    }
}