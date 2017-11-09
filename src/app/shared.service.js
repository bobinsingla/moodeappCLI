"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by bobin on 24/10/17.
 */
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var SharedService = (function () {
    function SharedService() {
        this.subject = new Subject_1.Subject();
        this.moodSubject = new Subject_1.Subject();
        this.moodChildSubject = new Subject_1.Subject();
        this.moodChildArraySubject = new Subject_1.Subject();
        this.homeSubject = new Subject_1.Subject();
        this.moodSelectedSub = new Subject_1.Subject();
    }
    SharedService.prototype.shareUserData = function (loginResponseData) {
        this.subject.next(loginResponseData);
    };
    SharedService.prototype.shareMoodData = function (mood) {
        this.moodSubject.next(mood);
    };
    SharedService.prototype.shareMoodChildData = function (moodChild) {
        this.moodChildSubject.next(moodChild);
    };
    SharedService.prototype.shareMoodChildArray = function (moodChildArray) {
        this.moodChildArraySubject.next(moodChildArray);
    };
    SharedService.prototype.moodSelected = function (mood) {
        this.moodSelectedSub.next(mood);
    };
    SharedService.prototype.getMoodSelected = function () {
        return this.moodSelectedSub.asObservable();
    };
    //I guess this can be used for logout
    SharedService.prototype.clearMessage = function () {
        this.subject.next();
    };
    SharedService.prototype.goToHomeRequest = function (goToHome) {
        this.homeSubject.next(goToHome);
    };
    SharedService.prototype.goToHomeResponse = function () {
        return this.homeSubject.asObservable();
    };
    SharedService.prototype.getUserData = function () {
        return this.subject.asObservable();
    };
    SharedService.prototype.getMoodData = function () {
        return this.moodSubject.asObservable();
    };
    SharedService.prototype.getMoodChildData = function () {
        return this.moodChildSubject.asObservable();
    };
    SharedService.prototype.getMoodChildArrayData = function () {
        console.log("i am in shared service for moodChildArraySubject", this.moodChildArraySubject.asObservable());
        return this.moodChildArraySubject.asObservable();
    };
    return SharedService;
}());
SharedService = __decorate([
    core_1.Injectable()
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map