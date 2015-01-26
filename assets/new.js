var exec       = require('child_process').exec;
var fs          = require('fs');
var path        = require('path');

//Debugging the actual exec calls. 
function uploadHandler(request, reply){
    var data = request.payload; //grab the data object
    //normalize the path so we don't have any issues
    var pdfPath = path.normalize(__dirname + '/files/tmp/'+data.file.hapi.filename);
    var tfile = fs.createWriteStream(pdfPath);
    data.file.pipe(tfile);
    data.file.on('end', function(error){
        if(!error){
            var base = data.file.hapi.filename.replace(/.(pdf|PDF)$/g, ''); //get rid of the file extension
            var conversionOps = './files/tmp/'+data.file.hapi.filename+' scene -1 -density 150 -quality 100 -sharpen 0x1.0 ./files/thumbs/'+base+'_thumb_%d.png'
            exec('convert ' + conversionOps, function(error, stdout, stderr){
                console.log(error);
            })
        }
        else{
            console.log(error);
        }
    })
}

exports.uploadHandler = uploadHandler;