
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');
var app = express();
mongoose = require('mongoose')
db = mongoose.connect('mongodb://localhost/nodepad');
Document = require('./models.js').Document(db);

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
});

app.get('/', routes.index);

app.get('/documents', function(req, res) {
  console.log("1");    
  Document.find({}, function(err,docs) {
    if(err) throw err;

    console.log("2");   
    // 'documents' will contain all of the documents returned by the query
    res.send(docs.map(function(d) {
        console.log("3");  
      // Return a useful representation of the object that res.send() can send as JSON
      return d.__doc;
    }));
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
