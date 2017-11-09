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
 * Created by bobin on 17/10/17.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shop_product_detail_service_1 = require("./shop-product-detail.service");
var ShopProductDetailComponent = (function () {
    function ShopProductDetailComponent(route, shopProductDetailService) {
        this.route = route;
        this.shopProductDetailService = shopProductDetailService;
        this.objectKeys = Object.keys;
    }
    ShopProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.productkey = params['id'];
        });
        if (this.productkey) {
            this.getPostDetailData(this.productkey);
        }
    };
    ShopProductDetailComponent.prototype.getPostDetailData = function (productkey) {
        var _this = this;
        var productDetailRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "time": "2017-7-12 13:55:53",
            "timeZone": "Asia/Calcutta"
        };
        productDetailRequestData["productKey"] = productkey;
        this.shopProductDetailService.getShopProductDetailData(productDetailRequestData)
            .subscribe(function (productDetailResponseData) {
            console.log(productDetailResponseData);
            _this.shopProductDetailDataHandler(productDetailResponseData);
        });
    };
    ShopProductDetailComponent.prototype.shopProductDetailDataHandler = function (productDetailResponseData) {
        this.productDetailResponseData = productDetailResponseData.getProductDetail.product;
    };
    ShopProductDetailComponent.prototype.getCoverImageUrl = function () {
        var url = this.productDetailResponseData.productMedia[0].url;
        url = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + url;
        return url;
    };
    return ShopProductDetailComponent;
}());
ShopProductDetailComponent = __decorate([
    core_1.Component({
        selector: 'shop-product',
        templateUrl: 'app/shop-product-detail.component.html',
        providers: [shop_product_detail_service_1.ShopProductDetailService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        shop_product_detail_service_1.ShopProductDetailService])
], ShopProductDetailComponent);
exports.ShopProductDetailComponent = ShopProductDetailComponent;
//# sourceMappingURL=shop-product-detail.component.js.map