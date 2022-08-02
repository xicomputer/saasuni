<template>
    <view>
        <!-- pages/special_goods/goods_detail/goods_detail.wxml -->

        <view>
            <!-- banner -->
            <swiper class="swiper-box" @change="swiperChange">
                <swiper-item v-if="goodsInfo.videoUrl">
                    <video id="swiperVideo" :src="goodsInfo.videoUrl" class="banner-img" :poster="goodsInfo.videoCover"></video>
                </swiper-item>
                <swiper-item v-for="(item, index) in goodsInfo.imagList" :key="index">
                    <image :src="item" class="banner-img"></image>
                </swiper-item>
            </swiper>

            <!-- 商品基本信息 -->
            <view class="base-info">
                <view class="price-str">
                    <text>￥</text>
                    <text class="price-num">{{ goodsInfo.originalPrice }}</text>
                </view>
                <view class="me-fx-row me-fx-sb-c">
                    <view class="goods-name">{{ goodsInfo.commodityName }}</view>
                    <button open-type="share" class="me-fx-col me-fx-c-c share-btn">
                        <image src="/static/pages/special_goods/imgs/wx-logic.png" class="wx-logo-img"></image>
                        <text>分享</text>
                    </button>
                </view>
            </view>

            <!-- 属性 -->
            <view class="attr-info">
                <view class="me-fx-row me-fx-sb-c attr-item" @tap="openSale">
                    <view class="me-fx-row me-fx-start-c">
                        <text class="attr-name">优惠</text>
                        <text class="red-full-box">{{ saleState }}</text>
                    </view>
                    <scroll-view :scroll-x="true" class="sale-can-List">
                        <view class="yhq-scroll">
                            <view class="yhq-box" v-for="(item, index) in saleCanList" :key="index">满{{ item.confine }}减{{ item.deduct }}</view>
                        </view>
                    </scroll-view>
                    <image class="more-img" src="/static/pages/img/goods/point-adorn.png"></image>
                </view>
                <view class="me-fx-row me-fx-sb-c attr-item" v-if="nowSku.itemText">
                    <view class="me-fx-row me-fx-start-c">
                        <text class="attr-name">规格</text>
                        <text class="sku-item-box">{{ nowSku.itemText }}</text>
                    </view>
                    <image class="more-img" src="/static/pages/img/goods/point-adorn.png"></image>
                </view>
                <view class="me-fx-row me-fx-sb attr-item">
                    <text class="attr-name">购买须知</text>
                    <view class="me-fx-1 instructions" v-if="orderTemplate == 3">购买此商品仅适用于门店团购</view>
                    <view class="me-fx-1 instructions" v-if="orderTemplate == 2">购买此商品仅适用于同城配送</view>
                </view>
                <view class="me-fx-row me-fx-start-c attr-item">
                    <text class="attr-name">{{ orderTemplate == 2 ? '同城配送' : '预定自取' }}</text>
                    <view class="me-fx-1 me-fx-row me-fx-start-c">
                        <view class="label-item">购买</view>
                        <text class="line-x"></text>
                        <view class="label-item">{{ orderTemplate == 2 ? '配送' : '店内消费' }}</view>
                        <text class="line-x"></text>
                        <view class="label-item">完成</view>
                    </view>
                </view>
                <view class="me-fx-row me-fx-sb-c attr-item">
                    <view class="me-fx-row me-fx-start-c">
                        <text class="attr-name">保障</text>
                        <view class="security">放心购·材质保障·假一罚十</view>
                    </view>
                    <image class="more-img" src="/static/pages/img/goods/point-adorn.png"></image>
                </view>
            </view>

            <!-- 商家信息 -->
            <view class="me-fx-row merchants-info" v-if="marchantInfo.merchantId" @tap="jumpMarchantInfo">
                <image :src="marchantInfo.headImg" class="merchants-img"></image>
                <view class="me-fx-col me-fx-sb">
                    <view class="me-fx-row me-fx-start-c">
                        <text class="name-str">{{ marchantInfo.nickName }}</text>
                        <image class="right-jt-img" src="/static/pages/img/back-icon.png"></image>
                    </view>
                    <view class="introduction-content">{{ marchantInfo.signature }}</view>
                    <view class="certification-label">企业认证</view>
                </view>
            </view>

            <view class="me-fx-row me-fx-sb-c footer-box">
                <view class="me-fx-row me-fx-start-c">
                    <view class="me-fx-col me-fx-c-c nav-item" @tap="jumpPage" data-type="1">
                        <image src="/static/image/pmhd/icon_cs.png" class="icon-img"></image>
                        <text>客服</text>
                    </view>
                    <view class="me-fx-col me-fx-c-c nav-item" @tap="jumpPage" data-type="2">
                        <image src="/static/image/pmhd/icon_shop.png" class="icon-img"></image>
                        <text>店铺</text>
                    </view>
                </view>
                <view class="buy-btn" @tap="openBuyPopup" v-if="orderTemplate == 3">预订门店团购</view>
                <view class="buy-btn" @tap="openBuyPopup" v-if="orderTemplate == 2">同城商家配送</view>
            </view>
        </view>

        <!-- 购买弹窗 -->
        <view class="buy-popup-box" v-if="showBuyPopup">
            <view class="popup-content">
                <image src="/static/pages/img/goods/share_close.png" class="close-btn" @tap="closeBuyPopup"></image>
                <view class="me-fx-row product-info">
                    <image class="product-img" :src="nowSku.thumbnail"></image>
                    <view class="me-fx-col me-fx-sb">
                        <view class="price-str">
                            <text>￥</text>
                            <text class="price-num">{{ nowSku.originalPrice }}</text>
                        </view>
                        <view class="inventory-str">库存：{{ nowSku.stock }}</view>
                    </view>
                </view>
                <view class="block-box">
                    <view class="title-text">购买须知</view>
                    <view class="instructions">购买此商品仅适用于{{ orderTemplate == 3 ? '门店团购' : '同城配送' }}</view>
                </view>
                <view class="block-box">
                    <view class="title-text">规格</view>
                    <view class="me-fx-row specification-list">
                        <view
                            :class="'me-fx-row me-fx-c-c sku-item ' + (item.id == nowSku.id ? 'sel-sku' : '')"
                            @tap="replaceSku"
                            :data-item="item"
                            v-for="(item, index) in skuList"
                            :key="index"
                        >
                            <image class="sku-img" :src="item.thumbnail"></image>

                            <text>{{ item.itemText }}</text>
                        </view>
                    </view>
                </view>
                <view class="me-fx-row me-fx-sb-c block-box">
                    <view class="title-text">数量</view>
                    <add-subtract-num @change="countChange" @minusCount="minusCount" :desabled="isCountDesabled"></add-subtract-num>
                </view>
                <view class="me-fx-row me-fx-c-c btns-box">
                    <view class="btn buy-btn" @tap="buyNow">立即购买</view>
                </view>
            </view>
        </view>

        <!-- 优惠券 -->
        <van-popup :show="showSale" @close="closeSale" round closeable position="bottom">
            <view class="sale-box-pop">
                <view class="sale-title">优惠券</view>
                <scroll-view :scroll-y="true" class="scroll-box">
                    <view class="sale-list">
                        <view
                            class="sale-item"
                            @tap="selectSale"
                            :data-index="index"
                            style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg_sub.png); background-size: 100% 173rpx; background-repeat: no-repeat"
                            v-for="(item, index) in saleCanList"
                            :key="index"
                        >
                            <view class="coupon-left">
                                <view>￥{{ item.deduct }}</view>
                                <view style="font-size: 24rpx; margin-left: 18rpx">满{{ item.confine }}元使用</view>
                            </view>

                            <view class="coupon-right">
                                <view class="coupon-title">{{ item.couponName }}</view>
                                <view class="coupon-time">截止日期：{{ item.endTime }}</view>
                                <view class="coupon-state">{{ item.isDraw == 1 ? '已领取' : '未领取' }}</view>
                            </view>
                        </view>
                    </view>
                </scroll-view>

                <view @tap="receiveSale" v-if="!receivedSale" class="sale-receive-btn">立即领取</view>
                <view @tap="receivedSaleFun" v-if="receivedSale" class="sale-receive-btn received">已领取</view>
            </view>
        </van-popup>

        <!-- 授权组件 -->
        <auth-get-info></auth-get-info>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import addSubtractNum from '@/pages/Component/add-subtract-num/add-subtract-num';
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
// import vanPopup from './@vant/weapp/popup/index';
// pages/special_goods/goods_detail/goods_detail.js
let app = getApp();
export default {
    components: {
        // vanCountDown,
        addSubtractNum,
        authGetInfo,
        // vanPopup
    },
    data() {
        return {
            marchantId: '',
            commodityId: '',
            goodsInfo: {
                videoUrl: '',
                videoCover: '',
                imagList: [],
                originalPrice: '',
                commodityName: ''
            },
            skuList: [],
            //规格列表
            nowSku: {
                itemText: '',
                thumbnail: '',
                originalPrice: '',
                stock: '',
                id: ''
            },
            //选中规格
            marchantInfo: {
                merchantId: '',
                headImg: '',
                nickName: '',
                signature: ''
            },
            //商家信息
            isCountDesabled: false,
            buyCount: 1,
            //购买数量
            showBuyPopup: false,
            orderTemplate: '',
            //订单模板 1.物流 2.同城 3.预订
            showSale: false,
            saleCanList: [],
            //优惠券列表
            saleState: '无优惠',
            receivedSale: true //是否领取了优惠券
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var scene = options.scene;
        app.globalData.globalEvent.$on('loginComplete', () => {
            if (scene) {
                //扫码进入
                this.getCodeParams(scene);
            } else {
                this.initData(options);
            }
        });
        app.globalData.globalEvent.$on('loginReject', () => {
            this.initData(options);
        });
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
    onShareAppMessage: function () {
        return {
            title: this.goodsInfo.commodityName
        };
    },
    /* 朋友圈分享 */
    onShareTimeline() {
        return {
            title: this.goodsInfo.commodityName
        };
    },
    methods: {
        initData(options) {
            this.setData(
                {
                    marchantId: options.marchantId || '',
                    commodityId: options.commodityId || '',
                    orderTemplate: options.orderTemplate || ''
                },
                () => {
                    this.getGoodsInfo();
                    this.querySkuList();
                    this.getShopInfo(); //获取商家信息
                }
            );
        },

        getCodeParams(id) {
            //扫码进入该页面
            let data = {
                id
            };
            app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var scene = JSON.parse(data.scene);
                    this.initData(scene);
                }
            });
        },

        jumpPage(e) {
            var type = e.currentTarget.dataset.type;

            if (type == 1) {
                //客服
                var marchantId = this.marchantId;
                var { nickName, headImg } = this.marchantInfo;
                uni.navigateTo({
                    url: `/pages/order/contact/contact?logoPic=${headImg}&marchantId=${marchantId}&marchantName=${nickName}`
                });
            } else {
                //店铺
                uni.navigateTo({
                    url: '/pages/shopHome/home/home'
                });
            }
        },

        openSale() {
            //打开优惠卷列表
            if (this.saleCanList.length) {
                this.setData({
                    showSale: true
                });
            } else {
                uni.showToast({
                    title: '无优惠劵',
                    icon: 'none'
                });
            }
        },

        closeSale() {
            //关闭优惠卷列表
            this.setData({
                showSale: false
            });
        },

        getGoodsInfo() {
            //获取商品详情
            app.globalData
                .sjrequest('/commodity/queryCommodityInfo', {
                    commodityId: this.commodityId
                })
                .then((res) => {
                    console.log('商品详情：', res);

                    if (res.statusCode == 200 && res.data.code == 200) {
                        var goodsInfo = res.data.data || {};
                        var saleCanList = goodsInfo.commodityCouponsList;
                        var saleState = '无优惠';
                        var receivedSale = true;
                        if (saleCanList.length) {
                            saleState = '已领券';
                            saleCanList.forEach((item) => {
                                if (item.isDraw == 0) {
                                    saleState = '可领券';
                                    receivedSale = false;
                                }
                            });
                        }

                        this.setData({
                            goodsInfo,
                            saleCanList,
                            saleState,
                            receivedSale
                        });
                    }
                });
        },

        querySkuList() {
            //查询规格列表
            var { marchantId, commodityId } = this;
            app.globalData
                .sjrequest('/commodity/queryCommoSku', {
                    marchantId,
                    commodityId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        var list = res.data.data || [];
                        var nowSku = list[0] || {};
                        this.setData({
                            skuList: list,
                            nowSku
                        });
                    }
                });
        },

        replaceSku(e) {
            //切换规格
            var item = e.currentTarget.dataset.item;
            this.setData({
                nowSku: item
            });
        },

        countChange(e) {
            //购买数量改变
            var buyCount = e.detail.value;
            var currentSku = this.nowSku;

            if (buyCount > currentSku.stock) {
                this.setData({
                    isCountDesabled: true
                });
                return uni.showToast({
                    title: '购买数量超出库存数量',
                    icon: 'none'
                });
            }

            this.setData({
                buyCount
            });
        },

        minusCount() {
            if (this.isCountDesabled) {
                this.setData({
                    isCountDesabled: false
                });
            }
        },

        openBuyPopup(e) {
            //打开购买弹窗
            var marchantInfo = this.marchantInfo;

            if (marchantInfo.merchantId) {
                this.setData({
                    showBuyPopup: true
                });
            } else {
                uni.showToast({
                    title: '还未登录',
                    icon: 'none'
                });
            }
        },

        closeBuyPopup() {
            //关闭购买弹窗
            this.setData({
                showBuyPopup: false
            });
        },

        /**立即购买 */
        buyNow() {
            var nowSku = this.nowSku;
            var marchantId = this.marchantId;
            var buyCount = this.buyCount;
            var orderTemplate = this.orderTemplate;

            if (buyCount > nowSku.stock) {
                uni.showToast({
                    title: '库存不足',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }

            let data = {
                marchantId,
                orderType: 3,
                commoditys: [
                    {
                        commodityId: nowSku.commodityId,
                        tempSpecId: nowSku.id,
                        amount: buyCount
                    }
                ]
            };
            uni.showLoading({
                title: '加载中...'
            });
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/order/onekeyAboutOrder', data, token).then((res) => {
                if (res.data.code === 200) {
                    uni.hideLoading();
                    app.globalData.store.setState({
                        // 更新 store 数据
                        submitObj: JSON.stringify(res.data.data)
                    });
                    var url = `/pages/order/submitOrder/submitOrder?`;
                    url += `orderType=${orderTemplate}`;
                    uni.navigateTo({
                        url
                    });
                } else {
                    uni.hideLoading();
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        getShopInfo() {
            let ids = this.marchantId;
            app.globalData
                .sjrequest('/marchant/subjectInfo', {
                    merchantId: ids
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        var data = res.data.data;
                        var marchantInfo = data.appletInfo;
                        this.setData({
                            marchantInfo
                        });
                    }
                });
        },

        //跳转商家信息展示页
        jumpMarchantInfo() {
            uni.navigateTo({
                url: '/pages/Index/BusinessInfo/BusinessInfo'
            });
        },

        receiveSale() {
            var saleCanList = this.saleCanList;

            if (this.receivedSale) {
                uni.showToast({
                    title: '已领取优惠券',
                    icon: none
                });
                return;
            }

            var data = {
                couponsIds: []
            };
            saleCanList.forEach((item) => {
                data.couponsIds.push(item.id);
            });
            data.couponsIds = data.couponsIds.toString();
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/coupons/getCoupons', data, token).then((res) => {
                if (res.data.code == 200) {
                    saleCanList.forEach((item) => {
                        item.isDraw = 1;
                    });
                    this.setData({
                        showSale: false,
                        saleState: '已领券',
                        receivedSale: true,
                        saleCanList: saleCanList
                    });
                    uni.showToast({
                        title: '领取成功',
                        icon: 'none'
                    });
                }
            });
        },

        receivedSaleFun() {
            uni.showToast({
                title: '已经领取过了',
                icon: 'none'
            });
            this.setData({
                showSale: false
            });
        },

        swiperChange(e) {
            var current = e.detail.current;
            var videoUrl = this.goodsInfo.videoUrl;

            if (videoUrl) {
                var videoContext = uni.createVideoContext('swiperVideo');

                if (current == 0) {
                    // videoContext.play();
                } else {
                    videoContext.pause();
                }
            }
        },

        selectSale() {
            console.log('占位：函数 selectSale 未声明');
        }
    }
};
</script>
<style>
/* pages/special_goods/goods_detail/goods_detail.wxss */

page {
    background-color: #f7f7f7;
}

.swiper-box {
    height: 750rpx;
}
.swiper-box .banner-img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
}

/* 商品基本信息 */
.base-info {
    background-color: #fff;
    padding: 30rpx 20rpx;
    box-sizing: border-box;
}
.base-info .price-str {
    font-size: 32rpx;
    font-weight: bold;
    color: #fe4f4f;
}
.base-info .price-num {
    font-size: 48rpx;
}
.base-info .goods-name {
    width: 540rpx;
    font-size: 36rpx;
    color: #333;
    font-weight: bold;
}
.base-info .share-btn {
    font-size: 24rpx;
    color: #333;
    background-color: transparent;
}
.base-info .share-btn:after {
    border: 0;
}
.base-info .share-btn .wx-logo-img {
    width: 52rpx;
    height: 52rpx;
}

/* 属性信息 */
.attr-info {
    margin: 20rpx 0;
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
}
.attr-info .attr-item:not(:last-child) {
    margin-bottom: 40rpx;
}
.attr-info .attr-name {
    font-size: 28rpx;
    color: #999;
    margin-right: 20rpx;
}
.attr-info .red-full-box {
    font-size: 24rpx;
    color: #fff;
    border-radius: 8rpx;
    background-color: #ff0000;
    padding: 3rpx 20rpx;
}
.attr-info .sku-item-box {
    font-size: 24rpx;
    color: #fe4f4f;
    border-radius: 8rpx;
    padding: 3rpx 20rpx;
    border: 1rpx solid #ff0000;
}
.attr-info .more-img {
    width: 40rpx;
    height: 12rpx;
}
.attr-info .instructions {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
}
.attr-info .label-item {
    font-size: 24rpx;
    color: #fff;
    border-radius: 8rpx;
    padding: 3rpx 20rpx;
    background: linear-gradient(90deg, #ff972a 0%, #fd5c00 100%);
}
.attr-info .line-x {
    width: 70rpx;
    height: 8rpx;
    background: linear-gradient(270deg, #ff972a 0%, #fd5c00 100%);
}
.attr-info .security {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
}

.attr-info .sale-can-List {
    margin-left: 15rpx;
    flex: 1;
}
.attr-info .sale-can-List .yhq-scroll {
    display: flex;
    flex-wrap: nowrap;
}
.attr-info .sale-can-List .yhq-box {
    width: fit-content;
    height: 35rpx;
    font-size: 18rpx;
    font-weight: bold;
    margin-right: 20rpx;
    background: radial-gradient(circle at left, transparent 8rpx, #eb1918 0) left, radial-gradient(circle at right, transparent 8rpx, #eb1918 0) right;
    background-size: 51% 100%;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20rpx;
    border-radius: 6rpx;
    white-space: nowrap;
    position: relative;
}

/* 商家信息 */
.merchants-info {
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    margin-bottom: 208rpx;
}
.merchants-info .merchants-img {
    width: 140rpx;
    height: 140rpx;
    background-color: #ccc;
    margin-right: 20rpx;
}
.merchants-info .name-str {
    font-size: 28rpx;
}
.merchants-info .right-jt-img {
    width: 15rpx;
    height: 26rpx;
    margin-left: 15rpx;
}

.merchants-info .introduction-content {
    color: #999;
}
.merchants-info .certification-label {
    background: linear-gradient(180deg, #ff7370 0%, #f83603 100%);
    width: 132rpx;
    height: 44rpx;
    border-radius: 8rpx;
    color: #fff;
    text-align: center;
    line-height: 44rpx;
}

/* 底部操作 */
.footer-box {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    font-size: 18rpx;
    color: #6d6d6d;
}
.footer-box .nav-item {
    margin: 0 30rpx;
}
.footer-box .icon-img {
    width: 40rpx;
    height: 40rpx;
}
.footer-box .buy-btn {
    width: 456rpx;
    height: 74rpx;
    color: #fff;
    font-size: 24rpx;
    background: linear-gradient(180deg, #f2180c 0%, #ea2610 100%);
    box-shadow: 0px 6px 12px rgba(237, 31, 14, 0.1);
    text-align: center;
    line-height: 74rpx;
    border-radius: 38rpx;
    margin-right: 20rpx;
}

/* -----------购买弹窗------------ */
.buy-popup-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
.buy-popup-box .popup-content {
    background-color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 40rpx 40rpx 0 0;
    width: 100%;
}
.buy-popup-box .popup-content .close-btn {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 15rpx;
    right: 20rpx;
}

.buy-popup-box .popup-content .product-info {
    border-bottom: 1rpx solid #ededed;
    padding: 40rpx 40rpx 20rpx;
    box-sizing: border-box;
}
.buy-popup-box .popup-content .product-img {
    width: 212rpx;
    height: 212rpx;
    margin-right: 20rpx;
    background-color: #ccc;
}
.buy-popup-box .popup-content .price-str {
    font-size: 24rpx;
    color: #fe4f4f;
}
.buy-popup-box .popup-content .price-num {
    font-size: 36rpx;
    font-weight: bold;
}
.buy-popup-box .popup-content .inventory-str {
    font-size: 24rpx;
    color: #333;
}

.buy-popup-box .popup-content .block-box {
    padding-left: 36rpx;
    padding-right: 30rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
}
.buy-popup-box .popup-content .block-box .title-text {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
}
.buy-popup-box .popup-content .instructions {
    font-size: 24rpx;
    color: #333;
    margin-top: 20rpx;
}

.buy-popup-box .popup-content .specification-list {
    flex-wrap: wrap;
    margin-top: 20rpx;
}
.buy-popup-box .popup-content .sku-item {
    font-size: 28rpx;
    color: #333;
    padding: 5rpx 10rpx;
    border: 2rpx solid #eee;
    background-color: #eee;
    margin-right: 20rpx;
    margin-bottom: 15rpx;
}
.buy-popup-box .popup-content .sel-sku {
    background-color: #fff4f8;
    border-color: #ff0000;
}

.buy-popup-box .popup-content .sku-item .sku-img {
    width: 60rpx;
    height: 60rpx;
    background-color: #999;
    margin-right: 10rpx;
}

.buy-popup-box .popup-content .btns-box {
    padding: 30rpx 0;
    margin-top: 20rpx;
}
.buy-popup-box .popup-content .btns-box .btn {
    width: 324rpx;
    height: 92rpx;
    font-size: 32rpx;
    color: #fff;
    text-align: center;
    line-height: 92rpx;
}
.buy-popup-box .popup-content .btns-box .add-cart {
    border-radius: 46rpx 0 0 46rpx;
    background-color: #ffb400;
}
.buy-popup-box .popup-content .btns-box .buy-btn {
    border-radius: 46rpx;
    background-color: #000;
    width: 510rpx;
}
/* ------------------------ */

/* 优惠 */
.sale-box-pop {
    width: 100%;
    padding: 0 35rpx;
    box-sizing: border-box;
}
.sale-box-pop .sale-title {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-align: center;
    padding-top: 44rpx;
}
.sale-box-pop .scroll-box {
    width: 100%;
    max-height: 680rpx;
}
.sale-box-pop .scroll-box .sale-list {
    width: 100%;
    padding: 35rpx 30rpx;
    box-sizing: border-box;
    border-top: 2rpx solid rgba(226, 226, 226, 1);
}
.sale-box-pop .scroll-box .sale-item {
    width: 100%;
    height: 173rpx;
    display: flex;
    margin-bottom: 30rpx;
}
.sale-box-pop .scroll-box .sale-item:last-child {
    margin-bottom: 0;
}
.sale-box-pop .scroll-box .coupon-left {
    width: 35%;
    height: 100%;
    font-size: 41rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
    box-sizing: border-box;
}
.sale-box-pop .scroll-box .coupon-right {
    width: 0;
    flex: 1;
    box-sizing: border-box;
    padding: 27rpx 10rpx 23rpx 20rpx;
}
.sale-box-pop .scroll-box .coupon-title {
    height: 28rpx;
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
}
.sale-box-pop .scroll-box .coupon-time {
    height: 24rpx;
    font-size: 24rpx;
    color: #999999;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin: 20rpx 0;
}
.sale-box-pop .scroll-box .coupon-state {
    height: 24rpx;
    font-size: 24rpx;
    color: #cd9535;
    font-family: Source Han Sans CN;
    font-weight: 400;
}
.sale-box-pop .sale-receive-btn {
    width: 80%;
    height: 100rpx;
    border-radius: 50rpx;
    background-color: #f78f23;
    color: #fff;
    font-size: 40rpx;
    margin: 20rpx auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sale-box-pop .received {
    background-color: #ccc;
}
/* ------------------------- */
</style>
