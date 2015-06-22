var express = require('express');
var router = express.Router();
var request = require("request");
var openfda = require("../services/OpenFDAService");
openfda.setAPIKey(process.env.OpenFDAAPIKey);

/**
 * @api {get} /drugs/:id Requests details for a specific drug
 * @apiName GetDrugDetails
 * @apiGroup Drugs
 *
 * @apiParam {Number} id OpenFDA ID of the drug
 */
router.get('/:id', function(req, res, next) {
	var drugId = req.param('id');

	openfda.getDrugDetails(drugId, function(err, results){
        res.status(200).json(results);
	});
});

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
	var page = req.query['page'];
	var pagesize = req.query['pagesize'];

	// default pagesize to 20
	if (!pagesize){
		pagesize = 20;
	}

	openfda.searchLabels(query, page, pagesize, function(err, results){
        res.status(200).json(results);
	});
});

module.exports = router;
