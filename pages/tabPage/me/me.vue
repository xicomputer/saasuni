<template>
    <view>
        <!-- pages/tabPage/me/me.wxml -->
        <view class="me-page-container">
            <!-- 头部 -->
            <view class="top-content-box">
                <image class="top-box-bg" src=""></image>

                <view class="content-box">
                    <view class="user-base-info">
                        <open-data class="avatar-img" type="userAvatarUrl"></open-data>
                        <view class="user-name-info">
                            <view class="name-box">
                                <open-data class="user-name" type="userNickName"></open-data>
                                <view>
                                    <image class="me-top-nav-icon" src="/static/image/tabpage/seting.png" @tap="toSetUp"></image>
                                    <image class="me-top-nav-icon" @tap="toNotice" style="margin-left: 30rpx; width: 44rpx" src="/static/image/tabpage/msg.png"></image>
                                </view>
                                <view class="noticeNum" v-if="noticeNum > 0">{{ noticeNum }}</view>
                            </view>
                            <navigator hover-class="none" url="/pages/Modify/Modify">{{ userInfo.signature || '点击设置个性签名' }}</navigator>
                        </view>
                    </view>

                    <view class="plate-box logistics-order-plate">
                        <view class="plate-title">物流订单</view>
                        <view class="nav-list-container">
                            <navigator
                                hover-class="none"
                                class="nav-item-box"
                                :url="'/pages/order/orderList/orderList?activeTab=2&tabsItem=' + index"
                                v-for="(item, index) in logisticsOrderList"
                                :key="index"
                            >
                                <image class="nav-icon-img" :src="'../../../image/tabpage/' + item.icon + '.png'"></image>

                                <text>{{ item.name }}</text>

                                <view class="number" v-if="orderNum[index]">{{ orderNum[index] }}</view>
                            </navigator>
                        </view>
                    </view>
                </view>
            </view>

            <view class="residue-plate-container">
                <view class="plate-box" style="margin-bottom: 10px">
                    <view class="plate-title">同城配送</view>
                    <view class="nav-list-container">
                        <navigator
                            hover-class="none"
                            class="nav-item-box"
                            :url="'/pages/order/orderListCity/orderListCity?tabsitem=' + index"
                            v-for="(item, index) in distributionList"
                            :key="index"
                        >
                            <image class="nav-icon-img" :src="'../../../image/tabpage/' + item.icon + '.png'"></image>

                            <text>{{ item.name }}</text>

                            <view class="number" v-if="cityOrderNum[index]">{{ cityOrderNum[index] }}</view>
                        </navigator>
                    </view>
                </view>

                <view class="plate-box" style="margin-bottom: 10px">
                    <view class="plate-title">预定/自取</view>
                    <view class="nav-list-container">
                        <navigator
                            hover-class="none"
                            class="nav-item-box"
                            :url="'/pages/order/orderListTake/orderListTake?tabsitem=' + index"
                            v-for="(item, index) in reservationList"
                            :key="index"
                        >
                            <image class="nav-icon-img" :src="'../../../image/tabpage/' + item.icon + '.png'"></image>

                            <text>{{ item.name }}</text>

                            <view class="number" v-if="toStoreOrderNum[index]">{{ toStoreOrderNum[index] }}</view>
                        </navigator>
                    </view>
                </view>

                <view class="plate-box" style="margin-bottom: 10px">
                    <view class="plate-title">我的工具</view>
                    <view class="nav-list-container">
                        <navigator hover-class="none" class="nav-item-box" :url="item.url" v-for="(item, index) in toolList" :key="index">
                            <image class="nav-icon-img2" :src="item.icon + '.png'"></image>

                            <text>{{ item.name }}</text>

                            <view class="number" v-if="toStoreOrderNum[index]">{{ toStoreOrderNum[index] }}</view>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>

        <navigator hover-class="none" v-if="buton" url="/pages/shopHome/home/home" class="butt">授权登录</navigator>
    </view>
</template>

<script>
// pages/tabPage/me/me.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            logisticsOrderList: [
                //物流订单
                {
                    name: '待付款',
                    icon: 'me_icon1'
                },
                {
                    name: '待发货',
                    icon: 'me_icon2'
                },
                {
                    name: '待收货',
                    icon: 'me_icon3'
                },
                {
                    name: '已完成',
                    icon: 'me_icon4'
                },
                {
                    name: '退款退货',
                    icon: 'me_icon5'
                }
            ],

            distributionList: [
                //同城配送
                {
                    name: '待付款',
                    icon: 'me_icon1'
                },
                {
                    name: '待接单',
                    icon: 'me_icon2'
                },
                {
                    name: '待收货',
                    icon: 'me_icon6'
                },
                {
                    name: '已完成',
                    icon: 'me_icon4'
                },
                {
                    name: '已退款',
                    icon: 'me_icon5'
                }
            ],

            reservationList: [
                //预定/自取
                {
                    name: '待付款',
                    icon: 'me_icon1'
                },
                {
                    name: '待自取',
                    icon: 'me_icon2'
                },
                {
                    name: '已完成',
                    icon: 'me_icon4'
                }
            ],

            toolList: [
                //我的工具
                {
                    icon: '/pages/img/my/kefu',
                    name: '客服',
                    url: '/pages/order/contact/contact'
                },
                {
                    icon: '/pages/img/my/shop-cart',
                    name: '购物车',
                    url: '/pages/Index/ShopCart/ShopCart'
                },
                {
                    icon: '/pages/img/my/wodedontai',
                    name: '评论',
                    url: '/pages/Index/dynamic/commentList/commentList'
                },
                {
                    icon: '/pages/img/my/notice',
                    name: '优惠券',
                    url: '/pages/Index/couponList/couponList'
                },
                {
                    icon: '/pages/img/my/paimai_icon',
                    name: '喊价',
                    url: `/pages/activity/pmhd/pmEnter/pmEnter`
                }
            ],

            userInfo: {
                signature: ''
            },

            // 用户信息
            cartNum: 0,

            // 购物车数量
            buton: false,

            orderNum: [],

            // 物流订单数量
            cityOrderNum: [],

            // 同城订单数量
            toStoreOrderNum: [],

            // 到店订单数量
            noticeNum: 0,

            // 通知数量
            lookedList: [],

            //我的足迹列表
            statusHeight: '',

            //状态栏高
            titleBarHeight: '',

            //标题栏高
            //头部导航栏高度
            navHeadHeight: '',

            titleBarHeigth: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        uni.getSystemInfoAsync({
            success: (res) => {
                var menuButtonInfo = uni.getMenuButtonBoundingClientRect();
                var statusHeight = res.statusBarHeight;
                var titleBarHeigth = menuButtonInfo.height;
                var navHeadHeight = statusHeight + titleBarHeigth + 8;
                console.log(navHeadHeight);
                this.setData({
                    navHeadHeight,
                    statusHeight,
                    titleBarHeigth
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    if (uni.getStorageSync('token')) {
                        that.setData({
                            buton: false
                        });
                        that.userIf();
                        that.getOrderNum();
                    } else {
                        that.setData({
                            buton: true
                        });
                    }
                } else {
                    that.setData({
                        buton: true
                    }); //用户没有授权
                }
            }
        });
        this.getCartNum();
        this.getLookedList();
    },
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
     */
    onShareAppMessage: function () {},
    methods: {
        //用户信息
        userIf: function () {
            var that = this;
            app.globalData.sjrequest('/userRegister/queryUserInfo').then((res) => {
                if (res.data.code == 200) {
                    uni.setStorage({
                        key: 'signature',
                        data: res.data.data.signature
                    });

                    if (res.data.data.phoneNumber) {
                        uni.setStorage({
                            key: 'userPhone',
                            data: res.data.data.phoneNumber
                        });
                    }

                    var wxUserInfo = uni.getStorageSync('wx_userinfo_key') || {};
                    that.setData({
                        userInfo: { ...res.data.data, nickName: wxUserInfo.userInfo.nickName, avatarUrl: wxUserInfo.userInfo.avatarUrl }
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //获得购物车数量
        getCartNum() {
            app.globalData.sjrequest('/commodity/countTrolley', {}).then((res) => {
                var countTrolley = res.data.data.countTrolley;
                this.setData({
                    cartNum: countTrolley
                });
            });
        },

        toSetUp() {
            uni.navigateTo({
                url: '/pages/PersonalCenter/setUp/setUp'
            });
        },

        toNotice() {
            uni.navigateTo({
                url: '/pages/Notice/Notice'
            });
        },

        // 获取数字
        getOrderNum() {
            var data = {
                type: 2
            };
            app.globalData.sjrequest('/basic/queryCountAmount', data).then((res) => {
                var list = [res.data.data.citywideOrderState0, res.data.data.citywideOrderState1, res.data.data.citywideOrderState2, 0, res.data.data.citywideRefundState];
                var cityList = [res.data.data.sendState0, res.data.data.sendState1, res.data.data.sendState2];
                var list1 = [res.data.data.fetchState0, res.data.data.fetchState1, 0];
                this.setData({
                    orderNum: list,
                    cityOrderNum: cityList,
                    toStoreOrderNum: list1,
                    noticeNum: res.data.data.sumCount
                });
            });
        },

        // 获取足迹
        getLookedList() {
            return app.globalData.sjrequest('/marchant/queryFootprintList').then((res) => {
                res.data.data.forEach((item) => {
                    item.updateTime = time.formatTimeSec(item.updateTime);
                });
                var lookedList = res.data.data;
                var len = lookedList.length;
                this.setData({
                    lookedList: len > 1 ? lookedList.slice(0, 1) : lookedList
                });
            });
        }
    }
};
</script>
<style>
/* pages/tabPage/me/me.wxss */
page {
    height: 100vh;
}
.me-page-container {
    background-color: #f7f7f7;
    min-height: 100%;
}

/* 导航容器 */
.plate-box {
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
}
.plate-box .plate-title {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #e4e4e4;
}
.plate-box .nav-list-container {
    display: flex;
    flex-wrap: wrap;
}
.plate-box .nav-item-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24rpx;
    color: #333;
    align-items: center;
    width: 20%;
    position: relative;
}
.plate-box .nav-item-box .nav-icon-img {
    width: 90rpx;
    height: 90rpx;
}
.nav-item-box .number {
    width: 26rpx;
    height: 26rpx;
    line-height: 26rpx;
    background: #ffffff;
    border: 1px solid #ff1c30;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ff1d2e;
    opacity: 1;
    position: absolute;
    top: 6rpx;
    right: 30rpx;
    text-align: center;
}
.noticeNum {
    width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: #06a9fd;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 8rpx;
    right: -12rpx;
    text-align: center;
}

/* 头部 */
.top-content-box {
    position: relative;
    height: 480rpx;
}
.top-content-box .top-box-bg {
    height: 480rpx;
    width: 100%;
    background: linear-gradient(271deg, #f95244 0%, #ff1400 100%);
    border-bottom-left-radius: 50% 30rpx;
    border-bottom-right-radius: 50% 30rpx;
}
.top-content-box .content-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 450rpx;
    padding: 50rpx 20rpx 0;
    width: 100%;
    box-sizing: border-box;
}
.top-content-box .content-box .user-base-info {
    display: flex;
    align-items: center;
}
.top-content-box .content-box .user-base-info .avatar-img {
    width: 140rpx;
    height: 140rpx;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 30rpx;
    overflow: hidden;
}

.top-content-box .content-box .user-name-info {
    display: flex;
    flex-direction: column;
    height: 140rpx;
    justify-content: space-around;
    flex: 1;
    position: relative;
    color: #f4f4f4;
    font-size: 22rpx;
}
.top-content-box .content-box .name-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.top-content-box .content-box .name-box .user-name {
    font-size: 40rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 50%;
}
.top-content-box .content-box .me-top-nav-icon {
    width: 40rpx;
    height: 44rpx;
}
.top-content-box .content-box .logistics-order-plate {
    position: absolute;
    bottom: -70rpx;
    left: 20rpx;
    width: 710rpx;
}

/* 剩余其他版块部分 */
.residue-plate-container {
    margin-top: 60rpx;
    padding: 0 20rpx 30rpx;
    box-sizing: border-box;
}

/* 工具 */
.more-navigor {
    font-size: 24rpx;
    color: #333;
}
.scroll-x-box {
    border-top: 1rpx solid #e4e4e4;
    padding-top: 16rpx;
    height: 300rpx;
}
.scroll-item {
    width: 562rpx;
    height: 300rpx;
    flex-shrink: 0;
    border-radius: 16rpx;
    position: relative;
}
.scroll-item:not(:first-child) {
    margin-left: 14rpx;
}
.footprint-bg-img {
    width: 100%;
    height: 100%;
}
.scroll-item .item-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 12rpx 14rpx;
    box-sizing: border-box;
}
.scroll-item .item-content .dot-box {
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background-color: #fff;
}
.scroll-item .item-content .time-str {
    font-size: 22rpx;
    color: #fff;
    font-weight: bold;
    margin-left: 10rpx;
}

.scroll-item .item-content .shop-info-box {
    border-radius: 18rpx;
    overflow: hidden;
}
.scroll-item .item-content .shop-info-img {
    width: 272rpx;
    height: 248rpx;
    background-color: #ccc;
}
.scroll-item .item-content .shop-info-content {
    font-size: 20rpx;
    color: #999;
    background-color: #fff;
    padding: 8rpx;
    box-sizing: border-box;
}
.scroll-item .item-content .shop-title {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    line-height: 40rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 246rpx;
    white-space: nowrap;
}
.scroll-item .item-content .shop-visits-num {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
    line-height: 34rpx;
}
.scroll-item .item-content .address-text {
    -webkit-line-clamp: 2;
    margin-bottom: 5rpx;
    line-height: 28rpx;
}
.scroll-item .item-content .describe-text {
    -webkit-line-clamp: 3;
}

/* 登录 */
.butt {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: -1;
    z-index: 9999;
}

.nav-icon-img2 {
    width: 20px;
    height: 20px;
    margin-bottom: 3px;
    margin-top: 10rpx;
}
</style>
