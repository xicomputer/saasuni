<template>
    <view class="store-close-container">
        <image src="https://xssj.letterbook.cn/applet/images/store_close_img.png" style="width: 500rpx; height: 662rpx"></image>
        <image @tap="toIndex" src="/static/pages/img/goods/close.png" style="width: 40rpx; height: 40rpx; margin-top: 100rpx"></image>
    </view>
</template>

<script>
// pages/Component/storeClose/index.js
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
        toIndex() {
            uni.reLaunch({
                url: '/pages/tabPage/me/me'
            });
        }
    }
};
</script>
<style>
/* pages/Component/storeClose/index.wxss */
.store-close-container {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>
