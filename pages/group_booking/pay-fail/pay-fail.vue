<template>
    <view class="me-fx-col me-fx-c-c pay-fail-page">
        <image src="/static/pages/group_booking/imgs/pay-fail-bg.png" class="pay-fail-bg-img"></image>
        <text>支付失败</text>
        <button class="back-hone" @tap="btnHandle">返回首页</button>
    </view>
</template>

<script>
// pages/seckill/pay-fail/pay-fail.js
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
    onShareAppMessage: function () {},
    methods: {
        btnHandle(e) {
            uni.reLaunch({
                url: '/pages/shopHome/home/home'
            });
        }
    }
};
</script>
<style>
.pay-fail-page {
    height: 100vh;
    font-size: 26rpx;
    color: #333;
}

.pay-fail-bg-img {
    width: 570rpx;
    height: 478rpx;
    margin-bottom: 30rpx;
}

.back-hone {
    width: 328rpx;
    height: 88rpx;
    line-height: 88rpx;
    background-color: #1577ff;
    color: #fff;
    font-size: 30rpx;
    margin: 170rpx auto 0;
    padding: 0;
    border-radius: 44rpx;
}
</style>
