(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function ApiBaseServiceError(type, response) {
		var t = type,
			r = response;

		this.getType = function() {
			return t;
		};

		this.getResponse = function() {
			return r;
		};
	}

	function ApiBaseService($state, $http, $q, $log, AuthorizeService) {

		function Login() {
			var defer = $q.defer(),
				user = AuthorizeService.getUser();

			if(!user) {
				var httpParams = {
					method: 'GET',
					url: appConfig.api.url + 'users/login',
					withCredentials: true
				};

				$http(httpParams)
					.then(function(response) {
							$log.info(httpParams.method, httpParams.url, {
								response: response
							});

							user = response.data.data;
							AuthorizeService.setUser(user);

							if(AuthorizeService.isAuthorized()) {
								defer.resolve(user);
							} else {
								defer.reject(new ApiBaseServiceError('ERROR_ACCESS_DENIED'), response);
							}
						},
						function(response) {
							$log.error(httpParams.method, httpParams.url, {
								response: response
							});

							if(response.status === 403) {
								defer.reject(new ApiBaseServiceError('ERROR_ACCESS_DENIED', response));
							} else {
								defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
							}
						});
			} else {
				user = AuthorizeService.getUser();
				defer.resolve(user);
			}

			return defer.promise;
		}

		function Get(method, url, params, data) {
			var defer = $q.defer();

			Login().then(function() {
				if(!AuthorizeService.isAuthorized()) {
					defer.reject(new ApiBaseServiceError('ERROR_ACCESS_DENIED'));
				}

				var httpParams = {
					method: method,
					url: appConfig.api.url + url,
					params: params,
					data: data,
					withCredentials: true
				};

				$http(httpParams)
					.then(function(response) {
							$log.info(httpParams.method, httpParams.url, {
								params: params,
								data: httpParams.data,
								response: response.data
							});

							if(response.status) {
								defer.resolve(response.data.data);
							} else {
								defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
							}
						},
						function(response) {

							$log.error(httpParams.method, httpParams.url, {
								params: params,
								data: httpParams.data,
								response: response
							});

							defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
						});

			}, function(response) {
				defer.reject(response);
			});

			return defer.promise;
		}

		return {
			Get: Get,
			Login: Login
		};
	}

	ApiBaseService.$inject = ['$state', '$http', '$q', '$log', 'AuthorizeService'];

	angular.module(appConfig.appName)
		.factory('ApiBaseService', ApiBaseService);

}(this));
