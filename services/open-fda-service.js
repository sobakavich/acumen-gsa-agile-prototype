var request = require("request");
var url = require("url");

var OpenFDAService = function(){};

OpenFDAService.getDrugLabel = function(drugId, completion){
  var endpoint = new Object();
  endpoint.protocol = "https:"
  endpoint.host = "api.fda.gov";
  endpoint.pathname = "/drug/label.json";
  endpoint.query = {"api_key": OpenFDAService.apiKey,
              "search": "id:" + drugId};

  var path = url.format(endpoint);
  console.log("OpenFDA Callout: " + path);

  request.get(path, function (err, response, body) {
      if (err) {
        return completion(err, null);
      }
      else{
        var resultsObj = JSON.parse(body);
        return completion(null, resultsObj);
      }
  });
}

OpenFDAService.getDrugEvents = function(drugId, completion){
  var endpoint = new Object();
  endpoint.protocol = "https:"
  endpoint.host = "api.fda.gov";
  endpoint.pathname = "/drug/event.json";
  endpoint.query = {"api_key": OpenFDAService.apiKey,
              "search": "spl_id:" + drugId};

  var path = url.format(endpoint);
  console.log("OpenFDA Callout: " + path);

  request.get(path, function (err, response, body) {
      if (err) {
        return completion(err, null);
      }
      else{
        var resultsObj = JSON.parse(body);
        return completion(null, resultsObj);
      }
  });
}

OpenFDAService.searchLabels = function(drug, page, pagesize, completion){
  var endpoint = new Object();
  endpoint.protocol = "https:"
  endpoint.host = "api.fda.gov";
  endpoint.pathname = "/drug/label.json";
  endpoint.query = {"api_key": OpenFDAService.apiKey,
              "search": "\"" + drug + "\"",
              "limit": pagesize};

  if (page>1){
    endpoint.query["skip"] = page-1*pagesize;    
  }

  var path = url.format(endpoint);
  console.log("OpenFDA Callout:" + path);

  request.get(path, function (err, response, body) {
      if (err) {
        return completion(err, null);
      }
      else{
        var resultsObj = JSON.parse(body);
        return completion(null, resultsObj);
      }
  });
}

OpenFDAService.setAPIKey = function(key){
  OpenFDAService.apiKey = key;
}

OpenFDAService.apiKey = null;

module.exports = OpenFDAService;