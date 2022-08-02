<template>
    <view>
        <!-- 小店 -->
        <view class="small-shop-box" v-if="tabActive == 0">
            <view class="index">
                <image class="xiaoxingxing" :animation="animation1" src="/static/pages/img/smallShop/1.png"></image>
                <image class="xiaoxingxing" :animation="animation1" style="left: 460rpx" src="/static/pages/img/smallShop/2.png"></image>
                <image class="xiaoxingxing" :animation="animation1" style="left: 480rpx" src="/static/pages/img/smallShop/3.png"></image>
                <view class="index-head">
                    <view class="index-head-left">
                        <image :src="storeData.headImgUrl" mode="aspectFill" class="index-head-left-img"></image>
                        <view class="index-head-left-info">
                            <view class="index-head-left-info-name">{{ storeData.nickName }}的小店</view>
                            <view v-if="!isFavorite" class="already-sc" @tap="operaFavorite">收藏小店</view>
                            <view v-if="isFavorite" class="no-sc" @tap="operaFavorite">已收藏</view>
                            <!-- <view class="index-head-left-info-desc">
            <view class="index-head-left-info-desc-text">人缘口碑</view>
            <view class="index-head-left-info-desc-starList">
              <image src="/pages/img/smallShop/star_s.png" class="index-head-left-info-desc-starItem" wx:for="{{storeData.excellent}}" wx:key="index"></image>
            </view>
          </view>
          <view class="index-head-left-info-desc">
            <view class="index-head-left-info-desc-text">颜值指数</view>
            <view class="index-head-left-info-desc-starList">
              <image src="/pages/img/smallShop/star_s.png" class="index-head-left-info-desc-starItem" wx:for="{{storeData.score}}" wx:key="index"></image>
            </view>
          </view> -->
                        </view>
                    </view>
                    <view class="index-head-right">
                        <view class="index-head-right-item" style="margin-left: 0rpx" @tap="operaFavoritePraise">
                            <view class="index-head-right-item-upText">点赞</view>
                            <image src="/static/pages/img/smallShop/like.png" class="index-head-right-item-icon" :animation="animation"></image>
                            <view class="index-head-right-item-downText">{{ storeData.praise }}</view>
                        </view>
                        <navigator class="index-head-right-item" :url="'../PosterScart/PosterScart?storeId=' + storeId + '&nickName=' + storeData.nickName">
                            <view class="index-head-right-item-upText">分享</view>
                            <image src="/static/pages/img/smallShop/wx_friend.png" class="index-head-right-item-icon"></image>
                        </navigator>
                        <!-- <view class="index-head-right-item" bindtap="operaFavorite">
            <view class="index-head-right-item-upText">{{isFavorite?'已收藏':'收藏小店'}}</view>
            <image src="{{isFavorite?'/pages/img/smallShop/star_b.png':'/pages/img/smallShop/star.png'}}" class="index-head-right-item-icon"></image>
        </view> -->
                    </view>
                </view>
                <view class="index-content">
                    <scroll-view :scroll-y="true" class="index-content-content" @scrolltolower="goodsTobottom" :scroll-top="top">
                        <view class="index-content-content-data">
                            <navigator
                                class="index-content-content-data-item"
                                :url="
                                    '/pages/Index/GoodsDetails/GoodsDetails?id=' +
                                    item.commodityId +
                                    '&sid=' +
                                    item.tempSpecId +
                                    '&pid=' +
                                    item.saleUniqueId +
                                    '&form=store&storeId=' +
                                    storeId +
                                    '&salesUserId=' +
                                    salesUserId
                                "
                                v-for="(item, index) in goodsList"
                                :key="index"
                            >
                                <image :src="item.imagList[0]" class="index-content-content-data-item-logo" mode="aspectFill">
                                    <view class="count-down-box" v-if="!item.ishide">
                                        <text style="margin: 0 14rpx">活动倒计时</text>
                                        <van-count-down :time="item.countdown" @finish="finishedCountDown($event, { idx: index })" :data-idx="index" format=" HH : mm : ss " />
                                    </view>
                                </image>

                                <view class="index-content-content-data-item-info">
                                    <view style="display: flex; align-items: center; width: 100%">
                                        <text class="index-content-content-data-item-info-name">{{ item.commodityName }}</text>
                                    </view>
                                    <view class="index-content-content-data-item-info-foot">
                                        <view class="index-content-content-data-item-info-foot-price">
                                            ¥{{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                                        </view>
                                        <!-- <view class="index-content-content-data-item-info-foot-shopname">来自{{item.nickName}}</view> -->
                                    </view>
                                    <image v-if="item.isHotSale" class="hot-img" src="/static/pages/img/smallShop/hot.png"></image>
                                </view>

                                <!-- end index-content-content-data-item-info -->
                            </navigator>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
        <!-- 小店热卖 -->
        <view class="hot-sale" v-if="tabActive == 1">
            <no-data v-if="!hotSaleList.length" text="暂无热销产品"></no-data>
            <scroll-view
                :scroll-y="true"
                v-else
                style="max-height: calc(100vh - 110rpx)"
                @scrolltolower="hotSaleTobottom"
                :refresher-enabled="true"
                @refresherrefresh="refrenshHotSale"
                :scroll-top="top"
            >
                <view class="hot-sale-goods" v-for="(item, index) in hotSaleList" :key="index">
                    <image class="hot-sale-goods-img" :src="item.imagList[0]"></image>

                    <view style="padding: 0 20rpx">
                        <view class="hot-sale-goods-name">{{ item.commodityName }}</view>
                        <view class="hot-sale-goods-content">
                            <view class="hot-sale-goods-left">
                                <view class="hot-sale-goods-from">来自{{ item.nickName }}</view>
                                <view class="hot-sale-goods-price">
                                    <view class="hot-sale-goods-buy-price">
                                        <text style="font-size: 24rpx">￥</text>
                                        {{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                                    </view>
                                    <view class="hot-sale-goods-origin-price" v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)">
                                        ￥{{ item.originalPrice }}
                                    </view>
                                </view>
                            </view>
                            <navigator
                                class="hot-sale-goods-right"
                                :url="
                                    '/pages/Index/GoodsDetails/GoodsDetails?id=' +
                                    item.commodityId +
                                    '&sid=' +
                                    item.tempSpecId +
                                    '&pid=' +
                                    item.saleUniqueId +
                                    '&form=store&storeId=' +
                                    storeId +
                                    '&salesUserId=' +
                                    salesUserId
                                "
                            >
                                ￥
                                <text style="font-size: 36rpx">{{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}</text>
                                去购买
                            </navigator>
                        </view>
                    </view>

                    <view class="hot-sale-already-buy-box" v-if="item.headimgurls.length">
                        <view class="hot-sale-already-buy-box-text">已购买</view>
                        <swiper
                            :indicator-dots="false"
                            :circular="true"
                            :autoplay="true"
                            interval="3000"
                            style="width: 100%; height: 100%"
                            indicator-active-color="#E7A124"
                            class="already-buy-box-list"
                        >
                            <block v-for="(item, index1) in item.headimgurls" :key="index1">
                                <swiper-item class="already-buy-box-item">
                                    <image class="already-buy-box-image" :src="item"></image>
                                </swiper-item>
                            </block>
                        </swiper>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- 小店订阅通知 -->
        <view class="small-shop-community" v-if="tabActive == 2">
            <view style="width: 100%; height: 1rpx; background: #e5e5e5"></view>
            <view class="index-content-title">
                <view style="display: flex; align-items: center">
                    <image src="/static/pages/img/smallShop/small_shop.png" style="width: 53rpx; height: 53rpx"></image>
                    <view class="index-content-title-tag">
                        <text style="margin-bottom: 10rpx">小店</text>
                        <text>访客</text>
                    </view>
                </view>
                <scroll-view :scroll-x="true" class="user-list">
                    <view class="user-item">
                        <image :src="item.headimgurl" class="index-content-title-image" v-for="(item, index) in userList" :key="index"></image>
                    </view>
                </scroll-view>
            </view>
            <!-- </van-sticky> -->
            <view v-if="!dynamicList.length" class="no-dynamic">
                <image class="no-dynamic-img" src="/static/pages/img/no_notice.png"></image>
                <view class="no-dynamic-text">该小店还没有动态……</view>
            </view>
            <scroll-view
                :scroll-y="true"
                v-else
                style="max-height: calc(100vh - 220rpx)"
                @scrolltolower="dynamicTobottom"
                :refresher-enabled="true"
                @refresherrefresh="refrenshDynamic"
                :scroll-top="top"
            >
                <view class="dynamic-item" v-for="(item, index) in dynamicList" :key="index">
                    <view class="dynamic-top">
                        <view class="touxiang-box">
                            <image class="my-touxiang" mode="aspectFill" :src="item.userRegister.headimgurl"></image>
                            <!-- <image wx:if="{{item.userRegister.sex==1}}" class="sex" src="../../img/man.png"></image>
          <image wx:if="{{item.userRegister.sex==2}}" class="sex" src="../../img/woman.png"></image> -->
                        </view>
                        <view class="my-info-box">
                            <view class="name-box">
                                {{ item.userRegister.nickname }}
                                <!-- <image class="set" src="../../img/set.png"></image> -->
                            </view>
                            <view class="autograngh">{{ item.userRegister.signature ? item.userRegister.signature : '该用户没有设置签名' }}</view>
                        </view>
                    </view>

                    <rich-text :nodes="item.content" class="dynamic-text"></rich-text>

                    <scroll-view :scroll-x="true" style="width: 100%">
                        <view class="dynamic-img-list">
                            <image
                                class="dynamic-img-item"
                                mode="aspectFill"
                                lazy-load
                                :src="pitem"
                                @tap="imgClick"
                                :data-list="item.imagList"
                                :data-src="pitem"
                                v-for="(pitem, pindex) in item.imagList"
                                :key="pitem.pindex"
                            ></image>
                        </view>
                    </scroll-view>

                    <view class="dynamic-bottom">
                        <view class="dynamic-time">{{ item.addTime }}发表</view>
                        <view class="dynamic-zan-box">
                            <!-- <view class="comment" bindtap="toComment" data-item="{{item}}">
            <image style="width:30rpx;height:28rpx;" src="../../img/comment.png"></image>
            <view class="comment-text">{{item.reply==0?'评论':item.reply}}</view>
          </view> -->
                            <view class="comment dianzan" @tap="liketap" :data-id="item.id" :data-index="index">
                                <image style="width: 30rpx; height: 28rpx" v-if="item.isPraise" src="/static/pages/img/gooded.png"></image>
                                <image style="width: 30rpx; height: 28rpx" v-else src="/static/pages/img/good.png"></image>
                                <view class="comment-text">{{ item.praise == 0 ? '赞' : item.praise }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- Tabbar栏 -->
        <van-tabbar :active="tabActive" @change="changeTabbar" active-color="#EB1918">
            <van-tabbar-item>
                <image slot="icon" src="/static/pages/img/smallShop/tab1.png" style="width: 40rpx; height: 40rpx" />
                <image slot="icon-active" src="/static/pages/img/smallShop/tab1_active.png" style="width: 40rpx; height: 40rpx" />
                小店
            </van-tabbar-item>
            <van-tabbar-item>
                <image slot="icon" src="/static/pages/img/smallShop/tab2.png" style="width: 40rpx; height: 40rpx" />
                <image slot="icon-active" src="/static/pages/img/smallShop/tab2_active.png" style="width: 40rpx; height: 40rpx" />
                热销
            </van-tabbar-item>
            <!-- <van-tabbar-item >
    <image slot="icon" src="/pages/img/smallShop/tab3.png" style="width: 40rpx; height: 40rpx;"/>
    <image slot="icon-active" src="/pages/img/smallShop/tab3_active.png" style="width: 40rpx; height: 40rpx;"/>
    圈子
  </van-tabbar-item> -->
        </van-tabbar>
        <menu :navs="navs" :cartnum="cartNum" @test="toTop" />
        <view style="position: fixed; bottom: 350rpx; right: 40rpx">
            <view
                style="display: flex; align-items: center; flex-direction: column; position: absolute; bottom: 0; right: 0; opacity: 0"
                :animation="idx == index ? animation2 : ''"
                v-for="(item, index) in headimgurlList"
                :key="index"
            >
                <image :src="item.headimgurl" style="width: 60rpx; height: 60rpx; border-radius: 50%" />

                <text style="font-size: 20rpx; color: #f44336; font-weight: bold">购买过</text>
            </view>
        </view>
        <!-- <navigator wx:if="{{buton}}" url="/pages/shopHome/home/home" class="butt">授权登录</navigator> -->
    </view>
</template>

<script>
import menu from '@/pages/smallShop/myShop/components/navs-bong/navs-bong';
// import vanSidebarItem from './@vant/weapp/sidebar-item/index';
// import vanSidebar from './@vant/weapp/sidebar/index';
// import vanDialog from './@vant/weapp/dialog/index';
// import vanToast from './@vant/weapp/toast/index';
// import vanIcon from './@vant/weapp/icon/index';
// import vanField from './@vant/weapp/field/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// import vanSticky from './@vant/weapp/sticky/index';
// import vanTabbar from './@vant/weapp/tabbar/index';
// import vanTabbarItem from './@vant/weapp/tabbar-item/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import noData from '@/pages/Component/noData/index';
const app = getApp();

const time = require('../../../utils/util');

export default {
    components: {
        menu,
        // vanSidebarItem,
        // vanSidebar,
        // vanDialog,
        // vanToast,
        // vanIcon,
        // vanField,
        // vanOverlay,
        // vanSticky,
        // vanTabbar,
        // vanTabbarItem,
        // vanCountDown,
        noData
    },
    data() {
        return {
            navs: [
                {
                    name: '购物车',
                    src: '/static/pages/img/my/menu-gwc.png',
                    url: '/pages/Index/ShopCart/ShopCart',
                    inAnimation: 'menu-in-animation1',
                    outAnimation: 'menu-out-animation1',
                    bottom: '380rpx',
                    right: '20rpx'
                },
                {
                    name: '我的',
                    src: '/static/pages/img/my/menu-wd.png',
                    url: '/pages/tabPage/me/me',
                    bottom: '240rpx',
                    right: '140rpx',
                    inAnimation: 'menu-in-animation2',
                    outAnimation: 'menu-out-animation2'
                }, // {
                //   name: '订阅通知',
                //   src: '/pages/img/my/menu-sq.png',
                //   url: '/pages/smallShop/releaseDynamic/releaseDynamic',
                //   bottom: '180rpx',
                //   right: '140rpx',
                //   inAnimation:'menu-in-animation2',
                //   outAnimation:'menu-out-animation2',
                // },
                {
                    name: '返回',
                    src: '/static/pages/img/my/menu-fh.png',
                    url: 'top',
                    bottom: '120rpx',
                    right: '20rpx',
                    inAnimation: 'menu-in-animation3',
                    outAnimation: 'menu-out-animation3'
                }
            ],

            // 小店数据
            storeData: {
                headImgUrl: '',
                nickName: '',
                praise: ''
            },

            //小店的参数
            goodsList: [],

            // 商品列表
            headimgurlList: [],

            // 购买的人
            idx: 0,

            // 当前滚动的索引
            isFavorite: false,

            //是否收藏
            buton: false,

            // 是否登录
            cartNum: 0,

            // 购物车数量
            storeId: 0,

            // 小店id
            animation: '',

            // 点赞动画抖动
            salesUserId: 0,

            // 分销人员id
            animation1: '',

            // 点赞动画
            animation2: '',

            // 上漂动画
            isStart: false,

            //是否开始动画
            userList: [1, 2, 3],

            toBottom: false,

            // 小店商品是否触底
            goodsCur: 1,

            // 小店商品页数
            // 热卖
            hotSaleList: [],

            stopSaleLoading: false,
            saleCurr: 1,

            // 订阅通知的数据
            tabActive: 0,

            // tabBar
            fileList: [],

            stopLoading: false,
            dynamicList: [],
            pageCurr: 1,
            pageSize: 10,
            top: 0,
            url: '',

            pitem: {
                pindex: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        uni.hideHomeButton({});
        app.globalData.userLogin().then(async (res) => {
            app.globalData.options = options;

            if (options.scene) {
                //小程序码
                const scene = decodeURIComponent(options.scene);
                await this.getCodeParams(scene);
            } else {
                // 正常流程
                this.setData({
                    storeId: options.storeId ? options.storeId : res.setInfo.merchantId // ['navs[2].url']: '/pages/smallShop/releaseDynamic/releaseDynamic?storeId=' + options.storeId
                });
            }

            var that = this; //查看是否授权

            uni.getSetting({
                success: function (res) {
                    if (uni.getStorageSync('wx_userinfo_key')) {
                        // 已授权
                        that.setData({
                            buton: false
                        });
                    } else {
                        //用户没有授权
                        that.setData({
                            buton: true
                        });
                    }
                }
            });
            await that.getParams();

            if (that.headimgurlList.length && !that.isStart) {
                that.setData({
                    isStart: true
                });
                setTimeout((res) => {
                    that.animationStill();
                }, 1000);
            }

            uni.setNavigationBarTitle({
                title: that.storeData.nickName + '的小店'
            });
            uni.setStorageSync('scartHaipao', that.storeData);
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
        this.getCartNum();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        app.globalData.options = {};
    },
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
        uni.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        return {
            title: this.storeData.nickName + '的小店',
            path: '/pages/smallShop/myShop/myShop?storeId=' + this.storeId,
            imageUrl: ''
        };
    },
    onShareTimeline: function () {
        return {
            title: this.storeData.nickName + '的小店',
            query: `storeId=${this.storeId}`,
            imageUrl: ''
        };
    },
    methods: {
        //是否从小程序码进来
        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            return app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        storeId: JSON.parse(res.data.data.scene).storeId,
                        //  +  JSON.parse(res.data.data.scene).storeId
                        ['navs[2].url']: '/pages/smallShop/releaseDynamic/releaseDynamic?storeId=' + JSON.parse(res.data.data.scene).storeId
                    });
                } else {
                    uni.showToast({
                        title: '网络错误',
                        icon: 'none'
                    });
                }
            });
        },

        //获取页面参数
        getParams() {
            uni.showLoading({
                title: '加载中'
            });
            let that = this;
            let data = {
                storeId: this.storeId,
                pageCurr: this.goodsCur,
                pageSize: 10
            };
            const res = app.globalData.sjrequest('/sales/querySalesMarchantList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.commodityList.forEach((item) => {
                        // 处理倒计时数据
                        if (item.countdown) {
                            let time1 = time.formatTimeSec(item.countdown);
                            item.countdown = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
                            console.log(item.countdown);
                        }
                    });

                    if (that.goodsCur == 1) {
                        this.setData({
                            storeData: res.data.data.salesStore,
                            goodsList: res.data.data.commodityList,
                            userList: res.data.data.userList,
                            headimgurlList: res.data.data.headimgurlList,
                            salesUserId: res.data.data.salesStore.salesUserId,
                            isFavorite: res.data.data.isFavorite == 0 ? false : true,
                            goodsCur: that.goodsCur + 1
                        });
                    } else {
                        this.setData({
                            goodsList: that.goodsList.concat(res.data.data.commodityList),
                            goodsCur: that.goodsCur + 1
                        });
                        console.log(that.goodsList);
                    }

                    if (res.data.data.commodityList.length < 10) {
                        that.setData({
                            toBottom: true
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
            return res;
        },

        //点赞动画
        favoriteAnimation() {
            var animation = uni.createAnimation({
                duration: 100,
                // 动画持续时间，单位 ms
                timingFunction: 'linear',
                // 动画的效果
                delay: 10,
                // 动画延迟时间，单位 ms
                transformOrigin: '50% 50%' // 动画的中心点
            });
            animation.rotate(-10).step();
            animation.rotate(0).step();
            animation.rotate(10).step();
            animation.rotate(0).step();
            var animation1 = uni.createAnimation({
                duration: 3000,
                // 动画持续时间，单位 ms
                timingFunction: 'linear',
                // 动画的效果
                delay: 10,
                // 动画延迟时间，单位 ms
                transformOrigin: '50% 50%' // 动画的中心点
            });
            animation1.opacity(1).step({
                duration: 10
            });
            animation1.opacity(0.5).translate(10, -20).step({
                duration: 500
            });
            animation1.opacity(0.5).translate(10, -20).step({
                duration: 500
            });
            animation1.opacity(0).translate(0, 0).step({
                duration: 0
            });
            this.setData({
                animation: animation.export(),
                animation1: animation1.export()
            });
        },

        // 点赞
        operaFavoritePraise() {
            let that = this;
            let data = {
                type: 1,
                storeId: that.storeData.id
            };
            const res = app.globalData.sjrequest('/sales/operaFavoritePraise', data).then((res) => {
                if (res.data.code == 200) {
                    uni.vibrateShort(); // that.favoriteAnimation()

                    that.storeData.praise += 1;
                    this.setData({
                        storeData: that.storeData
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
            return res;
        },

        //购买过的动画
        animationStill() {
            let that = this;
            var animation2 = uni.createAnimation({
                duration: 3000,
                // 动画持续时间，单位 ms
                timingFunction: 'ease-out',
                // 动画的效果
                delay: 100,
                // 动画延迟时间，单位 ms
                transformOrigin: '50% 50%' // 动画的中心点
            });
            animation2.opacity(1).step({
                duration: 100
            });
            animation2.opacity(0.99).translateY(-150).step({
                duration: 2000
            });
            animation2.opacity(0.99).translateY(-150).step({
                duration: 2000
            });
            animation2.opacity(0).translateY(0).step({
                duration: 0
            });
            this.setData({
                animation2: animation2.export()
            });
            setTimeout(
                function () {
                    if (that.idx < that.headimgurlList.length - 1) {
                        that.setData({
                            idx: that.idx + 1
                        });
                    } else {
                        that.setData({
                            idx: 0
                        });
                    }

                    this.animationStill(); //官方写法就这样.暂时没有找到相关api.
                }.bind(this),
                3000
            );
        },

        // 点击收藏
        operaFavorite() {
            var that = this;

            if (this.isFavorite) {
                uni.showModal({
                    title: '取消收藏',
                    content: '确定要取消收藏吗？',
                    showCancel: true,
                    //是否显示取消按钮
                    cancelText: '我再想想',
                    //默认是“取消”
                    cancelColor: '#576b95',
                    //取消文字的颜色
                    confirmText: '残忍取消',
                    //默认是“确定”
                    confirmColor: '#ccc',
                    //确定文字的颜色
                    success: function (res) {
                        if (res.cancel) {
                            //点击取消,默认隐藏弹框
                            return;
                        } else {
                            that.favoriteStore();
                        }
                    }
                });
            } else {
                that.favoriteStore();
            }
        },

        // 取消/收藏店铺
        favoriteStore() {
            let that = this;
            let data = {
                type: 2,
                storeId: that.storeData.id
            };
            const res = app.globalData.sjrequest('/sales/operaFavoritePraise', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        isFavorite: !that.isFavorite
                    });

                    if (that.isFavorite) {
                        uni.showToast({
                            title: '已收藏小店',
                            icon: 'none'
                        });
                    } else {
                        uni.showToast({
                            title: '已取消收藏',
                            icon: 'none'
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
            return res;
        },

        //获得购物车数量
        getCartNum() {
            // var data={marchantId:this.data.marchantId}
            const res = app.globalData.sjrequest('/commodity/countTrolley').then((res) => {
                if (res.data.code == 200) {
                    var countTrolley = res.data.data.countTrolley;
                    this.setData({
                        cartNum: countTrolley
                    });
                }
            });
            return res;
        },

        //  热卖
        getHotSaleList() {
            // 获取热卖列表
            const that = this;
            let data = {
                storeId: this.storeId,
                pageCurr: this.saleCurr,
                pageSize: 10
            };
            return app.globalData.sjrequest('/sales/queryHotCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    that.setData({
                        hotSaleList: that.hotSaleList.concat(res.data.data)
                    });

                    if (res.data.data.length < that.saleCurr) {
                        that.setData({
                            stopSaleLoading: true
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 订阅通知
        changeTabbar(e) {
            this.setData({
                tabActive: e.detail
            });

            if (e.detail == 1 && this.hotSaleList.length == 0) {
                uni.showLoading({
                    title: '加载中'
                });
                this.getHotSaleList();
            }

            if (e.detail == 2 && this.dynamicList.length == 0) {
                uni.showLoading({
                    title: '加载中'
                });
                this.getDynamicList();
            }
        },

        // 获取订阅通知列表
        getDynamicList() {
            const that = this;
            let data = {
                storeId: this.storeId,
                pageCurr: this.pageCurr,
                pageSize: this.pageSize
            };
            return app.globalData.sjrequest('/sales/queryAllComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    var list = res.data.data;

                    for (var i in list) {
                        list[i].addTime = time.formatTime(list[i].addTime);
                        var contentString = '';
                        var contentList = JSON.stringify(list[i].content);
                        contentList = contentList.slice(1, contentList.length - 1);
                        contentList = contentList.split('\\n');
                        contentList.forEach((item) => {
                            contentString = contentString + item + '<br />';
                        });
                        list[i].content = contentString;
                    }

                    that.setData({
                        dynamicList: that.dynamicList.concat(list)
                    });

                    if (list.length < that.pageSize) {
                        that.setData({
                            stopLoading: true
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 倒计时结束
        finishedCountDown(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let idx = e.currentTarget.dataset.idx;
            this.goodsList[idx].ishide = true;
            this.setData({
                goodsList: this.goodsList
            });
        },

        // 重新获取订阅通知列表
        reGetList() {
            this.setData({
                pageCurr: 1,
                dynamicList: [],
                stopLoading: false
            });
            return this.getDynamicList();
        },

        // 重新获取热销列表
        reGetSaleList() {
            this.setData({
                hotSaleList: [],
                stopSaleLoading: false,
                saleCurr: 1
            });
            return this.getHotSaleList();
        },

        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var index = e.currentTarget.dataset['index'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/sales/operationPraise', data).then((res) => {
                if (res.data.code == 200) {
                    var list = this.dynamicList;
                    list[index].isPraise = !list[index].isPraise;

                    if (list[index].isPraise) {
                        list[index].praise += 1;
                    } else {
                        list[index].praise -= 1;
                    }

                    this.setData({
                        dynamicList: list
                    });
                }
            });
        },

        /**图片预览 */
        imgClick(e) {
            var src = e.currentTarget.dataset.src;
            var imgList = e.currentTarget.dataset.list;
            uni.previewImage({
                current: src,
                urls: imgList
            });
        },

        toTop() {
            console.log(this.top);
            this.setData({
                top: 0
            });
        },

        refrenshDynamic() {
            // 刷新动态
            uni.showLoading({
                title: '刷新中'
            });

            if (this._freshing) {
                return;
            }

            this._freshing = true;
            setTimeout(async () => {
                await this.reGetList();
                uni.showToast({
                    title: '刷新成功',
                    icon: 'none'
                });
                this._freshing = false;
            }, 1000);
        },

        refrenshHotSale() {
            // 刷新热销
            uni.showLoading({
                title: '刷新中'
            });

            if (this._freshing) {
                return;
            }

            this._freshing = true;
            setTimeout(async () => {
                await this.reGetSaleList();
                uni.showToast({
                    title: '刷新成功',
                    icon: 'none'
                });
                this._freshing = false;
            }, 1000);
        },

        goodsTobottom() {
            // 商品触底事件
            if (!this.toBottom) {
                this.getParams();
            }
        },

        dynamicTobottom() {
            // 动态触底事件
            if (!this.stopLoading) {
                this.setData({
                    pageCurr: this.pageCurr + 1
                });
                this.getDynamicList();
            }
        },

        hotSaleTobottom() {
            // 热销触底事件
            if (!this.stopSaleLoading) {
                this.setData({
                    saleCurr: this.saleCurr + 1
                });
                this.getHotSaleList();
            }
        }
    }
};
</script>
<style>
.small-shop-box {
    padding-bottom: 100rpx;
}
.index {
    background-color: #f9f9f9;
    padding: 10rpx 30rpx 0;
    box-sizing: border-box;
    /* min-height: 100vh; */
}
.index-head {
    background: #cd4c4c;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    padding: 27rpx;
    display: flex;
    justify-content: space-between;
}
.index-head-left {
    display: flex;
}
.index-head-left-img {
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
}
.index-head-left-info {
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
}
.index-head-left-info-name {
    font-size: 32rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #fff;
    margin-bottom: 15rpx;
}
.already-sc {
    width: 120rpx;
    height: 42rpx;
    background: linear-gradient(180deg, #eb1918 0%, #ff6f6e 100%);
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.no-sc {
    width: 96rpx;
    height: 42rpx;
    background: #f3f3f3;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #999;
}
.index-head-left-info-desc {
    display: flex;
    align-items: center;
}
.index-head-left-info-desc-text {
    font-size: 20rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #fff;
    margin-right: 8rpx;
}
.index-head-left-info-desc-starList {
    display: flex;
}
.index-head-left-info-desc-starItem {
    width: 17rpx;
    height: 17rpx;
    margin-right: 4rpx;
}
.index-head-right {
    display: flex;
}
.index-head-right-item {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.index-head-right-item-upText {
    font-size: 16rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #fff;
}
.index-head-right-item-icon {
    width: 48rpx;
    height: 48rpx;
    margin: 25rpx 0 10rpx;
    position: relative;
}
.index-head-right-item-downText {
    font-size: 16rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #fff;
}
.index-content-title {
    background: #fff;
    /* border-radius: 20rpx; */
    margin-bottom: 20rpx;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
}
.index-content-title-tag {
    font-size: 22rpx;
    line-height: 22rpx;
    font-weight: bold;
    padding-right: 10rpx;
    padding-left: 10rpx;
    display: flex;
    flex-direction: column;
    letter-spacing: 10rpx;
    border-right: 1rpx solid #ccc;
}
.index-content-title-image {
    width: 60rpx;
    height: 60rpx;
    margin-right: 20rpx;
    border-radius: 50%;
}
.user-item {
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
}
.user-list {
    width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 20rpx;
}
.index-content-title-recommend {
    font-size: 25rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ff0c0c;
    border-bottom: 3rpx solid #ff0c0c;
}
.index-content-title-icon {
    width: 30rpx;
    height: 30rpx;
    margin: 0 8rpx 0 27rpx;
}
.index-content-title-text {
    font-size: 25rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #cc4343;
}
.index-content-content {
    max-height: calc(100vh - 305rpx);
}
.index-content-content-noData {
    margin-top: 100rpx;
}
.index-content-content-noData-image {
    width: 652rpx;
    height: 566rpx;
}
.index-content-content-noData-text {
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    margin-top: 40rpx;
}
.index-content-content-data {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20rpx;
}
.index-content-content-data-item {
    width: 330rpx;
    background: #ffffff;
    margin-bottom: 20rpx;
    border: 1rpx solid #e8e8e8;
    box-shadow: 0rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 10rpx;
}
.index-content-content-data-item-logo {
    width: 100%;
    height: 350rpx;
    border-radius: 10rpx;
    position: relative;
}
.index-content-content-data-item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 17rpx 13rpx 16rpx 19rpx;
    box-sizing: border-box;
    width: 100%;
    position: relative;
}
.hot-img {
    position: absolute;
    bottom: 0rpx;
    right: 0rpx;
    width: 160rpx;
    height: 160rpx;
}
.index-content-content-data-item-info-name {
    width: 0;
    flex: 1;
    font-size: 25rpx;
    line-height: 25rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.index-content-content-data-item-info-foot {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.index-content-content-data-item-info-foot-price {
    font-size: 30rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #f64a47;
}
.index-content-content-data-item-info-foot-shopname {
    font-size: 16rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(153, 153, 0.61);
    border: 1rpx solid rgba(153, 153, 0.61);
    border-radius: 50rpx;
    padding: 3rpx 5rpx;
}
.xiaoxingxing {
    width: 20rpx;
    height: 20rpx;
    position: absolute;
    top: 60rpx;
    left: 440rpx;
    opacity: 0;
}
/* 授权蒙版 */
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
/* 小店热销 */
.hot-sale {
    width: 100%;
    background: #fff;
    min-height: 95vh;
    height: 100%;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
}
.hot-sale-goods {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
}
.hot-sale-goods-img {
    width: 100%;
    height: 644rpx;
}
.count-down-box {
    width: 100%;
    height: 44rpx;
    background: rgba(235, 25, 24, 0.6);
    border-radius: 0rpx 0rpx 10rpx 10rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
}
.van-count-down {
    font-size: 20rpx !important;
    color: #ffffff !important;
}
.hot-sale-goods-name {
    width: 100%;
    height: 60rpx;
    font-size: 44rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: #101010;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hot-sale-goods-content {
    width: 100%;
    height: 94rpx;
    padding-top: 10rpx;
    box-sizing: border-box;
    display: flex;
}
.hot-sale-goods-left {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.hot-sale-goods-from {
    width: fit-content;
    height: 32rpx;
    border: 2rpx solid #999999;
    border-radius: 16rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    padding: 0 12rpx;
}
.hot-sale-goods-price {
    display: flex;
    align-items: center;
}
.hot-sale-goods-buy-price {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #eb1918;
}
.hot-sale-goods-origin-price {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #999999;
    text-decoration: line-through;
    margin-left: 10rpx;
}
.hot-sale-goods-right {
    padding: 6rpx 24rpx;
    box-sizing: border-box;
    height: 62rpx;
    background: #eb1918;
    border-radius: 30rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #ffffff;
}
.hot-sale-already-buy-box {
    border-top: 2rpx solid #e4e4e4;
    box-sizing: border-box;
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
}
.hot-sale-already-buy-box-text {
    width: 100rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #101010;
    text-align: center;
}
.already-buy-box-list {
    width: 0;
    flex: 1;
    height: 50rpx;
    display: flex;
    align-items: center;
}
.already-buy-box-item {
    width: fit-content !important;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.already-buy-box-image {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
/* 小店订阅通知 */
.small-shop-community {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
    padding-bottom: 100rpx;
    box-sizing: border-box;
}
/* 动态 */
.dynamic-item {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 16rpx;
}
.dynamic-top {
    display: flex;
    margin-bottom: 20rpx;
}
.touxiang-box {
    width: 84rpx;
    height: 84rpx;
    position: relative;
}
.my-touxiang {
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
}
.sex {
    width: 30rpx;
    height: 28rpx;
    position: absolute;
    right: 4rpx;
    bottom: 4rpx;
}
.my-info-box {
    width: 0;
    flex: 1;
    height: 84rpx;
    margin-left: 20rpx;
}
.name-box {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #2196f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
}
.set {
    width: 30rpx;
    height: 8rpx;
}
.autograngh {
    width: 80%;
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 28rpx;
    color: #f4433673;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.dynamic-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 40rpx;
    color: #333333;
    word-break: break-all;
    word-wrap: break-word;
}
.dynamic-img-list {
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
}
.dynamic-img-item {
    width: 180rpx;
    height: 180rpx;
    /* object-fit: cover; */
    margin-right: 30rpx;
    margin-top: 20rpx;
}
/* .dynamic-img-list .dynamic-img-item:nth-child(3n){
  margin-right: 0;
} */
.dynamic-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
}
.dynamic-time {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
}
.dynamic-zan-box {
    height: 28rpx;
    display: flex;
}
.comment {
    display: flex;
    align-items: center;
}
.dianzan {
    margin-left: 30rpx;
}
.comment-text {
    margin-left: 14rpx;
}
.no-dynamic {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-dynamic-img {
    width: 632rpx;
    height: 368rpx;
}

.no-dynamic-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42rpx;
    color: #000;
    opacity: 1;
    margin-top: 40rpx;

    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29rpx;
    color: #999999;
}
</style>
