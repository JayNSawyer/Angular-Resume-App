describe('login service', function () {
  var loginService,
    $rootScope,
    $httpBackend,
    postResponse,
    postError;

  var mockUser = {
    username: 'sampleUser',
    password: 'samplePassword'
  };

  var mockResponse = {
    token: 'tokenData'
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

      loginService.login(mockUser).then(function (response) {
        postResponse = response.data;
      });

      $httpBackend.flush();

      expect(postResponse).toEqual({
        token: 'tokenData'
      });

    });

    it('should handle errors', function () {

      $httpBackend.expectPOST('/login', {})
        .respond(500, '');

      loginService.login({})
        .then(function (response) {
          postResponse = response.data;
        })
        .catch(function (error) {
          postError = error.data;
        });

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
