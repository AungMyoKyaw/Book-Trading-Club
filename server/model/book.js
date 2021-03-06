const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
  id:{
    type:String,
    required:true
  },//this id is not mongo generated id
  title:{
    type:String,
    default:'Book Title'
  },
  authors:[String],
  publisher:{
    type:String
  },
  industryIdentifiers:[{
    type:{
      type:String
    },
    identifier:String
  }],
  printType:String,
  maturityRating:String,
  language:String,
  link:String,
  thumbnail:String,
  images:{}
});

module.exports = mongoose.model('Book',bookSchema);
