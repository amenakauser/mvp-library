var mongoose = require('mongoose');
// var config = require('../config');
var path = require('path');
require('dotenv').config();

// var mongoDB = 'mongodb://localhost/home-library';
// mongoose.connect(mongoDB);

var mongoDBmlab = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}` ||`mongodb://${config.DB_USER}:${config.DB_PASS}@ds153677.mlab.com:53677/home-library`;
mongoose.connect(mongoDBmlab);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// schema for books
var bookSchema = mongoose.Schema({
  title: String,
  author: String,
  description: String,
  ISBN10: String,
  ISBN13: String,
  link: String,
  thumbnail: String,
  location: {type: String, default: 'Living Room'},
  createdAt: Date,
  onShelf: {type: Boolean, default: true}
});

var Book = mongoose.model('Book', bookSchema);

// TODO
// handle cases in the save function where the book may not have ISBN10 and/or ISBN13 in the data received from google books API
// handle cases for one author/multiple authors/no author returned from API - the function below considers only the first author
var save = function(isbn, book, location, callback) {

  // change location to proper casing if needed (like 'Living Room')
  var changeCase = function(location) {
    var result = [];
    var location = location.split(' ');
    result = location.map((word) => {
      var letters = word.split('');
      var capitalizedLetters = letters[0].toUpperCase();
      for (var i = 1; i < letters.length; i++) {
        capitalizedLetters += letters[i].toLowerCase();
      }
      return capitalizedLetters;
    })
    return result.join(' ');
  };

  location = changeCase(location);

  if (book.authors !== undefined) {
    var author = book.authors[0];
  } else {
    var author = 'Not Found';
  }

  // console.log(book)

  var identifiers = book.industryIdentifiers;

  var ISBN10;
  var ISBN13;

  identifiers.forEach(function(item) {
    if (item.type === 'ISBN_10') {
      ISBN10 = item.identifier;
    } else if (item.type === 'ISBN_13') {
      ISBN13 = item.identifier;
    } else {
      ISBN10 = 'Not Found';
      ISBN13 = isbn;
    }
  });

  var bookInstance = new Book({
    title: book.title,
    author: author,
    description: book.description,
    ISBN10: ISBN10,
    ISBN13: ISBN13,
    link: book.link,
    thumbnail: book.thumbnail,
    location: location,
    createdAt: new Date
  });

  // console.log(bookInstance);

  bookInstance.save(function(err) {
    if (err) {
      // console.log('error saving book to database', err);
    } else {
      // console.log('book saved');
      callback(true, book.title, location);
    }
  });

};

// find a book by id from database
var findBook = function(bookId, callback) {
  Book.findById(bookId, function(err, book) {
      if (err) {
        callback(err, null);
      } else {
        // console.log('book', book)
        callback(null, book);
      }
  });
};

// fetch all books from database
var selectAll = function(callback) {
  Book.find({}).sort('-createdAt')
    .exec(function(err, books) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, books);
      }
    });
};

// delete book from database
var deleteBook = function(id, callback) {
  Book.deleteOne({_id: id}, function(err) {
    if (err) {
      console.log('error deleting book from database');
    } else {
      callback(null, true);
    }
  });
}

// checkout book from location - set onShelf property to false
var checkoutBook = function(id, callback) {
  // console.log(id)
  Book.findByIdAndUpdate(id, {onShelf: false}, function(err, book) {
    // console.log(book)
    callback(true)
  });
};

// put book back on shelf - set onShelf property to false
var putBookBack = function(id, callback) {
  Book.findByIdAndUpdate(id, {onShelf: true}, function(err, book) {
    callback(true)
  });
};

// change location of book
var changeBookLocation = function(id, newLocation, callback) {
  Book.findByIdAndUpdate(id, {location: newLocation}, function(err, book) {
    if (err) {
      callback(null);
    } else {
      callback(true, book);
    }
  });
};

// find all authors
var findAuthors = function(callback) {
  Book.distinct('author', function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      // console.log(results);
      callback(null, results);
    }
  });
};

// find all locations
var findLocations = function(callback) {
  Book.distinct('location', function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      // console.log(results);
      callback(null, results);
    }
  });
};

// get all books on stroll
var getBooksOnStroll = function(callback) {
  Book.find({onShelf: false}).sort('-createdAt')
    .exec(function(err, books) {
      if (err) {
        callback(err, null);
      } else {
        // console.log(books);
        callback(null, books);
      }
    });
};

var findRandomBook = function(callback) {
  Book.count().exec(function(err, count) {
    var random = Math.floor(Math.random()*count);
    Book.findOne().skip(random).exec(function (err, result) {
      if (err) {
        console.log('error finding random book');
      } else {
        // console.log(result);
        callback(null, result);
      }
    });
  });
};

var findBooksByAuthor = function(name, callback) {
  Book.find({author: name})
    .exec(function(err, books) {
      if (err) {
        console.log('error finding books by author');
      } else {
        // console.log(books)
        callback(null, books);
      }
    });
};

var findBooksByLocation = function(location, callback) {
  Book.find({location: location})
    .exec(function(err, books) {
      if (err) {
        console.log('error finding books by location');
      } else {
        callback(null, books);
      }
    });
};

module.exports.save = save;
module.exports.selectAll = selectAll;
module.exports.findAuthors = findAuthors;
module.exports.findLocations = findLocations;
module.exports.findBook = findBook;
module.exports.findRandomBook = findRandomBook;
module.exports.findBooksByAuthor = findBooksByAuthor;
module.exports.findBooksByLocation = findBooksByLocation;
module.exports.deleteBook = deleteBook;
module.exports.checkoutBook = checkoutBook;
module.exports.getBooksOnStroll = getBooksOnStroll;
module.exports.putBookBack = putBookBack;
module.exports.changeBookLocation = changeBookLocation;