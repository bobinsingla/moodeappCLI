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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var HomePostService = (function () {
    function HomePostService(http) {
        this.http = http;
        this.homePostApi = 'https://moodeapp.in/app/userWebHome';
        this.homePostLoginApi = 'https://moodeapp.in/app/userHomeV3_2';
        this.moodHomePostApi = 'https://moodeapp.in/app/webExploreBySection';
    }
    HomePostService.prototype.getHomePostData = function (homePostRequestData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'post' });
        return this.http.post(this.homePostApi, homePostRequestData, options)
            .map(function (res) { return res.json(); });
    };
    HomePostService.prototype.getHomePostDataWithLogin = function (homePostRequestDataWithLogin) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'post' });
        return this.http.post(this.homePostLoginApi, homePostRequestDataWithLogin, options)
            .map(function (res) { return res.json(); });
    };
    HomePostService.prototype.getMoodHomePostData = function (moodHomePostRequestData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'post' });
        return this.http.post(this.moodHomePostApi, moodHomePostRequestData, options)
            .map(function (res) { return res.json(); });
    };
    return HomePostService;
}());
HomePostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HomePostService);
exports.HomePostService = HomePostService;
//# sourceMappingURL=home-post.service.js.map