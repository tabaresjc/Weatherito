(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * @loaderWidget - Directive to track changes on the ui-router to enable/disable the spinner
	 */
	function windyWidget() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/windy.html'
		};
	}

	windyWidget.$inject = [];

	angular.module(appConfig.appName)
		.directive('windyWidget', windyWidget);

}(this));
