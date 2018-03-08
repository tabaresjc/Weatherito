(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function ApiBaseService($state, $http, $q, $log, ErrorService) {

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

				defer.reject(new ErrorService.ApiError('ERROR_API_ACCESS', response));
			}

			$http(httpParams).then(onSucess, onError);

			return defer.promise;
		}

		return {
			Get: Get
		};
	}

	ApiBaseService.$inject = ['$state', '$http', '$q', '$log', 'ErrorService'];

	angular.module(appConfig.appName)
		.factory('ApiBaseService', ApiBaseService);

}(this));
