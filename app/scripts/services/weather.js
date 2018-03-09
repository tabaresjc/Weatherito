(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function WeatherService($q, ApiBaseService, ErrorService) {
		function baseRequest(name, data) {
			var defer = $q.defer();

			var url = appConfig.openweather_api_url + name;

			var params = {
				appid: appConfig.openweather_api_key,
				lang: appConfig.language,
				units: 'metric'
			};

			if (typeof(data.lat) === 'number' && typeof(data.lon) === 'number') {
				angular.extend(params, {
					lat: data.lat.toFixed(3),
					lon: data.lon.toFixed(3)
				});
			} else if (typeof(data.city) === 'string' && typeof(data.country) === 'string') {
				angular.extend(params, {
					q: data.city + ',' + data.country
				});
			} else {
				defer.reject(new ErrorService.ApiError('ERROR_WRONG_PARAMS'));
			}

			function onApiSuccess(response) {
				var status = parseInt(response.cod || '0');

				if (status === 200) {
					defer.resolve(response);
				} else {
					defer.reject(new ErrorService.ApiError('ERROR_API_ACCESS', response));
				}
			}

			function onApiError(response) {
				var status = parseInt(response.cod || '0');

				if (status && typeof(response.message) === 'string') {
					defer.reject(new ErrorService.ApiError(response.message, response));
				} else {
					defer.reject(new ErrorService.ApiError('ERROR_API_ACCESS', response));
				}
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

	WeatherService.$inject = ['$q', 'ApiBaseService', 'ErrorService'];

	angular.module(appConfig.appName)
		.factory('WeatherService', WeatherService);

}(this));
