(function(){

	'use strict';

	angular
		.module('resume.shared')
		.factory('DecodeTokenService', DecodeTokenService);

	DecodeTokenService.$inject = ['$window'];

	function DecodeTokenService($window) {

		////////////PUBLIC API////////////

		var DecodeTokenService = {
			decodeToken: decodeToken
		};
		
		return DecodeTokenService;

		///////////PUBLIC METHODS////////////

		function decodeToken(token) {
			//1. encode token to string
			var encodedTokenStr = _encodeToken(token);
			//2. base64 decode the token string
			var base64DecodedToken = _urlBase64Decode(encodedTokenStr);
			//3. parse the base64 decoded value
			var payload = JSON.parse(base64DecodedToken);

			return payload;
		}

		////////////PRIVATE METHODS///////////

		function _urlBase64Decode(str) {
			var decodedToken = $window.atob(str);
			return decodedToken;
		}

		function _encodeToken(token) {
			var encodedTokenStr = token.split('.')[1];
			return encodedTokenStr;
		}

	}

})();
