<template>
    <view class="category">
        <view class="category_item" v-if="item.commodityList.length > 0" v-for="(item, key) in goodsList" :key="key">
            <view class="category-left">
                <text class="classify-name">{{ item.classifyName }}</text>
                <navigator
                    class="category-left-btn"
                    :url="'/pages/Index/GoodsList/GoodsList?category=' + item.classifyName + '&marchantId=' + marchantId + '&classifyId=' + item.id + '&orderType=' + orderType"
                >
                    进入专柜>
                </navigator>
            </view>

            <scroll-view scroll-x style="height: 252rpx; width: 532rpx; margin-left: 10rpx">
                <view class="category-list">
                    <navigator class="category-list-goods" :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id" v-for="(item, index) in item.commodityList" :key="index">
                        <image class="category-list-goods-img" :src="item.thumbnail" mode="aspectFill"></image>

                        <view class="category-list-goods-name">{{ item.commodityName }}</view>

                        <view class="category-list-goods-price-box">
                            <text class="category-list-goods-nowprice">
                                <text style="font-size: 20rpx">￥</text>
                                {{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                            </text>
                            <text class="category-list-goods-origin-price" v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)">
                                ￥{{ item.originalPrice }}
                            </text>
                        </view>
                    </navigator>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/category2/index.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: Number,
            default: 0
        },
        goodsList: {
            type: Array,
            default: () => []
        },
        orderType: {
            type: Number,
            default: 0
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
};
</script>
<style>
.category {
    width: 100%;
}
.category_item {
    width: 100%;
    height: 252rpx;
    display: flex;
    align-items: center;
    margin-top: 16rpx;
}
.category-left {
    width: 208rpx;
    height: 252rpx;
    background: linear-gradient(90deg, #ff3236 0%, #ff8163 100%);
    box-shadow: 6rpx 0rpx 12rpx rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.classify-name {
    width: 168rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #ffffff;
    text-align: center;
}
.category-left-btn {
    width: 138rpx;
    height: 40rpx;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 6rpx #ff4742;
    border-radius: 26rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ff0000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;
}
.category-list {
    width: fit-content;
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    min-width: 542rpx;
    background-color: #fff;
}
.category-list-goods {
    width: 160rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-right: 30rpx;
}
.category-list-goods-img {
    width: 120rpx;
    height: 120rpx;
}
.category-list-goods-name {
    width: 140rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}
.category-list-goods-price-box {
    width: 140rpx;
    display: flex;
    align-items: flex-end;
}
.category-list-goods-nowprice {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
}
.category-list-goods-origin-price {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    margin-left: 10rpx;
    color: #999999;
    text-decoration: line-through;
}
</style>
