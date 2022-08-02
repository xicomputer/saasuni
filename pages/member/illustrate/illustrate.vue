<template>
    <view class="explain-container">
        <view class="explain-title">会员说明：</view>
        <view class="explaine-text">1、会员卡是商家为您提供尊贵服务的凭证，持有会员卡在购买会员商品时能享受会员折扣;</view>
        <view class="explaine-text">
            2、点击“激活会员卡”向商家申请会员卡，需要商家进行审核，若审核通过后即可成为普通会员；若审核不通过，会在本页面显示商家拒绝理由，您可以联系商家进行沟通后重新激活会员卡;
        </view>
        <view class="explaine-text">
            3、首次成为会员，成为基础会员等级 “普通会员”，普通会员不享受会员折扣权益，但能通过购买商品获得积分，升级会员等级，级别越高，折扣力度越大；
        </view>
        <view class="explaine-text">4、不同商家的会员规则稍有不同，具体会员规则详情请成为会员后，在会员卡区查看。</view>
    </view>
</template>

<script>
// pages/member/illustrate/illustrate.js
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
     */ methods: {}
};
</script>
<style>
.explain-container {
    width: 100%;
    height: 100vh;
    padding: 40rpx 20rpx;
    box-sizing: border-box;
}
.explain-title {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
.explaine-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
    margin-top: 20rpx;
}
</style>
