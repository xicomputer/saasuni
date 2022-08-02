<template>
    <view>
        <!-- 商家通知公告 -->

        <swiper :class="'notice-box ' + noticeBox" v-if="'list.length>0'" vertical autoplay circular easing-function="easeInOutCubic">
            <swiper-item :class="'me-fx-row me-fx-start-c notice-content ' + contentBox" v-for="(item, index) in list" :key="index">
                <text :class="'icon icon-notice ' + textColor"></text>

                <text :class="'me-fx-1 me-full-text ' + textColor">{{ item.content }}</text>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
// pages/Index/shopHome/components/notice/notice.js
export default {
    data() {
        return {
            noticeBox: '',
            contentBox: '',
            textColor: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tempId: {
            type: [String, Number],
            default: 1
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    beforeMount: function () {
        this.getTempClass();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getTempClass() {
            var tempId = this.tempId + '';
            var noticeBox = '';
            var contentBox = '';
            var textColor = '';
            switch (tempId) {
                case '1':
                    noticeBox = 'notice-box1';
                    break;

                case '2':
                    noticeBox = 'notice-box1';
                    break;

                default:
                    noticeBox = '';
            }

            switch (tempId) {
                case '3':
                case '5':
                case '6':
                case '8':
                case '9':
                case '10':
                    contentBox = 'content-box1';
                    break;

                default:
                    contentBox = '';
            }

            switch (tempId) {
                case '1':
                case '2':
                case '3':
                case '4':
                    textColor = 'text-color1';
                    break;

                case '5':
                case '6':
                case '7':
                    textColor = 'text-color2';
                    break;

                case '9':
                    textColor = 'text-color3';
                    break;

                case '10':
                    textColor = 'text-color4';
                    break;

                default:
                    textColor = '';
            }

            this.setData({
                noticeBox,
                contentBox,
                textColor
            });
        }
    }
};
</script>
<style>
@import '../../iconfont/iconfont.css';
@import '../../../../styles/me_common.css';

.notice-box {
    margin: 0 32rpx;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    height: 40rpx;
    position: relative;
    margin-bottom: 20rpx;
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
.me-full-text {
    overflow: initial;
    white-space: nowrap;
    display: inline-block;
}
.text-color1 {
    color: #fe4f4f;
}
.text-color2 {
    color: #333;
}
.text-color3 {
    color: #ff8b4e;
}
.text-color4 {
    color: #2ca4f2;
}
</style>
