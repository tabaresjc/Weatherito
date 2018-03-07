(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * controller for top page of retail site
	 */
	function controller($scope) {
		// models
		angular.extend($scope, {
		});

		// methods
		angular.extend($scope, {
		});
	}

	controller.$inject = ['$scope'];

	controller.resolve = {

	};

	/*
	 * Setup the routing for this page
	 */
	function config($stateProvider) {
		$stateProvider.state('main.welcome', {
			url: '/',
			resolve: controller.resolve,
			views: {
				'content@': {
					templateUrl: 'views/main/index.html',
					controller: 'WelcomeCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('WelcomeCtrl', controller);

}(this));
