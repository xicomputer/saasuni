<template>
    <!-- pages/smallShop/exclusive/exclusive.wxml -->
    <view>
        <view :style="'width:100%;height:480rpx;margin-top:' + statusAllHeight + 'px'">
            <swiper :indicator-dots="false" :circular="true" :autoplay="true" interval="3000" style="width: 100%; height: 100%">
                <block v-for="(item, index) in fxBannerList" :key="index">
                    <swiper-item class="swiper-item">
                        <image :src="item" style="width: 100%" />
                    </swiper-item>
                </block>
            </swiper>
        </view>
        <view class="commission">
            <view class="commission_top">
                <view url="/pages/retail/AllRecorder/AllRecorder" style="margin-top: 20rpx; text-align: left; padding-left: 50rpx">
                    <view class="get-money">总收入</view>
                    <view class="totalPrice price">{{ distributionAmount == '' ? '0.00' : distributionAmount }}(元)</view>
                </view>
                <view class="get-container">
                    <text class="get-money">技术总服务费 {{ serviceCharge == '' ? '0.00(元)' : serviceCharge + '(元)' }}</text>
                    <text class="get-money">可提现总佣金 {{ noWithdrawal == '' ? '0.00(元)' : noWithdrawal + '(元)' }}</text>
                    <text class="get-money">预估佣金总收入 {{ stayAmount == '' ? '0.00(元)' : stayAmount + '(元)' }}</text>
                    <text class="get-money">已提现总佣金 {{ unWithdrawal == '' ? '0.00(元)' : unWithdrawal + '(元)' }}</text>
                </view>
            </view>
            <view class="fx-exlpain-btn" @tap="toExlpain">
                说明
                <image class="wenhao" src="/static/pages/img/wenhao.png"></image>
            </view>
        </view>
        <view class="tool-container">
            <view class="tool-title">
                我的工具
                <!-- <navigator class="fx-intro" hover-class="none" url="/pages/videoIntro/videoIntro">操作指南<image class="wenhao" src="/pages/img/wenhao.png"></image></navigator> -->
            </view>
            <view class="tool-list">
                <view @tap="toWithDraw" class="tool-item">
                    <image class="tool-img" src="/static/pages/img/my/tx.png"></image>
                    <view class="tool-text">立即提现</view>
                </view>
                <!-- <navigator class="tool-item" hover-class="none" url="/pages/retail/searchRetailStore/searchRetailStore">
                <image class="tool-img" src="/pages/img/my/sys.png"></image>
                <view class="tool-text">添加商家</view>
            </navigator>
            <navigator class="tool-item" hover-class="none" url="/pages/verifyStore/verifyStore?accredit={{userInfo.accredit}}">
                <image class="tool-img" src="/pages/img/my/test.png"></image>
                <view class="tool-text">审核商家</view>
            </navigator> -->
                <navigator class="tool-item" hover-class="none" url="/pages/smallShop/subordinate/subordinate">
                    <image class="tool-img" src="/static/pages/img/my/fxry.png"></image>
                    <view class="tool-text">小店粉丝</view>
                </navigator>
                <navigator class="tool-item" hover-class="none" url="/pages/Notice/Notice">
                    <image class="tool-img" src="/static/pages/img/my/ziqu.png"></image>
                    <view class="tool-text">消息通知</view>
                    <view class="tool-num" v-if="noticeNum > 0">{{ noticeNum > 99 ? 99 : noticeNum }}</view>
                </navigator>
            </view>
        </view>
        <!-- 列表 -->
        <view class="windowList">
            <view class="list" v-for="(item, index) in windowList" :key="index">
                <myShop @del="del($event, { id: item.marchantId })" :propA="type" :itemObj="item" :data-id="item.marchantId" type="1" />
            </view>
            <view v-if="txt && windowList.legth" class="txt">没有更多内容了...</view>

            <view class="no-spread" v-if="!windowList.length">
                <image class="no-spread-img" src="/static/pages/smallShop/img/no_spread.png" />
                <view class="no-spread-notice">此类商家暂无...</view>
            </view>

            <!-- 说明 -->
            <van-popup :show="showExplain" @close="onClose" closeable stayAmount position="bottom" round>
                <scroll-view :scroll-y="true" class="explain">
                    <view class="explain-title">总收入</view>
                    <view class="explain-text">您在平台所获得的佣金总和，不含技术服务费的金额</view>
                    <view class="explain-title" style="margin-top: 20rpx">预估佣金收入</view>
                    <view class="explain-text">当用户通过您分享的链接或海报购买商品后，金额即可成为“待入账”金额，用户7天内不退款，款项进入可提现金额。</view>
                    <view class="explain-title" style="margin-top: 20rpx">技术服务费</view>
                    <view class="explain-text">分销人员所得佣金25%作为平台的技术支持和硬软件开发，维护等费用，由平台自动扣除</view>
                    <view class="explain-title" style="margin-top: 20rpx">提现说明</view>
                    <view class="explain-text">
                        您在本平台目前可提现金额总和，平台自收到您发起的提现申请后审核，审核无误会在申请日起隔日与您转账，如果最近有一条提现申请在审核中，就不能发起新的提现申请
                    </view>
                </scroll-view>
            </van-popup>
            <van-popup :show="showApp" @close="onClose" closeable stayAmount position="bottom" round>
                <view class="apply">
                    <view class="apply-text">提现说明</view>
                    <view class="entryRules">平台显示您的目前可提现金额，您可以发起提现通知，平台将通知商家，由商家为您转账，平台不提供转账功能</view>
                </view>
            </van-popup>
        </view>
        <view class="foot">
            <view class="foot_table me-fx-row">
                <view class="me-fx-col me-fx-1 me-fx-c-c br-r">
                    <image class="foot_table_img" src="/static/static/image/tabbar/tabbar_010.png"></image>
                    <text class="cur">首页</text>
                </view>
                <view class="me-fx-col me-fx-1 me-fx-c-c" @tap="goScart">
                    <image class="foot_table_img" src="/static/static/image/tabbar/scart.png"></image>
                    <text>小店</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// pages/smallShop/exclusive/exclusive.js
export default {
    components: {
        // vanPopup
    },
    data() {
        return {
            fxBannerList: ['https://xssj.letterbook.cn/applet/images/fx_banner1.jpg', 'https://xssj.letterbook.cn/applet/images/fx_banner2.jpg'],
            distributionAmount: '',
            serviceCharge: '',
            noWithdrawal: '',
            stayAmount: '',
            unWithdrawal: '',
            showExplain: false,
            distributionRules: false,
            showApplied: false,
            showApp: false,
            statusAllHeight: '',
            noticeNum: 0,
            windowList: [],
            type: '',
            txt: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
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
        toExlpain() {
            this.setData({
                showExplain: true
            });
        },

        onClose: function () {
            this.setData({
                distributionRules: false
            });
            this.setData({
                showApplied: false
            });
            this.setData({
                showApp: false
            });
            this.setData({
                showExplain: false
            });
        },

        goScart() {
            uni.redirectTo({
                url: '/pages/smallShop/Scart/Scart'
            });
        },

        toWithDraw() {
            uni.navigateTo({
                url: `/pages/smallShop/Withdraw/Withdraw`
            });
        },

        del(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 del 未声明');
        }
    }
};
</script>
<style>
/* pages/tabBar/home/home.wxss */
page {
    background-color: #f7f7f7;
}
/* 搜索框 */
.search-container {
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9998;
    background: #fff;
}
.search-container-box {
    width: 484rpx;
    height: 64rpx;
    border: 2rpx solid #e4e4e4;
    border-radius: 32rpx;
    margin-left: 30rpx;
    display: flex;
    align-items: center;
}
.search-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
}
/* 工具 */
.tool-container {
    width: 90%;
    height: 202rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx auto 0;
    box-shadow: 0rpx 4rpx 6rpx rgba(0, 0, 0, 0.16);
    padding: 20rpx;
    box-sizing: border-box;
}
.tool-title {
    width: 100%;
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tool-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 16rpx;
}
.tool-item {
    width: 20%;
    height: 106rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.tool-img {
    width: 64rpx;
    height: 64rpx;
}
.tool-text {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    white-space: nowrap;
}
.tool-num {
    width: 40rpx;
    height: 40rpx;
    border-radius: 40rpx;
    position: absolute;
    top: -10rpx;
    right: 20rpx;
    font-size: 20rpx;
    background-color: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* 列表 */
.windowList {
    height: 400rpx;
    margin-top: 24rpx;
    /* padding: 0 30rpx; */
}
.personalC {
    width: 100%;
    background: #f9f9f9;
    position: relative;
    z-index: 1;
}
.pc_top {
    width: 100%;
    height: 420rpx;
    padding-top: 96rpx;
    background: linear-gradient(91deg, #f64756 0%, #fc5800 100%);
    opacity: 0.98;
    box-sizing: border-box;
}
.pc_name {
    margin-left: 28rpx;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
}

.pc_name view {
    font-size: 42rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
    opacity: 1;
}

.wxImg {
    padding-left: 20rpx;
    /* display: flex;
    justify-content: center; */
}

.wxImg image {
    width: 126rpx;
    height: 126rpx;
    border-radius: 50%;
    text-align: center;
}

.topUser {
    position: relative;
    height: 454rpx;
    margin-bottom: 200rpx;
    border-bottom-left-radius: 50% 20rpx;
    border-bottom-right-radius: 50% 20rpx;
    background: linear-gradient(90deg, #f64756 0%, #fc5800 100%);
}
.top {
    display: flex;
    position: relative;
    justify-content: flex-start;
    font-weight: bold !important;
    font-size: 28rpx;
    color: #ffffff;
    position: relative;
    z-index: 2;
    opacity: 0.98;
}
.top .back-btn {
    position: absolute;
    width: 100rpx;
    height: 60rpx;
    left: 30rpx;
    top: 65rpx;
    font-size: 32rpx;
    color: #fff;
}
.top .back-btn .back {
    font-size: 70rpx;
}

.business-photo {
    margin-top: 148rpx;
    padding-left: 30rpx;
}

.touxiang {
    margin-left: 40rpx;
    height: 160rpx;
    width: 160rpx;
    border-radius: 50%;
}

.rig_title {
    margin-top: 154rpx;
    /* display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap:wrap;
    flex-direction:column; */
    padding-left: 30rpx;
}

.f-name {
    width: 40%;
    height: 60rpx;
    line-height: 60rpx;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 86rpx;
    margin-left: 20rpx;
    font-weight: bold !important;
    font-size: 28rpx;
}

.b-name {
    line-height: 60rpx;
    flex-direction: column;
    font-weight: bold !important;
    font-size: 32rpx;
    text-align: left;
}
.yqm,
.number {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    height: 33rpx;
    line-height: 33rpx;
    color: #ffffff;
    opacity: 1;
}
.number {
    margin-top: 12rpx;
}
.top_right {
    margin-top: 126rpx;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    right: 0;
    z-index: 1;
}
.fx_gz {
    margin-top: 104rpx;
}
.fxgz {
    width: 213rpx;
    height: 220rpx;
}

.b-name .bianji {
    width: 26rpx;
    height: 26rpx;
    margin: 3px 0 0 12rpx;
}

.signature_dialog {
    width: 320px;
    border-radius: 20rpx;
}

.signature_content {
    text-align: center;
    margin: 60rpx;
}

.signature_textarea {
    border-radius: 4px;
    padding: 20rpx;
}

.signature_btn {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
}

.signature_btn_sure {
    background-color: #101010;
    color: #fff;
}

.signature_btn_cancel {
    border: 1px solid #101010;
    margin-left: 20rpx;
}

.signature_btn .btn {
    height: 68rpx;
    width: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20rpx;
}
.setup {
    position: absolute;
    z-index: 0;
    height: 32rpx;
    right: 0;
    margin-top: 36rpx;
}
.setup image {
    width: 34rpx;
    height: 32rpx;
    margin-right: 32rpx;
}
.mobilePhone {
    margin-left: 20rpx;
    width: 36%;
    height: 60rpx;
    line-height: 60rpx;
    float: left;
    margin-top: 10rpx;
    box-sizing: border-box;
}

.van-tab--active {
    color: #de142b;
    font-weight: 500;
}

.withdrawal {
    width: 170rpx;
    height: 54rpx;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;
}

.jiantou {
    width: 12rpx;
    height: 20rpx;
    margin-left: 10rpx;
}

.hiddenInput {
    display: none;
}

.commission {
    text-align: center;
    width: 90%;
    background: #ffffff;
    box-shadow: 0px 4rpx 6rpx rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 20rpx;
    line-height: 40rpx;
    position: relative;
    z-index: 10;
    margin: -160rpx auto 0;
    padding-bottom: 20rpx;
    /* top: 50rpx; */
}
.fx-exlpain-btn {
    position: absolute;
    padding: 20rpx;
    top: 20rpx;
    right: 20rpx;
    font-size: 30rpx;
    color: #999;
    display: flex;
    align-items: center;
}
.fx-intro {
    font-size: 30rpx;
    font-weight: 400;
    color: #999;
    display: flex;
    align-items: center;
}
.commission_top {
    width: 100%;
    padding-top: 20rpx;
}

.totalCommission {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #333333;
    opacity: 1;
}

.totalPrice {
    color: #ec1919;
    margin-top: 20rpx;
}
.totaPrice1 {
    display: flex;
    justify-content: space-around;
}

.price {
    font-size: 48rpx;
    font-weight: bold;
    margin-top: 20rpx;
}

.leftPrice,
.rightPrice {
    width: 50%;
    float: left;
    margin-top: 20rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26rpx;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
}
.estimate,
.mentioned {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 30rpx;
    float: left;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 26rpx;
    color: rgba(153, 153, 153, 1);
    opacity: 1;
}

.wenhao {
    width: 30rpx;
    height: 30rpx;
    margin-left: 10rpx;
}
.kt_yj {
    display: flex;
    justify-content: center;
    margin-top: 8rpx;
}
.money {
    font-size: 32rpx;
    color: #333333;
}
.element {
    color: #333333;
    opacity: 1;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 18rpx;
    margin-left: 10rpx;
}

.estimate,
.mentioned {
    font-size: 24rpx;
    color: #999999;
}

.apply {
    height: auto;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 16rpx;
    position: relative;
    padding-top: 35px;
    /* box-sizing: border-box; */
}
.apply-text {
    width: 224rpx;
    height: 46rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 46rpx;
    color: rgba(32, 37, 45, 1);
    margin: 0 auto;
}

.entryRules {
    width: 325px;
    margin: 0 auto;
    font-size: 28rpx;
    line-height: 40rpx;
    padding: 20rpx 30rpx 0 30rpx;
    color: #9a9a9a;
}

.apply-btn {
    width: 167px;
    height: 80rpx;
    background: rgba(16, 16, 16, 1);
    box-shadow: 0px 10rpx 20rpx rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 60rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40rpx;
    right: 50%;
    transform: translateX(50%);
}

.tel_tit {
    display: flex;
    align-items: center;
}

.tel_tit image {
    width: 44px;
    height: 44px;
}
.tel_bt {
    margin-left: 7px;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 7px;
}
.tel_phone {
    height: 30rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 7px;
    margin-top: 30rpx;
}

.tel_dx {
    height: 26rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 7px;
    margin-top: 20rpx;
}

.tel-container {
    margin-top: 31px;
}

.tel-ite {
    height: 80rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    border-radius: 40rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    box-sizing: border-box;
}

.codeli {
    display: flex;
    align-items: center;
    width: 60%;
}

.phone-item {
    margin-bottom: 30rpx;
}

.code-item {
    justify-content: space-between;
}

.tel-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 7px;
}

.tel-input {
    /* width:60%; */
    border: none;
    font-size: 28rpx;
}

.getco {
    /* width:20%; */
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    padding-left: 16rpx;
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    text-align: center;
    /* margin-left: 30rpx; */
}

.tel-btns {
    width: 280px;
    height: 44px;
    background: rgba(16, 16, 16, 1);
    color: #fff;
    border-radius: 22px;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 44px;
    text-align: center;
    margin: 60rpx auto;
}
.code-active {
    color: #101010;
}
/* 我的橱窗 */
.my-cuc {
    /* margin-top: 227rpx; */

    /* padding: 0 30rpx; */
    background: #ffffff;
}
.my-cuc .tb .list {
    /* padding: 0 30rpx; */
    background: #ffffff;
}

.my_top {
    display: flex;
    padding-top: 34rpx;
    padding-left: 30rpx;
    align-items: center;
}
.cc_img {
    width: 44rpx;
    height: 44rpx;
}
.my_title {
    display: flex;
    align-items: center;
    margin-left: 30rpx;
}
.my-zt {
    font-size: 32rpx;
    margin-left: 16rpx;
    font-family: PingFang SC;
    font-weight: bold;

    color: #333333;
    opacity: 1;
}
.tb {
    border-radius: 40rpx;
}
.selection {
    display: flex;
    height: 128rpx;
    background: #f2f2f2;
    align-items: center;
}
.saixuan {
    width: 58rpx;
    height: 58rpx;
}
.select {
    width: 176rpx;
    height: 240rpx;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    opacity: 1;
    border-radius: 5px;
    position: absolute;
    z-index: 9999;
    right: 14px;
    top: 45px;
    padding-top: 10px;
    box-sizing: border-box;
}
.select-text {
    margin-bottom: 10rpx;
    font-family: PingFang SC;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #333333;
    opacity: 1;
}

.active {
    background-color: rgba(231, 161, 36, 0.2);
}

.bott {
    width: 100%;
    height: 106rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
    opacity: 1;
}
.bott_my {
    width: 375rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bott_my image {
    width: 48rpx;
    height: 48rpx;
}
.bott_my .bott_txt {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
    opacity: 1;
}

.main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.content {
    width: 100vw;
    flex: 1;
    background: #ffffff;
}
.no-spread {
    width: 100%;
    text-align: center;
    padding: 10px 30px 0;
    box-sizing: border-box;
}
.no-spread-img {
    widows: 316px;
    height: 184px;
}

.no-spread-notice {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 21px;
    color: #333333;
}
.txt {
    text-align: center;
    color: #999999;
    padding: 20rpx 0;
}
.butt {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 9999;
    opacity: -1;
}
.xs-logo {
    width: 560rpx;
    height: 460rpx;
    margin: 123rpx 0 111rpx 109rpx;
    text-align: center;
    display: block;
}
.sq-item {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #999999;
    margin: 10rpx;
}
.wx-bind-btn {
    width: 100%;
    height: 88rpx;
    background: #05c161;
    border-radius: 44rpx;
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 70rpx 0;
}
.cancel-btn {
    width: 100%;
    height: 88rpx;
    border-radius: 44rpx;
    border: 1px solid #9f9f9f;
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
}
.get-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 40rpx;
    margin-top: 30rpx;
    box-sizing: border-box;
}
.get-money {
    width: 40%;
    font-size: 22rpx;
    line-height: 30rpx;
    font-family: PingFang-SC-Medium;
    color: #999;
    opacity: 1;
    display: flex;
    margin-bottom: 10rpx;
    white-space: nowrap;
}
.explain {
    max-height: 800rpx;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 16rpx;
    padding: 50rpx 0 20rpx;
}
.explain-title {
    width: fit-content;
    height: 46rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    color: rgba(32, 37, 45, 1);
    opacity: 1;
    margin: 0 auto;
    margin-bottom: 40rpx;
}

.explain-text {
    width: 650rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48rpx;
    color: rgba(163, 171, 181, 1);
    opacity: 1;
    margin: 0 auto;
}

/* 绑定手机号 */
.bind-tel-container {
    width: 100%;
    height: 360rpx;
    background-color: #fff;
}
.bind-tel-top {
    width: 100%;
    height: 100rpx;
    background: #ededed;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    display: flex;
    align-items: center;
    padding-left: 40rpx;
    box-sizing: border-box;
}
.bind-tel-btn-container {
    width: 100%;
}
.bind-tel-btn {
    width: 100%;
    height: 130rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #504747;
    display: flex;
    align-items: center;
    padding-left: 40rpx;
    box-sizing: border-box;
}

.foot {
    height: 160rpx;
}
.foot_table {
    border-top: 1px solid #e3e3e3;
    font-size: 24rpx;
    height: 100rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    color: #999;
}
.foot_table > view {
    justify-content: space-between;
    padding-top: 5rpx;
}
.foot_table_img {
    width: 60rpx;
    height: 60rpx;
}
.cur {
    color: #cd4c4c;
}
</style>
