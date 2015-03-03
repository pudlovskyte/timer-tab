var child_process = require('child_process');

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var notify = function(message){
    if (process.platform === 'darwin') {
        child_process.spawn(
            'osascript',
            ['-e', 'display notification "'+message+'" with title "LESS compilation failed"']
        );
    }
};

var build = function(){
    gulp.src('src/timertab.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .on('error', function(e){
            console.log(e.message);

            // Remove long file path
            notify(e.message.replace(/(in file) .+?\/([^\/]+\.less line no)/, '$1 $2'));

            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
};

gulp.task('build', build);

gulp.task('default', function() {
    build();
    gulp.watch(['src/timertab.less', 'src/styles/*.less'], ['build']);
});

