<template>
    <!-- banner图 -->

    <!-- <view wx:if="{{tempId !=3.1}}">

    <image wx:if="{{settingImg.top.fileurl.length < 2 && settingImg.hasTop}}" src="{{settingImg.top.fileurl[0]}}" mode="aspectFill" class="index1_img">
    </image>
    <video wx:if="{{settingImg.top.fileurl.length > 1}}" src="{{settingImg.top.fileurl[1]}}" mode="aspectFit" class="index1_img2" autoplay="true" muted="true" controls="true" show-mute-btn="true" show-play-btn="true" />

    <view class="noimg" wx:if="{{settingImg.hasTop}}"></view>
    <view class="abImg {{tempId == 12?'bgHeight':''}}">
        <view class="banner_info">
            <swiper class='swiper-box {{swiperHeight}}' autoplay circular>
                <swiper-item wx:for='{{banners}}' wx:key='index' bindtap="goShopDeatial" data-id="{{item.commodityId}}">
                    <view class='swiper-item-content {{itemContent}}'>
                        <image src='{{item.thumbnail}}' class='item-img'></image>
                        <view wx:if="{{tempId != 12}}" class="me-full-text banner_text">{{item.description}}</view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</view> -->
    <view class="static-Img" @tap="goShopDeatial" :data-id="mainBanner.commodityId" v-if="mainBanner.fileurl">
        <image :src="mainBanner.fileurl"></image>
    </view>

    <!-- 下面是数组形式 -->
    <!-- <view wx:else>
    <view class="abImg {{tempId == 12?'bgHeight':''}}" style="position: relative;">
        <view class="banner_info">
            <swiper class='swiper-box {{swiperHeight}}' autoplay style="height:316rpx" indicator-dots="true">
                <swiper-item wx:for='{{banners}}' wx:key='index' bindtap="goShopDeatial" data-id="{{item.commodityId}}">
                    <view class='swiper-item-content {{itemContent}}'>
                        <image src='{{item.thumbnail}}' class='item-img' mode="aspectFill"></image>
                    </view>
                </swiper-item>
            </swiper>
        </view>
    </view>

    <view class="noimg" style="margin-top: 100rpx;"></view>

    <image style="height: 307rpx; width: 690rpx;  margin-left:30rpx; border-radius: 10rpx;  margin-bottom: 30rpx; " wx:if="{{settingImg.top.fileurl.length < 2 && settingImg.hasTop}}" src="{{settingImg.top.fileurl[0]}}" mode="aspectFill" class="index1_img"></image>
</view> -->
</template>

<script>
import notice from '../notice/notice';
// pages/Index/shopHome/components/banner/banner.js
export default {
    components: {
        notice
    },
    data() {
        return {
            isShowbanner: false,
            aaa: '',
            swiperHeight: '',
            itemContent: '',
            noticeBox: '',
            contentBox: '',
            textColor: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        jifenNum: {
            type: [String, Number],
            default: 0
        },
        // addcouponList: {
        //     type: [String, Number],
        //     default: 0
        // },//7.16
        userInfo: {
            type: Object,
            default: () => ({})
        },
        tempId: {
            type: [String, Number],
            default: 1
        },
        banners: {
            type: Array,
            default: () => []
        },
        appName: {
            type: [String],
            default: []
        },
        settingImg: {
            type: Object
        },
        mainOrderType: {
            type: String,
            default: ''
        },
        mainBanner: {
            type: [Array, Object]
        }
    },
    beforeMount: function () {
        console.log(9999, this);
        this.getTempClass();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goIntegral() {
            let merchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${merchantId}`
            });
        },

        gotomy() {
            uni.setNavigationBarTitle({
                title: '我的'
            });
            let text = '我的';
            this.$emit('myManager', {
                detail: text
            });
        },

        members() {
            let marchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: `/pages/Index/couponList/couponList?marchantId=${marchantId}`
            });
        },

        getTempClass() {
            var tempId = this.tempId + '';
            var swiperHeight = '';
            var itemContent = '';
            switch (tempId) {
                case '12':
                    swiperHeight = 'swiper-height4';
                    break;

                default:
                    swiperHeight = 'swiper-height1';
            }

            switch (tempId) {
                case '12':
                    itemContent = 'item-content2';
                    break;

                default:
                    itemContent = 'item-content1';
            }

            this.setData({
                swiperHeight,
                itemContent
            });
        },

        goShopDeatial(e) {
            var id = e.currentTarget.dataset.id;
            var mainOrderType = this.mainOrderType;
            var url = '/pages/Index/GoodsDetails/GoodsDetails?id=' + id;

            if (mainOrderType == 2 || mainOrderType == 3) {
                if (mainOrderType == 2) {
                    url += `&city=1`;
                } //同城

                if (mainOrderType == 3) {
                    url += `&reserve=1`;
                } //预订
            }

            if (id) {
                uni.navigateTo({
                    url
                });
            }
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';
@import '../../../../styles/font.css';

.top-bg-img {
    width: 750rpx;
    height: 368rpx;
    position: absolute;
    left: 0;
    top: 0;
}

.appName {
    font-family: 'HWKS_font';
    color: #fae8dd;
    font-size: 60rpx;
    position: absolute;
    top: 50rpx;
    right: 30rpx;
}

.swiper-item-content {
    height: 100%;
}

.swiper-item-content .item-img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    /* border:1px solid #000000 ; */
}

.swiper-height2 {
    height: 860rpx;
}

.swiper-height3 {
    height: 904rpx;
}

.swiper-height1 {
    /* height:530rpx; */
    height: 750rpx;
}

/* padding:20rpx 32rpx; */
.item-content1 {
    box-sizing: border-box;
    position: relative;
}

.item-content1 .item-img {
    border-radius: 20rpx;
    width: 100% !important;
    height: 100% !important;
}

.item-content2 {
    padding: 20rpx 0;
    box-sizing: border-box;
}

.banner_text {
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 33rpx;
    color: #f7f8f8;
    position: absolute;
    bottom: 0rpx;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    font-weight: bold;
    letter-spacing: 1rpx;
    -webkit-line-clamp: 2;
}

.banner_info {
    position: relative;
}

.shop_Info {
    height: 310rpx;
    background-color: #fff;
    position: absolute;
    width: 100%;
    border-top-left-radius: 40rpx;
    bottom: -100rpx;
    border-top-right-radius: 40rpx;
}

.Info_shop {
    position: relative;
}

.shop_img {
    width: 144rpx;
    height: 144rpx;
    background-color: #999998;
    position: absolute;
    left: 20rpx;
    top: -72rpx;
}

.shop_msg {
    margin: 100rpx 20rpx 40rpx;
}

.shop_title {
    font-size: 32rpx;
    color: #333333;
    font-weight: bold;
}

.shop_desc {
    font-size: 22rpx;
    -webkit-line-clamp: 2;
    margin-top: 50rpx;
    padding: 20rpx 0rpx 0rpx;
    border-top: 1px solid #e6e6e6;
    color: #666666;
}

.bgHeight {
    height: 630rpx;
}

.index1_img {
    width: 100%;
    height: 630rpx;
}

.index1_img2 {
    width: 710rpx;
    margin-left: 20rpx;
    border-radius: 10rpx;
}

/* .abImg{position: absolute; bottom: -345rpx;width: 100%;} */
.abheight {
    height: 345rpx;
}

.abheight1 {
    height: 80rpx;
}

.index2_img {
    width: 100%;
    height: 500rpx;
}

.abImg2 {
    top: 190rpx;
    position: absolute;
    width: 100%;
}

.notice-box {
    width: 690rpx;
    height: 60rpx;
    top: 190rpx;
    border-radius: 30rpx;
    color: #fff;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.4);
}

.notice-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.notice-content {
    font-size: 24rpx;
    line-height: 40rpx;
}

.icon-notice {
    margin-right: 10rpx;
}

.notice-box1 {
    background-color: #fff;
    border-radius: 20rpx;
}

.content-box1 {
    background-color: #fff;
    border-radius: 26rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
}

.headTop {
    top: 0rpx;
}

.noimg {
    height: 20rpx;
}

.abImg {
    margin: 30rpx 0rpx -93rpx;
}

.static-Img > image {
    margin-top: 30rpx;
    width: 693rpx;
    height: 316rpx;
    border-radius: 20rpx;
}
</style>
