<template>
    <view class="notice-container">
        <!-- 没有消息 -->
        <view v-if="!noticeList.length" class="no-notice">
            <image class="no-notice-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-notice-text">暂无消息通知</view>
        </view>
        <!-- 有消息 -->
        <navigator
            :url="'/pages/order/contact/contact?logoPic=' + item.logoPic + '&marchantId=' + item.marchantId + '&marchantName=' + item.nickName"
            class="notice-item"
            v-for="(item, index) in noticeList"
            :key="index"
        >
            <image class="notice-item-img" :src="item.logoPic" mode="aspectFill"></image>

            <view class="notice-content-box">
                <view class="notice-content-item">
                    <view class="notice-type">{{ item.nickName }}</view>
                    <view class="notice-time">{{ item.addTime }}</view>
                </view>
                <view class="notice-content-item">
                    <view class="notice-content-text">{{ item.lastContent1 }}</view>
                    <view v-if="item.unread1 != 0" class="notice-content-number">{{ item.unread1 }}</view>
                </view>
            </view>
        </navigator>
    </view>
</template>

<script>
// pages/Notice/store/NoticeList/NoticeList.js
const app = getApp();

const time = require('../../../../utils/util');

export default {
    data() {
        return {
            noticeList: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        uni.showLoading({
            title: '加载中'
        });
        this.getParams();
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
     */ methods: {
        getParams() {
            app.globalData.sjrequest('/basic/queryChatList').then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatTime(item.addTime);
                    });
                    this.setData({
                        noticeList: res.data.data
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
.notice-container {
    width: 100%;
    min-height: 100vh;
    background: #fff;
}
/* 没有通知 */
.no-notice {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-notice-img {
    width: 632rpx;
    height: 368rpx;
}

.no-notice-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42rpx;
    color: #000;
    opacity: 1;
    margin-top: 40rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29rpx;
    color: #999999;
}
/* 通知 */
.notice-item {
    width: 100%;
    height: 120rpx;
    background: #fff;
    border-radius: 10rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
}
.notice-item-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 10rpx;
}
.notice-content-box {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30rpx;
}
.notice-content-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.notice-type {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #101010;
}
.notice-time {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #999999;
}
.notice-content-text {
    width: 400rpx;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #101010;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.notice-content-number {
    width: 32rpx;
    height: 32rpx;
    background: #f53828;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
