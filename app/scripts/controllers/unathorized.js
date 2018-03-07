(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * controller for overview page
	 */
	function controller($scope, $state) {

		function returnPage() {
			$state.transitionTo('error', {}, {
				location: true,
				inherit: false,
				reload: true
			});
		}

		$scope.returnPage = returnPage;
	}

	controller.$inject = ['$scope', '$state'];

	/*
	 * Setup the routing for this page
	 */
	function config($stateProvider) {
		$stateProvider.state('unathorized', {
			url: '/unathorized',
			views: {
				'content@': {
					templateUrl: 'views/unathorized.html',
					controller: 'UnathorizedCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('UnathorizedCtrl', controller);

}(this));
