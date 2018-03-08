(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function unixDateToTime(m) {
		return function(input) {
			if (!input) {
				return '';
			}

			return m.unix(input).format('LTS');
		};
	}

	unixDateToTime.$inject = ['moment'];

	function unixDateToDate(m) {
		return function(input) {
			if (!input) {
				return '';
			}

			return m.unix(input).format('LL');
		};
	}

	unixDateToDate.$inject = ['moment'];

	angular.module(appConfig.appName)
		.filter('unixDateToTime', unixDateToTime)
		.filter('unixDateToDate', unixDateToDate);

}(this));
