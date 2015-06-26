function validateLogin(body, statusObj){
	var status = statusObj;
	if(!body.username){
		status.message = 'Please enter your username';
	} else if (!body.password){
		status.message = 'Please enter your password';
	} else {
		status.message = 'You have successfully logged in';
		status.presence = true;
	}
	return status;
}

function validateRegister(body, statusObj){
	var status = statusObj;
	if(!body.email){
		status.message = 'Please fill out your email';
	} else if (!body.password){
		status.message = 'Please fill out your password';
	} else if (!body.firstname){
		status.message = 'Please fill out your first name';
	} else if (!body.lastname){
		status.message = 'Please fill out your last name';
	} else {
		status.message = 'You have successfully registered';
		status.presence = true;
	}
	console.log(status);
	return status;
}


function validates (body, feature){
	var currentStatus = {
		message: '',
		presence: false
	};

	if (feature === 'login'){
		return validateLogin(body, currentStatus);
	}

	if (feature === 'register'){
		return validateRegister(body, currentStatus);
	}

}

var validationObject = {
	validates: validates
};


module.exports = validationObject;