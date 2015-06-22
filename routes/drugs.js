var express = require('express');
var router = express.Router();
var request = require("request");
var openfda = require("../services/OpenFDAService");
openfda.setAPIKey(process.env.OpenFDAAPIKey);

/**
 * @api {get} /drugs/search Request label information for a specific drug
 * @apiName GetLabel
 * @apiGroup Drugs
 *
 * @apiParam {String} q Name of the drug to search
 * @apiParam {String} page Name of the drug to search
 * @apiParam {String} pagesize Name of the drug to search
 */

 // drugs/search/?q=&page=2&pagesize=20 //skip
 // drugs/:id/label
router.get('/search', function(req, res, next) {
	var query = req.query['q'];
	var page = 1;
	var pagesize = 20;

	if (req.query['page']){
		page = req.query['page'];
	}

	if (req.query['pagesize']){
		pagesize = req.query['pagesize'];
	}

	if (!query){
		return res.status(500).json({"error":"Must have a query to search"});
	}

	openfda.searchLabels(query, page, pagesize, function(err, results){
        return res.status(200).json(results);
	});
});

/**
 * @api {get} /drugs/:id Requests details for a specific drug
 * @apiName GetDrugDetails
 * @apiGroup Drugs
 *
 * @apiParam {Number} id OpenFDA ID of the drug
 */
router.get('/:id', function(req, res, next) {
	var drugId = req.param('id');

	if (!drugId){
		return res.status(500).json({"error":"Must have a drug id"});
	}

	openfda.getDrugLabel(drugId, function(err, results){
        return res.status(200).json(results);
	});
});

module.exports = router;
