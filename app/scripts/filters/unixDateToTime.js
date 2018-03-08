(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function unixDateToTime() {
		return function(input) {
			if (!input) {
				return '';
			}

			var date = new Date(input * 1000);

			// Hours part from the timestamp
			var hours = "0" + date.getHours();
			// Minutes part from the timestamp
			var minutes = "0" + date.getMinutes();

			// Will display time in 10:30:23 format
			return hours.substr(-2) + ':' + minutes.substr(-2);
		};
	}

	unixDateToTime.$inject = [];

	angular.module(appConfig.appName)
		.filter('unixDateToTime', unixDateToTime);

}(this));
