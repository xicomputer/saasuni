<template>
    <view>
        <!-- components/video-button-bar.wxml -->

        <cover-image class="shop-entry" src="/static/pages/videoPlay/images/shop_entry.png" @tap="entryShop" :data-mid="itemdata.marchantId"></cover-image>

        <cover-view class="icon-container">
            <cover-view class="me-fx-row me-fx-sb">
                <cover-view class="me-fx-row me-fx-start-c">
                    <cover-image class="daizhi-img" src="/static/image/tabpage/daizhi.png"></cover-image>
                    <cover-view class="me-full-text title-text">{{ itemdata.commodityName }}</cover-view>
                    <cover-view class="member-label">会员价</cover-view>
                </cover-view>
                <cover-view class="me-fx-row me-fx-start-c">
                    <cover-view class="me-fx-row me-fx-start-c">
                        <cover-view class="symbol">￥</cover-view>
                        <cover-view class="amount-num">{{ itemdata.lowPrice }}</cover-view>
                    </cover-view>
                    <cover-view class="me-fx-row me-fx-start-c">
                        <cover-view class="symbol">— ￥</cover-view>
                        <cover-view class="amount-num">{{ itemdata.originalPrice }}</cover-view>
                    </cover-view>
                </cover-view>
            </cover-view>
            <cover-view class="me-fx-row me-fx-sb-c introduce-box">
                <cover-view class="me-full-text introduce">产品介绍：{{ itemdata.description }}</cover-view>
                <cover-view class="buy-btn" @tap="buyClick" :data-pid="itemdata.id">立即购买</cover-view>
            </cover-view>
        </cover-view>
    </view>
</template>

<script>
// components/video-button-bar.js
export default {
    data() {
        return {};
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        itemdata: Object
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toolBarButton: function (e) {
            const { buttontype, buttonname, itemid } = e.currentTarget.dataset;
            this.$emit('buttonhandle', {
                detail: {
                    buttontype,
                    buttonname,
                    itemid
                }
            });
        },

        entryShop(e) {
            var mid = e.currentTarget.dataset.mid;
            var url = '/pages/shopHome/home/home?marchantId=' + mid;
            uni.navigateTo({
                url
            });
        },

        buyClick(e) {
            var pid = e.currentTarget.dataset.pid;
            var url = '/pages/Index/GoodsDetails/GoodsDetails?id=' + pid;
            uni.navigateTo({
                url
            });
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css'; /* components/video-button-bar.wxss */

.icon-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20rpx;
    box-sizing: border-box;
}
.daizhi-img {
    width: 32rpx;
    height: 32rpx;
}
.title-text {
    font-size: 32rpx;
    color: #fff;
    max-width: 236rpx;
    font-weight: bold;
    margin: 0 10rpx;
}
.member-label {
    font-size: 20rpx;
    background-color: #ff0000;
    padding: 5rpx 10rpx;
    border-radius: 6rpx;
}

.symbol {
    font-size: 24rpx;
    color: #fff;
    font-weight: bold;
}
.amount-num {
    font-size: 36rpx;
    color: #fff;
    font-weight: bold;
    padding-right: 5rpx;
}

.introduce-box {
    margin-top: 20rpx;
}
.introduce {
    width: 500rpx;
    font-size: 20rpx;
    color: #fff;
    -webkit-line-clamp: 2;
}
.buy-btn {
    font-size: 26rpx;
    color: #fff;
    font-weight: bold;
    padding: 10rpx;
    background-color: #e23e3e;
    border-radius: 8rpx;
}

.shop-entry {
    position: absolute;
    bottom: 220rpx;
    right: 30rpx;
    width: 88rpx;
    height: 88rpx;
    z-index: 999;
}
</style>
