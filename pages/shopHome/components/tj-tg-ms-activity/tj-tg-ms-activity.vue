<template>
    <!-- pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity.wxml -->

    <!-- 我的组件 -->
    <!-- <view class='container-box {{tempBg}}' wx:if='{{homeActivity.length}}'>
    <view wx:for="{{homeActivity}}" wx:key="index" bindtap='jumpMore' data-activityTag="{{item.code}}">
        <image src="{{item.url}}" mode="aspectFill"></image>  
    </view> -->
    <!-- <view wx:for="{{activityList}}" wx:key="index">
        <view class="name-event" bindtap="changeActivity">
            <image src="{{img}}"></image>
            <view class="activity-container"> -->
    <!-- 上半部分 -->
    <!-- <view class="text">
                    <text>{{activityTitle}}</text>
                    <view>
                        <text>更多</text>
                        <u-icon name="arrow-right" color="#333" size="22"></u-icon>
                        <image class="more-icon" src="../../../static/images/Vector@2x.png"></image>
                    </view>
                </view> -->
    <!-- 下半部分 -->
    <!-- <view class="img">
                    <view class="single" wx:for='{{dataList}}' wx:key='index' bindtap='jumpDetail' data-item='{{item}}'>
                        <image src="{{item.imageUrl}}"></image>
                        <text class="line-clamp2">{{item.commodityName}}</text>
                        <view class="price">
                            <view class="price-new">
                                <text class="yang1">￥</text>
                                <text>{{item.priceArr[1]}}</text>
                            </view>
                            <view class="price-old">
                                <text class="yang2">￥</text>
                                <text>{{item.priceArr[0]}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view> -->
    <!-- </view> -->

    <view :class="'container-box ' + tempBg" v-if="homeActivity.length">
        <view class="single-active" @tap="jumpMore" :data-activityTag="item.code" v-for="(item, index) in activityListNew" :key="index">
            <view class="textContent">
                <image :src="item.icon"></image>
                <text>{{ item.name }}</text>
            </view>

            <image :src="item.url" mode="aspectFill"></image>

            <!-- 目前图片固定，根据后端接口返回 -->
        </view>
    </view>

    <!-- <view class='container-box {{tempBg}}' wx:if='{{dataList.length}}'>
    <view class='me-fx-row me-fx-sb-c top-title-box'>
        <text>{{activityTitle}}</text>
        <view class='me-fx-row me-fx-c-c more-str' bindtap='jumpMore'>
            <text>更多</text>
            <image class='right-icon' src='../../../img/back-icon.png'></image>
        </view>
    </view>
    <view-more-title title='{{activityTitle}}' title-color='#fff' title-size='28' img-name='t{{tempId}}-{{tempId==3?1:3}}.png' bind:click='jumpMore'></view-more-title>
    <view class='me-fx-row product-list'>
        <view class='product-item' wx:for='{{dataList}}' wx:key='index' style='margin-left:{{index%3==0?0:18}}rpx' bindtap='jumpDetail' data-item='{{item}}'>
            <image src='{{item.imageUrl}}' class='goods-img'></image>
            <view class='me-full-text goods-name'>{{item.commodityName}}</view>
            <view class='me-fx-row me-fx-sb-c'>
                <view class='price-str'>
                    <text wx:if='{{item.templateTag=="TJFL"}}'>返现</text>￥
                    <text class='price-int'>{{item.priceArr[0]}}.</text>
                    <text>{{item.priceArr[1] || '00'}}</text>
                </view>
                <text wx:if='{{item.templateTag=="TTPT"}}' class='pin-label'>拼</text>
            </view>
        </view>
    </view>
</view> -->
</template>

<script>
import viewMoreTitle from '../view-more-title/view-more-title';
// pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity.js
let app = getApp();
export default {
    components: {
        viewMoreTitle
    },
    data() {
        return {
            activityTitle: '',

            //活动标题
            activityListNew: [],

            // 存储处理好的活动
            templateTag: 'JSMS',

            //活动类型 TTPT TJFL JSMS
            //存储某个活动的商品
            dataList: [],

            tempBg: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: [String, Number],
            default: ''
        },
        tempId: {
            type: [String, Number],
            default: ''
        },
        activityType: {
            type: String,
            default: ''
        },
        homeActivity: {
            type: Array
        }
    },
    mounted: function () {},
    /* 监听数据 */
    watch: {
        homeActivity: {
            handler: function (nowVal) {
                nowVal.forEach((item, index) => {
                    this.activeIcon.forEach((i) => {
                        if (item.code == i.code) {
                            item.icon = i.icon;
                            item.url = i.url;
                        }
                    });
                });
                this.setData({
                    activityListNew: nowVal
                });
            },

            immediate: true,
            deep: true
        },
        activityType: {
            handler: function (nowVal, oldVal) {
                this.setData(
                    {
                        templateTag: nowVal
                    },
                    () => {
                        if (nowVal) {
                            this.getDataList();
                            this.getText();
                            this.getTypeTitle(); //获取活动标题
                        }
                    }
                );
            },

            immediate: true,
            deep: true
        },
        tempId: {
            handler: function (nowVal, oldVal) {
                if (nowVal) {
                    var tempBg = 'temp-box-bg-';
                    nowVal = Number(nowVal);

                    switch (nowVal) {
                        case 1:
                        case 3:
                        case 4:
                            tempBg += nowVal;
                            break;
                    }

                    this.setData({
                        tempBg
                    });
                }
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        jumpMore(e) {
            //跳转更多列表
            let activityTag = e.currentTarget.dataset.activitytag;
            var url = '/pages/special_goods/activity-classify/activity-classify';
            url += `?tagType=${activityTag}&marchantId=${this.marchantId}`;
            uni.navigateTo({
                url
            });
        },

        getTypeTitle() {
            var type = this.templateTag;
            var title = '';

            switch (type) {
                case 'TTPT':
                    title = '拼团';
                    break;

                case 'TJFL':
                    title = '邀三退一';
                    break;

                case 'JSMS':
                    title = '秒杀';
                    break;
            }

            this.setData({
                activityTitle: title
            });
        },

        //查询活动列表
        getDataList() {
            var { templateTag } = this;
            app.globalData
                .sjrequest1('/activityBusiness/pageList', {
                    pageSize: 6,
                    currentPage: 1,
                    merchantId: this.marchantId,
                    // "state": 2,
                    templateTag
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        list.forEach((item) => {
                            var skuList = item.activityCommoditySkuList || [];
                            var defSku = skuList[0] || {};
                            var showPrice = defSku.livePrice + '';
                            var priceArr = showPrice.split('.') || [];
                            item.priceArr = priceArr;
                            item.imageUrl = item.bannerImgUrls[0];
                        });
                        this.setData({
                            dataList: list
                        });
                    }
                });
        },

        jumpDetail(e) {
            //跳转单个商品详情   ，新需求不需要此接口，因为首页不显示货单商品，只显示图片
            var item = e.currentTarget.dataset.item;
            var { activityId, templateTag } = item;
            var url = '';

            if (templateTag == 'TJFL') {
                url = '/pages/businessActivity/activity_detail/activity_detail';
                url += '?activityid=' + activityId;
            } else if (templateTag == 'JSMS') {
                url = '/pages/seckill/detail/detail?activityId=' + activityId;
            } else if (templateTag == 'TTPT') {
                url = '/pages/group_booking/detail/detail?activityId=' + activityId;
            }

            uni.navigateTo({
                url
            });
        }
    }
};
</script>
<style>
/* pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity.wxss */

.container-box image {
    width: 650rpx;
    height: 200rpx;
    margin-top: 30rpx;
    border-radius: 18rpx;
}

/* 以上为图片样式 */
.more-icon {
    width: 14rpx !important;
    height: 26rpx !important;
}

.name-event {
    width: 100%;
    height: 504rpx;
    border-radius: 20rpx;
    position: relative;
}

.line-clamp2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.name-event > image {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -111;
}

.name-event .activity-container .text {
    width: 100%;
    height: 105rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-event .activity-container .text text {
    font-size: 38rpx;
    color: #333;
    font-weight: 600;
    margin-left: 25rpx;
    letter-spacing: 1rpx;
}

.name-event .activity-container .text view {
    width: 115rpx;
    height: inherit;
    margin-right: 8rpx;
    display: flex;
    align-items: center;
}

.name-event .activity-container .text view text {
    font-size: 26rpx;
    margin-right: 5rpx;
    color: #333;
    font-weight: 400;
}

.name-event .activity-container .img {
    width: 100%;
    height: 364rpx;
    display: flex;
    padding: 0 20rpx;
}

.name-event .activity-container .img .single {
    width: 205rpx;
    height: inherit;
    background-color: #fff;
    border-radius: 10rpx;
    margin-right: 20rpx;
    position: relative;
}

.name-event .activity-container .img .single image {
    width: 205rpx;
    height: 205rpx;
    border-radius: 10rpx;
    background-color: #81bed5;
}

.name-event .activity-container .img .single > text {
    width: 180rpx;
    margin-left: 14rpx;
    margin-top: 15rpx;
    font-size: 26rpx;
}

.name-event .activity-container .img .single .price {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 40rpx;
    left: 20rpx;
    width: 122rpx;
    height: 30rpx;
}

.name-event .activity-container .img .single .price .price-new {
    display: flex;
}

.name-event .activity-container .img .single .price .price-new > text {
    font-size: 38rpx;
    color: #fa6b2b;
    font-weight: 500;
}

.name-event .activity-container .img .single .price .price-new > text:nth-child(2) {
    margin-left: -6rpx;
}

.name-event .activity-container .img .single .price .price-old {
    display: flex;
    align-items: center;
    margin-top: 37rpx;
}

.name-event .activity-container .img .single .price .price-old > text {
    position: relative;
    font-size: 24rpx;
    color: #999;
}

.name-event .activity-container .img .single .price .price-old > text:nth-child(2)::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 18rpx;
    left: -15rpx;
    width: 38rpx;
    height: 3rpx;
    background: #999;
}

.container-box {
    width: 690rpx;
    border-radius: 16rpx;
    box-sizing: border-box;
    position: relative;
    margin-top: 85rpx;
}

.temp-box-bg-1 {
    background: linear-gradient(90deg, #fad7a1 0%, #e96d71 100%);
}

.temp-box-bg-4 {
    background: linear-gradient(90deg, #5db6fa 0%, #736efe 100%);
}

.temp-box-bg-3 {
    background: linear-gradient(90deg, #becbdc 0%, #24313f 100%);
}

.container-box .top-title-box {
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: 14rpx;
}

.container-box .top-title-box .more-str {
    font-size: 26rpx;
    font-weight: normal;
}

.container-box .top-title-box .more-str .right-icon {
    width: 15rpx;
    height: 26rpx;
}

.product-list {
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 18rpx;
    padding: 0 10rpx;
    box-sizing: border-box;
}

.product-list .product-item {
    width: 206rpx;
    margin-top: 20rpx;
}

.product-list .product-item .goods-img {
    width: 100%;
    height: 206rpx;
    border-radius: 12rpx;
    background-color: #ccc;
}

.product-list .product-item .goods-name {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
    margin-top: 7rpx;
}

.product-list .product-item .price-str {
    font-size: 24rpx;
    color: #ff0000;
    font-weight: bold;
}

.product-list .product-item .price-int {
    font-size: 36rpx;
}

.product-list .product-item .pin-label {
    background: linear-gradient(180deg, #ffbb38 0%, #ff4343 100%);
    width: 58rpx;
    height: 34rpx;
    border-radius: 18rpx;
    font-size: 24rpx;
    color: #fefffb;
    text-align: center;
    line-height: 34rpx;
}

.single-active {
    width: 690rpx;
    height: 326rpx;
    background-color: #fff7e2;
    border-radius: 30rpx;
    margin-bottom: 30rpx;
    box-sizing: border-box;
    padding: 40rpx 27rpx 0rpx 20rpx;
}

.single-active .textContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 227rpx;
    height: 40rpx;
    margin-left: 10rpx;
    position: relative;
}

.single-active .textContent > image {
    margin-bottom: 34rpx;
    width: 44rpx;
    height: 44rpx;
}

.single-active .textContent > text {
    font-size: 38rpx;
    font-weight: bold;
    position: absolute;
    right: 13rpx;
    top: -12rpx;
}
</style>
