<template>
    <view>
        <!-- pages/tabPage/home/home.wxml -->
        <view class="home-page-container">
            <view class="header-container-box">
                <view>
                    <!-- 状态栏标题栏 暂位空元素 -->
                    <!-- <view style='height:{{statusBarHeight+menuButtonHeight}}px'></view> -->

                    <!-- 头部 -->
                    <view class="home-top-container">
                        <view :style="'height:' + statusBarHeight + 'px'"></view>
                        <view class="me-fx-row me-fx-start-c title-bar" :style="'height:' + menuButtonHeight + 'px'">
                            <navigator url="/pages/tabPage/me/me" hover-class="none">
                                <image class="me-img" src="/static/pages/img/home_me.png"></image>
                            </navigator>
                            <view class="readme-img-container">
                                <image class="readme-img" src="/static/pages/img/readme.png"></image>
                                <text class="count-text">已有{{ marchantCount }}家店铺入驻</text>
                            </view>
                        </view>
                    </view>

                    <view class="search-container">
                        <navigator class="search-container-box" hover-class="none" :style="'height:' + menuHeight + 'px'" url="/pages/Index/searchShop/searchShop">
                            <van-icon name="search" color="#999" size="35rpx" style="position: absolute; left: 24px; top: 50%; transform: translateY(-50%)" />
                            <text class="search-text">请输入商家名称</text>
                        </navigator>
                    </view>

                    <!-- 轮播图 -->
                    <view class="banner-container">
                        <swiper
                            :circular="true"
                            :indicator-dots="false"
                            :autoplay="true"
                            :interval="3000"
                            :duration="500"
                            indicator-color="#999"
                            indicator-active-color="#000"
                            style="height: 304rpx"
                        >
                            <block v-for="(item, index) in bannerList" :key="index">
                                <swiper-item class="swiper-item-box">
                                    <navigator hover-class="none" :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&form=home'">
                                        <view class="swiper-img-box">
                                            <image class="swiper-img" mode="aspectFill" :src="item.thumbnail || item.imageUrl"></image>
                                            <view class="description-text" v-if="item.description">
                                                {{ item.description }}
                                            </view>
                                        </view>
                                    </navigator>
                                </swiper-item>
                            </block>
                        </swiper>
                    </view>
                </view>
            </view>

            <!-- 限时抢购 农特产品 -->
            <view class="rob-farmers-product" v-if="recommendPaging.robList.length || recommendPaging.farmersList.length">
                <view class="rob-box" v-if="recommendPaging.robList.length">
                    <view class="me-fx-row me-fx-start-c">
                        <image class="title-img" src="/static/pages/img/index/xianshi.png"></image>
                        <text class="subtitle-text">精品超值抢购</text>
                    </view>
                    <text class="label-text">平台推荐</text>
                    <scroll-view :scroll-x="true" class="product-list-box" @scrolltolower="CommendScrolltolower" data-type="1">
                        <view class="me-fx-row">
                            <navigator
                                class="product-item-box"
                                hover-class="none"
                                :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&form=home'"
                                v-for="(item, index) in recommendPaging.robList"
                                :key="index"
                            >
                                <image class="product-img" :src="item.thumbnail"></image>

                                <view class="price">
                                    <text>￥</text>
                                    <text class="int-num">{{ item.intPrice }}</text>
                                    <text v-if="item.floatPrice">.{{ item.floatPrice }}</text>
                                </view>
                            </navigator>
                        </view>
                    </scroll-view>
                </view>
                <view v-if="recommendPaging.robList.length" class="line-empty-box"></view>
                <view class="farmers-box" v-if="recommendPaging.farmersList.length">
                    <view class="me-fx-row me-fx-start-c">
                        <image class="title-img" src="/static/pages/img/index/nong.png"></image>
                        <text class="subtitle-text">三农产品放心购</text>
                    </view>
                    <text class="label-text">平台推荐</text>
                    <scroll-view :scroll-x="true" class="product-list-box" @scrolltolower="CommendScrolltolower" data-type="2">
                        <view class="me-fx-row">
                            <navigator
                                class="product-item-box"
                                hover-class="none"
                                :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&form=home'"
                                v-for="(item, index) in recommendPaging.farmersList"
                                :key="index"
                            >
                                <image class="product-img" :src="item.thumbnail"></image>

                                <view class="price">
                                    <text>￥</text>
                                    <text class="int-num">{{ item.intPrice }}</text>
                                    <text v-if="item.floatPrice">.{{ item.floatPrice }}</text>
                                </view>
                            </navigator>
                        </view>
                    </scroll-view>
                </view>
            </view>

            <!-- 推广店铺 -->
            <view class="promote-shop-box">
                <view class="shadow-box focus-store-item" v-for="(item, index) in marchantList" :key="index">
                    <view class="me-fx-row me-fx-sb-c item-top">
                        <view class="me-fx-row me-fx-start-c">
                            <image src="/static/pages/img/my/badge_img.png" class="badge-img"></image>
                            <text class="access-num">最近访问{{ item.accessNumber }}人数</text>
                        </view>
                        <text v-if="item.isHome" class="buy-have-label">购买过</text>
                    </view>

                    <navigator hover-class="none" class="me-fx-row store-info" :url="'/pages/shopHome/home/home?marchantId=' + item.id">
                        <image :src="item.logoPic" class="store-img"></image>
                        <view class="me-fx-1 me-fx-col me-fx-sb right-content">
                            <view class="me-fx-row me-fx-sb-x">
                                <text class="store-name">{{ item.nickName }}</text>
                                <text class="entrance-btn">进店</text>
                            </view>
                            <view class="label-container">
                                <text class="label-item" v-for="(labelVal, labeli) in item.labelsList" :key="labelVal.labeli">{{ labelVal }}</text>
                            </view>
                            <view class="business-time" v-if="item.openingTime && item.closingTime">营业时间:{{ item.openingTime }}-{{ item.closingTime }}</view>
                        </view>
                    </navigator>

                    <view class="me-fx-row">
                        <scroll-view :scroll-x="true" :style="'width:' + (item.commodity ? '435rpx' : 'auto') + ';'" @scrolltolower="scrolltolower" :data-index="index">
                            <view class="me-fx-row product-list">
                                <navigator
                                    hover-class="none"
                                    class="product-item"
                                    :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + promotionTemp.id + '&form=home'"
                                    v-for="(promotionTemp, promotioni) in item.promotionList"
                                    :key="promotionTemp.promotioni"
                                >
                                    <image :src="promotionTemp.thumbnail" class="product-img"></image>

                                    <view class="me-fx-col">
                                        <text class="product-name">{{ promotionTemp.commodityName }}</text>
                                        <text class="product-price">￥{{ promotionTemp.lowPrice }}</text>
                                    </view>
                                </navigator>
                            </view>
                        </scroll-view>

                        <navigator v-if="item.commodity" hover-class="none" class="hot-video" :url="'/pages/shopHome/home/home?marchantId=' + item.id + '&nowTabbarText=' + 1">
                            <view class="video-poster-box">
                                <image :src="item.commodity.coverUrl" class="video-poster"></image>
                                <image src="/static/pages/img/home_play.png" class="play-img"></image>
                            </view>
                            <view class="me-fx-row me-fx-start-c">
                                <text>正在热卖中</text>
                                <image class="home-live-gif" src="/static/pages/img/home_live.gif"></image>
                            </view>
                        </navigator>
                    </view>
                </view>
            </view>

            <!-- 分类商品列表 -->
            <view class="collect-container">
                <view
                    v-if="classProductList.length"
                    :style="'top:' + (statusBarHeight + menuButtonHeight) + 'px'"
                    :class="'product-class-tab-box ' + (fixedContainer ? 'fixed-utils' : '')"
                >
                    <scroll-view :scroll-x="true">
                        <view class="me-fx-row tab-class-list">
                            <view
                                :class="'me-fx-col me-fx-start-c class-item ' + (currentClassId == item.id ? 'sel-class-item' : '')"
                                @tap="swetchTabClass"
                                :data-classid="item.id"
                                v-for="(item, index) in marchantTypeList"
                                :key="index"
                            >
                                <view class="item-text-box">
                                    <text>{{ item.businessName }}</text>
                                    <view v-if="currentClassId == item.id">
                                        <text class="circle-1"></text>
                                        <text class="circle-2"></text>
                                        <text class="circle-3"></text>
                                    </view>
                                </view>

                                <view :class="'small-text ' + (currentClassId == item.id ? 'sel-small-text' : '')">{{ item.subtitle }}</view>

                                <view :class="'unline-box ' + (currentClassId == item.id ? 'sel-unline-box' : '')"></view>
                            </view>
                        </view>
                    </scroll-view>
                </view>

                <view class="collect-product-list">
                    <view :class="'left-list-box ' + (fixedUtils ? 'fixed-utils' : '')">
                        <navigator
                            class="collect-product-item"
                            hover-class="none"
                            v-if="index % 2 == 0"
                            :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&form=home'"
                            v-for="(item, index) in classProductList"
                            :key="index"
                        >
                            <image class="product-img" :src="item.thumbnail"></image>

                            <view style="padding: 6px; box-sizing: border-box">
                                <view class="product-title">{{ item.commodityName }}</view>
                                <view class="product-price-box">
                                    <view class="price">
                                        <image v-if="item.activityType == 2" class="promotion-label" src="/static/pages/img/my/promotion_label.png"></image>
                                        <text>￥</text>
                                        <text style="font-size: 32rpx">{{ item.LowPrice || item.originalPrice }}</text>
                                    </view>
                                    <text style="background-color: #f7f7f7">{{ item.nickName }}</text>
                                </view>
                            </view>
                        </navigator>
                    </view>

                    <view class="right-list-box">
                        <navigator
                            class="collect-product-item"
                            hover-class="none"
                            v-if="index % 2 != 0"
                            :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&form=home'"
                            v-for="(item, index) in classProductList"
                            :key="index"
                        >
                            <image class="product-img" :src="item.thumbnail" mode="aspectFill"></image>

                            <view style="padding: 6px; box-sizing: border-box">
                                <view class="product-title">{{ item.commodityName }}</view>
                                <view class="product-price-box">
                                    <view class="price">
                                        <image v-if="item.activityType == 2" class="promotion-label" src="/static/pages/img/my/promotion_label.png"></image>
                                        <text>￥</text>
                                        <text style="font-size: 32rpx">{{ item.LowPrice || item.originalPrice }}</text>
                                    </view>
                                    <text style="background-color: #f7f7f7">{{ item.nickName }}</text>
                                </view>
                            </view>
                        </navigator>
                    </view>
                </view>
            </view>

            <view class="me-fx-col me-fx-c-c empty-bg-box" v-if="commentList.length == 0 && promotionList.length == 0 && auctionList.length == 0 && likeList.length == 0">
                <image class="empty-bg-img" src="https://xssj.letterbook.cn/applet/images/home_empty_bg.png"></image>
                <view class="one-text">你还未关注任何商家</view>
                <view class="two-text">快去关注你喜欢的商家吧！</view>
            </view>
        </view>

        <navigator hover-class="none" v-if="buton" url="/pages/shopHome/home/home" class="butt">授权登录</navigator>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// import vanIcon from './@vant/weapp/icon/index';
// pages/tabPage/home/home.js
const app = getApp();

const time = require('../../../utils/util');

export default {
    components: {
        noData,
        // vanIcon
    },
    data() {
        return {
            statusBarHeight: app.globalData.getSystemInfo.statusBarHeight || 20,

            // 状态栏高度
            menuButtonHeight: app.globalData.MenuButton.height + (app.globalData.MenuButton.top - app.globalData.getSystemInfo.statusBarHeight) * 2,

            // 导航栏高度
            statusAllHeight:
                app.globalData.getSystemInfo.statusBarHeight +
                app.globalData.MenuButton.height +
                (app.globalData.MenuButton.top - app.globalData.getSystemInfo.statusBarHeight) * 2,

            menuHeight: app.globalData.MenuButton.height,

            // 胶囊高度
            //banner图数据
            bannerList: ['a', 'b', 'c'],

            //关注店铺
            followsList: [],

            currentShopIndex: 0,

            //当前展示店铺下标
            marchantList: [],

            //关注店列表
            classProductList: [],

            // 分类商品列表
            promotionIndex: 0,

            commentIndex: 0,
            auctionIndex: 0,
            pageCurr: 1,
            stopLoad: false,
            buton: false,
            firstIn: true,

            //是否第一次进入状态
            offsetTop: 0,

            //滚动吸顶容器距离顶部的距离
            fixedContainer: false,

            //是否固定工具栏位置
            marchantTypeList: [],

            currentClassId: 0,

            //推荐商品分页参数
            recommendPaging: {
                robPageCurr: 1,
                stopRobReq: false,
                farmersPageCurr: 1,
                stopFarmersReq: false,
                robList: [],
                farmersList: []
            },

            //已入住商家数量
            marchantCount: 7000,

            labelVal: {
                labeli: ''
            },

            promotionTemp: {
                id: '',
                promotioni: '',
                thumbnail: '',
                commodityName: '',
                lowPrice: ''
            },

            fixedUtils: false,
            commentList: [],
            promotionList: [],
            auctionList: [],
            likeList: []
        };
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onLoad: function () {
        this.getRobRecommended(); //获取 限时抢购 推荐商品列表

        this.getFarmersRecommended(); //获取 农特产品 推荐商品列表

        uni.getStorage({
            key: 'marchant_number_key',
            success: (res) => {
                this.setData({
                    marchantCount: res.data
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var recommendPaging = this.recommendPaging;
        recommendPaging.farmersPageCurr = 1;
        recommendPaging.robPageCurr = 1;
        recommendPaging.stopRobReq = false;
        recommendPaging.stopFarmersReq = false;
        this.setData({
            recommendPaging,
            pageCurr: 1,
            stopLoad: false,
            currentShopIndex: 0,
            marchantTypeList: [
                {
                    businessName: '精选',
                    id: 0,
                    productList: [],
                    subtitle: '我的收藏',
                    paging: {
                        pageCurr: 1,
                        pageSize: 10,
                        isReq: true
                    }
                }
            ]
        });
        var that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    if (uni.getStorageSync('token')) {
                        that.setData({
                            buton: false
                        });
                    } else {
                        that.setData({
                            buton: true
                        });
                    }

                    that.isAuth = true; //用户已授权

                    that.getStoreData();
                    that.getLikeList();
                } else {
                    if (that.firstIn) {
                        that.setData({
                            firstIn: false
                        });
                        uni.navigateTo({
                            url: '/pages/shopHome/home/home'
                        });
                    }

                    that.setData({
                        buton: true
                    }); //用户没有授权
                }

                that.getBannerList();
            }
        });
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 上拉底部抵触事件
     */
    onReachBottom() {
        var marchantTypeList = this.marchantTypeList;
        var currentTypeId = this.currentClassId;
        var currentItem = marchantTypeList.find((item, index) => item.id == currentTypeId);

        if (currentItem.paging.isReq) {
            currentItem.paging.pageCurr++;

            if (currentTypeId == 0) {
                this.getLikeList();
            } else {
                this.getClassProductList(currentItem.id);
            }
        }
    },
    //监听页面滚动
    onPageScroll(e) {
        var scrollTop = e.scrollTop;
        var offsetTop = this.offsetTop;

        if (scrollTop > offsetTop && offsetTop != 0) {
            this.fixedContainer ||
                this.setData({
                    fixedContainer: true
                });
        } else {
            if (this.fixedContainer) {
                this.setData({
                    fixedContainer: false
                });
            }
        }
    },
    methods: {
        //  获取轮播图
        getBannerList() {
            // app.sjrequest('/basic/queryBannerList',{}).then(res=>{
            //   this.setData({bannerList:res.data.data})
            // })
            var params = {
                pageCurr: 1,
                pageSize: 10,
                commodityType: 3
            };
            app.globalData.sjrequest('/commodity/queryRecommendCommodityList', params).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    this.setData({
                        bannerList: res.data.data
                    });
                }
            });
        },

        //获取 限时抢购 推荐商品列表
        getRobRecommended() {
            var recommendPaging = this.recommendPaging;
            var params = {
                pageCurr: recommendPaging.robPageCurr,
                pageSize: 10,
                commodityType: 1
            };
            app.globalData.sjrequest('/commodity/queryRecommendCommodityList', params).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var rows = res.data.data;
                    rows.forEach((item) => {
                        var lowPrice = item.lowPrice + '';
                        var priceArr = lowPrice.split('.');
                        item.intPrice = priceArr[0];
                        item.floatPrice = priceArr[1];
                    });
                    recommendPaging.robList.push(...rows);
                    recommendPaging.stopRobReq = rows.length !== 10;
                    this.setData({
                        recommendPaging
                    });
                }
            });
        },

        //获取 农特产品 推荐商品列表
        getFarmersRecommended() {
            var recommendPaging = this.recommendPaging;
            var params = {
                pageCurr: recommendPaging.farmersPageCurr,
                pageSize: 10,
                commodityType: 2
            };
            app.globalData.sjrequest('/commodity/queryRecommendCommodityList', params).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var rows = res.data.data;
                    rows.forEach((item) => {
                        var lowPrice = item.lowPrice + '';
                        var priceArr = lowPrice.split('.');
                        item.intPrice = priceArr[0];
                        item.floatPrice = priceArr[1];
                    });
                    recommendPaging.farmersList.push(...rows);
                    recommendPaging.stopFarmersReq = rows.length !== 10;
                    this.setData({
                        recommendPaging
                    });
                }
            });
        },

        //推荐商品分页
        CommendScrolltolower(e) {
            var recommendPaging = this.recommendPaging;
            var type = e.currentTarget.dataset.type;

            if (type == 1 && !recommendPaging.stopRobReq) {
                recommendPaging.robPageCurr++;
                this.setData(
                    {
                        recommendPaging
                    },
                    () => {
                        this.getRobRecommended();
                    }
                );
            } else if (type == 2 && !recommendPaging.stopFarmersReq) {
                recommendPaging.farmersPageCurr++;
                this.setData(
                    {
                        recommendPaging
                    },
                    () => {
                        this.getFarmersRecommended();
                    }
                );
            }
        },

        // 获取关注
        getFollows() {
            let data = {
                pageCurr: 1,
                pageSize: 4
            };
            app.globalData.sjrequest('/marchant/queryConcerns', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.orderType = item.businessModel.split(',').sort()[0];
                    });
                    this.setData({
                        followsList: res.data.data.slice(0, 4)
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 查询关注的商家列表 与关注商家的分类列表
        getStoreData() {
            app.globalData.sjrequest('/marchant/queryConcernsData').then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var marchantList = res.data.data.marchantList || [];
                    var marchantTypeList = res.data.data.marchantTypeList || [];
                    marchantTypeList = this.marchantTypeList.concat(marchantTypeList);
                    marchantList.forEach((item) => {
                        item.paging = {
                            pageCurr: 1,
                            pageSize: 10,
                            isReq: item.promotionList.length == 10
                        };
                    });
                    marchantTypeList.forEach((item) => {
                        item.productList = [];
                        item.subtitle = this._getSubtitle(item.businessName);
                        item.paging = {
                            pageCurr: 1,
                            pageSize: 10,
                            isReq: item.productList.length == 10
                        };
                    });
                    this.setData(
                        {
                            marchantList,
                            marchantTypeList
                        },
                        () => {
                            this.getNodeInfo();
                        }
                    );
                }
            });
        },

        _getSubtitle(businessName) {
            switch (businessName) {
                case '精选':
                    return '我的收藏';

                case '美妆护肤':
                    return '精致女生';

                case '服饰鞋包':
                    return '时尚生活';

                case '母婴用品':
                    return '妈妈的爱';

                case '酒水食品':
                    return '放心购';

                case '茶叶特产':
                    return '好物宜身';

                case '家纺绿植':
                    return '温暖的家';

                default:
                    return '';
            }
        },

        //获取分页列表
        getStoreProductList(id, paging, index) {
            var marchantList = this.marchantList;
            var storeItem = marchantList[index];
            var data = {
                marchantId: id,
                pageCurr: paging.pageCurr,
                pageSize: paging.pageSize
            };
            app.globalData.sjrequest('/commodity/queryAllCommodityList', data).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var list = res.data.data;
                    paging.isReq = list.length == paging.pageSize;
                    storeItem.promotionList.push(...list);
                    this.setData({
                        marchantList
                    });
                }
            });
        },

        //scroll-view 分页
        scrolltolower(event) {
            var i = event.target.dataset.index;
            var storeItem = this.marchantList[i];
            var { id, paging } = storeItem;

            if (paging.isReq) {
                paging.pageCurr++;
                this.getStoreProductList(id, paging, i);
            }
        },

        // 查询收藏列表
        getLikeList() {
            var marchantTypeList = this.marchantTypeList;
            var currentTypeId = this.currentClassId;
            var currentTypeItem = marchantTypeList.find((item) => item.id == currentTypeId) || {};
            var { paging } = currentTypeItem;
            var postData = {
                pageCurr: paging.pageCurr,
                pageSize: paging.pageSize
            };
            app.globalData.sjrequest('/commodity/queryCommodityLikeList', postData).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var stopLoad = data.length < 10;
                    currentTypeItem.paging.isReq = data.length == currentTypeItem.paging.pageSize;

                    if (currentTypeItem.paging.pageCurr == 1) {
                        currentTypeItem.productList = data;
                    } else {
                        currentTypeItem.productList.push(...data);
                    }

                    var classProductList = currentTypeItem.productList;
                    this.setData({
                        stopLoad,
                        classProductList
                    });
                }
            });
        },

        //切换分类导航
        swetchTabClass(e) {
            var classid = e.currentTarget.dataset.classid;
            var marchantTypeList = this.marchantTypeList;
            var currentTypeItem = marchantTypeList.find((item) => item.id == classid) || {};
            this.setData({
                currentClassId: classid
            });
            var productList = currentTypeItem.productList || [];

            if (productList.length) {
                this.setData({
                    classProductList: productList
                });
            } else {
                if (classid === 0) {
                    this.getLikeList(classid);
                } else {
                    this.getClassProductList(classid);
                }
            }
        },

        //获取关注商家 的分类商品列表
        getClassProductList(classId) {
            var marchantTypeList = this.marchantTypeList;
            var classItem = marchantTypeList.find((item) => item.id == classId);
            var { pageCurr, pageSize } = classItem.paging;
            var ids = [];
            classItem.marchantList.forEach((item) => {
                ids.push(item.id);
            });
            var postData = {
                pageCurr,
                pageSize,
                marchantIds: ids
            };
            app.globalData.sjrequest('/commodity/queryAllCommodityList', postData).then((res) => {
                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    classItem.paging.isReq = data.length == classItem.paging.pageSize;
                    classItem.productList.push(...data);
                    var classProductList = classItem.productList;
                    this.setData({
                        marchantTypeList,
                        classProductList
                    });
                }
            });
        },

        //滚动吸顶容器节点信息
        getNodeInfo() {
            if (!this.offsetTop) {
                const query = uni.createSelectorQuery();
                query.select('.product-class-tab-box').boundingClientRect((res) => {
                    var offsetTop = res.top - res.height;
                    this.setData({
                        offsetTop
                    });
                    console.log('节点信息：', res);
                });
                query.exec();
            }
        }
    }
};
</script>
<style>
/* pages/tabPage/home/home.wxss */
.home-page-container {
    background-color: #f7f7f7;
    min-height: 100vh;
}

.header-container-box {
    position: relative;
    margin-bottom: 20rpx;
}

/* 标题栏 */
.home-top-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 50;
}
.home-top-container .title-bar {
    padding-left: 40rpx;
    box-sizing: border-box;
}
.home-top-container .title-bar .me-img {
    width: 56rpx;
    height: 56rpx;
    margin-right: 30rpx;
}
.home-top-container .title-bar .readme-img-container {
    position: relative;
}
.home-top-container .title-bar .readme-img-container .readme-img {
    width: 384rpx;
    height: 68rpx;
}
.home-top-container .title-bar .readme-img-container .count-text {
    position: absolute;
    bottom: 0;
    left: 130rpx;
    color: #07c160;
    font-size: 24rpx;
}

/*搜索框*/
.search-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 20rpx;
}
.search-container-box {
    position: relative;
    width: 710rpx;
    height: 64rpx;
    background: #e4e4e4;
    border-radius: 40rpx;
    margin-left: 30rpx;
    padding-left: 148rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
}

/*轮播图*/
.banner-container {
    padding-top: 15rpx;
}
.swiper-item-box {
    padding: 0 20rpx;
    box-sizing: border-box;
    position: relative;
}
.swiper-item-box .swiper-img-box {
    width: 100%;
    height: 304rpx;
}
.swiper-item-box .swiper-img-box .swiper-img {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 10rpx;
    vertical-align: middle;
}
.swiper-item-box .swiper-img-box .description-text {
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 20rpx;
    color: #f7f8f8;
    position: absolute;
    left: 20rpx;
    bottom: 0;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    width: 710rpx;
}

/* 工具 */
.utils-container-box {
    height: 160rpx;
}
.utils-list-box {
    padding: 0 20rpx;
    box-sizing: border-box;
    height: 100%;
    color: #333;
}
.fixed-utils {
    position: fixed;
    left: 0;
    width: 100%;
    background-color: #f7f7f7;
    z-index: 100;
    padding-bottom: 10rpx;
}
.utils-list-box .utils-item {
    font-size: 20rpx;
}
.utils-list-box .utils-item .utils-item-img {
    width: 85rpx;
    height: 85rpx;
}
.utils-list-box .utils-item .utils-item-name {
    position: relative;
}

/* 限时抢购 农特产品 */
.rob-farmers-product {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
    background-color: #fff;
    width: 710rpx;
    margin: 16rpx auto;
    padding: 20rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
}

.rob-farmers-product .line-empty-box {
    height: 2rpx;
    background-color: #f4f4f4;
    margin: 20rpx 0;
}
.rob-farmers-product .title-img {
    height: 36rpx;
    margin-right: 8rpx;
}
.rob-farmers-product .subtitle-text {
    font-size: 24rpx;
    color: #fff;
    padding: 5rpx 10rpx;
    border-radius: 10rpx;
}
.rob-farmers-product .label-text {
    font-size: 20rpx;
    padding: 5rpx 10rpx;
    border-radius: 8rpx;
}
.rob-farmers-product .product-list-box {
    margin-top: 20rpx;
}
.rob-farmers-product .product-item-box {
    width: 148rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}
.rob-farmers-product .product-item-box .product-img {
    width: 148rpx;
    height: 148rpx;
    background-color: #ccc;
    border-radius: 10rpx;
}
.rob-farmers-product .product-item-box .price {
    font-size: 24rpx;
    text-align: center;
}
.rob-farmers-product .product-item-box .price .int-num {
    font-size: 32rpx;
    font-weight: bold;
}

.rob-farmers-product .rob-box .title-img {
    width: 164rpx;
}
.rob-farmers-product .rob-box .subtitle-text {
    background-color: #f44236;
}
.rob-farmers-product .rob-box .product-item-box .price {
    color: #ff0000;
}
.rob-farmers-product .rob-box .label-text {
    color: #f44236;
    border: 1rpx solid #f44236;
}

.rob-farmers-product .farmers-box .title-img {
    width: 176rpx;
}
.rob-farmers-product .farmers-box .subtitle-text {
    background-color: #07c160;
}
.rob-farmers-product .farmers-box .product-item-box .price {
    color: #07c160;
}
.rob-farmers-product .farmers-box .label-text {
    color: #07c160;
    border: 1rpx solid #07c160;
}

/* 推广店铺 */
.promote-shop-box {
    background-color: #f2f2f2;
    padding-bottom: 20rpx;
}
.promote-shop-box .shadow-box {
    /*容器阴影样式*/
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
}
.promote-shop-box .focus-store-item {
    padding: 20rpx 0 30rpx 20rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    margin: 0 auto 20rpx;
    width: 710rpx;
    background-color: #fff;
}

.promote-shop-box .item-top .badge-img {
    /*徽章*/
    width: 48rpx;
    height: 48rpx;
    margin-right: 10rpx;
}
.promote-shop-box .item-top .access-num {
    font-size: 22rpx;
    color: #8b7857;
    background-color: #fef8f0;
    padding: 10rpx;
    border-radius: 8rpx;
}
.promote-shop-box .item-top .buy-have-label {
    font-size: 22rpx;
    color: #f44236;
    padding: 2rpx 10rpx;
    border: 1rpx solid #f44236;
    border-radius: 8rpx;
    position: relative;
    right: 20rpx;
}
.promote-shop-box .store-info {
    margin: 15rpx 0;
}
.promote-shop-box .store-info .store-img {
    width: 120rpx;
    height: 120rpx;
    background-color: #ccc;
    vertical-align: top;
    border-radius: 10rpx;
}
.promote-shop-box .store-info .right-content {
    padding: 0 20rpx;
    box-sizing: border-box;
}
.promote-shop-box .store-info .right-content .store-name {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    flex: 1;
    margin-right: 20rpx;
}
.promote-shop-box .store-info .right-content .entrance-btn {
    color: #fff;
    font-size: 20rpx;
    padding: 0rpx 20rpx;
    border-radius: 5rpx;
    box-shadow: 1rpx 1rpx 5rpx 1rpx #f44236;
    background-color: #f44236;
    height: 40rpx;
    line-height: 40rpx;
}
.promote-shop-box .store-info .right-content .label-container {
    font-size: 20rpx;
    color: #fe8d00;
}
.promote-shop-box .store-info .right-content .label-container .label-item {
    margin-right: 10rpx;
}
.promote-shop-box .store-info .right-content .business-time {
    font-size: 22rpx;
    color: #ff0000;
}
.promote-shop-box .product-list {
    /*产品列表*/
}
.promote-shop-box .product-list .product-item {
    margin-right: 20rpx;
}
.promote-shop-box .product-list .product-item .product-img {
    width: 204rpx;
    height: 156rpx;
    margin-bottom: 10rpx;
    background-color: #ccc;
    border-radius: 10rpx;
}
.promote-shop-box .product-list .product-item .product-name {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
}
.promote-shop-box .product-list .product-item .product-price {
    font-size: 28rpx;
    color: #f44236;
    font-weight: bold;
}

/*热卖视频入口*/
.promote-shop-box .hot-video {
    font-size: 24rpx;
    color: #333;
    width: 204rpx;
    margin-left: 18rpx;
}
.promote-shop-box .hot-video .video-poster-box {
    width: 204rpx;
    position: relative;
    margin-bottom: 14rpx;
    border-radius: 8rpx;
    overflow: hidden;
}
.promote-shop-box .hot-video .video-poster-box .video-poster {
    width: 100%;
    height: 204rpx;
    background-color: #ccc;
}
.promote-shop-box .hot-video .video-poster-box .play-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 66rpx;
    height: 66rpx;
}
.promote-shop-box .hot-video .home-live-gif {
    width: 26rpx;
    height: 24rpx;
    margin-left: 15rpx;
}

/* 分类商品列表 */
.collect-container {
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
}

.collect-container .tab-class-list {
}

.collect-container .tab-class-list .class-item {
    flex-shrink: 0;
    width: 150rpx;
    text-align: center;
    font-size: 26rpx;
    font-weight: bold;
}
.collect-container .tab-class-list .sel-class-item {
    color: #f44236;
}

.collect-container .tab-class-list .class-item .item-text-box {
    position: relative;
    padding: 15rpx 0 10rpx;
}
.collect-container .tab-class-list .class-item .item-text-box .circle-1 {
    position: absolute;
    right: 0;
    top: 0;
    width: 8rpx;
    height: 8rpx;
    background-color: #f44236;
    border-radius: 50%;
}
.collect-container .tab-class-list .class-item .item-text-box .circle-2 {
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    width: 6rpx;
    height: 6rpx;
    background-color: #f44236;
    border-radius: 50%;
}
.collect-container .tab-class-list .class-item .item-text-box .circle-3 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 10rpx;
    height: 10rpx;
    background-color: #f44236;
    border-radius: 50%;
}

.collect-container .tab-class-list .class-item .small-text {
    font-size: 22rpx;
    color: #999;
}
.collect-container .tab-class-list .class-item .sel-small-text {
    color: #333;
}
.collect-container .tab-class-list .class-item .unline-box {
    width: 62rpx;
    height: 6rpx;
    background-color: transparent;
    border-radius: 6rpx;
    margin-top: 14rpx;
}
.collect-container .tab-class-list .class-item .sel-unline-box {
    background-color: #f44236;
}

.collect-container .collect-product-list {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
}
.collect-container .collect-product-list .collect-product-item {
    width: 350rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 15rpx;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.collect-container .collect-product-list .collect-product-item .product-img {
    background-color: #ccc;
    width: 100%;
    height: 346rpx;
}
.collect-container .collect-product-item .product-title {
    font-size: 24rpx;
    color: #000;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.collect-container .product-price-box {
    display: flex;
    justify-content: space-between;
    font-size: 18rpx;
    color: #999;
    align-items: center;
    margin-top: 10rpx;
}
.collect-container .product-price-box .price {
    color: #ff0000;
    font-size: 24rpx;
    display: flex;
    align-items: center;
}
.collect-container .collect-product-item .promotion-label {
    width: 64rpx;
    height: 38rpx;
}

/*没有数据时*/
.empty-bg-box {
    padding: 20rpx 0;
}
.empty-bg-box .empty-bg-img {
    width: 600rpx;
    height: 504rpx;
}
.empty-bg-box .one-text {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
}
.empty-bg-box .two-text {
    font-size: 24rpx;
    color: #999;
}

/* 登录 */
.butt {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: -1;
    z-index: 9999;
}
</style>
