'use strict';

const omdbApi = require('omdb-client');
const key =  process.env.OMDB_API_KEY;

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

// omdbApi.get(params, results);