<template>
    <!-- pages/shopHome/components/culture/culture.wxml -->
    <view class="culture-box" v-if="ArticleList.length">
        <view class="me-fx-row me-fx-c-c title-box">
            <!-- <image class='adorn-img' wx:if="{{tempId != 2}}" src='../../../static/img_l2.png'></image> -->
            <!-- <image class='adorn-img' wx:else src='{{tempBaseUrl+"temp-img/title_adorn.png"}}'></image> -->
            <!-- <text class='title-text {{"textColor"+tempId}}' style='color:{{tempId==2?"#fff":"#333"}}'>商家文化</text> -->
            <!-- <image class='adorn-img' wx:if="{{tempId != 2}}" src='../../../static/img_r2.png'></image> -->
            <!-- <image class='adorn-img' wx:else src='{{tempBaseUrl+"temp-img/title_adorn.png"}}'></image> -->

            <view class="more" @tap="goMore" :style="'color:' + (tempId == 2 ? '#fff' : '#333')">
                <text>商家文化</text>
                <text class="icon icon-right"></text>
            </view>
        </view>
        <view class="me-fx-row me-fx-sb culture-img-list other_list" v-if="tempId < 5">
            <block v-for="(item, index) in ArticleList" :key="index">
                <view class="ArticleList" @tap="toWebViewPage" :data-link="item.linkurl">
                    <image mode="aspectFit" class="culture-img" :src="item.articlecover"></image>
                    <view class="ArtiBox me-fx-row" :style="'color:' + (tempId == 2 ? '#fff' : '#333')">
                        <text class="me-full-text">{{ item.articletitle }}</text>
                    </view>
                </view>
            </block>
        </view>
        <view class="me-fx-col culture-list2" v-if="tempId == 6">
            <block v-for="(item, index) in ArticleList" :key="index">
                <view class="ArticleList2 me-fx-row me-fx-sb" v-if="index < 3" @tap="toWebViewPage" :data-link="item.linkurl">
                    <view class="culture2_info me-fx-col me-fx-sb">
                        <text class="culture2_title">{{ item.articletitle }}</text>
                        <text class="culture2_time">{{ item.createtime }}</text>
                    </view>
                    <image mode="aspectFit" class="culture2-img" :src="item.articlecover"></image>
                </view>

                <view v-if="ArticleList.length > 3 ? index < 2 : ArticleList.length - 1 != index" class="line"></view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/culture/culture.js
export default {
    data() {
        return {
            tempBaseUrl: 'https://xssj.letterbook.cn/applet/images/'
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tempId: {
            type: [String, Number],
            default: ''
        },
        ArticleList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toWebViewPage(e) {
            var link = e.currentTarget.dataset.link;
            uni.navigateTo({
                url: '/pages/shopHome/webView/webView?link=' + link
            });
        },

        goMore() {
            uni.navigateTo({
                url: '/pages/shopHome/cultureLIst/cultureList'
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';
@import '../../iconfont/iconfont.css'; /* pages/shopHome/components/culture/culture.wxss */
/* 文化 */
.culture-box {
    margin-top: 20rpx;
}
.culture-box .title-box {
    margin: 0rpx 32rpx 20rpx;
    position: relative;
    height: 30rpx;
}
.culture-box .adorn-img {
    width: 41rpx;
    height: 29rpx;
}
.culture-box .title-text {
    font-size: 40rpx;
    color: #fff;
    font-weight: bold;
    margin: 0 20rpx;
}
.culture-box .culture-img-list {
    flex-wrap: wrap;
    margin: 0 32rpx 20rpx;
    box-sizing: border-box;
}
.culture-box .culture-img {
    width: 332rpx;
    height: 200rpx;
    border-radius: 16rpx;
}
.ArticleList {
    position: relative;
    margin-bottom: 10rpx;
    width: 332rpx;
}
.ArtiBox {
    color: #fff;
    width: 100%;
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
    text-align: center;
    font-size: 22rpx;
    margin-top: 8rpx;
}
.ArtiBox > text {
    -webkit-line-clamp: 2;
    width: 100%;
}
.other_list {
    flex-wrap: nowrap !important;
    overflow-x: scroll;
}
.other_list > view {
    margin-right: 20rpx;
}
.culture-box .textColor3 {
    color: #000;
}
.more {
    color: #333;
    font-size: 24rpx;
    position: absolute;
    right: 0rpx;
}
.icon-right {
    font-size: 24rpx;
}

/* 模板2 */
.culture-list2 {
    margin: 0rpx 32rpx;
    color: #fff;
    margin-bottom: 30rpx;
}
.culture2-img {
    width: 216rpx;
    height: 120rpx;
    flex-shrink: 0;
    border-radius: 8rpx;
}
.culture2_title {
    font-size: 28rpx;
    line-height: 30rpx;
    padding-right: 20rpx;
}
.culture2_time {
    font-size: 24rpx;
    color: #acacac;
}
.line {
    border-top: 1px solid #ffffff;
    margin: 30rpx;
    opacity: 0.1;
}
</style>
