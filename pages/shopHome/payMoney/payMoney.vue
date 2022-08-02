<template>
    <!-- pages/payMoney/money.wxml -->
    <view class="xp-box">
        <view class="box-item">
            <view class="item1">{{ goodsName }}</view>
            <view class="item2">
                <view class="z1">消费金额</view>
                <view class="z2">
                    <text>￥</text>
                    <input type="number" @input="getvalue" />
                </view>
            </view>
            <view class="item3" @tap="enterMoney">确认付款</view>
        </view>
    </view>
</template>

<script>
// pages/payMoney/money.js
const app = getApp();
export default {
    data() {
        return {
            goodsName: '',
            appid: '',
            merchantId: '',
            value: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log('支付参数options', options);
        const appid = uni.getStorageSync('appid');
        const merchantId = uni.getStorageSync('merchantId');
        const name = uni.getStorageSync('res').data.data.setInfo.appName;
        this.setData({
            goodsName: name,
            appid: appid,
            merchantId: merchantId
        });
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
        //确认付款
        enterMoney() {
            if (!this.value) {
                uni.showToast({
                    title: '请输入金额',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }

            const token = uni.getStorageSync('token');
            let postDatas = {
                money: this.value,
                merchantId: this.merchantId,
                appId: this.appid
            };
            app.globalData.sjrequest('/offLineWxPay/pay', postDatas, token).then((res) => {
                if (res.data.code === 200) {
                    console.log(res.data.data);
                    uni.requestPayment({
                        ...res.data.data,
                        success: (res) => {
                            console.log(res);
                            uni.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 2000
                            });
                            setTimeout(() => {
                                uni.redirectTo({
                                    url: '/pages/shopHome/home/home'
                                });
                            }, 1500);
                        }
                    });
                }
            });
        },

        getvalue(e) {
            var val = e.detail.value;
            this.setData({
                value: val * 100
            });
        }
    }
};
</script>
<style>
/* pages/payMoney/money.wxss */
.xp-box {
    height: 100vh;
    width: 100vm;
    background-color: #f7f7f7;
    overflow: hidden;
}
.box-item {
    width: 710rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin: 40rpx 0 0 20rpx;
    overflow: hidden;
    border-radius: 8rpx;
}
.item1 {
    height: 200rpx;
    display: flex;
    align-items: center;
    background-color: #fbfafa;
    padding-left: 40rpx;
}
.item2 {
    height: 220rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 0 40rpx;
}
.item2 .z2 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
}
.item2 .z1 {
    color: #999999;
}
.item2 .z2 text {
    font-size: 50rpx;
    font-weight: bold;
}
.item2 .z2 input {
    padding-left: 20rpx;
}
.item3 {
    height: 88rpx;
    width: 580rpx;
    background-color: #07c160;
    margin: 0 auto;
    border-radius: 10rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    margin-top: 44rpx;
    margin-bottom: 102rpx;
}
</style>
