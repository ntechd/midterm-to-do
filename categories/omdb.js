require('dotenv').config({path: '../.env'});

const omdbApi = require('omdb-client');
const key =  process.env.OMDB_API_KEY;

//Categorizes based on the OMDB API
const isMovie = function (taskTitle, taskDesc) {
    taskTitle = taskTitle.toLowerCase().trim();
    taskDesc = taskDesc.toLowerCase().trim();

const params = {
    apiKey: key,
    query: 'You'
}
return new Promise ((resolve,reject) => {
    omdbApi.search(params, function(err, data) {
      if (!err) {
        for (const movie of data.Search){
          let type = movie.Type.toLowerCase();
          let omdbTitle = movie.Title.toLowerCase();
          if(type === 'movie' && omdbTitle === taskTitle) {
            console.log(`Movie found: ${movie.Title}`);
            return resolve(true);
          }
        }
        console.log(`No exact match found for: ${taskTitle}`)
        return resolve(false);
      } else {
        console.log(err); // If movie is not found, err === Movie not found!
        return resolve(false);
      }

    });

  });

}

// Function to categorize based on OMDB API.
const isSeries = function (taskTitle, taskDesc) {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDesc = taskDesc.toLowerCase().trim();

  const params = {
    apiKey: key,
    query: taskTitle
  }

  return new Promise ((resolve,reject) => {

    omdbApi.search(params, function(err, data) {

      if (!err) {
        for (const series of data.Search){
          let type = series.Type.toLowerCase();
          let omdbTitle = series.Title.toLowerCase();
          if(type === 'series' && omdbTitle === taskTitle) {
            console.log(`Series found: ${series.Title}`);
            return resolve(true);
          }
        }
        console.log(`No exact match found for: ${taskTitle}`)
        return resolve(false);
      } else {
        console.log(`Series not found: ${taskTitle}`); // Usual err is err === Movie not found!
        return resolve(false);
      }

    });
  })

}
