var Joi             = require('joi');
var spawn           = require('child_process').spawn;
var uploadHandler   = require('./new').uploadHandler;

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
        handler: uploadHandler,
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
    },
    {
        method: "GET",
        path: "/public/{path*}",
        handler: {
            directory: {
                path: "./public",
                listing: false,
                index: false
            }
        }
    },
    {
        method: "GET",
        path: "/thumbs/{path*}",
        handler: {
            directory: {
                path: "./files/thumbs",
                listing: false,
                index: false
            }
        }
    }
];

module.exports = routes;