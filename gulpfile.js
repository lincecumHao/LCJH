var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('lcjh', function(){
    browserify('public/javascripts/src/index.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('watch', function() {
    gulp.watch("public/javascripts/src/**/*.jsx", ["lcjh"])
})

gulp.task('default', ['watch']);