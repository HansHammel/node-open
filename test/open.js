/*global describe it */

var path = require('path');
var open = require('../');
var os = require("os");

// NOTE: this is not really an automated test suite.
// It does not check that the applications are actually opened. This needs
// to be verified manually.  It *does* ensure that the opener process
// does not return an error, and this is a good proxy for success for
// much less effort.
//
// this test should be run with both 'npm test' and 'sudo npm test' to make
// sure the application is opened in user context even during sudo
//
// the xdg-open script behaves differently than start and open in that
// it does not return after opening the process, it waits until the child
// process exits.  Because of this, the callback parameter is not documented
// in the readme at this time.
describe('open', function () {
	this.timeout(20000);
	
  function pathTo(asset) {
    return path.join(__dirname, 'support', asset);
  }

  it('should open html file in default browser', function (done) {
    var p = open(pathTo('asset.html'), done);
    process.on('exit', function () {
		    p.kill();
		});
  });

  it('should open https uris in default browser', function (done) {
    var p = open('https://github.com/pwnall/node-open', done);
        process.on('exit', function () {
		    p.kill();
		});
  });

  //it('should open image file in default image viewer', function (done) {
    //var p = open(pathTo('asset.jpg'), done);
    //process.on('exit', function () {
		//    p.kill();
		//});
  //});

  it('should open txt file in default text editor', function (done) {
    var p = open(pathTo('asset.txt'), function (error) {
      console.log('yep editor is open');
      done();
    });
    process.on('exit', function () {
		    p.kill();
		});
  });

  it('should open files with spaces', function (done) {
    var p = open(pathTo('with space.html'), done);
    process.on('exit', function () {
		    p.kill();
		});
  });

	if (os.platform() == "win32") {
	
	  xit('should open files with quotes', function (done) {
	    var p = open(pathTo('with\'quote.html'), done);
	    process.on('exit', function () {
			    p.kill();
			});
	  });
	
	  xit('should open files in the specified application', function (done) {
	    var p = open(pathTo('with space.html'), 'firefox', done);
	    //kill the process if timeout is exceeded to kill all "commandnot found" messages on windows
	    process.on('exit', function () {
			    p.kill();
			});
	  });
	
	} else {
	
	  it('should open files with quotes', function (done) {
	    var p = open(pathTo('with\'quote.html'), done);
	    process.on('exit', function () {
			    p.kill();
			});
	  });
	
	  it('should open files in the specified application', function (done) {
	    var p = open(pathTo('with space.html'), 'firefox', done);
	    process.on('exit', function () {
			    p.kill();
			});
	  });
	
	}
	
});

