<template>
    <view>
        <!-- pages/special_goods/activity-classify/activity-classify.wxml -->

        <!-- 顶部导航栏 -->
        <view class="me-fx-row me-fx-start-c top-navigation-box" :style="'top:' + menuBtnInfo.top + 'px;height:' + menuBtnInfo.height + 'px'">
            <text class="icon icon-fanhui5" @tap="breakPage"></text>
        </view>

        <view class="me-fx-col activity-classify-page">
            <swiper class="swiper-box">
                <swiper-item>
                    <image :src="topImgUrl" class="banner-img"></image>
                </swiper-item>
            </swiper>

            <scroll-view :scroll-x="true">
                <view class="me-fx-row classify-nav-list">
                    <view
                        :class="'me-fx-col me-fx-c-c nav-item ' + (nowClassId == item.id ? 'sel-nav' : '')"
                        @tap="switchClass"
                        :data-classid="item.id"
                        v-for="(item, index) in classNavList"
                        :key="index"
                    >
                        <text class="me-fx-row me-fx-c-c">{{ item.classifyName }}</text>

                        <text class="under-line"></text>
                    </view>
                </view>
            </scroll-view>
            <view class="me-fx-1 list-scroll-box">
                <view v-if="dataList.length == 0" class="me-fx-col me-fx-c-c list-empty-box">
                    <text>暂无数据</text>
                </view>
                <scroll-view
                    v-else
                    :scroll-y="true"
                    class="product-list"
                    :style="'height:' + scrollHeight + 'px;'"
                    :refresher-enabled="true"
                    @scrolltolower="scrolltolower"
                    :refresher-triggered="refresherStatus"
                    @refresherpulling="refresherpulling"
                    @refresherrefresh="refresherrefresh"
                >
                    <view class="me-fx-row goods-item" @tap="jumpDetail" :data-item="item" v-for="(item, index) in dataList" :key="index">
                        <image :src="item.imageUrl" class="goods-img"></image>

                        <view class="me-fx-1 me-fx-col me-fx-sb">
                            <view>
                                <view class="me-full-text goods-name">{{ item.commodityName }}</view>
                                <view class="me-fx-row">
                                    <view class="reduced-price">限时直降{{ item.saveAmount }}元</view>
                                </view>
                                <view v-if="templateTag == 'JSMS'" class="me-fx-row me-fx-start-c progress-box">
                                    <progress
                                        class="me-fx-1"
                                        :percent="item.percentNum"
                                        color="#FFE0E0"
                                        active
                                        stroke-width="13"
                                        border-radius="7"
                                        show-info
                                        activeColor="#FF0000"
                                        font-size="9"
                                    />
                                    <text>已秒{{ item.salesTotalCount }}件</text>
                                </view>
                            </view>

                            <!-- 秒杀按钮样式 -->
                            <view class="me-fx-row" v-if="templateTag == 'JSMS'">
                                <view class="me-fx-1 me-fx-row me-fx-c-c price-box">
                                    <text>秒杀价：</text>
                                    <view>
                                        <text>￥</text>
                                        <text class="price-num">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                                <view class="me-fx-row me-fx-c-c right-box">
                                    <image src="/static/pages/special_goods/imgs/ms-icon.png" class="ms-icon-img"></image>
                                    <text>急速秒杀</text>
                                </view>
                            </view>

                            <!-- 拼团按钮样式 -->
                            <view class="me-fx-row pt-btn-box" v-if="templateTag == 'TTPT'">
                                <view class="me-fx-1 me-fx-row me-fx-c-c price-box">
                                    <text>拼团价:</text>
                                    <view>
                                        <text class="price-symbol">￥</text>
                                        <text class="price-int">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                                <image class="adorn-img" src="/static/pages/special_goods/imgs/pt-adorn.png"></image>
                                <view class="me-fx-row me-fx-c-c pt-btn-str">天天拼团</view>
                            </view>

                            <!-- 推荐返利按钮样式 -->
                            <view v-if="templateTag == 'TJFL'" class="me-fx-row tjfl-btn-box">
                                <view class="me-fx-row me-fx-c-c fl-price">
                                    <text class="ljfx-str">立即返现</text>
                                    <view class="price-str">
                                        <text>￥</text>
                                        <text class="price-num">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                                <image class="fl-adom-img" src="/static/pages/special_goods/imgs/fl-adom.png"></image>
                                <view class="me-fx-row me-fx-c-c fl-btn-str">邀三退一</view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>

        <!-- 授权组件 -->
        <auth-get-info></auth-get-info>
    </view>
</template>

<script>
import authGetInfo from '../../Component/auth-get-info/auth-get-info';
// pages/special_goods/activity-classify/activity-classify.js
let app = getApp();
export default {
    components: {
        authGetInfo
    },
    data() {
        return {
            scrollHeight: 0,
            menuBtnInfo: {
                top: '',
                height: ''
            },
            templateTag: '',
            //活动类型 TTPT TJFL JSMS
            merchantId: '',
            //商家id
            nowClassId: '',
            //当前分类id
            classNavList: [],
            //分类列表
            loginInfo: {},
            //登录返回的信息
            dataList: [],
            //
            listDatas: {},
            pageSize: 10,
            classId: '',
            topImgUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/',
            refresherStatus: false //下拉刷新状态 true下拉刷新已触发 false下拉刷新未触发
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options, '拼团接收的参数');
        app.globalData.globalEvent.$on('loginComplete', () => {
            this.initData(options);
        });
        app.globalData.globalEvent.$on('loginReject', () => {
            this.initData(options);
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.computedScrollHeight();
        var menuBtnInfo = app.globalData.MenuButton;
        this.setData({
            menuBtnInfo
        });
    },
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
    /* 分享朋友 */
    onShareAppMessage() {
        var activityTitle = this.getActivityTitle();
        return {
            title: this.loginInfo.nickName + '邀请你参与' + activityTitle + '活动'
        };
    },
    /* 分享朋友圈 */
    onShareTimeline() {
        var activityTitle = this.getActivityTitle();
        return {
            title: this.loginInfo.nickName + '邀请你参与' + activityTitle + '活动'
        };
    },
    methods: {
        getActivityTitle() {
            var templateTag = this.templateTag;
            var activityTitle = '';

            switch (templateTag) {
                case 'TJFL':
                    activityTitle = '邀三退一';
                    break;

                case 'JSMS':
                    activityTitle = '秒杀';
                    break;

                case 'TTPT':
                    activityTitle = '拼团';
                    break;
            }

            return activityTitle;
        },

        initData(options) {
            var merchantId = options.marchantId;
            this.merchantId = merchantId;
            var tagType = options.tagType;
            this.setData(
                {
                    templateTag: tagType
                },
                () => {
                    this.getClassityList();
                    this.joinTopImgUrl(); //拼接顶部图片地址方法
                }
            );
            uni.getStorage({
                key: 'zl_userInfo',
                success: (res) => {
                    var data = res.data || {};
                    var info = data.data.data || {};
                    var userId = info.userId;
                    var loginInfo = {
                        userId,
                        openId: info.setInfo.openId,
                        appId: info.setInfo.appId,
                        nickName: info.nickname,
                        marchantLogic: info.setInfo.headImage,
                        marchantName: info.setInfo.appName,
                        merchantId: info.setInfo.merchantId,
                        userPhone: info.phoneNumber
                    };
                    this.setData({
                        loginInfo
                    });
                }
            });
        },

        jumpDetail(e) {
            var item = e.currentTarget.dataset.item;
            var type = item.templateTag;
            var activityId = item.activityId;
            var url = '';

            if (type == 'JSMS') {
                url = '/pages/seckill/detail/detail?activityId=' + activityId;
            } else if (type == 'TTPT') {
                url = '/pages/group_booking/detail/detail?activityId=' + activityId;
            } else if (type == 'TJFL') {
                url = '/pages/businessActivity/activity_detail/activity_detail';
                url += `?activityid=${activityId}`;
            }

            uni.navigateTo({
                url
            });
        },

        joinTopImgUrl() {
            //拼接顶部图片地址
            var type = this.templateTag;
            var imgUrl = this.topImgUrl;

            switch (type) {
                case 'JSMS':
                    imgUrl += '/static/pages/special_goods/activity-classify/jsms-top-img.png';
                    break;

                case 'TTPT':
                    imgUrl += '/static/pages/special_goods/activity-classify/ttpt-top-img.png';
                    break;

                case 'TJFL':
                    imgUrl += '/static/pages/special_goods/activity-classify/tjfl-top-img.png';
                    break;
            }

            this.setData({
                topImgUrl: imgUrl
            });
        },

        computedScrollHeight() {
            //计算scroll-view高度
            uni.createSelectorQuery()
                .select('.list-scroll-box')
                .boundingClientRect((res) => {
                    this.setData({
                        scrollHeight: res.height
                    });
                })
                .exec();
        },

        breakPage() {
            //返回页面
            var pagesList = getCurrentPages();

            if (pagesList.length > 1) {
                uni.navigateBack();
            } else {
                uni.navigateTo({
                    url: '/pages/shopHome/home/home'
                });
            }
        },

        switchClass(e) {
            //切换分类
            var classId = e.currentTarget.dataset.classid;
            this.setData(
                {
                    nowClassId: classId
                },
                () => {
                    this.getActivityGoodsList();
                }
            );
        },

        getClassityList() {
            //获取分类列表
            console.log('分享页面也进来了这个函数');
            app.globalData
                .sjrequest1('/activityCommodityBusiness/commodityClassifyPageList', {
                    pageSize: 20,
                    currentPage: 1,
                    merchantId: this.merchantId,
                    templateTag: this.templateTag
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        list = list.filter((item) => item.activityList !== null);
                        var nowClassId = this.nowClassId;

                        if (!nowClassId) {
                            if (list[0]) {
                                nowClassId = list[0].id;
                            } else {
                                nowClassId = '';
                            }
                        }

                        var listDatas = {};
                        list.forEach((item) => {
                            var keyName = 'list' + item.id;
                            listDatas[keyName] = {
                                stopReq: false,
                                pageNum: 1,
                                list: []
                            };
                        });
                        this.setData(
                            {
                                classNavList: list,
                                nowClassId,
                                listDatas
                            },
                            () => {
                                this.getActivityGoodsList();
                            }
                        );
                    }
                });
        },

        getActivityGoodsList() {
            //获取活动商品列表
            var nowClassId = this.nowClassId;

            if (!nowClassId) {
                return;
            }

            var listDatas = this.listDatas;
            var listObj = listDatas['list' + nowClassId];
            app.globalData
                .sjrequest1('/activityBusiness/pageList', {
                    pageSize: this.pageSize,
                    currentPage: listObj.pageNum,
                    merchantId: this.merchantId,
                    // "state": 2,
                    templateTag: this.templateTag,
                    commodityClassifyId: nowClassId
                })
                .then((res) => {
                    if (res.statusCode == 200 && res.data.code === 0) {
                        var data = res.data.data || {};
                        var list = data.list || [];
                        listObj.stopReq = list.length != this.pageSize;
                        list.forEach((item) => {
                            item.activityCommoditySkuList = item.activityCommoditySkuList || [];
                            var skuItem = item.activityCommoditySkuList[0] || {};
                            item.imageUrl = item.bannerImgUrls[0];
                            item.price = skuItem.price;
                            item.lowPrice = skuItem.livePrice;
                            var percentNum = item.residueCommodityTotalCount / item.commodityTotalCount;
                            percentNum *= 100;
                            item.percentNum = Number(percentNum.toFixed(2)); //计算销售总数量

                            item.salesTotalCount = item.commodityTotalCount - item.residueCommodityTotalCount;
                            var saveAmount = item.price - item.lowPrice;
                            item.saveAmount = parseInt(saveAmount);
                        });

                        if (listObj.pageNum == 1) {
                            listObj.list = list;
                        } else {
                            listObj.list.push(...list);
                        }

                        this.setData(
                            {
                                listDatas,
                                dataList: listObj.list
                            },
                            () => {
                                console.log(this.dataList);
                            }
                        );
                    }
                });
        },

        refresherpulling() {
            //下拉刷新被下拉
            this.setData(
                {
                    refresherStatus: true
                },
                () => {
                    setTimeout(() => {
                        this.setData({
                            refresherStatus: false
                        });
                    }, 1000);
                }
            );
        },

        refresherrefresh() {
            //下拉刷新被触发
            var listDatas = this.listDatas;
            var nowClassId = this.nowClassId;
            var nowListObj = listDatas['list' + nowClassId] || {};
            nowListObj.pageNum = 1;
            nowListObj.stopReq = false;
            this.setData(
                {
                    listDatas
                },
                () => {
                    this.getActivityGoodsList();
                }
            );
        },

        scrolltolower() {
            //滚动到底部
            var listDatas = this.listDatas;
            var nowClassId = this.nowClassId;
            var nowListObj = listDatas['list' + nowClassId] || {};

            if (!nowListObj.stopReq) {
                nowListObj.pageNum++;
                this.setData(
                    {
                        listDatas
                    },
                    () => {
                        this.getActivityGoodsList();
                    }
                );
            }
        }
    }
};
</script>
<style>
/* pages/special_goods/activity-classify/activity-classify.wxss */

page {
    background-color: #f3f4f8;
}
.activity-classify-page {
    height: 100vh;
}

/*---------- 顶部导航返回按钮 -----------*/
.top-navigation-box {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 100;
    color: #333;
    padding-left: 30rpx;
    box-sizing: border-box;
}
.top-navigation-box .icon-fanhui5 {
    font-size: 75rpx;
}
/* --------------- */

@font-face {
    font-family: 'icon'; /* Project id 2691355 */
    src: url('//at.alicdn.com/t/font_2691355_3bgd8uqx5zl.woff2?t=1630027642395') format('woff2'),
        url('//at.alicdn.com/t/font_2691355_3bgd8uqx5zl.woff?t=1630027642395') format('woff'),
        url('//at.alicdn.com/t/font_2691355_3bgd8uqx5zl.ttf?t=1630027642395') format('truetype');
}

.icon {
    font-family: 'icon' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-fanhui5:before {
    content: '\e600';
}

.swiper-box {
    height: 366rpx;
}
.swiper-box .banner-img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
}

/* 分类导航 */
.classify-nav-list {
    height: 92rpx;
}
.classify-nav-list .nav-item {
    flex-shrink: 0;
    padding: 0 30rpx;
    color: #333;
    font-size: 28rpx;
}
.classify-nav-list .sel-nav {
    font-size: 32rpx;
    font-weight: bold;
    color: #ff0000;
}
.classify-nav-list .nav-item .under-line {
    width: 70rpx;
    height: 6rpx;
    border-radius: 6rpx;
    background-color: transparent;
    margin-top: 5rpx;
}
.classify-nav-list .sel-nav .under-line {
    background-color: #ff0000;
}

/* 商品列表 */
.product-list .goods-item {
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
}
.product-list .goods-item:not(:first-child) {
    margin-top: 20rpx;
}
.product-list .goods-item .goods-img {
    width: 220rpx;
    height: 220rpx;
    border-radius: 16rpx;
    background-color: #ccc;
    margin-right: 20rpx;
}
.product-list .goods-item .goods-name {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
}
.product-list .goods-item .reduced-price {
    background-color: #ffe0e0;
    color: #ff0000;
    font-size: 18rpx;
    padding: 2rpx 5rpx;
    border-radius: 4rpx;
}
.product-list .goods-item .progress-box {
    font-size: 18rpx;
    color: #999;
}

/* 秒杀 */
.product-list .goods-item .price-box {
    font-size: 20rpx;
    color: #fff;
    padding: 0 20rpx;
    background-color: #ff0000;
    border-radius: 8rpx 0 0 8rpx;
}
.product-list .goods-item .price-box .price-num {
    font-size: 40rpx;
    font-weight: bold;
}
.product-list .goods-item .price-box .old-price {
    text-decoration: line-through;
    margin-left: 5rpx;
}

.product-list .goods-item .right-box {
    background-color: #1577ff;
    color: #fff;
    font-size: 26rpx;
    font-weight: bold;
    width: 200rpx;
    border-radius: 0 8rpx 8rpx 0;
}
.product-list .goods-item .ms-icon-img {
    width: 40rpx;
    height: 50rpx;
}

/* 拼团 */
.product-list .goods-item .pt-btn-box .price-box {
    font-size: 30rpx;
    font-weight: bold;
    background-color: #fee476;
    color: #ff0000;
    border-radius: 8rpx 0 0 8rpx;
}
.product-list .goods-item .pt-btn-box .price-symbol {
    font-size: 24rpx;
}
.product-list .goods-item .pt-btn-box .price-int {
    font-size: 40rpx;
}
.product-list .goods-item .pt-btn-box .old-price {
    font-size: 20rpx;
    color: #fff;
    font-weight: normal;
    text-decoration: line-through;
    margin-left: 5rpx;
}
.product-list .goods-item .pt-btn-box .adorn-img {
    width: 26rpx;
    height: 64rpx;
}
.product-list .goods-item .pt-btn-box .pt-btn-str {
    font-size: 26rpx;
    color: #fff;
    width: 125rpx;
    background-color: #fd4a45;
    border-radius: 0 8rpx 8rpx 0;
}

/* 推荐返利 */
.product-list .goods-item .tjfl-btn-box .fl-price {
    border-radius: 8rpx 0 0 30rpx;
    background-color: #ff0000;
    color: #fff;
    font-size: 24rpx;
    position: relative;
    flex: 1;
}
.product-list .goods-item .tjfl-btn-box .fl-price .ljfx-str {
    font-size: 22rpx;
    color: #fff;
    position: absolute;
    top: 5rpx;
    left: 5rpx;
}
.product-list .goods-item .tjfl-btn-box .fl-price .price-str {
    position: relative;
    top: 10rpx;
    left: 10rpx;
}
.product-list .goods-item .tjfl-btn-box .fl-price .price-num {
    font-size: 40rpx;
    font-weight: bold;
}
.product-list .goods-item .tjfl-btn-box .fl-adom-img {
    width: 60rpx;
    height: 84rpx;
}
.product-list .goods-item .tjfl-btn-box .fl-btn-str {
    font-size: 30rpx;
    color: #fff;
    width: 168rpx;
    background-color: #fee476;
    border-radius: 0 30rpx 8rpx 0;
}

.list-scroll-box .list-empty-box {
    height: 500rpx;
    font-size: 30rpx;
    color: #999;
}
</style>
