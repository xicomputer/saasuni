<template>
    <view class="category">
        <view class="item" v-if="item.commodityList.length > 0" v-for="(item, key) in goodsList" :key="key">
            <view class="title">
                <view class="left">
                    <view class="tips"></view>
                    <view class="name">{{ item.classifyName }}系列</view>
                </view>
                <navigator
                    :url="'/pages/Index/GoodsList/GoodsList?category=' + item.classifyName + '&marchantId=' + marchantId + '&classifyId=' + item.id + '&orderType=' + orderType"
                    class="right"
                >
                    <view class="more">更多</view>
                    <image src="/static/pages/img/my/more.png" class="img" />
                </navigator>
            </view>

            <scroll-view scroll-x style="height: 325rpx">
                <view style="display: flex">
                    <navigator :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id" v-for="(item, index) in item.commodityList" :key="index">
                        <view class="content">
                            <view class="left">
                                <image class="img" :src="item.thumbnail" mode="aspectFill" />
                            </view>
                            <view class="right">
                                <view class="name">{{ item.commodityName }}</view>
                                <view class="price">
                                    ￥
                                    <text class="money">{{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}</text>
                                </view>
                                <view class="desc">产品介绍：{{ item.description }}</view>
                            </view>
                        </view>
                    </navigator>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/category1/category1.js
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
/* pages/Index/components/category1/category1.wxss */
.category {
    position: relative;
    width: 100%;
}
.category .item {
    height: 435rpx;
}
.category .item .title {
    width: 100%;
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.category .item .title .left {
    display: flex;
    justify-content: center;
    align-items: center;
}
.category .item .title .left .tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.category .item .title .left .name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.category .item .title .right {
    display: flex;
    justify-content: center;
    align-items: center;
}
.category .item .title .right .more {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #cccccc;
    padding-right: 8rpx;
}
.category .item .title .right .img {
    width: 24rpx;
    height: 24rpx;
}
.category .item .content {
    width: 590rpx;
    height: 325rpx;
    background: linear-gradient(180deg, #ffb54d 0%, #ef7d1a 100%);
    box-shadow: 0px 5rpx 10rpx rgba(40, 14, 0, 0.15);
    border-radius: 20rpx;
    display: flex;
    margin-right: 20rpx;
}
.category .item .content .left .img {
    width: 381rpx;
    height: 325rpx;
    border-radius: 20rpx 0 0 20rpx;
}
.category .item .content .right {
    font-family: PingFang SC;
    color: #ffffff;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.category .item .content .right .name {
    font-size: 28rpx;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.category .item .content .right .price {
    font-size: 22rpx;
}
.category .item .content .right .price .money {
    font-size: 28rpx;
    font-weight: bold;
}
.category .item .content .right .desc {
    font-size: 24rpx;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
</style>
