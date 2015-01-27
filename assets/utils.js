var exec       = require('child_process').exec;
var fs          = require('fs');
var path        = require('path');

function uploadHandler(request, reply){
    var data = request.payload;
    //normalize the path so we don't have any issues later on
    var pdfPath = path.normalize(__dirname + '/../files/tmp/'+data.file.hapi.filename);
    var tfile = fs.createWriteStream(pdfPath);
    data.file.pipe(tfile);
    data.file.on('end', function(error){
        if(!error){
            /*
                We need to remove the file extension and escape spaces from the filename
            */
            var base = data.file.hapi.filename.replace(/.(pdf|PDF)$/g, '').replace(/\s/g, '\\ ');
            /*
                Create our conversion command:
                    * point it towards the caller's pdf
                    * The flags tell imagemagick how we'd like our png thumbnails created
                        -- These options were chosen with quality in mind
                    * tell it where to place our thumbnails
            */
            var conversion = './files/tmp/'+base+'.pdf -density 300 -quality 100 -sharpen 0x1.0 ./files/thumbs/'
                             +base+'_thumb_%d.png';

            //This is where we start the conversion
            exec('convert ' + conversion, function(error, stdout, stderr){
                if(!error){
                    //Since there were no errors we move on in the process
                    /*
                        We have to bruteforce check for the files of our thumbnails
                        *ls gets the listing of files in our /files/thumbs directory
                            * grep base -- isolates only files containing our base filename. 
                            This works only because of our thumbnail naming convention
                    */
                    exec("ls ./files/thumbs | grep " + base, function(error, stdout, stderr){
                        if(!error){
                            //No error, let's build the response!
                            /*
                                Our final response object will be of this form
                                    {
                                        name: String,
                                        url: [String]
                                    }
                            */
                            var response = {
                                name: base,
                                url: []
                            };
                            //We'll split the ls | grep response, and create a pretty URL to push onto the url response object
                            var lines = stdout.split('\n');
                            //We'll iterate through the lines and only push real urls into the response
                            lines.forEach(function(element, index, array){
                                if(element.length > 0)
                                    response.url.push(request.headers.origin+'/thumbs/'+element);
                            });
                            reply(response);
                        }
                        /*
                            If any one of the above commands fails, we'll let the called know.
                        */
                        else{
                            reply("Error: Something went wrong on our end, sorry about that.");
                        }  
                    })
                }
                else{
                    reply("Error: Unable to create thumbnails from that document, sorry about that.");
                }
            })
        }
        else{
            reply("Error: Something went wrong with that file, please try again.");
        }
    })
}

exports.uploadHandler = uploadHandler;