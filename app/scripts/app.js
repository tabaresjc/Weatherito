(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * start the app with the following modules
	 */
	var requiredModules = [
		'ngSanitize',
		'ngCookies',
		'ui.router',
		'ui.bootstrap',
		'ui.select',
		'pascalprecht.translate',
		'tmh.dynamicLocale'
	];

	angular.module(appConfig.appName, requiredModules);

}(this));
