(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function AuthorizeService() {
		var user;

		function isSessionExpired() {
			if (!user || !user.is_authorized) {
				return true;
			}

			var dt = new Date(user.expiration);
			var diff = dt - new Date();

			var minutes = ((diff % 86400000) % 3600000) / 60000;

			return minutes <= 0;
		}

		var AuthorizeService = {
			getUser: function() {
				if(isSessionExpired()) {
					return null;
				}
				return user;
			},
			setUser: function(u) {
				user = u;
			},
			isAuthorized: function() {
				if(isSessionExpired()) {
					return false;
				}
				return user && user.is_authorized;
			}
		};

		return AuthorizeService;
	}

	AuthorizeService.$inject = [];

	angular.module(appConfig.appName)
		.factory('AuthorizeService', AuthorizeService);

}(this));
