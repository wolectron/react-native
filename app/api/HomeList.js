//http://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/list/home

const axios = require('axios');

export default async function HomeList(){
    let homelist = null;

    try {
        response = await axios.get('http://d1s3oezf1vtq1t.cloudfront.net/01e06e53bfb6f9e93f467a149e01f33a/list/home');
        homelist = response.data;

        return homelist;
    } catch (error) {
        console.log(error);
    }
}