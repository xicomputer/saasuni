<template>
    <view>
        <!-- pages/Order/Order.wxml -->
        <!-- <web-view src="https://xssj.letterbook.cn/?active={{active}}#/orderList"></web-view> -->
        <view class="order">
            <view class="tabs">
                <van-tabs :active="tabsitem" @change="onChange" sticky color="#EC1919" line-width="22">
                    <view :src="item" v-for="(item, index) in tabsList" :key="index">
                        <van-tab :title="item.name">
                            <view class="order-list-container">
                                <!-- 商品列表 -->
                                <view class="order-content" v-if="item.orderCommodity.length != 0" v-for="(item, index1) in orderList" :key="index1">
                                    <!-- 店铺名称、商品状态 -->

                                    <view class="order-title">
                                        <view class="order-id">
                                            订单号:{{ item.orderNumber }}
                                            <image @tap="copyOrder" class="copy_img" src="/static/pages/static/copy.png" :data-order="item.orderNumber"></image>
                                        </view>
                                        <view class="order-status" v-if="tabsList[tabsitem].name === '退款/退货'">
                                            <view v-if="item.refundStateCode == 1">退款</view>
                                            <view v-if="item.refundStateCode == 2">退货</view>
                                        </view>
                                        <view class="order-status" v-else>{{ tabsList[tabsitem].name }}</view>
                                    </view>

                                    <!-- 商品主体 商品图片 名称 价格 数量 -->

                                    <view class="store-content">
                                        <image :src="item.logoPic" class="store_icon" style="border-radius: 50%" />
                                        <view class="store-name-content">
                                            <view class="store-name">{{ cartShop.appName }}</view>
                                            <image src="/static/pages/img/jinru.png" class="jinru" />
                                        </view>
                                    </view>

                                    <navigator
                                        class="goods-content"
                                        hover-class="none"
                                        :url="
                                            '../orderDetail/orderDetail?uniqueId=' +
                                            item.uniqueId +
                                            '&deliveryUniqueId=' +
                                            items.uniqueId +
                                            '&deliveryRefund=' +
                                            deliveryOrderStatus
                                        "
                                        v-for="(items, key) in item.orderCommodity"
                                        :key="items.key"
                                    >
                                        <van-image :src="items.thumbnail" width="77px" height="77px" fit="cover" radius="10rpx;"></van-image>

                                        <view class="goods-item">
                                            <view class="goods-name">{{ items.commodityName }}</view>
                                            <view class="spec-content">
                                                <view class="spec-container">规格：{{ items.tempSpecName }}</view>
                                                <view class="refund" v-if="activeTab === '2' && tabsList[tabsitem].name === '退款/退货'">
                                                    <text v-if="items.refundState == 1">审核中</text>
                                                    <text v-if="items.refundState == 2">已同意</text>
                                                    <text v-if="items.refundState == 3">已拒绝</text>
                                                    <text v-if="items.refundState == 4">退货中</text>
                                                    <text v-if="items.refundState == 5">已退款</text>
                                                </view>
                                            </view>
                                            <view class="spec-content">
                                                <view class="spec-container">数量:{{ items.amount }}</view>
                                            </view>
                                            <view class="goods_price_content">
                                                <view class="goods_price" style="width: 40%">￥{{ items.paymentMoney }}</view>
                                                <!-- <view class="comment-btn" catchtap="comment" wx:if="{{tabsList[tabsitem].name==='已完成'&&items.singleEvaluate===0}}" data-orderIdx="{{index}}" data-goodsIdx="{{key}}">评价几句</view> -->
                                                <view
                                                    class="comment-btn"
                                                    v-if="
                                                        tabsList[tabsitem].name === '退款/退货' &&
                                                        items.refundState < 4 &&
                                                        item.refundState != 14 &&
                                                        item.refundStateCode != 1 &&
                                                        items.chargebackCount == 0
                                                    "
                                                    @tap.stop.prevent="cancelRefund"
                                                    :data-orderCommodityId="items.orderCommodityId"
                                                    :data-orderId="item.orderId"
                                                >
                                                    撤销申请
                                                </view>
                                                <view
                                                    class="comment-btn"
                                                    @tap.stop.prevent="toApplyReturn"
                                                    v-if="
                                                        (tabsList[tabsitem].name === '待收货' || tabsList[tabsitem].name === '已完成') &&
                                                        items.refundState == 0 &&
                                                        !items.isSettle &&
                                                        item.isSupportRefund == 1
                                                    "
                                                    :data-uniqueId="item.uniqueId"
                                                    :data-selfUniqueId="items.uniqueId"
                                                >
                                                    申请退货
                                                </view>
                                            </view>
                                        </view>
                                    </navigator>

                                    <!-- 商品总价格、总数量 -->

                                    <view class="goods-total">
                                        <view class="total-span">
                                            <view class="sale_money" v-if="item.sumDeduct > 0">
                                                <text>总价:</text>
                                                <text class="price_symbol">￥</text>
                                                <text>{{ item.sumDeduct + item.actualMoney }},</text>
                                                <text>已优惠:</text>
                                                <text class="price_symbol">￥</text>
                                                <text>{{ item.sumDeduct }}</text>
                                            </view>
                                            <text class="isOk_price">
                                                实付款:
                                                <text class="price_symbol">￥</text>
                                                <text>{{ item.actualMoney }}</text>
                                            </text>
                                        </view>
                                    </view>

                                    <!-- 下单时间 人数 餐桌号 -->

                                    <view class="goods-time-box">
                                        <view class="item-box">
                                            <view>下单时间：</view>
                                            <view>{{ item.orderTime }}</view>
                                        </view>
                                    </view>

                                    <!-- 底部订单操作按钮 -->

                                    <view class="order-footer">
                                        <view class="btn-content-box">
                                            <!-- <view class="do-btn submit-btn other_btn" wx:if="{{tabsList[tabsitem].name==='待发货'||tabsList[tabsitem].name==='待收货'||tabsList[tabsitem].name==='已完成'}}"
                                    catchtap="goActivity" data-uniqueId="{{item.uniqueId}}" data-id="2" data-marchantId="{{item.marchantId}}">参与活动</view> -->
                                            <navigator
                                                class="do-btn cancel-btn shouhou other_btn"
                                                :url="'../contact/contact?logoPic=' + item.logoPic + '&marchantId=' + item.marchantId + '&marchantName=' + item.nickName"
                                            >
                                                联系卖家
                                            </navigator>
                                            <view
                                                class="do-btn cancel-btn shouhou other_btn"
                                                v-if="tabsList[tabsitem].name === '已完成' || tabsList[tabsitem].name === '退款/退货'"
                                                @tap="callStore"
                                                :data-tel="item.contactsMobile"
                                            >
                                                电话联系
                                            </view>
                                            <view class="do-btn cancel-btn other_btn" @tap="showQR" :data-uniqueId="item.uniqueId" v-if="tabsList[tabsitem].name === '待消费'">
                                                查看券码
                                            </view>
                                            <view
                                                class="do-btn cancel-btn other_btn"
                                                v-if="tabsList[tabsitem].name === '待付款'"
                                                @tap.stop.prevent="updateCityOrder"
                                                :data-uniqueId="item.uniqueId"
                                                data-id="3"
                                                :data-marchantId="item.marchantId"
                                            >
                                                取消订单
                                            </view>
                                            <view class="do-btn submit-btn" v-if="tabsList[tabsitem].name === '待付款'" @tap.stop.prevent="payOrder" :data-item="item">
                                                支付订单
                                            </view>
                                            <!-- <view class="do-btn cancel-btn other_btn" wx:if="{{tabsList[tabsitem].name==='待发货'}}">申请退款</view> -->
                                            <view
                                                class="do-btn submit-btn"
                                                v-if="tabsList[tabsitem].name === '待发货'"
                                                @tap.stop.prevent="updateCityOrder"
                                                :data-uniqueId="item.uniqueId"
                                                data-id="2"
                                                :data-marchantId="item.marchantId"
                                            >
                                                提醒发货
                                            </view>

                                            <navigator
                                                class="do-btn cancel-btn other_btn"
                                                v-if="tabsList[tabsitem].name === '待收货'"
                                                :url="
                                                    '../logistics/logistics?wlNumber=' + item.expressNo + '&wlCompany=' + item.expressCompany + '&orderNumber=' + item.orderNumber
                                                "
                                            >
                                                查看物流
                                            </navigator>
                                            <view
                                                class="do-btn submit-btn"
                                                v-if="tabsList[tabsitem].name === '待收货'"
                                                @tap.stop.prevent="getOrderGoods"
                                                :data-uniqueId="item.uniqueId"
                                                data-id="4"
                                                :data-marchantId="item.marchantId"
                                            >
                                                确认收货
                                            </view>
                                            <view style="display: flex" v-if="tabsList[tabsitem].name === '已完成' || tabsList[tabsitem].name === '退款/退货'">
                                                <view
                                                    class="do-btn cancel-btn"
                                                    style="margin-right: 20rpx"
                                                    v-if="tabsList[tabsitem].name === '已完成' || (tabsList[tabsitem].name === '退款/退货' && item.orderState == 3)"
                                                    @tap.stop.prevent="updateCityOrder"
                                                    :data-uniqueId="item.uniqueId"
                                                    data-id="5"
                                                    :data-marchantId="item.marchantId"
                                                >
                                                    删除订单
                                                </view>
                                                <!-- <navigator wx:if="{{tabsList[tabsitem].name==='已完成'&&item.chargebackIsAll == 0}}"
                                        url="../applyReturn/applyReturn?uniqueId={{item.uniqueId}}" class="do-btn submit-btn">一键退货</navigator> -->
                                            </view>
                                            <navigator
                                                v-if="item.refundState == 14"
                                                :url="'../orderDetail/orderDetail?uniqueId=' + item.uniqueId + '&state=' + true"
                                                class="do-btn submit-btn"
                                            >
                                                退款申请中
                                            </navigator>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <to-bottom v-if="toBottom" />
                        </van-tab>
                    </view>
                </van-tabs>
            </view>
        </view>
        <!-- 二维码核销 -->
        <van-popup :show="showQRCode" @close="onClose" round closeable>
            <view class="QR-box" style="width: 280px; height: 270px">
                <view class="QR-top">出示二维码扫码核销</view>
                <view class="numer-deal-box" style="padding: 40rpx 50rpx" @tap="showNumer">
                    <view class="click-number" v-if="!showHexiao">点击可查看付款码数字</view>
                    <view class="clicked-number" v-if="showHexiao">{{ verification }}</view>
                </view>
                <canvas style="width: 110px; height: 110px; margin: 0 auto" canvas-id="myQrcode"></canvas>
            </view>
        </van-popup>
        <!-- 收货 -->
        <van-overlay v-show="isTake">
            <view class="istake-container">
                <image
                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%88%91%E7%9A%84_%E6%94%B6%E8%B4%A7%E5%9B%BE%E7%89%87.png"
                    class="istake-img"
                ></image>
                <view class="istake-content">
                    <view>请选择收货方式：</view>
                    <view>1、确认无误收货：如果需要退货,需要自行和商家协商处理。</view>
                    <view>2、仅收货：支持7天内退货。</view>
                    <view class="is-read-content" @tap="read">
                        <image :src="isCheck ? '/pages/img/order/is_comfirm_taked.png' : '/pages/img/order/is_comfirm_take.png'" class="is-read-img"></image>
                        <text>我已知悉（默认不选中，需要勾选后才能收货）</text>
                    </view>
                </view>
                <view class="istake-bottom">
                    <view class="istake-btn" @tap="confirmTake" data-type="1">确认无误收货</view>
                    <view class="istake-btn" @tap="confirmTake" data-type="0">仅收货</view>
                </view>
            </view>
            <image src="/static/pages/img/order/order_close.png" class="close-take" @tap="cancelTake"></image>
        </van-overlay>
    </view>
</template>

<script>
// import vanTab from './@vant/weapp/tab/index';
// import vanTabs from './@vant/weapp/tabs/index';
// import vanImage from './@vant/weapp/image/index';
import toBottom from '../../Component/toBottom/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// pages/Order/Order.js
const time = require('../../../utils/util');

import drawQrcode from '../../../utils/api/weapp.qrcode.min.js';
const app = getApp();
export default {
    components: {
        // vanTab,
        // vanTabs,
        // vanImage,
        toBottom,
        // vanPopup,
        // vanOverlay
    },
    data() {
        return {
            // active: 0
            pageCurr: 1,

            pageSize: 10,
            activeTab: '2',
            toBottom: false,
            isSubmit: false,
            marchantId: 0,

            dntabs: [
                {
                    name: '待消费'
                },
                {
                    name: '已取消'
                },
                {
                    name: '已完成'
                },
                {
                    name: '退款/退货'
                }
            ],

            pstabs: [
                {
                    name: '待付款'
                },
                {
                    name: '待发货'
                },
                {
                    name: '待收货'
                },
                {
                    name: '已完成'
                },
                {
                    name: '退款/退货'
                }
            ],

            tabsList: [],
            tabsItem: 0,
            shopOrderStatus: 0,
            deliveryOrderStatus: 0,
            orderList: [],
            showQRCode: false,
            showHexiao: false,
            isTake: false,
            isCheck: false,
            takeData: {},

            cartShop: {
                appName: ''
            },

            tabsitem: '',
            verification: 0,
            name: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });

        if (options.marchantId) {
            this.setData({
                marchantId: options.marchantId
            });
        }

        this.setData({
            activeTab: options.activeTab || 2,
            tabsitem: parseInt(options.tabsItem) || 0
        });
        uni.setNavigationBarTitle({
            title: this.activeTab == 1 ? '店内订单' : '物流订单'
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getParam();
        this.clearData();
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        this.getOrderList();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.clearData();
    },
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
        if (this.toBottom == false) {
            this.getOrderList();
        }
    },
    methods: {
        // 获取页面参数
        getParam() {
            if (this.activeTab == '1') {
                this.setData({
                    tabsList: this.dntabs
                });
            } else if (this.activeTab == '2') {
                this.setData({
                    tabsList: this.pstabs
                });
            }
        },

        //切换订单状态
        onChange(e) {
            this.clearData();
            var index = e.detail.index;
            this.setData({
                tabsitem: index
            });
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            this.getOrderList();
        },

        //清空数据
        clearData() {
            this.setData({
                pageCurr: 1,
                orderList: [],
                toBottom: false,
                verification: 0
            });
        },

        //显示二维码
        showQR(e) {
            var uniqueId = e.currentTarget.dataset.uniqueid;
            this.setData({
                showQRCode: true
            });
            let data = {
                uniqueId: uniqueId
            };
            console.log(data);
            app.globalData.sjrequest('/order/queryVerification', data).then((res) => {
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

        onClose() {
            this.setData({
                showQRCode: false,
                showHexiao: false
            });
        },

        showNumer() {
            this.setData({
                showHexiao: true
            });
        },

        // 评论
        comment(e) {
            let orderIdx = e.currentTarget.dataset.orderidx;
            let goodsIdx = e.currentTarget.dataset.goodsidx;
            let goodsData = this.orderList[orderIdx].orderCommodity[goodsIdx];
            let orderList = this.orderList[orderIdx];
            app.globalData.marchantId = orderList.marchantId;
            //商家id
            app.globalData.commodityId = goodsData.commodityId; //商品id
            app.globalData.commodityLogo = goodsData.thumbnail; //商品图片

            app.globalData.commodityName = goodsData.commodityName; //商品名称

            app.globalData.orderUniqueId = goodsData.uniqueId; //订单uid

            uni.navigateTo({
                url: '../postGoodsComment/postGoodsComment'
            });
        },

        // 撤销申请
        cancelRefund(e) {
            let that = this;
            uni.showModal({
                title: '撤销退货申请',
                content: '是否要撤销退货申请，撤销后将无法再次申请退货',
                showCancel: true,
                //是否显示取消按钮
                cancelText: '否',
                //默认是“取消”
                confirmText: '是',
                //默认是“确定”
                success: function (res) {
                    if (res.cancel) {
                        //点击取消,默认隐藏弹框
                    } else {
                        //点击确定
                        console.log(e.currentTarget.dataset);
                        let data = {
                            orderCommodityId: e.currentTarget.dataset.ordercommodityid,
                            orderId: e.currentTarget.dataset.orderid
                        };
                        app.globalData.sjrequest('/order/cancelChargeback', data).then((res) => {
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: '撤销退款成功',
                                    icon: 'none',
                                    success: function () {
                                        that.clearData();
                                        that.setData({
                                            tabsitem: 3
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },

        read() {
            this.setData({
                isCheck: !this.isCheck
            });
        },

        // 电话联系
        callStore(e) {
            let tel = e.currentTarget.dataset.tel;
            uni.makePhoneCall({
                phoneNumber: tel
            });
        },

        // 收货弹框
        getOrderGoods(e) {
            let el = e.currentTarget.dataset;
            let data = {
                uniqueId: el.uniqueid,
                orderState: el.id,
                marchantId: el.marchantid
            };
            this.setData({
                isTake: true,
                takeData: data
            });
        },

        // 取消收货
        cancelTake() {
            this.setData({
                isTake: false,
                isCheck: false
            });
        },

        // 确认收货
        confirmTake(e) {
            if (!this.isCheck) {
                uni.showToast({
                    title: '请先勾选我已知悉',
                    icon: 'none'
                });
                return;
            }

            let type = e.currentTarget.dataset.type;
            let that = this;
            let data = this.takeData;
            data.receivingType = type;
            this.cancelTake();
            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                if (res.data.code == 200) {
                    that.clearData();
                    that.getOrderList();
                }
            });
        },

        // 配送订单操作
        updateCityOrder(e) {
            var that = this;
            var ev = e.currentTarget.dataset;
            let data = {
                uniqueId: ev.uniqueid,
                orderState: ev.id,
                marchantId: ev.marchantid
            };
            var text;
            var notice;
            switch (parseInt(ev.id)) {
                case 3:
                    text = '确认取消订单吗？';
                    notice = '取消成功';
                    break;

                case 4:
                    text = '确认收货吗？';
                    notice = '已确认收货';
                    break;

                case 5:
                    text = '确认删除订单吗？';
                    notice = '删除成功';
                    break;
            }

            if (ev.id != 2) {
                uni.showModal({
                    title: '提示',
                    content: text,
                    success: function (sm) {
                        if (sm.confirm) {
                            // 用户点击了确定 可以调用删除方法了
                            app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                                if (res.data.code == 200) {
                                    that.clearData();
                                    that.getOrderList();
                                }
                            });
                        } else if (sm.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }

            if (ev.id == 2) {
                app.globalData.sjrequest('/order/updateCityOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '已提醒商家',
                            icon: 'none'
                        });
                    } else if (res.data.code == 309) {
                        uni.showToast({
                            title: '您已经提醒过了，一天只能提醒一次哦!',
                            icon: 'none'
                        });
                    }
                });
            }
        },

        // 支付订单
        payOrder(e) {
            if (!this.isSubmit) {
                // 防止多次点击
                this.setData({
                    isSubmit: true
                });
                var item = e.currentTarget.dataset.item;
                var that = this;
                let merchantId = uni.getStorageSync('merchantId');
                let appid = uni.getStorageSync('appid');
                console.log(item);
                let data = {
                    marchantId: merchantId,
                    appid: appid,
                    uniqueId: item.uniqueId,
                    paymentWay: 2,
                    actualMoney: item.actualMoney,
                    orderNumber: item.orderNumber,
                    body: item.nickName,
                    payPlatform: 'JSAPI'
                };
                app.globalData.sjrequest('/order/paymentOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.requestPayment({
                            appId: res.data.data.appId,
                            nonceStr: res.data.data.nonceStr,
                            // 支付签名随机串，不长于 32 位
                            package: res.data.data.package,
                            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: res.data.data.signType,
                            // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            timeStamp: res.data.data.timeStamp,
                            // 支付签名时间戳，
                            paySign: res.data.data.paySign,
                            // 支付签名
                            success: function (res) {
                                that.clearData();
                                that.getOrderList();
                                that.setData({
                                    isSubmit: false
                                });
                            },
                            fail: function (res) {
                                uni.showToast({
                                    title: '支付失败',
                                    icon: 'none'
                                });
                                that.setData({
                                    isSubmit: false
                                });
                            }
                        });
                    }
                });
            }
        },

        toApplyReturn(e) {
            uni.navigateTo({
                url: `../applyReturn/applyReturn?uniqueId=${e.currentTarget.dataset.uniqueid}&selfUniqueId=${e.currentTarget.dataset.selfuniqueid}`
            });
        },

        getOrderList() {
            if (this.activeTab == 1) {
                // 店内订单
                switch (this.tabsitem) {
                    case 0:
                        this.setData({
                            shopOrderStatus: 1
                        });
                        break;

                    case 1:
                        this.setData({
                            shopOrderStatus: 3
                        }); //已取消

                        break;

                    case 2:
                        this.setData({
                            shopOrderStatus: 4
                        }); //已完成

                        break;

                    case 3:
                        this.setData({
                            shopOrderStatus: 5
                        }); //退货退款

                        break;
                }

                let data = {
                    pageCurr: this.pageCurr,
                    pageSize: this.pageSize,
                    orderState: this.shopOrderStatus
                };
                app.globalData.sjrequest('/order/queryReserveOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data.length < this.pageSize) {
                            this.setData({
                                toBottom: true
                            });
                        }

                        res.data.data.forEach((item) => {
                            item.orderTime = time.formatTimeSec(item.orderTime, 'Y-M-D h:m:s');
                        });
                        this.setData({
                            orderList: res.data.data.concat(this.orderList)
                        });
                        console.log(this.orderList);
                    }
                });
            }

            if (this.activeTab == 2) {
                // 配送订单
                switch (this.tabsitem) {
                    case 0:
                        this.setData({
                            deliveryOrderStatus: 0
                        }); //待付款

                        break;

                    case 1:
                        this.setData({
                            deliveryOrderStatus: 1
                        }); //已发货

                        break;

                    case 2:
                        this.setData({
                            deliveryOrderStatus: 2
                        }); //已收货

                        break;

                    case 3:
                        this.setData({
                            deliveryOrderStatus: 4
                        }); //已完成

                        break;

                    case 4:
                        this.setData({
                            deliveryOrderStatus: 5
                        }); //退款退货

                        break;
                }

                let data = {
                    pageCurr: this.pageCurr,
                    pageSize: this.pageSize,
                    orderState: this.deliveryOrderStatus
                };

                if (this.marchantId) {
                    data.marchantId = this.marchantId;
                }

                app.globalData.sjrequest('/order/queryCityOrder', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.hideLoading();

                        if (res.data.data.length < this.pageSize) {
                            this.setData({
                                toBottom: true
                            });
                        }

                        res.data.data.forEach((item) => {
                            item.orderTime = time.formatTimeSec(item.orderTime);
                        });
                        this.setData({
                            orderList: [...new Set(this.orderList.concat(res.data.data))],
                            pageCurr: this.pageCurr + 1
                        });
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
                    }
                });
            }
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
        /**
         * 用户点击右上角分享
         */
    }
};
</script>
<style>
/* pages/Order/Order.wxss */
.order {
    min-height: 100vh;
    background: #ffffff;
}
.order .tabs .order-list-container {
    padding: 0 30rpx;
    box-sizing: border-box;
}
.order .tabs .order-list-container .order-content {
    width: 100%;
    background: rgba(229, 228, 229, 0.1);
    box-shadow: 0rpx 6rpx 10rpx rgba(66, 41, 41, 0.1);
    border-radius: 20rpx;
    margin: 0 auto;
    margin-top: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.order .tabs .order-list-container .order-content .order-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0rpx 26rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #e2e2e2;
}
.order .tabs .order-list-container .order-content .order-title .order-id {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
}
.order .tabs .order-list-container .order-content .order-title .order-status {
    height: 40rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40rpx;
    color: #f74c54;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .store-content {
    display: flex;
    height: 80rpx;
    align-items: center;
}
.order .tabs .order-list-container .order-content .store-content .store_icon {
    width: 34.16rpx;
    height: 32.44rpx;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content {
    display: flex;
    align-items: center;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content .store-name {
    height: 40rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 42rpx;
    color: #333;
    opacity: 1;
    margin-left: 10rpx;
    max-width: 400rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
.order .tabs .order-list-container .order-content .store-content .store-name-content .jinru {
    width: 10rpx;
    height: 20rpx;
    margin-left: 14rpx;
}
.order .tabs .order-list-container .order-content .goods-content {
    width: 100%;
    display: flex;
    box-sizing: bor;
    margin-bottom: 20rpx;
}
.order .tabs .order-list-container .order-content .goods-content /deep/ .van-image .van-image__img {
    border-radius: 10rpx;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item {
    width: 0;
    flex: 1;
    height: 154rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods-name {
    width: 100%;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 38rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: space-between;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content .spec-container {
    max-width: 70%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
    opacity: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .spec-content .refund {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f74c54;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content .goods_price {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ec1919;
}
.comment-btn {
    width: 120rpx;
    height: 40rpx;
    border: 1rpx solid #cccccc;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order .tabs .order-list-container .order-content .goods-content .goods-item .goods_price_content .goods_num {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999;
}
.order .tabs .order-list-container .order-content .goods-total {
    width: 100%;
    /* text-align: right;
  padding: 0 42rpx; */
    box-sizing: border-box;
}
.order .tabs .order-list-container .order-content .goods-total .total-span {
    color: #333;
    font-size: 28rpx;
    display: flex;
}
.price_symbol {
    font-size: 18rpx;
}
.sale_money {
    color: #999999;
    padding-right: 10rpx;
}
.order .tabs .order-list-container .order-content .goods-total .total-span .total-price {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #ec1919;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .goods-time-box {
    width: 100%;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.order .tabs .order-list-container .order-content .goods-time-box .item-box {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
}
.order .tabs .order-list-container .order-content .order-footer {
    margin-top: 20rpx;
}
.order .tabs .order-list-container .order-content .order-footer .btn-content-box {
    width: 100%;
    text-align: right;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 20rpx;
}
.order .tabs .order-list-container .order-content .order-footer .do-btn {
    width: 170rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    border-radius: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
}
.order .tabs .order-list-container .order-content .order-footer .cancel-btn {
    color: #999;
    border: 1rpx solid #cccccc;
    opacity: 1;
}
.order .tabs .order-list-container .order-content .order-footer .other_btn {
    margin-right: 18rpx;
}
.order .tabs .order-list-container .order-content .order-footer .submit-btn {
    border: 1rpx solid #ed5757;
    color: #ed5757;
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
    line-height: 40rpx;
    color: #333333;
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
/* 收货 */
.istake-container {
    width: 628rpx;
    height: 704rpx;
    background: #fff;
    border-radius: 30rpx;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.istake-img {
    width: 100%;
    height: 364rpx;
    vertical-align: middle;
}
.istake-content {
    width: 100%;
    height: 238rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 34rpx;
    color: #333333;
}
.is-read-content {
    width: 100%;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
    display: flex;
    padding: 20rpx;
}
.is-read-img {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
}
.istake-bottom {
    width: 100%;
    height: 102rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}
.istake-btn {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2rpx solid #f4f4f4;
    box-sizing: border-box;
}
.close-take {
    width: 40rpx;
    height: 40rpx;
    position: fixed;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
}
.copy_img {
    width: 40rpx;
    height: 40rpx;
}
.isOk_price {
    color: #000;
}
</style>
