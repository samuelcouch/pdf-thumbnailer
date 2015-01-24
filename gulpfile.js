var gulp        = require('gulp');
var config      = require('./config');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');

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

gulp.task('default', ['watch']);