var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

    var Claim = require('../models/claim');

/*          /user
 * =================================
 * This provides data to the user about the user
 */

	router.get('/myData', function(req, res) {
		/*
		 * This provides information to users who have logged in about themselves.
		 * Even though it requires access it should not send any sensitive data. 
		 */
		res.status(200).send(req.user);
	});

module.exports = router;
/*
db.claims.insert({'description':'this is claim 1', axiom:false, status:true})
*/
