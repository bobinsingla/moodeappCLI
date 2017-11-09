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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
var ShopService = (function () {
    function ShopService(http) {
        this.http = http;
        this.shopUrl = "https://moodeapp.in/app/getShopProducts";
        this.shopCategoryApi = "https://moodeapp.in/app/getShopCategory";
        this.shopSubCategoryApi = "https://moodeapp.in/app/getShopSubCategory";
    }
    ShopService.prototype.getData = function (requestShopDataJson) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this.shopUrl, requestShopDataJson, options)
            .map(function (res) { return res.json(); });
    };
    ShopService.prototype.getShopCategory = function (shopCategoryRequestData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this.shopCategoryApi, shopCategoryRequestData, options)
            .map(function (res) { return res.json(); });
    };
    ShopService.prototype.getShopSubCategory = function (shopSubCategoryRequestData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this.shopSubCategoryApi, shopSubCategoryRequestData, options)
            .map(function (res) { return res.json(); });
    };
    return ShopService;
}());
ShopService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map