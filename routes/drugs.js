var express = require('express');
var router = express.Router();
var request = require("request");
var openfda = require("../models/OpenFDA");
openfda.setAPIKey(process.env.OpenFDAAPIKey);

/**
 * @api {get} /drugs/adverseevents Request adverse events for a specific drugs
 * @apiName GetAdverseEvents
 * @apiGroup Drugs
 *
 * @apiParam {String} drug Name of the drug to search
 */
router.get('/adverseevents', function(req, res, next) {
	var drug = req.query['drug'];

	openfda.getAdverseEvents(drug, function(err, results){
        res.status(200).json(results);
	});
});

module.exports = router;
