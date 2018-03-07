(function(root, undefined) {
	'use strict';

	// boilerplate config of the application
	var AppConfig = {
		appName: '%APP_NAME%',
		debug: %APP_DEBUG%,
		displayName: '%DISPLAY_NAME%',
		mode: '',
		appVersion: '%APP_VERSION%',
		api: {
			url: '%API_URL%'
		},
		language: {
			current: 'en',
			default: 'en'
		},
		cookies: {
			language: '%APP_NAME%_lang_setting',
		}
	};

	root.AppConfig = AppConfig;

}(this));
