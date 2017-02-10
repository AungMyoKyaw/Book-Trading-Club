const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestSchema = new schema({
  userID:schema.Types.ObjectId,
  bookID:schema.Types.ObjectId,
  approved:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('request',requestSchema);
