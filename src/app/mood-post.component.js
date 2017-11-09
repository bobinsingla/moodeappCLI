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
 * Created by bobin on 31/10/17.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_post_service_1 = require("./home-post.service");
var MoodPostComponent = (function () {
    function MoodPostComponent(route, homePostService) {
        this.route = route;
        this.homePostService = homePostService;
        this.moodPostArray = [];
        this.pageId = 1;
        this.title = "";
        this.moodChildTagsID = "";
    }
    MoodPostComponent.prototype.onWindowScroll = function () {
        if ((document.documentElement.scrollTop + document.documentElement.clientHeight) == (document.documentElement.scrollHeight)) {
            if (this.moodPostArray != null && this.moodPostArray[this.moodPostArray.length - 1] != null) {
                if (this.pageId <= 4) {
                    this.pageId++;
                    this.getMoodPostData(this.pageId, this.title);
                }
            }
        }
    };
    MoodPostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.title = params['id'];
            _this.moodChildTagsID = params['id2'];
        });
        if (this.title) {
            this.getMoodPostData(this.pageId, this.title);
        }
    };
    MoodPostComponent.prototype.getMoodPostData = function (pageId, title) {
        var _this = this;
        var moodHomePostRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "loadSection": 0,
            "location": { "latitude": "28.5006195", "longitude": "77.073771" },
            "mode": "ASC",
            "pageID": 1,
            "platform": "browser",
            "sortBy": "newest",
            "tagID": "",
            "time": "2017-8-20 14:31:7",
            "timeZone": "Asia/Calcutta",
            "title": "LOVE",
            "userType": "",
        };
        moodHomePostRequestData["pageID"] = pageId;
        this.title.toString();
        console.log(this.title);
        moodHomePostRequestData["title"] = this.title;
        if (this.moodChildTagsID) {
            this.moodChildTagsID.toString();
            console.log(this.moodChildTagsID);
            moodHomePostRequestData["tagID"] = this.moodChildTagsID;
        }
        console.log(moodHomePostRequestData);
        this.homePostService.getMoodHomePostData(moodHomePostRequestData)
            .subscribe(function (moodHomePostResponseData) {
            console.log("homePostResponseData:", moodHomePostResponseData);
            _this.moodPostResponseHandler(moodHomePostResponseData.webExploreBySection);
        });
    };
    MoodPostComponent.prototype.moodPostResponseHandler = function (homePostResponseData) {
        var newObj = homePostResponseData;
        for (var i = 0; i < newObj.postData.length; ++i) {
            this.moodPostArray.push(newObj.postData[i]);
        }
        console.log("postArray", this.moodPostArray);
    };
    return MoodPostComponent;
}());
__decorate([
    core_1.HostListener("window:scroll", []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoodPostComponent.prototype, "onWindowScroll", null);
MoodPostComponent = __decorate([
    core_1.Component({
        selector: 'mood-post',
        templateUrl: 'app/mood-post.component.html',
        providers: [home_post_service_1.HomePostService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        home_post_service_1.HomePostService])
], MoodPostComponent);
exports.MoodPostComponent = MoodPostComponent;
//# sourceMappingURL=mood-post.component.js.map