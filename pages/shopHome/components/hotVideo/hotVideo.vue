<template>
    <!-- pages/shopHome/components/hotVideo/hotVideo.wxml -->
    <view class="hotVideo">
        <view class="Video_info">
            <view class="video_tit me-fx-row me-fx-sb">
                <view>
                    <text :class="'item_title ' + (tempId == '3' ? 'title_black' : '')">热卖商品</text>
                    <!-- <text class="item_title_fu">视频商品</text> -->
                </view>
                <view v-if="videoList.length > 4" @tap="moreVideo" :class="'more ' + (tempId > 2 ? 'title_black' : '')">
                    更多
                    <text :class="'icon icon-right ' + (tempId == '3' ? 'title_black' : '')"></text>
                </view>
            </view>
            <view class="me-fx-row">
                <view class="video" v-if="index < 4" v-for="(item, index) in videoList" :key="index">
                    <image mode="aspectFit" class="video_image" :src="item.coverUrl" @tap="toVideo" :data-item="item"></image>

                    <view class="text_info">
                        <text class="info_name me-full-text">{{ item.commodityName }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/hotVideo/hotVideo.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: [String, Number]
        },
        videoList: {
            type: Array,
            default: () => []
        },
        tempId: {
            type: [String, Number]
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toVideo(e) {
            let item = e.currentTarget.dataset.item;
            uni.navigateTo({
                url: `/pages/Index/videoDetail/videoDetail?marchantId=${item.marchantId}&id=${item.videoId}`
            });
        },

        moreVideo() {
            uni.navigateTo({
                url: `/pages/shopHome/hot/hot?marchantId=${this.marchantId}`
            });
        }
    }
};
</script>
<style>
@import '../../iconfont/iconfont.css';
@import '../../../../styles/me_common.css'; /* pages/shopHome/components/hotVideo/hotVideo.wxss */
.hotVideo {
    margin: 20rpx 32rpx;
}
.video_tit {
    margin-bottom: 20rpx;
    color: #fff;
}
.item_title {
    font-size: 32rpx;
    font-weight: bold;
}
.item_title_fu {
    font-size: 22rpx;
    margin-left: 12rpx;
    background-color: #fe3976;
    border: 1px solid #fe3976;
    padding: 0rpx 5rpx;
}
.more {
    font-size: 24rpx;
}
.icon {
    font-size: 24rpx;
}
.video {
    margin-right: 15rpx;
    position: relative;
}
.video_image {
    width: 160rpx;
    height: 280rpx;
    border-radius: 12rpx;
    background: #000;
}
.text_info {
    position: absolute;
    height: 70rpx;
    bottom: 0rpx;
    border-bottom-left-radius: 12rpx;
    border-bottom-right-radius: 12rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    align-items: center;
}
.title_black {
    color: #000;
}
.info_name {
    color: #d6a965;
    font-size: 20rpx;
    text-align: center;
    padding: 0rpx 5rpx;
    position: absolute;
    -webkit-line-clamp: 2;
}
</style>
