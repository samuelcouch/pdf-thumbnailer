var controllers = require('../controllers');

routes = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {
                reply('Hello, world!');
            }
        }
    },
    {
        method: 'POST',
        path: '/upload',
        config: {
            handler: function(request, reply) {
                reply('Test works!');
            }
        }
    }

];

module.exports = routes;