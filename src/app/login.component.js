"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var login_service_1 = require("./login.service");
var shared_service_1 = require("./shared.service");
var LoginComponent = (function () {
    function LoginComponent(loginService, sharedService) {
        this.loginService = loginService;
        this.sharedService = sharedService;
        this.loggedIn = false;
        this.loggingIn = false;
        this.sessionID = '';
        this.change = new core_1.EventEmitter();
    }
    LoginComponent.prototype.getLoginData = function () {
        var _this = this;
        var loginRequestData = {
            "careerName": "web",
            "dateOfBirth": "",
            "deviceName": "browser",
            "emailId": "bobinsingla30@gmail.com",
            "firstName": "Bobin",
            "gender": "none",
            "imei": "1071216312982030",
            "lastName": "Singla",
            "mobileNo": "",
            "password": "",
            "platform": "browser",
            "signUpFrom": "Google",
            "time": "2017-9-7 15:22:18",
            "timeZone": "Asia/Calcutta",
        };
        var time = new Date();
        loginRequestData['time'] = time.toLocaleString();
        this.loginService.getLoginData(loginRequestData)
            .subscribe(function (loginResponseData) {
            _this.loginResponseHandler(loginResponseData);
        });
    };
    LoginComponent.prototype.loginResponseHandler = function (loginResponseData) {
        this.sessionID = loginResponseData.socialSignUp.sessionID;
        localStorage.setItem('currentUser', JSON.stringify({ token: this.sessionID }));
        this.sharedService.shareUserData(loginResponseData.socialSignUp);
        this.loginResponseData = loginResponseData;
        console.log(this.loginResponseData);
        this.loggedIn = true;
        this.loggingIn = false;
        this.change.emit([this.loggedIn, this.loggingIn]);
        //this.loginResponse()
    };
    /* loginResponse(){
       console.log(this.loginResponseData);
       this.loginResponseData;
     }*/
    LoginComponent.prototype.me = function (userId, accessToken) {
        FB.api("/" + userId + '?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends', function (result) {
            console.log("result===", result);
            if (result && !result.error) {
            }
        });
    };
    LoginComponent.prototype.fbLogin = function () {
        var _this = this;
        FB.init({
            appId: '1896888180576849',
            cookie: false,
            // the session
            xfbml: true,
            version: 'v2.10' // use graph api version 2.5
        });
        FB.login(function (response) {
            if (response.status === 'connected') {
                _this.me(response.authResponse.userID, response.authResponse.accessToken);
            }
            else if (response.status === 'not_authorized') {
                console.log('not_authorized');
            }
            else {
                console.log("nothing from fb");
            }
        }, { scope: 'public_profile,email' });
    };
    LoginComponent.prototype.googleLogin = function () {
        this.getLoginData();
    };
    return LoginComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LoginComponent.prototype, "change", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-app',
        templateUrl: 'app/login.component.html',
        providers: [login_service_1.LoginService]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [login_service_1.LoginService, shared_service_1.SharedService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map