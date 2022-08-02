<template>
    <!-- 左右联动 -->
    <!-- <view hidden class="category-container"> -->

    <!-- 分类页面不显示 -->
    <!-- <view class="search-container">
        <view class="relative">
            <image mode="widthFix" src="../../../static/images/Frame@2x.png"></image>
            <input class="search-input" placeholder="请输入搜索内容" type="text" v-model="search" />
        </view>
    </view> -->

    <!-- <view class="commodity"> -->
    <!-- 左 -->
    <!-- <view class="order-left">
            <scroll-view scroll-y class="scroll-Hei" scroll-with-animation>
                <view class='"itemize-text" {{index==currentLeft?"active":""}}' wx:for="{{navList}}" wx:key="index" bindtap='proItemTap' data-pos='{{index}}'>
                    <text class="itemize-text-content">{{item.classifyName}}</text>
                </view>
            </scroll-view>
        </view> -->
    <!-- 右 -->
    <!-- <view class="order-right">
            <scroll-view class="scroll-Hei  right-scroll" scroll-y scroll-with-animation="true" scroll-into-view="{{selectId}}" bindscroll="scrollEvent" scroll-top="{{scrollTop}}">
                <view class="rig-height" wx:for="{{goodsList}}" wx:key="index" id='{{"item"+index}}'>
                    <view class="classif-goods" wx:for="{{item}}" wx:for-item="item" wx:for-index="singleIndex" wx:key="singleIndex" bindtap="toGoodsDetails" data-id="{{singleGoods.commodityId}}">
                        <view class="goods-image">
                            <image src="{{singleGoods.thumbnail}}" mode="aspectFill"></image>
                        </view>

                        <view class="goods-Price">
                            <view class="goods-info">
                                <view class="goods-name">
                                    <text class="Bold">{{singleGoods.commodityName}}</text>
                                </view>
                                <view class="tag">
                                    <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices/Group%202997%402x.png" mode="aspectFill"></image>
                                    <text 
                                        wx:for="{{singleGoods.labelsList}}" 
                                        wx:for-item="labels" 
                                        wx:for-index="labelsIndex"
                                        wx:key="labelsIndex"
                                        >{{labels}}</text>
                                </view>
                            </view>
                            <view class="unit-price">
                                <text class="Symbol">¥</text>
                                <text class="Bold">{{singleGoods.originalPrice}}</text>
                            </view>
                            <image class="popup" wx:if="{{mainOrderType == '3'}}" catchtap="openBuyPopup" data-goodinfo='{{singleGoods}}' src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E9%97%A8%E5%BA%97%E5%9B%A2%E8%B4%AD.png"></image>
                            <image class="popup" wx:if="{{mainOrderType == '2'}}" catchtap="openBuyPopup" data-goodinfo='{{singleGoods}}' src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E5%90%8C%E5%9F%8E%E9%85%8D%E9%80%81.png"></image>
                            <image class="popup" wx:if="{{mainOrderType == '1'}}" catchtap="openBuyPopup" data-goodinfo='{{singleGoods}}' src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2FGroup%202985%402x.png"></image>
                        </view>
                    </view>
                </view>
                <view style="height: 320rpx;"></view>
            </scroll-view>
        </view>
    </view> -->
    <!-- 底部不显示 -->
    <!-- <view class="order-bottom">
            <view class="Shopping" style="width: 115rpx;">
                <view class="Shopping-left">
                    <image src="" mode="widthFix"></image>
                </view>
                <view class="Shopping-number">12</view>
            </view>
            <view class="Shopping-title">已点10份菜品</view>
            <view class="place-order">
                <button plain="true" open-type="getUserInfo">选好了</button>
            </view>
        </view> -->
    <!-- </view> -->

    <view class="category-container">
        <!-- 分类页面 -->
        <!-- <view class="search-container">
        <view class="relative">
            <image mode="widthFix" src="../../../static/images/Frame@2x.png"></image>
            <input class="search-input" placeholder="请输入搜索内容" type="text" v-model="search" />
        </view>
    </view> -->
        <view class="commodity">
            <!-- 左 -->
            <view class="order-left">
                <scroll-view scroll-y class="scroll-Hei" scroll-with-animation>
                    <view :class="[index == currentLeft?'active':'']" class="itemize-text" @tap="switchGoods(index)"  v-for="(item, index) in navList" :key="index">
                        <text class="itemize-text-content">{{ item.classifyName }}</text>
                    </view>
                </scroll-view>
            </view>
            <!-- 右 -->
            <view class="order-right">
                <scroll-view class="scroll-Hei right-scroll" scroll-y :scroll-with-animation="true">
                    <view class="rig-height" v-for="(item, index) in switchGoodsList" :key="index">
                        <view class="classif-goods" @tap="toGoodsDetails" :data-id="item.commodityId">
                            <view class="goods-image">
                                <image :src="item.thumbnail" mode="aspectFill"></image>
                            </view>

                            <view class="goods-Price">
                                <view class="goods-info">
                                    <view class="goods-name u-line-2">
                                        <text class="Bold">{{ item.commodityName }}</text>
                                    </view>
                                    <view class="tag">
                                        <image
                                            v-if="commodityCouponsList.length"
                                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices/Group%202997%402x.png"
                                            mode="aspectFill"
                                        ></image>
                                        <text v-for="(labels, labelsIndex) in item.labelsList" :key="labels.labelsIndex">{{ labels }}</text>
                                    </view>
                                </view>
                                <view class="unit-price">
                                    <text class="Symbol">¥</text>
                                    <text class="Bold">{{ item.originalPrice }}</text>
                                </view>
                                <image
                                    class="popup"
                                    v-if="mainOrderType == '3'"
                                    @tap.stop.prevent="openBuyPopup"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E9%97%A8%E5%BA%97%E5%9B%A2%E8%B4%AD.png"
                                ></image>
                                <image
                                    class="popup"
                                    v-if="mainOrderType == '2'"
                                    @tap.stop.prevent="openBuyPopup"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E5%90%8C%E5%9F%8E%E9%85%8D%E9%80%81.png"
                                ></image>
                                <image
                                    class="popup"
                                    v-if="mainOrderType == '1'"
                                    @tap.stop.prevent="openBuyPopup"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2FGroup%202985%402x.png"
                                ></image>
                            </view>
                        </view>
                    </view>
                    <view style="width: 500rpx; height: 100rpx">
                        <image
                            style="width: 100%; height: 100%"
                            @tap="goSaleShop"
                            data-url="/pages/shopHome/dynamic/dynamic"
                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E5%95%86%E5%AE%B6%E6%B6%88%E6%81%AF%E9%80%9A%E7%9F%A5.png"
                            mode="aspectFill"
                        ></image>
                    </view>
                    <view style="height: 320rpx"></view>
                    <!-- <view class="support">- <text>信书技术支持</text> -</view> -->
                </scroll-view>
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
                    <view class="instructions">购买此商品仅适用于{{ tempId == 1 ? '门店团购' : '同城配送' }}</view>
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
                <view v-if="mainOrderType == '1'" class="me-fx-row me-fx-c-c btns-box">
                    <view class="btn buy-btn addCart" @tap="addCart">加入购物车</view>
                    <view class="btn buy-btn buyNow" @tap="buyNow">立即购买</view>
                </view>
                <view v-if="mainOrderType == '3'" class="me-fx-row me-fx-c-c btns-box">
                    <view class="btn buy-btn btn-now" @tap="buyNow">门店团购</view>
                </view>
                <view v-if="mainOrderType == '2'" class="me-fx-row me-fx-c-c btns-box">
                    <view class="btn buy-btn btn-now" @tap="buyNow">同城配送</view>
                </view>
            </view>
        </view>
    </view>
    <!-- 不联动 -->
</template>

<script>
import noData from '@/pages/Component/noData/index';
import addSubtractNum from '@/pages/Component/add-subtract-num/add-subtract-num';
// pages/shopHome/components/category-pages/category-pages.js
var app = getApp();
export default {
    components: {
        noData,
        addSubtractNum
    },
    data() {
        return {
            goodsData: {},

            //同城、预定分类商品信息
            navList: [],

            //同城、预定分类列表
            btnTitle: '',

            orderTemplate: '',

            //订单模板 1.物流 2.同城 3.预订
            classItem: '',

            pageSize: 10000,
            goodsList: [],

            // 存放所有分类下的所有商品
            currentLeft: 0,

            //左侧选中的下标
            selectId: 'item0',

            //当前显示的元素id
            scrollTop: 0,

            //到顶部的距离
            distance: 0,

            hieghtArr: [],

            // 存储每个rig-height节点的高度
            showBuyPopup: false,

            // 控制弹窗关闭和显示
            skuList: [],

            //规格列表
            nowSku: {
                thumbnail: '',
                originalPrice: '',
                stock: '',
                id: ''
            },

            //选中的规格
            goodsData: {},

            //同城、预定分类商品信息
            goodsItem: {},

            //正在操作的商品信息
            buyCount: 1,

            //购买数量
            isCountDesabled: false,

            DefaultSpec: {},

            // 商品默认信息
            showSpec: false,

            // 控制添加到购物车的商品通知
            commodityCouponsList: [],

            //门店优惠券列表
            //存储切换的商品用于渲染
            switchGoodsList: [],

            heightArr: '',

            labels: {
                labelsIndex: ''
            }
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        commentList: Array,
        tempId: {
            type: [String, Number],
            default: 1
        },
        shopList: {
            type: Array,
            default: () => []
        },
        hotelList: {
            type: Array,
            default: () => []
        },
        activityInfo: {
            type: Object
        },
        marchantId: {
            type: String,
            default: ''
        },
        mainOrderType: {
            //主推业务 1物流 2同城 3预订 , 判断当前是商户是哪个经营模式
            type: String,
            default: ''
        },
        addcouponList: {
            // 优惠券的张数
            // type: Array,
            type: String,
            default: ''
        }
    },
    beforeMount() {},
		mounted() {},
    // 监听数据变化
    watch: {
        mainOrderType: {
            handler: function (nowVal, oldVal) {
                if (nowVal) {
                    var btnTitle = '';

                    switch (Number(nowVal)) {
                        case 1:
                            btnTitle = '物流发货';
                            break;

                        case 2:
                            btnTitle = '同城配送';
                            break;

                        case 3:
                            btnTitle = '门店团购';
                            break;
                    }

                    this.setData(
                        {
                            orderTemplate: nowVal,
                            btnTitle
                        },
                        () => {
                            this.getClassifyNavList(); // 获取门店优惠券用于显示有券领取的icon

                            app.globalData
                                .sjrequest('/coupons/queryCouponsGet', {
                                    marchantId: uni.getStorageSync('merchantId')
                                })
                                .then((res) => {
                                    if (res.data.code == 200) {
                                        this.setData({
                                            commodityCouponsList: res.data.data
                                        });
                                    }
                                });
                        }
                    );
                }
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goSaleShop(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: url
            });
        },

        //获得活动列表
        getActiveList() {
            const data = {
                marchantId: this.marchantId,
                sourceType: 'applet'
            };
            app.globalData.sjrequest('/activity/queryActivityList', data).then((res) => {
                console.log('活动列表：====', res);
            });
        },

        addCart() {
            console.log(this.nowSku, 'DefaultSpec');

            if (this.nowSku.stock == 0) {
                uni.showToast({
                    title: '暂无库存',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    showSpec: false
                });
                return;
            }

            var data = {
                tempSpecId: this.nowSku.id,
                commodityId: this.nowSku.commodityId,
                amount: this.buyCount,
                // 购买数量
                marchantId: this.marchantId,
                operate: 1
            };
            app.globalData.sjrequest('/commodity/addTrolley', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success'
                    });
                    let ids = uni.getStorageSync('merchantId');
                    app.globalData
                        .sjrequest('/commodity/countTrolley', {
                            marchantId: ids
                        })
                        .then((res) => {
                            this.setData({
                                showSpec: false,
                                buyCount: 1
                            });
                        });
                }
            });
        },

        // 立即购买
        buyNow() {
            var nowSku = this.nowSku;
            var orderTemplate = this.orderTemplate;
            var marchantId = this.marchantId;
            var buyCount = this.buyCount; // 选中的数量

            console.log(nowSku, orderTemplate, buyCount);

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

        querySkuList(goodsItem) {
            //查询规格列表
            var { marchantId } = this;
            app.globalData
                .sjrequest('/commodity/queryCommoSku', {
                    marchantId,
                    commodityId: goodsItem.commodityId
                })
                .then((res) => {
                    console.log(res, '规格');

                    if (res.statusCode == 200 && res.data.code == 200) {
                        var list = res.data.data || [];
                        var nowSku = list[0] || {};
                        this.setData({
                            skuList: list,
                            nowSku
                        });
                    }

                    this.setData({
                        showBuyPopup: true,
                        goodsItem
                    });
                });
        },

        replaceSku(e) {
            //切换规格
            var item = e.currentTarget.dataset.item;
            this.setData({
                nowSku: item
            });
        },

        openBuyPopup(e) {
            //打开购买弹窗
            var goodsItem = e.currentTarget.dataset.goodinfo;
            console.log(goodsItem, '打开购买弹窗');
            this.querySkuList(goodsItem);
        },

        closeBuyPopup() {
            //关闭购买弹窗
            this.setData({
                showBuyPopup: false
            });
        },

        toGoodsDetails(e) {
            var id = e.currentTarget.dataset.id; // 商品ID

            var mainOrderType = this.mainOrderType; // 商家经营模式

            var url = '/pages/Index/GoodsDetails/GoodsDetails?id=' + id;

            if (mainOrderType == 2 || mainOrderType == 3) {
                if (mainOrderType == 2) {
                    url += `&city=1`;
                } //同城

                if (mainOrderType == 3) {
                    url += `&reserve=1`;
                } //预订
            }

            uni.navigateTo({
                url
            });
        },

        getClassifyNavList() {
            //获取分类列表
            var { marchantId } = this;
            app.globalData
                .sjrequest('/commodity/queryClassify', {
                    marchantId,
                    orderTemplate: this.orderTemplate
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code == 200) {
                        var list = res.data.data || [];
                        var classItem = list[0] || {};
                        var goodsData = this.goodsData;
                        list.forEach((item) => {
                            goodsData['listInfo' + item.id] = {
                                stopReq: false,
                                pageNum: 1,
                                list: []
                            };
                        });
                        this.setData(
                            {
                                navList: list,
                                classItem
                            },
                            () => {
                                this.getProductList();
                            }
                        );
                        console.log('分类列表', this.navList);
                    }
                });
        },

        switchGoods(e) {
					let index = e
				
					
            let goodsList = this.goodsList[index];
            this.setData({
                switchGoodsList: goodsList,
                currentLeft: e
            });
            console.log(this.switchGoodsList, '切换的商品');
        },

        //选择项目左侧点击事件 currentLeft：控制左侧选中样式  selectId：设置右侧应显示在顶部的id
        proItemTap(e) {
            this.setData({
                currentLeft: e.currentTarget.dataset.pos,
                selectId: 'item' + e.currentTarget.dataset.pos
            });
        },

        // 计算右侧每一个分类的高度，在数据请求成功后请求即可
        selectHeight() {
            let heightArr = [];
            let h = 0;
            const query = this.createSelectorQuery();
            query
                .in(this)
                .selectAll('.rig-height')
                .boundingClientRect((res) => {});
            query.exec((res) => {
                res[0].forEach((item) => {
                    h += item.height;
                    heightArr.push(h);
                    this.setData({
                        heightArr
                    });
                });
            });
        },

        //监听scroll-view的滚动事件
        scrollEvent(event) {
            if (this.heightArr.length == 0) {
                return;
            }

            let scrollTop = event.detail.scrollTop;
            let current = this.currentLeft; //当前选中下标

            if (scrollTop >= this.distance) {
                //页面向上滑动
                //如果右侧当前可视区域最底部到顶部的距离 超过 当前列表选中项距顶部的高度（且没有下标越界），则更新左侧选中项
                if (current + 1 < this.heightArr.length && scrollTop >= this.heightArr[current]) {
                    this.setData({
                        currentLeft: current + 1
                    });
                }
            } else {
                //页面向下滑动
                //如果右侧当前可视区域最顶部到顶部的距离 小于 当前列表选中的项距顶部的高度，则更新左侧选中项
                if (current - 1 >= 0 && scrollTop < this.heightArr[current - 1]) {
                    this.setData({
                        currentLeft: current - 1
                    });
                }
            } //更新到顶部的距离

            this.setData({
                distance: scrollTop
            });
        },

        async getProductList() {
            //查询 预订与同城 商品 , 右边查出所有商品，查出的商品排序和左边的tab栏顺序保持一致
            var { marchantId, mainOrderType } = this;
            var pageSize = this.pageSize;
            var classifyId = this.classItem.id;
            let classifyIdArr = this.navList; // 每个商品分类ID都发一次请求，然后合并到一个数组

            let goodsList = []; // 存所有商品信息

            for (let item of classifyIdArr) {
                try {
                    let res = await app.globalData.sjrequest('/commodity/queryCommodityList', {
                        marchantId,
                        classifyId: item.id,
                        // 每个商品分类ID
                        pageSize // 一次返回多少条数据
                    });

                    if (res.statusCode == 200 && res.data.code == 200) {
                        let list = res.data.data || [];
                        this.handlerOrderTemplate(list); // 处理orderTemplate 字段

                        goodsList.push(list);
                    } else {
                        throw '状态码错误';
                    }

                    this.setData({
                        goodsList
                    });
										this.switchGoods(0)
                } catch (error) {
                    console.log(error);
                }
            }

            console.log(goodsList, 'goodsList');
            uni.nextTick(() => {
                this.selectHeight();
                this.setData({
                    switchGoodsList: this.goodsList[0]
                });
            });
        },

        handlerOrderTemplate(list) {
            // 处理orderTemplate数据
            for (let item of list) {
                item.orderTemplate = item.orderTemplate.split(',');

                for (let key in item.orderTemplate) {
                    if (item.orderTemplate[key] == '1') {
                        item.orderTemplate[key] = '物流';
                    }

                    if (item.orderTemplate[key] == '2') {
                        item.orderTemplate[key] = '同城';
                    }

                    if (item.orderTemplate[key] == '3') {
                        item.orderTemplate[key] = '自提';
                    }
                }
            }

            return list;
        } // 添加购物车
    }
};
</script>
<style>
.category-container {
    background-color: rgb(255, 255, 255);
}

.top-view {
    background: linear-gradient(to bottom, #f7d45f, #f7d562, #f8d561, #f9db76, #f9de80);
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}

.top-view image {
    display: block;
    width: 35rpx;
    height: 35rpx;
}

.top-view-flex {
    display: flex;
    align-items: center;
}

.top-search {
    padding-right: 50rpx;
}

/* 点餐界面 */
.order-view {
    margin-top: 120rpx;
}

.commodity {
    display: flex;
    position: fixed;
    top: 169rpx;
    left: 0;
    right: 0;
}

.order-left {
    background-color: #fafafa;
    width: 200rpx;
    overflow-y: auto;
}

.itemize-text {
    width: 200rpx;
    height: 110rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #333;
    position: relative;
}

/* .itemize-text::before {
	content: '';
	width: 20rpx;
	height: 20rpx;
	background-color: #007AFF;
	position: absolute;
	top: 0;
	right: 0;
} */
.rig-height {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.itemize-text text {
    width: 190rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

/* .itemize-text text:nth-child(2) {
	background-color: #eb5941;
	border-radius: 50%;
	font-size: 20rpx;
	color: #FFFFFF;
	width: 30rpx;
	height: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 2rpx;
} */

.scroll-Hei {
    height: 100vh;
    /* white-space: nowrap; */
}

.order-right {
    background-color: #ffffff;
    flex: 1;
    overflow-y: auto;
    padding-left: 15rpx;
}

.right-scroll {
    margin-top: 20rpx;
    position: relative;
}

.classif {
    font-size: 27rpx;
    padding: 30rpx 20rpx;
    color: #797979;
}

.support {
    height: 40rpx;
    font-size: 20rpx;
    text-align: center;
    color: rgb(0, 0, 0);
    font-weight: bold;
}

/* 分类商品 */
.classif-goods {
    display: flex;
    justify-content: space-between;
    height: 235rpx;
    width: 540rpx;
    font-size: 30rpx;
    margin-bottom: 20rpx;
    border-bottom: 2rpx solid #e8e8e8;
}

.goods-image image {
    background-color: rgb(255, 218, 218);
    display: block;
    width: 210rpx;
    height: 210rpx;
    border-radius: 15rpx;
}

.goods-Price {
    flex: 1;
    width: 295rpx;
    position: relative;
    padding: 0 0 0 20rpx;
}

.goods-Price text {
    display: block;
}

.goods-Price .goods-info {
    width: inherit;
    height: 160rpx;
    overflow: hidden;
}

.goods-Price .popup {
    width: 148rpx;
    height: 48rpx;
    position: absolute;
    right: 30rpx;
    bottom: 24rpx;
}

.goods-info .goods-name {
    display: flex;
    flex-direction: column;
}

.goods-info .goods-name .Bold {
    font-size: 22rpx;
    font-weight: 350;
    color: rgb(34, 34, 34);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.goods-info .goods-name text:nth-child(1) {
    padding-bottom: 9rpx;
}

.tag {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.tag > image {
    width: 166rpx;
    height: 36rpx;
    margin-bottom: 10rpx;
    margin-right: 10rpx;
    opacity: 0.8;
}

.tag text {
    height: 38rpx;
    color: #ff9184;
    background-color: #eeeeee;
    border-radius: 8rpx;
    padding: 1px 11rpx 0 11rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    text-align: center;
    font-size: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.goods-info .tag text:nth-of-type(1) {
    width: 100rpx;
    height: 38rpx;
    background-color: #eeeeee;
    border-radius: 8rpx;
    padding: 1px 11rpx 0 11rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    font-size: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.unit-price {
    position: absolute;
    bottom: 20rpx;
    display: flex;
    align-items: baseline;
}

.unit-price .Bold {
    font-weight: 600;
    font-size: 36rpx;
    margin-left: 5rpx;
    color: #fa6b2b;
}

.Symbol {
    font-size: 22rpx;
    color: #fa6b2b;
}

.Thinning {
    font-size: 25rpx;
    color: #cccccc;
}

.quantity image {
    width: 50rpx;
    height: 50rpx;
}

.quantity view {
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    line-height: 50rpx;
}

.quantity {
    display: flex;
    align-items: center;
    align-self: flex-end;
    width: 200rpx;
    justify-content: space-between;
}

.order-bottom {
    background-color: #fefefe;
    height: 120rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    z-index: 9;
}

.Shopping image {
    width: 75rpx;
    height: 75rpx;
    display: block;
}

.Shopping-left {
    width: 75rpx;
    height: 75rpx;
}

.Shopping {
    display: flex;
    align-items: center;
    /* height: 120rpx; */
}

.Shopping-number {
    align-self: flex-start;
    background: #eb5941;
    color: #ffff;
    width: 40rpx;
    border-radius: 50rpx;
    text-align: center;
    font-size: 20rpx;
    /* margin-top: 15rpx; */
}

.Shopping-title {
    flex: 1;
    padding: 0 25rpx;
    color: #999999;
    /* height: 120rpx;
line-height: 120rpx; */
}

.place-order button {
    border: none;
    background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
    width: 200rpx;
    height: 75rpx;
    line-height: 75rpx;
    border-radius: 50rpx;
    font-weight: bold;
    z-index: 9;
}

/* 点击分类列表加上背景色 */
.active {
    background-color: #ffffff;
    color: #ff4833 !important;
    font-weight: bolder;
}

.active::before {
    content: '';
    position: absolute;
    left: 0;
    display: inline-block;
    height: 46rpx;
    width: 6rpx;
    background-color: #ff4833;
}

/* 购买弹窗样式 */

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
    display: flex;
}

.buy-popup-box .popup-content .product-info .me-fx-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    display: flex;
    flex-direction: column;
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
    display: flex;
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
    padding: 30rpx 102rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
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
    width: 510rpx;
}

.buy-popup-box .popup-content .btns-box .btn-now {
    background: linear-gradient(90deg, rgba(255, 37, 37, 1) 0%, rgba(255, 66, 29, 1) 55%, rgba(255, 124, 0, 1) 100%);
    border-radius: 46rpx;
}

.buy-popup-box .popup-content .btns-box .buyNow {
    background: linear-gradient(90deg, rgba(255, 37, 37, 1) 0%, rgba(255, 66, 29, 1) 55%, rgba(255, 124, 0, 1) 100%);
    border-radius: 0 46rpx 46rpx 0;
}

.buy-popup-box .popup-content .btns-box .addCart {
    background: linear-gradient(90deg, rgba(255, 164, 58, 1) 0%, rgba(255, 122, 50, 1) 50%, rgba(255, 111, 0, 1) 100%);
    border-radius: 46rpx 0 0 46rpx;
}

.buy-popup-box .popup-content .count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 660rpx;
    margin-left: 40rpx;
    margin-top: 20rpx;
}

/* 购买弹窗样式 */

/* 搜索样式 */

.search-container {
    height: 135rpx;
    margin: 0 30rpx;
}

.search-container .relative {
    top: 30rpx;
    position: relative;
    width: 100%;
}

.search-container .relative image {
    position: absolute;
    z-index: 10;
    top: 25rpx;
    left: 23rpx;
    width: 28rpx;
    height: 28rpx;
}

.search-container .relative .search-input {
    width: calc(100% - 60rpx);
    height: 75rpx;
    border-radius: 20px;
    background-color: rgb(241, 241, 241);
    position: absolute;
    padding-left: 60rpx;
    color: #ababab;
    font-size: 32rpx;
    font-weight: 300;
}

.search-container .relative text {
    position: absolute;
    right: 30rpx;
    top: 15rpx;
    color: #f7724a;
    font-size: 32rpx;
}

.search-container .relative text::before {
    content: '';
    display: inline-block;
    background-color: #f79a7e;
    width: 1px;
    top: 5rpx;
    height: 33rpx;
    position: absolute;
    right: 80rpx;
}

/* 5.31 */
.activity {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 30rpx;
}
.activity_list {
    flex-wrap: wrap;
}
.good-express {
    position: absolute;
    top: 18rpx;
    z-index: 10;
    color: #fff;
    left: 45rpx;
    font-size: 30rpx;
}
.good-express::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 8rpx;
    left: 155rpx;
    width: 2rpx;
    height: 36rpx;
    background-color: rgb(224, 40, 40);
}
.activitys_Info {
    height: 85rpx;
    border-radius: 20rpx;
    box-shadow: 0px 0px 14px 0px rgba(177, 177, 177, 0.295);
    width: 100%;
    color: rgb(90, 90, 90);
}
.right-arrow {
    width: 15rpx;
    height: 26rpx;
    position: absolute;
    left: 631rpx;
    top: 30rpx;
}
.temp-bg1 {
    background-color: #f69761;
}

.temp-bg2 {
    background-color: #fff7e4;
    color: #333;
}

.temp-bg4 {
    background-color: #5db6fa;
}

.temp-bg3 {
    background-color: #ffffff;
}

.Info_msg {
    padding: 20rpx 0rpx 20rpx 25rpx;
    position: relative;
}

.Info_msg_img {
    width: 154rpx;
    height: 48rpx;
}

.shop_msg_info {
    padding-left: 40rpx;
}

.shop_msg {
    font-size: 20rpx;
}

.new_msg {
    font-size: 34rpx;
    margin-top: 4rpx;
}

.new_desc {
    font-size: 20rpx;
}

.activitys_Info_btn {
    background-color: #fff;
    font-size: 20rpx;
    padding: 14rpx 30rpx;
    margin-right: 15rpx;
    border-radius: 6rpx;
}

.temp-bg1 .activitys_Info_btn {
    color: #f69761;
}

.temp-bg4 .activitys_Info_btn {
    color: #5db6fa;
}

.temp-bg3 .activitys_Info_btn {
    color: #212121;
}
.alerts-Img {
    height: 120rpx;
    width: 600rpx;
    margin: 0 auto;
}
</style>
