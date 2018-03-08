(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function citySearch() {
		return {
			restrict: 'E',
			scope: {
				countries: '=',
			},
			templateUrl: 'views/directives/city-search.html',
			link: function(scope) {
				scope.selectedCountry = null;
				var countryList = [];

				angular.forEach(scope.countries, function(value, key) {
					this.push({name:value, code:key});
				}, countryList);

				angular.extend(scope, {
					selectedCountry: '',
					countryList: countryList
				});
			}
		};
	}

	citySearch.$inject = [];

	angular.module(appConfig.appName)
		.directive('citySearch', citySearch);

}(this));
