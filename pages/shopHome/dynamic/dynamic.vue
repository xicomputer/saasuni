<template>
    <!-- pages/shopHome/dynamic/dynamic.wxml -->
    <!-- 订阅通知 -->
    <view class="dynamic-shop">
        <!-- 推荐酒店 -->
        <dynamic-list
            :orderSwitch="orderSwitch"
            :marchantId="marchantId"
            :hotelList="hotelList"
            :commentList="commentList"
            :storeDynamicList="storeDynamicList"
            :markerInfo="markerInfo"
            :status="status"
            @showDingYue="showDingYue"
            v-if="userInfo.community != 3"
        ></dynamic-list>
        <!-- <image bindtap="toWrite" src="/pages/img/index/write-comment.png" class="right-bottom" hidden="{{userInfo.community==3}}"></image> -->
        <!-- 小店排行 -->
        <view class="shop-list-top-box" v-if="!(userInfo.community == 2 || storeList.length == 0)">
            <image class="shoop-list-top-img" src=""></image>
        </view>
        <view class="shop-list" v-if="userInfo.community != 2">
            <!-- 通知栏 -->
            <view class="notice-bar-container" v-if="noticeContent.length">
                <image src="/static/pages/img/index/notice_bar.png" style="width: 36rpx; height: 36rpx"></image>
                <text class="notice-title-text">公告:</text>
                <van-notice-bar style="flex: 1; height: 56rpx" color="#ff0000" background="#fff" :text="noticeContent"></van-notice-bar>
            </view>
            <view class="shop-item-box" v-if="userInfo.community != 2" v-for="(item, index) in storeList" :key="index">
                <navigator class="shop-item" :url="'/pages/smallShop/myShop/myShop?storeId=' + item.storeId">
                    <view class="shop-item-left">
                        <image class="shop-item-left-logo" :src="item.headImgUrl" mode="aspectFill"></image>
                        <view class="shop-item-left-content">
                            <view>{{ item.nickName }}的小店</view>
                        </view>
                    </view>
                    <view class="shop-item-right">
                        <image src="/static/pages/img/index/huoyue.png" style="margin-bottom: 20rpx"></image>
                        <!-- {{item.praise}} -->
                        活跃中
                    </view>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
import dynamicList from '../../Component/dynamic/index';
// pages/shopHome/dynamic/dynamic.js
const app = getApp();
export default {
    components: {
        dynamicList
    },
    data() {
        return {
            marchantId: null,
            hotelList: [],
            commentList: [],
            storeDynamicList: [],
            markerInfo: [],
            status: 1,
            storeList: [],
            orderSwitch: 1,

            userInfo: {
                community: 0
            },

            noticeContent: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let ids = uni.getStorageSync('merchantId');
        let orderSwitch = uni.getStorageSync('orderSwitch');
        this.setData({
            marchantId: ids,
            orderSwitch: orderSwitch
        });
        this.showMarkerInfo();
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
        showMarkerInfo() {
            var data = {
                id: this.marchantId
            };
            app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then((res) => {
                if (res.data.code == 200) {
                    var result = res.data.data;

                    if (res.data.data.marchantCorrelationList.length) {
                        var list = [];
                        var hotelList = [];
                        res.data.data.marchantCorrelationList.forEach((item) => {
                            if (item.marchantCorrelation.source == 1) {
                                list.push(item);
                            }

                            if (item.marchantCorrelation.source == 2) {
                                hotelList.push(item);
                            }
                        });
                    }

                    this.setData({
                        markerInfo: result,
                        hotelList: hotelList
                    });
                }
            });
        },

        // 订阅通知
        // 获取订阅通知列表
        getCommunityList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 10,
                stick: 1,
                isMarchant: 0
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatTime(item.addTime);
                    });
                    this.setData({
                        commentList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //  订阅商铺
        showDingYue() {
            // 获取用户信息
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneType: 4
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        uni.getSetting({
                            withSubscriptions: true,
                            success: (result) => {
                                uni.showToast({
                                    title: '订阅消息成功'
                                });
                                let data = {
                                    status: that.status,
                                    marchantId: that.marchantId,
                                    templateIds: tempData,
                                    appId: appid,
                                    targetType: 5
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        uni.showToast({
                                            title: '订阅消息成功'
                                        });
                                        that.$emit('event', {
                                            detail: true
                                        });
                                    } else {
                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        });
                                    }
                                });
                            }
                        });
                    },

                    fail(e) {
                        console.log(e);
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    }
                });
            });
        },

        // 获取商家动态
        getStoreDynamicList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 10,
                isMarchant: 1,
                stick: 1
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatDateTime(item.addTime);
                    });
                    this.setData({
                        storeDynamicList: res.data.data
                    });
                }
            });
        },

        //  小店排行列表
        getStoreList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 5
            };
            return app.globalData.sjrequest('/marchant/queryMarchantStoreList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        storeList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>
<style>
/* pages/shopHome/dynamic/dynamic.wxss */
/* 订阅通知 */
.dynamic-shop {
    min-height: 85vh;
    background-color: #f7f7f7;
    padding: 0rpx 0rpx 110rpx;
}
.dynamic-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
}
.right-bottom {
    width: 88rpx;
    height: 88rpx;
    position: fixed;
    bottom: 20%;
    right: 4%;
}
.support {
    font-size: 26rpx;
    text-align: center;
    color: #333;
}
.support text {
    padding: 0 20rpx;
}
.bgF8 {
    background-color: #f8f8f8;
}
.typechange {
    border: 1px solid #000;
    width: 60rpx;
    display: block;
    text-align: center;
}
.shop-list-top-box {
    width: 100%;
    height: 198rpx;
}
.shoop-list-top-img {
    width: 100%;
    height: 198rpx;
}
</style>
