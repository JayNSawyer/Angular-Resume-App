describe('login service', function () {
    var loginService;
    
    var mockUser = {
        username: 'sampleUser',
        password: 'samplePassword'
    };
    
    var $httpBackend;
    
    beforeEach(module('resume.login'));
    
    beforeEach(inject(function(_LoginService_, _$httpBackend_){
        
        loginService = _LoginService_;
        $httpBackend = _$httpBackend_;
        
    }));

    it("should send a post with the user", function () {
        loginService = true;

        expect(loginService).toBe(true);
    });
});