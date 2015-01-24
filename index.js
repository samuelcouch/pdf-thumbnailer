var Hapi        = require('hapi');
var config      = require('./config'); //Keep our config data out of the way
var routes      = require('./assets/routes'); //Keep our routes in their own sandbox


var server = new Hapi.Server();

server.connection({ 
    port: config.PORT 
});

server.route(routes); //Pass the server our routes object

server.start(function () {
    //This is where the magic begins!
    console.log('The unicorns are running wild on port %d. Everything looks good!', server.info.port);
});