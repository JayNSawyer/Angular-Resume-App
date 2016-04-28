describe('Login Controller', function () {

	var $controller;
	var controller;
	var $httpBackend;
	var $rootScope;
	var scope;
	var $q;
	var state;
	var mockUser = {
		username: 'sampleUser',
		password: 'samplePassword'
	};
	var user = {
		username: 'sampleUser',
		password: 'samplePassword'
	};
	var mockResponse = {
		token: '$2a$10$5eyaPZln8WikoFkLoeU0Ve'
	};
	var authService;
	var alertService;
	var LoginService;
	var notifierService;


	beforeEach(module('ui.router')); //for $state

	beforeEach(module('resume.login'));

	beforeEach(function () {
		authService = {
			saveToken: function () {},
			getToken: function () {},
			isAuthenticated: function () {},
			getPayload: function () {},
			removeToken: function () {}
		};
		alertService = {
			getAlert: function () {},
			hideAlert: function () {},
			getEvents: function () {},
			addEvent: function () {},
			emitAlert: function () {},
			fetchAlerts: function () {}
		};
		notifierService = {
			addNotifier: function () {},
			addWarning: function () {},
			addDanger: function () {},
			addInfo: function () {},
			addSuccess: function () {},
			notifierCollection: function () {},
			notifierEvents: function () {},
			removeNotifier: function () {}
		};
		state = {
			go: function (state) {
				console.log(state);
			}
		}
	});

	beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _$q_, _LoginService_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		$q = _$q_;
		$rootScope = _$rootScope_;
		LoginService = _LoginService_;

		controller = $controller('LoginCtrl', {
			$scope: scope,
			$state: state,
			$rootScope: $rootScope,
			AuthService: authService,
			AlertService: alertService,
			NotifierService: notifierService,
			LoginService: LoginService
		});

	}));

	beforeEach(function () {

		spyOn(LoginService, 'login').and.callFake(function (user) {
			var deferred;

			if (user.password === mockUser.password) {
				deferred = $q.defer();
				deferred.resolve(mockResponse.token);
				return deferred.promise;
			} else {
				deferred = $q.defer();
				deferred.reject('error');
				return deferred.promise;
			}
		});

		spyOn(authService, 'saveToken').and.callThrough();

		controller.user = mockUser;

	});

	it('should call login method internally', function () {

		controller.submit().then(function (token) {
			expect(LoginService.login).toHaveBeenCalledWith(mockUser);
		});

		$rootScope.$apply();

	});
	it('should save the token upon successful validation', function () {

		controller.submit().then(function (token) {
			expect(authService.saveToken).toHaveBeenCalledWith('$2a$10$5eyaPZln8WikoFkLoeU0Ve');
		});

		$rootScope.$apply();

	});

	it('should reject upon failed signin', function () {

		controller.user = '';

		controller.submit().then(function (token) {
			expect(authService.saveToken).not.toHaveBeenCalled();
		});

		$rootScope.$apply();

	});

	it('should transition to the main state on success', function () {

		spyOn(state, 'go').and.callThrough();

		controller.submit().then(function (token) {
			expect(state.go).toHaveBeenCalledWith('main');
		});

		$rootScope.$apply();

	});

	it('should not transition to the main state on failure', function () {

		spyOn(state, 'go').and.callThrough();

		controller.user = '';

		controller.submit().then(function (token) {
			expect(state.go).not.toHaveBeenCalledWith('main');
		});

		$rootScope.$apply();

	});

	it('should call the notifier on success', function () {

		spyOn(notifierService, 'addNotifier').and.callThrough();

		controller.submit().then(function (token) {
			expect(notifierService.addNotifier).toHaveBeenCalled();
		});

		$rootScope.$apply();

	});

});