<template>
    <view class="application">
        <!-- <video class="application_video"src="https://xssj.letterbook.cn/applet/videos/cooperation.mp4" controls="controls" poster="https://xssj.letterbook.cn/applet/images/video-img.png"></video> -->
        <view class="application_image">
            <block v-for="(item, index) in 7" :key="index">
                <image :src="'https://xssj.letterbook.cn/applet/images/features' + (index + 1) + '.png'"></image>
            </block>
        </view>
        <view @tap="toRegister" class="register">
            <view class="register_box">
                <view class="register_text">我已付费</view>
                <view class="register_text">点击去填写注册资料</view>
            </view>
        </view>
        <view class="application_class">
            <view class="application_class_head">
                <view>
                    <view class="application_class_title">请选择您入驻平台的分类</view>
                    <view class="application_class_desc">支持线上快递物流、预订自取消费、同城配送订单类型</view>
                </view>
                <view class="application_class_icon" @tap="isShowAllClass" v-if="classList.length > 10">
                    <view style="margin-right: 10rpx">{{ isShowClassText }}</view>
                    <view :class="isShowClassText == '展开' ? 'downTriangle' : 'upTriangle'"></view>
                </view>
            </view>
            <view class="application_class_content" :style="isShowClassText == '展开' ? 'overflow-y: hidden;height: 180rpx;' : ''">
                <view
                    :class="
                        classIndex == index
                            ? 'application_class_content_item application_class_content_item_isSctive'
                            : 'application_class_content_item application_class_content_item_noActive'
                    "
                    @tap="getClassIndex"
                    :data-index="index"
                    v-for="(item, index) in classList"
                    :key="item.businessName"
                >
                    {{ item.businessName }}
                </view>
            </view>
        </view>
        <view class="application_btn">
            <image src="https://xssj.letterbook.cn/applet/images/bigBtn.png"></image>
            <button v-if="isAuthorization == 1" @tap="toLogin"></button>
            <button v-if="isAuthorization == 2" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
            <button v-if="isAuthorization == 3" @tap="payment"></button>
            <view v-if="!isClickBtn"></view>
        </view>
        <view class="application_doc">
            <icon type="success" size="26rpx" :color="isAgree ? '#EC1919' : '#999'" @tap="checkIsAgree"></icon>
            <span @tap.native="checkIsAgree">我已阅读并同意</span>
            <navigator style="color: #ec1919" url="/pages/BusinessSettlement/BusinessSettlement">《信书商家升级入驻服务协议》</navigator>
        </view>
        <view class="application_contactus" @tap="contactUS" data-text="0731-85235016">
            <image src="https://xssj.letterbook.cn/applet/images/dianhua.png"></image>
            <span class="application_contactus_tel">联系方式：0731-85235016</span>
        </view>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// pages/BusinessApplication/BusinessApplication.js
const time = require('../../utils/util');

const app = getApp();
export default {
    components: {
        // vanPopup
    },
    data() {
        return {
            inviteCode: '',
            //邀请码
            initiator: '',
            //发起人
            isAuthorization: 1,
            startTime: '',
            //进入时间
            endTime: '',
            //离开时间
            classList: [],
            isShowClassText: '展开',
            classIndex: -1,
            phoneNumber: '',
            isAgree: true,
            isClickBtn: true
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.scene) {
            const scene = decodeURIComponent(options.scene);
            this.getCodeParams(scene);
        }

        this.getClass(); //获得平台分类
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    // 已授权
                    that.setData({
                        isAuthorization: 2
                    });
                } else {
                    // 没有授权
                    that.setData({
                        isAuthorization: 1
                    });
                }
            }
        });
        this.setData({
            startTime: time.formatNowDate(new Date())
        });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            endTime: time.formatNowDate(new Date())
        });
        const res = uni.getStorageSync('res');
        const nickName = res.data.data.nickName;
        const avatarUrl = res.data.data.avatarUrl;
        let data = {
            initiator: this.initiator,
            //发起人
            startTime: this.startTime,
            //开始时间
            endTime: this.endTime,
            //结束时间
            nickName: nickName,
            //昵称
            headImgUrl: avatarUrl //头像
        };
        app.globalData.shrequest('/merchant/registerAnalysis', data);
    },
    // 分享
    onShareAppMessage() {},
    methods: {
        //是否从小程序码进来
        getCodeParams(id) {
            let that = this;
            let inviteCode;
            let initiator;
            app.globalData
                .sjrequest('/marchant/queryIdentifica', {
                    id: id
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        try {
                            inviteCode = JSON.parse(res.data.data.scene).inviteCode;
                            initiator = JSON.parse(res.data.data.scene).initiator;
                        } catch {
                            inviteCode = '';
                            initiator = '';
                        }

                        that.setData({
                            inviteCode: inviteCode,
                            initiator: initiator
                        });
                    }
                });
        },

        // 获得平台分类
        getClass() {
            app.globalData
                .shrequest('/merchant/queryMarchantLittleTypeList', {
                    parentId: 1
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.setData({
                            classList: res.data.data
                        });
                    }
                });
        },

        // 平台分类是否全部显示
        isShowAllClass() {
            this.setData({
                isShowClassText: this.isShowClassText == '展开' ? '收起' : '展开'
            });
        },

        // 获得选中分类下标
        getClassIndex(e) {
            const { index } = e.currentTarget.dataset;
            this.setData({
                classIndex: index
            });
        },

        // 去登录
        toLogin() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        },

        //获得微信手机号
        getPhoneNumber(e) {
            this.setData({
                isClickBtn: false
            });

            let _this = this;

            if (e.detail.errMsg == 'getPhoneNumber:ok') {
                let appid = uni.getStorageSync('appid');
                let openid = uni.getStorageSync('openId1');
                let token = uni.getStorageSync('token');
                let sessionkey = uni.getStorageSync('sessionkey');
                uni.request({
                    url: 'https://xssj.letterbook.cn/xssj-third/thirdWxLogin/deciphering',
                    method: 'post',
                    data: {
                        openid: openid,
                        iv: e.detail.iv,
                        encryptedData: e.detail.encryptedData,
                        appid: appid
                    },
                    header: {
                        token: token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        _this.setData({
                            phoneNumber: res.data.data.phoneNumber,
                            isAuthorization: 3
                        });

                        uni.showToast({
                            title: '绑定成功',
                            icon: 'none'
                        });
                    },
                    fail: function () {
                        uni.showToast({
                            title: '获取失败',
                            icon: 'none'
                        });
                    },
                    complete: function () {
                        _this.setData({
                            isClickBtn: true
                        });
                    }
                });
            } else {
                this.setData({
                    isClickBtn: true
                });
                uni.showModal({
                    title: '提示',
                    content: '需同意授权才可使用此功能'
                });
            }
        },

        // 协议同意状态
        checkIsAgree() {
            this.setData({
                isAgree: !this.isAgree
            });
        },

        // 验证
        verify() {
            if (!this.isAgree) {
                uni.showToast({
                    title: '请先阅读服务协议！',
                    icon: 'none'
                });
                return false;
            }

            if (this.classIndex == -1) {
                uni.showToast({
                    title: '请选择平台分类！',
                    icon: 'none'
                });
                return false;
            }

            return true;
        },

        // 支付
        payment() {
            const _this = this;

            if (this.verify()) {
                _this.setData({
                    isClickBtn: false
                });

                let uniqueId = uni.getStorageSync('uniqueId');
                let token = uni.getStorageSync('token');
                let openId = uni.getStorageSync('openId_1');
                uni.request({
                    //接口，
                    url: 'https://xssj.letterbook.cn/xssj-third/order/paymentMarchant',
                    header: {
                        token: token,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        uniqueId: uniqueId,
                        openid: openId,
                        orderWay: 3,
                        phoneNumber: this.phoneNumber,
                        industry: this.classList[this.classIndex].marchantTypeId,
                        inviteCode: this.inviteCode
                    },
                    method: 'POST',
                    success: function (res) {
                        if (res.data.code == 325) {
                            uni.showToast({
                                title: '您还没有绑定手机号',
                                icon: 'none'
                            });
                        } else {
                            uni.requestPayment({
                                appId: res.data.data.appId,
                                nonceStr: res.data.data.nonceStr,
                                // 支付签名随机串，不长于 32 位
                                package: res.data.data.package,
                                // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: res.data.data.signType,
                                // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                timeStamp: res.data.data.timeStamp,
                                // 支付签名时间戳，
                                paySign: res.data.data.paySign,
                                // 支付签名
                                success: function () {
                                    uni.showModal({
                                        content: '注册码已下发到您的手机',
                                        confirmText: '我知道了',
                                        showCancel: false
                                    });
                                },
                                fail: function () {
                                    uni.showToast({
                                        title: '支付失败',
                                        icon: 'none'
                                    });
                                },
                                complete: function () {
                                    _this.setData({
                                        isClickBtn: true
                                    });
                                }
                            });
                        }
                    }
                });
            }
        },

        // 联系我们
        contactUS(e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function () {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'none'
                    });
                }
            });
        },

        // 去填写注册资料
        toRegister() {
            uni.navigateTo({
                url: '../kefu/kefu'
            });
        }
    }
};
</script>
<style>
.application {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 66rpx;
}

.application_video {
    width: 100%;
    vertical-align: bottom;
}

.application_image image {
    width: 100%;
    height: 1000rpx;
    vertical-align: bottom;
}

.application_image image:nth-child(7) {
    width: 100%;
    height: 869rpx;
    vertical-align: bottom;
}

/* 注册 */
.register {
    margin: 0 auto 160rpx;
    padding: 6rpx;
    width: 405rpx;
    height: 129rpx;
    background: #f8e8c0;
    background-color: rgba(248, 232, 192, 0.6);
    border-radius: 20rpx;
    box-sizing: border-box;
}
.register_box {
    width: 100%;
    height: 100%;
    border: 2rpx dashed #e9bf78;
    border-radius: 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.register_text {
    font-size: 30rpx;
    font-weight: 500;
    color: #2c1300;
}
/* 按钮 */
.application_btn {
    width: 100%;
    text-align: center;
    position: relative;
}

.application_btn image {
    text-align: center;
    width: 100%;
    height: 150rpx;
    position: relative;
}

.application_btn button {
    height: 92rpx;
    border-radius: 50rpx;
    position: absolute;
    top: 24rpx;
    left: 34rpx;
    right: 34rpx;
    opacity: 0.1;
}

.application_btn view {
    height: 92rpx;
    border-radius: 50rpx;
    position: absolute;
    top: 24rpx;
    left: 34rpx;
    right: 34rpx;
    background-color: rgba(0, 0, 0, 0.2);
}

/* 文档 */
.application_doc {
    font-size: 12px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
}

.application_doc image {
    width: 24rpx;
    height: 24rpx;
}

.application_doc span {
    color: #666;
    margin-left: 12rpx;
}

/* 联系我们 */
.application_contactus {
    width: 60%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40rpx;
}

.application_contactus image {
    width: 30rpx;
    height: 30rpx;
}

.application_contactus_tel {
    margin-left: 20rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

/* 平台分类 */
.application_class {
    padding: 0 30rpx;
}

.application_class_head {
    display: flex;
    justify-content: space-between;
}

.application_class_title {
    font-size: 30rpx;
    color: #222222;
}

.application_class_desc {
    font-size: 20rpx;
    color: #ff0000;
    margin-top: 10rpx;
}

.application_class_icon {
    font-size: 24rpx;
    color: #e9354d;
    display: flex;
    align-items: center;
}

.upTriangle {
    width: 0;
    height: 0;
    border-right: 12rpx solid transparent;
    border-left: 12rpx solid transparent;
    border-bottom: 14rpx solid red;
}

.downTriangle {
    width: 0;
    height: 0;
    border-right: 12rpx solid transparent;
    border-left: 12rpx solid transparent;
    border-top: 14rpx solid red;
}

.application_class_content {
    display: flex;
    flex-wrap: wrap;
}

.application_class_content_item {
    white-space: nowrap;
    font-size: 25rpx;
    font-weight: 400;
    line-height: 34rpx;
    padding: 15rpx 30rpx;
    margin: 20rpx 20rpx 0 0;
    box-sizing: border-box;
}

.application_class_content_item_noActive {
    background: #f8f8fb;
    border: 2rpx solid #e2e2e2;
    color: #999999;
}

.application_class_content_item_isSctive {
    background: #dab47e;
    border: 2rpx solid #dab47e;
    color: #ffffff;
}
</style>
