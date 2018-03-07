(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	/*
	 * Filter for a single fund
	 */
	function filterEntity(keyword) {
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
	 * filterEntities- performs a filter over the relevant properties
	 */
	function filterEntities($filter) {
		return function(items, keyword) {
			if(!keyword) {
				return items;
			}
			return $filter('filter')(items, filterEntity(keyword.toLowerCase()).filter);
		};
	}

	filterEntities.$inject = ["$filter"];

	angular.module(appConfig.appName)
		.filter('filterEntities', filterEntities);

}(this));
