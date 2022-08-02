<template>
    <view class="classify-list">
        <view class="classify-item">
            <view class="me-fx-row me-fx-sb-c">
                <view class="me-fx-row me-fx-start-c">
                    <image src="/static/pages/Index/static/goods.png" class="goods-icon"></image>
                    <text class="class-title">百合系列系列</text>
                </view>
                <text class="even-more">更多 ></text>
            </view>
            <view class="goods-list">
                <view
                    :style="'z-index:' + (3 - index) * 10"
                    :class="'me-fx-row goods-item ' + (index == 0 ? 'pos1' : index == 2 ? 'pos2' : '')"
                    @touchstart="touchstartFun"
                    @touchend="tounchendFun"
                    v-for="(item, index) in 3"
                    :key="index"
                >
                    <image class="goods-img" src=""></image>

                    <view class="goods-info">
                        <view class="name">商品名称商品名称{{ index }}</view>
                        <view class="introduce">产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</view>
                        <view class="price">
                            <text>￥</text>
                            <text class="price-num">38</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/category4/index.js
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
        touchstartFun(e) {
            console.log(e);
        },

        tounchendFun(e) {
            console.log(e);
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

.classify-item {
    padding: 18rpx 16rpx;
    background-color: #fff;
    border-radius: 20rpx;
}
.classify-item .goods-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 12rpx;
}
.classify-item .class-title {
    font-size: 32rpx;
    color: #663610;
    font-weight: bold;
}
.classify-item .even-more {
    font-size: 24rpx;
    color: #666;
}

.goods-list {
    margin-top: 38rpx;
    position: relative;
    height: 240rpx;
    width: 100%;
}
.goods-list .goods-item {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 228rpx;
    width: 598rpx;
}
.pos1 {
    transform: translate(-8rpx, -8rpx);
}
.pos2 {
    transform: translate(8rpx, 8rpx);
}
.goods-item .goods-img {
    width: 244rpx;
    height: 228rpx;
    background-color: #ccc;
    flex-shrink: 0;
    vertical-align: middle;
}
.goods-item .goods-info {
    padding: 12rpx 20rpx 12rpx 16rpx;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 228rpx;
}
.goods-item .name {
    font-size: 32rpx;
}
.goods-item .introduce {
    font-size: 24rpx;
    color: #666;
}
.goods-item .price {
    font-size: 24rpx;
    color: #ff0000;
    font-weight: bold;
}
.goods-item .price-num {
    font-size: 40rpx;
}
</style>
