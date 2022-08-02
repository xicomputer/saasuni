<template>
    <!-- pages/shopHome/components/view-more-title/view-more-title.wxml -->

    <view class="component-box">
        <!-- <image  bindtap='emitEvent' src='{{imgUrl}}' class='btn-container-img'></image> -->
        <view class="me-fx-row me-fx-sb-c title-box">
            <view @tap="emitEvent">
                <text class="title-text" :style="'color:' + titleColor + ';'">{{ title }}</text>
                <text v-if="subTitle" class="sub-title-text" :style="'color:' + titleColor">{{ subTitle }}</text>
            </view>

            <view @tap="emitEvent" class="me-fx-row me-fx-c-c more-text" v-if="addPd != 3.1">
                <text>更多</text>
                <text class="icon icon-right right-icon"></text>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/view-more-title/view-more-title.js
export default {
    data() {
        return {
            imgUrl: ''
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        addPd: {
            type: [String, Number],
            default: 1
        },
        titleColor: {
            type: String,
            default: ''
        },
        titleSize: {
            type: String,
            default: ''
        },
        imgName: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    // 监听数据
    watch: {
        imgName: {
            handler: function (nowVal, oldVal) {
                if (nowVal) {
                    var imgUrl = `../../imgs/view-more-title-img/${nowVal}`;
                    this.setData({
                        imgUrl
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
        emitEvent() {
            this.$emit('click');
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css'; /* pages/shopHome/components/view-more-title/view-more-title.wxss */

@font-face {
    font-family: 'icon';
    /* Project id 2691355 */
    src: url('//at.alicdn.com/t/font_2691355_34fbkznemeo.woff2?t=1631091431948') format('woff2'),
        url('//at.alicdn.com/t/font_2691355_34fbkznemeo.woff?t=1631091431948') format('woff'),
        url('//at.alicdn.com/t/font_2691355_34fbkznemeo.ttf?t=1631091431948') format('truetype');
}

.icon {
    font-family: 'icon' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-right:before {
    content: '\e6a3';
}

.component-box {
    height: 110rpx;
    margin-top: -15rpx;
}

.component-box .title-box {
    position: absolute;
    top: 16rpx;
    left: 0;
    width: 100%;
    height: 60rpx;
}

.component-box .btn-container-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 344rpx;
    height: 60rpx;
}

.component-box .right-icon {
    color: #999999;
    font-size: 24rpx;
    position: relative;
    top: -1rpx;
}

.component-box .title-text {
    font-weight: bold;
    padding-left: 20rpx;
    box-sizing: border-box;
    font-size: 32rpx;
}

.component-box .sub-title-text {
    font-size: 28rpx;
    margin-left: 10rpx;
}

.component-box .more-text {
    font-size: 20rpx;
    color: #999999;
    position: relative;
    right: 10rpx;
}
</style>
