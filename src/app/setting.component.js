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
 * Created by bobin on 27/10/17.
 */
var core_1 = require("@angular/core");
var setting_service_1 = require("./setting.service");
var shared_service_1 = require("./shared.service");
var router_1 = require("@angular/router");
var SettingComponent = (function () {
    function SettingComponent(settingService, sharedService, router) {
        this.settingService = settingService;
        this.sharedService = sharedService;
        this.router = router;
        this.getSettingData();
        /*this.sharedService.getUserData()
          .subscribe(userDetails => {
            console.log("Message from god", userDetails);
            if(userDetails != null){
              this.userDetails = userDetails
            }
          });*/
    }
    SettingComponent.prototype.getSettingData = function () {
        var settingRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "imei": "1071216312982030",
            "platform": "browser",
            "timeZone": "Asia/Calcutta",
        };
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.token;
        settingRequestData['sessionID'] = token;
        var time = new Date();
        settingRequestData['time'] = time.toLocaleString();
        console.log("Message from settings", settingRequestData);
        this.settingService.getSettingData(settingRequestData)
            .subscribe(function (settingResponseData) {
            console.log("settingResponseData", settingResponseData);
        });
    };
    SettingComponent.prototype.logout = function () {
        localStorage.clear();
        location.reload();
        this.router.navigate(['']);
    };
    return SettingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SettingComponent.prototype, "userDetails", void 0);
SettingComponent = __decorate([
    core_1.Component({
        selector: 'setting',
        templateUrl: 'app/setting.component.html',
        providers: [setting_service_1.SettingService]
    }),
    __metadata("design:paramtypes", [setting_service_1.SettingService,
        shared_service_1.SharedService,
        router_1.Router])
], SettingComponent);
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=setting.component.js.map