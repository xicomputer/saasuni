<template>
    <view class="member">
        <view
            class="member_head"
            style="
                background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%BF%80%E6%B4%BB%E4%BC%9A%E5%91%98bgc.png);
            "
        >
            <view class="member_head_up">
                <view class="member_head_left">
                    <image :src="cartShop.headImage" mode="aspectFill"></image>
                    <view>{{ cartShop.appName }}</view>
                </view>
                <view class="member_head_right">
                    <image src="/static/pages/img/member/memberCard_vip1.png"></image>
                    <view>{{ memberInfo.memberLeve.name }}</view>
                </view>
                <!-- <view class="member_head_right">
        <image src="/pages/img/member/memberCard_vip1.png" ></image>
        <view style="color: #999999;">普通会员</view>
      </view> -->
            </view>
            <view class="member_head_down">会员积分{{ memberInfo.member.integral }}</view>
        </view>
        <view class="member_rule">
            <view class="member_title">
                <image src="/static/pages/img/member/memberLevel_waveLeft.png"></image>
                <view>积分获取规则</view>
                <image src="/static/pages/img/member/memberLevel_waveRight.png"></image>
            </view>
            <view class="member_rule_one">会员用户每消费{{ memberInfo.memberSetting.moneyConvert }}元获得1积分</view>
            <view class="member_title">
                <image src="/static/pages/img/member/memberLevel_waveLeft.png"></image>
                <view>会员权益</view>
                <image src="/static/pages/img/member/memberLevel_waveRight.png"></image>
            </view>
            <view class="member_rule_two">
                <view class="member_rule_two_title">
                    <view>会员等级</view>
                    <view>专属折扣</view>
                </view>
                <view class="member_rule_two_content">
                    <view class="member_rule_two_content_item" v-for="(item, index) in memberInfo.memberLevelList" :key="index">
                        <view>{{ item.name }}</view>

                        <view>{{ item.discount }}折</view>
                    </view>
                </view>
            </view>
            <view class="member_title">
                <image src="/static/pages/img/member/memberLevel_waveLeft.png"></image>
                <view>晋升规则</view>
                <image src="/static/pages/img/member/memberLevel_waveRight.png"></image>
            </view>
            <view class="member_rule_three" v-for="(item, index) in memberInfo.memberLevelList" :key="index">
                <view class="member_rule_three_title">
                    <view class="member_rule_three_left"></view>
                    <image src="/static/pages/img/member/memberLevel_start.png"></image>
                    <view>{{ item.name }}</view>
                    <image src="/static/pages/img/member/memberLevel_start.png"></image>
                    <view class="member_rule_three_right"></view>
                </view>

                <view class="member_rule_three_content">满{{ item.threshold }}积分成为{{ item.name }}</view>
            </view>
            <view class="member_rule_tips">
                <icon color="#FF0000" type="warn" size="24rpx" style="padding-top: 4rpx"></icon>
                <view>注意：会员规则由商家制定，平台仅提供会员功能。如有疑问，请及时联系商家！</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/member/level/level.js
const app = getApp();
export default {
    data() {
        return {
            marchantId: 0,
            // 商家id
            memberInfo: {
                memberLeve: {
                    name: ''
                },

                member: {
                    integral: ''
                },

                memberSetting: {
                    moneyConvert: ''
                },

                memberLevelList: []
            },
            // 会员信息
            cartShop: {
                headImage: '',
                appName: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId
        });
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });
        this.getMemberInfo();
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
        getMemberInfo() {
            let data = {
                marchantId: this.marchantId,
                type: 3
            };
            app.globalData.sjrequest('/member/queryMemberInfo', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        memberInfo: res.data.data
                    });
                }
            });
        }
    }
};
</script>
<style>
.member {
    width: 100%;
    background: linear-gradient(90deg, #18171f 0%, #3d3b41 100%);
    padding-top: 20rpx;
}
.member_head {
    margin: 0 20rpx;
    width: 710rpx;
    height: 266rpx;
    background-size: 710rpx 266rpx;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20rpx 48rpx 124rpx 28rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.member_head_up {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.member_head_left,
.member_head_right {
    display: flex;
    align-items: center;
}
.member_head_left image {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
}
.member_head_left view {
    margin-left: 16rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
}
.member_head_right image {
    width: 40rpx;
    height: 34rpx;
}
.member_head_right view {
    margin-left: 14rpx;
    font-size: 22rpx;
    font-weight: bold;
    color: #333333;
}
.member_head_down {
    padding-left: 76rpx;
    box-sizing: border-box;
    width: 100%;
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
}
.member_rule {
    margin-top: -84rpx;
    padding-top: 14rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 16rpx 16rpx 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.member_title {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.member_title view {
    font-size: 28rpx;
    font-weight: 400;
    color: #000000;
    margin: 0 16rpx;
}
.member_title image {
    width: 52rpx;
    height: 18rpx;
}
.member_rule_one {
    margin-top: 30rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.member_rule_two {
    width: 710rpx;
    margin-top: 20rpx;
}
.member_rule_two_title {
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
    background: #1f1e25;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    padding: 0 88rpx;
    box-sizing: border-box;
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.member_rule_two_content {
    width: 100%;
    background: #ffffff;
    border: 2rpx solid rgba(153, 153, 153, 0.36);
    border-radius: 0 0 20rpx 20rpx;
    padding: 0 88rpx;
    box-sizing: border-box;
}
.member_rule_two_content_item {
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.member_rule_three {
    margin-top: 20rpx;
    width: 710rpx;
    padding: 20rpx 0;
    background: #f1f1f1;
    box-shadow: 0rpx 6rpx 12rpx rgba(247, 247, 247, 0.16);
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.member_rule_three_title {
    display: flex;
    justify-content: center;
    align-items: center;
}
.member_rule_three_left,
.member_rule_three_right {
    width: 180rpx;
    height: 2rpx;
    background-color: #c68f47;
}
.member_rule_three_title image {
    width: 32rpx;
    height: 30rpx;
    margin: 0 4rpx;
}
.member_rule_three_title {
    font-size: 24rpx;
    font-weight: 400;
    color: #000000;
}
.member_rule_three_content {
    margin-top: 16rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
}
.member_rule_tips {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
    display: flex;
}
.member_rule_tips view {
    margin-left: 20rpx;
    width: 500rpx;
    font-size: 22rpx;
    font-weight: bold;
    line-height: 32rpx;
    color: #ff0000;
}
</style>
