var expect = require('chai')
	.expect;
var request = require('request');

// Start the server before testing
const server = require('../../server')
	.server;
const PORT = require('../../server')
	.PORT;
const url = 'http://localhost:' + PORT;

describe('Node.js Mobile Foundation Simple template', function() {
	// Testing / endpoint, should return 200
	describe('/ endpoint', function() {
		it('status', function(done) {
			request(url + '/analytics/customlogs', function(error, response, body) {
				expect(response)
					.to.equal(202);
				done();
			});
		});
	});
});

// Stop the server after testing
after(done => {
	server.close(done);
});