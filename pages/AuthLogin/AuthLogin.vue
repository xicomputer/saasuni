<template>
    <view class="butt">
        <!-- <image src="https://xssj.letterbook.cn/applet/images/auth_bg_img.png" class="auth-bg-img">
			<text class="auth-bg-text">欢迎登录信书</text>
			<image class="auth-user-img" src="{{userInfo.headImgUrl?userInfo.headImgUrl:'https://xssj.letterbook.cn/applet/images/xs_auth_logo.png'}}"></image>
		</image> -->

        <view>
            <image src="/static/pages/img/logo2.png" class="auth-bg-img"></image>
        </view>

        <!-- <view class="auth-explain-box">
			<image src="/pages/img/index/auth_true_icon.png" style="width:36rpx;height:36rpx;margin-right:8rpx"></image>
			需要登录以使用程序</view> -->
        <!-- <button class="wx-bind-btn" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">微信用户一键登录</button> -->
        <button class="wx-bind-btn" @tap="bindGetUserInfo">微信用户一键登录</button>
        <view @tap="cancel" class="wx-bind-btn" style="background: #e4e4e4">取消登录</view>
        <view class="auth-bottom">
            <image src="/static/pages/img/index/auth_bottom_icon.png" style="width: 24rpx; height: 40rpx; margin-right: 4rpx"></image>
            信书平台
        </view>
    </view>
</template>

<script>
// pages/AuthLogin/AuthLogin.js
const app = getApp();
export default {
    data() {
        return {
            userInfo: {},
            isAuthorization: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        /**
         * 生命周期函数--监听页面加载
         */
        onLoadClone3389: function (options) {
            let user = uni.getStorageSync('zl_userInfo');

            if (user) {
                this.setData({
                    userInfo: user
                });
            }

            this.loginWxCode();
        },

        cancel() {
            var pages = getCurrentPages();
            var beforePage = pages[pages.length - 2];
            uni.navigateBack({
                delta: 0,
                success: function () {
                    beforePage.onLoad(app.globalData.options);
                }
            });
        },

        //授权
        bindGetUserInfo(res) {
            uni.getUserProfile({
                lang: 'zh_CN',
                desc: '获取用户信息',
                complete: (res) => {
                    console.log('授权信息=====：', res);

                    if (res.encryptedData) {
                        this.setData({
                            isAuthorization: false
                        });
                        uni.setStorageSync('wx_userinfo_key', res); //同意授权

                        this.login();
                    } else {
                        //拒绝授权
                        setTimeout(() => {
                            uni.showToast({
                                title: '授权未成功',
                                icon: 'none'
                            });
                        }, 1000);
                        this.cancel();
                    }
                }
            });
        },

        loginWxCode() {
            uni.login({
                success: function (res) {
                    const accountInfo = uni.getAccountInfoSync();
                    var appid = accountInfo.miniProgram.appId;

                    if (res.code) {
                        var code = res.code;
                        let data = {
                            appid,
                            code
                        };
                        app.globalData.sjrequest('/thirdWxLogin/code', data).then((res) => {
                            uni.setNavigationBarTitle({
                                title: res.data.data.appName ? res.data.data.appName : ''
                            });
                            console.info(res);
                            uni.setStorage({
                                data: res.data.data.merchantId,
                                key: 'merchantId'
                            });
                            uni.setStorage({
                                data: res.data.data.openId,
                                key: 'thirdWxOpenId'
                            });
                            uni.setStorage({
                                key: 'openId1',
                                data: res.data.data.openId
                            });
                            uni.setStorage({
                                data: res.data.data.openId,
                                key: 'openId_1'
                            });
                            uni.setStorage({
                                data: res.data.data.sessionKey,
                                key: 'sessionkey'
                            });
                            uni.setStorage({
                                data: appid,
                                key: 'appid'
                            });
                        });
                    }
                }
            });
        },

        //登录
        login() {
            var that = this;
            var userInfo = uni.getStorageSync('wx_userinfo_key');
            var encryptedData = userInfo.encryptedData;
            var iv = userInfo.iv;
            var openid = uni.getStorageSync('thirdWxOpenId');
            var appid = uni.getStorageSync('appid');
            let data = {
                appid,
                openid,
                encryptedData,
                iv
            };
            uni.showLoading({
                title: '加载中'
            });
            app.globalData.sjrequest('/thirdWxLogin/auth', data).then((res) => {
                uni.hideLoading();
                uni.setStorage({
                    key: 'res',
                    data: res
                });
                uni.setStorage({
                    key: 'zl_userInfo',
                    data: res
                });
                uni.setStorage({
                    key: 'zl_jwt',
                    data: res.data.data.jwt
                });
                uni.setStorage({
                    key: 'token',
                    data: res.data.data.token
                });
                let data = {
                    openId: res.data.data.unionid,
                    nickname: res.data.data.nickName,
                    headimgurl: res.data.data.avatarUrl,
                    openId2: res.data.data.openid
                }; // if (res.data.code == 200) {
                //   app.sjrequest('/userRegister/weChatLogin',data).then(res=>{
                //     const result = res.data.data
                //     const params = {
                //       userId: result.userId,
                //       headImgUrl: result.headimgurl,
                //       nickName: result.nickname
                //     }
                //     that.cancel()
                //   })
                //   var encryptInfo = res.data.data;
                //   wx.setStorage({key: 'uniqueId',data: encryptInfo.unionId})
                // }

                that.cancel();
            });
        }
    }
};
</script>
<style>
.butt {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    background: #fff;
}
.auth-bg-img {
    position: relative;
    width: 400rpx;
    height: 200rpx;
    margin: 200rpx;
}
.auth-bg-text {
    position: absolute;
    bottom: 200rpx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 56rpx;
    color: #ffffff;
}
.auth-user-img {
    width: 160rpx;
    height: 160rpx;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    bottom: 26rpx;
    left: 50%;
    transform: translateX(-50%);
}
.auth-explain-box {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #999999;
    margin-top: 50rpx; /*284rpx;*/
}
.wx-bind-btn {
    width: 582rpx;
    height: 88rpx;
    background: #fe4f4f;
    border-radius: 44rpx;
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40rpx auto;
}
.auth-bottom {
    width: 100%;
    position: absolute;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
