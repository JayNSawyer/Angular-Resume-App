(function(){
	'use strict';

	angular
		.module('resume.shared')
		.factory('NotifierService', NotifierService);

	NotifierService.$inject = ['$timeout'];
	
	function NotifierService ($timeout) {

		//var id = 0;
		//var stamp;

		var notifierCollection = [];

		var notifierEvents = ['success', 'danger', 'info', 'warning'];

		////////////PUBLIC API////////////

		var NotifierService = {
			addNotifier: addNotifier,
			addWarning: addWarning,
			addDanger: addDanger,
			addInfo: addInfo,
			addSuccess: addSuccess,
			notifierCollection: notifierCollection, //expose the collection as a model to share with other services, directives, and controllers
			notifierEvents: notifierEvents, //same concept as notifierCollection; see above
			removeNotifier: removeNotifier
		};

		return NotifierService;

		///////////PUBLIC METHODS////////////

		function addNotifier (event, message) {
			// if (notifierCollection.indexOf(event) !== -1) {
			// 	stamp = _setId();
			// 	notifierCollection.push({event: event, message: message, id: stamp});
			// }

			if ( notifierEvents.indexOf(event) == -1 ) {
				event = 'success';
			} 

			var notifier = {event: event, message: message};
			notifierCollection.push(notifier);

			$timeout(function () {
				removeNotifier(notifier);
			}, 2000);
		}

		function addWarning (message) {
			addNotifier("warning", message);
		}

		function addDanger (message) {
			addNotifier("danger", message);
		}

		function addInfo (message) {
			addNotifier("info", message);
		}

		function addSuccess (message) {
			addNotifier("success", message);

		}

		function removeNotifier (notifier) {
			if ( notifierCollection.indexOf(notifier !== -1) ) {
				notifierCollection.splice(notifierCollection.indexOf(notifier), 1);
			}
		}

		///////////Private Methods///////////

		// function _setId() {
		// 	id = id + 1;
		// 	return id;
		// }

	}	
})();