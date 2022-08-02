<template>
    <view class="classify-list">
        <view class="classify-item" v-for="(item, ci) in 3" :key="item.ci">
            <view class="me-fx-row me-fx-sb-c itemp-top">
                <view class="me-fx-row me-fx-c-c me-fx-1">
                    <image class="adom-img" src="/static/pages/Index/static/adom1.png"></image>
                    <text class="class-title">百合系列系列</text>
                    <image class="adom-img" src="/static/pages/Index/static/adom2.png"></image>
                </view>
                <image src="/static/pages/Index/static/right.png" class="right-point"></image>
            </view>

            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row goods-list">
                    <view class="me-fx-col me-fx-c-c goods-item" v-for="(item, index) in 6" :key="index">
                        <image src="" class="goods-img"></image>

                        <view class="name">名称名称名称名名称名称名称名</view>

                        <text class="now-price">￥562</text>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/category7/index.js
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
    methods: {}
};
</script>
<style>
@import '../../../../styles/me_common.css';

.classify-item {
    background-color: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
}
.classify-item:not(:first-child) {
    margin-top: 20rpx;
}
.classify-item .itemp-top {
    position: relative;
    padding: 20rpx 30rpx 0;
    box-sizing: border-box;
}
.itemp-top .adom-img {
    width: 41rpx;
    height: 22rpx;
}
.itemp-top .class-title {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin: 0 12rpx;
}
.itemp-top .right-point {
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: 30rpx;
    right: 20rpx;
}

.goods-scroll {
    padding: 0 30rpx;
    box-sizing: border-box;
}
.goods-list {
    padding: 30rpx 0;
}
.goods-item {
    flex-shrink: 0;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
    width: 192rpx;
    border-radius: 20rpx;
    overflow: hidden;
}
.goods-item:not(:first-child) {
    margin-left: 20rpx;
}
.goods-img {
    width: 184rpx;
    height: 184rpx;
    background-color: #ccc;
}
.goods-item .name {
    font-size: 24rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
}
.now-price {
    font-size: 28rpx;
    color: #ff0000;
    font-weight: bold;
}
</style>
