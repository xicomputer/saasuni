<template>
    <!-- pages/signInHome/signInHome.wxml -->
    <!-- 首页签到页面 白色版 -->
    <!-- <view class="signInHome-cont" bindtap="goIntegral" wx:if="{{signData.signinUserList.length > 0}}">
	<view class="text-cont">
		<text class="title">积分兑换，豪礼等你拿</text>
		<view class="more">
			<text>详情</text>
			<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png"></image>
		</view>
	</view>
	<view class="signInShow-cont">
		<view wx:for="{{signData.signinList}}" wx:key="index">
			<image wx:if="{{item.isSignin == 0 && item.signinTime !== isSignInToday}}" class="signInShow-Img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E6%9C%AA%E7%AD%BE%E5%88%B0.png"></image>
			<image wx:if="{{item.isSignin == 1}}" class="signInShow-Img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E5%B7%B2%E7%AD%BE%E5%88%B0.png"></image>
			<image wx:if="{{item.isSignin == 0 && item.signinTime == isSignInToday}}" class="signInShow-Img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E6%9C%AA%E7%AD%BE%E5%88%B0gif%E5%9B%BE.gif"></image>
			<text class="signInNumb">+{{item.score}}</text>
			<text wx:if="{{item.isSignin==1 || index == nowDay-1}}">{{item.isSignin==0 && index == nowDay-1?'签到':'已签'}}</text>
			<text wx:else>{{index>nowDay-1?weekList[index]:'未签'}}</text>
		</view>
	</view>
</view> -->

    <!-- 积分乐园内部组件 -->

    <view
        class="integral-content-container"
        @tap="goIntegral"
        v-if="userInfo.integralSettingStatus == 1"
        style="border-radius: 20rpx 20rpx 0 0; position: relative; margin-bottom: 0rpx"
    >
        <view class="integral-title-container">
            <view class="integral-title-left-box"></view>
            <view class="integral-title-text">七天签到领取积分</view>
        </view>

        <view class="integral-sign-in-btn">查看详情</view>
        <view class="integral-sign-in-list">
            <view class="integral-sign-in-item-box" v-for="(item, index) in signData.signinList" :key="index">
                <block v-if="item.isSignin == 1 || index == nowDay - 1">
                    <view class="integral-sign-in-item" style="background: #ffffff">
                        <view class="integral-sign-in-item-status" style="color: #000">{{ item.isSignin == 0 && index == nowDay - 1 ? '签到' : '已签' }}</view>
                        <image src="/static/pages/img/index/integral_state1.png" class="integral-sign-in-item-image"></image>
                        <view class="integral-sign-in-add" style="color: #000">+{{ item.score }}</view>
                    </view>
                </block>

                <block v-else>
                    <view class="integral-sign-in-item" style="background: #d8d8d8; border: 2rpx solid #999">
                        <view class="integral-sign-in-item-left-top" style="background: #ffffff"></view>
                        <view class="integral-sign-in-item-status" style="color: #999">{{ index > nowDay - 1 ? weekList[index] : '未签' }}</view>
                        <image src="/static/pages/img/index/integral_state2.png" class="integral-sign-in-item-image"></image>
                        <view class="integral-sign-in-add" style="color: #999">+{{ item.score }}</view>
                    </view>
                </block>

                <view class="integral-sign-in-progress" v-if="index != 6">
                    <view v-if="index < nowDay - 1" style="width: 100%" class="integral-sign-in-progress-in"></view>
                    <view v-if="index == nowDay - 1" style="width: 50%" class="integral-sign-in-progress-in"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/shopHome/components/hotVideo/hotVideo.js
let app = getApp();

const time = require('../../../../utils/util');

export default {
    data() {
        return {
            signData: {
                signinList: []
            },
            // 保存签到数据
            isSignInToday: '',
            // 保存今天未签到的时间
            nowDay: -1,
            //今天的时间
            weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        userInfo: Object,
        firstSignInData: Object
    },
    /**
     * 组件的初始数据
     */
    watch: {
        firstSignInData: {
            handler: function (nowVal) {
                let nowDay = new Date().getDay();

                if (nowDay == 0) {
                    nowDay = 7;
                }

                this.setData({
                    signData: nowVal,
                    nowDay
                });
            },

            immediate: true,
            deep: true
        }
    },
    beforeMount: function () {
        this.getSignData();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 判断今天有没有签到
        isSignInTodayFun() {
            let data = this.signData.signinList;
            let currentTime = String(time.getCurrentTime());

            for (let index in data) {
                if (data[index].signinTime == currentTime && data[index].isSignin == 0) {
                    // 表示今天未签到
                    this.setData({
                        isSignInToday: currentTime
                    });
                }
            }

            console.log(this.isSignInToday, this.signData.signinList[0].signinTime, '今天没有签到的时间');
        },

        goIntegral() {
            //跳转到优惠券页面
            let merchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${merchantId}`
            });
        },

        // 查询用户签到数据
        getSignData() {
            let marchantId = uni.getStorageSync('merchantId');
            let data = {
                marchantId,
                type: 2
            };
            app.globalData.userLogin().then((r) => {
                app.globalData.sjrequest('/integral/operateSignin', data).then((res) => {
                    if (res.data.code == 200) {
                        let time1 = time.formatTimeSec(res.data.data.countDownTime);
                        res.data.data.countDownTime = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
                        let nowDay = new Date().getDay();

                        if (nowDay == 0) {
                            nowDay = 7;
                        }

                        this.setData({
                            signData: res.data.data,
                            nowDay
                        });
                    }

                    this.isSignInTodayFun();
                });
            });
        }
    }
};
</script>
<style>
/* pages/signInHome/signInHome.wxss */
.signInHome-cont {
    width: 690rpx;
    height: 250rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.signInHome-cont .text-cont {
    width: 100%;
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.signInHome-cont .text-cont .title {
    font-size: 28rpx;
    margin-left: 20rpx;
    color: #333;
    font-weight: bolder;
}

.signInHome-cont .text-cont .more {
    width: 100rpx;
    display: flex;
    align-items: center;
    height: inherit;
}

.signInHome-cont .text-cont .more > text {
    font-size: 24rpx;
    color: #666;
}

.signInHome-cont .text-cont .more > image {
    width: 14rpx;
    height: 25rpx;
    margin-left: 7rpx;
    margin-bottom: 3rpx;
}

.signInHome-cont .signInShow-cont {
    width: 650rpx;
    height: 160rpx;
    display: flex;
    justify-content: space-between;
}

.signInHome-cont .signInShow-cont > view {
    width: 80rpx;
    height: 122rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.signInHome-cont .signInShow-cont view .signInShow-Img {
    width: 72rpx;
    height: 72rpx;
    background-color: rgb(255, 252, 68);
    border-radius: 50rpx;
}

.signInHome-cont .signInShow-cont view > text {
    font-size: 24rpx;
    color: #666;
}

.signInHome-cont .signInShow-cont view .signInNumb {
    position: absolute;
    top: 14rpx;
    left: 25rpx;
    font-size: 28rpx;
    color: #666;
}

/* 积分乐园内部组件签到样式 */
.integral-content-container {
    width: 100%;
    background: #fff;
    padding: 16rpx 20rpx;
    margin-bottom: 12rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
}

.integral-title-container {
    width: fit-content;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.integral-title-left-box {
    width: 8rpx;
    height: 28rpx;
    background: #fbe945;
    border-radius: 2rpx;
    margin-right: 16rpx;
}

.integral-title-text {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}

.integral-title-left-box {
    width: 8rpx;
    height: 28rpx;
    background: #fbe945;
    border-radius: 2rpx;
    margin-right: 16rpx;
}

.integral-title-text {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}

.integral-sign-in-btn {
    width: 112rpx;
    height: 40rpx;
    background: #7755fd;
    border-radius: 20rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.integral-sign-in-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 38rpx 0 14rpx;
}
.integral-sign-in-item-box {
    flex: 1;
    display: flex;
    align-items: center;
}
.integral-sign-in-item {
    width: 72rpx;
    height: 120rpx;
    background-color: #fff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 2rpx solid #784afa;
    box-sizing: border-box;
    border-radius: 8rpx;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.integral-sign-in-item-image {
    width: 40rpx;
    height: 40rpx;
    margin: 8rpx 0 4rpx;
}

.integral-sign-in-item-status {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #000000;
    margin-top: 8rpx;
}

.integral-sign-in-add {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #000000;
}

.integral-sign-in-progress {
    width: 28rpx;
    height: 10rpx;
    background-color: #efedec;
}

.integral-sign-in-progress-in {
    height: 100%;
    background: #7261ff;
    /* border-radius: 8rpx; */
}
</style>
