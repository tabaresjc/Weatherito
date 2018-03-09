(function(root, undefined) {
	'use strict';

	// boilerplate config of the application
	var AppConfig = {
		appName: '%APP_NAME%',
		debug: %APP_DEBUG%,
		displayName: '%DISPLAY_NAME%',
		mode: '',
		appVersion: '%APP_VERSION%',
		ipapi_url: 'https://freegeoip.net/json/',
		countries_api_url: '/data/countries.json',
		windy_iframe_url: 'https://mywindy.com/juantabares/weatherito',
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
