describe('dataservice', function() {
	beforeEach(function() {
		module('app', function($provide) {
			specHelper.fakeRouteProvider($provide);
			specHelper.fakeConfig($provide);
		});
		specHelper.injector(function($httpBackend, dataservice, envConfig){});
	});

	describe('dataservice', function() {
		it('should be defined', function() {
			expect(dataservice).to.be.defined;
		});

		describe('searchForRecalls', function() {
			it('should exist', function() {
				expect(dataservice.searchForRecalls).to.be.defined;
			});

			xdescribe('on http success', function() {
				it('should return valid http response with data inside', function() {
					$httpBackend.when('GET', '/api/food/search', mockData.getFakeHttpParams()).respond(200, mockData.getMockSearchServiceCall());

					dataservice.searchForRecalls(mockData.getMockSearchParams(), 1).then(function(data) {
						console.log(data);
					});
					// $httpBackend.flush();
				});
			});

			xdescribe('on http error', function() {
				it('should log error to the console', function() {

				});
			});
		});
	});

	// specHelper.verifyNoOutstandingHttpRequests();
});