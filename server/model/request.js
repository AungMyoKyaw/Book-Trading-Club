const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestSchema = new schema({
  requesterID:{
    type:schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  ownerID:{
    type:schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  bookID:{
    type:schema.Types.ObjectId,
    ref:'Book',
    required:true
  },
  approved:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('request',requestSchema);
