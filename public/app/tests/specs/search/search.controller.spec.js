describe('search.controller', function() {
	var controller;

	beforeEach(function() {
		module('app', function($provide) {
			specHelper.fakeRouteProvider($provide);
		});
		specHelper.injector(function($controller, $q, $rootScope, dataservice, envConfig, resultDataStoreService){});
	});

	/*beforeEach(function() {
		sinon.stub(dataservice, 'searchForRecals', function() {
			var deferred = $q.defer();
			deferred.resolve()
		})
	})*/

	describe('search controller', function() {
		it('should be created successfully', function() {
			//assert.to.be.defined(controller);
		});
	});
});