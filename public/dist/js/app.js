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
        ])
        .run(startup);

    startup.$inject = ['envConfig'];

    function startup (envConfig) {
    	envConfig.setupConfig();
        console.dir(envConfig);
    }
})();
(function() {
    'use strict';
    angular
        .module('app')
        .factory('dataservice', dataservice);
    dataservice.$inject = ['$http', 'envConfig'];
    /* @ngInject */
    function dataservice($http, envConfig) {
        var service = {
            searchForRecals: searchForRecals
        };
        return service;
        ////////////////
        function searchForRecals(params) {
            console.dir(params);

            return $http({
                url: envConfig.restServiceBaseURL,
                method: "GET",
                params: {
                    searchTerm: params.searchTerm,
                    status: params.status,
                    classification: params.classification,
                    state: params.state
                }
            })
                .success(searchComplete)
                .error(searchFailed);

            function searchComplete(response) {
                // debugger;
                // console.dir(response);
                return response;
            }

            function searchFailed(error) {
                console.log('search failed:  ' + error.data);
            }
        }
    }
})();
(function() {
	'use strict';

	angular
		.module('app')
		.provider('envConfig', envConfigProvider);

	function envConfigProvider() {
		this.$get = envConfigHelper;

		function envConfigHelper() {

			var service = {
				setupConfig: setupConfig
			};

			return service;

			/////////////

			function setupConfig() {
				var q = jQuery.ajax({
					type: 'GET',
					url: '../config/app.config.json',
					cache: false,
					async: false,
					contentType: 'application/json',
					dataType: 'json'
				});

				if (q.status === 200){
					angular.extend(service, angular.fromJson(q.responseText));
				}
			}
		}
	}
})();
(function() {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

	function routeConfig ($stateProvider, $urlRouterProvider, $httpProvider) {
		// need to do some header crap first
		// $httpProvider.defaults.useXDomain = true;
		// delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
    SearchCtrl.$inject = ['dataservice', 'envConfig'];
    /* @ngInject */
    function SearchCtrl(ds, envConfig) {
        var vm = this;
        vm.title = 'SearchCtrl';

        // props
        vm.searchParams = {
            searchTerm: '',
            status: '',
            classification: '',
            state: ''
        };

        vm.stateList = envConfig.recallLookups.stateLookups;
        vm.statusList = envConfig.recallLookups.statusLookups;
        vm.classificationList = envConfig.recallLookups.classificationLookups;

        vm.searchResults = [];

        vm.pagination = {
            currentPage: 1,
            maxPageDisplay: 5,
            totalPages: 0
        };

        // functions
        vm.search = search;
        vm.setPaging = setPaging;

        activate();
        ////////////////
        function activate() {
    		console.log('in search controller!');
        }

        function search () {
            return ds.searchForRecals(vm.searchParams)
                .then(function(data) {
                    // console.dir(data.data);
                    vm.searchResults = data.data;
                    setPaging();
                    return vm.searchResults;
                });
        }

        function setPaging() {
            var pagingInfo = vm.searchResults.meta.results;
            vm.pagination.totalPages = Math.ceil(pagingInfo.total / pagingInfo.limit);
        }
    }
})();