(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function UtilsService($state, $window) {

		function getBrowserId() {
			// use user agent strings as suggested in https://codepen.io/gapcode/pen/vEJNZN
			var userAgent = $window.navigator.userAgent,
				browsers = {
					chrome: /chrome/i,
					safari: /safari/i,
					firefox: /firefox/i,
					ie: /msie|trident\/[0-9]{1}|edge\//i
				};

			for (var key in browsers) {
				if (browsers[key].test(userAgent)) {
					return key;
				}
			}

			return '';
		}

		return {
			getBrowserId: getBrowserId
		};
	}

	UtilsService.$inject = ['$state', '$window'];

	angular.module(appConfig.appName)
		.factory('UtilsService', UtilsService);

}(this));
