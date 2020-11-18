var connection = null;

if(process.env.database){
  local = {
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpw,
    database: process.env.database,
    port: process.env.dbport
  }
} 
else {
  var creds = require("../creds.template.json");
  local = {
    host: creds.host,
    user: creds.user,
    password: creds.pw,
    database: creds.database,
    port: creds.port
  }
};

module.exports = {
  local
}