<template>
    <!-- pages/shopHome/components/union/union.wxml -->
    <!-- 联盟门店 -->
    <view class="union-shop">
        <view class="me-fx-row me-fx-c-c title-box">
            <!-- <image class='adorn-img' wx:if="{{tempId != '3'}}" src='{{tempBaseUrl+"temp-img/title_adorn.png"}}'></image> -->
            <image class="adorn-img" src="/static/pages/static/img_l2.png"></image>
            <text :class="'title-text ' + ('textColor' + tempId)">商家联盟</text>
            <!-- <image class='adorn-img' wx:if="{{tempId != '3'}}" src='{{tempBaseUrl+"temp-img/title_adorn.png"}}'></image> -->
            <image class="adorn-img" src="/static/pages/static/img_r2.png"></image>
        </view>
        <view class="item-box" :data-appid="item.appletInfo.authorizerAppid" @tap="jumpApplet" v-for="(item, index) in shopList" :key="index">
            <view class="me-fx-row me-fx-sb-c item-top">
                <image class="avatar-img" :src="item.logoPic"></image>
                <text class="me-fx-1 title-text">{{ item.nickName }}</text>
                <text class="enter-btn">进店</text>
            </view>

            <view class="me-fx-row me-fx-sb-c">
                <view class="me-fx-col me-fx-c-c" v-for="(temp, ti) in item.commodityList" :key="temp.ti">
                    <image :src="temp.thumbnail" class="product-img"></image>

                    <view class="me-fx-row me-fx-c-c price-box">
                        <text>￥</text>
                        <text class="price-num">{{ temp.originalPrice }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/union/union.js
export default {
    data() {
        return {
            tempBaseUrl: 'https://xssj.letterbook.cn/applet/images/',

            temp: {
                ti: '',
                thumbnail: '',
                originalPrice: ''
            }
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: String,
            default: ''
        },
        tempId: {
            type: [String, Number],
            default: 1
        },
        shopList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        jumpApplet(e) {
            var appId = e.currentTarget.dataset.appid;
            uni.navigateToMiniProgram({
                appId
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css'; /* pages/shopHome/components/union/union.wxss */
.union-shop {
    margin-top: 40rpx;
}
.union-shop .title-box {
    margin-bottom: 20rpx;
}
.union-shop .adorn-img {
    width: 41rpx;
    height: 29rpx;
}
.union-shop .title-text {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
    margin: 0 20rpx;
}

.union-info {
    height: 158rpx;
    border-radius: 12rpx;
    background-color: #f9f1e4;
    margin: 0px 20px 20rpx;
}
.Info_msg {
    padding: 20rpx 0rpx 20rpx 48rpx;
    width: 400rpx;
    flex-shrink: 0;
}
.Info_msg_img {
    width: 116rpx;
    height: 116rpx;
    border-radius: 16rpx;
    flex-shrink: 0;
}
.shop_msg_info {
    padding-left: 24rpx;
    height: 116rpx;
}
.shop_msg {
    color: #d1a463;
    font-size: 20rpx;
}
.new_msg {
    color: #000000;
    font-size: 34rpx;
    font-weight: bold;
}
.new_desc {
    font-size: 20rpx;
    color: #9c948b;
    -webkit-line-clamp: 2;
}
.activitys_Info_btn {
    color: #fff;
    background-color: #ffd098;
    font-size: 20rpx;
    padding: 14rpx 30rpx;
    margin-right: 15rpx;
    border-radius: 6rpx;
}

/* 模板颜色 */
.text_color1 {
    color: #fe4f4f;
}
.btn_bg1 {
    background-color: #fe4f4f;
}

.text_color2 {
    color: #111833;
}
.btn_bg2 {
    background-color: #111833;
}

.text_color3 {
    color: #333333;
}
.btn_bg3 {
    background-color: #333333;
}

.text_color4 {
    color: #9ec06c;
}
.btn_bg4 {
    background-color: #9ec06c;
}
.union-shop .textColor3 {
    color: #000;
}

.item-box {
    width: 690rpx;
    background-color: #fff;
    border-radius: 18rpx;
    margin: 20rpx auto;
    padding: 16rpx;
    box-sizing: border-box;
}
.item-box .item-top {
    margin-bottom: 34rpx;
}
.item-box .avatar-img {
    width: 50rpx;
    height: 50rpx;
    background-color: #ccc;
    border-radius: 50%;
}
.item-box .title-text {
    font-size: 34rpx;
    color: #000;
    font-weight: bold;
}
.item-box .enter-btn {
    width: 134rpx;
    height: 46rpx;
    border-radius: 28rpx;
    font-size: 24rpx;
    background: linear-gradient(92deg, #ec0702 0%, #f83603 100%);
    color: #fff;
    text-align: center;
    line-height: 46rpx;
}
.item-box .product-img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 15rpx;
}
.item-box .price-box {
    font-size: 22rpx;
    color: #ff1c1c;
    font-weight: bold;
}
.item-box .price-num {
    font-size: 36rpx;
}
</style>
