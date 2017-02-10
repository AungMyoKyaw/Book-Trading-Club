const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  city:String,
  state:String
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);
