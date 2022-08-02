<template>
    <view>
        <!-- 推荐酒店 -->
        <swiper :autoplay="true" class="hotel-swiper" v-if="hotelList.length">
            <block v-for="(item, index) in hotelList" :key="index">
                <swiper-item
                    class="hotel-item"
                    style="background-image: url(https://xssj.letterbook.cn/applet/images/index_hotel_bg_img.png)"
                    @tap="toHotelStore"
                    :data-id="item.marchantCorrelation.correlationId"
                >
                    <view class="index-hotel-name-box">
                        <view class="index-hotel-name-border">
                            <view class="index-hotel-name">{{ item.nickName }}</view>
                        </view>
                    </view>
                    <view class="index-hotel-ads">{{ item.entirelyAddress }}让你轻松订房</view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>

<script>
// pages/Index/components/hotel/index.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        hotelList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toHotelStore(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateToMiniProgram({
                appId: 'wxef3acba44e5aa9ab',
                path: `pages/hotel/index?hotelId=${id}`
            });
        }
    }
};
</script>
<style>
/* pages/Index/components/hotel/index.wxss */ /* 推荐酒店 */
.hotel-swiper {
    width: 100%;
    height: 130rpx;
    margin-top: 20rpx;
}
.hotel-item {
    width: 100%;
    height: 130rpx;
    box-sizing: border-box;
    background-size: 100% 130rpx;
    position: relative;
    overflow: hidden;
}
.hotel-item:after {
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
.index-hotel-name-box {
    width: 420rpx;
    height: 90rpx;
    margin-left: 330rpx;
    padding-top: 22rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.index-hotel-name-border {
    width: fit-content;
    padding: 0rpx 8rpx 0 10rpx;
    height: 56rpx;
    border: 2rpx solid #a5a6a8;
    box-sizing: border-box;
}
.index-hotel-name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    display: flex;
    justify-content: center;
    line-height: 44rpx;
    width: fit-content;
    height: 56rpx;
    border: 2rpx solid #a5a6a8;
    margin-top: 8rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
}
.index-hotel-ads {
    width: 100%;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #0077ff;
    letter-spacing: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
