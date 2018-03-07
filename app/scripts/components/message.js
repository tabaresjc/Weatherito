(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * @messageContainer - Component to display notification messages
	 * Use NotificationService to fire any message that needs to be shown to the user
	 */
	var component = {
		templateUrl: 'views/components/message.html',
		controller: ['$window', '$rootScope', '$timeout', 'NotificationService', function($window, $rootScope, $timeout) {
			var $ctrl = this;

			$ctrl.alerts = {};
			$ctrl.alertsCount = 0;

			function onNewMessage(e, args) {
				if (args && args.message) {
					var message = args.message;
					$timeout(function() {
						$window.scrollTo(0, 0);
						$ctrl.alerts[message.id] = message;
						$ctrl.alertsCount++;
					});
				}
			}

			function classAlert(type) {
				return 'alert-' + (type || 'warning');
			}

			function closeAlert(id) {
				$timeout(function() {
					delete $ctrl.alerts[id];
					$ctrl.alertsCount--;
				});
			}

			$ctrl.classAlert = classAlert;
			$ctrl.closeAlert = closeAlert;

			$rootScope.$on('newNotificationMessage', onNewMessage);
		}]
	};

	angular.module(appConfig.appName)
		.component('messageComp', component);

}(this));
