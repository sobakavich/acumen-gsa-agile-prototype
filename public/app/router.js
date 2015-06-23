(function() {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routeConfig ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/search");

		$stateProvider
			.state('search', {
				url: "/search",
				templateUrl: "app/search/search.html",
				controllerAs: "search",
				controller: "SearchCtrl"
			})
			.state('foodDetails', {
				url: "/details",
				templateUrl: "app/foodDetails/foodDetails.html",
				controllerAs: "food",
				controller: "FoodDetailsCtrl"
			});
	}
})();