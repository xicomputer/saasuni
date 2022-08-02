<template>
    <view class="withdrawal-container">
        <navigator url="../SelectBankCard/SelectBankCard">
            <view class="bank-box" v-if="play">
                <image :src="commission.bankCode" class="bank-image"></image>
                <view class="bangk-info">
                    <view class="bank-name">{{ commission.bankName }}</view>
                    <view class="bank-card">尾号{{ commission.cardNumber }}{{ cardType }}</view>
                </view>
                <image src="" class="bank-right-arrow"></image>
            </view>
        </navigator>

        <view url="../SelectBankCard/SelectBankCard" v-if="!play">
            <view class="bank-box" @tap="toSelectBankCard">
                <view style="display: flex; align-items: flex-end">
                    <image style="width: 90rpx; height: 90rpx; border-radius: 10rpx" :src="headImgUrl ? headImgUrl : '../img/wx_icon.png'"></image>
                    <view class="wx-text-box">
                        <view style="margin-bottom: 20rpx">提现至</view>
                        <view>微信</view>
                    </view>
                </view>
                <image src="/static/pages/img/goin.png" class="bank-right-arrow"></image>
            </view>
        </view>

        <view class="withdraw-head">
            <view class="withdraw-text">提现金额</view>
            <view class="withdraw-num">
                <span class="withdraw-icon">￥</span>
                <input
                    type="number"
                    v-if="money == 0"
                    placeholder="提现金额"
                    :disabled="true"
                    @input=""
                    class="withdraw-input"
                    placeholder-style="font-size:20rpx;color:#999999; "
                />
                <input
                    type="number"
                    v-if="money != 0"
                    :value="money"
                    :disabled="true"
                    @input=""
                    class="withdraw-input"
                    placeholder="提现金额"
                    placeholder-style="font-size:20rpx;color:#999999; "
                />
            </view>
            <view class="withdraw-cans">
                <view>
                    余额
                    <span class="balance">￥{{ balance }}</span>
                </view>
                <navigator url="../WithdrawalDetails/WithdrawalDetails">
                    <view class="tixian" @tap="">
                        <image class="tx-image" src="/static/pages/img/tixian.png" alt=""></image>
                        <span class="tx_txt">提现记录</span>
                    </view>
                </navigator>
            </view>
            <view :class="money > 0 ? 'btn btn-bg' : 'btn'" @tap="showApplyToast">申请提现</view>
        </view>
        <view class="spread-box">
            <van-list>
                <!-- v-for="(item, index) in selectCommission" key="index"bindtap.stop="cli(index)" -->
                <van-checkbox-group :value="result" @change="onChange">
                    <view class="goods-detail" v-for="(item, index) in commissionList" :key="index">
                        <view class="check">
                            <van-checkbox
                                :name="item.marchantId"
                                @tap.native="toggle($event, { id: item.marchantId, index })"
                                :data-id="item.marchantId"
                                :data-index="index"
                            ></van-checkbox>
                        </view>

                        <image class="goods-image" :src="item.logoPic" data-index="item"></image>

                        <view class="goods-info">
                            <view class="goods-name">{{ item.nickName }}</view>
                            <view class="goods-address">佣金{{ item.servantsMoney }}</view>
                        </view>
                    </view>
                </van-checkbox-group>
            </van-list>
        </view>
        <van-popup :show="showApplied" closeable round :close-on-click-overlay="false">
            <view class="apply">
                <view class="apply-text">提现申请已提交</view>
                <view class="apply-btn" @tap="hideApplyToast">确认</view>
            </view>
        </van-popup>
        <van-toast id="van-toast" />
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanCheckbox from './@vant/weapp/checkbox/index';
// import vanCheckboxGroup from './@vant/weapp/checkbox-group/index';
// import vanToast from './@vant/weapp/toast/index';
// pages/retail/Withdraw/Withdraw.js
const app = getApp();
// import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
export default {
    components: {
        // vanPopup,
        // vanCheckbox,
        // vanCheckboxGroup,
        // vanToast
    },
    data() {
        return {
            result: [],
            type: '',
            play: false,
            showApplied: false,
            money: 0,
            commissionList: [],
            cardType: '储蓄卡',
            //卡类型
            value: '',
            commission: [],
            balance: '',
            //余额
            commissionJson: [],
            headImgUrl: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type = options.type;
        this.setData({
            type: type,
            headImgUrl: options.headImgUrl
        });
        this.pageUp();
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
    // onShareAppMessage: function () {
    // }
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        onChange(event) {
            // var index = this.data.result.findIndex((item) => {
            //   return item == checkbox.marchantId
            // })
            this.setData({
                result: event.detail
            });
        },

        toggle(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var that = this;
            var id = e.currentTarget.dataset.index;
            var idx = e.currentTarget.dataset.id; //判断当前点击的是否在复选框中

            var index = this.result.findIndex((item) => {
                return item == idx;
            });
            console.log(index);
            var money = that.money;

            if (index != -1) {
                console.log('选中了');
                this.commissionJson.splice(id, 0, {
                    marchantId: +that.commissionList[id].marchantId,
                    servantsMoney: +that.commissionList[id].servantsMoney
                }); //console.log(this.data.commissionJson)

                const servantsMoney = that.commissionList[id].servantsMoney;
                const money = that.money;
                const total = (money * 1000 * 1000 + servantsMoney * 1000 * 1000) / 1000 / 1000;
                that.setData({
                    money: total
                });
            } else {
                console.log('没选中');
                that.commissionJson[id].isDelete = true;
                let money = that.money;
                let servantsMoney = that.commissionList[id].servantsMoney;
                const total = (money * 1000 * 1000 - servantsMoney * 1000 * 1000) / 1000 / 1000;
                that.setData({
                    money: total
                });
            }
        },

        pageUp: function () {},
        showApplyToast() {},

        toSelectBankCard() {
            console.log('占位：函数 toSelectBankCard 未声明');
        },

        hideApplyToast() {
            console.log('占位：函数 hideApplyToast 未声明');
        }
    }
};
</script>
<style>
.withdrawal-container {
    width: 100%;
    height: 100vh;
    background: #f9f9f9;
    padding-top: 20rpx;
    box-sizing: border-box;
}

.bank-box {
    width: 100%;
    height: 140rpx;
    background: #fff;
    padding: 0 20rpx 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.card-item {
    width: 750rpx;
    height: 140rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    padding: 0 20rpx 0 30rpx;
}

.bank-image {
    width: 312rpx;
    height: 101rpx;
    margin-right: 20rpx;
}

.bangk-info {
    width: 0;
    flex: 1;
    height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.bank-name {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    opacity: 1;
}

.bank-card {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
    opacity: 1;
}

.bank-right-arrow {
    width: 10rpx;
    height: 20rpx;
}
.wx-text-box {
    margin-left: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 28rpx;
}

.withdraw-head {
    margin-top: 30rpx;
    width: 100%;
    height: 420rpx;
    background: #ffffff;
    position: relative;
}
.withdraw-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    opacity: 1;
    padding-top: 30rpx;
    box-sizing: border-box;
    margin-left: 40rpx;
}

.withdraw-num {
    width: 100%;
    display: flex;
    margin-top: 18rpx;
    border-bottom: 1px solid #f3f3f3;
}
.withdraw-icon {
    font-size: 70rpx;
    width: 70rpx;
    height: 98rpx;
    font-size: 70rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 98rpx;
    color: #333333;
    margin-left: 40rpx;
}

.withdraw-input {
    width: 0;
    flex: 1;
    font-size: 70rpx;
    height: 98rpx;
    background: #fff;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 98rpx;
    color: #333333;
    opacity: 1;
    border: none;
}

.withdraw-cans {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #999999;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
}
.tixian {
    display: flex;
    align-items: center;
}
.tx-image {
    width: 34rpx;
    height: 34rpx;
}
.tx_txt {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    opacity: 1;
    margin-left: 10rpx;
}
.balance {
    margin-left: 10rpx;
}

.withdraw-all {
    color: #ea4158;
    margin-left: 20rpx;
}

.btn {
    width: 480rpx;
    height: 80rpx;
    background: rgba(200, 200, 200, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    color: #666;
    position: absolute;
    bottom: 46rpx;
    right: 114rpx;
}

.btn-bg {
    background: rgba(231, 10, 36, 1);
    box-shadow: 0px 6rpx 8rpx rgba(231, 161, 36, 0.3);
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    color: #fff;
}

input::-webkit-input-placeholder {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: rgba(153, 153, 153, 1);
    opacity: 1;
    padding-left: 20rpx;
}

.withdraw-record {
    padding-top: 20rpx;
    background: white;
    margin-top: 20rpx;
    height: 726rpx;
    box-sizing: border-box;
}
.withdraw-title {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    margin-left: 30rpx;
    color: rgba(51, 51, 51, 1);
}

.withdraw-item {
    width: 100%;
    height: 156rpx;
    padding: 20rpx 30rpx 30rpx;
    border-bottom: 1rpx solid #fff3f3f3;
    box-sizing: border-box;
}
.first-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item-name {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 46rpx;
    color: rgba(32, 37, 45, 1);
}

.item-num {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: rgba(234, 65, 88, 1);
}

.last-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
}
.item-time {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: rgba(32, 37, 45, 1);
}

.item-state {
    font-size: 24rpx;
    font-weight: 500;
    line-height: 34rpx;
    color: rgba(51, 51, 51, 1);
}

.active {
    color: rgba(231, 161, 36, 1);
}

.apply {
    width: 560rpx;
    height: 410rpx;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 16rpx;
    position: relative;
    padding-top: 130rpx;
    box-sizing: border-box;
}
.apply-text {
    width: 224rpx;
    height: 46rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 46rpx;
    color: rgba(32, 37, 45, 1);
    margin: 0 auto;
}

.apply-btn {
    width: 334rpx;
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

/* 提现明细 */
.spread-box {
    width: 100%;
    height: 100%;
    border-top: 20rpx solid #f9f9f9;
    height: auto;
    padding: 0 30rpx;
    background: #fff;
    box-sizing: border-box;
}
.goods-detail {
    width: 100%;
    height: 160rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1rpx solid #f3f3f3;
}
.bod-bottom {
    width: 98%;
    height: 10rpx;
    border-bottom: 1px solid #e4e4e4;
}

.check {
    margin-left: 40rpx;
}

.goods-image {
    width: 120rpx;
    height: 120rpx;
    margin-left: 50rpx;
    border-radius: 50%;
}

.goods-info {
    height: 160rpx;
    word-break: break-all;
    margin-left: 30rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: left;
}
.goods-name {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 38rpx;
    color: #333333;
}

.goods-address {
    margin-top: 20rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 38rpx;
    color: #afafaf;
}
.icon {
    font-size: 22rpx;
}
.promptBox {
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: black;
    bottom: 0;
    left: 0;
    position: fixed;
}

.myself {
    width: 480rpx;
    height: 260rpx;
    background: #fff;
    position: absolute;
    left: 19%;
    top: -20%;
}

.tips {
    font-size: 40rpx;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-top: 60rpx;
}

.ret,
.determine {
    display: inline-block;
    margin-top: 72rpx;
    text-align: center;
    width: 118px;
}

.ret span {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: inline-block;
    color: #666666;
    border-radius: 34rpx;
    font-size: 28rpx;
    border: 1px solid #e7e7e7;
}

.determine span {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: inline-block;
    background: #867c7c;
    color: #f4f4f4;
    border-radius: 34rpx;
    font-size: 28rpx;
}
</style>
