<template>
    <view>
        <video src="https://xssj.letterbook.cn/applet/videos/cooperation1.mp4" :autoplay="true" :loop="true" :controls="false" class="video-container">
            <image class="video-top" src="https://xssj.letterbook.cn/applet/images/video_bg_mengbang.jpg"></image>
            <view class="video-bottom">
                <view class="video-content">
                    <view class="video-tile">商家注册申请</view>
                    <view class="video-text">一键注册开店，零售行业一键入驻</view>
                </view>
                <navigator url="/pages/BusinessApplication/BusinessApplication" class="video-btn">立即申请</navigator>
            </view>
        </video>
    </view>
</template>

<script>
// pages/BusinessApplication/BusinessVideo/BusinessVideo.js
export default {
    data() {
        return {};
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
     */
    onShareAppMessage: function () {
        uni.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        return {
            title: '信书商家申请',
            path: '',
            imageUrl: 'https://xssj.letterbook.cn/applet/images/video_share_img.png'
        };
    },
    onShareTimeline: function () {
        return {
            title: '信书商家申请',
            query: '',
            imageUrl: 'https://xssj.letterbook.cn/applet/images/video_share_img.png'
        };
    },
    methods: {}
};
</script>
<style>
/* pages/BusinessApplication/BusinessVideo/BusinessVideo.wxss */
.video-container {
    width: 100%;
    height: 100vh;
    vertical-align: top;
    position: relative;
}
.video-top {
    width: 100%;
    height: 180rpx;
    position: absolute;
    top: 0;
    left: 0;
}
.video-bottom {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20rpx 20rpx 40rpx;
    box-sizing: border-box;
}
.video-content {
    flex: 1;
}
.video-tile {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #ffffff;
}
.video-text {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
}
.video-btn {
    width: 116rpx;
    height: 44rpx;
    background: #e23e3e;
    border-radius: 8rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
