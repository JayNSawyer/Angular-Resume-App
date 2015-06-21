function registerUser (body){
	var user = new User();

	user.firstname = body.firstname;
	user.lastname = body.lastname;
	user.email = body.email;
	user.username = body.username;
	user.setPassword(body.password);

	return user;
}

module.exports = registerUser;