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
/**
 * Created by bobin on 26/10/17.
 */
var core_1 = require("@angular/core");
var user_profile_service_1 = require("./user-profile.service");
var router_1 = require("@angular/router");
var shared_service_1 = require("./shared.service");
var UserProfileComponent = (function () {
    function UserProfileComponent(userProfileService, route, router, sharedService) {
        var _this = this;
        this.userProfileService = userProfileService;
        this.route = route;
        this.router = router;
        this.sharedService = sharedService;
        this.bookImage = 'resources/background/storyboard_book_cover.png';
        this.viewSetting = false;
        this.userProfileView = true;
        /*this.subscription = this.sharedService.getUserData()
          .subscribe(userDetails => {
            this.userDetails = userDetails;
            console.log("userDetails in userProfile", this.userDetails);
          });*/
        this.route.params
            .subscribe(function (params) {
            _this.userProfileKey = params['id'];
            if (_this.userProfileKey) {
                _this.getUserProfileData(_this.userProfileKey);
            }
        });
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent.prototype.getUserProfileData = function (userProfileKey) {
        var _this = this;
        var userProfileRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "time": "2017-9-26 13:2:23",
            "timeZone": "Asia/Calcutta",
        };
        userProfileRequestData["userProfileKey"] = userProfileKey;
        this.userProfileService.getUserProfileData(userProfileRequestData)
            .subscribe(function (userProfileResponseData) {
            console.log("userProfileResponseData", userProfileResponseData);
            _this.userProfileResponseHandler(userProfileResponseData);
        });
    };
    UserProfileComponent.prototype.userProfileResponseHandler = function (userProfileResponseData) {
        this.userProfileResponseData = userProfileResponseData;
        this.userData = userProfileResponseData.visitProfile.userProfile;
        this.worldContentArray = this.userData.exploreUsersBooks;
    };
    UserProfileComponent.prototype.getUserProfilePic = function () {
        return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + this.userData.profilePic;
    };
    UserProfileComponent.prototype.getBookCoverImage = function (worldContent, index) {
        if (worldContent.userBook.bookImage) {
            return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.userBook.bookImage;
        }
        else {
            return 'resources/background/placeholder_2.jpg';
        }
    };
    UserProfileComponent.prototype.goToWorldPage = function (worldContent) {
        var storyBoardKey = worldContent.userBook.storyBoardKey;
        this.router.navigate(['/world', storyBoardKey]);
    };
    UserProfileComponent.prototype.goToSetting = function () {
        this.viewSetting = true;
        this.userProfileView = false;
        /*
            console.log("userToGoToSetting", this.userDetails);
        */
        //this.sharedService.shareUserData(this.userDetails);
        //this.router.navigate(['/setting'])
    };
    return UserProfileComponent;
}());
UserProfileComponent = __decorate([
    core_1.Component({
        selector: 'userprofile',
        templateUrl: 'app/user-profile.component.html',
        providers: [user_profile_service_1.UserProfileService]
    }),
    __metadata("design:paramtypes", [user_profile_service_1.UserProfileService,
        router_1.ActivatedRoute,
        router_1.Router,
        shared_service_1.SharedService])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map