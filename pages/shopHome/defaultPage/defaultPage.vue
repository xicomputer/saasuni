<template>
    <!-- pages/shopHome/defaultPage/defaultPage.wxml -->
    <view class="no-data-container" :style="'height:' + height + 'vh'">
        <image
            class="no-data-container-img"
            mode="heightFix"
            :style="'height:' + (height - 10) + 'vh'"
            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/%E7%BB%84%205558%403x.png"
        ></image>
        <view class="no-data-container-text">商家未开启</view>
    </view>
</template>

<script>
// pages/shopHome/cultureLIst/cultureList.js
const app = getApp();
export default {
    data() {
        return {
            type: '',
            height: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.type = options.query;
        console.log(this.type, 'type');
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
    methods: {}
};
</script>
<style>
/* pages/shopHome/defaultPage/defaultPage.wxss */
/* pages/Component/noData/index.wxss */
.no-data-container {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-data-container-img {
    height: 424rpx;
}

.no-data-container-text {
    margin-top: 10rpx;
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
</style>
