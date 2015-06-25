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