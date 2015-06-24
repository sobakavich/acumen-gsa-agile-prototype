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
        vm.pageLoading = false;

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
    		console.log('in search controller!  doing any necessary statup logic...');
        }

        function search () {
            vm.pageLoading = true;
            return ds.searchForRecals(vm.searchParams, vm.pagination.currentPage)
                .then(function(data) {
                    vm.searchResults = data.data;
                    resultDataStoreService.storeResultSet(vm.searchResults);
                    setPaging();
                    vm.pageLoading = false;
                    return vm.searchResults;
                });
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