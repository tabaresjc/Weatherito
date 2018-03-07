(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	function configuration($translateProvider, tmhDynamicLocaleProvider) {

		$translateProvider.translations('en', {});
		$translateProvider.translations('es', {});

		$translateProvider
			.preferredLanguage('en')
			.useSanitizeValueStrategy(null);

		tmhDynamicLocaleProvider
			.localeLocationPattern('/data/translations/angular-locale_{{locale}}.js?'+appConfig.appVersion);
	}

	configuration.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];

	function start($cookies, $translate, $log, tmhDynamicLocale) {
		// set the language selected by user
		var currentLanguage = $cookies.get(appConfig.cookies.language) || appConfig.language.default;

		$log.info('Selected language: ', currentLanguage);

		appConfig.language.current = currentLanguage.toLowerCase();
		$translate.use(currentLanguage);

		tmhDynamicLocale.set(currentLanguage);
	}

	start.$inject = ['$cookies', '$translate', '$log', 'tmhDynamicLocale'];

	angular.module(appConfig.appName)
		.config(configuration)
		.run(start);

}(this));
