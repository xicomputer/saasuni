<template>
    <view class="coupon-container">
        <!-- tabs栏 -->
        <view class="coupon-tabs-top">
            <view
                :class="'coupon-tabs-item ' + (tabsActive == index ? 'coupon-tabs-active' : '')"
                @tap="changeTabs"
                :data-idx="index"
                v-for="(item, index) in tabsList"
                :key="index"
            >
                {{ item.name }}

                <view v-if="tabsActive == index" class="coupon-tabs-active-bottom"></view>
            </view>
        </view>
        <!-- 优惠券列表 -->
        <view class="coupon-list-container">
            <no-data text="没有可用的优惠券哦！" url="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/youhuijuan" v-if="!showCouponList.length"></no-data>

            <!-- <view wx:if="{{showCouponList.length}}" class="coupon-item" style="background-image:url(https://xssj.letterbook.cn/applet/images/coupon-bg{{tabsActive+1}}.png);background-size:100% 236rpx;background-repeat:no-repeat;" wx:for="{{showCouponList}}" wx:key="index">
      <view class="coupon-item-left">
        <view class="coupon-reduce">优惠券减{{item.commodityCoupons.deduct}}</view>
        <view class="coupon-condition" style="{{tabsActive==1?'color:#666':tabsActive==2?'color:#999':''}}">购物满{{item.commodityCoupons.confine}}元使用</view>
        <view class="coupon-overtime">过期时间：{{item.commodityCoupons.endTime}}</view>
      </view>
      <view class="coupon-item-right">
        <view class="coupon-limit">单人独享</view>
        <view class="coupon-range">全场通用</view>
        <view class="coupon-btn-state" bindtap="toStoreUse"  style="{{tabsActive==1?'color:#666':tabsActive==2?'color:#999':''}}">{{tabsActive==1?'已使用':tabsActive==2?'已过期':'立即使用'}}</view>
      </view>
    </view> -->
            <view class="Coupons_list" v-for="(item, index) in showCouponList" :key="index">
                <view
                    class="Coupons_item"
                    @tap="showAdd"
                    :data-index="index"
                    :style="'background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/Coupons_bg' + tabsActive + '.png)'"
                >
                    <view class="Coupons_top">
                        <text class="Coupons_top_class">满减</text>
                        <image class="Coupons_top_image" src="/static/pages/static/Coupons_ge.png"></image>
                    </view>
                    <view class="Coupons_bottom">
                        <text class="Coupons_price">￥{{ item.commodityCoupons.deduct }}</text>
                        <view class="Coupons_right">
                            <text class="Coupons_right_name">{{ item.commodityCoupons.couponName }}</text>
                            <text class="Coupons_right_condition">满{{ item.commodityCoupons.confine }}元可使用</text>
                            <text class="Coupons_right_time">优惠券时效：{{ item.commodityCoupons.startTime }}-{{ item.commodityCoupons.endTime }}</text>
                        </view>
                    </view>
                </view>

                <view class="Coupons_white" v-if="item.showFlag">
                    <view class="Coupons_btn_c" v-if="tabsActive == 0"><view class="Coupons_btn" @tap="toStoreUse">立即使用</view></view>
                    <view class="Coupons_white_text">
                        <text class="Coupons_white_title">优惠说明</text>
                        <text class="Coupons_white_desc">可优惠{{ item.commodityCoupons.deduct }}元</text>
                    </view>
                    <view class="Coupons_white_text">
                        <text class="Coupons_white_title">使用须知</text>
                        <text class="Coupons_white_desc">满{{ item.commodityCoupons.confine }}元可使用</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// pages/Index/couponList/couponList.js
const app = getApp();

const time = require('../../../utils/util');

const formate = require('../../../utils/util');

export default {
    components: {
        noData
    },
    data() {
        return {
            tabsList: [
                // tabs列表
                {
                    name: '当前可用'
                },
                {
                    name: '已使用'
                },
                {
                    name: '已过期'
                }
            ],
            tabsActive: 0,
            // 当前tabs
            marchantId: 0,
            // 商家id
            couponList: [],
            // 优惠券列表
            showCouponList: [] // 当前显示优惠券列表
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
        this.getCouponList();
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
        // 获取优惠券列表
        getCouponList() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/coupons/queryCouponsList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.couponsList1.forEach((item) => {
                        item.commodityCoupons.endTime = time.formatTimeSec(item.commodityCoupons.endTime);
                    });
                    res.data.data.couponsList2.forEach((item) => {
                        item.commodityCoupons.endTime = time.formatTimeSec(item.commodityCoupons.endTime);
                    });
                    res.data.data.couponsList3.forEach((item) => {
                        item.commodityCoupons.endTime = time.formatTimeSec(item.commodityCoupons.endTime);
                    });
                    res.data.data.couponsList1.map((res) => {
                        let endTime = time.formatDateTime2(res.commodityCoupons.endTime);
                        res.commodityCoupons.endTime = endTime.split(' ')[0];
                        let startTime = time.formatDateTime2(res.commodityCoupons.startTime);
                        res.commodityCoupons.startTime = startTime.split(' ')[0];
                    });
                    this.setData({
                        couponList: res.data.data,
                        showCouponList: res.data.data.couponsList1
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 切换tabs栏
        changeTabs(e) {
            let idx = e.currentTarget.dataset.idx;
            this.setData({
                tabsActive: idx
            });

            switch (idx) {
                case 0:
                    this.couponList.couponsList1.map((res) => {
                        let endTime = time.formatDateTime2(res.commodityCoupons.endTime);
                        res.commodityCoupons.endTime = endTime.split(' ')[0];
                        let startTime = time.formatDateTime2(res.commodityCoupons.startTime);
                        res.commodityCoupons.startTime = startTime.split(' ')[0];
                    });
                    this.setData({
                        showCouponList: this.couponList.couponsList1
                    });
                    break;

                case 1:
                    this.couponList.couponsList2.map((res) => {
                        let endTime = time.formatDateTime2(res.commodityCoupons.endTime);
                        res.commodityCoupons.endTime = endTime.split(' ')[0];
                        let startTime = time.formatDateTime2(res.commodityCoupons.startTime);
                        res.commodityCoupons.startTime = startTime.split(' ')[0];
                    });
                    this.setData({
                        showCouponList: this.couponList.couponsList2
                    });
                    break;

                case 2:
                    this.couponList.couponsList3.map((res) => {
                        let endTime = time.formatDateTime2(res.commodityCoupons.endTime);
                        res.commodityCoupons.endTime = endTime.split(' ')[0];
                        let startTime = time.formatDateTime2(res.commodityCoupons.startTime);
                        res.commodityCoupons.startTime = startTime.split(' ')[0];
                    });
                    this.setData({
                        showCouponList: this.couponList.couponsList3
                    });
                    break;
            }
        },

        // 立即使用
        toStoreUse() {
            if (this.tabsActive == 0) {
                uni.showLoading({
                    title: '加载中'
                }); // var pages = getCurrentPages()
                // var prevPge = pages[pages.length-2]
                // prevPge.setData({
                //   tabActive:1
                // })
                // prevPge.getCategoryGoodsList()
                // wx.navigateBack({
                //   delta: 0,
                // })

                uni.redirectTo({
                    url: '/pages/shopHome/home/home'
                });
                uni.hideLoading();
            }
        },

        showAdd(e) {
            let Curindex = e.currentTarget.dataset.index;
            let list = this.showCouponList;
            list.map((res, index) => {
                if (index == Curindex) {
                    res.showFlag = true;
                } else {
                    res.showFlag = false;
                }
            });
            this.setData({
                showCouponList: list
            });
        }
    }
};
</script>
<style>
/* pages/Index/couponList/couponList.wxss */
.coupon-container {
    background: #f2f2f2;
    min-height: 100vh;
}
/* tab栏切换 */
.coupon-tabs-top {
    width: 100%;
    height: 56rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-sizing: border-box;
    top: 0;
    left: 0;
}
.coupon-tabs-item {
    flex: 1;
    height: 56rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.coupon-tabs-active {
    color: red;
}
.coupon-tabs-active-bottom {
    width: 30rpx;
    height: 4rpx;
    background-color: #ff0000;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
/* 优惠券列表 */
.coupon-list-container {
    width: 100%;
    padding: 25rpx 20rpx 20rpx;
    box-sizing: border-box;
}
.coupon-item {
    width: 100%;
    height: 236rpx;
    margin-bottom: 20rpx;
    display: flex;
}
/* 左边 */
.coupon-item-left {
    width: 476rpx;
    height: 236rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.coupon-reduce {
    height: 90rpx;
    font-size: 64rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 90rpx;
    color: #ffffff;
    margin-top: 46rpx;
}
.coupon-condition {
    width: 388rpx;
    height: 28rpx;
    background: #ffffff;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #ff1200;
    letter-spacing: 10rpx;
    text-align: center;
    margin: 14rpx 0;
}
.coupon-overtime {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #ffffff;
}
/* 右边 */
.coupon-item-right {
    width: 0;
    flex: 1;
    margin-left: 2rpx;
    text-align: center;
}
.coupon-limit {
    height: 60rpx;
    font-size: 44rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: #ffffff;
    margin-top: 34rpx;
}
.coupon-range {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
    margin: 4rpx 0 8rpx;
}
.coupon-btn-state {
    width: 148rpx;
    height: 48rpx;
    background: #ffffff;
    border-radius: 24rpx;
    color: #ff0000;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}
.Coupons_list {
    position: relative;
    margin-bottom: 20rpx;
}
.Coupons_top {
    height: 90rpx;
    padding: 5rpx 0rpx 0rpx 35rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.Coupons_item {
    height: 240rpx;
    width: 710rpx;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    color: #ffffff;
}
.Coupons_top_class {
    font-size: 28rpx;
}
.Coupons_top_image {
    height: 1rpx;
    width: 635rpx;
}
.Coupons_bottom {
    display: flex;
    align-items: center;
    height: 130rx;
    padding-left: 20rpx;
}
.Coupons_price {
    font-size: 60rpx;
    font-weight: bold;
}
.Coupons_right {
    display: flex;
    flex-direction: column;
    padding-left: 40rpx;
}
.Coupons_right > text {
    padding-bottom: 10rpx;
}
.Coupons_right_name {
    font-size: 30rpx;
}
.Coupons_right_condition,
.Coupons_right_time {
    font-size: 20rpx;
}
.Coupons_white {
    background-color: #fff;
    width: 100%;
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
    display: flex;
    flex-direction: column;
}
.Coupons_btn_c {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20rpx;
}
.Coupons_btn {
    color: #f01034;
    font-size: 28rpx;
    border: 1px solid #f01034;
    width: 185rpx;
    padding: 5rpx;
    text-align: center;
    margin: 0rpx;
}
.Coupons_white_text {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e5e5e5;
    margin: 0rpx 20rpx;
    padding: 10rpx 0rpx;
}
.Coupons_white_title {
    font-size: 24rpx;
    color: #9e9e9e;
    padding-bottom: 5rpx;
}
.Coupons_white_desc {
    color: #333333;
    font-size: 24rpx;
}
</style>
