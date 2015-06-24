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

	angular.module('app')
		.service('resultDataStoreService', resultDataStoreService);

	function resultDataStoreService() {

		var selectedItem;
		var resultSet;
		var lastViewedPage;

		this.storeResultSet = function(_resultSet) {
			resultSet = _resultSet;
		};

		this.storeSelectedItem = function(_selectedItem) {
			selectedItem = _selectedItem;
		};

		this.storeLastViewedPage = function(_lastViewedPage) {
			lastViewedPage = _lastViewedPage;
		};

		this.getResultSet = function() {
			return resultSet;
		};

		this.getSelectedItem = function() {
			return selectedItem;
		};

		this.getLastViewedPage = function() {
			return lastViewedPage;
		};
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
    FoodDetailsCtrl.$inject = ['resultDataStoreService'];
    /* @ngInject */
    function FoodDetailsCtrl(resultDataStoreService) {
        var self = this;

        self.selectedFoodItem = resultDataStoreService.getSelectedItem();
        self.formatResultDate = formatResultDate;

        function formatResultDate(resultDate) {
            var dateNums = resultDate.split('');
            dateNums.splice(4, 0, '-');
            dateNums.splice(7, 0, '-');
            return dateNums.join('');
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);
    SearchCtrl.$inject = ['dataservice', 'envConfig', 'resultDataStoreService'];
    /* @ngInject */
    function SearchCtrl(ds, envConfig, resultDataStoreService) {
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

        vm.pagination = {
            currentPage: resultDataStoreService.getLastViewedPage() || 1,
            maxPageDisplay: 5,
            totalPages: 0
        };

        vm.searchResults = resultDataStoreService.getResultSet();
        if (!vm.searchResults) {
            vm.searchResults = [];
        } else {
            setPaging();
        }

        // functions
        vm.search = search;
        vm.setPaging = setPaging;
        vm.setSelectedFoodItem = resultDataStoreService.storeSelectedItem;
        vm.pageChanged = pageChanged;

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
                    resultDataStoreService.storeResultSet(vm.searchResults);
                    setPaging();
                    return vm.searchResults;
                });
        }

        function setPaging() {
            var pagingInfo = vm.searchResults.meta.results;
            vm.pagination.totalPages = Math.ceil(pagingInfo.total / pagingInfo.limit);
        }

        function pageChanged() {
            resultDataStoreService.storeLastViewedPage(vm.pagination.currentPage);
            // TODO : RETRIEVE NEXT PAGE OF RESULTS
        }
    }
})();