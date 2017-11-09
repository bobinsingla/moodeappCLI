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
var world_service_1 = require("./world.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var WorldComponent = (function () {
    function WorldComponent(worldService, http, router) {
        this.worldService = worldService;
        this.http = http;
        this.router = router;
        this.myOptions = {
            transitionDuration: '0.8s'
        };
        this.name = "World";
        this.worldContentArray = [];
        this.pageId = 1;
        this.isPublisher = 2;
        this.isActive = true;
        this.bookImage = "resources/background/storyboard_book_cover.png";
        this.getData(this.pageId, this.isPublisher);
        this.getRoleCss(this.isPublisher);
    }
    WorldComponent.prototype.onWindowScroll = function () {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
            if (this.worldContentArray != null && this.worldContentArray[this.worldContentArray.length - 1] != null) {
                this.pageId++;
                this.getData(this.pageId, this.isPublisher);
            }
        }
    };
    WorldComponent.prototype.getRole = function (id, isPublisher) {
        this.isActive = true;
        this.isPublisher = isPublisher;
        this.worldContentArray = [];
        this.getData(id, isPublisher);
        this.getRoleCss(isPublisher);
    };
    WorldComponent.prototype.getRoleCss = function (value) {
        switch (value) {
            case 0:
                this.backgroundCss0 = 'headerBackground';
                this.backgroundCss1 = 'publishers';
                this.backgroundCss2 = 'publishers';
                this.backgroundCss3 = 'publishers';
                break;
            case 1:
                this.backgroundCss1 = 'headerBackground';
                this.backgroundCss0 = 'publishers';
                this.backgroundCss2 = 'publishers';
                this.backgroundCss3 = 'publishers';
                break;
            case 2:
                this.backgroundCss2 = 'headerBackground';
                this.backgroundCss1 = 'publishers';
                this.backgroundCss0 = 'publishers';
                this.backgroundCss3 = 'publishers';
                break;
            case 3:
                this.backgroundCss3 = 'headerBackground';
                this.backgroundCss1 = 'publishers';
                this.backgroundCss2 = 'publishers';
                this.backgroundCss0 = 'publishers';
                break;
        }
    };
    WorldComponent.prototype.getData = function (id, isPublisher) {
        var _this = this;
        var worldRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "imei": "1071216312982030",
            "isPublisher": 2,
            "pageID": 1,
            "platform": "browser",
            "sessionID": "OjNmTwLRrSpVtuWy",
            "time": "2017-8-18 13:21:54",
            "timeZone": "Asia/Calcutta",
        };
        if (id) {
            worldRequestData["pageID"] = id;
        }
        worldRequestData["isPublisher"] = isPublisher;
        var worldRequestDataJson = JSON.stringify(worldRequestData);
        this.worldService.getData(worldRequestDataJson).subscribe(function (worldResponseData) {
            console.log("worldResponseData", worldResponseData);
            _this.worldResponseHandler(worldResponseData);
        });
    };
    WorldComponent.prototype.worldResponseHandler = function (worldResponseData) {
        var newObj = worldResponseData.exploreUsersBook;
        for (var i = 0; i < newObj.exploreUsersBooks.length; ++i) {
            this.worldContentArray.push(newObj.exploreUsersBooks[i]);
        }
    };
    WorldComponent.prototype.getWorldImageUrl = function (worldContent) {
        var worldImage = 'app/color.png';
        if (worldContent.album[0] != null && worldContent.album[0].length != 0) {
            worldImage = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.album[0];
        }
        return worldImage;
    };
    WorldComponent.prototype.getWorldDetail = function (worldContent) {
        this.worldContent = worldContent;
        this.router.navigate(['/world', this.worldContent.userBook.storyBoardKey]);
    };
    WorldComponent.prototype.getBackgroundImage = function () {
        var imageUrl;
        return imageUrl = "resources/icons/world_canopy.png";
    };
    WorldComponent.prototype.getUserProfileImage = function (worldContent, index) {
        var profilePic = "";
        if (worldContent.userBook.profilePic) {
            profilePic = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.userBook.profilePic;
        }
        else {
            profilePic = 'resources/icons/user_profile_1.png';
            var imageNum = index;
            imageNum = Math.floor(imageNum % 6);
            switch (imageNum) {
                case 0:
                    profilePic = 'resources/icons/user_profile_1.png';
                    break;
                case 1:
                    profilePic = 'resources/icons/user_profile_2.png';
                    break;
                case 2:
                    profilePic = 'resources/icons/user_profile_3.png';
                    break;
                case 3:
                    profilePic = 'resources/icons/user_profile_4.png';
                    break;
                case 4:
                    profilePic = 'resources/icons/user_profile_5.png';
                    break;
                case 5:
                    profilePic = 'resources/icons/user_profile_6.png';
                    break;
            }
        }
        return profilePic;
    };
    return WorldComponent;
}());
__decorate([
    core_1.HostListener("window:scroll", []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorldComponent.prototype, "onWindowScroll", null);
WorldComponent = __decorate([
    core_1.Component({
        selector: 'my-world',
        templateUrl: 'app/world.component.html',
        styleUrls: ['app/world.component.css'],
        providers: [world_service_1.WorldService]
    }),
    __metadata("design:paramtypes", [world_service_1.WorldService, http_1.Http, router_1.Router])
], WorldComponent);
exports.WorldComponent = WorldComponent;
//# sourceMappingURL=world.component.js.map