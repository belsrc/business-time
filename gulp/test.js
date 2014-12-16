var plato = require('plato');
var gulp  = require('gulp');
var Mocha = require('mocha');
var fs    = require('fs');
var exec  = require('child_process').exec;

var pack  = require('../package.json');


/**
 * Instruments the code using JSCoverage.
 */
var instrumentCode = function(callback) {
  exec('jscoverage --no-highlight lib lib-cov', function(error, stdout, stderr) {
    callback(error ? error.stack : stderr);
  });
};

/**
 * Runs test cases in console to check pass or fails.
 */
var runPassFail = function() {
  var mocha = new Mocha({
    ui: 'tdd',
    reporter: 'spec',
  });

  mocha.addFile('./test/business-time.js');

  mocha.run(function(error) {
    process.on('exit', function () {
      process.exit(error);
    });
  });
};


/**
 * Runs the test case for code coverage.
 */
var getCoverage = function(callback) {
  exec('node node_modules/mocha/bin/mocha --reporter html-cov --ui tdd --recursive test', function (error, stdout, stderr) {
    if(error || stderr) {
      callback(error ? error.stack : stderr);
    }
    else {
      fs.writeFile('./docs/unit-test/index.html', stdout, function(error) {
        callback(error ? error.stack : null);
      });
    }
  });
};


/*
|--------------------------------------------------------------------------
| Code Analysis
|--------------------------------------------------------------------------
*/
gulp.task('analysis', function() {
  // Plato configuration
  var files = ['./lib/business-time.js'];
  var output = './docs/analysis';
  var options = {
    title: pack.name,
    recurse: true,
    jshint: './.jshintrc',
  };

  console.log('Starting code analysis...');
  plato.inspect(files, output, options, function(report) {
    console.log('Analysis complete...');
  });
});


/*
|--------------------------------------------------------------------------
| Unit Testing
|--------------------------------------------------------------------------
*/
gulp.task('testing', function() {
  instrumentCode(function(error) {
    if(error) {
      console.error(error);
    }
    else {
      runPassFail();
      getCoverage(function(error) {
        if(error) {
          console.error(error);
        }
      });
    }
  });
});


/*
|--------------------------------------------------------------------------
| Simple Unit Testing
|--------------------------------------------------------------------------
*/
gulp.task('unit', function() {
  runPassFail();
});


/*
|--------------------------------------------------------------------------
| Code Base Documentation
|--------------------------------------------------------------------------
*/
gulp.task('documentation', function() {
  exec('node node_modules/jsdoc/jsdoc.js -r lib --destination docs/documentation', function (error, stdout, stderr) {
    if(error || stderr) {
      console.error(error ? error.stack : stderr);
    }
  });
});
