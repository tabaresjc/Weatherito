(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * Util Class to handle alert messages
	 */
	function Notification(options) {
		var main = this; // jshint ignore:line
		main.options = options || {};
		main.lastMessage = null;
		main.index = 1;
		main.errorClasses = {
			error: 'danger',
			warning: 'warning',
			info: 'info',
			success: 'success'
		};
	}

	Notification.prototype = {
		getLastMessage: function() {
			return this.lastMessage;
		},
		addMessage: function(msg, params, type) {
			var lastMessage = {
				id: this.index,
				msg: msg,
				params: params,
				type: type,
				ttl: 5000 // 5 Seconds
			};

			this.lastMessage = lastMessage;
			this.index++;

			if (typeof(this.options.onNewNotificationMessage) === 'function') {
				this.options.onNewNotificationMessage(lastMessage);
			}

			return this;
		},
		addError: function(msg, params) {
			this.addMessage(msg, params, this.errorClasses.error);
			return this;
		},
		addWarning: function(msg, params) {
			this.addMessage(msg, params, this.errorClasses.warning);
			return this;
		},
		addInfo: function(msg, params) {
			this.addMessage(msg, params, this.errorClasses.info);
			return this;
		},
		addSuccess: function(msg, params) {
			this.addMessage(msg, params, this.errorClasses.success);
			return this;
		}
	};

	function NotificationService($rootScope) {

		var options = {
			onNewNotificationMessage: function(message) {
				$rootScope.$broadcast('newNotificationMessage', {message:message});
			}
		};

		var notification = new Notification(options);
		root.notification = notification;

		return notification;
	}

	NotificationService.$inject = ['$rootScope'];

	angular.module(appConfig.appName)
		.factory('NotificationService', NotificationService);

}(this));
