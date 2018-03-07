(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function ApiService($cookies, ApiBaseService) {

		var apiService = {
			// users
			GetLoginUser: function() {
				return ApiBaseService.Login();
			}
		};

		return apiService;
	}

	ApiService.$inject = ['$cookies', 'ApiBaseService'];

	angular.module(appConfig.appName)
		.factory('ApiService', ApiService);

}(this));
