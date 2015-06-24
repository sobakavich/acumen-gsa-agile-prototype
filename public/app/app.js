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
    }
})();