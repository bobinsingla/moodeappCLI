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
var http_1 = require("@angular/http");
//import { Md5 } from 'ts-md5/dist/md5';
var SettingService = (function () {
    function SettingService(http) {
        this.http = http;
        this.settingApi = "https://moodeapp.in/app/getSetting";
    }
    /* createAuthorizationHeader(headers: Headers) {
       headers.append("access-control-allow-methods,access-control-allow-origin,content-type,signup,UserAuth");
     }*/
    SettingService.prototype.getSettingData = function (settingRequestData) {
        var header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        var count = Object.keys(settingRequestData).length;
        console.log(count);
        //header['Content-Length'] = count.toString();
        header['UserAuth'] = (settingRequestData.imei + settingRequestData.sessionID);
        var headers = new http_1.Headers(header);
        console.log("headers", headers, header, settingRequestData);
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this.settingApi, settingRequestData, options)
            .map(function (res) { return res.json(); });
    };
    return SettingService;
}());
SettingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SettingService);
exports.SettingService = SettingService;
//return this.http.get(this.heroesUrl, headerObj)
/*
get(url) {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this.http.get(url, {
    headers: headers
  });
}

post(url, data) {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this.http.post(url, data, {
    headers: headers
  });
}*/
//# sourceMappingURL=setting.service.js.map