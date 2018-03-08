(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function CountriesService($q, ApiBaseService, ErrorService) {
		return function() {
			var defer = $q.defer();

			var url = appConfig.countries_api_url;

			var params = {
				t: (new Date()).getTime()
			};

			function onApiSuccess(response) {
				defer.resolve(response);
			}

			function onApiError(response) {
				defer.reject(new ErrorService.ApiError('ERROR_API_ACCESS', response));
			}

			ApiBaseService
				.Get(url, params)
				.then(onApiSuccess, onApiError);

			return defer.promise;
		}
	}

	CountriesService.$inject = ['$q', 'ApiBaseService', 'ErrorService'];

	angular.module(appConfig.appName)
		.factory('CountriesService', CountriesService);

}(this));
