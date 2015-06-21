// Basic authentication for API endpoints
module.exports = function(req, res, next) {
 
	// We skip the token outh for [OPTIONS] requests.
	if(req.method == 'OPTIONS') next();
 
	var token = req.headers['x-access-token'];
 
	if (token == "LQMVKLBSFUWIEOTNXCCVSKJO") {
	    next(); // To move to next middleware
	} else {
		res.status(401);
		res.json({"status": 401, "message": "Invalid Token or Key"});
	}
	return;
};