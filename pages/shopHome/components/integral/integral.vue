<template>
    <view class="coupon-container">
        <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FGroup%202885%402x.png" @tap="goIntegral"></image>
    </view>
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
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {
        goIntegral() {
            //跳转到优惠券页面
            let merchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${merchantId}`
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
