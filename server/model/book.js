const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
  id:{
    type:String,
    required:true
  },//this id is not mongo generated id
  title:{
    type:String,
    required:true
  },
  authors:[String],
  publisher:{
    type:String,
    required:true
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
