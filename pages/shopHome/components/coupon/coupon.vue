<template>
    <!-- <view class="coupon-container">
	<image src="../../../static/images/Group 2913@2x.png" bindtap="members"></image>
</view> -->

    <!-- <view class="coupon-container">
	<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FGroup%202913%402x.png"  bindtap="aciveUrl"  data-url="/pages/shopHome/member/member"></image>
</view> -->

    <view @tap="aciveUrl" data-url="/pages/shopHome/member/member" style="width: 90rpx; height: 90rpx; position: absolute; z-index: 9999; margin-left: -45rpx"></view>
</template>

<script>
// pages/shopHome/components/Article/Article.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: String,
        mainBusinessModel: String
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转到优惠券页面
        members() {
            let marchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: `/pages/Index/couponList/couponList?marchantId=${marchantId}`
            });
        },

        aciveUrl(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = this.marchantId;
            var mainBusinessModel = this.mainBusinessModel;
            console.log(marchantId);
            uni.navigateTo({
                url: url + '?marchantId=' + marchantId + '&mainOrderType=' + mainBusinessModel
            });
        }
    }
};
</script>
<style>
.coupon-container image {
    width: 336rpx;
    height: 268rpx;
}
</style>
