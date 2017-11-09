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
 * Created by bobin on 12/10/17.
 */
var core_1 = require("@angular/core");
var post_detail_service_1 = require("./post-detail.service");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
var PostDetailComponent = (function () {
    function PostDetailComponent(postDetailService, route, sanitizer) {
        this.postDetailService = postDetailService;
        this.route = route;
        this.sanitizer = sanitizer;
        this.indexOfCoverImage = 0;
        this.isStoryBodyText = false;
        this.isPostDetails = false;
        this.notLoggedIn = false;
    }
    PostDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.postkey = params['id'];
        });
        if (this.postkey) {
            this.getPostDetailData(this.postkey);
        }
    };
    PostDetailComponent.prototype.getPostDetailData = function (postkey) {
        var _this = this;
        var postDetailRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "imei": "",
            "time": "2017-7-12 13:55:53",
            "timeZone": "Asia/Calcutta"
        };
        postDetailRequestData["postKey"] = postkey;
        this.postDetailService.getPostDetailData(postDetailRequestData)
            .subscribe(function (postDetailResponseData) {
            console.log(postDetailResponseData);
            _this.postDetailResponseHandler(postDetailResponseData);
        });
    };
    PostDetailComponent.prototype.postDetailResponseHandler = function (postDetailResponseData) {
        this.postDetailResponseData = postDetailResponseData;
        this.getImageUrl(this.indexOfCoverImage);
        this.getPostCategory();
        this.getPostSaveIn();
        this.postDetailsStoryBody();
    };
    PostDetailComponent.prototype.getImageUrl = function (index) {
        this.indexOfCoverImage = index;
        console.log(index);
        var url = [];
        var postCover = this.postDetailResponseData.postDetail.userPost.postCover;
        if (postCover != null && postCover.length > 0 && postCover[0].url != null) {
            for (var i = 0; i < postCover.length; i++) {
                if (postCover[i].url.indexOf("http") == -1) {
                    url.push('http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + postCover[i].url);
                }
                else {
                    url.push(postCover[i].url);
                }
            }
        }
        else {
            url.push("resources/background/placeholder_1.jpg");
        }
        this.coverImageUrl = url[this.indexOfCoverImage];
        this.imageUrlArray = url;
    };
    PostDetailComponent.prototype.nextImage = function () {
        if (this.indexOfCoverImage < this.imageUrlArray.length - 1) {
            this.indexOfCoverImage++;
        }
        else {
            this.indexOfCoverImage = 0;
        }
        this.getImageUrl(this.indexOfCoverImage);
    };
    PostDetailComponent.prototype.previousImage = function () {
        if (this.indexOfCoverImage <= 0) {
            this.indexOfCoverImage = this.imageUrlArray.length - 1;
        }
        else {
            this.indexOfCoverImage--;
        }
        this.getImageUrl(this.indexOfCoverImage);
    };
    PostDetailComponent.prototype.isPostVideo = function () {
        var videoPost = false;
        if (this.postDetailResponseData.postDetail.userPost.postCover.length > 0) {
            if (this.postDetailResponseData.postDetail.userPost.postCover[0].type === 1) {
                videoPost = true;
            }
        }
        return videoPost;
    };
    PostDetailComponent.prototype.getPostCategory = function () {
        console.log("loading");
        this.postCategoryArray = this.postDetailResponseData.postDetail.userPost.cotegory;
    };
    PostDetailComponent.prototype.getPostCategoryImage = function (postCategory) {
        var postCategoryImage = postCategory.iconImageUrl.replace("size", "100");
        return postCategoryImage;
    };
    PostDetailComponent.prototype.getPostSaveIn = function () {
        var savedIn = this.postDetailResponseData.postDetail.userPost.savedIn;
        var newSaveInArray = [];
        var saveInArray = savedIn.split("#");
        var string = "#";
        for (var i = 1; i < saveInArray.length; i++) {
            newSaveInArray.push(string.concat(saveInArray[i]));
        }
        console.log("newTagArray", newSaveInArray);
        this.saveInArray = newSaveInArray;
        console.log("tagsArray", this.saveInArray);
    };
    PostDetailComponent.prototype.getRandomColor = function (index) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    PostDetailComponent.prototype.playVideo = function () {
        this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.postDetailResponseData.postDetail.userPost.postCover[0].videoId);
        //this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.postDetailResponseData.postDetail.userPost.url);
        this.showYoutubePlayer = true;
    };
    PostDetailComponent.prototype.closeVideo = function () {
        this.showYoutubePlayer = false;
    };
    PostDetailComponent.prototype.postDetailsStoryBody = function () {
        var postBody = this.postDetailResponseData.postDetail.userPost.postBody;
        var bodyText = [];
        var storyBodyText = [];
        var imageInBody;
        for (var i = 0; i < postBody.length; i++) {
            if (postBody[i].type == 2) {
                imageInBody = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + postBody[i].url;
                bodyText.push("<img src=" + imageInBody + ">" + "<br /><br />");
            }
            if (postBody[i].type == 4) {
                bodyText.push(postBody[i].text + "<br />");
            }
            if (postBody[i].type == 1) {
                imageInBody = postBody[i].url;
                bodyText.push("<div (click) = 'playStoryVideo()'>" + "<img src=" + imageInBody + ">" + "</div>" + "<br /><br />");
            }
            storyBodyText.push(this.sanitizer.bypassSecurityTrustHtml(bodyText[i]));
        }
        this.storyBodyTextArray = storyBodyText;
        console.log(this.storyBodyTextArray);
        /*let bodyTextString = bodyText.toString();
        console.log("bodyTextString",bodyTextString);
        let text = this.sanitizer.bypassSecurityTrustHtml(bodyTextString);
        if(text != null ){
          this.isStoryBodyText = true;
        }
        return text*/
    };
    PostDetailComponent.prototype.playStoryVideo = function () {
        console.log("playing");
    };
    PostDetailComponent.prototype.showPostDetails = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.sessionId = currentUser.token;
            this.isPostDetails = true;
            this.postUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.postDetailResponseData.postDetail.userPost.url);
        }
        else {
            console.log("loginApp");
            this.notLoggedIn = true;
        }
    };
    PostDetailComponent.prototype.closePost = function () {
        this.isPostDetails = false;
    };
    return PostDetailComponent;
}());
PostDetailComponent = __decorate([
    core_1.Component({
        selector: 'post-detail',
        templateUrl: 'app/post-detail.component.html',
        providers: [post_detail_service_1.PostDetailService]
    }),
    __metadata("design:paramtypes", [post_detail_service_1.PostDetailService,
        router_1.ActivatedRoute,
        platform_browser_1.DomSanitizer])
], PostDetailComponent);
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail.component.js.map