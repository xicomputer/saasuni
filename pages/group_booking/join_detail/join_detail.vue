<template>
    <view>
        <view>
            <view class="me-fx-col me-fx-c top-address">
                <view class="me-fx-row me-fx-sb-c address-empty-box" v-if="!userShipping.id" @tap="jumpAddressList">
                    <text class="sel-address-msg">请选择收货地址</text>
                    <image src="/static/pages/group_booking/imgs/right-jiantou.png" class="right-jantou-img"></image>
                </view>
                <view class="me-fx-row me-fx-sb-c" v-else @tap="jumpAddressList">
                    <image src="/static/pages/group_booking/imgs/location-icon.png" class="location-img"></image>
                    <view class="me-fx-1 center-content">
                        <view>
                            <text class="user-name">{{ userShipping.contacts }}</text>
                            <text class="user-phone">{{ userShipping.contactWay }}</text>
                        </view>
                        <view class="address-text">{{ userShipping.fullAddress }}</view>
                    </view>
                    <image src="/static/pages/group_booking/imgs/pen-icon.png" class="pen-icon"></image>
                </view>
            </view>

            <view class="section-content">
                <view class="me-fx-row goods-info">
                    <image :src="activityInfo.bannerImgUrls[0]" class="goods-img"></image>
                    <view class="me-fx-col me-fx-sb me-fx-1">
                        <view class="me-full-text me-full-line2 goods-name">{{ activityInfo.commodityName }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <view>
                                <text class="now-price">¥{{ skuInfo.livePrice }}</text>
                                <text class="old-price">¥{{ skuInfo.price }}</text>
                            </view>
                            <!-- <text class='people-num'>{{goodsInfo.activityJoinNumberTotal}}人已参与</text> -->
                        </view>
                    </view>
                </view>

                <view class="me-fx-col me-fx-c-c join-info">
                    <view class="me-fx-row me-fx-sb-c">
                        <image src="/static/pages/group_booking/imgs/shizhong-icon.png" class="icon-img"></image>
                        <view class="title-msg">等待成团，仅剩{{ groupInfo.groupOfNumber - groupInfo.groupJoinNumber }}个名额</view>
                    </view>
                    <view class="me-fx-row me-fx-start-c user-list">
                        <view class="avatar-item" v-for="(item, index) in groupInfo.groupJoinUserHeads" :key="index">
                            <image :src="item" class="user-avatar"></image>

                            <text class="initiator-user-label" v-if="index == 0">团长</text>
                        </view>
                        <image
                            src="/static/pages/group_booking/imgs/empty-avatar.png"
                            class="empty-avatar-img"
                            v-for="(item, ti) in groupInfo.groupOfNumber - groupInfo.groupJoinNumber"
                            :key="item.ti"
                        ></image>
                    </view>
                    <van-count-down :time="groupInfo.diffTimes" :use-slot="true" :auto-start="true" @finish="finishFun" @change="changeFun">
                        <view class="me-fx-row me-fx-c-c down-count-box">
                            距结束:
                            <block v-if="groupInfo.downTimeObj.days !== '00'">
                                <text class="down-num">{{ groupInfo.downTimeObj.days }}</text>
                                天
                            </block>
                            <text class="down-num">{{ groupInfo.downTimeObj.hours }}</text>
                            时
                            <text class="down-num">{{ groupInfo.downTimeObj.minutes }}</text>
                            分
                            <text class="down-num">{{ groupInfo.downTimeObj.seconds }}</text>
                            秒
                        </view>
                    </van-count-down>
                    <button class="immediately-join-btn" @tap="settlement">立即参团</button>
                    <!-- <view class='prompt-msg'>每人限购1件，您已购买1件，无法再次参团</view> -->
                </view>
                <view class="groupbox" @tap="jumpStrategy">
                    <image src="/static/pages/group_booking/imgs/groupbox.png" class="icon"></image>
                    <text>点击查看拼团攻略</text>
                    <image src="/static/pages/group_booking/imgs/groupbox.png" class="icon"></image>
                </view>
            </view>
        </view>

        <!-- 授权组件 -->
        <auth-get-info></auth-get-info>
    </view>
</template>

<script>
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/group_booking/join_detail/join_detail.js
let app = getApp();
export default {
    components: {
        authGetInfo,
        // vanCountDown
    },
    data() {
        return {
            loginInfo: {},
            //登录时返回的信息
            shareUserId: '',
            activityId: '',
            downTimes: '',
            downTimeObj: {},
            activityInfo: {
                bannerImgUrls: '',
                commodityName: ''
            },
            groupInfo: {
                groupOfNumber: 0,
                groupJoinNumber: 0,
                groupJoinUserHeads: [],
                diffTimes: '',

                downTimeObj: {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: ''
                }
            },
            skuInfo: {
                livePrice: '',
                price: ''
            },
            userShipping: {
                id: '',
                contacts: '',
                contactWay: '',
                fullAddress: ''
            },
            buyCount: 1,
            appId: '',
            goodsSkuId: '',
            shareUrl: '/pages/group_booking/join_detail/join_detail' //分享页面
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var scene = options.scene;
        app.globalData.globalEvent.$on('loginComplete', () => {
            if (scene) {
                //扫码进入
                this.getCodeParams(scene);
            } else {
                this.initData(options);
            }

            this.getMerchantInfo();
        });
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
    onPullDownRefresh: function () {
        this.getDetailInfo();
        this.getMerchantInfo();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var groupInfo = this.groupInfo || {};
        var query = {
            groupInfo
        };
        query = JSON.stringify(query);
        query = encodeURIComponent(query);
        return {
            title: this.loginInfo.nickName + '邀请你参与拼团活动',
            path: this.shareUrl + `&query=${query}`,
            imageUrl: this.activityInfo.bannerImgUrls[0]
        };
    },
    /* 分享朋友圈 */
    onShareTimeline() {
        var groupInfo = this.groupInfo || {};
        var query = {
            groupInfo
        };
        query = JSON.stringify(query);
        query = encodeURIComponent(query);
        var userId = this.loginInfo.userId;
        var activityId = this.activityId;
        return {
            title: this.loginInfo.nickName + '邀请你参与拼团活动',
            imageUrl: this.activityInfo.bannerImgUrls[0],
            query: `query=${query}&activityId=${activityId}&shareUserId=${userId}`
        };
    },
    methods: {
        initData(options) {
            var query = decodeURIComponent(options.query);
            var activityId = options.activityId || '';
            var shareUserId = options.shareUserId;
            query = JSON.parse(query);
            var groupInfo = query.groupInfo || {};
            this.getUserOpenGroup(groupInfo); //获取团信息的最新情况

            this.setData(
                {
                    activityId,
                    shareUserId
                },
                () => {
                    this.getDetailInfo();
                    this.getStoreInfo();
                }
            );
        },

        getCodeParams(id) {
            //扫码进入该页面
            let data = {
                id
            };
            app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var scene = JSON.parse(data.scene);
                    this.initData(scene);
                }
            });
        },

        getStoreInfo() {
            //获取缓存信息
            var activityId = this.activityId;
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data || {};
                    var info = data.data.data || {};
                    var userId = info.userId;
                    var loginInfo = {
                        userId,
                        openId: info.setInfo.openId,
                        appId: info.setInfo.appId,
                        nickName: info.nickname,
                        marchantLogic: info.setInfo.headImage,
                        marchantName: info.setInfo.appName,
                        merchantId: info.setInfo.merchantId,
                        userPhone: info.phoneNumber
                    };
                    var shareUrl = this.shareUrl + '?activityId=' + activityId + '&shareUserId=' + userId;
                    this.codeInfo = data;
                    this.setData({
                        loginInfo,
                        shareUrl
                    });
                }
            });
        },

        jumpStrategy() {
            //跳转攻略
            uni.navigateTo({
                url: '/pages/group_booking/strategy/strategy'
            });
        },

        joinAddress(shipping) {
            //拼接收货地址
            var { provincesName, cityName, areaName, address } = shipping;
            return provincesName + cityName + areaName + address;
        },

        getUserOpenGroup(groupInfo) {
            //查询用户开团
            app.globalData
                .sjrequest1('/activityTTPTBusiness/groupListByActivityId', {
                    activityId: groupInfo.activityId,
                    merchantId: groupInfo.marchantId,
                    status: 1,
                    pageSize: 30,
                    currentPage: 1,
                    userId: groupInfo.userId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        var newGroupInfo = list.find((item) => item.orderNo == groupInfo.orderNo);

                        var endTime = this._parseDate(newGroupInfo.overTime, 'number');

                        var nowTime = new Date().getTime();
                        var diffTime = endTime - nowTime;
                        newGroupInfo.diffTimes = diffTime;
                        this.setData({
                            groupInfo: newGroupInfo
                        });
                    }
                });
        },

        jumpAddressList() {
            //跳转收货地址列表
            app.globalData.store.setState({
                from: 'submitOrder'
            });
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList',
                events: {
                    addressChange: (data) => {
                        var shipping = data.shipping;
                        var fullAddress = this.joinAddress(shipping);
                        shipping.fullAddress = fullAddress;
                        this.setData({
                            userShipping: shipping
                        });
                    }
                }
            });
        },

        finishFun() {
            //倒计时完成
        },

        changeFun(e) {
            //倒计时改变
            var detail = e.detail;
            var groupInfo = this.groupInfo;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            groupInfo.downTimeObj = detail;
            this.setData({
                groupInfo
            });
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getDetailInfo() {
            //获取详情信息
            app.globalData
                .sjrequest1('/activityBusiness/activityDetail', {
                    activityId: this.activityId
                })
                .then((res) => {
                    uni.stopPullDownRefresh();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data;
                        var currentSku = data.activityCommoditySkuList.find((item) => item.isDefault == 1);
                        currentSku || (currentSku = data.activityCommoditySkuList[0]);
                        data.price = currentSku.price;
                        data.lowPrice = currentSku.livePrice;
                        data.soldCount = data.commodityTotalCount - data.residueCommodityTotalCount;
                        var userShipping = data.userShipping || {};
                        var { provincesName, cityName, areaName, address } = userShipping;
                        userShipping.fullAddress = provincesName + cityName + areaName + address;
                        this.setData({
                            skuInfo: currentSku,
                            userShipping,
                            activityInfo: data,
                            goodsSkuId: currentSku.skuId
                        });
                    }
                });
        },

        getMerchantInfo() {
            //获取商家信息
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data || {};

                    if (data.statusCode == 200 && data.data.code == 200) {
                        var info = data.data.data || {};
                        var selInfo = info.setInfo || {};
                        this.setData({
                            appId: selInfo.appId
                        });
                    }
                }
            });
        },

        settlement() {
            //结算
            if (this.activation) {
                return;
            }

            this.activation = true;
            setTimeout(() => {
                this.activation = null;
            }, 1500);
            var { userShipping, skuInfo, buyCount, shareUserId, appId, commodityId } = this;
            var { activityId, orderNo } = this.groupInfo;
            var { limitBuyCount, commodityId, marchantId } = this.activityInfo;
            var residueCount = skuInfo.residueCommoditySkuCount;

            if (buyCount > residueCount && residueCount !== -1) {
                return uni.showToast({
                    title: '您购买的数量超出了库存',
                    icon: 'none'
                });
            }

            if (buyCount > limitBuyCount && limitBuyCount !== -1) {
                return uni.showToast({
                    title: '你还剩' + limitBuyCount + '次限购数量',
                    icon: 'none'
                });
            }

            if (!userShipping.id) {
                return uni.showToast({
                    title: '你还未添加收货地址',
                    icon: 'none'
                });
            }

            var reqData = {
                userHippingId: userShipping.id,
                skuId: skuInfo.skuId,
                amount: buyCount,
                commodityId,
                appId,
                merchantId: marchantId,
                shareUserId,
                activityId,
                groupOrderNo: orderNo
            };
            reqData.isOpenGroup = this.buyType == 2;
            uni.showLoading({
                title: '生成订单',
                mask: true
            });
            app.globalData.sjrequest1('/activityOrderBusiness/wxPay', reqData).then((res) => {
                uni.hideLoading();

                if (res.statusCode == 200 && res.data.code == 0) {
                    var data = res.data.data;
                    var orderNumber = data.orderNo;
                    uni.requestPayment({
                        ...data,
                        success: (res) => {
                            const eventChannel = this.getOpenerEventChannel();
                            eventChannel.emit('uploadData');
                            var query = {
                                orderNum: data.orderNo,
                                goodsName: this.goodsName,
                                skuName: this.skuInfo.skuName,
                                buyCount: this.buyCount
                            };
                            var queryStr = JSON.stringify(query);
                            queryStr = 'query=' + encodeURIComponent(queryStr);
                            this.subscribeMsg(orderNumber, () => {
                                uni.redirectTo({
                                    url: '/pages/group_booking/pay-success/pay-success?' + queryStr
                                });
                            });
                        },
                        fail: (err) => {
                            uni.navigateTo({
                                url: '/pages/group_booking/order-list/order-list?status=0'
                            });
                        }
                    });
                }
            });
        },

        subscribeMsg(orderNum, callback) {
            var appid = this.appId;

            if (appid) {
                return app.globalData
                    .sjrequest1('/subTemplate/listPriTemplateId', {
                        authorizerAppid: appid,
                        sceneTypes: [1, 3, 7]
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            return res.data.data;
                        }
                    })
                    .then((tempids) => {
                        uni.requestSubscribeMessage({
                            tmplIds: tempids,
                            success: (res) => {
                                if (res[tempids[0]] === 'accept') {
                                    app.globalData
                                        .sjrequest1('/subscription/add', [
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[0],
                                                targetid: orderNum,
                                                targettype: 6,
                                                status: 1
                                            },
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[1],
                                                targetid: this.activityId,
                                                targettype: 2,
                                                status: 1
                                            },
                                            {
                                                marchantid: this.merchantId,
                                                appid: this.appid,
                                                templateid: tempids[2],
                                                targetid: this.activityId,
                                                targettype: 2,
                                                status: 1
                                            }
                                        ])
                                        .then((res) => {
                                            if (res.statusCode == 200 && res.data.code == 0) {
                                                uni.showToast({
                                                    title: '订阅成功',
                                                    icon: 'none'
                                                });
                                            }
                                        });
                                }
                            },
                            complete: (res) => {
                                callback();
                            }
                        });
                    });
            }
        },

        getPhoneNumber(e) {
            var detail = e.detail;
            var { appId, openId } = this.loginInfo;

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
                            var codeInfo = this.codeInfo;
                            var phone = res.data.data.phoneNumber;
                            var loginInfo = this.loginInfo;
                            loginInfo.userPhone = phone;
                            this.setData({
                                loginInfo
                            });

                            if (codeInfo && codeInfo.data && codeInfo.data.data) {
                                var resData = codeInfo.data.data;
                                resData.phoneNumber = phone;
                                uni.setStorage({
                                    key: 'zl_userInfo',
                                    data: resData
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
page {
    background-color: #f2f4f4;
}

/* 头部地址 */
.top-address {
    margin: 10rpx 0;
    background-color: #fff;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
    min-height: 128rpx;
}
.top-address .sel-address-msg {
    font-size: 28rpx;
    color: #acacac;
}
.top-address .right-jantou-img {
    width: 18rpx;
    height: 32rpx;
}
.top-address .pen-icon {
    width: 36rpx;
    height: 36rpx;
}
.top-address .location-img {
    width: 56rpx;
    height: 56rpx;
}
.top-address .center-content {
    margin: 0 20rpx;
}
.top-address .user-name {
    font-size: 28rpx;
    color: #000;
    font-weight: bold;
}
.top-address .user-phone {
    font-size: 24rpx;
    color: #acacac;
    margin-left: 16rpx;
}
.top-address .address-text {
    font-size: 24rpx;
    color: #0f0f0f;
}

/* 主要内容 */
.section-content {
    background-color: #fff;
    padding-bottom: 20rpx;
    margin-bottom: 40rpx;
}

/* 商品信息 */
.section-content .goods-info {
    width: 710rpx;
    margin: 0 auto;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #e5e5e5;
}
.section-content .goods-info .goods-img {
    width: 156rpx;
    height: 156rpx;
    background-color: #ccc;
    border-radius: 8rpx;
    margin-right: 16rpx;
}
.section-content .goods-info .goods-name {
    font-size: 28rpx;
    color: #0f0f0f;
}
.section-content .goods-info .now-price {
    font-size: 40rpx;
    color: #eb1918;
    font-weight: bold;
}
.section-content .goods-info .old-price {
    font-size: 22rpx;
    color: #acacac;
    text-decoration: line-through;
    margin-left: 16rpx;
}
.section-content .goods-info .people-num {
    font-size: 26rpx;
    color: #acacac;
}

/* 参团信息 */
.section-content .join-info {
    margin: 50rpx 0 60rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.section-content .join-info .icon-img {
    width: 56rpx;
    height: 56rpx;
    margin-right: 34rpx;
}
.section-content .join-info .title-msg {
    font-size: 36rpx;
    color: #0f0f0f;
    font-weight: bold;
}

.section-content .join-info .user-list {
    margin: 58rpx 0 34rpx;
    flex-wrap: wrap;
}
.section-content .join-info .user-list .avatar-item {
    position: relative;
    margin: 0 20rpx 15rpx 0;
}
.section-content .join-info .user-list .avatar-item .user-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #ccc;
}
.section-content .join-info .user-list .avatar-item .initiator-user-label {
    background-color: #1577ff;
    border-radius: 14px 14px 14px 0px;
    font-size: 18rpx;
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2rpx 10rpx;
}
.section-content .join-info .user-list .empty-avatar-img {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
    margin-bottom: 15rpx;
}

.section-content .join-info .down-count-box {
    font-size: 26rpx;
    color: #0f0f0f;
    font-weight: bold;
    margin-bottom: 40rpx;
}
.section-content .join-info .down-count-box .down-num {
    width: 48rpx;
    height: 56rpx;
    border-radius: 8rpx;
    background-color: #ffbb38;
    color: #fff;
    font-size: 35rpx;
    font-weight: bold;
    text-align: center;
    margin: 0 10rpx;
    line-height: 56rpx;
}

.section-content .join-info .immediately-join-btn {
    width: 382rpx;
    height: 74rpx;
    color: #fff;
    font-size: 24rpx;
    padding: 0;
    margin: 0;
    border-radius: 38rpx;
    background-color: #eb1918;
    line-height: 74rpx;
}

.section-content .join-info .prompt-msg {
    font-size: 18rpx;
    color: #eb1918;
    margin-top: 15rpx;
}

/* 攻略 */
.section-content .strategy-box {
    width: 710rpx;
    border: 4rpx solid #1577ff;
    margin: 0 auto;
    border-radius: 16rpx;
}
.section-content .strategy-box .title-box {
    font-size: 28rpx;
    color: #1577ff;
    font-weight: bold;
    height: 80rpx;
}
.section-content .strategy-box .text-content {
    font-size: 24rpx;
    color: #0f0f0f;
    padding: 0 20rpx 20rpx;
    box-sizing: border-box;
}

.groupbox {
    display: flex;
    border-radius: 16rpx;
    border: 2rpx solid #1577ff;
    margin: 0 20rpx;
    height: 98rpx;
    align-items: center;
    justify-content: center;
}
.groupbox text {
    font-size: 28rpx;
    font-weight: bold;
    color: #1577ff;
    padding: 0 6rpx;
}
.groupbox .icon {
    width: 30rpx;
    height: 34rpx;
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
