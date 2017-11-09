"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var angular2_masonry_1 = require("angular2-masonry");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login.component");
var header_component_1 = require("./header.component");
var mood_bar_component_1 = require("./mood-bar.component");
var home_post_component_1 = require("./home-post.component");
var shop_component_1 = require("./shop.component");
var world_component_1 = require("./world.component");
var world_detail_component_1 = require("./world-detail.component");
var post_detail_component_1 = require("./post-detail.component");
var user_profile_component_1 = require("./user-profile.component");
var shop_product_detail_component_1 = require("./shop-product-detail.component");
var setting_component_1 = require("./setting.component");
var login_service_1 = require("./login.service");
var shared_service_1 = require("./shared.service");
var common_shared_service_1 = require("./common-shared.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            angular2_masonry_1.MasonryModule,
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    component: home_post_component_1.HomePostComponent
                },
                {
                    path: 'story/:id',
                    component: post_detail_component_1.PostDetailComponent
                },
            ]),
            router_1.RouterModule.forChild([
                {
                    path: 'shop',
                    component: shop_component_1.ShopComponent
                },
                {
                    path: 'shop/:id',
                    component: shop_product_detail_component_1.ShopProductDetailComponent
                },
                {
                    path: 'world',
                    component: world_component_1.WorldComponent
                },
                {
                    path: 'world/:id',
                    component: world_detail_component_1.WorldDetailComponent
                },
                {
                    path: 'userprofile/:id',
                    component: user_profile_component_1.UserProfileComponent
                },
                {
                    path: 'setting',
                    component: setting_component_1.SettingComponent
                },
                {
                    path: ':id',
                    component: home_post_component_1.HomePostComponent
                },
                {
                    path: ':id/:id2',
                    component: home_post_component_1.HomePostComponent
                },
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            header_component_1.HeaderComponent,
            mood_bar_component_1.MoodBarComponent,
            home_post_component_1.HomePostComponent,
            post_detail_component_1.PostDetailComponent,
            shop_component_1.ShopComponent,
            world_component_1.WorldComponent,
            world_detail_component_1.WorldDetailComponent,
            shop_product_detail_component_1.ShopProductDetailComponent,
            user_profile_component_1.UserProfileComponent,
            setting_component_1.SettingComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [login_service_1.LoginService, shared_service_1.SharedService, common_shared_service_1.CommonSharedService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map