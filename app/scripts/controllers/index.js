(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function controller($scope) {
		$scope.title = appConfig.displayName;
		$scope.language = appConfig.language;
	}

	controller.$inject = ['$scope'];

	controller.resolve = {

	};

	function config($stateProvider) {
		// declare the parent state for fund pages
		$stateProvider.state('main', {
			abstract: true,
			url: '',
			resolve: controller.resolve,
			views: {
				'header@': {
					templateUrl: 'views/shared/header.html',
					controller: 'HeaderCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('MainCtrl', controller);

}(this));
