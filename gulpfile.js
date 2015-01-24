var gulp        = require('gulp');
var config      = require('./config');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');
var open        = require('open');

var first = true;

gulp.task('open', function(){
    if(first){
        open('http://localhost:'+config.PORT);
        first = false;
    }
    return;
})

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

gulp.task('watch', ['serve'], function() {
    livereload.listen();
    gulp.watch('assets/controllers/*.js').on('change', livereload.changed);
    gulp.watch('assets/routes/*.js').on('change', livereload.changed);
    gulp.watch('./*.js').on('change', livereload.changed);
});

gulp.task('default', ['watch', 'open']);