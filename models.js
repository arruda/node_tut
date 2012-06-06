var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var DocumentSchema = new Schema({
    title: {type: String, index:true},
    data: String,
    tags: String,
});

// mongoose.model('Document', {
//   properties: ['title', 'data', 'tags'],

//   indexes: [
//     'title'
//   ]
// });

exports.Document = function(db) {
  return db.model('Document',DocumentSchema);
};