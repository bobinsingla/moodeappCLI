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
var world_detail_service_1 = require("./world-detail.service");
var platform_browser_1 = require("@angular/platform-browser");
var common_shared_service_1 = require("./common-shared.service");
require("rxjs/add/operator/map");
var WorldDetailComponent = (function () {
    function WorldDetailComponent(route, worldDetailService, router, sanitizer, commonSharedService) {
        this.route = route;
        this.worldDetailService = worldDetailService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.commonSharedService = commonSharedService;
        this.myOptions = {
            transitionDuration: '0.8s'
        };
        this.worldDetailArray = [];
    }
    WorldDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOninit");
        this.route.params.map(function (param) { return param['id']; }).subscribe(function (id) {
            if (id != null && id != "") {
                _this.requestData(id);
            }
        });
    };
    WorldDetailComponent.prototype.requestData = function (storyBoardKey) {
        var _this = this;
        var worldRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "storyBoardKey": "Love-and-Olive-Oil-Storyboard--5484",
            "time": "2017-8-18 19:58:4",
            "timeZone": "Asia/Calcutta",
        };
        worldRequestData['storyBoardKey'] = storyBoardKey;
        var worldRequestDataJson = JSON.stringify(worldRequestData);
        this.worldDetailService.getData(worldRequestDataJson)
            .subscribe(function (worldResponseData) {
            _this.worldDetailResponseHandler(worldResponseData);
        });
    };
    WorldDetailComponent.prototype.worldDetailResponseHandler = function (worldResponseData) {
        console.log("worldResponseData:", worldResponseData);
        var newObj = worldResponseData.userBookScreening;
        this.worldResponseData = newObj;
        /*for (var i = 0; i < newObj.postData.length; ++i) {
            this.worldDetailArray.push(newObj.postData[i]);
        }*/
    };
    WorldDetailComponent.prototype.getPostUrl = function (worldImage, index) {
        var url;
        if (typeof (worldImage) === "string") {
            url = this.commonSharedService.getCloudinaryImageUrl(worldImage);
        }
        else if (typeof (worldImage) === "object") {
            if (worldImage.postCover && worldImage.postCover.length) {
                if (worldImage.postCover[0].url.indexOf("http") == -1) {
                    url = this.commonSharedService.getCloudinaryImageUrl(worldImage.postCover[0].url);
                }
                else {
                    url = worldImage.postCover[0].url;
                }
            }
            else {
                url = this.commonSharedService.getPlaceholder(index);
            }
        }
        return url;
    };
    WorldDetailComponent.prototype.isPostVideo = function (post) {
        var result = false;
        if (post.postCover != null) {
            if (post.postCover != null) {
                if (post.postCover[0] != null && post.postCover[0].type == 1) {
                    result = true;
                }
            }
        }
        return result;
    };
    WorldDetailComponent.prototype.playVideo = function (post) {
        console.log("Playing");
        this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + post.postCover[0].videoId);
        this.showYoutubePlayer = true;
    };
    WorldDetailComponent.prototype.closeVideo = function () {
        this.showYoutubePlayer = false;
    };
    WorldDetailComponent.prototype.goToDetail = function (worldDetail) {
        this.router.navigate(['/story', worldDetail.postKey]);
    };
    WorldDetailComponent.prototype.getUserProfileImage = function (worldDetail, index) {
        var profilePic = "";
        if (worldDetail.profilePicUrl) {
            profilePic = this.commonSharedService.getCloudinaryImageUrl(worldDetail.profilePicUrl);
        }
        else {
            profilePic = this.commonSharedService.getUserProfilePic(index);
        }
        this.userProfilePic = profilePic;
        return profilePic;
    };
    WorldDetailComponent.prototype.getUserProfile = function (worldDetail) {
        var userProfile;
        if (worldDetail.userProfilePic) {
            userProfile = this.commonSharedService.getCloudinaryImageUrl(worldDetail.userProfilePic);
        }
        else {
            userProfile = 'resources/icons/user_profile_6.png';
        }
        return userProfile;
    };
    return WorldDetailComponent;
}());
WorldDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-world-detail',
        templateUrl: 'app/world-detail.component.html',
        providers: [world_detail_service_1.WorldDetailService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        world_detail_service_1.WorldDetailService,
        router_1.Router,
        platform_browser_1.DomSanitizer,
        common_shared_service_1.CommonSharedService])
], WorldDetailComponent);
exports.WorldDetailComponent = WorldDetailComponent;
//# sourceMappingURL=world-detail.component.js.map