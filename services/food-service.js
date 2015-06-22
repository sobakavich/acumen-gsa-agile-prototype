var request = require("request");
var url = require("url");

var foodService = {};

foodService.options = {
	pageSize: 10
};

foodService.apiKey = null;

foodService.getFoodEnforcement = function(searchTerm, page, successCallback, errorCallback) {
	var endpoint = new Object();
	endpoint.protocol = "https:"
	endpoint.host = "api.fda.gov";
	endpoint.pathname = "/food/enforcement.json";
	endpoint.query = {
		"api_key": foodService.apiKey,
		"search": "\"" + searchTerm + "\"",
		"limit": foodService.options.pageSize,
		"skip": page - 1 * foodService.options.pageSize
	};

	var path = url.format(endpoint);

	request.get(path, function(error, response, body) {
		if (error) {
			errorCallback(error);
			return;
		}

		var results = JSON.parse(body);
		successCallback(results);
	});
}

foodService.setApiKey = function(key) {
	foodService.ApiKey = key;
}

module.exports = foodService;