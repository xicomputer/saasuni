<template>
    <view class="set-up-container">
        <view class="user-info-box">
            <image class="user-info-img" :src="userInfo.avatarUrl"></image>
            <view class="user-info-content">
                <view class="user-name">{{ userInfo.nickName }}</view>
                <view class="user-modify-box">
                    <text class="user-modify-content">{{ userInfo.signature || '还未设置个性签名' }}</text>
                    <navigator class="user-modify-btn" url="/pages/Modify/Modify">编辑</navigator>
                </view>
            </view>
        </view>
        <navigator class="set-up-item" url="/pages/Address/AddressList/AddressList">
            <text>地址管理</text>
            <image src="/static/pages/img/goin.png" style="width: 12rpx; height: 20rpx"></image>
        </navigator>
        <navigator class="set-up-item" url="/pages/Invoice/InvoiceList/InvoiceList">
            <text>发票管理</text>
            <image src="/static/pages/img/goin.png" style="width: 12rpx; height: 20rpx"></image>
        </navigator>
    </view>
</template>

<script>
// pages/PersonalCenter/setUp/setUp.js
const app = getApp();
export default {
    data() {
        return {
            userInfo: {
                avatarUrl: '',
                nickName: '',
                signature: ''
            } // 用户信息
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.getUserInfo();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getUserInfo();
    },
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
        getUserInfo() {
            let ids = uni.getStorageSync('merchantId');
            app.globalData
                .sjrequest('/userRegister/queryUserInfo', {
                    marchantId: ids
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        var wxUserInfo = uni.getStorageSync('wx_userinfo_key') || {};
                        this.setData({
                            userInfo: { ...res.data.data, nickName: wxUserInfo.userInfo.nickName, avatarUrl: wxUserInfo.userInfo.avatarUrl }
                        });
                    }
                });
        }
    }
};
</script>
<style>
/* pages/PersonalCenter/setUp/setUp.wxss */
.set-up-container {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
}
.user-info-box {
    width: 100%;
    height: 168rpx;
    padding: 32rpx 20rpx 16rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
}
.user-info-img {
    width: 116rpx;
    height: 116rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
.user-info-content {
    flex: 1;
    height: 116rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.user-name {
    height: 56rpx;
    font-size: 40rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 56rpx;
    color: #333333;
}
.user-modify-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user-modify-content {
    flex: 1;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
}
.user-modify-btn {
    width: 68rpx;
    height: 36rpx;
    border: 2rpx solid #fe4a0b;
    border-radius: 4rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #fe4a0b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 26rpx;
}
/* 列表 */
.set-up-item {
    width: 100%;
    height: 80rpx;
    padding: 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f4f4f4;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
