var request = require("request");
var url = require("url");

var foodService = {};

foodService.options = {
	pageSize: 10
};

foodService.apiKey = null;

var buildSearchQuery = function(searchParameters) {
	var searchQueryParts = [];
	for (var field in searchParameters) {

		if (!searchParameters[field]) {
			continue;
		}

		if (field !== "searchTerm") {
			searchQueryParts.push(field + ":");
		}
		
		searchQueryParts.push(searchParameters[field].replace(/ /g, "+"));
		searchQueryParts.push("+AND+");
	}

	if (searchQueryParts.length > 1) {
		searchQueryParts.remove(searchQueryParts.length - 1);
	}

	return searchQueryParts.join("+");
}

foodService.getFoodEnforcement = function(searchParameters, page, resultCallback) {
	var endpoint = new Object();
	endpoint.protocol = "https:"
	endpoint.host = "api.fda.gov";
	endpoint.pathname = "/food/enforcement.json";
	endpoint.query = {
		"api_key": foodService.apiKey,
		"search": buildSearchQuery(searchParameters),
		"limit": foodService.options.pageSize,
		"skip": page - 1 * foodService.options.pageSize
	};

	var path = url.format(endpoint);

	request.get(path, function(error, response, body) {
		if (error) {
			resultCallback(error, null);
			return;
		}

		var results = JSON.parse(body);
		resultCallback(null, results);
	});
}

foodService.setApiKey = function(key) {
	foodService.ApiKey = key;
}

module.exports = foodService;