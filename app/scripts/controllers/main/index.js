(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * controller for top page of retail site
	 */
	function controller($scope, weatherData, forecastData, geoData) {
		var weatherInfo = weatherData.weather.shift();

		// models
		angular.extend($scope, {
			weatherInfo: weatherInfo,
			targetCity: weatherData.name,
			targetCountry: weatherData.sys.country,
			weatherData: weatherData,
			geoData: geoData,
			forecastData: forecastData
		});

		// methods
		angular.extend($scope, {});
	}

	controller.$inject = ['$scope', 'weatherData', 'forecastData', 'geoData'];

	controller.resolve = {
		geoData: ['GeoLocationService', function(GeoLocationService) {
			return GeoLocationService();
		}],
		weatherData: ['WeatherService', 'geoData', function(WeatherService, geoData) {
			return WeatherService.weather(geoData);
		}],
		forecastData: ['WeatherService', 'geoData', function(WeatherService, geoData) {
			return WeatherService.forecast(geoData);
		}]
	};

	/*
	 * Setup the routing for this page
	 */
	function config($stateProvider) {
		$stateProvider.state('main.welcome', {
			url: '/',
			resolve: controller.resolve,
			views: {
				'content@': {
					templateUrl: 'views/main/index.html',
					controller: 'WelcomeCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('WelcomeCtrl', controller);

}(this));
