<template>
    <!-- pages/extension/list/list.wxml -->
    <!-- <text>pages/extension/list/list.wxml</text> -->
    <view class="extension">
        <!-- 头部 -->
        <view style="background-color: #000; width: 100%; height: 294rpx; position: fixed">
            <view style="display: flex; margin-top: 60rpx; margin-left: 30rpx">
                <image style="width: 120rpx; height: 120rpx; border-radius: 10rpx" :src="wxUserInfo.userInfo.avatarUrl"></image>
                <text style="color: #fff; margin-left: 15rpx">{{ wxUserInfo.userInfo.nickName }}</text>
            </view>
            <view style="width: 690rpx; height: 400rpx; background-color: #fff; margin: 0 auto; border-radius: 16rpx">
                <view style="background: linear-gradient(to right, #fcd086, #fdaa18); width: 690rpx; height: 180rpx; border-radius: 16rpx; margin: 10rpx auto; margin-top: 60rpx">
                    <view class="member_tool">
                        <navigator class="member_tool_item">
                            <view class="member_tool_item_name">预估到账佣金(元)</view>
                            <view class="member_tool_item_desc">0.00</view>
                        </navigator>
                        <view class="member_tool_item_line"></view>
                        <navigator class="member_tool_item">
                            <view class="member_tool_item_name">总到账佣金(元)</view>
                            <view class="member_tool_item_desc">0.00</view>
                        </navigator>
                    </view>
                    <navigator url="/pages/extension/card/card" class="membere_list_item" style="margin: 30rpx 0">
                        <view class="membere_list_item_left">总销售金额(元)</view>
                        <view style="display: flex; align-items: center">
                            <text style="color: red">0.00</text>
                            <image src="/static/pages/img/member/icon_enter.png" class="membere_list_item_right" style="margin-left: 20rpx"></image>
                        </view>
                    </navigator>
                    <navigator
                        url="/pages/extension/card/card"
                        style="
                            background-color: #dcdada;
                            border-bottom-left-radius: 16rpx;
                            border-bottom-right-radius: 16rpx;
                            width: 100%;
                            height: 74rpx;
                            line-height: 74rpx;
                            text-align: center;
                        "
                    >
                        查看详情
                    </navigator>
                    <view style="width: 690rpx; height: 260rpx; margin: 0 auto; background-color: #fff; margin-top: 20rpx">
                        <view style="width: 100%; font-weight: 900; padding: 20rpx">推广卖货</view>
                        <view class="member_tool" style="border-top: 2rpx solid rgb(223, 222, 222); height: 170rpx">
                            <view style="display: flex; justify-content: space-between; width: 344rpx; padding: 0 20rpx">
                                <navigator class="member_tool_item" style="align-items: flex-start" url="/pages/extension/product/product">
                                    <view class="member_tool_item_name" style="font-size: 28rpx">推广商品</view>
                                    <view class="member_tool_item_desc" style="font-size: 24rpx; color: #999999; font-weight: 100">佣金赚不够</view>
                                </navigator>
                                <image style="width: 64rpx; height: 64rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/extensionicon1.png"></image>
                            </view>
                            <view class="member_tool_item_line" style="border: 1rpx solid rgb(223, 222, 222)"></view>
                            <button
                                open-type="share"
                                class="sharebtn"
                                style="display: flex; justify-content: space-between; width: 344rpx; padding: 0 20rpx; background-color: white"
                            >
                                <navigator class="member_tool_item" style="align-items: flex-start">
                                    <view class="member_tool_item_name" style="font-size: 28rpx">推广店铺</view>
                                    <view class="member_tool_item_desc" style="font-size: 24rpx; color: #999999; font-weight: 100">一键转发分享店铺</view>
                                </navigator>
                                <image style="width: 64rpx; height: 64rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/extensionicon2.png"></image>
                            </button>
                        </view>
                    </view>

                    <view style="width: 690rpx; height: 260rpx; margin: 0 auto; background-color: #fff; margin-top: 20rpx">
                        <view style="width: 100%; font-weight: 900; padding: 20rpx">工具</view>
                        <navigator
                            url="/pages/extension/team/team"
                            class="member_tool"
                            style="border-top: 2rpx solid rgb(223, 222, 222); height: 170rpx; display: flex; flex-direction: column; width: 25%"
                        >
                            <image style="width: 64rpx; height: 64rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/extensionicon3.png"></image>
                            <text>推广成员</text>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/extension/list/list.js
export default {
    data() {
        return {
            wxUserInfo: uni.getStorageSync('wx_userinfo_key') || {},
            marchantId: '',
            avatarUrl: '',
            nickName: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        this.setData = {
            marchantId: options.marchantId
        };
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log(this.wxUserInfo, '9898980');
    },
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
    onShareAppMessage: function (res) {
        let uniqueId = uni.getStorageSync('uniqueId1');
        return {
            title: '发现了一家宝藏店铺，赶紧来抢购吧！',
            path: '/pages/shopHome/home/home?marchantId=' + this.marchantId + '&uniqueId=' + uniqueId + '&sss=1111',
            imageUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/goto.jpg'
        };
    },
    methods: {}
};
</script>
<style>
/* pages/extension/list/list.wxss */
.extension {
    min-height: 100vh;
    background-color: #f7f7f7;
    /* padding-top: 20rpx; */
    box-sizing: border-box;
}

.sharebtn::after {
    border: none;
}
/* 头部 */
.member_head {
    width: 710rpx;
    height: 266rpx;
    background-size: 710rpx 266rpx;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20rpx 48rpx 166rpx 28rpx;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.member-explain {
    width: 176rpx;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 32rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 36rpx;
    right: 48rpx;
}
.member_head_left {
    display: flex;
}
.member_head_left image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.member_head_left_info {
    margin-left: 28rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.member_head_left_name {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
}
.member_head_left_desc {
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
}
.member_head_right {
    display: flex;
    font-size: 22rpx;
    font-weight: bold;
    line-height: 32rpx;
    color: #333333;
}
.member_head_right image {
    width: 40rpx;
    height: 34rpx;
    margin-right: 14rpx;
}
/* 工具 */
.member_tool {
    height: 180rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-bottom: 2rpx solid #F4F4F4; */
}
.member_tool_item_line {
    width: 0rpx;
    height: 78rpx;
    border: 2rpx solid #f4f4f4;
}
.member_tool_item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.member_tool_item_name {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #000000;
}
.member_tool_item_desc {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
/* 激活按钮 */
.member_btn {
    border: 2rpx solid #f4f4f4;
}
.member_btn-state {
    width: 248rpx;
    height: 56rpx;
    border: 2rpx solid #333333;
    border-radius: 12rpx;
    font-size: 24rpx;
    color: #333333;
    font-weight: bold;
    line-height: 56rpx;
    text-align: center;
    margin: 40rpx auto 64rpx;
}
/* 拒绝状态 */
.refund-state-box {
    width: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.refund-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
}
.refund-reason {
    width: 664rpx;
    height: 140rpx;
    background: #f4f4f4;
    border-radius: 12rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #666666;
    margin: 20rpx 0 20rpx 24rpx;
    padding: 12rpx 20rpx;
    box-sizing: border-box;
}
.refund-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.refund-text-btn {
    color: #002bff;
    width: fit-content;
    margin-left: 24rpx;
    margin-top: 20rpx;
}
/* 列表 */
.membere_list {
    width: 100%;
}
.membere_list_item {
    border-bottom: 2rpx solid #f4f4f4;
    width: 100%;
    height: 84rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.membere_list_item_left {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
.membere_list_item_right {
    width: 24rpx;
    height: 48rpx;
}
.explain-container {
    width: 100%;
    height: 100vh;
    padding: 40rpx 20rpx;
    box-sizing: border-box;
}
.explain-title {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
.explaine-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
    margin-top: 20rpx;
}
</style>
