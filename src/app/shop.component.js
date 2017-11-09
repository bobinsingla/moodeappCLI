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
var router_1 = require("@angular/router");
var shop_service_1 = require("./shop.service");
var ShopComponent = (function () {
    function ShopComponent(shopService, router) {
        this.shopService = shopService;
        this.router = router;
        this.shopContentArray = [];
        this.shopResponseData = [];
        this.pageId = 1;
        this.categoryId = "1";
        this.categoryArray = [];
        this.subCategoryArray = [];
        this.subCategoryDetailArray = [];
    }
    ShopComponent.prototype.ngOnInit = function () {
        this.getShopData(this.pageId, this.categoryId);
        this.getShopCategory();
    };
    ShopComponent.prototype.onWindowScroll = function () {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
            if (this.shopContentArray != null && this.shopContentArray[this.shopContentArray.length - 1] != null) {
                this.pageId++;
                this.getShopData(this.pageId, this.categoryId);
            }
        }
    };
    ShopComponent.prototype.getShopData = function (id, categoryId) {
        var _this = this;
        var requestShopData = {
            "brandList": [""],
            "careerName": "web",
            "categoryIDsList": ["1"],
            "deviceName": "browser",
            "imei": "1071216312982030",
            "pageID": 1,
            "platform": "browser",
            "price": {
                "highPrice": 50000,
                "lowPrice": 0
            },
            "productType": "",
            "sessionID": "xpdJhbCPRrxkpZyY",
            "shortType": "popularity",
            "storeIDsList": ["1"],
            "time": "2017-8-16 13:1:23",
            "timeZone": "Asia/Calcutta",
        };
        if (id) {
            requestShopData["pageID"] = id;
        }
        if (categoryId) {
            requestShopData["categoryIDsList"] = [categoryId];
        }
        var requestShopDataJson = JSON.stringify(requestShopData);
        this.shopService.getData(requestShopDataJson).subscribe(function (shopResponseData) {
            console.log("shopResponseData", shopResponseData);
            _this.shopDataHandler(shopResponseData);
        });
    };
    ShopComponent.prototype.shopDataHandler = function (shopResponseData) {
        var newObj = shopResponseData.getShopProducts;
        for (var i = 0; i < newObj.productList.length; ++i) {
            this.shopContentArray.push(newObj.productList[i]);
        }
    };
    ShopComponent.prototype.getShopCategory = function () {
        var _this = this;
        var shopCategoryRequestData = {
            "careerName": "web",
            "deviceName": "browser",
            "platform": "browser",
            "time": "2017-8-23 18:26:54",
            "timeZone": "Asia/Calcutta",
        };
        this.shopService.getShopCategory(shopCategoryRequestData)
            .subscribe(function (shopCategoryResponse) {
            console.log("shopCategoryResponse", shopCategoryResponse);
            _this.shopCategoryHandler(shopCategoryResponse);
        });
    };
    ShopComponent.prototype.shopCategoryHandler = function (shopCategoryResponse) {
        this.categoryArray = shopCategoryResponse.getShopCategory.shopCategory;
        this.subCategoryArray = shopCategoryResponse.getShopCategory.shopSubCategory;
        this.getSubCategory(this.categoryArray[0]);
    };
    ShopComponent.prototype.getSubCategory = function (category) {
        var subCat = this.subCategoryArray;
        this.subCategoryDetailArray = [];
        console.log("subCat", subCat);
        for (var i = 0; i < this.subCategoryArray.length; i++) {
            if (this.subCategoryArray[i].shopID == category.shopID) {
                this.subCategoryDetailArray.push(subCat[i]);
            }
        }
    };
    ShopComponent.prototype.getShopSubCategory = function (subCategory) {
        var _this = this;
        this.shopContentArray = [];
        this.categoryId = subCategory.subCatId;
        this.getShopData(this.pageId, this.categoryId);
        console.log("sub cat", subCategory);
        if (subCategory.child == false) {
            var shopSubCategoryRequestData = {
                "careerName": "web",
                "deviceName": "browser",
                "imei": "1071216312982030",
                "platform": "browser",
                "sessionID": "FXdhzLWtywPcikST",
                "shopID": "1",
                "subCatId": "1",
                "time": "2017-8-25 17:16:57",
                "timeZone": "Asia/Calcutta",
            };
            shopSubCategoryRequestData["subCatId"] = subCategory.subCatId;
            shopSubCategoryRequestData["shopID"] = subCategory.shopID;
            this.shopService.getShopSubCategory(shopSubCategoryRequestData)
                .subscribe(function (shopSubCategoryResponse) {
                console.log("shopSubCategoryResponse", shopSubCategoryResponse);
                _this.shopSubCategoryResponseHandler(shopSubCategoryResponse);
            });
        }
    };
    ShopComponent.prototype.shopSubCategoryResponseHandler = function (shopSubCategoryResponse) {
        this.subCategoryDetailArray = [];
        var subCat = shopSubCategoryResponse.getShopSubCategory.shopSubCategory;
        for (var i = 0; i < subCat.length; i++) {
            this.subCategoryDetailArray.push(subCat[i]);
        }
    };
    ShopComponent.prototype.getDataByCategory = function (category) {
        console.log("getDataByCategory", category);
        this.pageId = 1;
        if (category.shopID == 1) {
            this.categoryId = "1";
        }
        else {
            this.categoryId = "55";
        }
        this.shopContentArray = [];
        this.subCategoryDetailArray = [];
        this.getSubCategory(category);
        this.getShopData(this.pageId, this.categoryId);
    };
    ShopComponent.prototype.getBackgroundCss = function (category) {
    };
    ShopComponent.prototype.getShopImageUrl = function (shopContent) {
        var shopImage = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + shopContent.album[0];
        return shopImage;
    };
    ShopComponent.prototype.productMRP = function (shopContent) {
        var mrp = false;
        if (shopContent.mrp != null && shopContent.mrp != 0) {
            mrp = true;
        }
        return mrp;
    };
    ShopComponent.prototype.productSellingPrice = function (shopContent) {
        var sellingPrice = false;
        if (shopContent.sellingPrice != null && shopContent.sellingPrice != 0) {
            sellingPrice = true;
        }
        return sellingPrice;
    };
    ShopComponent.prototype.getBackgroundImage = function () {
        var imageUrl;
        return imageUrl = "resources/icons/marketplace.png";
    };
    ShopComponent.prototype.getSubCategoryImage = function (subCategory) {
        var subCategoryImage = subCategory.imageName;
        subCategoryImage = subCategoryImage.replace("size", "100");
        return subCategoryImage;
    };
    ShopComponent.prototype.goToProductDetail = function (shopContent) {
        this.router.navigate(['/shop', shopContent.productKey]);
    };
    return ShopComponent;
}());
__decorate([
    core_1.HostListener("window:scroll", []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopComponent.prototype, "onWindowScroll", null);
ShopComponent = __decorate([
    core_1.Component({
        selector: 'my-shop',
        templateUrl: 'app/shop.component.html',
        styleUrls: ['app/shop.component.css'],
        providers: [shop_service_1.ShopService]
    }),
    __metadata("design:paramtypes", [shop_service_1.ShopService,
        router_1.Router])
], ShopComponent);
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map