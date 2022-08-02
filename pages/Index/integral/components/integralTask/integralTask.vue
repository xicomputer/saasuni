<template>
    <view class="integral-component-box" v-if="showTaskPopClone">
        <view class="integral-component-content">
            <image class="integral-component-bg" src="https://xssj.letterbook.cn/applet/images/integral-component-bg.png"></image>
            <view class="integral-component-text-box">
                <view class="integral-component-text">{{ text }}</view>
                <image @tap="closePop" src="/static/pages/img/index/task_btn.png" class="integral-component-btn"></image>
                <view class="to-exchange-box" @tap="toExchange">
                    去兑换礼品
                    <image src="/static/pages/img/index/integral-right.png" class="to-exchange-img"></image>
                </view>
            </view>
            <view class="integral-component-solid"></view>
            <image @tap="closePop" style="width: 40rpx; height: 40rpx" src="/static/pages/img/index/del.png"></image>
        </view>
    </view>
</template>

<script>
// pages/Index/integral/components/integralTask/integralTask.js
export default {
    data() {
        return {
            showTaskPopClone: false
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        marchantId: {
            type: Number,
            default: 1
        },
        text: {
            type: String,
            default: '你已完成发布动态积分任务获取2积分'
        },
        showTaskPop: {
            type: Boolean,
            default: false
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        closePop() {
            console.log(this.marchantId);
            this.setData({
                showTaskPopClone: false
            });
        },

        toExchange() {
            this.closePop();
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${this.marchantId}`
            });
        }
    },
    watch: {
        showTaskPop: {
            handler: function (newVal, oldVal) {
                this.showTaskPopClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
/* pages/Index/integral/components/integralTask/integralTask.wxss */
.integral-component-box {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.integral-component-content {
    width: 536rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.integral-component-bg {
    width: 100%;
    height: 534rpx;
    z-index: 999;
}
.integral-component-text-box {
    width: 536rpx;
    height: 220rpx;
    margin-top: -2rpx;
    padding-top: 2rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 40rpx 40rpx;
    z-index: 88;
}
.integral-component-text {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #999999;
    text-align: center;
    margin: 16rpx 0 56rpx;
}
.integral-component-btn {
    width: 394rpx;
    height: 60rpx;
}
.to-exchange-box {
    width: 100%;
    height: 28rpx;
    line-height: 28px;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 78rpx;
    margin-top: 12rpx;
    box-sizing: border-box;
}
.to-exchange-img {
    width: 12rpx;
    height: 22rpx;
    margin-left: 6rpx;
}
.integral-component-solid {
    width: 2rpx;
    height: 94rpx;
    background-color: #fff;
}
</style>
