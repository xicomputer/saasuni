<template>
    <view class="shops-slogan" v-if="ArticleList.length !== 0">
        <view class="video" v-if="settingImg.top.fileurl.length > 1">
            <video
                :src="settingImg.top.fileurl[1]"
                mode="aspectFit"
                class="index1_img2"
                :autoplay="true"
                :muted="true"
                :controls="true"
                :show-mute-btn="true"
                :show-play-btn="true"
            >
                视频
            </video>
        </view>
        <view class="text">
            <text style="color: rgb(255, 0, 0); font-weight: 800">品质 · 文化</text>
            <text style="color: #bbbbbb; font-weight: 700">文化是一家企业的灵魂</text>
        </view>
        <!-- <view>
                <text>更多</text>
                <image class="more-icon" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png" mode="widthFix"></image>
            </view>  -->
        <view class="slogan-container">
            <!-- 上半部分 -->
            <!-- 下半部分 -->
            <view class="single" @tap="toWebViewPage" :data-link="item.linkurl" v-for="(item, index) in ArticleList" :key="index">
                <image :src="item.articlecover" mode="aspectFill"></image>

                <text class="line-clamp2" style="font-weight: 700">{{ item.articletitle }}</text>
            </view>
        </view>
        <!-- <view class="support  page-foot3   support2">- 信书技术支持 -</view> -->
        <view class="support support2 page-foot3">
            <image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
        </view>
    </view>
    <!-- 缺省页 -->
    <!-- <view class="default" wx:else>
    <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%BB%84%205537%402x.png"></image>
    <text>商户还没有添加动态哦!</text>
</view> -->
</template>

<script>
// pages/Index/shopHome/components/search/search.js
const app = getApp();
export default {
    data() {
        return {
            settingImg: [] // 存储商家上传的视频
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        ArticleList: {
            type: Array
        },
        marchantId: {
            type: [String, Number],
            default: ''
        },
        settingImg: {
            type: [Object, Number, String, Array]
        } // subscribe: {
        //     type: Number,
        //     value: 1
        // },
        // heights:{
        //     type: [String, Number],
        // },
        // fixed:{
        //     type:Boolean,
        //     value:true,
        // }
    },
    beforeMount: function () {},
    /**
     * 组件的方法列表
     */
    methods: {
        aciveUrl(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = this.marchantId;
            var mainBusinessModel = this.mainBusinessModel;
            uni.navigateTo({
                url: url + '?marchantId=' + marchantId + '&mainOrderType=' + mainBusinessModel
            });
        },

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
.support {
    font-size: 20rpx;
    text-align: center;
    color: rgb(0, 0, 0);
    height: 60rpx;
    /* background-color: rgb(150, 73, 73); */
    font-weight: bold;
}

.more-icon {
    width: 14rpx !important;
    height: 26rpx !important;
}
.shops-slogan {
    width: 100%;
    background-color: #fff;
    padding: 52rpx 30rpx 140rpx 30rpx;
    box-sizing: border-box;
}
.slogan-container {
    /* background-color: #fff; */
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.shops-slogan .text {
    width: 400rpx;
    height: 140rpx;
    display: flex;
    flex-direction: column;
}
.shops-slogan .text text:nth-of-type(1) {
    font-size: 38rpx;
    color: #505050;
    font-weight: 900;
}
.shops-slogan .text text:nth-of-type(2) {
    font-size: 24rpx;
    color: rgb(151, 151, 151);
}

/* .shops-slogan .slogan-container .text view {
	width: 115rpx;
	height: inherit;
	display: flex;
	align-items: center;
  }
  
  .shops-slogan .slogan-container .text view text {
	font-size: 26rpx;
	margin-right: 5rpx;
	color: #ababab;
  } */

.shops-slogan .slogan-container .single {
    width: 700rpx;
    /* height: 570rpx; */
    background-color: rgb(243 243 243);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 20rpx;
    margin-bottom: 30rpx;
}
.shops-slogan .slogan-container .single image {
    width: 700rpx;
    height: 376rpx;
    border-radius: 20rpx 20rpx 0 0;
}
.shops-slogan .slogan-container .single text {
    font-size: 28rpx;
    width: 636rpx;
    /* height: 160rpx; */
    margin-top: 28rpx;
    letter-spacing: 1rpx;
}
.default {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: relative;
}
.default text {
    position: absolute;
    top: 800rpx;
    left: 200rpx;
}

.default image {
    position: absolute;
    top: 260rpx;
    left: 70rpx;
}
/* 视频模块 */
.video {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 40rpx;
}
.video video {
    width: 690rpx;
    height: 394rpx;
    border-radius: 10px;
    z-index: 1;
}
.video .video-img {
    position: absolute;
    top: -36rpx;
    left: 0;
    width: 100%;
    height: 396rpx;
}
</style>
