(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function ApiError(type, response) {
		var t = type,
			r = response;

		this.getType = function() {
			return t;
		};

		this.getResponse = function() {
			return r;
		};

		return this;
	}

	function ErrorService() {
		return {
			ApiError: ApiError
		};
	}

	ErrorService.$inject = [];

	angular.module(appConfig.appName)
		.factory('ErrorService', ErrorService);

}(this));
