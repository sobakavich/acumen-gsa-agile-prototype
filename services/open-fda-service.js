var request = require("request");
var url = require("url");

var openFdaService = {};

openFdaService.options = {
	pageSize: 10
};

var buildEndpoint = function(pathName, query) {
	var endpoint = new Object();
	endpoint.protocol = "https:";
	endpoint.host = "api.fda.gov";
	endpoint.pathname = pathName;
	endpoint.query = query;

	if (!endpoint.query.hasOwnProperty("api_key") && openFdaService.apiKey) {
		endpoint.query.api_key = openFdaService.apiKey;
	}

	return endpoint;
};

var makeRequest(endpoint, resultCallback) {
	var path = url.format(endpoint);

	request.get(path, function(error, response, body) {
		if (error) {
			resultCallback(error, null);
			return;
		}

		resultCallback(null, JSON.parse(body));
	});
};

openFdaService.getDrugLabel = function(drugId, resultCallback) {
	var endpoint = buildEndpoint("/drug/label.json", {
		"search": "id:" + drugId
		});

	makeRequest(endpoint, resultCallback);
};

openFdaService.getDrugEvents = function(drugId, resultCallback) {
	var endpoint = buildEndpoint("/drug/event.json", {
		"search": "spl_id:" + drugId
	});

	makeRequest(endpoint, resultCallback);
};

openFdaService.searchLabels = function(searchTerm, page, resultCallback) {
	var endpoint = buildEndpoint("/drug/label.json", {
		"search": '"' + searchTerm + '"',
		"limit": openFdaService.options.pageSize,
		"skip": page - 1 * openFdaService.options.pageSize
	});

	makeRequest(endpoint, resultCallback);
};

openFdaService.setApiKey = function(key){
  openFdaService.apiKey = key;
};

openFdaService.apiKey = null;

module.exports = openFdaService;