(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * Use propertyName of the given object when the current language
	 * is the default Language.
	 * When the current language is not the default language, it will
	 * try to get the equivalent property for that specific language
	 *
	 * Example:
	 *		if currentLanguage is 'en'. then it should try to read
	 * 		the propertyName + 'En'
	 */
	function translateProp($rootScope) {
		var defaultLanguage = appConfig.language.default,
			currentLanguage = appConfig.language.current;

		$rootScope.$on('switch-lang', function(){
			currentLanguage = appConfig.language.current;
		});

		return function(obj, propertyName) {

			if(defaultLanguage !== currentLanguage) {
				var newPropertyName = propertyName + '_' + currentLanguage.toLocaleLowerCase();
				if (obj.hasOwnProperty(newPropertyName) && obj[newPropertyName]) {
					return obj[newPropertyName];
				}
			}

			return obj[propertyName];
		};
	}

	translateProp.$inject = ['$rootScope'];

	angular.module(appConfig.appName)
		.filter('translateProp', translateProp);

}(this));
