(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function citySearch($state) {
		return {
			restrict: 'E',
			scope: {
				countries: '=',
			},
			templateUrl: 'views/directives/city-search.html',
			link: function(scope) {
				function onSearch() {
					var params = {
						city: scope.selectedCity,
						country: scope.selectedCountry.code,
					};

					$state.transitionTo('main.city', params, {
						location: true,
						inherit: false,
						reload: true
					});
				}

				// models
				angular.extend(scope, {
					selectedCountry: '',
					selectedCity: ''
				});

				// methods
				angular.extend(scope, {
					onSearch: onSearch
				});
			}
		};
	}

	citySearch.$inject = ['$state'];

	angular.module(appConfig.appName)
		.directive('citySearch', citySearch);

}(this));
