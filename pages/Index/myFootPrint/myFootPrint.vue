<template>
    <!-- pages/Index/myFootPrint/myFootPrint.wxml -->
    <!-- 我的足迹 -->
    <view class="follow-container" :style="lookedList.length ? '' : 'visibility:hidden'">
        <image class="follow-title" src="/static/pages/img/my/looked_store_title.png">我的足迹</image>
        <scroll-view :scroll-y="true" style="height: 90vh">
            <view class="follow-list">
                <view class="follow-list-cell van-swipe-cell" v-for="(item, index) in lookedList" :key="index">
                    <view @tap="toStore" :data-id="item.id" class="follow-item-box">
                        <view class="looked-box">
                            <view class="big-dot">
                                <view class="small-dot"></view>
                            </view>
                            <view class="looked-time">{{ item.updateTime }}</view>
                        </view>
                        <view class="follow-item looked-item">
                            <view style="display: flex">
                                <image class="touxiang" :src="item.logoPic" mode="aspectFill"></image>
                                <view class="follow-content">
                                    <view style="display: flex; margin: 14rpx 0 12rpx; align-items: center">
                                        <view class="follow-name">{{ item.nickName }}</view>
                                    </view>
                                    <view class="follow-content-info">
                                        <view class="follow-star-list" v-for="(item, index1) in 5" :key="index1">
                                            <image style="width: 20rpx; height: 20rpx; margin-right: 2rpx" src="/static/pages/img/my/star.png"></image>
                                        </view>
                                        <text style="font-size: 22rpx; font-weight: 400; line-height: 30rpx; color: #da502d; height: 30rpx; margin-left: 4rpx">5分</text>
                                        <view style="width: 1px; height: 19rpx; background: #d2d2d2; margin-left: 8rpx; margin-right: 8rpx"></view>
                                        <view class="looked-man">{{ item.accessNumber || 0 }}访问数</view>
                                    </view>
                                    <view class="label-list">
                                        <view class="label-item" v-for="(item, index1) in item.labels" :key="index1">{{ item }}</view>
                                    </view>
                                </view>
                            </view>
                            <view class="follow-content-botton">简介:{{ item.brief }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
// pages/Index/myFootPrint/myFootPrint.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            lookedList: [] // 浏览列表
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getLookedList();
    },
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
    methods: {
        /**
         * 用户点击右上角分享
         */
        toStore(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + id
            });
        },

        // 获取足迹
        getLookedList() {
            return app.globalData.sjrequest('/marchant/queryFootprintList').then((res) => {
                res.data.data.forEach((item) => {
                    item.updateTime = time.formatTimeSec(item.updateTime);
                });
                this.setData({
                    lookedList: res.data.data
                });
            });
        }
    }
};
</script>
<style>
/* pages/Index/myFootPrint/myFootPrint.wxss */

/* 我的足迹 */
.follow-container {
    width: 710rpx;
    margin: 20rpx auto 8rpx;
    background: #ffffff;
    border-radius: 16rpx;
}
.follow-title {
    width: 232rpx;
    height: 46rpx;
    display: block;
    margin: 10rpx auto 0;
}
/* 我的关注 */
.follow-list {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.looked-box {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}
.follow-item-box {
    padding-top: 15rpx;
    box-sizing: border-box;
}
.big-dot {
    width: 32rpx;
    height: 32rpx;
    background: #ebebeb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.small-dot {
    width: 16rpx;
    height: 16rpx;
    background: red;
    border-radius: 50%;
}
.looked-time {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
    margin-left: 20rpx;
}
.follow-item {
    width: 100%;
    padding: 30rpx 0;
    box-sizing: border-box;
    border-bottom: 1rpx solid #ddd;
    box-sizing: border-box;
}
.looked-item {
    width: 98%;
    padding: 0;
    border: none;
    border-left: 1rpx solid #ececec;
    padding-left: 15rpx;
    margin-left: 17rpx;
    padding-bottom: 24rpx;
    box-sizing: border-box;
}
.follow-list .follow-list-cell:last-child .looked-item {
    border: none;
}
.follow-item .touxiang {
    width: 271rpx;
    height: 193rpx;
    border-radius: 14rpx;
}
.follow-content {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
}
.follow-name {
    max-width: 215rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 45rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 45rpx;
    color: #333333;
    margin-right: 20rpx;
}
.follow-content-info {
    display: flex;
    align-items: center;
}
.follow-star-list {
    display: flex;
}
.looked-man {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #333333;
}
/* 标签 */
.label-list {
    display: flex;
    flex-wrap: wrap;
}
.label-item {
    height: 32rpx;
    background: #f8ecd2;
    border-radius: 4rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #005050;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
    padding: 0 10rpx;
    margin-top: 10rpx;
}
.follow-content-botton {
    font-size: 29rpx;
    margin-top: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
