(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/**
	 * Setup routing of the application
	 */
	function configuration($urlRouterProvider) {

		appConfig.defaultEntryPoint = '/';
		appConfig.defaultState = 'main.welcome';

		// choose the default entry point of the app
		$urlRouterProvider.otherwise(appConfig.defaultEntryPoint);
	}

	configuration.$inject = ['$urlRouterProvider'];

	/**
	 * setup the transition hooks of uirouter
	 */
	function start($rootScope, $state, $transitions, $log, UtilsService) {
		// inject the state into the application
		$rootScope.$state = $state;

		// inject the browser id
		$rootScope.$browserId = UtilsService.getBrowserId();

		// taken from ui-router module.
		var rejectType = {
			'SUPERSEDED': 2,
			'ABORTED': 3,
			'INVALID': 4,
			'IGNORED': 5,
			'ERROR': 6
		};

		$transitions.onError({to: 'main.**'}, function(transition) {
			var error = transition.error();

			if (error.type === rejectType.IGNORED ||
				error.type === rejectType.SUPERSEDED) {
				// nothing to see here, just log it
				$log.warn('$transitions[onError]', error.message, {
					transition: transition,
					error: error
				});
			} else if(error.type === rejectType.ERROR) {
				// redirect to error page
				$state.go('error', {
					errorInfo: {
						to: transition.$to(),
						from: transition.$from(),
						error: transition.error()
					}
				});
			}
		});
	}

	start.$inject = ['$rootScope', '$state', '$transitions', '$log', 'UtilsService'];

	angular.module(appConfig.appName)
		.config(configuration)
		.run(start);

}(this));
