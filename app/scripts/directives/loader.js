(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * @loaderWidget - Directive to track changes on the ui-router to enable/disable the spinner
	 */
	function loaderWidget($transitions) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				$transitions.onStart({}, function() {
					element.removeClass('loaded');
				});

				$transitions.onSuccess({}, function() {
					element
						.removeClass('loaded')
						.addClass('loaded')
						.addClass('started');
				});

				$transitions.onError({}, function() {
					element
						.removeClass('loaded')
						.addClass('loaded')
						.addClass('started');
				});
			}
		};
	}

	loaderWidget.$inject = ['$transitions'];

	angular.module(appConfig.appName)
		.directive('loaderWidget', loaderWidget);

}(this));
