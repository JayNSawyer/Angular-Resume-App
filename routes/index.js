var express = require('express');
var router = express.Router();

/* GET home page. */

var users = [
	{
		id: 0,
		first_name: 'Jimmy',
		last_name: 'Jones'
	},
	{
		id: 1,
		first_name: 'Tommy',
		last_name: 'Thompson'
	},
	{
		id: 2,
		first_name: 'Sammy',
		last_name: 'Smith'
	}
];

/* Template */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users: users });
});


/* JSON API */

router.get('/api/users', function(req, res, next){
  res.json(users);
});


module.exports = router;
