var path        = require('path'); 

exports.isPDF = function(filename){
    if(path.extname(filename) === '.pdf'){
        return true;
    }
    return false;
}