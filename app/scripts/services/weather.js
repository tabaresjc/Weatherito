(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function WeatherService($q, $cookies, ApiBaseService) {
		var ApiBaseServiceError = ApiBaseService.ApiBaseServiceError;

		function baseRequest(name, geoData) {
			var defer = $q.defer();

			var url = appConfig.openweather_api_url + name;

			var params = {
				lat: geoData.lat.toFixed(3),
				lon: geoData.lon.toFixed(3),
				appid: appConfig.openweather_api_key,
				lang: appConfig.language,
				units: 'metric'
			};

			function onApiSuccess(response) {
				var status = parseInt(response.cod || '0')

				if (status === 200) {
					defer.resolve(response);
				} else {
					defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
				}
			}

			function onApiError(response) {
				defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
			}

			ApiBaseService
				.Get(url, params)
				.then(onApiSuccess, onApiError);

			return defer.promise;
		}

		return {
			weather: function(geoData) {
				return baseRequest('weather', geoData);
			},
			forecast: function(geoData) {
				return baseRequest('forecast', geoData);
			}
		}
	}

	WeatherService.$inject = ['$q', '$cookies', 'ApiBaseService'];

	angular.module(appConfig.appName)
		.factory('WeatherService', WeatherService);

}(this));
