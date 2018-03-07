(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function GeoLocationService($q, ApiBaseService) {
		return function() {
			var defer = $q.defer();

			function onError() {
				// Fallback to remote api in case user rejects permission to
				// local geolocation provider
				var url = appConfig.ipapi_url;

				function onApiSuccess(response) {
					defer.resolve({
						lat: response.lat,
						lon: response.lon
					});
				}

				function onApiError() {
					defer.reject('FAIL_GEOLOCATION');
				}

				ApiBaseService.Get(url)
					.then(onApiSuccess, onApiError);
			}

			function onSuccess(position) {
				if (position.coords) {
					defer.resolve({
						lat: position.coords.latitude,
						lon: position.coords.longitude
					});
				} else {
					onError();
				}
			}

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			} else {
				onError();
			}

			return defer.promise;
		}
	}

	GeoLocationService.$inject = ['$q', 'ApiBaseService'];

	angular.module(appConfig.appName)
		.factory('GeoLocationService', GeoLocationService);

}(this));
