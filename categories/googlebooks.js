'use strict';

const googleApi = require('google-books-search');
const key =  process.env.GOOGLE_API_KEY || AIzaSyCdwPehI5pnWLBKMnbivRUbXxr99iTpf9Y;

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

googleApi.get(params, results);