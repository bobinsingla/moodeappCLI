"use strict";
var Login = (function () {
    function Login() {
        this.firstName = "name";
    }
    Login.prototype.loginData = function (socialSignUpResponseData) {
        this.firstName = socialSignUpResponseData.firstName;
        this.gender = socialSignUpResponseData.Datagender;
        this.lastName = socialSignUpResponseData.lastName;
        this.myPicture = socialSignUpResponseData.myPicture;
        this.preferenceSet = socialSignUpResponseData.preferenceSet;
        this.referralCode = socialSignUpResponseData.referralCode;
        this.sessionID = socialSignUpResponseData.sessionID;
        this.status = socialSignUpResponseData.status;
        this.tags = socialSignUpResponseData.tags;
        this.userBook = socialSignUpResponseData.userBook;
        this.userHandler = socialSignUpResponseData.userHandler;
        this.userName = socialSignUpResponseData.userName;
        this.userProfileKey = socialSignUpResponseData.userProfileKey;
        this.userUniqueId = socialSignUpResponseData.userUniqueId;
        this.videoID = socialSignUpResponseData.videoID;
        this.videoPlay = socialSignUpResponseData.videoPlay;
    };
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map