describe('formatResultDate.filter', function() {
	var filter;

	beforeEach(function() {
		module('app', function($provide) {
			specHelper.fakeRouteProvider($provide);
			specHelper.fakeConfig($provide);
		});
		specHelper.injector(function($filter){});
	});

	beforeEach(function() {
		filter = $filter('formatResultDate');
	});

	describe('formatResultDate', function() {

	});
});