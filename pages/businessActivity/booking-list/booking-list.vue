<template>
    <view>
        <!-- pages/businessActivity/booking-list/booking-list.wxml -->

        <view class="page-content">
            <van-tabs :active="currentIndex" @change="onChange" sticky color="#EC1919" line-width="22">
                <view :src="item" v-for="(item, index) in tabList" :key="index">
                    <van-tab :title="item.name">
                        <block v-for="(item, index1) in currentList" :key="index1">
                            <view :class="'order-item order-' + item.orderNumber">
                                <!-- <view class='me-fx-row me-fx-sb-c top-base-info'>
                            <view class='me-full-text activity-name'>{{item.title}}</view>
                        </view> -->
                                <view class="me-fx-row product-info">
                                    <image :src="item.detailImgUrls[0]" class="product-img"></image>
                                    <view class="me-fx-1 me-fx-col me-fx-sb">
                                        <view>{{ item.commodityName }}</view>
                                        <view class="me-fx-row me-fx-sb-c">
                                            <text>¥{{ item.livePrice }}</text>
                                            <text>x{{ item.amount }}</text>
                                        </view>
                                        <view class="price-text">合计:¥{{ item.actualMoney }}</view>
                                    </view>
                                </view>
                                <view class="receive-goods">
                                    <view>预计到店时间：{{ item.arriveTime }}</view>
                                    <view>联系人：{{ item.shippingAddress.contacts }} {{ item.shippingAddress.contactWay }}</view>
                                    <view>商家地址：{{ merchantAddress }}</view>
                                </view>
                            </view>

                            <view class="order-item-foolt">
                                <view v-if="item.activityFinanceResponse.status == 2 || item.activityFinanceResponse.status == 3" class="msg-text">
                                    已完成：{{ item.activityFinanceResponse.alreadyOrder }}单任务，您购买商品已退还金额({{ item.activityFinanceResponse.income }}元)
                                    <text v-if="item.activityFinanceResponse.status == 2">服务费：{{ item.activityFinanceResponse.serviceCharge }}</text>
                                </view>
                                <view v-else class="msg-text not-complete">
                                    进行中：已推{{ item.activityFinanceResponse.alreadyOrder }}单，商品金额退还{{ item.activityFinanceResponse.income }} 只差{{
                                        item.activityFinanceResponse.residueOrder
                                    }}单赚取商品
                                </view>

                                <view v-if="'item.activityFinanceResponse'" class="join-user-list">
                                    <view class="me-fx-row me-fx-sb-c join-user-item" v-for="(temp, ti) in item.activityFinanceResponse.financeUnitResponses" :key="temp.ti">
                                        <view class="me-fx-row me-fx-start-c user-info">
                                            <image :src="temp.headimgurl" class="user-avatar"></image>
                                            <view class="me-full-text nick-name">{{ temp.nickname }}</view>
                                            <view class="create-time">下单时间{{ temp.createTime }}</view>
                                        </view>

                                        <view class="me-fx-1 earnings-text">+{{ temp.earnings }}元</view>

                                        <view class="me-fx-1 service-charge">{{ temp.isLast ? '服务费' + (temp.serviceCharge + temp.payPlatformFeeMoney) : '' }}</view>
                                    </view>
                                </view>

                                <view class="me-fx-row me-fx-end-c foot-btns">
                                    <text class="confirm-btn contact-btn" @tap="showVerificationCode" :data-item="item">核销码</text>
                                    <text v-if="currentState == 2" class="confirm-btn" @tap="confirmGoods" :data-item="item">确认收货</text>
                                </view>
                            </view>
                        </block>

                        <view class="me-fx-row me-fx-c-c place-empty" v-if="!currentList.length">
                            <text>暂无数据</text>
                        </view>
                    </van-tab>
                </view>
            </van-tabs>
        </view>

        <!-- 核销码 -->
        <view v-if="showCodeBox" class="me-fx-col me-fx-c-c verification-code-box" @tap="hideCodeBox">
            <view class="code-container">
                <canvas class="verification-code-img" canvas-id="myQrcode"></canvas>
            </view>
        </view>
    </view>
</template>

<script>
// import vanTab from './@vant/weapp/tab/index';
// import vanTabs from './@vant/weapp/tabs/index';
// pages/businessActivity/booking-list/booking-list.js
import drawQrcode from '../../../utils/api/weapp.qrcode.min.js';
let app = getApp();
export default {
    components: {
        // vanTab,
        // vanTabs
    },
    data() {
        return {
            currentIndex: 0,
            currentState: 1,

            tabList: [
                {
                    name: '待使用',
                    state: 1
                },
                {
                    name: '已完成',
                    state: 4
                }
            ],

            dataList1: {
                pageNum: 1,
                stopReq: false,
                list: []
            },

            dataList4: {
                pageNum: 1,
                stopReq: false,
                list: []
            },

            currentList: [],
            juinUserInfo: {},

            //参与用户信息
            showOrderItme: '',

            //展示的订单样式类
            //商家地址
            merchantAddress: '',

            showCodeBox: false,
            detailData: '',

            temp: {
                ti: '',
                headimgurl: '',
                nickname: '',
                createTime: '',
                earnings: '',
                isLast: false,
                serviceCharge: '',
                payPlatformFeeMoney: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var marchantId = uni.getStorageSync('merchantId');
        this.marchantId = marchantId;
        var orderState = options.orderState || 1;
        var orderNo = options.orderNo;
        var currentIndex = 0;

        switch (Number(orderState)) {
            case 1:
                currentIndex = 0;
                break;

            case 4:
                currentIndex = 2;
                break;
        }

        this.setData(
            {
                currentState: orderState,
                currentIndex,
                showOrderItme: orderNo ? '.order-' + orderNo : ''
            },
            () => {
                this.getDataList(orderState);
                this.getMerchantInfo(); //获取商家信息
            }
        );
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
    onPullDownRefresh: function () {
        this.refreshList();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var state = this.currentState;
        var cDataList = this['dataList' + state];

        if (!cDataList.stopReq) {
            cDataList.pageNum++;
            this.dataListstate = cDataList;
            this.setData({}, () => {
                this.getDataList(state);
            });
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        onChange(e) {
            var index = e.detail.index;
            var state = this.tabList[index].state;
            var currentList = this['dataList' + state].list;
            this.setData(
                {
                    currentList,
                    currentState: state,
                    currentIndex: index
                },
                () => {
                    this.getDataList(state);
                }
            );
        },

        getMerchantInfo() {
            var data = {
                id: this.marchantId
            };
            app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var merchantAddress = data.address;
                    this.setData({
                        merchantAddress
                    });
                }
            });
        },

        showVerificationCode(e) {
            //显示核销码
            var item = e.currentTarget.dataset.item;
            this.setData(
                {
                    showCodeBox: true
                },
                () => {
                    app.globalData
                        .sjrequest('/activityOrderBusiness/queryVerification', {
                            orderNumber: item.orderNumber
                        })
                        .then((res) => {
                            if (res.statusCode == 200 && res.data.code == 200) {
                                var data = res.data.data;
                                var verification = data.verification;
                                drawQrcode({
                                    width: 150,
                                    height: 150,
                                    canvasId: 'myQrcode',
                                    text: verification
                                });
                            }
                        });
                }
            );
        },

        hideCodeBox() {
            //隐藏核销码
            this.setData({
                showCodeBox: false
            });
        },

        getDataList(state = 1) {
            //订单列表
            var cDataList = this['dataList' + state];
            app.globalData
                .sjrequest1('/activityOrderBusiness/activityOrderPageList', {
                    pageSize: 10,
                    currentPage: cDataList.pageNum,
                    orderState: this.currentState,
                    templateTag: 'TJFL',
                    isQueryRefundOrder: false,
                    orderType: '3'
                })
                .then((res) => {
                    uni.stopPullDownRefresh();

                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        cDataList.stopReq = list.length !== 10;
                        list.forEach((item) => {
                            if (item.shippingAddress) {
                                item.shippingAddress = JSON.parse(item.shippingAddress);
                            }
                        });

                        if (cDataList.pageNum == 1) {
                            cDataList.list = list;
                        } else {
                            cDataList.list.push(...list);
                        }

                        this.dataListstate = cDataList;

                        this.setData(
                            {
                                currentList: cDataList.list
                            },
                            () => {
                                this.scrollOrderItem();
                            }
                        );
                    }
                });
        },

        scrollOrderItem() {
            var showOrderItme = this.showOrderItme;

            if (showOrderItme) {
                setTimeout(() => {
                    uni.pageScrollTo({
                        selector: showOrderItme,
                        complete: (res) => {
                            this.setData({
                                showOrderItme: ''
                            });
                        }
                    });
                }, 0);
            }
        },

        getParams() {
            //查商品信息
            app.globalData
                .sjrequest('/commodity/queryCommodityInfo', {
                    storeId: this.marchantId,
                    commodityId: this.detailInfo.commodityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        var data = res.data.data;
                        this.setData(
                            {
                                detailData: data
                            },
                            () => {
                                this.getLabelList();
                            }
                        );
                    }
                });
        },

        toChat(e) {
            uni.getStorage({
                key: 'res',
                success: (res) => {
                    var data = res.data;

                    if (data.statusCode == 200 && data.data.code == 200) {
                        data = data.data.data;
                        var logoPic = data.setInfo.headImage;
                        var nickName = data.setInfo.appName;
                        uni.navigateTo({
                            url: `/pages/order/contact/contact?logoPic=${logoPic}&marchantId=${this.marchantId}&marchantName=${nickName}`
                        });
                    }
                }
            });
        },

        confirmGoods(e) {
            //确认收货/order/updateCityOrder
            var item = e.currentTarget.dataset.item;
            var marchantId = uni.getStorageSync('merchantId');
            app.globalData
                .sjrequest1('/activityOrderBusiness/confirmOrder', {
                    // uniqueId:item.orderNumber,
                    // orderState: 4,
                    // marchantId,
                    // receivingType: 1,//0仅收货 1确认收货
                    orderNumber: item.orderNumber
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        uni.showToast({
                            title: '已收货'
                        });
                        this.refreshList();
                    }
                });
        },

        refreshList() {
            var state = this.currentState;
            var cDataList = this['dataList' + state];
            cDataList.stopReq = false;
            cDataList.pageNum = 1;
            this.dataListstate = cDataList;
            this.setData({}, () => {
                this.getDataList(state);
            });
        }
    }
};
</script>
<style>
/* pages/businessActivity/booking-list/booking-list.wxss */

page {
    background-color: #f7f7f7;
}

.page-content {
    padding-bottom: 40rpx;
}

.order-item {
    padding: 16rpx 20rpx 10rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #666;
    margin-top: 20rpx;
    background-color: #fff;
}

.order-item-foolt {
    background-color: #fff;
    padding-bottom: 20rpx;
    margin-bottom: 30rpx;
}

.top-base-info .order-state {
    font-size: 26rpx;
    border-bottom: 2px solid #eb1918;
}
.top-base-info .activity-name {
    font-size: 32rpx;
    color: #333;
    width: 574rpx;
    font-weight: bold;
}
.product-info {
    margin: 18rpx 0;
    border-bottom: 1rpx solid #f2f2f2;
    padding-bottom: 20rpx;
    font-size: 30rpx;
    color: #333;
}
.product-info .product-img {
    width: 176rpx;
    height: 176rpx;
    background-color: #ccc;
    margin-right: 20rpx;
}
.product-info .price-text {
    font-weight: bold;
    text-align: right;
}

.receive-goods {
    border-bottom: 1rpx solid #f2f2f2;
    padding: 15rpx 0;
}

.msg-text {
    font-size: 24rpx;
    color: #fff;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    background-color: #ff9215;
}
.not-complete {
    background-color: #1577ff;
}

.join-user-list {
    padding: 0 20rpx;
    box-sizing: border-box;
}
.join-user-item {
    padding: 25rpx 0;
    font-size: 24rpx;
    font-weight: bold;
}
.join-user-item:last-child {
    border-bottom: 1rpx solid #f2f2f2;
}
.join-user-item .user-avatar {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    background-color: #ccc;
}
.join-user-item .user-info {
    width: 60%;
}
.join-user-item .nick-name {
    margin: 0 15rpx;
    width: 100rpx;
}
.join-user-item .create-time {
    font-size: 18rpx;
    color: #999;
    font-weight: normal;
}
.join-user-item .earnings-text {
    color: #eb1918;
    text-align: center;
}
.join-user-item .service-charge {
    font-size: 20rpx;
    color: #999;
    text-align: center;
}

.place-empty {
    width: 100%;
    height: 500rpx;
    font-size: 32rpx;
    color: #999;
}
.foot-btns {
    margin-top: 24rpx;
}
.foot-btns .confirm-btn {
    width: 212rpx;
    height: 60rpx;
    color: #fff;
    background-color: #eb1918;
    text-align: center;
    line-height: 60rpx;
    border-radius: 34rpx;
    margin-right: 20rpx;
    font-size: 30rpx;
}
.foot-btns .contact-btn {
    background-color: #fff;
    color: #eb1918;
    border: 2rpx solid #eb1918;
}

/* 核销码 */
.verification-code-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 300;
    background-color: rgba(0, 0, 0, 0.5);
}
.verification-code-box .code-container {
    padding: 15rpx;
    border-radius: 20rpx;
    background-color: #fff;
}
.verification-code-box .verification-code-img {
    width: 150px;
    height: 150px;
    background-color: #fff;
}
</style>
