var Joi         = require('joi');
var controllers = require('./controllers');

//create a routes array to pass the server.
routes = [
    {
        //entry point
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
            reply("File uploaded!");
        },
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            //validates that the file uploaded is a pdf
            validate: {
                payload: {
                    file: Joi.object({
                        hapi: Joi.object({
                            filename: Joi.string().min(1).regex(/^.*\.(pdf|PDF)$/g).required()
                        }).unknown()
                    }).unknown()
                }
            }
        }
    }
];

module.exports = routes;