require("dotenv").config();
const omdbApi = require('omdb-client');
const yelpApi = require('yelp-fusion');
const booksApi = require('google-books-search');

const omdbKey = process.env.OMDB_API_KEY;
let requestOptions = {
  method: 'GET'
};

const isMovie = function(strTask) {
  return fetch(`https://imdb-api.com/en/API/SearchTitle/${omdbKey}/${strTask}`, requestOptions)
    .then(response => {
      return response.json()
    })
    .catch(error => console.log('error', error));
}

const yelpKey = process.env.YELP_API_KEY;
const isRestaurant = function(task) {
  const client = yelpApi.client(yelpKey);
  return client.search({
    term: `${task}`,
    location: 'Toronto'
  }).then(response => {
    return JSON.parse(response.body)
  })
  .catch(error => console.log('error', error));

}

const isBook = function(task) {
  return booksApi.search(task);
}


module.exports = { isMovie, isRestaurant, isBook };