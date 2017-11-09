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
 * Created by bobin on 10/10/17.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var home_post_service_1 = require("./home-post.service");
var shared_service_1 = require("./shared.service");
var common_shared_service_1 = require("./common-shared.service");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/operator/map");
var HomePostComponent = (function () {
    function HomePostComponent(homePostService, sanitizer, router, sharedService, route, commonSharedService) {
        /*let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;
        if(token){
          this.userDetailsResponseHandler(token);
        }*/
        var _this = this;
        this.homePostService = homePostService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.sharedService = sharedService;
        this.route = route;
        this.commonSharedService = commonSharedService;
        this.myOptions = {
            transitionDuration: '0.8s'
        };
        this.homePostArray = [];
        this.pageId = 1;
        this.isMoodSelected = false;
        this.moodChildTagsID = "";
        this.moodSelected = false;
        this.moodBarChildrenArray = [];
        this.loggedIn = false;
        /*let userDetailsSubscription = this.sharedService.getUserData();
        let checkRouteParams = this.route.params;
        Observable.forkJoin([userDetailsSubscription, checkRouteParams]).subscribe(results => {
          console.log('this fork join thing is working');
          console.log(results);
        });*/
        this.subscription = this.sharedService.getUserData()
            .subscribe(function (userDetails) {
            console.log("Message from home post component", userDetails);
            if (userDetails != null) {
                _this.loggedIn = true;
                _this.userDetails = userDetails;
                _this.sessionID = userDetails.sessionID;
                _this.selectContent();
            }
        });
        this.route.params.subscribe(function (params) {
            console.log("checking out route params", params['id'], params['id2']);
            _this.moodDetails = params['id'];
            _this.moodChildName = params['id2'];
            _this.selectContent();
        });
        /*this.subscription = this.sharedService.getMoodChildArrayData()
          .subscribe(moodChildArray => {
            this.moodSelected = true;
            console.log('mood children found', moodChildArray );
            this.moodBarChildrenArray = moodChildArray;
          });*/
    }
    HomePostComponent.prototype.ngOnInit = function () {
    };
    HomePostComponent.prototype.onWindowScroll = function () {
        if ((document.documentElement.scrollTop + document.documentElement.clientHeight) == (document.documentElement.scrollHeight)) {
            if (this.homePostArray != null && this.homePostArray[this.homePostArray.length - 1] != null) {
                if (this.pageId <= 4) {
                    this.pageId++;
                    this.getHomePostData(this.pageId);
                }
            }
        }
    };
    HomePostComponent.prototype.selectContent = function () {
        if (this.moodDetails) {
            console.log('I will display data if mood is selected');
            this.moodSelected = true;
            this.moodHandler();
        }
        else {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                this.sessionID = currentUser.token;
                console.log("I will display data if mood is not selected but person is logged in");
                this.userDetailsResponseHandler(this.sessionID);
            }
            else {
                console.log('I will display data if mood is not selected and person is not logged in');
                this.getHomePostData(this.pageId);
            }
        }
        /*this.subscription = this.sharedService.getMoodData()
          .subscribe(moodDetails => {
            console.log("mood details", moodDetails);
            this.moodHandler(moodDetails);
          });
    
        this.subscription = this.sharedService.goToHomeResponse()
          .subscribe((goToHome) => {
            if(goToHome == true){
              this.homePostArray = [];
              this.moodSelected = false;
              this.pageId = 1;
              this.getHomePostDataWithLogin(this.pageId)
            }
          })*/
    };
    HomePostComponent.prototype.userDetailsResponseHandler = function (sessionID) {
        console.log("sessionID", sessionID);
        this.homePostArray = [];
        this.isMoodSelected = false;
        this.moodSelected = false;
        this.pageId = 1;
        this.getHomePostData(this.pageId);
    };
    HomePostComponent.prototype.moodHandler = function () {
        this.homePostArray = [];
        this.isMoodSelected = true;
        this.pageId = 1;
        this.moodChildTagsID = "";
        this.getHomePostData(this.pageId);
    };
    /*moodBarChildHandler(moodChildDetails: any){
      this.router.navigate([this.moodDetails , moodChildDetails.tagsName ])
     /!* this.homePostArray = [];
      this.pageId = 1;
      this.moodChildTagsID = moodChildDetails.tagsID;
      console.log(this.moodChildTagsID);
      this.getHomePostData(this.pageId);*!/
    }
  */
    HomePostComponent.prototype.getHomePostData = function (pageId) {
        if (this.isMoodSelected == true) {
            this.getMoodPostData(pageId);
        }
        else {
            if (this.sessionID != null) {
                this.getHomePostDataWithLogin(pageId);
            }
            else {
                this.getHomePostDataWithoutLogin(pageId);
            }
        }
    };
    HomePostComponent.prototype.getMoodPostData = function (pageId) {
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
            "timeZone": "Asia/Calcutta",
            "title": "LOVE",
            "userType": "",
        };
        var time = new Date();
        moodHomePostRequestData["time"] = time.toLocaleString();
        moodHomePostRequestData["pageID"] = pageId;
        //this.moodDetails.toString();
        console.log(this.moodDetails);
        moodHomePostRequestData["title"] = this.moodDetails;
        if (this.moodChildName) {
            this.moodChildName.toString();
            console.log(this.moodChildName);
            moodHomePostRequestData["tagName"] = this.moodChildName;
        }
        console.log(moodHomePostRequestData);
        this.homePostService.getMoodHomePostData(moodHomePostRequestData)
            .subscribe(function (moodHomePostResponseData) {
            console.log("moodHomePostResponseData:", moodHomePostResponseData);
            _this.homePostResponseHandler(moodHomePostResponseData.webExploreBySection);
        });
    };
    HomePostComponent.prototype.getHomePostDataWithLogin = function (pageId) {
        var _this = this;
        var homePostRequestDataWithLogin = {
            "mode": "DESC",
            "type": "userhome",
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "imei": "105473668152346936259",
            "timeZone": "Asia/Calcutta",
            "location": { "latitude": "28.5006195", "longitude": "77.073771" }
        };
        var time = new Date();
        homePostRequestDataWithLogin['time'] = time.toLocaleString();
        homePostRequestDataWithLogin["pageID"] = pageId;
        homePostRequestDataWithLogin["sessionID"] = this.sessionID;
        this.homePostService.getHomePostDataWithLogin(homePostRequestDataWithLogin)
            .subscribe(function (homePostResponseDataWithLogin) {
            console.log("homePostRequestDataWithLogin:", homePostResponseDataWithLogin);
            _this.homePostResponseHandler(homePostResponseDataWithLogin.userHomeV3_2);
        });
    };
    HomePostComponent.prototype.getHomePostDataWithoutLogin = function (pageId) {
        var _this = this;
        var homePostRequestData = {
            "mode": "DESC",
            "type": "userhome",
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "imei": "105473668152346936259",
            "timeZone": "Asia/Calcutta",
            "location": { "latitude": "28.5006195", "longitude": "77.073771" }
        };
        var time = new Date();
        homePostRequestData['time'] = time.toLocaleString();
        homePostRequestData["pageID"] = pageId;
        this.homePostService.getHomePostData(homePostRequestData)
            .subscribe(function (homePostResponseData) {
            console.log("homePostResponseData:", homePostResponseData.userWebHome);
            _this.homePostResponseHandler(homePostResponseData.userWebHome);
        });
    };
    HomePostComponent.prototype.homePostResponseHandler = function (homePostResponseData) {
        var newObj = homePostResponseData;
        for (var i = 0; i < newObj.postData.length; ++i) {
            this.homePostArray.push(newObj.postData[i]);
        }
        console.log("postArray", this.homePostArray);
    };
    HomePostComponent.prototype.getMoodBarChildImage = function (moodChild) {
        var moodChildImage = moodChild.dishImageUrl.replace("size", "100");
        return moodChildImage;
    };
    HomePostComponent.prototype.checkPostHeight = function (post) {
        var height = 250;
        if (post.postCover != null && post.postCover.length > 0) {
            if (post.postCover[0].imageHeight != null && post.postCover[0].imageWidth != null) {
                if (document.documentElement.clientWidth > 700) {
                    height = (post.postCover[0].imageHeight * (document.documentElement.clientWidth / 5)) / post.postCover[0].imageWidth;
                }
                else {
                    height = (post.postCover[0].imageHeight * (document.documentElement.clientWidth)) / post.postCover[0].imageWidth;
                }
            }
        }
        return height;
    };
    HomePostComponent.prototype.getHomePostImageUrl = function (post, index) {
        var url;
        if (post.postCover != null && post.postCover.length != 0 && post.postCover[0].url) {
            if (post.postCover[0].url.indexOf("http") == -1) {
                url = this.commonSharedService.getCloudinaryImageUrl(post.postCover[0].url);
            }
            else {
                url = post.postCover[0].url;
            }
        }
        else {
            url = this.commonSharedService.getPlaceholder(index);
        }
        return url;
    };
    HomePostComponent.prototype.getUserProfileImage = function (post, index) {
        var profilePic = '';
        if (post.profilePicUrl) {
            profilePic = this.commonSharedService.getCloudinaryImageUrl(post.profilePicUrl);
        }
        else {
            profilePic = this.commonSharedService.getUserProfilePic(index);
        }
        return profilePic;
    };
    HomePostComponent.prototype.isPostVideo = function (post) {
        var result = false;
        if (post.postCover != null && post.postCover.length > 0) {
            if (post.postCover[0].type == 1) {
                result = true;
            }
        }
        return result;
    };
    HomePostComponent.prototype.playVideo = function (post) {
        this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + post.postCover[0].videoId);
        this.showYoutubePlayer = true;
    };
    HomePostComponent.prototype.closeVideo = function () {
        this.showYoutubePlayer = false;
    };
    HomePostComponent.prototype.loadMore = function () {
        this.pageId++;
        this.getHomePostData(this.pageId);
    };
    HomePostComponent.prototype.goToDetail = function (post) {
        this.sharedService.moodSelected(false);
        this.router.navigate(['/story', post.postKey]);
    };
    return HomePostComponent;
}());
__decorate([
    core_1.HostListener("window:scroll", []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePostComponent.prototype, "onWindowScroll", null);
HomePostComponent = __decorate([
    core_1.Component({
        selector: 'home-post',
        templateUrl: 'app/home-post.component.html',
        styleUrls: ['app/home-post.component.css'],
        providers: [home_post_service_1.HomePostService]
    }),
    __metadata("design:paramtypes", [home_post_service_1.HomePostService,
        platform_browser_1.DomSanitizer,
        router_1.Router,
        shared_service_1.SharedService,
        router_2.ActivatedRoute,
        common_shared_service_1.CommonSharedService])
], HomePostComponent);
exports.HomePostComponent = HomePostComponent;
//# sourceMappingURL=home-post.component.js.map