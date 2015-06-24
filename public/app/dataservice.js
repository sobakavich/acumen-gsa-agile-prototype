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

            return $http.get('http://localhost:3000/api/food/search?classification=Class+I&searchTerm=sdf&state=AZ&status=Ongoing')
            /*return $http({
                url: envConfig.restServiceBaseURL,
                method: "GET",
                params: {
                    searchTerm: params.searchTerm,
                    status: params.status,
                    classification: params.classification,
                    state: params.state
                }
            })*/
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