(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * controller for overview page
	 */
	function controller($scope, $state, $transition$) {
		var errorInfo = $transition$.params().errorInfo,
			info = {
				title: 'ERROR_UNKNOW',
				subtitle: ''
			};

		function returnPage() {
			$state.transitionTo(appConfig.defaultState, {}, {
				location: true,
				inherit: false,
				reload: true
			});
		}

		// breakdown the different types of error that might arise in the app
		if (errorInfo.error) {
			var error = errorInfo.error,
				errorDetail = errorInfo.error.detail;

			info.debug = !!appConfig.debug;

			// This is an error related to the api service
			if (errorDetail.getResponse && errorDetail.getType) {
				var apiResponse = errorDetail.getResponse();
				info.title = errorDetail.getType();
				info.subtitle = apiResponse.statusText;
				info.contactServiceDesk = (info.title === 'ERROR_ACCESS_DENIED');
			} else if (error.message) {
				info.title = error.message;
				info.detail = errorDetail.message.toString();
			}
		}

		// models
		angular.extend($scope, {
			info: info
		});

		// function
		angular.extend($scope, {
			returnPage: returnPage
		});
	}

	controller.$inject = ['$scope', '$state', '$transition$', '$log'];

	/*
	 * Setup the routing for this page
	 */
	function config($stateProvider) {
		$stateProvider.state('error', {
			url: '/recover',
			params: {
				errorInfo: {}
			},
			views: {
				'content@': {
					templateUrl: 'views/error.html',
					controller: 'ErrorCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('ErrorCtrl', controller);

}(this));
