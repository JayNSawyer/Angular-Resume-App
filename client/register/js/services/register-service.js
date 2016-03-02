(function () {
    'use strict';

    angular
        .module('resume.register')
        .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$rootScope', '$http'];
    
    function RegisterService($rootScope, $http) {

        var self = this;

        ////////////PUBLIC API////////////

        var RegisterService = {
            register: register
        };

        return RegisterService;

        ///////////PUBLIC METHODS////////////

        function register(user) {
            return $http.post('/users', user);
        }

    }
})();