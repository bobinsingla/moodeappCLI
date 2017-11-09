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
var router_1 = require("@angular/router");
var shared_service_1 = require("./shared.service");
var http_1 = require("@angular/http");
var common_shared_service_1 = require("./common-shared.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
var HeaderComponent = (function () {
    function HeaderComponent(router, sharedService, http, commonSharedService) {
        var _this = this;
        this.router = router;
        this.sharedService = sharedService;
        this.http = http;
        this.commonSharedService = commonSharedService;
        this.loggedIn = false;
        this.loggingIn = false;
        this.userName = "";
        var currentUser, token;
        this.subscription = this.sharedService.getUserData()
            .subscribe(function (userDetails) {
            _this.userSignUpResponseData = userDetails;
        });
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("token", currentUser);
        if (currentUser) {
            token = currentUser.token;
            this.checkLoginStatus(token);
        }
    }
    HeaderComponent.prototype.isLoggingIn = function (loggedIn, loggingIn) {
        console.log(loggedIn);
        this.loggedIn = loggedIn;
        this.loggingIn = loggingIn;
        //this.sharedService.shareUserData(this.userSignUpResponseData);
        this.userSignUpResponseHandler();
    };
    HeaderComponent.prototype.checkLoginStatus = function (token) {
        var _this = this;
        var sessionApi = "https://moodeapp.in/app/session";
        var sessionRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "time": "2017-9-26 13:2:23",
        };
        sessionRequestData['sessionID'] = token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(sessionApi, sessionRequestData, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (userDetails) {
            console.log("userDetails from session", userDetails);
            _this.userSignUpResponseData = userDetails.session;
            _this.loggedIn = true;
            _this.loggingIn = false;
            _this.userSignUpResponseHandler();
        });
    };
    HeaderComponent.prototype.userSignUpResponseHandler = function () {
        this.userName = this.userSignUpResponseData.firstName + ' ' + this.userSignUpResponseData.lastName;
    };
    HeaderComponent.prototype.getUserProfilePic = function () {
        var myPicture;
        if (this.userSignUpResponseData.myPicture) {
            myPicture = this.commonSharedService.getCloudinaryImageUrl(this.userSignUpResponseData.myPicture);
        }
        else {
            myPicture = 'resources/icons/user_profile_2.png';
        }
        return myPicture;
    };
    HeaderComponent.prototype.goToUserProfile = function () {
        var userProfileKey = this.userSignUpResponseData.userProfileKey;
        this.sharedService.shareUserData(this.userSignUpResponseData);
        this.sharedService.moodSelected(false);
        this.router.navigate(['/userprofile', userProfileKey]);
    };
    HeaderComponent.prototype.logout = function () {
        this.sharedService.shareUserData('');
        localStorage.removeItem('currentUser');
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'header',
        templateUrl: 'app/header.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, shared_service_1.SharedService, http_1.Http, common_shared_service_1.CommonSharedService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map