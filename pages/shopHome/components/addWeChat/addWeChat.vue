<template>
    <!-- 添加商家微信入口 -->

    <view class="add-wechat-container">
        <view :class="'me-fx-row me-fx-sb-c content-text ' + contentText" @tap="addWXchat">
            <text class="me-fx-1 me-full-text">添加商家微信群，了解最新店铺优惠和商家福利！</text>
            <view class="btn-el">立即添加 ></view>
        </view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/addWeChat/addWeChat.js
const app = getApp();
export default {
    data() {
        return {
            contentText: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tempId: {
            type: [String, Number],
            default: 1
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
            var tempId = this.tempId;
            var contentText = '';

            switch (tempId) {
                case '1':
                case '3':
                case '12':
                    contentText = 'content-text1';
                    break;

                case '2':
                    contentText = 'content-text2';
                    break;

                case '4':
                    contentText = 'content-text3';
                    break;

                case '5':
                case '6':
                    contentText = 'content-text4';
                    break;

                case '7':
                    contentText = 'content-text5';
                    break;

                case '8':
                    contentText = 'content-text6';
                    break;

                case '9':
                    contentText = 'content-text7';
                    break;

                case '10':
                    contentText = 'content-text8';
                    break;

                default:
                    contentText = 'content-text9';
            }

            this.setData({
                contentText
            });
        },

        addWXchat() {
            let that = this;
            let merchantId = uni.getStorageSync('merchantId');
            app.globalData
                .sjrequest('/marchant/selectGroupQr', {
                    merchantId
                })
                .then((res) => {
                    that.$emit('showCode', {
                        detail: res.data.data
                    });
                });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

.add-wechat-container {
    padding: 0 32rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    margin: 20rpx 0 40rpx 0;
}

.content-text {
    width: 686rpx;
    height: 58rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
}
.content-text > text {
    padding-right: 15rpx;
}
/* .btn-el{margin-left:15rpx;} */

.content-text1 {
    background-color: #fe4f4f;
    color: #fff;
}
.content-text2 {
    background-color: #a66a42;
    color: #fff;
}
.content-text3 {
    background-color: #fd4b6d;
    color: #fff;
}
.content-text4 {
    background-color: #f9f9f9;
    color: #000;
}
.content-text5 {
    background-color: #3185ff;
    color: #fff;
}
.content-text6 {
    background-color: #ff6c7e;
    color: #fff;
}
.content-text7 {
    background-color: #ff8b4e;
    color: #fff;
}
.content-text8 {
    background-color: #2ca4f0;
    color: #fff;
}
.content-text9 {
    background-color: #fff;
    color: #000;
}
</style>
