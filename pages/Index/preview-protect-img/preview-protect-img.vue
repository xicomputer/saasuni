<template>
    <!-- pages/Index/preview-protect-img/preview-protect-img.wxml -->

    <view class="me-fx-col me-fx-c-c preview-img-page">
        <image :src="showImg" class="img"></image>
        <image :src="watermarkUrl" class="watermark-img"></image>
    </view>
</template>

<script>
// pages/Index/preview-protect-img/preview-protect-img.js
export default {
    data() {
        return {
            showImg: '',
            watermarkUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/watermark.png'
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var query = decodeURIComponent(options.query);
        query = JSON.parse(query);
        var imgUrl = query.imgUrl || '';
        this.setData({
            showImg: imgUrl
        });
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
     */
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
/* pages/Index/preview-protect-img/preview-protect-img.wxss */

.preview-img-page {
    width: 100%;
    height: 100vh;
    background-color: #000;
    position: realtive;
}

.preview-img-page .img {
    width: 540rpx;
    height: 940rpx;
    background-color: #ccc;
}
.preview-img-page .watermark-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
