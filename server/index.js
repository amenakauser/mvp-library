var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('dotenv').config();

var app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

var bookfetcher = require('../googlebooks/bookfetcher');
var database = require('../database-mongo');

app.post('/book', function(req, res) {
  var isbn = req.body.term;
  var location = req.body.location;
  // console.log('ISBN:',req.body.term);
  // console.log('location', req.body.location);
  // use google books API to search for book info and save it in database
  bookfetcher(isbn, location, function(bookSaved, title, location) {
    var result = {
      saved: bookSaved,
      title: title,
      location: location
    };
    res.json(result);
  });
});

// delete book from database
app.post('/deletebook', function(req, res) {
  // console.log(req.body)
  database.deleteBook(req.body.bookId, function(err, bookDeleted) {
    if (bookDeleted) {
      res.json(true);
    }
  });
});

// check out book from shelf
app.post('/checkoutbook', function(req, res) {
  // console.log(req.body)
  database.checkoutBook(req.body.bookId, function(checkedOut) {
    if (checkedOut) {
      res.json(true);
    }
  });
});

// put book back on shelf
app.post('/putbookonshelf', function(req, res) {
  database.putBookBack(req.body.bookId, function(putBack) {
    if (putBack) {
      res.json(true);
    }
  });
});

app.get('/fetchbooks', function(req, res) {
  database.selectAll(function(err, books) {
    if(err) {
      console.log('error in serving server fetching books from database')
      res.sendStatus(500);
    } else {
      res.json(books);
    }
  });
});

// to get a particular book by id
app.get('/fetchbook/:id', function(req, res) {
  var bookId = req.params.id;
  // find book from database matching this id and send it back
  database.findBook(bookId, function(err, book) {
    res.json(book);
  });
});

// get books not on shelf from database
app.get('/getbooksonstroll', function(req, res) {
  database.getBooksOnStroll(function(err, books) {
    var result = {
      books: books
    }
    if (!err) {
      result.found = true
    }
    res.json(result);
  });
});

app.get('/titles', function(req, res) {
  database.findTitles(function(err, titles) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(titles);
    }
  });
});

app.get('/fetchauthors', function(req, res) {
  database.findAuthors(function(err, authors) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(authors);
    }
  });
});

// to get all books by author
app.get('/fetchbooksbyauthor/:author', function(req, res) {
  var author = req.params.author;
  // find books from database matching this author and send them back
  database.findBooksByAuthor(author, function(err, books) {
    res.json(books);
  });
});

// to get all books in a particular location
app.get('/fetchbooksbylocation/:location', function(req, res) {
  var location = req.params.location;
  database.findBooksByLocation(location, function(err, books) {
    res.json(books);
  });
});

// change location of book
app.post('/changebooklocation', function(req, res) {
  var id = req.body.id;
  var newLocation = req.body.newLocation;
  database.changeBookLocation(id, newLocation, function(changed, book) {
    var result = {
      changed: changed,
      book: book
    };
    res.json(result);
  })
});

app.get('/fetchlocations', function(req, res) {
  database.findLocations(function(err, authors) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(authors);
    }
  });
});

app.get('/fetchrandombook', function(req, res) {
  database.findRandomBook(function(err, result) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

app.get('/*', function(req, res) {
  // console.log('serving default route')
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000');
});