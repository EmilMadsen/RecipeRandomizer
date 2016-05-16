/**
 * Created by Nikol_000 on 16-05-2016.
 */

var gulp = require('gulp'); //tool
var less = require('gulp-less'); //library for compiling less -> css

gulp.task('styles', function() {
    gulp.src('styles.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('styles.less',
        ['styles']);
});