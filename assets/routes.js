var Joi             = require('joi');
var uploadHandler   = require('./utils').uploadHandler;

//create an array of routes to pass the server.
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
            /*
                Validates that:
                *The payload has a key named  `file`, of type object with unknown keys
                    * `file` is an object with unknown keys -- including one key called `hapi`
                        * `hapi` is an object with unknown keys
                            * filename is a string ending in .pdf/PDF
            */
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
        //Expose /public/ to the world
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
        //expose /files/thumbs to the world
        //This allows the caller to access their thumbnails
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