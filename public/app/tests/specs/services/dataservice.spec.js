xdescribe('dataservice.js', function() {
	var factory;

	beforeEach(function() {
		module('app', function($provide) {
			specHelper.fakeRouteProvider($provide);
			specHelper.fakeConfig($provide);
		});
		specHelper.injector(function($http, envConfig){});
	});

	/*beforeEach(function() {
		factory = $factory('dataservice');
	});*/

	describe('dataservice', function() {
		describe('searchForRecalls', function() {
			describe('on http success', function() {
				it('should return valid http response with data inside', function() {

				});
			});

			describe('on http error', function() {
				it('should log error to the console', function() {

				});
			});
		});
	});
});