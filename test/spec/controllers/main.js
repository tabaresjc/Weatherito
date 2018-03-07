(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	describe('Controller: MainCtrl', function() {

		beforeEach(module(appConfig.appName));

		var controller,
			scope;

		// Initialize the controller and a mock scope
		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			controller = $controller('MainCtrl', {
				$scope: scope
			});
		}));

		describe('title', function() {
			it('Should not be empty', function() {
				expect(controller.title).not.toBeNull();
			});
		});

		describe('language', function() {
			it('Should not be empty', function() {
				expect(controller.language).not.toBeNull();
			});
		});

	});

}(this));
