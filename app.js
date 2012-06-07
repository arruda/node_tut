
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');
var app = express();
mongoose = require('mongoose');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());  
  db = mongoose.connect('mongodb://localhost/nodepad');
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.Document = Document = require('./models.js').Document(db);

app.get('/', routes.index);

app.get('/documents.:format?', function(req, res) {
  console.log("in get documents");
  Document.find({}, function(err,docs) {
    if(err) throw err;

    switch (req.params.format) {
      // When json, generate suitable data
      case 'json':
        console.log("so what?");
        return d;
      break;

      // Else render a database template (this isn't ready yet)
      default:
        console.log("wtf?");
        res.render('documents/index.jade',{documents:docs})
    }

  });
  // var doc = new Document();
  // doc.title = "doc3";
  // doc.data = "content3";
  // doc.tags = "bla, ble";  
  // doc.save(function(err){
  //   if(err) throw err;

  //   res.send(doc.title);
  // });
});

app.post('/documents.:format?', function(req, res) {

  var document = new Document(req.body['document']);
  console.log("doc>"+document);
  document.save(function(err) {
    if(err){ throw err;}

    switch (req.params.format) {
      case 'json':
        console.log("is json");
        res.send(document);
       break;

       default:
        console.log("not json");
        res.redirect('/documents');
    }
  });
});

app.put('/documents/:id.:format?', function(req, res) {
  // Load the document
  Document.findById(req.body.document.id, function(err,d) {
    if(err){throw err;}
    // Do something with it
    d.title = req.body.document.title;
    d.data = req.body.document.data;

    // Persist the changes
    d.save(function(err) {
      if(err){throw err;}
      // Respond according to the request format
      switch (req.params.format) {
        case 'json':
          res.send(d);
         break;

         default:
          res.redirect('/documents');
      }
    });
  });
});

app.del('/documents/:id.:format?', function(req, res) {
  Document.findById(req.params.id, function(err,d) {
    if(err){throw err;}

    d.remove(function(err) {
      if(err){throw err;}
      switch (req.params.format) {
        case 'json':
          res.send('true');
         break;

         default:
          res.redirect('/documents');
      } 
    });
  });
});

app.get('/documents/:id.:format?/edit', function(req, res) {
  Document.findById(req.params.id, function(err,d) {
    if(err){throw err;}
    res.render('documents/edit.jade', { d: d });
  });
});

app.get('/documents/new', function(req, res) {
  res.render('documents/new.jade',{ d: new Document() });
});


// Read document
app.get('/documents/:id.:format?', function(req, res) {
  Document.findById(req.params.id, function(err,d) {
    if(err){throw err;}
    switch (req.params.format) {
      case 'json':
        res.send(d);
      break;

      default:
        res.render('documents/show.jade', { d: d });
    }
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
