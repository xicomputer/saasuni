<template>
    <view>
        <!-- 推荐酒店 -->
        <swiper :autoplay="true" class="retail-swiper" v-if="shopList.length">
            <block v-for="(item, index) in shopList" :key="index">
                <swiper-item
                    class="retail-item"
                    style="background-image: url(https://xssj.letterbook.cn/applet/images/index_retail_bg_img.png)"
                    @tap="toMarchant"
                    :data-idx="index"
                >
                    <view class="index-retail-name">{{ item.nickName }}</view>
                    <view class="index-retail-goods-box" @tap.stop.prevent="toGoodsDetail" :data-id="item.commodity.commodityId">
                        <image class="index-retail-goods-img" mode="aspectFill" :src="item.commodity.thumbnail"></image>
                        <view class="index-retail-goods-content">
                            <view class="index-retail-goods-name">{{ item.commodity.commodityName }}</view>
                            <view class="index-retail-goods-description">{{ item.commodity.description }}</view>
                            <view class="index-retail-goods-price">
                                <text style="font-size: 16rpx">￥</text>
                                {{
                                    item.commodity.activityType == 1 || (item.commodity.activityType == 2 && item.commodity.isMember)
                                        ? item.commodity.lowPrice
                                        : item.commodity.originalPrice
                                }}
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>

<script>
// pages/Index/components/retail/index.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        shopList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳店铺
        toMarchant(e) {
            let idx = e.currentTarget.dataset.idx;

            if (this.shopList[idx].marchantCorrelation.source == 1) {
                uni.navigateTo({
                    url: `/pages/shopHome/home/home?marchantId=${this.shopList[idx].id}`
                });
            } else if (this.shopList[idx].marchantCorrelation.source == 2) {
                uni.navigateToMiniProgram({
                    appId: 'wxef3acba44e5aa9ab',
                    path: `pages/hotel/index?hotelId=${this.shopList[idx].marchantCorrelation.correlationId}`
                });
            } // url="./Index?marchantId={{item.marchantId}}"
        },

        toGoodsDetail(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id
            });
        }
    }
};
</script>
<style>
.retail-swiper {
    width: 100%;
    height: 130rpx;
    margin-top: 20rpx;
}
.retail-item {
    width: 100%;
    height: 130rpx;
    box-sizing: border-box;
    background-size: 100% 130rpx;
    position: relative;
    overflow: hidden;
    display: flex;
}
.retail-item:after {
    position: absolute;
    left: -30%;
    top: 0;
    width: 30%;
    height: 100%;
    content: '';
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
    transform: skewX(45deg);
    animation: biubiu 3s linear -2s infinite;
}
@keyframes biubiu {
    0% {
        left: -30%;
    }
    30% {
        left: -30%;
    }
    100% {
        left: 100%;
    }
}
.index-retail-name {
    width: 330rpx;
    margin-top: 46rpx;
    height: 82rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    font-size: 48rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: bold;
    color: #0077ff;
    text-align: center;
    line-height: 82rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.index-retail-goods-box {
    width: 400rpx;
    height: 108rpx;
    margin-top: 10rpx;
    display: flex;
}
.index-retail-goods-img {
    width: 108rpx;
    height: 108rpx;
}
.index-retail-goods-content {
    flex: 1;
    padding: 2rpx 6rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.index-retail-goods-name {
    width: 280rpx;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.index-retail-goods-description {
    width: 100%;
    max-height: 44rpx;
    font-size: 16rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 20rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.index-retail-goods-price {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #ff0000;
}
</style>
