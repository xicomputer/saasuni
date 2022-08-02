<template>
    <view>
        <view class="my-integral-container">
            <!-- 时间选择头部 -->
            <view class="integral-time-select-container">
                <view class="integral-time-bg">
                    <view class="integral-content-box">
                        <view class="start-time-box" @tap="slectTime" data-type="1">
                            <text class="time-text">{{ startTime }}</text>
                            <image src="/static/pages/img/index/arrow.png" class="time-select-img"></image>
                        </view>
                        至
                        <view class="start-time-box" @tap="slectTime" data-type="2">
                            <text class="time-text">{{ endTime }}</text>
                            <image src="/static/pages/img/index/arrow.png" class="time-select-img"></image>
                        </view>
                    </view>
                    <image @tap="getMyInteList" style="width: 86rpx; height: 54rpx; margin-left: 4rpx" src="/static/pages/img/index/inqurey.png"></image>
                </view>
            </view>
            <!-- 积分列表 -->
            <scroll-view :scroll-y="true" class="integral-list-box">
                <view class="integral-list" v-if="scoreList.length">
                    <view class="integral-item" v-for="(item, index) in scoreList" :key="index">
                        <view class="integral-top">
                            <view class="integral-title" v-if="item.source == 1">发表动态</view>
                            <view class="integral-title" v-if="item.source == 2">购买商品</view>
                            <view class="integral-title" v-if="item.source == 3">商品转发</view>
                            <view class="integral-title" v-if="item.source == 4">店铺转发</view>
                            <view class="integral-title" v-if="item.source == 5">积分转发</view>
                            <view class="integral-title" v-if="item.source == 6">打卡签到</view>
                            <view class="integral-change">+{{ item.score }}</view>
                        </view>

                        <view class="integral-bottom">{{ item.description }}</view>
                    </view>
                </view>
                <view v-if="!scoreList.length" class="no-dynamic">
                    <image class="no-dynamic-img" src="/static/pages/img/no_notice.png"></image>
                    <view class="no-dynamic-text">没有此时间段的数据</view>
                </view>
            </scroll-view>
        </view>
        <!-- 时间选择 -->
        <van-popup :show="showTimeSelect" @close="closeSelect" position="bottom">
            <van-datetime-picker
                type="date"
                title="请选择年月日"
                :value="currentDate"
                @confirm="onInput"
                @cancel="closeSelect"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
            />
        </van-popup>
    </view>
</template>

<script>
// import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
// import vanPopup from './@vant/weapp/popup/index';
import noData from '@/pages/Component/noData/index';
// pages/Index/integral/myIntegral/myIntegral.js
const app = getApp();

const time = require('../../../../utils/util');

export default {
    components: {
        // vanDatetimePicker,
        // vanPopup,
        noData
    },
    data() {
        return {
            minDate: new Date('2020-01-01').getTime(),

            // 可选最小时间
            maxDate: new Date().getTime(),

            // 可选最大时间
            showTimeSelect: false,

            // 选择时间弹框
            currentDate: '',

            // 当前选择框时间
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`;
                } else if (type === 'day') {
                    return `${value}日`;
                }

                return value;
            },

            startTime: '2020-01-01',

            // 选择的最小时间
            endTime: new Date().getTime(),

            // 选择的最大时间
            type: 0,

            // 积分列表
            scoreList: [],

            marchantId: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        let time = this.formatDate(new Date().getTime());
        this.setData({
            endTime: time,
            marchantId: options.marchantId
        });
        this.getMyInteList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        // 查询列表
        getMyInteList() {
            uni.showLoading({
                title: '查询中',
                mask: true
            });
            let data = {
                marchantId: this.marchantId,
                startTime: this.startTime,
                endTime: this.endTime
            };
            return app.globalData.sjrequest('/integral/queryMyInteList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatTimeSec(item.addTime);
                    });
                    this.setData({
                        scoreList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 选择时间弹框
        slectTime(e) {
            var type = e.currentTarget.dataset.type;

            if (type == 1) {
                // 选择开始时间
                this.setData({
                    currentDate: new Date(this.startTime).getTime()
                });
            }

            if (type == 2) {
                // 选择结束时间
                this.setData({
                    currentDate: new Date(this.endTime).getTime()
                });
            }

            this.setData({
                showTimeSelect: true,
                type: type
            });
        },

        //  关闭选择时间弹框
        closeSelect() {
            this.setData({
                showTimeSelect: false
            });
        },

        onInput(event) {
            // 确认时间
            if (this.type == 1) {
                // 开始时间
                this.setData({
                    startTime: this.formatDate(event.detail)
                });
            }

            if (this.type == 2) {
                // 结束时间
                this.setData({
                    endTime: this.formatDate(event.detail)
                });
            }

            this.closeSelect();
        },

        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return YY + MM + DD;
        }
    }
};
</script>
<style>
/* pages/Index/integral/myIntegral/myIntegral.wxss */
.my-integral-container {
    width: 100%;
    height: 100vh;
    background-color: #f7f7f7;
    padding: 20rpx;
    box-sizing: border-box;
}
/* 时间选择头部 */
.integral-time-select-container {
    width: 100%;
    height: 80rpx;
    border-bottom: 2rpx solid #e4e4e4;
    box-sizing: border-box;
    padding: 14rpx 20rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0 0;
}
.integral-time-bg {
    width: 100%;
    display: flex;
    align-items: center;
    background: #fddccd;
    border-radius: 10rpx;
    overflow: hidden;
}
.integral-content-box {
    width: 0;
    flex: 1;
    height: 48rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: bold;
    font-family: PingFang SC;
    color: #666666;
}
.start-time-box {
    width: 220rpx;
    display: flex;
    align-items: center;
    margin-left: 28rpx;
}
.time-select-img {
    width: 48rpx;
    height: 24rpx;
}
/* 积分列表 */
.integral-list-box {
    width: 100%;
    max-height: calc(100vh - 120rpx);
    background-color: #fff;
    border-radius: 0 0 20rpx 20rpx;
}
.integral-list {
    width: 100%;
}
.integral-item {
    width: 100%;
    height: 116rpx;
    padding: 20rpx 28rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 2rpx solid #e4e4e4;
}
.integral-list .integral-item:last-child {
    border: none;
}
.integral-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.integral-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
.integral-change {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.integral-bottom {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
}
/* 没数据 */
.no-dynamic {
    width: 100%;
    padding: 20rpx 60rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-dynamic-img {
    width: 632rpx;
    height: 368rpx;
}

.no-dynamic-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    margin-top: 40rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29rpx;
    color: #999999;
}
</style>
