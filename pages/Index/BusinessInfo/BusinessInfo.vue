<template>
    <!-- pages/Index/BusinessInfo/BusinessInfo.wxml -->
    <view class="business">
        <view class="business_title">资质认证</view>
        <view class="me-fx-col business_info">
            <view class="me-fx-row me-fx-sb">
                <text>店铺名称</text>
                <text>{{ shopInfo.appletInfo.nickName }}</text>
            </view>
            <view class="me-fx-row me-fx-sb">
                <text>主体认证</text>
                <view @tap="showImg">
                    <text>{{ shopInfo.appletInfo.principalName }}</text>
                    <image class="bus_return" src="/static/pages/static/bus_return.png"></image>
                </view>
            </view>
            <view class="me-fx-row me-fx-sb">
                <text>营业时间</text>
                <text>{{ shopInfo.merchant.openingTime }}-{{ shopInfo.merchant.closingTime }}</text>
            </view>
            <view class="me-fx-row me-fx-sb">
                <text>店铺类型</text>
                <text>{{ shopInfo.type ? '个体工商户' : '企业' }}</text>
            </view>
            <view class="me-fx-row me-fx-sb">
                <text>开店时间</text>
                <text>{{ shopInfo.appletInfo.createDate }}</text>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Index/BusinessInfo/BusinessInfo.js
const app = getApp();
export default {
    data() {
        return {
            shopInfo: {
                appletInfo: {
                    nickName: '',
                    principalName: '',
                    createDate: ''
                },

                merchant: {
                    openingTime: '',
                    closingTime: ''
                },

                type: false
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getShopInfo();
    },
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
        getShopInfo() {
            let ids = uni.getStorageSync('merchantId');
            app.globalData
                .sjrequest('/marchant/subjectInfo', {
                    merchantId: ids
                })
                .then((res) => {
                    let info = res.data.data;

                    if (info.subjectType.indexOf('INDIVIDUAL')) {
                        info.type = true;
                    } else {
                        info.type = false;
                    }

                    this.setData({
                        shopInfo: info
                    });
                });
        },

        showImg() {
            let img = this.shopInfo.licenseUrl; // wx.previewImage({urls:[img]});

            var query = {
                imgUrl: img
            };
            query = encodeURIComponent(JSON.stringify(query));
            uni.navigateTo({
                url: '/pages/Index/preview-protect-img/preview-protect-img?query=' + query
            });
        }
        /**
         * 用户点击右上角分享
         */
    }
};
</script>
<style>
@import '../../../styles/me_common.css'; /* pages/Index/BusinessInfo/BusinessInfo.wxss */
.business {
    margin: 10rpx 32rpx;
}
.business_title {
    color: #000;
    font-weight: bold;
    font-size: 32rpx;
    margin-bottom: 20rpx;
}
.bus_return {
    width: 29rpx;
    height: 29rpx;
}
.business_info {
    color: #666666;
    font-size: 26rpx;
}
.business_info > view {
    margin-bottom: 20rpx;
}
</style>
