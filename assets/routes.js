var Joi         = require('joi');
var controllers = require('./controllers');

//create a routes array to pass the server.
routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            reply.file('./public/pages/index.html');
        }
    },
    {
        method: 'POST',
        path: '/upload',
        handler: function(req, reply) {
            reply(req.payload.file.hapi.filename);
            console.log(req.payload.file.hapi.filename);
        },
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: {
                    file: Joi.object({
                        hapi: Joi.object({
                            finename: Joi.string().regex(/^.*\.(pdf|PDF)$/g)
                        }).unknown().required()
                    }).unknown().required()
                }
            }
        }
    }
];

module.exports = routes;