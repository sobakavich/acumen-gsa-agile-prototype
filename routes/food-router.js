var express = require('express');
var router = express.Router();

var openFdaService = require('../services/open-fda-service');
openFdaService.setApiKey(process.env.OpenFdaApiKey);

router.get('/search', function(req, res, next) {
	var searchParameters = {
		searchTerm: req.query["q"],
		status: req.query["status"] || "Ongoing",
		classification: req.query["classification"],
		state: req.query["state"]
	};

	var page  = req.query["page"] || 1;
	var pageSize = req.query["pagesize"];

	if (pageSize) {
		openFdaService.options.pageSize = pageSize;
	}

	openFdaService.searchFoodEnforcement(searchParameters, page, function(error, results) {
		if (error) {
			// TODO : CAN PROBABLY GET A BETTER STATUS CODE BY MODIFYING THE FOOD SERVICE
			return res.status(500).json({
				"error" : error
			});
		}

		return res.status(200).json(results);
	});
});

module.exports = router;