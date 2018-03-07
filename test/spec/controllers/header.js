(function(root, undefined) {
	'use strict';

	var appConfig = root.AppConfig || {};

	describe('Controller: HeaderCtrl', function() {

		var controller,
			scope,
			state,
			timeoutMock,
			cookiesMock,
			apiServiceMock,
			user;

		beforeEach(module(appConfig.appName));

		// mock every service & object consumed by the controller
		module(function($provide) {
			apiServiceMock = {
			};

			timeoutMock = function(f, t) {};

			$provide.value('$timeout', timeoutMock);
			$provide.service('ApiService', apiServiceMock);
		});

		// Initialize the controller and a mock scope
		beforeEach(inject(function($controller, $rootScope, $state, $cookies, $timeout, ApiService) {
			scope = $rootScope.$new();
			user = {name: 'Pico, Taro'};

			controller = $controller('HeaderCtrl', {
				$scope: scope,
				$state: $state,
				$timeout: $timeout,
				$cookies: $cookies,
				ApiService: ApiService,
				user: user
			});
		}));

		describe('parameters', function() {
			it('Should not be empty', function() {
				expect(controller.user).not.toBeNull();
				expect(controller.lang).not.toBeNull();
				expect(controller.displayName).not.toBeNull();
				expect(controller.defaultState).not.toBeNull();
				expect(controller.currentParams).not.toBeNull();
			});
		});

	});

}(this));
