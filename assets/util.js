var exec        = require('child_process').exec;
var fs          = require('fs');
var path        = require('path');

function uploadHandler(req, reply){
    var data = req.payload;
    var pdfPath = path.normalize(__dirname + '/../files/tmp/'+data.file.hapi.filename);
    var tfile = fs.createWriteStream(pdfPath);
    data.file.pipe(tfile); 
    data.file.on('end', function(err) {
        if(!err){
            var base = data.file.hapi.filename.replace(/.(pdf|PDF)$/g, ''); //get rid of the file extension
            //options for the convert operation
            var convertOptions = __dirname+'/files/tmp/'+data.file.hapi.filename + 
                                 ' scene -1 -density 150 -quality 100 -sharpen 0x1.0 ' +
                                  __dirname+'/files/thumbs/'+base+'_thumb_%d.png'; 
                                  //in actural practice the thumb filename should probably be serialized to the caller or other unique factor to avoid naming conflicts
            exec('convert', convertOptions, function(err, stdout, stderr){
                if(!err){
                    //split the thumbs directory, to get each of the added thumbnails
                    exec("ls ./files/thumbs | grep " + base, function(error, stdout, stderr){
                        if(!error){
                            //start building the response
                            res = {
                                name: base,
                                url: {}
                            };
                            var lines = stdout.split('\n');
                            //iterate through the lines and push the resulting file onto the response url object
                            lines.foreach(function(line){
                                res.url.push(req.headers.uri+'/thumbs/'+line);
                            });
                            //We've built our response now, and we can send it back to the caller
                            console.log(res);
                            reply(res);
                        }
                        else{
                            reply(error.stack);
                        }
                    })
                }
                else{
                    reply("convert error");
                }
            });
        }
        else{
            reply("file error");
        }
    })
}

exports.uploadHandler = uploadHandler;