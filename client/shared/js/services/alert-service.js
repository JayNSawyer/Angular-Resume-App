(function(){
	'use strict';

	angular
		.module('resume.shared')
		.factory('AlertService', AlertService);

	AlertService.$inject = ['$rootScope', '$http', '$q', '$timeout'];
	
	function AlertService($rootScope, $http, $q, $timeout) {

		var events = [
			{
				'event': 'user-logged-in',
				'message': 'You have logged in!'
			},
			{
				'event': 'user-logged-out',
				'message': 'You have logged out!'
			},
			{
				'event': 'clickme',
				'message': 'You clicked me!'
			}
		];

		var errorObj = {};

		////////////PUBLIC API////////////

		var AlertService = {
			getAlert: getAlert,
			hideAlert: hideAlert,
			getEvents: getEvents,
			addEvent: addEvent,
			emitAlert: emitAlert,
			fetchAlerts: fetchAlerts
		};

		return AlertService;

		///////////PUBLIC METHODS////////////

		function getAlert(event) {
			var alert;
			var alertCollection;
			if(!event){
				return false;
			}
			return fetchAlerts().then(function(alertCollection){
				alertCollection = alertCollection.data;
				for(var i = 0; i < alertCollection.length; i++){
					if(event == alertCollection[i].event){
						alert = alertCollection[i];
						return alert;
					}
				}
			});
		}

		function hideAlert() { 
			return {
				show: false
			};
		}

		function getEvents() {
			return events;
		}

		function addEvent(event, message) {
			var newEvent = {};
			newEvent.event = event;
			newEvent.message = message;
			events.push(newEvent);
		}

		function emitAlert(event) {
			var alert;
			var alertCollection;
			if(!event){
				return false;
			}
			return fetchAlerts().then(function(alertCollection){
				alertCollection = alertCollection.data;
				for(var i = 0; i < alertCollection.length; i++){
					if(event == alertCollection[i].event){
						alert = alertCollection[i];
						$rootScope.$emit(event, {
							alert: alert
						});
						return alert;
					}
				}
			});
		}

		function fetchAlerts() {
			return $http.get('/shared/json/alert_store.json').success(function(alertCollection){
				return alertCollection;
				//TODO: maybe cache the alertCollection, so we don't have to keep making $http calls?
			}).error(_errorCB);
		}

		///////////Private Methods///////////

		function _errorCB(data, status, headers, config) {
			errorObj.data = data;
			errorObj.status = status;
			errorObj.headers = headers;
			errorObj.config = config;
			return errorObj;
		}

	}	
})();

