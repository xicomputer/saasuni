<template>
    <view>
        <view class="exchange-record-container">
            <view class="exchange-record-list" v-if="exchangeRecordList.length">
                <view class="exchange-record-item" v-for="(item, index) in exchangeRecordList" :key="index">
                    <!-- 订单头部 -->

                    <view class="exchange-top-box">
                        <view class="exchange-order-num">
                            订单号：{{ item.integralNumber }}
                            <image @tap="copyOrder" class="copy_img" src="/static/pages/static/copy.png" :data-order="item.integralNumber"></image>
                        </view>
                        <view class="exchange-order-state-box">
                            订单状态:
                            <text class="exchange-order-state-text" v-if="item.state == 1">{{ item.getWay == 2 ? '待发货' : '待使用' }}</text>
                            <text class="exchange-order-state-text" v-if="item.state == 2">已发货</text>
                            <text class="exchange-order-state-text" v-if="item.state == 3">已完成</text>
                        </view>
                    </view>

                    <!-- 商品信息 -->

                    <view class="goods-info-box">
                        <image class="goods-img" :src="item.integralPresent.imageUuid" mode="aspectFill"></image>
                        <view class="goods-info-content">
                            <view class="goods-name">{{ item.integralPresent.presentName }}</view>
                            <view class="goods-price">-{{ item.integralPresent.score }}积分</view>
                            <view class="goods-time">兑换时间：{{ item.addTime }}</view>
                        </view>
                    </view>

                    <!-- 联系人信息 -->

                    <view class="person-info-container">
                        <view class="person-info-item">
                            <view class="person-info-title">联系人</view>
                            ：
                            <view class="person-info-right-text">{{ item.contacts }} {{ item.contactsWay }}</view>
                        </view>
                        <view class="person-info-item">
                            <view class="person-info-title">联系地址</view>
                            ：
                            <view class="person-info-right-text">{{ item.address }}</view>
                        </view>
                        <view class="person-info-item">
                            <view class="person-info-title">取货方式</view>
                            ：
                            <view class="person-info-right-text">{{ item.getWay == 2 ? '商家配送' : '门店团购' }}</view>
                        </view>
                        <view class="person-info-item" v-if="item.getWay == 2 && item.state == 2">
                            <view class="person-info-title">快递公司</view>
                            ：
                            <view class="person-info-right-text">{{ item.expressCompany }}</view>
                        </view>
                        <view class="person-info-item" v-if="item.getWay == 2 && item.state == 2">
                            <view class="person-info-title">快递单号</view>
                            ：
                            <view class="person-info-right-text">{{ item.expressNo }}</view>
                        </view>
                        <view class="person-info-item" v-if="item.getWay != 2">
                            <view class="person-info-title">到店时间</view>
                            ：
                            <view class="person-info-right-text">{{ item.arriveTimes }}</view>
                        </view>
                        <view class="person-info-item">
                            <view class="person-info-title">留言</view>
                            ：
                            <view class="person-info-right-text">{{ item.message ? item.message : '暂无留言' }}</view>
                        </view>
                    </view>

                    <!-- 按钮 -->

                    <view class="integral-btn-container">
                        <view class="integral-btn" v-if="item.state == 1 && item.getWay != 2" @tap="showQR" :data-num="item.integralNumber">核销</view>
                        <view class="integral-btn" v-if="item.state == 2 && item.getWay == 2" @tap="comfirmGet" :data-num="item.integralNumber">确认收货</view>
                        <view class="integral-btn integral-btn-no" v-if="item.state == 3">已完成</view>
                    </view>
                </view>
            </view>
            <no-data text="暂无订单~" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img1.png" v-else></no-data>
        </view>
        <!-- 二维码核销 -->
        <van-overlay :show="showQRCode" @click="onCloseQR">
            <view class="QR-box" @tap.stop.prevent="catchFun">
                <view class="QR-top">
                    出示二维码扫码核销
                    <image class="close-icon" src="/static/pages/img/goods/share_close.png" @tap.stop.prevent="onCloseQR"></image>
                </view>
                <view class="numer-deal-box" style="padding: 40rpx 50rpx">
                    <view class="clicked-number">{{ verification }}</view>
                </view>
                <canvas v-if="showQRCode" style="width: 110px; height: 110px; margin: 0 auto" canvas-id="myQrcode"></canvas>
            </view>
        </van-overlay>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanOverlay from './@vant/weapp/overlay/index';
import noData from '@/pages/Component/noData/index';
// pages/Index/integral/integralRecord/integralRecord.js
const app = getApp();

const time = require('../../../../utils/util');

import drawQrcode from '../../../../utils/api/weapp.qrcode.min.js';
export default {
    components: {
        // vanPopup,
        // vanOverlay,
        noData
    },
    data() {
        return {
            marchantId: 0,

            // 商家id
            pageCurr: 1,

            // 分页
            pageSize: 10,

            stopLoading: false,

            // 是否触底
            exchangeRecordList: [],

            // 兑换记录列表
            verification: '',

            showQRCode: false
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
        this.setData({
            marchantId: options.marchantId
        });
        this.getRecordList();
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
    onPullDownRefresh: async function () {
        uni.showLoading({
            title: '加载中'
        });
        this.clearData();
        await this.getRecordList();
        uni.stopPullDownRefresh();
        setTimeout((res) => {
            uni.showToast({
                title: '刷新成功'
            });
        }, 200);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.stopLoading) {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            this.getRecordList();
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 获取兑换记录列表
        getRecordList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: this.pageCurr,
                pageSize: this.pageSize
            };
            return app.globalData.sjrequest('/integral/queryExchange', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.forEach((item) => {
                        // 处理时间
                        if (item.addTime) {
                            item.addTime = time.formatTimeSec(item.addTime);
                        }

                        if (item.arriveTime) {
                            item.arriveTimes = time.formatDate(item.arriveTimes);
                        }
                    });
                    this.setData({
                        exchangeRecordList: [...this.exchangeRecordList, ...res.data.data],
                        pageCurr: this.pageCurr + 1
                    });

                    if (res.data.data.length < 10) {
                        // 到底了
                        this.setData({
                            stopLoading: true
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 清楚数据
        clearData() {
            this.setData({
                pageCurr: 1,
                // 分页
                stopLoading: false,
                // 是否触底
                exchangeRecordList: [] // 兑换记录列表
            });
        },

        catchFun() {
            return;
        },

        // 确认收货
        comfirmGet(e) {
            var that = this;
            let integralNumber = e.currentTarget.dataset.num;
            uni.showModal({
                title: '提示',
                content: '确认已收货吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定 可以调用删除方法了
                        let data = {
                            integralNumber: integralNumber
                        };
                        uni.showLoading({
                            title: '加载中'
                        });
                        app.globalData.sjrequest('/integral/confirmationReceiving', data).then((res) => {
                            if (res.data.code == 200) {
                                that.clearData();
                                that.getRecordList();
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                });
                            }
                        });
                    } else if (sm.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        //显示二维码
        showQR(e) {
            let integralNumber = e.currentTarget.dataset.num;
            this.setData({
                showQRCode: true
            });
            let data = {
                integralNumber: integralNumber
            };
            app.globalData.sjrequest('/integral/queryVerification', data).then((res) => {
                this.setData({
                    verification: res.data.data.verification
                });
                drawQrcode({
                    width: 110,
                    height: 110,
                    canvasId: 'myQrcode',
                    text: res.data.data.verification
                });
            });
        },

        onCloseQR() {
            this.setData({
                showQRCode: false
            });
        },

        copyOrder(e) {
            var order = e.currentTarget.dataset.order;
            uni.setClipboardData({
                data: order,

                success(res) {
                    uni.showToast({
                        title: '复制成功'
                    });
                }
            });
        }
    }
};
</script>
<style>
/* pages/Index/integral/integralRecord/integralRecord.wxss */
.exchange-record-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f7f7f7;
    padding: 20rpx;
    box-sizing: border-box;
}
/* 订单头部 */
.exchange-record-item {
    width: 100%;
    background-color: #fff;
    box-shadow: 0rpx 6rpx 12rpx #f7f7f7;
    border-radius: 20rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
}
.exchange-record-list .exchange-record-item:last-child {
    margin-bottom: 0rpx;
}
.exchange-top-box {
    width: 100%;
    height: 34rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.exchange-order-num {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.exchange-order-state-box {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333;
}
.exchange-order-state-text {
    color: #fe4a0b;
}
/* 商品信息 */
.goods-info-box {
    width: 100%;
    height: 160rpx;
    margin-top: 20rpx;
    display: flex;
    align-items: center;
}
.goods-img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 12rpx;
}
.goods-info-content {
    flex: 1;
    height: 160rpx;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.goods-name {
    width: 360rpx;
    max-height: 68rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.goods-price {
    width: 100%;
    text-align: right;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.goods-time {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
/* 联系人信息 */
.person-info-container {
    width: 100%;
    margin: 20rpx 0;
}
.person-info-item {
    width: 100%;
    display: flex;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    margin-top: 10rpx;
}
.person-info-title {
    width: 120rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    text-align: justify;
    text-align-last: justify;
}
.person-info-title:after {
    content: '';
    display: inline-block;
    width: 100%;
}
.person-info-right-text {
    width: 0;
    flex: 1;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    max-height: 80rpx;
    color: #999999;
    margin-left: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
/* 按钮 */
.integral-btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.integral-btn {
    width: 124rpx;
    height: 50rpx;
    background: #e23e3e;
    border-radius: 8rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.integral-btn-no {
    background-color: #999;
}
/* 二维码 */
.QR-box {
    width: 280px;
    height: 270px;
    border-radius: 20rpx;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.QR-top {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #f9f9f9;
    border-radius: 8px 8px 0px 0px;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.close-icon {
    width: 40rpx;
    height: 40rpx;
}
.click-number {
    text-align: center;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #bbbbbb;
}
.clicked-number {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    letter-spacing: 20rpx;
    text-align: center;
}
.copy_img {
    width: 40rpx;
    height: 40rpx;
}
</style>
