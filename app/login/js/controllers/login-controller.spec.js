describe('Login Controller', function(){
  
  var $controller,
      scope;
  
  beforeEach(module('resume.login'));
  
  beforeEach(inject(
    function(_$controller_, _$rootScope_, _$state_, _AuthService_, _LoginService_, _AlertService_, _NotifierService_){
    //create a new scope
      scope = _$rootScope_.$new();
    //create new instance of the LoginController
      LoginCtrl = _$controller_('LoginCtrl', {
        $scope: scope,
        $state: _$state_,
        AuthService: _AuthService_,
        LoginService: _LoginService_,
        AlertService: _AlertService_,
        NotifierService: _NotifierService_
      });
  }));
  
  /////tests go here/////
});