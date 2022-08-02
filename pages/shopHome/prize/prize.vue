<template>
    <!-- pages/shopHome/prize/prize.wxml -->
    <view class="prize">
        <view class="me-fx-col me-fx-c-c">
            <view class="prizeInfo" style="background-image: url(/pages/static/Price_bg.png)">
                <image class="prize_img" src="/static/pages/shopHome/prize/imgs/goldTama.png"></image>
                <view class="me-fx-row me-fx-sb prize_txt me-fx-start-c">
                    <view class="me-fx-col">
                        <text class="prize_Number">砸金蛋一等奖</text>
                        <text class="prize_date">2021年6月5日</text>
                    </view>
                    <text class="prize_ok">去兑奖</text>
                </view>
            </view>
            <view class="prizeInfo" style="background-image: url(/pages/static/Price_bg.png)">
                <image class="prize_img" src="/static/pages/static/ge.png"></image>
                <view class="me-fx-row me-fx-sb prize_txt me-fx-start-c">
                    <view class="me-fx-col">
                        <text class="prize_Number">九宫格抽奖一等奖</text>
                        <text class="prize_date">2021年6月5日</text>
                    </view>
                    <text class="prize_ok">去兑奖</text>
                </view>
            </view>
            <view class="prizeInfo" style="background-image: url(/pages/static/Price_bg.png)">
                <image class="prize_img" src="/static/pages/shopHome/prize/imgs/goldTama.png"></image>
                <view class="me-fx-row me-fx-sb prize_txt me-fx-start-c">
                    <view class="me-fx-col">
                        <text class="prize_Number">砸金蛋一等奖</text>
                        <text class="prize_date">2021年6月5日</text>
                    </view>
                    <text class="prize_ok">去兑奖</text>
                </view>
                <view class="isfalse"></view>
            </view>
            <view class="prizeInfo" style="background-image: url(/pages/static/Price_bg.png)">
                <image class="prize_img" src="/static/pages/static/ge.png"></image>
                <view class="me-fx-row me-fx-sb prize_txt me-fx-start-c">
                    <view class="me-fx-col">
                        <text class="prize_Number">九宫格抽奖一等奖</text>
                        <text class="prize_date">2021年6月5日</text>
                    </view>
                    <text class="prize_ok">去兑奖</text>
                </view>
                <view class="isfalse"></view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/prize/prize.js
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
    methods: {}
};
</script>
<style>
@import '../../../styles/me_common.css'; /* pages/shopHome/prize/prize.wxss */
page {
    background-color: #f7f7f7;
}
.prize > view {
    margin-bottom: 20rpx;
}
.isfalse {
    background-color: #fff;
    position: absolute;
    height: 338rpx;
    width: 686rpx;
    top: 0;
    opacity: 0.7;
}
.prizeInfo {
    position: relative;
    width: 686rpx;
    height: 338rpx;
    background-size: 100% 100%;
    margin-top: 20rpx;
    border-radius: 30rpx;
    overflow: hidden;
}
.prize_img {
    width: 634rpx;
    height: 184rpx;
    margin: 20rpx 30rpx;
}
.prize_txt {
    margin: 20rpx 30rpx;
}
.prize_Number {
    font-size: 24rpx;
    color: #666666;
    font-weight: bold;
}
.prize_date {
    font-size: 20rpx;
    color: #666666;
}
.prize_ok {
    font-size: 24rpx;
    color: #f95244;
    font-weight: bold;
}
</style>
