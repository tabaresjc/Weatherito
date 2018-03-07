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

	function ApiBaseService($state, $http, $q, $log) {

		function Get(url, params, data) {
			var defer = $q.defer();

			var httpParams = {
				method: 'GET',
				url: url,
				params: params,
				data: data
			};

			function onSucess(response) {
				$log.info(httpParams.method, httpParams.url, {
					params: params,
					data: httpParams.data,
					response: response.data
				});

				defer.resolve(response.data);
			}

			function onError(response) {
				$log.error(httpParams.method, httpParams.url, {
					params: params,
					data: httpParams.data,
					response: response
				});

				defer.reject(new ApiBaseServiceError('ERROR_API_ACCESS', response));
			}

			$http(httpParams).then(onSucess, onError);

			return defer.promise;
		}

		return {
			Get: Get,
			ApiBaseServiceError: ApiBaseServiceError
		};
	}

	ApiBaseService.$inject = ['$state', '$http', '$q', '$log'];

	angular.module(appConfig.appName)
		.factory('ApiBaseService', ApiBaseService);

}(this));
