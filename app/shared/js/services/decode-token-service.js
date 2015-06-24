'use strict';

angular.module('resume')
	.factory('DecodeTokenService', [
		'$injector',
		function ($injector){
			var	$window = $injector.get('$window');

			var urlBase64Decode = function(str) {
				var decodedToken = $window.atob(str);
				return decodedToken;
			};

			var encodeToken = function(token){
				var encodedTokenStr = token.split('.')[1];
				return encodedTokenStr;
			};

			var decodeToken = function(token){
				//1. encode token to string
				var encodedTokenStr = encodeToken(token);
				//2. base64 decode the token string
				var base64DecodedToken = urlBase64Decode(encodedTokenStr);
				//3. parse the base64 decoded value
				var payload = JSON.parse(base64DecodedToken);

				return payload;
			};

			var DecodeTokenService = {
				decodeToken: decodeToken,
	
			}
			return DecodeTokenService;
		}

	]);