<template>
    <!-- pages/extension/team/team.wxml -->
    <!-- <text>pages/extension/team/team.wxml</text> -->
    <view>
        <view style="width: 100%; background: #fff; margin-bottom: 20rpx; display: flex; padding: 32rpx" v-for="(item, index) in 6" :key="index">
            <image style="width: 116rpx; height: 116rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/%E7%BB%84%205558%403x.png"></image>

            <view style="margin-left: 25rpx; display: flex; flex-direction: column; justify-content: space-between">
                <view style="font-size: 32rpx; font-weight: 900" class="u-line-1">t商品名称商品名称商品名称商品itle</view>
                <view style="font-size: 24rpx; color: #999999" class="u-line-1">
                    <text>浏览次数：999</text>
                    <text style="margin-left: 40rpx">购买次数：999</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/extension/team/team.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {}
};
</script>
<style>
/* pages/extension/team/team.wxss */
page {
    min-height: 100%;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7 !important;
}

.u-line-1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.u-line-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
