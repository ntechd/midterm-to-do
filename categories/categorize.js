const productsArr = ['buy', 'shop', 'acquire', 'purchase', 'obtain', 'stock up'];
const booksArr = ['study', 'scan', 'read', 'perusal', 'browse'];
const moviesArr = ['watch', 'see', 'movie', 'theater', 'cinema', 'drama', 'opera'];
const restaurantsArr = ['dine', 'lunch', 'eat', 'dinner', 'brunch', 'breakfast', 'snack','teatime', 'cafe'];

function filterShop(query) {
    return productsArr.filter( function(el){
      return query.toLowerCase().includes(el)
    })
  }
  
  function filterRead(query) {
    return booksArr.filter( function(el){
      return query.toLowerCase().includes(el)
    })
  }
  
  function filterMovie(query) {
    return moviesArr.filter( function(el){
      return query.toLowerCase().includes(el)
    })
  }
  
  function filterEat(query) {
    return restaurantsArr.filter( function(el){
      return query.toLowerCase().includes(el)
    })
  }
  
  // Check for keywords
  let checkQuery = function (string){
    if (filterMovie(string).length !== 0 ){
      console.log('is it movie?', "category_id: 3");
      return 3;
    } else if (filterRead(string).length !== 0){
      console.log('is it reading?', "category_id: 2");
      return 2;
    } else if (filterEat(string).length !== 0){
      console.log('is it eating?', "category_id: 4");
      return 4;
    } else if (filterShop(string).length !== 0){
      console.log('is it shopping?', "category_id: 1");
      return 1;
    } else {
        return null;
      }
    }
  
  module.exports = {
    checkQuery: checkQuery,
  }