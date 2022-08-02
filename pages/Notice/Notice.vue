<template>
    <view class="notice-container">
        <navigator v-if="!item.hide" :url="item.to" class="notice-item" v-for="(item, index) in noticeTypeList" :key="index">
            <image class="notice-item-img" :src="item.img">
                <view v-if="item.sum != 0" class="notice-content-number">{{ item.sum }}</view>
            </image>

            <view class="notice-content-box">
                <view class="notice-content-item">
                    <view class="notice-type">{{ item.title }}</view>
                    <view class="notice-time">{{ item.time }}</view>
                </view>
                <view class="notice-content-item">
                    <view class="notice-content-text">{{ item.content }}</view>
                </view>
            </view>
        </navigator>
    </view>
</template>

<script>
// pages/Notice/Notice.js
const app = getApp();

const time = require('../../utils/util');

export default {
    data() {
        return {
            noticeTypeList: [
                {
                    img: '/static/pages/img/notice/store_notice_img.png',
                    title: '商铺消息',
                    content: '点击查看你的商家售后',
                    time: '2020/10/22',
                    to: './store/NoticeList/NoticeList',
                    sum: 0,
                    hide: false
                },
                {
                    img: '/static/pages/img/notice/system_notice_img.png',
                    title: '系统消息',
                    content: '查看系统通知',
                    time: '刚刚',
                    to: './system/NoticeList/NoticeList',
                    sum: 0,
                    hide: false
                }
            ],

            hide: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (options.from == 'store') {
            this.setData({
                ['noticeTypeList[0].hide']: true
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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
            let data = {
                type: 2
            };
            var chatTime = 'noticeTypeList[0].time';
            var messageaddTime = 'noticeTypeList[1].time';
            var chatSum = 'noticeTypeList[0].sum';
            var messageSum = 'noticeTypeList[1].sum';
            app.globalData.sjrequest('/basic/queryCountAmount', data).then((res) => {
                if (res.data.data.chatTime) {
                    res.data.data.chatTime = time.formatTime(res.data.data.chatTime);
                    this[noticeTypeList[0].time] = res.data.data.chatTime;
                }

                if (res.data.data.messageaddTime) {
                    res.data.data.messageaddTime = time.formatTime(res.data.data.messageaddTime);
                    this[noticeTypeList[1].time] = res.data.data.messageaddTime;
                }

                this[noticeTypeList[1].sum] = res.data.data.countMessage;
                this[noticeTypeList[0].sum] = res.data.data.countChat;
            });
        }
    }
};
</script>
<style>
.notice-container {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
}
/* 通知 */
.notice-item {
    width: 100%;
    height: 120rpx;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #f4f4f4;
}
.notice-item-img {
    width: 116rpx;
    height: 116rpx;
    position: relative;
}
.notice-content-box {
    width: 0;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16rpx 30rpx 26rpx 2rpx;
    box-sizing: border-box;
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
    font-weight: bold;
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
    color: #000000;
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
    position: absolute;
    top: 6rpx;
    right: 10rpx;
}
/* 到底 */

.no-more {
    height: 24rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #9a9a9a;
    text-align: center;
}
</style>
