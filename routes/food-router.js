var express = require('express');
var router = express.Router();

var foodService = require('../services/food-service');
foodService.setApiKey(process.env.OpenFdaApiKey);

router.get('/search', function(req, res, next) {
	var searchParameters = {
		searchTerm: req["q"],
		status: req["status"] || "Ongoing",
		classification: req["classification"],
		state: req["state"]
	};

	var page  = req.query["page"] || 1;
	var pageSize = req.query["pagesize"];

	if (pageSize) {
		foodService.options.pageSize = pageSize;
	}

	foodService.searchFoodEnforcement(searchParameters, page, function(error, results) {
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