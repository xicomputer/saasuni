<template>
    <view class="selling_list">
        <view class="selling_left">
            <block v-for="(item, index) in videoList" :key="index">
                <view v-if="index % 2 == 0" class="selling_item">
                    <image mode="widthFix" class="selling_item_image" :src="item.coverUrl" @tap="toVideo" :data-item="item"></image>
                    <view class="selling_item_info">
                        <view class="selling_item_info_up">
                            <image class="selling_item_info_up-image" src="/static/pages/img/selling_icon.png"></image>
                            <view class="selling_item_info_up-text">{{ item.commodityName }}</view>
                        </view>
                        <view class="me-full-text desc">产品介绍：{{ item.description }}</view>
                    </view>
                </view>
            </block>
        </view>
        <view class="selling_right">
            <block v-if="index % 2 != 0" v-for="(item, index) in videoList" :key="index">
                <view class="selling_item">
                    <image mode="widthFix" class="selling_item_image" :src="item.coverUrl" @tap="toVideo" :data-item="item"></image>
                    <view class="selling_item_info">
                        <view class="selling_item_info_up">
                            <image class="selling_item_info_up-image" src="/static/pages/img/selling_icon.png"></image>
                            <view class="selling_item_info_up-text">{{ item.commodityName }}</view>
                        </view>
                        <view class="me-full-text desc">产品介绍：{{ item.description }}</view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/Index/components/videoList/videoList.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        videoList: {
            type: Array,
            default: () => []
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
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css';
page {
    background-color: #f9f9f9;
}
.selling_list {
    width: 100%;
    min-height: 100vh;
    padding: 20rpx 20rpx 120rpx;
    box-sizing: border-box;
    display: flex;
}
.selling_left {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.selling_right {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.selling_item {
    width: calc(100% - 11rpx);
    margin-top: 20rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
}
.selling_item_image {
    width: 100%;
    vertical-align: bottom;
}
.selling_item_info {
    /* position: absolute;
  left: 0;
  bottom: 0; */
    width: 100%;
    /* height: 84rpx; */
    background: #ffffff;
    border-radius: 0rpx 0rpx 16rpx 16rpx;
    padding: 4rpx 20rpx 12rpx;
    box-sizing: border-box;
}
.selling_item_info_up {
    display: flex;
    align-items: center;
}
.selling_item_info_up-image {
    width: 32rpx;
    height: 32rpx;
    margin-right: 4rpx;
}
.selling_item_info_up-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24rpx;
    font-weight: bold;
    color: #333;
}
.selling_item_info_down {
    margin-top: 8rpx;
    width: 296rpx;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.desc {
    -webkit-line-clamp: 2;
    margin-top: 8rpx;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #333;
}
</style>
