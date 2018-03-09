(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * @loaderWidget - Directive to track changes on the ui-router to enable/disable the spinner
	 */
	function windyWidget($sce) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/windy.html',
			link: function(scope) {
				var url = '';

				if (!appConfig.debug) {
					url = $sce.trustAsResourceUrl(appConfig.windy_iframe_url);
				}

				// models
				angular.extend(scope, {
					url: url
				});
			}
		};
	}

	windyWidget.$inject = ['$sce'];

	angular.module(appConfig.appName)
		.directive('windyWidget', windyWidget);

}(this));
