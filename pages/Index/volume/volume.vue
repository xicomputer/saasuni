<template>
    <!-- pages/shopHome/components/volume/volume.wxml -->
    <!-- <view class="coupon-window-bgc"  catchtouchmove="true">
        <view class="coupon-window">
          <scroll-view bindtap="a" scroll-y="true" class="coupon-content-container">
            <view class="coupon-content-single" wx:for="{{saleCanList}}" wx:key="index">
              <view class="price">
                <text>￥</text>
                <text>{{item.deduct}}</text>
              </view>
              <view class="text">
                <text>满 {{item.confine}} 可用</text>
                <text>{{item.startTime}}-{{item.endTime}}</text>
              </view>
              <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FGroup%202999%402x.png" mode="aspectFill"></image>
            </view>
          </scroll-view>
          <image class="accept" bindtap="receiveSale" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2F%E5%BC%80%E5%BF%83%E6%94%B6%E4%B8%8B.png"></image>
          <image class="close" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png" bindtap="closeSale"></image>
        </view>
      </view> -->
    <view>
        <!-- 内容 -->
        <view>
            <view style="width: 710rpx; margin: 20rpx auto; background-color: #fff; display: flex; flex-direction: column" v-for="(item, index) in saleCanList" :key="index">
                <view style="display: flex; padding: 20rpx">
                    <view
                        style="
                            background: #fceced;
                            width: 196rpx;
                            height: 178rpx;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 16rpx;
                            position: relative;
                        "
                    >
                        <view style="position: absolute; top: 0; left: 0; padding: 5rpx 8rpx; border-bottom-right-radius: 16rpx; background-color: #fff; color: red">满减</view>
                        <image style="width: 152rpx; height: 118rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/youhuijuanlefticon.png"></image>
                        <view style="position: absolute; color: #fff; margin-left: -50rpx">{{ item.deduct }}元</view>
                    </view>

                    <view style="margin-left: 15rpx">
                        <view style="font-size: 32rpx; font-weight: 900" class="u-line-1">
                            <text>满 {{ item.confine }} 减 {{ item.deduct }}</text>
                        </view>
                        <view style="font-size: 24rpx; color: #ac754c" class="u-line-1">满 {{ item.confine }} 可用</view>
                        <view style="color: #ac754c; font-size: 24rpx">优惠劵时效:{{ item.startTime }}-{{ item.endTime }}</view>
                        <view style="display: flex; align-items: center; justify-content: space-between; width: 100%">
                            <view style="font-size: 32rpx; font-weight: 900" class="u-line-1">
                                <text style="color: red; font-size: 26rpx">
                                    优惠劵 ￥
                                    <text style="font-size: 32rpx">{{ item.deduct }}</text>
                                </text>
                            </view>
                            <view
                                style="
                                    display: flex;
                                    background: linear-gradient(to right, #f32821, #fc5f19);
                                    width: 166rpx;
                                    height: 52rpx;
                                    line-height: 66rpx;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 34rpx;
                                "
                                @tap="receiveSale"
                            >
                                <!-- <image style="width:48rpx;height:48rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/wxfff.png"></image> -->
                                <text style="color: #fff; font-size: 28rpx">立即领取</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/volume/volume.js
const app = getApp();

const formate = require('../../../utils/util');

export default {
    data() {
        return {
            marchantId: '',
            saleCanList: [],
            isDiscount: false,
            saleState: '',
            addcouponList: '',
            addcouponList1: '',
            addcouponList2: '',
            addcouponList3: '',
            loading: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        this.setData({
            marchantId: options.marchantId
        });
        this.isShowSale(); //促销弹框
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        // 函数
        // 优惠是否弹框
        isShowSale() {
            let data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/coupons/queryCouponsGet', data).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.length) {
                        let saleCanList = [];
                        res.data.data.forEach((item) => {
                            let endTime = formate.formatDateTime2(item.endTime);
                            item.endTime = endTime.split(' ')[0];
                            let startTime = formate.formatDateTime2(item.startTime);
                            item.startTime = startTime.split(' ')[0];

                            if (item.isDraw == 0) {
                                saleCanList.push(item);
                                this.setData({
                                    isDiscount: true,
                                    saleState: '点击领券'
                                });
                            }

                            item.endTime = formate.formatDate(item.endTime);
                        });
                        this.setData({
                            saleCanList: saleCanList
                        });
                        app.globalData.activeStatuList = this.activeStatuList;
                    }
                }
            });
        },

        // 关闭优惠弹窗
        closeSale() {
            this.setData({
                isDiscount: false
            });
        },

        receiveSale() {
            var data = {
                couponsIds: []
            };
            this.saleCanList.forEach((item) => {
                if (item.isDraw == 0) {
                    data.couponsIds.push(item.id);
                }
            });
            data.couponsIds = data.couponsIds.toString();
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/coupons/getCoupons', data, token).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        isDiscount: false
                    });
                    uni.showToast({
                        title: '领取成功',
                        icon: 'none'
                    });
                    this.getCouponList(); // this.reCoupons()
                }
            });
        },

        // 获取优惠券列表
        getCouponList() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/coupons/queryCouponsList', data).then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data, 'addcouponList');
                    uni.hideLoading();
                    this.setData({
                        addcouponList: res.data.data.couponsList1.length,
                        addcouponList1: res.data.data.couponsList1,
                        addcouponList2: res.data.data.couponsList2,
                        addcouponList3: res.data.data.couponsList3
                    });
                    setTimeout(() => {
                        this.setData({
                            loading: false
                        });
                    }, 500);
                }
            });
        }
    }
};
</script>
<style>
/* pages/shopHome/components/volume/volume.wxss */
/* 新优惠券弹窗样式 */
page {
    min-height: 100%;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7 !important;
}

.coupon-window-bgc {
    position: fixed;
    background-color: rgba(43, 43, 43, 0.274);
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.coupon-window-bgc .coupon-window {
    width: 600rpx;
    height: 1148rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.coupon-window-bgc .coupon-window .accept {
    width: 324rpx;
    height: 88rpx;
    margin-top: 15rpx;
    z-index: 30;
}

.coupon-window-bgc .coupon-window .coupon-image {
    position: absolute;
    top: 0;
    width: 600rpx;
    height: 974rpx;
}

.coupon-window-bgc .coupon-window .coupon-image-shadow {
    position: absolute;
    bottom: 26px;
    width: 605rpx;
    height: 1144rpx;
    z-index: 24;
}

.coupon-window-bgc .coupon-window .coupon-content-container {
    width: 536rpx;
    max-height: 600rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single {
    justify-content: space-between;
    display: flex;
    position: relative;
    margin-bottom: 10rpx;
    width: 540rpx;
    height: 140rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single > image {
    position: absolute;
    top: 0;
    width: 535rpx;
    height: 132rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price {
    position: relative;
    left: -3rpx;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 155rpx;
    height: 130rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price text:nth-of-type(1) {
    color: #e81d31;
    font-size: 26rpx;
    margin: 10px -2px 0 0px;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price text:nth-of-type(2) {
    color: #e81d31;
    font-size: 48rpx;
    font-weight: 500;
    letter-spacing: -1rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    top: 0;
    width: 400rpx;
    height: 140rpx;
    left: 30rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text text:nth-of-type(1) {
    font-size: 33rpx;
    color: #ab3007;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text text:nth-of-type(2) {
    font-size: 22rpx;
    letter-spacing: 2rpx;
    color: #ff926e;
}

.close {
    width: 68rpx;
    height: 68rpx;
    margin-top: 60rpx;
}
</style>
