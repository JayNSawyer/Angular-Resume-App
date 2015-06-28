'use strict';

angular.module('resume')
	.factory('AlertService', [
		'$injector',
		function ($injector){
			var $rootScope = $injector.get('$rootScope'),
				$http = $injector.get('$http'),
				$q = $injector.get('$q'),
				$timeout = $injector.get('$timeout');


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

			var errorCB = function(data, status, headers, config){
				errorObj.data = data;
				errorObj.status = status;
				errorObj.headers = headers;
				errorObj.config = config;
				return errorObj;
			};

			var fetchAlerts = function(){
				return $http.get('/shared/json/alert_store.json').success(function(alertCollection){
					return alertCollection;
				}).error(errorCB);
			};

			var getAlert = function(type, title, message){
				return {
					displayed: true,
					show: true,
					type: type,
					myMessage: message,
					title: title
				};
			};

			var emitAlert = function(obj){
				if(!obj.event){
					return false;
				}
				return fetchAlerts().then(function(alertCollection){
					var alertCollection = alertCollection.data;
					for(var i = 0; i < alertCollection.length; i++){
						if(obj.event == alertCollection[i].event){
							return alertCollection[i];
						}
					}
				});
			};

			// how to use findAlert 
			
			/*
			findAlert({	type: 'success', event: 'click-me'}).then(function(alert){
				console.log('here is the alert: ');
				if(!alert){
					console.log('No results found!');
				} else {
					console.log(alert);
				}
			}, function(error){
				console.log('An error occurred: ');
				console.log(error);
			});
			*/
			

			var hideAlert = function(){
				return {
					show: false
				}
			};

			var getEvents = function(){
				return events;
			};

			var addEvent = function(event, message){
				var newEvent = {};
				newEvent.event = event;
				newEvent.message = message;
				events.push(newEvent);
			};

			var createAlert = function(type, event, title, message){
				function throwErr(msg){
				    throw new Error(msg);
				}
				var alert = {};
				alert.type = type || throwErr('Please specify a type');
				alert.event = event || throwErr('Please specify an event');
				alert.title = title || throwErr('Please specify a title');
				alert.message = message || throwErr ('Please specify a message');
				alert.status = {
					'displayed': true,
					'show': true
				}

			};

			//fetch the data and immediately populate the AlertStore

			var AlertService = {
				getAlert: getAlert,
				hideAlert: hideAlert,
				getEvents: getEvents,
				addEvent: addEvent,
				emitAlert: emitAlert,
				createAlert: createAlert,
				fetchAlerts: fetchAlerts
			};

			return AlertService;
		}

	]);