<template>
    <view class="member">
        <view class="member_title">
            <view>当前积分</view>
            <view style="color: #333333">{{ integral }}分</view>
        </view>
        <view class="member_item" v-for="(item, index) in integralList" :key="index">
            <view class="member_item_up">
                <view class="member_item_no">订单号：{{ item.orderNumber }}</view>
                <view class="member_item_point">+{{ item.integral }}分</view>
            </view>

            <view class="member_item_down">
                <view class="member_item_price">消费金额￥{{ item.actualMoney }}</view>
                <view class="member_item_time">{{ item.addTime }}</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/member/integral/integral.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            integral: 0,

            // 总积分
            // 积分列表
            integralList: [],

            marchantId: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId,
            integral: options.integral
        });
        this.getInteList();
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
     */
    onShareAppMessage: function () {},
    methods: {
        getInteList() {
            let data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/member/queryMemberRecordList', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatDateTime(item.addTime);
                    });
                    this.setData({
                        integralList: res.data.data
                    });
                }
            });
        }
    }
};
</script>
<style>
.member {
    min-height: 100vh;
    background: #f8f8f8;
}
.member_title {
    width: 100%;
    height: 90rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #666666;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid #f4f4f4;
    background: #ffffff;
}
.member_item {
    height: 120rpx;
    padding: 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
}
.member_item:last-child {
    border-bottom: none;
}
.member_item_up,
.member_item_down {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.member_item_no {
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
}
.member_item_point {
    font-size: 32rpx;
    font-weight: bold;
    color: #ff0000;
}
.member_item_price {
    font-size: 24rpx;
    font-weight: bold;
    color: #666666;
}
.member_item_time {
    font-size: 20rpx;
    font-weight: bold;
    color: #999999;
}
</style>
