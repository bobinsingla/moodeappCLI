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
 * Created by bobin on 6/11/17.
 */
var core_1 = require("@angular/core");
var CommonSharedService = (function () {
    function CommonSharedService() {
    }
    CommonSharedService.prototype.getCloudinaryImageUrl = function (imageToken) {
        return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + imageToken;
    };
    CommonSharedService.prototype.getUserProfilePic = function (index) {
        var profilePic;
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
        return profilePic;
    };
    CommonSharedService.prototype.getPlaceholder = function (index) {
        var url = 'app/resources/background/placeholder_1.jpg';
        var imageNum = index;
        imageNum = Math.floor(imageNum % 9);
        switch (imageNum) {
            case 0:
                url = 'resources/background/placeholder_1.jpg';
                break;
            case 1:
                url = 'resources/background/placeholder_2.jpg';
                break;
            case 2:
                url = 'resources/background/placeholder_3.jpg';
                break;
            case 3:
                url = 'resources/background/placeholder_4.jpg';
                break;
            case 4:
                url = 'resources/background/placeholder_5.jpg';
                break;
            case 5:
                url = 'resources/background/placeholder_6.jpg';
                break;
            case 6:
                url = 'resources/background/placeholder_7.jpg';
                break;
            case 7:
                url = 'resources/background/placeholder_8.jpg';
                break;
            case 8:
                url = 'resources/background/placeholder_9.jpg';
                break;
        }
        return url;
    };
    return CommonSharedService;
}());
CommonSharedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CommonSharedService);
exports.CommonSharedService = CommonSharedService;
//# sourceMappingURL=common-shared.service.js.map