<template>
    <view class="no-data-container" :style="'height:' + height + 'vh'">
        <image v-if="height" class="no-data-container-img" mode="heightFix" :style="'height:' + (height - 10) + 'vh'" :src="url"></image>
        <image v-else class="no-data-container-img" mode="heightFix" :src="url"></image>
        <view class="no-data-container-text">{{ text }}</view>
    </view>
</template>

<script>
// pages/Component/noData/index.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
        url: {
            type: String,
            default: 'https://xssj.letterbook.cn/applet/images/sj_no_data_img0.png'
        },
        height: {
            type: [String, Number],
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
};
</script>
<style>
/* pages/Component/noData/index.wxss */
.no-data-container {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-data-container-img {
    height: 424rpx;
}

.no-data-container-text {
    margin-top: 10rpx;
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
</style>
