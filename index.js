var Hapi        = require('hapi');
var config      = require('./assets/config'); //Keep our config data out of the way
var routes      = require('./assets/routes'); //Keep our routes 

var server = new Hapi.Server();

server.connection({ 
    port: config.PORT 
});

server.route(routes); //Pass the server our routes

server.start(function () { 
    //console.log added as a callback to the server.start() function to avoid situations where
    //the console message is displayed, but server is not yet running.
    console.log('The gnomes are creating thumbnails on port %d. Everything looks good!', server.info.port);
});