<template>
    <view class="classify-list">
        <view class="classify-item" v-for="(item, ci) in 3" :key="item.ci">
            <view class="me-fx-row me-fx-sb-c itemp-top">
                <text class="class-title">百合系列系列</text>
                <text class="even-more">查看更多 ></text>
            </view>

            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row goods-list">
                    <view class="me-fx-col me-fx-c-c goods-item" v-for="(item, index) in 6" :key="index">
                        <image src="" class="goods-img"></image>

                        <text class="now-price">￥562</text>

                        <view class="add-cart">立即加购</view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/category6/category6.js
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
    padding: 30rpx 30rpx 0;
    box-sizing: border-box;
}
.classify-item .goods-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 12rpx;
}
.classify-item .class-title {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
}
.classify-item .even-more {
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 10rpx;
    background-color: #fe4f4f;
    border-radius: 20rpx;
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
}
.now-price {
    font-size: 28rpx;
    color: #ff0000;
    font-weight: bold;
}
.add-cart {
    background-color: #fe4f4f;
    color: #fff;
    padding: 0rpx 10rpx;
    font-size: 22rpx;
    border-radius: 20rpx;
}
</style>
