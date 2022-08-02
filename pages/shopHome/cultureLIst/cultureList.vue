<template>
    <!-- pages/shopHome/cultureLIst/cultureList.wxml -->
    <view>
        <view class="Article me-fx-col">
            <block v-for="(item, index) in ArticleList" :key="index">
                <view class="me-fx-row" @tap="toWebViewPage" :data-link="item.linkurl">
                    <image mode="aspectFit" class="culture-img" :src="item.articlecover"></image>
                    <view class="me-fx-col me-fx-sb Article_info">
                        <text class="culture_title me-full-text">{{ item.articletitle }}</text>
                        <text class="culture_time">{{ item.createtime }}</text>
                    </view>
                </view>

                <view v-if="ArticleList.length - 1 != index" class="line"></view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/shopHome/cultureLIst/cultureList.js
const app = getApp();
export default {
    data() {
        return {
            ArticleList: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getArticle();
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
    methods: {
        getArticle() {
            let merchantId = uni.getStorageSync('merchantId');
            app.globalData
                .sjrequest('/marchant/selectArticle', {
                    merchantId
                })
                .then((res) => {
                    this.setData({
                        ArticleList: res.data.data
                    });
                });
        },

        toWebViewPage(e) {
            var link = e.currentTarget.dataset.link;
            uni.navigateTo({
                url: '/pages/shopHome/webView/webView?link=' + link
            });
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css'; /* pages/shopHome/cultureLIst/cultureList.wxss */
.Article {
    margin: 20rpx 30rpx;
}
.culture-img {
    width: 216rpx;
    height: 120rpx;
    border-radius: 8rpx;
}
.Article_info {
    margin-left: 20rpx;
    flex: 1;
}
.culture_title {
    font-size: #333;
    font-size: 28rpx;
    line-height: 28rpx;
    -webkit-line-clamp: 2;
}
.culture_time {
    text-align: right;
    font-size: 24rpx;
    color: #acacac;
    display: flex;
    justify-content: flex-end;
}
.line {
    border-top: 1px solid #333333;
    margin: 30rpx;
    opacity: 0.1;
}
</style>
