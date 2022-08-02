<template>
    <view>
        <view style="width: 100%; height: 1rpx; background: #e5e5e5"></view>
        <view class="notice-detail-box">
            <view class="notice-detail-top">
                <image src="/static/pages/img/notice/system_notice_img.png" style="width: 120rpx; height: 120rpx; border-radius: 50%"></image>
                <view class="notice-detail-right">
                    <view class="notice-detail-name">{{ noticeListItem.title }}</view>
                    <view class="notice-detail-time">{{ noticeListItem.addTime }}</view>
                </view>
            </view>
            <!-- <view class="notice-detail-title">{{noticeListItem.title}}</view> -->
            <view class="notice-detail-content">
                <rich-text v-if="noticeListItem.snapshotText" :nodes="noticeListItem.snapshotText"></rich-text>
                <view v-else class="notice-content-text">{{ noticeListItem.content }}</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Notice/NoticeDetail/NoticeDetail.js
const app = getApp();
export default {
    data() {
        return {
            noticeListItem: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        const noticeListItem = JSON.parse(uni.getStorageSync('noticeListItem'));
        this.setData({
            noticeListItem: noticeListItem
        });
        this.getParams();
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
        getParams() {
            let data = {
                notifyId: this.noticeListItem.id
            };
            return app.globalData.sjrequest('/basic/addMessage', data).then((res) => {});
        }
    }
};
</script>
<style>
.notice-detail-box {
    width: 100%;
}
.notice-detail-top {
    display: flex;
}
.notice-detail-right {
    width: 0;
    flex: 1;
    padding-top: 12rpx;
    box-sizing: border-box;
}
.notice-detail-name {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #101010;
}
.notice-detail-time {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 28rpx;
    color: #999999;
    margin-top: 12rpx;
}
.notice-detail-title {
    height: 60rpx;
    font-size: 42rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: #333333;
    margin-top: 20rpx;
    margin-bottom: 60rpx;
}
.notice-detail-content {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.notice-content-text {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
    background: #f4f4f4;
}
</style>
