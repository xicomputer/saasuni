<template>
    <view class="category">
        <view class="category_item" v-if="item.commodityList.length > 0" v-for="(item, key) in goodsList" :key="key">
            <view class="category-top">
                <text class="classify-name">{{ item.classifyName }}</text>
                <navigator
                    class="category-left-btn"
                    :url="'/pages/Index/GoodsList/GoodsList?category=' + item.classifyName + '&marchantId=' + marchantId + '&classifyId=' + item.id + '&orderType=' + orderType"
                >
                    进入专柜>
                </navigator>
            </view>

            <scroll-view scroll-x style="height: 284rpx; width: 100%; border-radius: 8rpx; overflow: hidden">
                <view class="category-list">
                    <navigator class="category-list-goods" :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id" v-for="(item, index) in item.commodityList" :key="index">
                        <image class="category-list-goods-img" :src="item.thumbnail" mode="aspectFill"></image>

                        <view class="category-list-goods-name">{{ item.commodityName }}</view>

                        <view class="category-list-goods-price-box">
                            <text class="category-list-goods-nowprice">
                                <text style="font-size: 24rpx">￥</text>
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
    height: 370rpx;
    background: linear-gradient(90deg, #ff3236 0%, #ff8163 100%);
    border-radius: 12rpx;
    padding: 10rpx;
    box-sizing: border-box;
    margin-top: 16rpx;
}
.category-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
}
.classify-name {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.category-left-btn {
    width: 138rpx;
    height: 40rpx;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 6rpx #ff4742;
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
}
.category-list {
    display: flex;
    flex-wrap: nowrap;
    height: 284rpx;
    background: #fff;
    padding: 0 6rpx;
}
.category-list-goods {
    width: 164rpx;
    height: 284rpx;
    padding: 0 10rpx;
    background: #fff;
}
.category-list-goods-img {
    width: 164rpx;
    height: 164rpx;
    margin: 12rpx auto;
    border-radius: 8rpx;
}
.category-list-goods-name {
    width: 164rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8rpx;
}
.category-list-goods-price-box {
    width: 100%;
    height: 42rpx;
    display: flex;
    align-items: flex-end;
}
.category-list-goods-nowprice {
    height: 42rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
}
.category-list-goods-origin-price {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    text-decoration: line-through;
    margin-left: 10rpx;
}
</style>
