(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function controller($scope, $state, $cookies, $timeout) {
		var stateParams = $state.params;

		function changeLanguage(key) {
			if (appConfig.language.current === key) {
				return;
			}

			var expireDate = (new Date());

			expireDate.setMonth(expireDate.getMonth() + 12);

			$cookies.put(appConfig.cookies.language, key.toLowerCase(), {
				expires: expireDate
			});

			$timeout(function() {
				window.location.reload(true);
			}, 100);
		}

		angular.extend($scope, {
			lang: appConfig.language.current,
			displayName: appConfig.displayName,
			defaultState: appConfig.defaultState,
			currentParams: {
				baseDate: stateParams.baseDate
			}
		});

		// methods
		angular.extend($scope, {
			changeLanguage: changeLanguage
		});
	}

	controller.$inject = ['$scope', '$state', '$cookies', '$timeout'];

	angular.module(appConfig.appName)
		.controller('HeaderCtrl', controller);

}(this));
