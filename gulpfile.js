var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');
var open        = require('open');
var config      = require('./assets/config');
var exec        = require('child_process').exec;

var first = true;

//the first time gulp is run, your default browser will open up the webapp
gulp.task('open', function(){
    if(first){
        open('http://localhost:'+config.PORT);
        first = false;
    }
    return;
});

gulp.task('setup', function(){
    exec('mkdir -p ./files/thumbs ./files/tmp', function(error, stdout, stderr){
        if(!error){
            console.log("Setup complete!");
        }
        else{
            console.log("There was a problem with the setup: %s", stderr);
        }
    })
})

//serve up the webapp with nodemon
gulp.task('serve', function() {
    // Runs the server forever
    nodemon({
        script: 'index.js',
        ext: 'js',
        env: {
            PORT: config.PORT
        }
    });
});

//watch for file updates and livereload the changes
gulp.task('watch', ['serve'], function() {
    livereload.listen();
    gulp.watch('assets/controllers/*.js').on('change', livereload.changed);
    gulp.watch('assets/routes/*.js').on('change', livereload.changed);
    gulp.watch('./*.js').on('change', livereload.changed);
    gulp.watch('public/**/*.*').on('change', livereload.changed);
});

gulp.task('default', ['watch', 'open']);