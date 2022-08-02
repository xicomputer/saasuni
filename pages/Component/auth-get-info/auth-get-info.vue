<template>
    <view>
        <!-- 头像、昵称授权 -->
        <view v-if="showInfoMask" @tap="getUserInfo" class="auto-get-user-info-btn"></view>

        <!-- 绑定手机号 -->
        <button v-if="showPhoneMask" class="get-phone-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap.stop.prevent="getPhoneNumber"></button>
    </view>
</template>

<script>
let app = getApp();
export default {
    data() {
        return {
            showInfoMask: false,
            showPhoneMask: false,
            info: {}
        };
    },
    beforeMount() {
        this.userLogin();
    },
    /**
     * 组件的属性列表
     */
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {
        userLogin() {
            app.globalData
                .userLogin(true)
                .then((res) => {
                    setTimeout(() => {
                        this.storeUserInfo();
                        app.globalData.globalEvent.$emit('loginComplete');
                    }, 300);
                })
                .catch((err) => {
                    app.globalData.globalEvent.$emit('loginReject');
                });
        },

        storeUserInfo() {
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var result = res.data;
                    this.codeInfo = result;

                    if (result.statusCode == 200 && result.data.code == 200) {
                        var data = result.data.data;

                        if (!data.headimgurl || !data.nickname) {
                            this.setData({
                                showInfoMask: true
                            });
                        }

                        if (!data.phoneNumber) {
                            this.setData({
                                showPhoneMask: true
                            });
                        }
                    }
                },
                fail: (err) => {
                    this.setData({
                        showPhoneMask: true,
                        showInfoMask: true
                    });
                }
            });
        },

        getUserInfo() {
            if (this.emitAuto) {
                return;
            }

            this.emitAuto = true;
            setTimeout(() => {
                this.emitAuto = null;
            }, 1000);
            uni.getUserProfile({
                desc: '头像昵称信息展示',
                success: (res) => {
                    this.saveInfo(res);
                }
            });
        },

        saveInfo(data) {
            let appid = uni.getStorageSync('appid');
            var openid = uni.getStorageSync('thirdWxOpenId');
            app.globalData
                .sjrequest('/thirdWxLogin/auth', {
                    appid,
                    openid,
                    encryptedData: data.encryptedData,
                    iv: data.iv
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        var data = res.data.data;
                        var info = {
                            avatarUrl: data.headimgurl,
                            nickName: data.nickname
                        };
                        this.setData({
                            showInfoMask: false
                        });
                        uni.setStorage({
                            key: 'wx_userinfo_key',
                            data: {
                                userInfo: info
                            }
                        });
                        var codeInfo = this.codeInfo;

                        if (codeInfo && codeInfo.data && codeInfo.data.data) {
                            var resData = codeInfo.data.data;
                            resData.headimgurl = data.headimgurl;
                            resData.nickname = data.nickname;
                            uni.setStorage({
                                key: 'zl_userInfo',
                                data: resData
                            });
                        }
                    }
                });
        },

        getPhoneNumber(e) {
            var detail = e.detail;
            var codeInfo = this.codeInfo;
            var appId = '';
            var openId = '';
            if (codeInfo && codeInfo.data && codeInfo.data.data) {
                var setInfo = codeInfo.data.data.setInfo || {};
                appId = setInfo.appId;
                openId = setInfo.openId;
            }

            if (detail.iv) {
                var { iv, encryptedData } = detail;
                app.globalData
                    .sjrequest('/thirdWxLogin/deciphering', {
                        appid: appId,
                        openid: openId,
                        iv,
                        encryptedData
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            var phone = res.data.data.phoneNumber;
                            this.setData({
                                showPhoneMask: false
                            });

                            if (codeInfo && codeInfo.data && codeInfo.data.data) {
                                var resData = codeInfo.data.data;
                                resData.phoneNumber = phone;
                                uni.setStorage({
                                    key: 'zl_userInfo',
                                    data: codeInfo
                                });
                            }
                        }
                    });
            }
        }
    }
};
</script>
<style>
.auto-get-user-info-btn {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 500;
    top: 0;
    left: 0;
}

/* 绑定手机号按钮 */
.get-phone-btn {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 0;
}
.get-phone-btn:after {
    border: 0;
}
</style>
