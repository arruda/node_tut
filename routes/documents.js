/*
    Routes for documents: Just the CRUD
*/
module.exports = function(app){

    app.get('/documents.:format?', function(req, res) {
        console.log(req.body);
        console.log("in get documents");
        Document.find({}, function(err,docs) {
            if(err) throw err;

            switch (req.params.format) {
              // When json, generate suitable data
              case 'json':
                console.log("so what?");
                return d;
              break;

              default:
                res.render('documents/index.jade',{documents:docs})
            }

        });
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
};
