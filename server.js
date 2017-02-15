const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const glob = require('glob');
const path = require('path');

const app = express();

const config = require('./server/config/config');
const db = config.db;
const port = config.port;

//connect to database
mongoose.connect(db);
let connection = mongoose.connection;
connection.on('error',()=>{
  console.log(`Error on connecting ${db}`);
});
connection.once('open',()=>{
  console.log(`My app is using ${db}`);
});
connection.on('disconnected',()=>{
  console.log(`Successfully disconnected from ${db}`);
});
process.on('SIGINT',()=>{
  connection.close(()=>{
    process.exit(0);
  });
});

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//needed middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.use(session({secret:'ilovejs',resave:true,saveUninitialized:true}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//start passport
require('./server/config/passport');

// launch angular
app.use(express.static(__dirname+'/dist'));

//special Api List
const specialRouteList = glob.sync('./server/route/special/*.js');
specialRouteList.forEach(specialRoute=>{
  app.use('/api',require(specialRoute));
});

//authentication middleware
app.use('/api/*',(req,res,next)=>{
  if(req.isAuthenticated()){
    next();
  } else {
    res.sendStatus(401);
  }
})

//api list
const routeList = glob.sync('./server/route/*.js');
routeList.forEach(route=>{
  app.use('/api',require(route));
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

//starting app
app.listen(port,()=>{
  console.log(`My app is running on port ${port}`);
})
