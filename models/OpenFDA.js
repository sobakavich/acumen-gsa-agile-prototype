var request = require("request");
var url = require("url");

var OpenFDA = function(){
	OpenFDA.super_.call(this);
};

OpenFDA.getAdverseEvents = function(drug, completion){
  var endpoint = new Object();
  endpoint.protocol = "https:"
  endpoint.host = "api.fda.gov";
  endpoint.pathname = "/drug/event.json";
  endpoint.query = {"api_key": OpenFDA.apiKey,
              "search": "patient.drug.openfda.pharm_class_epc:\"" + drug + "\""};

  var path = url.format(endpoint);

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

OpenFDA.setAPIKey = function(key){
  OpenFDA.apiKey = key;
}

OpenFDA.apiKey = null;

module.exports = OpenFDA;