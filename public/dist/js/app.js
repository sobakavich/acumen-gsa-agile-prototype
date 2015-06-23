(function() {
    'use strict';
    angular
        .module('app.core', [
            'ui.router',
            'ui.bootstrap'
        ]);
})();
(function() {
    'use strict';
    angular
        .module('app', [
            'app.core'
        ]);
})();
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
(function() {
    'use strict';
    angular
        .module('app')
        .controller('FoodDetailsCtrl', FoodDetailsCtrl);
    FoodDetailsCtrl.$inject = [];
    /* @ngInject */
    function FoodDetailsCtrl() {
        var vm = this;
        vm.title = 'FoodDetailsCtrl';
        activate();
        ////////////////
        function activate() {
    		console.log('in search results controller!');
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);
    SearchCtrl.$inject = [];
    /* @ngInject */
    function SearchCtrl() {
        var vm = this;
        vm.title = 'SearchCtrl';

        // props
        vm.keyword = '';

        // functions
        vm.search = search;

        activate();
        ////////////////
        function activate() {
    		console.log('in search controller!');
        }

        function search () {
            console.log('searching for ' + vm.keyword);
        }
    }
})();