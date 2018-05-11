var books = require('google-books-search');
// var config = require('../config.js');
var database = require('../database-mongo');
require('dotenv').config();


var bookfetcher = function (isbn, location, callback) {

  // var options = {
  //   key: key,
  //   field: 'title',
  //   offset: 0,
  //   limit: 10,
  //   type: 'books',
  //   order: 'relevance',
  //   lang: 'en'
  // };
  var options = {
    key: process.env.TOKEN || config.TOKEN,
    field: 'isbn'
  };

  books.search(isbn, options, function(error, results) {
    if (error) {
      console.log('error looking up book by ISBN');
    } else {
      var book = results[0];
      // console.log(book);
      if (book !== undefined) {
        // save book in database
        database.save(isbn, book, location, callback);
      } else {
        console.log('cannot find book. enter valid 10 digit ISBN')
        callback(false);
      }
    }
  });

};


module.exports = bookfetcher;

// testing bookfetcher with 'Goodnight Moon'
// var isbn = '0062662899';
// bookfetcher(isbn);

// var testisbn = '1118026691';
// bookfetcher(testisbn);






