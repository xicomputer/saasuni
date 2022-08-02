<template>
    <!-- pages/shopHome/union/union.wxml -->
    <view class="union">
        <view class="union_info me-fx-row" v-for="(item, index) in 8" :key="index">
            <view class="union_left">
                <image class="union_img"></image>
                <view class="union_pro_title"><text class="me-full-text">商品名称商品名称商品名称</text></view>
                <view class="union_btn">店铺联盟</view>
            </view>

            <view class="union_right me-fx-1 me-fx-col">
                <view class="union_shop_title me-fx-row me-fx-start-c">
                    <image class="shop_icon"></image>
                    <text class="shop_title">邵阳人和</text>
                </view>
                <text class="union_desc me-full-text">
                    初次线上开店，多多关照初次线上开店，多多关照初次线上开店，多多关照初次线上开店，多多关照初次线上开店，多多关照初次线上开店，多多关照初次线上开店，多多关照
                </text>
                <view class="union_right_pro me-fx-row me-fx-sb">
                    <view class="right_pro" v-for="(item, index1) in 3" :key="index1">
                        <view class="pro_bg"></view>

                        <text class="pro_price me-full-text">￥509.00</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/union/union.js
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
@import '../../../styles/me_common.css'; /* pages/shopHome/union/union.wxss */
page {
    background-color: #f9f9f9;
}
.union_info {
    height: 328rpx;
    margin: 32rpx 32rpx 0rpx;
    background-color: #fff;
    border-radius: 20rpx;
    overflow: hidden;
}
.union_left {
    position: relative;
}
.union_img {
    width: 290rpx;
    height: 328rpx;
    background: #000;
}
.union_pro_title {
    position: absolute;
    bottom: 15rpx;
    width: 290rpx;
    text-align: center;
}
.union_pro_title > text {
    color: #fff;
    font-size: 22rpx;
    font-weight: bold;
    padding: 0rpx 20rpx;
    letter-spacing: 1rpx;
}
.union_btn {
    position: absolute;
    top: 15rpx;
    left: 20rpx;
    background-color: #ff6363;
    color: #fff;
    font-size: 20rpx;
    letter-spacing: 1rpx;
    padding: 5rpx 10rpx;
    border-radius: 6rpx;
}
.union_right {
    padding: 20rpx;
}
.shop_icon {
    width: 40rpx;
    height: 40rpx;
    background-color: #000;
    border-radius: 50%;
    margin-right: 20rpx;
}
.shop_title {
    font-size: 28rpx;
}
.union_desc {
    text-indent: 60rpx;
    font-size: 20rpx;
    color: #999999;
    -webkit-line-clamp: 4;
    height: 128rpx;
    flex-shrink: 0;
}
.union_right_pro {
    margin-top: 10rpx;
}
.right_pro {
    width: 112rpx;
    height: 112rpx;
    background-color: #999999;
    border-radius: 8rpx;
    position: relative;
    overflow: hidden;
}
.pro_bg {
    position: absolute;
    width: 100%;
    height: 32rpx;
    bottom: 0;
    background-color: #000;
    opacity: 0.6;
}
.pro_price {
    position: absolute;
    font-size: 20rpx;
    color: #fff;
    bottom: 0;
    width: 100%;
    text-align: center;
}
.union_info:last-child {
    margin-bottom: 32rpx;
}
</style>
