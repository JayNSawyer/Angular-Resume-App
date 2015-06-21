function validateLogin(body, statusObj){
	if(!body.username){
		statusObj.message = 'Please enter your username';
	} else if (!body.password){
		statusObj.message = 'Please enter your password';
	} else {
		statusObj.message = 'You have successfully logged in';
		statusObj.presence = true;
	}
}

function validateRegister(body, statusObj){
	if(!body.email){
		status.message = 'Please fill out your email';
	} else if (!body.password){
		status.message = 'Please fill out your password';
	} else if (!body.firstname){
		status.message = 'Please fill out your first name';
	} else if (!body.lastname){
		status.message = 'Please fill out your last name';
	} else {
		status.message = 'You have successfully logged in';
		status.presence = true;
	}
}


function validates (obj){
	var status = {
		message: '',
		presence: false
	};

	if (obj.feature === 'login'){
		validateLogin(obj.body, status);
		return status;
	}

	if (obj.feature === 'register'){
		validateRegister(obj.body, status);
		return status;
	}

}

module.exports = validates;