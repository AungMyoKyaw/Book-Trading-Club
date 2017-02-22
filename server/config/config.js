//get env Name from commandline
let envName = process.argv[2] ? process.argv[2] : 'development';

//get env Name from process.env
envName = process.env.NODE_ENV || 'development';

//config
let config = {
  development:{
    db:process.env.BTC_DB,
    port:4444
  },
  production:{
    db:process.env.BTC_DB,
    port:process.env.PORT
  }
}

module.exports = config[envName];
