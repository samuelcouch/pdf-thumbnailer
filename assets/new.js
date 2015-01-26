var exec       = require('child_process').exec;
var fs          = require('fs');
var path        = require('path');

//Debugging the actual exec calls. 
function uploadHandler(request, reply){
    var data = request.payload; //grab the data object
    //normalize the path so we don't have any issues
    var pdfPath = path.normalize(__dirname + '/../files/tmp/'+data.file.hapi.filename);
    var tfile = fs.createWriteStream(pdfPath);
    data.file.pipe(tfile);
    data.file.on('end', function(error){
        if(!error){
            var base = data.file.hapi.filename.replace(/.(pdf|PDF)$/g, ''); //get rid of the file extension
            var conversionOps = './files/tmp/'+data.file.hapi.filename+' -density 300 -quality 100 -sharpen 0x1.0 ./files/thumbs/'+base+'_thumb_%d.png'
            exec('convert ' + conversionOps, function(error, stdout, stderr){
                if(!error){
                    exec("ls ./files/thumbs | grep " + base, function(error, stdout, stderr){
                        if(!error){
                            //No error, let's build the response!
                            var response = {
                                name: base,
                                url: []
                            };
                            //We'll split the ls | grep response, and create a pretty URL to push onto the url response object
                            var lines = stdout.split('\n');
                            lines.forEach(function(element, index, array){
                                if(element.length > 0)
                                    response.url.push(request.headers.origin+'/thumbs/'+element);
                            });
                            reply(response);
                        }
                        else{
                            reply(stderr);
                        }  
                    })
                }
                else{
                    reply(stderr);
                }
            })
        }
        else{
            reply(error);
        }
    })
}

exports.uploadHandler = uploadHandler;