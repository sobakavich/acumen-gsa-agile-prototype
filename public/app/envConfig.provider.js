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