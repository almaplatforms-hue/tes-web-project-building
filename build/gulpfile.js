const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');

const paths = {
    styles: {
        src: 'styles/style.less',
        dest: 'styles/css/'
    }
};

function styles() {
    return gulp.src('./styles/style.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./dist'));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(styles);
const dev = gulp.series(build, watch);

exports.styles = styles;
exports.watch = watch;
exports.default = dev;