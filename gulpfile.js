var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    globbing = require('gulp-css-globbing'),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    exec = require('child_process').exec,
    karmaServer = require('karma').Server;

/*
 * This task compiles Sass into CSS
 * The server does not need to restart on styling changes.
 */
gulp.task('sass', function() {
  return gulp.src('sass/main.scss')
    .pipe(globbing({
        // Configure it to use SCSS files
        extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('public/styles'));
});


/*
 * This task starts a MongoDB server.
 * It should only start the server if there isn't one running already
 * (this sometimes happens if there was an error in the last start up)
 */
gulp.task('startDB', function (cb) {
	exec('mongod', function (err, stdout, stderr) {
		console.log('Gulp startDB: ', stdout);
		console.log('Gulp startDB err: ', stderr);
		cb(err);
	});
});


/*
 * This task starts the Node.js server,
 * It should restart when anything server side changes
 *     server.js, passport.js, routes, controllers (although they're not set up yet), & models
 */
gulp.task('startNODE', function () {
    nodemon({
        script: 'server.js',
        ignore: ['public/'],
        env: { 'NODE_ENV': 'development' }
    })
    .on('restart', function () {
      console.log('restarted!');
    })
    .on('error', gutil.log);;
});

/*
 * The watchers on the wall
 */
 //watch: ['server.js', 'passport.js', 'routes/']
gulp.task('watch', function() {
    console.log('GULP: watch');
    gulp.watch('sass/**/*.scss', ['sass']);
});

/*
 * The Karma test
 * Test files are beside their 'real life' counterparts
 */
gulp.task('test', function (exitCode) {
    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        gutil.log('exitCode: ', exitCode);
        process.exit(exitCode);
    });
});

/*
 * The tasks to run
 */
gulp.task('dev', ['sass','startDB','startNODE','watch']);
gulp.task('default', ['startDB','startNODE']);