(function () {
    'use strict';

    angular
        .module('resume.auth')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$window', 'DecodeTokenService'];

    function AuthService($window, DecodeTokenService) {

        ////////////PUBLIC API////////////

        var AuthService = {
            saveToken: saveToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            getPayload: getPayload,
            removeToken: removeToken
        };

        return AuthService;

        ///////////PUBLIC METHODS////////////

        function saveToken(token) {
            $window.localStorage.userToken = token;
        };

        function getToken() {
            return $window.localStorage.userToken;
        };

        function removeToken() {
            $window.localStorage.clear();
        };

        function getPayload() {
            var token = getToken();
            var payload;

            if (!token) {
                return false;
            } else {
                payload = DecodeTokenService.decodeToken(token);
                return payload;
            }
        };

        function isAuthenticated() {
            return getToken();
        };


    }
})();