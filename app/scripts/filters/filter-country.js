(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * Filter for a single country
	 */
	function filterCountry(keyword) {
		return {
			filter: function(item) {
				return (
					item.code +
					(item.name || '').toLowerCase()
				).indexOf(keyword) >= 0;
			}
		};
	}

	/**
	 * selectCountries- performs a filter over the relevant properties
	 */
	function filterCountries($filter) {
		return function(items, keyword) {
			if(!keyword) {
				return items;
			}
			keyword = keyword.toLowerCase();
			return $filter('filter')(items, filterCountry(keyword).filter);
		};
	}

	filterCountries.$inject = ["$filter"];

	angular.module(appConfig.appName)
		.filter('filterCountries', filterCountries);

}(this));
