<template>
    <view style="margin-top: 40rpx">
        <view class="Article me-fx-col">
            <block :key="index" v-for="(item, index) in ArticleList">
                <view class="me-fx-row" @tap="toWebViewPage" :data-link="item.linkurl">
                    <image mode="aspectFit" class="culture-img" :src="item.articlecover"></image>
                    <view class="me-fx-col me-fx-sb Article_info">
                        <text class="culture_title me-full-text">{{ item.articletitle }}</text>
                        <text class="culture_time">{{ item.createtime }}</text>
                    </view>
                </view>

                <view v-if="ArticleList.length - 1 != index" class="line"></view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/Article/Article.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        ArticleList: {
            type: Array
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
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css'; /* pages/shopHome/cultureLIst/cultureList.wxss */
.Article {
    margin: 20rpx 30rpx;
}
.culture-img {
    width: 216rpx;
    height: 120rpx;
    border-radius: 8rpx;
}
.Article_info {
    margin-left: 20rpx;
    flex: 1;
}
.culture_title {
    font-size: #333;
    font-size: 30rpx;
    line-height: 30rpx;
    -webkit-line-clamp: 2;
}
.culture_time {
    text-align: right;
    font-size: 24rpx;
    color: #acacac;
    display: flex;
    justify-content: flex-end;
}
.line {
    border-top: 1px solid #333333;
    margin: 30rpx;
    opacity: 0.1;
}
</style>
