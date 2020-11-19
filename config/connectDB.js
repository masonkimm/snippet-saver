
var localCreds = require('./creds.local.json');
var webCreds = require('./creds.heroku.json')

module.exports = {
  local: {
    host: localCreds.host,
    port: localCreds.port,
    user: localCreds.user,
    password: localCreds.password,
    database: localCreds.database,
  },
  heroku:{
    host: webCreds.host,
    port: webCreds.port,
    user: webCreds.user,
    password: webCreds.password,
    database: webCreds.database,
  }
};
