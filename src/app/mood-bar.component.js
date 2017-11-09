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
 * Created by bobin on 9/10/17.
 */
var core_1 = require("@angular/core");
var mood_bar_service_1 = require("./mood-bar.service");
var shared_service_1 = require("./shared.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var MoodBarComponent = (function () {
    function MoodBarComponent(moodBarService, sharedService, router) {
        var _this = this;
        this.moodBarService = moodBarService;
        this.sharedService = sharedService;
        this.router = router;
        //userSignUpResponseData: any;
        this.moodBarObj = {};
        this.moodBarArray = [];
        this.moodBarChildrenArray = [];
        this.moodSelected = false;
        this.getMoodBarData();
        this.subscription = this.sharedService.getMoodSelected()
            .subscribe(function (moodSelected) {
            _this.moodSelected = moodSelected;
        });
    }
    MoodBarComponent.prototype.getMoodBarData = function () {
        var _this = this;
        var moodBarRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "time": "2017-6-17 14:8:37",
            "timeZone": "Asia/Calcutta"
        };
        var time = new Date();
        moodBarRequestData['time'] = time.toLocaleString();
        this.moodBarService.getMoodBarData(moodBarRequestData)
            .subscribe(function (moodBarResponseData) {
            console.log(moodBarResponseData);
            _this.moodBarResponseHandler(moodBarResponseData);
        });
    };
    MoodBarComponent.prototype.moodBarResponseHandler = function (moodBarResponseData) {
        var newObj = moodBarResponseData.getWebMoode.cotegory;
        this.moodBarObj = moodBarResponseData.getWebMoode.cotegory;
        this.moodBarArray = Object.keys(newObj);
    };
    MoodBarComponent.prototype.getMoodImage = function (mood) {
        var moodImage = this.moodBarObj[mood][0].iconImageUrl;
        moodImage = moodImage.replace("size", "100");
        return moodImage;
    };
    MoodBarComponent.prototype.getMoodBarChildren = function (mood) {
        this.moodSelected = true;
        this.moodBarChildrenArray = [];
        var moodBarChild;
        for (var i = 0; i < this.moodBarObj[mood].length; i++) {
            moodBarChild = this.moodBarObj[mood][i];
            this.moodBarChildrenArray.push(moodBarChild);
        }
        console.log("moodChildArray", this.moodBarChildrenArray);
        this.moodDetails = mood;
        //this.sharedService.shareMoodData(mood);
        this.sharedService.shareMoodChildArray(this.moodBarChildrenArray);
    };
    MoodBarComponent.prototype.getMoodBarChildImage = function (moodChild) {
        var moodChildImage = moodChild.dishImageUrl.replace("size", "100");
        return moodChildImage;
    };
    MoodBarComponent.prototype.getUserProfilePic = function () {
        var myPicture;
        if (this.userSignUpResponseData.myPicture) {
            myPicture = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + this.userSignUpResponseData.myPicture;
        }
        else {
            myPicture = 'resources/icons/user_profile_2.png';
        }
        return myPicture;
    };
    MoodBarComponent.prototype.moodBarChildHandler = function (moodBarChild) {
        this.router.navigate([this.moodDetails, moodBarChild.tagsName]);
        //this.router.navigate(['', moodBarChild])
    };
    MoodBarComponent.prototype.goToHome = function () {
        this.moodSelected = false;
        //this.sharedService.shareUserData(this.userSignUpResponseData.socialSignUp);
        this.router.navigate(['']);
    };
    MoodBarComponent.prototype.goToMood = function (mood) {
        this.router.navigate(['', mood]);
        this.getMoodBarChildren(mood);
    };
    MoodBarComponent.prototype.goToWorld = function () {
        this.sharedService.moodSelected(false);
        this.router.navigate(['/world']);
    };
    MoodBarComponent.prototype.goToShop = function () {
        this.sharedService.moodSelected(false);
        this.router.navigate(['/shop']);
    };
    return MoodBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MoodBarComponent.prototype, "userSignUpResponseData", void 0);
MoodBarComponent = __decorate([
    core_1.Component({
        selector: 'mood-bar',
        templateUrl: 'app/mood-bar.component.html',
        providers: [mood_bar_service_1.MoodBarService]
    }),
    __metadata("design:paramtypes", [mood_bar_service_1.MoodBarService,
        shared_service_1.SharedService,
        router_1.Router])
], MoodBarComponent);
exports.MoodBarComponent = MoodBarComponent;
//# sourceMappingURL=mood-bar.component.js.map