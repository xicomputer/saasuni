<template>
    <!-- pages/order/logistics/logistics.wxml -->
    <view class="logistics">
        <view class="logistics-info">
            <view class="head">
                <view class="title">快递公司：</view>
                <view class="desc">{{ wlCompany }}</view>
            </view>
            <view class="deliver"></view>
            <view class="head">
                <view class="title">快递单号：</view>
                <view class="desc">{{ wlNumber }}</view>
            </view>
            <view class="logistics-content">
                <view class="logistics-title">物流情况</view>
                <view class="deliver"></view>
                <view class="noMsg" v-if="wlList.length == 0">{{ message }}</view>
                <view v-else style="margin-top: 40rpx">
                    <view class="item" v-for="(item, index) in wlList" :key="index">
                        <view class="left">
                            <image class="img" :src="index == 0 ? '../../img/logistics2.png' : '../../img/logistics1.png'" />
                            <view class="hdivider" v-if="index !== wlList.length - 1"></view>
                        </view>

                        <view class="right">
                            <view class="desc">{{ item.time }}</view>
                            <view class="custom">{{ item.status }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/order/logistics/logistics.js
const app = getApp();
export default {
    data() {
        return {
            wlList: [],
            step: 1,
            active: 3,
            message: '',
            wlNumber: '',
            wlCompany: '',
            orderNumber: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData(
            {
                wlNumber: options.wlNumber,
                wlCompany: options.wlCompany,
                orderNumber: options.orderNumber
            },
            () => {
                this.getWlList();
            }
        );
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
        //获得物流信息
        getWlList() {
            var { wlNumber, orderNumber } = this;
            var data = {
                expressNo: wlNumber,
                orderNumber
            };
            app.globalData.sjrequest('/order/queryLogisticsDetails', data).then((res) => {
                if (res.data.code == 200) {
                    var logistics = JSON.parse(res.data.data.logistics);

                    if (logistics.status == 0) {
                        var list = logistics.result.list;
                        this.setData({
                            wlList: list
                        });
                    } else {
                        this.setData({
                            message: logistics.msg
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
/* pages/order/logistics/logistics.wxss */
.logistics {
    background: #f2f2f2;
    padding-top: 20rpx;
}
.logistics .logistics-info .head {
    padding-left: 30rpx;
    display: flex;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 90rpx;
    color: #333333;
    background: #ffffff;
}
.logistics .logistics-info .deliver {
    height: 2rpx;
    background: #f2f2f2;
}
.logistics .logistics-info .logistics-content {
    background: #ffffff;
    padding: 43rpx 30rpx;
    margin-top: 20rpx;
}
.logistics .logistics-info .logistics-content .logistics-title {
    line-height: 50rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
}
.logistics .logistics-info .logistics-content .noMsg {
    color: #999;
    font-size: 32rpx;
    text-align: center;
    line-height: 400rpx;
}
.logistics .logistics-info .logistics-content .item {
    display: flex;
}
.logistics .logistics-info .logistics-content .item .left {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logistics .logistics-info .logistics-content .item .left .img {
    width: 36rpx;
    height: 36rpx;
}
.logistics .logistics-info .logistics-content .item .left .hdivider {
    width: 0rpx;
    height: 110rpx;
    border: 1rpx solid #ebebeb;
}
.logistics .logistics-info .logistics-content .item .right {
    padding-left: 32rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #666666;
}
.logistics .logistics-info .logistics-content .item .right .custom {
    padding-top: 20rpx;
    box-sizing: border-box;
}
</style>
