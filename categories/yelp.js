'use strict';

const yelpApi = require('yelp-fusion');
const key =  process.env.YELP_API_KEY;

const params = {
    apiKey: key,
    title: 'You'
}

require('dotenv').config();
console.log(process.env.OMDB_API_KEY);


const results = function(err,data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
};

yelpApi.get(params, results);