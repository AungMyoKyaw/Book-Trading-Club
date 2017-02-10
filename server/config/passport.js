const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.use('signup',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},(req,email,password,done)=>{
  User.findOne({email:email})
      .then(user=>{
        if(user){
          done(null,false,{message:'This email address has been used'});
        } else {
          let newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.username = req.body.username;
          return newUser.save()
        }
      })
      .then(user=>{
        done(null,user);
      })
      .catch(err=>{
        return done(err);
      })
}))

passport.use('login',new LocalStrategy({
  usernameField:'email',
  passwordField:'password'
},(email,password,done)=>{
  User.findOne({email:email})
      .then(user=>{
        if(!user){
          return done(null,false,{message:'Incorrect useremail'});
        }
        if(!user.validPassword(password)){
          return done(null,false,{message:'Incorrect password'});
        }
        return done(null,user);
      })
      .catch(err=>{
        return done(err);
      })
}));

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user);
  })
});

console.log('passport is running');
