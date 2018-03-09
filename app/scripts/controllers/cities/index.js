(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * controller for top page of retail site
	 */
	function controller($scope, $state, m, weatherData, forecastData, countriesData) {
		var forecastList = [];
		var previousDate = '';

		forecastData.list.forEach(function(item) {
			var currentDate = m.unix(item.dt).format('DDMMYYYY');

			if (currentDate !== previousDate) {
				item.weather = item.weather.shift();
				forecastList.push(item);
				previousDate = currentDate;
			}
		});

		// models
		angular.extend($scope, {
			weatherInfo: weatherData.weather.shift(),
			targetCity: weatherData.name,
			targetCountry: weatherData.sys.country,
			weatherData: weatherData,
			forecastData: forecastData,
			forecastList: forecastList,
			countriesData: countriesData
		});

		// methods
		angular.extend($scope, {});
	}

	controller.$inject = ['$scope', '$state', 'moment', 'weatherData', 'forecastData', 'countriesData'];

	controller.resolve = {
		locationData: ['$transition$', function($transition$) {
			var transitionParams = $transition$.params();

			return {
				city: transitionParams.city,
				country: transitionParams.country,
			};
		}],
		weatherData: ['WeatherService', 'locationData', function(WeatherService, locationData) {
			return WeatherService.weather(locationData);
		}],
		forecastData: ['WeatherService', 'locationData', 'weatherData', function(WeatherService, locationData) {
			return WeatherService.forecast(locationData);
		}]
	};

	/*
	 * Setup the routing for this page
	 */
	function config($stateProvider) {
		$stateProvider.state('main.city', {
			url: '/city?city&country',
			resolve: controller.resolve,
			views: {
				'content@': {
					templateUrl: 'views/main/index.html',
					controller: 'CityCtrl'
				}
			}
		});
	}

	config.$inject = ['$stateProvider'];

	angular.module(appConfig.appName)
		.config(config)
		.controller('CityCtrl', controller);

}(this));
