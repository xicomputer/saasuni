<template>
    <view>
        <block v-if="storeDynamicList.length">
            <navigator
                class="store-dynamic-top"
                hover-class="none"
                :url="'/pages/Index/dynamic/storeDynamicList/storeDynamicList?marchantId=' + marchantId + '&isSubscribe=' + markerInfo.subscribe + '&status=' + status"
            >
                <image class="store-dynamic-img-bg" src="/static/pages/img/index/dynamic/index_dynamic_store_bg.png"></image>
            </navigator>
            <swiper style="width: 100%; height: 754rpx; box-shadow: 0rpx 0rpx 20rpx #ffd1c1; border-radius: 16rpx" :autoplay="true" @change="changeSwiper">
                <block v-for="(item, index) in storeDynamicList" :key="index">
                    <swiper-item class="store-danamic-item">
                        <navigator class="store-danamic-content" hover-class="none" :url="'/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?id=' + item.id">
                            <view class="store-info-box">
                                <image class="store-dynamic-logo" :src="item.userInfo.logoPic"></image>
                                <view class="store-dynamic-box-info">
                                    <view class="store-dynamic-name">{{ item.userInfo.nickname }}</view>
                                    <view class="store-dynamic-time">{{ item.addTime }}</view>
                                </view>
                                <view
                                    class="dingyue-btn"
                                    @tap.stop.prevent="parseEventDynamicCode($event, markerInfo.subscribe ? '' : 'showDingYue')"
                                    :style="markerInfo.subscribe ? 'background-color:#e4e4e4;color:#FFF' : ''"
                                >
                                    {{ markerInfo.subscribe ? '已订阅' : '+订阅' }}
                                </view>
                            </view>
                            <view class="store-dynamic-text">{{ item.content }}</view>
                            <view class="store-dynamic-img-list">
                                <image
                                    :class="item.commodity ? 'store-dynamic-img' : 'store-dynamic-img store-dynamic-big-img'"
                                    @tap.stop.prevent="imgClick"
                                    :data-list="item.imagList"
                                    :data-src="pitem"
                                    mode="aspectFill"
                                    :src="pitem"
                                    v-if="!((!item.commodity && index >= 1) || (item.commodity && index >= 2))"
                                    v-for="(pitem, index1) in item.imagList"
                                    :key="index1"
                                >
                                    <view class="store-dynamic-img-more" v-if="!((item.commodity && index != 1) || (!item.commodity && index != 0))">
                                        +{{ item.commodity ? item.imagList.length - 2 : item.imagList.length - 1 }}
                                    </view>
                                </image>
                            </view>
                            <!-- 商品信息 -->
                            <view class="dynamic-goods-container" v-if="item.commodity" @tap.stop.prevent="toBuy" :data-id="item.commodity.id">
                                <image :src="item.commodity.thumbnail" class="dynamic-goods-container-img" mode="aspecFill"></image>
                                <view class="dynamic-goods-container-content">
                                    <view class="dynamic-goods-container-name">{{ item.commodity.commodityName }}</view>
                                    <view class="dynamic-goods-container-text">{{ item.commodity.description }}</view>
                                    <view class="dynamic-goods-bottom">
                                        <view class="dynamic-goods-container-price">
                                            <text style="font-size: 22rpx">￥</text>
                                            {{
                                                item.commodity.activityType == 1 || (item.commodity.activityType == 2 && item.commodity.isMember)
                                                    ? item.commodity.lowPrice
                                                    : item.commodity.originalPrice
                                            }}
                                        </view>
                                        <view class="dynamic-goods-container-btn">购买商品</view>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                        <!-- <view class="store-dynamic-bottom">
          <view class="store-dynamic-bottom-item" catchtap="{{markerInfo.subscribe?'':'showDingYue'}}">
            <image class="store-dynamic-bottom-item-icon" src="{{markerInfo.subscribe?'/pages/img/index/dynamic/dingyued.png':'/pages/img/index/dynamic/dingyue.png'}}"></image>
            <text>{{markerInfo.subscribe?'已订阅':'订阅'}}</text>
          </view>
          <navigator class="store-dynamic-bottom-item" hover-class="none" url="/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?id={{item.id}}&isFocus=true">
            <image class="store-dynamic-bottom-item-icon" src="/pages/img/index/dynamic/comment.png"></image>
            <text>{{item.reply||'评论'}}</text>
          </navigator>
          <view class="store-dynamic-bottom-item" catchtap="operationPraise" data-id="{{item.id}}" data-idx="{{index}}">
            <image class="store-dynamic-bottom-item-icon" src="{{item.isPraise?'/pages/img/index/dynamic/praised.png':'/pages/img/index/dynamic/praise.png'}}"></image>
            <text style="white-space:nowrap">{{item.praise||'点赞'}}</text>
          </view>
        </view> -->
                    </swiper-item>
                </block>
            </swiper>
            <view class="store-bottom-solid" :style="'width:' + 100 / storeDynamicList.length + '%;margin-left:' + (100 / storeDynamicList.length) * swiperIndex + '%'"></view>
        </block>
        <hotel v-if="hotelList.length" :hotelList="hotelList"></hotel>
        <!-- 优质评论 -->
        <block v-if="commentList.length">
            <navigator
                class="store-dynamic-top"
                style="margin-top: 20rpx"
                hover-class="none"
                :url="'/pages/Index/dynamic/commentList/commentList?marchantId=' + marchantId + '&stick=1'"
            >
                <image class="store-dynamic-img-bg" src="/static/pages/img/index/dynamic/index_dynamic_user_bg.png"></image>
            </navigator>
            <block v-for="(item, index) in commentList" :key="index">
                <view class="user-dynamic-itme">
                    <view class="store-info-box">
                        <image class="store-dynamic-logo" :src="item.userInfo.headimgurl"></image>
                        <view class="store-dynamic-box-info">
                            <view class="user-dynamic-name-box">
                                <view class="user-dynamic-name">{{ item.userInfo.nickname }}</view>
                                <image class="user-dynamic-member" v-if="item.isMember" src="/static/pages/img/index/member_icon.png"></image>
                                <view class="user-dynamic-tip">优质评论</view>
                            </view>
                            <view class="user-dynamic-signature">{{ item.userInfo.signature || '暂无个性签名' }}</view>
                        </view>
                        <view class="user-info-right-top">
                            <view>{{ item.addTime }}</view>
                            <view class="user-info-solid"></view>
                            <view class="user-info-icon" @tap.stop.prevent="operationPraiseUser" :data-id="item.id" :data-idx="index">
                                <image
                                    class="store-dynamic-bottom-item-icon"
                                    :src="item.isPraise ? '/pages/img/index/dynamic/praised.png' : '/pages/img/index/dynamic/praise.png'"
                                ></image>
                                <text style="white-space: nowrap">{{ item.praise || '点赞' }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="user-dynamic-text">{{ item.content }}</view>
                    <scroll-view style="width: 100%; padding-top: 20rpx" scroll-x v-if="item.imagList.length">
                        <view class="user-img-list">
                            <image
                                :class="item.imagList.length >= 3 ? 'user-img-item user-small-img' : 'user-img-item'"
                                @tap.stop.prevent="imgClick"
                                :data-list="item.imagList"
                                :data-src="pitem"
                                mode="aspectFill"
                                :src="pitem"
                                v-for="(pitem, index1) in item.imagList"
                                :key="index1"
                            ></image>
                        </view>
                    </scroll-view>
                </view>
            </block>
        </block>
        <no-data v-if="!storeDynamicList.length && !commentList.length" text="暂无动态消息" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img7.png"></no-data>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
import hotel from '@/pages/Index/components/hotel/index';
// pages/Index/components/dynamic/dynamic.js
const app = getApp();

const time = require('../../../../utils/util');

export default {
    components: {
        noData,
        hotel
    },
    data() {
        return {
            storeDynamicList: [],
            commentList: [],
            swiperIndex: 0,
            pitem: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: Number,
            default: 0
        },
        markerInfo: {
            type: Object,
            default: () => ({})
        },
        status: {
            type: Number,
            default: 1
        },
        hotelList: {
            type: Array,
            default: () => []
        }
    },
    onPageShow: function () {
        // 获取商家动态
        let data = {
            marchantId: this.marchantId,
            pageCurr: 1,
            pageSize: 10,
            isMarchant: 1,
            stick: 1
        };
        let data1 = {
            marchantId: this.marchantId,
            pageCurr: 1,
            pageSize: 10,
            isMarchant: 0,
            stick: 1
        };
        app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
            if (res.data.code == 200) {
                res.data.data.forEach((item) => {
                    item.addTime = time.formatTime(item.addTime);
                });
                this.setData({
                    storeDynamicList: res.data.data
                });
            }
        });
        return app.globalData.sjrequest('/marchant/queryMarchantComment', data1).then((res) => {
            res.data.data.forEach((item) => {
                item.addTime = time.formatTime(item.addTime);
            });
            this.setData({
                commentList: res.data.data
            });
        });
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**图片预览 */
        imgClick(e) {
            var src = e.currentTarget.dataset.src;
            var imgList = e.currentTarget.dataset.list;
            uni.previewImage({
                current: src,
                urls: imgList
            });
        },

        changeSwiper(e) {
            this.setData({
                swiperIndex: e.detail.current
            });
        },

        toStoreDetail(e) {
            let item = JSON.stringify(e.currentTarget.dataset.item);
            uni.navigateTo({
                url: '/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?item=' + encodeURIComponent(item)
            });
        },

        toBuy(e) {
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.id
            });
        },

        showDingYue() {
            this.$emit('showDingYue');
        },

        // 点赞/取消
        operationPraise(e) {
            let el = e.currentTarget.dataset;
            let data = {
                commentId: el.id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                let isPraise = `storeDynamicList[${el.idx}].isPraise`;
                let praise = `storeDynamicList[${el.idx}].praise`;

                if (this.storeDynamicList[el.idx].isPraise) {
                    this.storeDynamicList[el.idx].praise = this.storeDynamicList[el.idx].praise - 1;
                    this.storeDynamicList[el.idx].isPraise = 0;
                } else {
                    this.storeDynamicList[el.idx].praise = this.storeDynamicList[el.idx].praise + 1;
                    this.storeDynamicList[el.idx].isPraise = 1;
                }
            });
        },

        operationPraiseUser(e) {
            let el = e.currentTarget.dataset;
            let data = {
                commentId: el.id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                let isPraise = `commentList[${el.idx}].isPraise`;
                let praise = `commentList[${el.idx}].praise`;

                if (this.commentList[el.idx].isPraise) {
                    this.commentList[el.idx].praise = this.commentList[el.idx].praise - 1;
                    this.commentList[el.idx].isPraise = 0;
                } else {
                    this.commentList[el.idx].praise = this.commentList[el.idx].praise + 1;
                    this.commentList[el.idx].isPraise = 1;
                }
            });
        }
    }
};
</script>
<style>
.store-dynamic-top {
    width: 100%;
    display: flex;
    justify-content: center;
}
.store-dynamic-img-bg {
    width: 710rpx;
    height: 74rpx;
    vertical-align: middle;
}
/* 商家动态 */
.store-danamic-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 16rpx;
}
.store-bottom-solid {
    width: 100%;
    height: 4rpx;
    background: #fe4a0b;
    margin-left: 0rpx;
    transition: margin-left 0.3s;
}
.store-danamic-content {
    width: 100%;
    height: 750rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.store-info-box {
    width: 100%;
    height: 62rpx;
    display: flex;
    align-items: center;
}
.store-dynamic-logo {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
}
.store-dynamic-box-info {
    flex: 1;
    margin-left: 20rpx;
}
.store-dynamic-name {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.store-dynamic-time {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
}
.dingyue-btn {
    width: 110rpx;
    height: 46rpx;
    background: rgba(254, 74, 11, 0.25);
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fe4a0b;
}
.store-dynamic-text {
    width: 100%;
    margin-top: 16rpx;
    height: 72rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    vertical-align: middle;
}
.store-dynamic-img-list {
    width: 100%;
    display: flex;
    padding: 20rpx 0;
}
.store-dynamic-img {
    width: 320rpx;
    height: 320rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
    position: relative;
}
.store-dynamic-big-img {
    width: 540rpx;
    height: 540rpx;
}
.store-dynamic-img-more {
    width: 86rpx;
    height: 38rpx;
    background: #fe4a0b;
    border-radius: 20rpx 0rpx 0rpx 20rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 20rpx;
}
/* 商品 */
.dynamic-goods-container {
    width: 100%;
    height: 220rpx;
    padding: 20rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
}
.dynamic-goods-container-img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 10rpx;
}
.dynamic-goods-container-content {
    flex: 1;
    height: 180rpx;
    margin-left: 18rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.dynamic-goods-container-name {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dynamic-goods-container-text {
    width: 100%;
    max-height: 64rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.dynamic-goods-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dynamic-goods-container-price {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.dynamic-goods-container-btn {
    width: 160rpx;
    height: 50rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.store-dynamic-bottom {
    width: 100%;
    height: 104rpx;
    padding: 0 156rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.store-dynamic-bottom-item {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}
.store-dynamic-bottom-item-icon {
    width: 40rpx;
    height: 40rpx;
}
/* 优质评论 */
.user-dynamic-itme {
    width: 100%;
    background-color: #fff;
    padding: 20rpx 30rpx 20rpx 20rpx;
    box-sizing: border-box;
    margin-top: 10rpx;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.1);
}
.user-info-right-top {
    display: flex;
    align-items: start;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.user-info-solid {
    width: 2rpx;
    height: 34rpx;
    background-color: #666;
    margin: 0 20rpx;
}
.user-info-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22rpx;
    color: #333333;
}
.user-dynamic-name-box {
    flex: 1;
    display: flex;
    align-items: center;
}
.user-dynamic-name {
    max-width: 200rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10rpx;
}
.user-dynamic-member {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
}
.user-dynamic-tip {
    width: 88rpx;
    height: 32rpx;
    background: #fe4a0b;
    border-radius: 24rpx 24rpx 24rpx 0rpx;
    font-size: 20rpx;
    font-family: HuXiaoBo-NanShen;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-dynamic-signature {
    max-width: 300rpx;
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
.user-dynamic-text {
    width: 100%;
    margin-top: 16rpx;
    max-height: 72rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    vertical-align: middle;
}
/* 用户图片 */
.user-img-list {
    width: fit-content;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.user-img-item {
    width: 320rpx;
    height: 320rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-right: 20rpx;
}
.user-small-img {
    width: 220rpx;
    height: 220rpx;
    border-radius: 10rpx;
}
</style>
