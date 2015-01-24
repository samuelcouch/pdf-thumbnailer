var Hapi        = require('hapi');
var config      = require('./config'); //Keep our config data out of the way

var server = new Hapi.Server();

server.connection({ 
    port: config.PORT 
});

server.start(function () {
    console.log('The unicorns are running wild on port %d. Everything looks good!', server.info.port); //This is where the magic begins!
});