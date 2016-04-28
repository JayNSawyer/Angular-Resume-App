describe('login service', function () {
	var loginService,
		$httpBackend;

	var mockUser = {
		username: 'sampleUser',
		password: 'samplePassword'
	};

	var mockResponse = {
		token: '$2a$10$5eyaPZln8WikoFkLoeU0Ve'
	};

	var mockError = {
		message: 'failed'
	};

	beforeEach(module('resume.login'));

	beforeEach(inject(function (_LoginService_, _$httpBackend_) {

		loginService = _LoginService_;
		$httpBackend = _$httpBackend_;

	}));

	beforeEach(function () {
		$httpBackend.when('POST', '/login', mockUser)
			.respond(mockResponse);
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();

	});

	it('should login user', function () {

		loginService.login(mockUser).then(function (token) {
			expect(token).toEqual('$2a$10$5eyaPZln8WikoFkLoeU0Ve');
		});

		$httpBackend.flush();
	});

	it('should handle errors', function () {

		$httpBackend.expectPOST('/login', {})
			.respond(500, '');

		loginService.login({}).catch(function (errorMessage) {});
		$httpBackend.flush();
		
	});

	/*	
	  it('should log user in', function () {

	    $httpBackend.expectPOST('/login', mockUser).respond(200, mockResponse);
	    loginService.login({
	      username: 'sampleUser',
	      password: 'samplePassword'
	    });
	    $httpBackend.flush();

	  });

	  it('should handle errors', function () {
	    $httpBackend.expectPOST('/login', {}).respond(500, '');
	  });
	*/

});