(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function GeoLocationService($q, ApiBaseService) {
		return function() {
			var defer = $q.defer();

			var url = appConfig.ipapi_url;

			function onApiSuccess(response) {
				defer.resolve({
					lat: response.latitude,
					lon: response.longitude
				});
			}

			function onApiError() {
				defer.reject(new ErrorService.ApiError('ERROR_API_ACCESS', response));
			}

			ApiBaseService
				.Get(url)
				.then(onApiSuccess, onApiError);

			return defer.promise;
		}
	}

	GeoLocationService.$inject = ['$q', 'ApiBaseService', 'ErrorService'];

	angular.module(appConfig.appName)
		.factory('GeoLocationService', GeoLocationService);

}(this));
