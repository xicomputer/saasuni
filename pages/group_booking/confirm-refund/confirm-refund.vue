<template>
    <view>
        <view class="top-info">
            <view class="title-info">
                <view class="title-text">商家已同意售后申请，等待寄回商品</view>
                <van-count-down :time="times" :use-slot="true" :auto-start="true" @finish="finishFun" @change="changeFun">
                    <view class="down-time-text">还剩下{{ downTime.days }}天{{ downTime.hours }}时{{ downTime.minutes }}分</view>
                </van-count-down>
            </view>
            <view class="address-info">
                <view class="title-text">商家收货地址</view>
                <view class="user-name">{{ merchantAddress.contacts }}：{{ merchantAddress.contactWay }}</view>
                <view class="me-fx-row">
                    <view class="me-fx-1 address-text">{{ merchantAddress.contactAddress }}</view>
                    <view class="copy-btn" @tap="copyAddress">复制</view>
                </view>
            </view>
        </view>

        <view class="logistics-ipt">
            <view class="me-fx-row me-fx-sb-c ipt-item">
                <text class="title-text">物流公司：</text>
                <input class="me-fx-1 ipt" type="text" placeholder="请输入物流公司" :value="expressName" @input="iptChange" data-keyname="expressName" />
            </view>
            <view class="me-fx-row me-fx-sb-c ipt-item">
                <text class="title-text">物流公司：</text>
                <input class="me-fx-1 ipt" type="text" placeholder="请输入快递单号" :value="expressNum" @input="iptChange" data-keyname="expressNum" />
                <image src="/static/pages/group_booking/imgs/sao-ma.png" @tap="scanCode" class="sao-ma-img"></image>
            </view>
        </view>

        <view class="me-fx-row me-fx-c-c footer-btn-box">
            <button class="confirm-btn" @tap="confrimSalesReturn">确认退货</button>
        </view>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
var app = getApp(); // pages/seckill/confirm-refund/confirm-order.js

export default {
    components: {
        // vanCountDown
    },
    data() {
        return {
            expressNum: '',
            expressName: '',
            refundOrderInfo: {},
            merchantAddress: {
                contacts: '',
                contactWay: '',
                contactAddress: ''
            },
            //商家地址
            downTime: {
                days: '',
                hours: '',
                minutes: ''
            },
            times: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var query = options.query;
        query = decodeURIComponent(query);
        query = JSON.parse(query);
        var merchantAddress = query.shippingAddressMerchant || '{}';
        merchantAddress = JSON.parse(merchantAddress);
        this.setData({
            refundOrderInfo: query,
            merchantAddress
        });
        this.computedTimes(query.updateTime); //技术倒技术毫秒数
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
        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        computedTimes(upTime) {
            //计算倒计时毫秒数
            var totalTimes = 2 * 86400000;

            var uptimes = this._parseDate(upTime, 'number');

            var nowTimes = new Date().getTime();
            var times = totalTimes - (nowTimes - uptimes);
            this.setData({
                times
            });
        },

        copyAddress() {
            //复制文本
            var addressText = this.merchantAddress.contactAddress;
            uni.setClipboardData({
                data: addressText,
                success: (res) => {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'none'
                    });
                },
                fail: (err) => {
                    console.log('复制操作失败：', err);
                }
            });
        },

        iptChange(e) {
            //输入事件
            var keyName = e.currentTarget.dataset.keyname;
            var value = e.detail.value;
            this[e.currentTarget.dataset.keyname] = value;
        },

        scanCode() {
            //扫码
            uni.scanCode({
                success: (res) => {
                    var result = res.result;
                    this.setData({
                        expressNum: result
                    });
                },
                fail: (err) => {
                    console.log('扫码失败：', err);
                }
            });
        },

        confrimSalesReturn() {
            //确认退货
            var { expressName, expressNum } = this;

            if (!expressName) {
                return uni.showToast({
                    title: '请填入物流公司',
                    icon: 'none'
                });
            }

            if (!expressNum) {
                return uni.showToast({
                    title: '请填入物流单号',
                    icon: 'none'
                });
            }

            var refundOrderInfo = this.refundOrderInfo;
            app.globalData
                .sjrequest1('/activityOrderBusiness/userConfirmRefund', {
                    orderNumber: refundOrderInfo.orderNumber,
                    expressCompany: expressName,
                    //快递公司
                    expressNumber: expressNum //快递单号
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '操作成功',
                            icon: 'none'
                        });
                        var eventChange = this.getOpenerEventChannel();
                        eventChange.emit('uploadData');
                        uni.navigateBack();
                    }
                });
        },

        finishFun() {},

        changeFun(e) {
            var detail = e.detail;

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            this.setData({
                downTime: detail
            });
        }
    }
};
</script>
<style>
/* pages/seckill/confirm-refund/confirm-order.wxss */

page {
    background-color: #f7f7f7;
}

.top-info {
    background-color: #fff;
    color: #0f0f0f;
    font-size: 24rpx;
}
.top-info .title-info {
    padding: 40rpx;
    box-sizing: border-box;
}
.top-info .title-info .title-text {
    font-size: 30rpx;
    font-weight: bold;
}
.top-info .down-time-text {
    font-size: 24rpx;
    color: #0f0f0f;
}

.top-info .address-info {
    padding: 40rpx 20rpx 40rpx 40rpx;
    box-sizing: border-box;
    border-top: 4rpx solid #e4e4e4;
}

.top-info .address-info .title-text {
    font-size: 30rpx;
    font-weight: bold;
}
.top-info .address-info .user-name {
    margin: 10rpx 0;
}
.top-info .address-info .address-text {
    margin-right: 38rpx;
}
.top-info .address-info .copy-btn {
    color: #1577ff;
}

.logistics-ipt {
    margin-top: 20rpx;
    background-color: #fff;
}
.logistics-ipt .ipt-item {
    height: 122rpx;
    padding: 0 20rpx 0 40rpx;
}
.logistics-ipt .ipt-item:not(:last-child) {
    border-bottom: 4rpx solid #e4e4e4;
}
.logistics-ipt .ipt-item .title-text {
    font-size: 30rpx;
    font-weight: bold;
    color: #0f0f0f;
}
.logistics-ipt .ipt-item .ipt {
    font-size: 24rpx;
}
.logistics-ipt .ipt-item .sao-ma-img {
    width: 36rpx;
    height: 36rpx;
    margin-left: 30rpx;
}

.footer-btn-box {
    position: fixed;
    width: 100%;
    height: 118rpx;
    background-color: #fff;
    bottom: 0;
    left: 0;
}
.footer-btn-box .confirm-btn {
    width: 618rpx;
    height: 82rpx;
    background-color: #f2180c;
    font-size: 32rpx;
    color: #fff;
    padding: 0;
    margin: 0;
    line-height: 82rpx;
}
</style>
