(function(root, undefined) {
	'use strict';

	// boilerplate config of the application
	var AppConfig = {
		appName: '%APP_NAME%',
		debug: %APP_DEBUG%,
		displayName: '%DISPLAY_NAME%',
		mode: '',
		appVersion: '%APP_VERSION%',
		ipapi_url: 'http://ip-api.com/json',
		countries_api_url: '/data/countries.json',
		openweather_api_url: 'http://api.openweathermap.org/data/2.5/',
		openweather_api_key: '%OPEN_WEATHER_API_KEY%',
		language: 'en',
		languages: %LANGUAGES%,
		cookies: {
			language: '%APP_NAME%_lang_setting',
		}
	};

	root.AppConfig = AppConfig;

}(this));
