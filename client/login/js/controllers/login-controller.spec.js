describe('Login Controller', function () {

	var $controller;
	var controller;
	var $httpBackend;
	var scope;
	var $q;
	var state;
	var user = {};
	var mockUser = {
		username: 'sampleUser',
		password: 'samplePassword'
	};
	var mockResponse = {
		token: '$2a$10$5eyaPZln8WikoFkLoeU0Ve'
	};
	var authServiceMock;
	var alertServiceMock;
	var notifierServiceMock;
	var loginServiceMock;
	var loginService;
	var alertService;
	var notifierService;
	var loginCtrl;
	var deferred;

	beforeEach(module('resume.login'));

	beforeEach(function () {
		authServiceMock = {
			saveToken: function () {},
			getToken: function () {},
			isAuthenticated: function () {},
			getPayload: function () {},
			removeToken: function () {}
		};
		alertServiceMock = {
			getAlert: function () {},
			hideAlert: function () {},
			getEvents: function () {},
			addEvent: function () {},
			emitAlert: function () {},
			fetchAlerts: function () {}
		};
		notifierServiceMock = {
			addNotifier: function () {},
			addWarning: function () {},
			addDanger: function () {},
			addInfo: function () {},
			addSuccess: function () {},
			notifierCollection: function () {},
			notifierEvents: function () {},
			removeNotifier: function () {}
		};
	});

	beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$httpBackend_, _LoginService_) {
		scope = _$rootScope_.$new();
		$httpBackend = _$httpBackend_;
		loginService = _LoginService_;
		$controller = _$controller_;
		$q = _$q_;
		
		loginServiceMock = {
			login: function (user) {

				deferred = $q.defer();

				if (user.password === mockUser.password) {
					deferred.resolve(mockResponse.token);
					return deferred.promise;
				} else {
					deferred.reject('error');
					return deferred.promise;
				}
			}
		};

		controller = $controller('LoginCtrl', {
			$scope: scope,
			$state: {},
			AuthService: authServiceMock,
			AlertService: alertServiceMock,
			NotifierService: notifierServiceMock,
			LoginService: loginServiceMock
		});

	}));

	beforeEach(function () {
		spyOn(loginServiceMock, 'login').and.callThrough();
	});

	it('should call login method internally', function () {

		controller.submit().then(function (token) {
			expect(loginServiceMock.login).toHaveBeenCalled();
		});

	});

	it('should return a token upon successful signin', function () {

		user.username = 'sampleUser';
		user.password = 'samplePassword';

		controller.submit(user).then(function (token) {
			expect(token).toBeUndefined();
			expect(token).toEqual(mockResponse.token);
		});

	})

	it('should reject upon failed signin', function () {

		user.username = 'sampleUser';
		user.password = 'wrongPassword';

		controller.submit(user).then(function (error) {
			expect(error).not.toEqual(mockResponse.token);
		});

	});
});