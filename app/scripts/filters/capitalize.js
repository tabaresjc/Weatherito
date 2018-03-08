(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function capitalize() {
		return function(input) {
			return input ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		};
	}

	capitalize.$inject = [];

	angular.module(appConfig.appName)
		.filter('capitalize', capitalize);

}(this));
