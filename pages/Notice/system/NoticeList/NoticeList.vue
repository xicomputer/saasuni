<template>
    <view>
        <view v-if="!noticeList.length" class="no-notice">
            <image class="no-notice-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-notice-text">暂无消息通知</view>
        </view>
        <view class="notice-item" @tap="toDetail" :data-item="item" v-for="(item, index) in noticeList" :key="index">
            <image src="/static/pages/img/notice/system_notice_img.png" style="width: 120rpx; height: 120rpx; border-radius: 50%"></image>

            <view class="notice-right">
                <view class="notice-top">
                    <view class="notice-title">{{ item.title }}</view>
                    <view class="notice-time">{{ item.addTime }}</view>
                </view>
                <view class="notice-bottom">
                    <view class="notice-content">{{ item.content }}</view>
                    <!-- <view class="notice-read" wx:if="{{item.isRead!=1}}"></view> -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Notice/NoticeList/NoticeList.js
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
        this.getNotice();
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
        //通知列表
        getNotice() {
            var data = {};
            app.globalData.sjrequest('/basic/queryMessageList', data).then((res) => {
                var list = res.data.data;

                for (var i in list) {
                    const date = new Date(list[i].addTime);
                    const now = new Date();
                    const year = date.getFullYear() - now.getFullYear();
                    const month = date.getMonth() + 1 - (now.getMonth() + 1);
                    const day = date.getDate() - now.getDate();

                    if (year == 0 && month == 0 && day == 0) {
                        list[i].flag = true;
                    } else {
                        list[i].flag = false;
                    }

                    list[i].addTime = time.formatTime(list[i].addTime); // list[i].addTime=list[i].addTime.substring(0,5)
                }

                this.setData({
                    noticeList: list
                });
            });
        },

        // 通知详情
        toDetail(e) {
            var item = e.currentTarget.dataset['item'];
            uni.setStorage({
                key: 'noticeListItem',
                data: JSON.stringify(item)
            });
            uni.navigateTo({
                url: '../NoticeDetail/NoticeDetail?id'
            });
        }
    }
};
</script>
<style>
.notice-item {
    width: 100%;
    display: flex;
    border-bottom: 1rpx solid #f2f2f2;
}
.notice-right {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
    margin-top: 2rpx;
    padding-right: 20rpx;
    box-sizing: border-box;
}
.notice-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.notice-title {
    flex: 1;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.notice-time {
    width: fit-content;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #cdd1de;
    margin-left: 20rpx;
}
.notice-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11rpx;
}
.notice-content {
    width: 470rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #a3abb5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.notice-read {
    width: 10rpx;
    height: 10rpx;
    background: #ec1919;
    border-radius: 50%;
}

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
</style>
