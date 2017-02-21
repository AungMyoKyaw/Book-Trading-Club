//get env Name from commandline
let envName = process.argv[2] ? process.argv[2] : 'development';

//get env Name from process.env
envName = process.env.NODE_ENV || 'development';

//config
let config = {
  development:{
    db:'mongodb://book_trading_club:HMxwy37S2zJvb3F4P3rfjVCdmF8W9K@ds147799.mlab.com:47799/book_trading_club',
    port:4444
  },
  production:{
    db:'mongodb://book_trading_club:HMxwy37S2zJvb3F4P3rfjVCdmF8W9K@ds147799.mlab.com:47799/book_trading_club',
    port:process.env.PORT
  }
}

module.exports = config[envName];
