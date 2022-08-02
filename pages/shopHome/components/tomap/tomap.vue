<template>
    <view class="coupon-container" style="z-index: 120; display: flex; justify-content: right; align-items: center" @tap="clickMap">
        <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/map.png" style="width: 50rpx; height: 50rpx" mode="aspectFill"></image>
        <text style="font-size: 28rpx; font-family: sans-serif; color: #fff; font-weight: 900">去店里</text>
    </view>
    <!-- <map id="map" longitude="{{businessInfo.longitude}}" address="{{businessInfo.address}}" latitude="{{businessInfo.latitude}}"  scale="18"  style="width: 100%; height: 300px;background:#000 ;" bindtap="clickMap"></map> -->
</template>

<script>
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        address: {
            type: String,
            default: ''
        },
        latitude: {
            type: Number,
            default: 0
        },
        longitude: {
            type: Number,
            default: 0
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        clickMap: function (e) {
            uni.openLocation({
                latitude: this.latitude,
                longitude: this.longitude,
                scale: 18,
                address: this.address
            });
        }
    }
};
</script>
<style>
/* pages/shopHome/components/map/map.wxss */
</style>
