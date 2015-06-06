'use strict';

angular.module('resume')
	.factory('ValidationService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$q = $injector.get('$q'),
				$http = $injector.get('$http');

			var self = this;	

			var validationObject = {
				username: true,
				password: true,
				message: '',
				boolean: true,
				error: false
			};

			validationMessages = [
				{
					'Incorrect Username': 'Your Username is incorrect',
					'Incorrect Password': 'Your Password is incorrect',
					'Correct Credentials': 'Your Credentials are correct',
					'Error': 'There was an unexpected error'
				}
			];

			function getValidationMessage(validationObject){
				if(validationObject.password === false){
					return validationMessages[0]['Incorrect Password'];
				} else if (validationObject.username === false){
					return validationMessages[0]['Incorrect Username'];
				} else if (validationObject.boolean === true){
					return validationMessages[0]['Correct Credentials'];
				} else if (validationObject.error === true){
					return validationMessages[0]['Error'];
				} else {
					return false;
				}
			}

			function setValidationObject (status){
				if (status === 'password'){
					validationObject.password = false;
					validationObject.boolean = false;
					validationObject.message = getValidationMessage(validationObject);
					return validationObject;
				} else if (status === 'username'){
					validationObject.username = false;
					validationObject.boolean = false;
					validationObject.message = getValidationMessage(validationObject);
					return validationObject;
				} else if (status === 'verified'){
					validationObject.message = getValidationMessage(validationObject);
					return validationObject;
				} else if (status === 'error'){
					validationObject.error = true;
					validationObject.boolean = false;
					validationObject.message = getValidationMessage(validationObject);
				} else {
					return false;
				}
			}

			var ValidationService = {
				setValidationObject: setValidationObject
			}

			return ValidationService;
		}

	]);