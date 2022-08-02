<template>
    <view>
        <view class="list">
            <view class="list_tab">
                <block v-for="(item, index) in statusList" :key="index">
                    <view @tap="changeTab" :data-index="index" :class="'list_tab_item ' + (index == status || (index == 0 && status == -1) ? 'list_tab_item_active' : '')">
                        {{ item }}
                        <view v-if="statusNumList[index] > 0" class="list_tab_num">{{ statusNumList[index] > 99 ? '...' : statusNumList[index] }}</view>
                    </view>
                </block>
            </view>
            <view style="height: 56rpx"></view>
            <block v-for="(item, index) in auctionList" :key="index">
                <block v-if="item.status == '1'">
                    <view class="list_item_endTime">预计开始时间：{{ item.startTime }}</view>
                </block>

                <block v-if="statusList[item.status] == '待交保' || item.status == '2'">
                    <block v-if="statusList[item.status] == '待交保' && item.auctionStatus != '2'">
                        <view class="list_item_endTime">预计开始时间：{{ item.startTime }}</view>
                    </block>
                    <block v-else>
                        <van-count-down use-slot @change="changeTime($event, { index })" :data-index="index" @finish="overTime($event, { index })" :time="item.timeMinutes">
                            <view class="list_item_endTime">
                                <text>距结束：</text>
                                <text v-if="item.timeData.days != 0">{{ item.timeData.days }}</text>
                                <text v-if="item.timeData.days != 0">天</text>
                                <text>{{ item.timeData.hours < 10 ? '0' + item.timeData.hours : item.timeData.hours }}</text>
                                <text>:</text>
                                <text>{{ item.timeData.minutes < 10 ? '0' + item.timeData.minutes : item.timeData.minutes }}</text>
                                <text>:</text>
                                <text>{{ item.timeData.seconds < 10 ? '0' + item.timeData.seconds : item.timeData.seconds }}</text>
                            </view>
                        </van-count-down>
                    </block>
                </block>

                <block v-if="item.status == '3' || item.status == '4' || item.status == '5'">
                    <view class="list_item_endTime">结束时间：{{ item.endTime }}</view>
                </block>

                <view @tap="toShop" :data-item="item" class="list_item_shop">
                    <image :src="item.merchantLogo" mode="aspectFill"></image>
                    <view>{{ item.merchantName }}</view>
                    <mp-badge v-if="item.isRead == 0"></mp-badge>
                </view>

                <view @tap="toDetails" :data-item="item" class="list_item">
                    <view class="list_item_image">
                        <image :src="item.auctionLogo" mode="aspectFill"></image>
                        <view>{{ item.timeUnit == 1 ? '即时喊' : item.timeUnit == 2 ? '短时喊' : '长时喊' }}</view>
                    </view>
                    <view class="list_item_info">
                        <view class="list_item_up">
                            <view class="list_item_name">
                                {{ item.auctionItemName }}
                                <view class="list_item_desc">{{ item.desc }}</view>
                            </view>
                            <view :style="'background: ' + statusColorList[item.status] + ';'" class="list_item_label">{{ statusList[item.status] }}</view>
                        </view>
                        <view class="list_item_up">
                            <view class="peopleNumber">
                                <view>预约人数：{{ item.reserveNumber }}</view>
                                <view v-if="item.status != '1'">参与人数：{{ item.personNumber }}</view>
                            </view>
                            <view class="list_item_up_right">
                                <block v-if="item.status == '1'">
                                    <view class="list_item_startPrice">保底价：￥{{ item.startingPrice }}</view>
                                </block>
                                <block v-else>
                                    <view v-if="item.status == '5'" class="list_item_nowPrice">成交价：￥{{ item.currentPrice }}</view>
                                    <view v-else class="list_item_nowPrice">当前价：￥{{ item.currentPrice }}</view>
                                </block>
                                <block v-if="statusList[item.status] != '待交保' && item.status != '1'">
                                    <view v-if="item.myPrice" class="list_item_startPrice">我的出价：￥{{ item.myPrice }}</view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="list_item_down">
                    <view v-if="statusList[item.status] == '待交保' && item.cashDeposit != 0" @tap="toBondPayment" :data-item="item" class="list_item_down_btn">立即支付</view>
                    <view v-if="item.status == '3'" @tap="showAddress" :data-index="index" class="list_item_down_btn">立即支付</view>
                    <view v-if="item.status == '3'" class="list_item_down_down">待补款金额：￥{{ item.fillingMoney }}</view>
                </view>
            </block>
        </view>
        <view v-if="isShowAddress" class="mask">
            <view class="payment_address">
                <image @tap.stop.prevent="showNotAddress" class="payment_address_close" src="/static/image/pmhd/icon_close.png"></image>
                <view @tap.stop.prevent="selectAddress" class="payment_address_item" style="margin-top: 104rpx">
                    <view class="payment_address_lable">收货人：</view>
                    <view class="payment_address_text">
                        {{ address.name }}
                        <text style="font-size: 24rpx">{{ address.tel }}</text>
                    </view>
                </view>
                <view @tap.stop.prevent="selectAddress" class="payment_address_item" style="padding-top: 40rpx">
                    <view class="payment_address_lable">收货地址：</view>
                    <view style="flex: 1; display: flex; justify-content: space-between; align-items: center">
                        <view class="payment_address_text" style="font-size: 28rpx; font-weight: bold; color: #666666">{{ address.detail }}</view>
                        <image src="/static/image/pmhd/icon_enter.png" class="payment_address_enter"></image>
                    </view>
                </view>
                <view @tap.stop.prevent="toFinalPayment" class="payment_btn">确定地址</view>
            </view>
        </view>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/activity/pmhd/pmList/pmList.js
const paymentUtil = require('../../../../utils/paymentUtil');

const app = getApp();
export default {
    components: {
        // vanCountDown
    },
    data() {
        return {
            isShowAddress: false,
            orderIndex: -1,
            status: 0,
            type: 0,
            statusList: ['全部喊价', '待开喊', '参喊中', '待付款', '已获喊', '未获喊'],
            statusNumList: [0, 0, 0, 0, 0, 0, 0],
            statusColorList: ['全部喊价', '#07C160', '#FFB300', '#FF0000', '#6467F0', '#FF0000', '#999999'],
            auctionList: [],
            pageNum: 1,
            pageSize: 10,
            stopLoading: true,

            address: {
                name: '',
                tel: '',
                detail: '请选择收货地址'
            },

            merchantId: '',
            auctionId: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.globalData.options = options;
        this.setData({
            merchantId: options.merchantId,
            auctionId: options.auctionId,
            status: options.status || 0
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData(
            {
                pageNum: 1,
                auctionList: []
            },
            () => {
                this.getNumber();
                this.getAuctionList();
            }
        );
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
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
    onReachBottom: function () {
        if (this.stopLoading) {
            this.setData({
                pageNum: this.pageNum + 1
            });
            this.getAuctionList();
        }
    },
    methods: {
        // 获得我参加的拍卖信息
        getAuctionList() {
            let that = this;

            if (this.status == 0) {
                this.setData({
                    status: -1
                });
            }

            let params = {};

            if (this.merchantId && this.merchantId != -1) {
                params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    merchantId: this.merchantId,
                    status: this.status
                };
            } else {
                params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    status: this.status
                };
            }

            app.globalData.request.auctionRequest('/bidding/list', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    if (result.length < this.pageSize) {
                        this.setData({
                            stopLoading: false
                        });
                    }

                    this.setData({
                        auctionList: this.auctionList.concat(result)
                    });

                    if (this.auctionId) {
                        result.forEach((item, index) => {
                            if (item.auctionId == this.auctionId) {
                                app.globalData.sjrequest('/commodity/queryShipping').then((res) => {
                                    res.data.data.forEach((item) => {
                                        if (item.isDefault == 1) {
                                            that.setData({
                                                ['address.name']: item.contacts,
                                                ['address.tel']: item.contactWay,
                                                ['address.detail']: item.provincesName + item.cityName + item.areaName + item.address
                                            });
                                        }

                                        that.setData({
                                            orderIndex: index,
                                            isShowAddress: true
                                        });
                                    });
                                });
                            }
                        });
                    }
                }
            });
        },

        // 获得数字
        getNumber() {
            let params = {};

            if (this.merchantId && this.merchantId != -1) {
                params = {
                    merchantId: this.merchantId
                };
            }

            app.globalData.request.auctionRequest('/bidding/groupAuctionBiddingCount', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;
                    result.forEach((item) => {
                        this.statusNumList[item.status] = item.count;
                    });
                    this.setData({
                        statusNumList: this.statusNumList
                    });
                }
            });
        },

        // 去商家
        toShop(e) {
            const { item } = e.currentTarget.dataset;
            app.globalData.request.auctionRequest('/bidding/clearBiddingUnread', item.auctionId);
            uni.navigateTo({
                url: `/pages/shopHome/home/home?marchantId=${item.merchantId}`
            });
        },

        // 去详情
        toDetails(e) {
            const { item } = e.currentTarget.dataset;
            app.globalData.request.auctionRequest('/bidding/clearBiddingUnread', item.auctionId);
            uni.navigateTo({
                url: `/pages/activity/pmhd/details/details?auctionId=${item.auctionId}`
            });
        },

        // 更改倒计时时间
        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            this.auctionList[index].timeData = e.detail;
            this.setData({
                auctionList: this.auctionList
            });
        },

        // 倒计时结束
        overTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
        },

        // 切换状态
        changeTab(e) {
            const { index } = e.currentTarget.dataset;

            if (index != this.status) {
                this.setData({
                    status: index,
                    pageNum: 1,
                    stopLoading: true,
                    auctionList: []
                });
                this.getAuctionList();
            }
        },

        // 去支付保证金
        toBondPayment(e) {
            const { item } = e.currentTarget.dataset;
            const params = {
                auctionId: item.auctionId,
                //拍卖id
                cashDeposit: item.cashDeposit,
                //保证金
                receivingAddress: item.receivingAddress,
                //收货地址
                receivingName: item.receivingName,
                //收货人姓名
                receivingTelephone: item.receivingTelephone,
                //收货人电话
                status: item.status
            };
            app.globalData.request.auctionRequest('/bidding/save', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;
                    this.paymentMoney(result, 1);
                }
            });
        },

        // 显示地址框
        showAddress(e) {
            let that = this;
            const { index } = e.currentTarget.dataset;
            app.globalData.sjrequest('/commodity/queryShipping').then((res) => {
                res.data.data.forEach((item) => {
                    if (item.isDefault == 1) {
                        that.setData({
                            ['address.name']: item.contacts,
                            ['address.tel']: item.contactWay,
                            ['address.detail']: item.provincesName + item.cityName + item.areaName + item.address
                        });
                    }

                    that.setData({
                        orderIndex: index,
                        isShowAddress: true
                    });
                });
            });
        },

        // 隐藏地址框
        showNotAddress() {
            this.setData({
                isShowAddress: false
            });
        },

        // 跳转收货地址
        selectAddress() {
            app.globalData.comefrom = 'pmhd';
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList'
            });
        },

        // 去支付尾款
        toFinalPayment() {
            if (this.address.detail == '请选择收货地址') {
                uni.showToast({
                    title: '请选择收货地址',
                    icon: 'none'
                });
                return;
            }

            const params = {
                auctionId: this.auctionList[this.orderIndex].auctionId,
                //拍卖id
                auctionItemId: this.auctionList[this.orderIndex].auctionItemId,
                //拍卖品id
                bond: this.auctionList[this.orderIndex].cashDeposit,
                //保证金
                money: this.auctionList[this.orderIndex].fillingMoney,
                //实际金额
                merchantId: this.auctionList[this.orderIndex].merchantId,
                //商家ID
                receivingAddress: this.address.detail,
                //收货地址
                receivingName: this.address.name,
                //收货人姓名
                receivingTelephone: this.address.tel,
                //收货人电话
                totalMoney: this.auctionList[this.orderIndex].myPrice //总金额
            };
            app.globalData.request.auctionRequest('/order/payOrder', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;
                    this.paymentMoney(result, 2);
                } else {
                    uni.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,

                        success(res) {
                            if (res.confirm) {
                                this.setData({
                                    pageNum: 1,
                                    stopLoading: true,
                                    auctionList: []
                                });
                                this.getAuctionList();
                            }
                        }
                    });
                }
            });
        },

        // 付钱
        paymentMoney(data, type) {
            // type: 1-支付保证金（刷新列表） 2-支付尾款(跳转到订单列表)
            const that = this;
            paymentUtil.auctionWxpay(data).then(() => {
                if (type == 1) {
                    // 刷新列表
                    that.setData({
                        status: data.auctionStatus + 1,
                        pageNum: 1,
                        stopLoading: true,
                        auctionList: []
                    });
                    that.getAuctionList();
                } else {
                    //跳转订单列表
                    uni.navigateTo({
                        url: '/pages/activity/pmhd/orderList/orderList?status=0'
                    });
                }
            });
        }
    }
};
</script>
<style>
.list {
    min-height: 100vh;
    background: #f8f8f8;
}
.list_tab {
    width: 100%;
    height: 56rpx;
    background-color: #ffffff;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
.list_tab_item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #000000;
    position: relative;
}
.list_tab_item_active {
    color: #ff0000;
    position: relative;
}
.list_tab_num {
    position: absolute;
    top: 0;
    right: -14rpx;
    color: #ffffff;
    font-size: 20rpx;
    font-weight: bold;
    background-color: #ff0000;
    padding: 2rpx 10rpx;
    border-radius: 50%;
}
.list_tab_item_active::before {
    content: '';
    width: 82rpx;
    height: 0rpx;
    border-bottom: 4rpx solid #ff0000;
    position: absolute;
    left: 50%;
    bottom: 4rpx;
    transform: translate(-50%);
}
.list_item_endTime {
    font-size: 22rpx;
    font-weight: 400;
    color: #333333;
    background-color: #ffffff;
    padding: 20rpx;
    border-bottom: 2rpx solid #f4f4f4;
    margin-top: 20rpx;
}
.list_item_shop {
    background-color: #ffffff;
    padding: 20rpx 0 0 20rpx;
    display: flex;
    align-items: center;
}
.list_item_shop image {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
}
.list_item_shop view {
    margin-left: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}
.list_item {
    width: 100%;
    height: 204rpx;
    background: #ffffff;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
}
.list_item_image {
    position: relative;
}
.list_item_image image {
    width: 164rpx;
    height: 164rpx;
}
.list_item_image view {
    position: absolute;
    top: 0;
    left: 0;
    width: 78rpx;
    height: 32rpx;
    border-radius: 0 20rpx 20rpx 0;
    font-size: 20rpx;
    font-weight: bold;
    color: #ffffff;
    background: #ff0000;
    line-height: 32rpx;
    text-align: center;
}
.list_item_info {
    width: 0;
    flex: 1;
    margin-left: 18rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.list_item_up {
    display: flex;
    justify-content: space-between;
}
.list_item_name {
    width: 310rpx;
    font-size: 24rpx;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list_item_desc {
    width: 310rpx;
    font-size: 20rpx;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list_item_up_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
.list_item_label {
    padding: 0 8rpx;
    height: 32rpx;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    line-height: 32rpx;
    text-align: center;
    color: #ffffff;
}
.list_item_startPrice {
    font-size: 20rpx;
    font-weight: bold;
    color: #999999;
}
.list_item_nowPrice {
    font-size: 20rpx;
    font-weight: bold;
    color: #ff0000;
}
.list_item_down {
    border-top: 2rpx solid #f4f4f4;
    padding: 18rpx 20rpx;
    background-color: #ffffff;
    font-size: 20rpx;
    font-weight: 400;
    position: relative;
}
.list_item_down_btn {
    width: 108rpx;
    height: 40rpx;
    border: 2rpx solid #ff0000;
    background: #ff0000;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 40rpx;
    position: absolute;
    bottom: 16rpx;
    right: 20rpx;
}
.list_item_down_up {
    display: flex;
    align-items: center;
    padding-right: 20rpx;
}
.list_item_down_up image {
    width: 32rpx;
    height: 32rpx;
}
.list_item_down_up view {
    margin-left: 20rpx;
}
.list_item_down_down {
    color: #ff0000;
    margin: 16rpx 0 0 20rpx;
}
.bottom {
    width: 100%;
    font-size: 22rpx;
    font-weight: 400;
    color: #999999;
    margin: 50rpx 0 16rpx;
    text-align: center;
}
.mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
}
.payment_address {
    width: 100%;
    height: 532rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 30rpx 30rpx 0rpx 0rpx;
    position: absolute;
    left: 0;
    bottom: 0;
}
.payment_address_close {
    width: 28rpx;
    height: 28rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
}
.payment_address_item {
    display: flex;
    align-items: center;
}
.payment_address_lable {
    width: 160rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}
.payment_address_text {
    margin-left: 12rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}
.payment_address_enter {
    width: 24rpx;
    height: 48rpx;
}
.payment_btn {
    width: 710rpx;
    height: 100rpx;
    background: #fa2d2d;
    border-radius: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    font-weight: 600;
    color: #ffffff;
    position: absolute;
    left: 20rpx;
    bottom: 20rpx;
}
.peopleNumber {
    font-size: 20rpx;
    font-weight: 400;
}
.peopleNumber view:first-child {
    padding: 2rpx 10rpx;
    border-radius: 20rpx;
    border: 2rpx solid #07c160;
    color: #07c160;
}
.peopleNumber view:last-child {
    margin-top: 6rpx;
    padding: 2rpx 10rpx;
    border-radius: 20rpx;
    border: 2rpx solid #ff0000;
    color: #ff0000;
}
</style>
