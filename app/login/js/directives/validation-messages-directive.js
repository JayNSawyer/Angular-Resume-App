(function () {
    'use strict';

    angular
        .module('resume.login')
        .directive('raValidationsMessages', raValidationsMessages);

    raValidationsMessages.$inject = ['$compile'];

    function raValidationsMessages($compile) {

        var directive = {
            link: link,
            restrict: 'EA',
            require: '^form'
        };

        return directive;

        function link(scope, element, attributes, formController) {
            var inputName = element.find(':input').attr('name'); //e.g., "password"
            var messagesObj = buildMessageBindings(formController, inputName);
            initializeMessages(element, formController, inputName, messagesObj, scope);
        }

        function buildMessageBindings(formController, inputName) {
            var messagesObj = {};
            messagesObj.errorDiv = formController.$name + "." + inputName + ".$error";
            messagesObj.ngIf = formController.$name + "." + inputName + ".$invalid";
            messagesObj.ngReqIf = "(" + formController.$name + "." + inputName + ".$viewValue";
            messagesObj.ngReqIf += " === " + "''" + ")" + " || ";
            messagesObj.ngReqIf += "(" + formController.$name + "." + inputName + ".$pristine" + ")";
            messagesObj.ngMinlenIf = formController.$name + "." + inputName + ".$viewValue";
            messagesObj.ngMinlenIf += ".length" + " > " + "0";
            return messagesObj;
        }

        function initializeMessages(element, formController, inputName, messageBindings, scope) {
            var msg = messageBindings;

            var messages = "<div class=\"help-block\" ng-messages=\"" + msg.errorDiv + "\"";
            messages += " ng-if=\"" + msg.ngIf + "\"" + ">";
            messages += "<div ng-message=\"required\"" + " ng-if=\"" + msg.ngReqIf + "\">";
            messages += inputName.charAt(0).toUpperCase() + inputName.slice(1) + " is required.";
            messages += "</div>";
            messages += "<div ng-message=\"minlength\"" + " ng-if=\"" + msg.ngMinlenIf + "\">";
            messages += inputName.charAt(0).toUpperCase() + inputName.slice(1);
            messages += " must be at least 6 characters";
            messages += "</div></div>";
     
            var linkFn = $compile(messages)(scope);
            return element.append(linkFn);
        }

    }


})();