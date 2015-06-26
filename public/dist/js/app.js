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
            'app.core',
            'app.filters'
        ])
        .run(startup);

    startup.$inject = ['envConfig'];

    function startup (envConfig) {
    	envConfig.setupConfig();
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
            searchForRecalls: searchForRecalls
        };
        return service;
        ////////////////
        function searchForRecalls(params, page) {
            return $http({
                url: envConfig.restServiceBaseURL,
                method: "GET",
                params: {
                    searchTerm: params.searchTerm,
                    status: params.status,
                    classification: params.classification,
                    state: params.state,
                    page: page
                }
            })
                .success(searchComplete)
                .error(searchFailed);

            function searchComplete(response) {
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
		var searchParams;

		this.storeResultSet = function(_resultSet) {
			resultSet = _resultSet;
		};

		this.storeSelectedItem = function(_selectedItem) {
			selectedItem = _selectedItem;
		};

		this.storeLastViewedPage = function(_lastViewedPage) {
			lastViewedPage = _lastViewedPage;
		};

		this.storeSearchParams = function(_searchParams) {
			searchParams = _searchParams;
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

		this.getSearchParams = function() {
			return searchParams;
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
        .module('app.filters', []);
})();
(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('truncate', truncate);
    function truncate() {
        return truncateFilter;
        ////////////////
        function truncateFilter(text, length, end) {
            if (isNaN(length)) {
            	length = 100;
            }

            if (end === undefined) {
            	end = "...";
            }

            if (text.length <= length || text.length - end.length <= length) {
            	return text;
            } else {
            	return String(text).substring(0, length-end.length) + end;
            }
        }
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
        self.getClassName = getClassName;
        self.getClassDescription = getClassDescription;
        self.getClassStyle = getClassStyle;

        console.log(self.selectedFoodItem);

        function formatResultDate(resultDate) {
            var dateNums = resultDate.split('');
            dateNums.splice(4, 0, '-');
            dateNums.splice(7, 0, '-');
            return dateNums.join('');
        }

        function getClassName(classCode){
            var className;
            if (classCode=='Class I'){
                className = 'Dangerous or Defective';
            }
            else if (classCode=='Class II'){
                className = 'Threat or Sickness';
            }
            else if (classCode=='Class III'){
                className = 'Labeling or Legal';
            }
            return className;
        }

        function getClassDescription(classCode){
            var classDescription;
            if (classCode=='Class I'){
                classDescription = 'A dangerous or defective product that predictably could cause serious health problems or death.';
            }
            else if (classCode=='Class II'){
                classDescription = 'This product might cause a temporary health problem, or pose only a slight threat of a serious nature.';
            }
            else if (classCode=='Class III'){
                classDescription = 'This product is unlikely to cause any adverse health reaction, but violates FDA labeling or manufacturing laws.';
            }
            return classDescription;
        }

        function getClassStyle(classCode){
            var classStyle;
            if (classCode=='Class I'){
                classStyle = 'bk-clr-one';
            }
            else if (classCode=='Class II'){
                classStyle = 'bk-clr-two';
            }
            else if (classCode=='Class III'){
                classStyle = 'bk-clr-three';
            }
            return classStyle;
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
        var lastSearchParams;
        vm.title = 'SearchCtrl';

        // props
        vm.pageLoading = false;

        vm.searchParams = resultDataStoreService.getSearchParams();

        if (vm.searchParams) {
            lastSearchParams = angular.copy(vm.searchParams);
        } else {
            vm.searchParams = {
                searchTerm: '',
                status: '',
                classification: '',
                state: ''
            };
        }

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
        vm.searchClicked = searchClicked;
        vm.setPaging = setPaging;
        vm.setSelectedFoodItem = resultDataStoreService.storeSelectedItem;
        vm.pageChanged = pageChanged;

        activate();
        ////////////////
        function activate() {
    		console.log('in search controller!  doing any necessary statup logic...');
        }

        function search () {
            vm.pageLoading = true;
            return ds.searchForRecalls(lastSearchParams, vm.pagination.currentPage)
                .then(function(data) {
                    vm.searchResults = data.data;
                    resultDataStoreService.storeResultSet(vm.searchResults);
                    setPaging();
                    vm.pageLoading = false;
                    return vm.searchResults;
                });
        }

        function searchClicked() {
            // clone so page change searches on last params instead of updates to fields
            // (made without clicking search button)
            resultDataStoreService.storeSearchParams(vm.searchParams);
            lastSearchParams = angular.copy(vm.searchParams);
            vm.pagination.currentPage = 1;
            search();
        }

        function setPaging() {
            var pagingInfo = vm.searchResults.meta.results;
            vm.pagination.totalPages = Math.ceil(pagingInfo.total / pagingInfo.limit);
        }

        function pageChanged() {
            resultDataStoreService.storeLastViewedPage(vm.pagination.currentPage);
            search();
        }
    }
})();