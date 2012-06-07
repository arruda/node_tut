
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');
var app = express();
mongoose = require('mongoose');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  // app.use(require('connect').bodyParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var routes = require('./routes')(app);

app.configure('development', function(){
  app.use(express.errorHandler());  
  db = mongoose.connect('mongodb://localhost/nodepad');
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/nodepad-test');
});

app.Document = Document = require('./models/documents.js').Document(db);

// app.get('/', routes.index);

// app.get('/documents.:format?', routes.documents);

// app.get('/documents.:format?', function(req, res) {
//   console.log("in get documents");
//   Document.find({}, function(err,docs) {
//     if(err) throw err;

//     switch (req.params.format) {
//       // When json, generate suitable data
//       case 'json':
//         console.log("so what?");
//         return d;
//       break;

//       // Else render a database template (this isn't ready yet)
//       default:
//         console.log("wtf?");
//         res.render('documents/index.jade',{documents:docs})
//     }

//   });






http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
