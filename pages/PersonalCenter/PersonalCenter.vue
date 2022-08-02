<template>
    <view>
        <view class="index-container" style="background-image: url(https://xssj.letterbook.cn/applet/images/index_bg_img.png)">
            <!-- 首页 -->
            <view class="home-container" v-if="text == '首页'">
                <!-- 头部 -->
                <view class="home-top-container" :style="'height:' + statusAllHeight + 'px'">
                    <view class="home-statu-container" :style="'height:' + statusBarHeight + 'px'"></view>
                    <view class="search-container" :style="'height:' + menuButtonHeight + 'px'">
                        <navigator class="search-container-box" :style="'height:' + menuHeight + 'px'" url="/pages/Index/searchShop/searchShop">
                            <van-icon name="search" color="#fff" size="28rpx" style="margin-left: 24rpx; margin-right: 20rpx" />
                            <text class="search-text">请输入商家名称</text>
                        </navigator>
                    </view>
                </view>
                <!-- 店铺卡片 -->
                <view class="home-store-container">
                    <!-- <view class="home-store-container-bg"></view> -->
                    <no-data text="快去关注商家吧~" url="https://xssj.letterbook.cn/applet/images/home_empty_bg.png" v-if="!followsList.length"></no-data>
                    <swiper class="home-swiper-container" :circular="false" @change="changeStore">
                        <block v-for="(item, index) in followsList" :key="index">
                            <swiper-item>
                                <view class="home-swiper-item" @tap="toStore" :data-id="item.id">
                                    <image :src="item.homeImg[0].httpAddress" class="store-img" mode="aspectFill">
                                        <view class="store-name-container">
                                            <!-- 商家名字 -->
                                            <view class="store-name-top">
                                                <view class="store-name">{{ item.nickName }}</view>
                                                <view class="store-level-list">
                                                    <van-icon name="star" color="#FBE945" size="24rpx" v-for="(item, index1) in 5" :key="index1"></van-icon>
                                                </view>
                                                <text class="store-score">5分</text>
                                                <view class="store-top-solid"></view>
                                                <view class="store-visitor">{{ item.accessNumber }}访问数</view>
                                            </view>
                                            <!-- 标签列表 -->
                                            <view class="label-list">
                                                <view class="label-item" v-for="(item, index1) in item.labelsList" :key="index1">{{ item }}</view>
                                            </view>
                                        </view>
                                    </image>
                                    <!-- 卡片内容 -->
                                    <view class="home-card-content">
                                        <!-- 商家信息 -->
                                        <view class="home-info-box">
                                            <view class="home-info-item">
                                                <image src="/static/pages/img/my/ic_clock.png" class="home-info-icon" />
                                                <text>营业时间: {{ item.openingTime }}-{{ item.closingTime }}</text>
                                                <image src="/static/pages/img/my/yirenzheng.png" style="width: 132rpx; height: 40rpx; margin-left: 8rpx"></image>
                                                <image src="/static/pages/img/my/yiguanzhu.png" style="width: 132rpx; height: 40rpx; margin-left: 8rpx"></image>
                                                <image src="/static/pages/img/index/home_to_store.png" style="width: 118rpx; height: 40rpx; margin-left: 8rpx"></image>
                                            </view>
                                            <view class="home-info-item">
                                                <image src="/static/pages/img/my/ic_dz.png" class="home-info-icon" />
                                                <text class="address-text">{{ item.entirelyAddress }}</text>
                                            </view>
                                            <view class="home-info-item" style="align-items: flex-start">
                                                <image src="/static/pages/img/my/ic_introduce.png" class="home-info-icon" style="margin-top: 4rpx" />
                                                <text class="more-introduce">{{ item.brief }}</text>
                                            </view>
                                        </view>
                                        <!-- 商品列表 -->
                                        <scroll-view scroll-y class="index-goods-box" style="">
                                            <view class="index-goods-list">
                                                <view
                                                    class="index-goods-item"
                                                    @tap.stop.prevent="toDetails"
                                                    :data-id="gitem.id"
                                                    v-for="(gitem, index1) in item.promotionList"
                                                    :key="index1"
                                                >
                                                    <image class="index-goods-img" :src="gitem.thumbnail" mode="aspectFill"></image>

                                                    <view class="index-goods-content">
                                                        <view class="index-goods-name">{{ gitem.commodityName }}</view>
                                                        <view class="index-goods-description">{{ gitem.description }}</view>
                                                        <view class="index-goods-price-box">
                                                            <view class="index-goods-price">
                                                                <text style="font-size: 18rpx">￥</text>
                                                                {{ gitem.originalPrice }}
                                                            </view>
                                                            <view class="index-goods-btn">看一看</view>
                                                        </view>
                                                    </view>
                                                </view>
                                            </view>
                                        </scroll-view>

                                        <!-- 商品列表 -->
                                        <!-- <view class="home-goods-list">
                  <swiper  display-multiple-items="{{item.promotionList.length>=4?4:item.promotionList.length}}" autoplay="{{true}}" interval="{{2000}}" style="width:100%;height:100%;display: flex;">
                    <block wx:for="{{item.promotionList}}" wx:key="index" wx:for-item="gitem">
                      <swiper-item class="goods-item">
                        <image class="home-goods-img" src="{{gitem.thumbnail}}" mode="aspectFill"></image>
                        <view class="home-goods-name">{{gitem.commodityName}}</view>
                        <view class="home-goods-price">
                          <text style="font-size:18rpx">￥</text>{{gitem.originalPrice}}
                        </view>
                      </swiper-item>
                    </block>
                  </swiper>
                </view> -->
                                        <!-- 商家动态 -->
                                        <!-- 没有动态时 -->
                                        <!-- <view class="home-no-dynamic"  wx:if="{{!item.commentList[0]}}">
                  <image style="width:370rpx;height:218rpx" src="https://xssj.letterbook.cn/applet/images/no_store_dynamic.png"></image>
                  <text>商家未发布订阅通知动态</text> -->
                                        <!-- </view> -->
                                        <!-- 有动态时 -->
                                        <!-- <view class="home-dynamic-box" wx:else>
                  <view class="store-dynamic-list">
                    <view class="store-dynamic-item">
                      <view class="dynamic-content-container">
                        <view class="dynamic-content-container-top">
                          <image src="{{item.commentList[0].userInfo.logoPic}}" style="width:60rpx;height:60rpx;border-radius: 50%;"></image>
                          <view class="dynamic-content-container-top-name">{{item.commentList[0].userInfo.nickname}}</view>
                        </view>
                        <view class="dynamic-content-container-content">{{item.commentList[0].content}}</view>
                        <scroll-view scroll-x="true" style="width:100%">
                          <view class="dynamic-content-container-img-list">
                            <image class="dynamic-content-container-img-item" mode="aspectFill" src="{{item}}" wx:for="{{item.commentList[0].imagList}}" wx:key="index"></image>
                          </view>
                        </scroll-view>
                      </view>
                      <view class="dynamic-goods-container" wx:if="{{item.commentList[0].commodity}}" catchtap="toBuy" data-id="{{item.commentList[0].commodity.id}}">
                        <image src="{{item.commentList[0].commodity.thumbnail}}" class="dynamic-goods-container-img" mode="aspecFill"></image>
                        <view class="dynamic-goods-container-content">
                          <view class="dynamic-goods-container-name">{{item.commentList[0].commodity.commodityName}}</view>
                          <view class="dynamic-goods-container-price">
                            <text>￥{{item.commentList[0].commodity.activityType==1||(item.commentList[0].commodity.activityType==2&&item.commentList[0].commodity.isMember)?item.commentList[0].commodity.lowPrice:item.commentList[0].commodity.originalPrice}}</text>
                            <view class="dynamic-goods-container-btn">看一看</view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view> -->
                                    </view>
                                </view>
                            </swiper-item>
                        </block>
                    </swiper>
                </view>
                <!-- tabbar栏 -->
                <view class="home-bottom-container">
                    <view class="home-bottom-item">
                        <image
                            style="width: 104rpx; height: 52rpx"
                            :src="text == '首页' ? 'https://xssj.letterbook.cn/applet/images/home_tabbar1_active.png' : 'https://xssj.letterbook.cn/applet/images/home_tabbar1.png'"
                        ></image>
                    </view>
                    <view class="home-bottom-item" @tap="changeTabbar" data-text="我的">
                        <image style="width: 104rpx; height: 52rpx" src="https://xssj.letterbook.cn/applet/images/home_tabbar2.png"></image>
                    </view>
                </view>
            </view>
            <!-- 我的 -->
            <view class="home-my-container" v-if="text == '我的'">
                <!-- 头部 -->
                <view class="home-top-container" :style="'height:' + statusAllHeight + 'px'">
                    <view class="home-statu-container" :style="'height:' + statusBarHeight + 'px'"></view>
                </view>
                <!-- 信息 -->
                <view class="user-info">
                    <image :src="userInfo.headimgurl || 'https://xssj.letterbook.cn/applet/images/xs_auth_logo.png'" class="user-img"></image>
                    <view class="pc_name">
                        <view class="pc_name-text">
                            {{ userInfo.nickname || '请点击登录' }}
                            <navigator url="/pages/PersonalCenter/setUp/setUp" class="system-notice-icon-container" style="right: 120rpx">
                                <image style="width: 40rpx; height: 44rpx" src="/static/pages/img/setup.png"></image>
                            </navigator>
                            <navigator url="/pages/Notice/Notice" class="system-notice-icon-container">
                                <image style="width: 44rpx; height: 44rpx" src="/static/pages/img/my/system_notice_icon.png"></image>
                                <view class="noticeNum" v-if="orderNum.sumCount > 0">{{ orderNum.sumCount }}</view>
                            </navigator>
                        </view>
                        <navigator url="/pages/Modify/Modify">
                            <view style="width: 90%; font-size: 20rpx; padding-top: 6rpx">{{ userInfo.signature == null ? '点击设置个性签名' : userInfo.signature }}</view>
                        </navigator>
                    </view>
                </view>
                <!-- 工具 -->
                <view class="home-tool-box">
                    <navigator class="home-tool-item" url="/pages/order/orderList/orderList?activeTab=2">
                        <image src="/static/pages/img/my/home_tool_1.png"></image>
                        <view class="home-tool-item_text">物流配送</view>
                        <view class="tool-num" v-if="countData.citywideOrderState">{{ countData.citywideOrderState }}</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/order/orderListCity/orderListCity">
                        <image src="/static/pages/img/my/home_tool_2.png"></image>
                        <view class="home-tool-item_text">同城配送</view>
                        <view class="tool-num" v-if="countData.sendState">{{ countData.sendState }}</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/order/orderListTake/orderListTake">
                        <image src="/static/pages/img/my/home_tool_3.png"></image>
                        <view class="home-tool-item_text">预订/自取</view>
                        <view class="tool-num" v-if="countData.fetchState">{{ countData.fetchState }}</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/member/list/list">
                        <image src="/static/pages/img/my/home_tool_4.png"></image>
                        <view class="home-tool-item_text">我的卡包</view>
                    </navigator>
                    <navigator url="/pages/order/goodsCommentList/goodsCommentList" class="home-tool-item">
                        <image src="/static/pages/img/my/home_tool_5.png"></image>
                        <view class="home-tool-item_text">我的评价</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/Index/ShopCart/ShopCart">
                        <image src="/static/pages/img/my/home_tool_6.png"></image>
                        <view class="home-tool-item_text">购物车</view>
                        <view class="tool-num" v-if="countData.countTrolley">{{ countData.countTrolley }}</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/smallShop/favorites/favorites">
                        <image src="/static/pages/img/my/home_tool_7.png"></image>
                        <view class="home-tool-item_text">小店收藏</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/PersonalCenter/followsList/followsList">
                        <image src="/static/pages/img/my/home_tool_8.png"></image>
                        <view class="home-tool-item_text">我的关注</view>
                    </navigator>
                    <navigator class="home-tool-item" url="/pages/activity/pmhd/pmEnter/pmEnter">
                        <image src="/static/pages/img/my/home_tool_9.png"></image>
                        <view class="home-tool-item_text">我的拍卖</view>
                        <view class="tool-num" v-if="pmNum">{{ pmNum }}</view>
                    </navigator>
                </view>
                <!-- 我的足迹 -->
                <view class="follow-container" :style="lookedList.length ? '' : 'visibility:hidden'">
                    <image class="follow-title" src="/static/pages/img/my/looked_store_title.png">我的足迹</image>
                    <scroll-view :scroll-y="true" style="height: 46vh">
                        <view class="follow-list">
                            <view class="follow-list-cell van-swipe-cell" v-for="(item, index) in lookedList" :key="index">
                                <view @tap="toStore" :data-id="item.id" class="follow-item-box">
                                    <view class="looked-box">
                                        <view class="big-dot">
                                            <view class="small-dot"></view>
                                        </view>
                                        <view class="looked-time">{{ item.updateTime }}</view>
                                    </view>
                                    <view class="follow-item looked-item">
                                        <view style="display: flex">
                                            <image class="touxiang" :src="item.logoPic" mode="aspectFill"></image>
                                            <view class="follow-content">
                                                <view style="display: flex; margin: 14rpx 0 12rpx; align-items: center">
                                                    <view class="follow-name">{{ item.nickName }}</view>
                                                </view>
                                                <view class="follow-content-info">
                                                    <view class="follow-star-list" v-for="(item, index1) in 5" :key="index1">
                                                        <image style="width: 20rpx; height: 20rpx; margin-right: 2rpx" src="/static/pages/img/my/star.png"></image>
                                                    </view>
                                                    <text style="font-size: 22rpx; font-weight: 400; line-height: 30rpx; color: #da502d; height: 30rpx; margin-left: 4rpx">
                                                        5分
                                                    </text>
                                                    <view style="width: 1px; height: 19rpx; background: #d2d2d2; margin-left: 8rpx; margin-right: 8rpx"></view>
                                                    <view class="looked-man">{{ item.accessNumber || 0 }}访问数</view>
                                                </view>
                                                <view class="label-list">
                                                    <view class="label-item" v-for="(item, index1) in item.labels" :key="index1">{{ item }}</view>
                                                </view>
                                            </view>
                                        </view>
                                        <view class="follow-content-botton">简介:{{ item.brief }}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <!-- tabbar -->
                <view class="home-bottom-container">
                    <view class="home-bottom-item" @tap="changeTabbar" data-text="首页">
                        <image style="width: 104rpx; height: 52rpx" src="https://xssj.letterbook.cn/applet/images/home_tabbar1.png"></image>
                    </view>
                    <view class="home-bottom-item">
                        <image
                            style="width: 104rpx; height: 52rpx"
                            :src="text == '我的' ? 'https://xssj.letterbook.cn/applet/images/home_tabbar2_active.png' : 'https://xssj.letterbook.cn/applet/images/home_tabbar2.png'"
                        ></image>
                    </view>
                </view>
            </view>
        </view>
        <navigator v-if="buton" url="/pages/shopHome/home/home" class="butt">授权登录</navigator>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// import vanIcon from './@vant/weapp/icon/index';
// pages/PersonalCenter/PersonalCenter.js
const app = getApp();

const time = require('../../utils/util');

export default {
    components: {
        noData,
        // vanIcon
    },
    data() {
        return {
            followsList: [],

            // 关注列表
            lookedList: [],

            // 浏览列表
            userInfo: [],

            // 用户信息
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
            pageCurr: 1,

            stopLoad: false,
            buton: false,
            firstIn: true,
            text: '首页',

            // tabbar状态
            // 拍卖数量
            pmNum: 0,

            cartNum: '',

            countData: {
                citywideOrderState: '',
                sendState: '',
                fetchState: '',
                countTrolley: ''
            },

            gitem: {
                id: '',
                thumbnail: '',
                commodityName: '',
                description: ''
            },

            orderNum: {
                sumCount: 0
            }
        };
    },
    onLoad: function (options) {
        var that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    if (uni.getStorageSync('token')) {
                        that.setData({
                            buton: false,
                            text: '首页'
                        });
                    } //用户已授权

                    that.userIf();
                    that.getFollows();
                    that.getLookedList();
                    that.getCartNum();
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
                        text: '我的',
                        buton: true
                    }); //用户没有授权
                }
            }
        });
    },
    onShow: function (options) {
        const token = uni.getStorageSync('token');

        if (!this.firstIn) {
            this.getLookedList();
            this.getState();

            if (token) {
                this.getPmNum();
            }
        }
    },
    onReady: function () {},
    methods: {
        // 获取关注
        getFollows() {
            uni.showLoading({
                title: '加载中,请稍后'
            });
            let data = {
                pageCurr: this.pageCurr,
                pageSize: 10
            };
            app.globalData.sjrequest('/marchant/queryConcerns', data).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.length < 10) {
                        this.setData({
                            stopLoad: true
                        });
                    }

                    this.setData({
                        followsList: this.followsList.concat(res.data.data),
                        pageCurr: this.pageCurr + 1
                    });
                    uni.hideLoading();
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 获取足迹
        getLookedList() {
            return app.globalData.sjrequest('/marchant/queryFootprintList').then((res) => {
                res.data.data.forEach((item) => {
                    item.updateTime = time.formatTimeSec(item.updateTime);
                });
                this.setData({
                    lookedList: res.data.data
                });
            });
        },

        //获得购物车数量
        getCartNum() {
            app.globalData.sjrequest('/commodity/countTrolley', {}).then((res) => {
                var countTrolley = res.data.data.countTrolley;
                this.setData({
                    cartNum: countTrolley
                });
            });
        },

        //用户信息
        userIf: function () {
            var that = this;
            app.globalData.sjrequest('/userRegister/queryUserInfo').then((res) => {
                if (res.data.code == 200) {
                    uni.setStorage({
                        key: 'signature',
                        data: res.data.data.signature
                    });

                    if (res.data.data.phoneNumber) {
                        uni.setStorage({
                            key: 'userPhone',
                            data: res.data.data.phoneNumber
                        });
                    }

                    that.setData({
                        userInfo: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        changeStore(e) {
            let idx = e.detail.current;

            if (idx == this.followsList.length - 2 && !this.stopLoad) {
                this.getFollows();
            }
        },

        editSignature: function () {
            uni.navigateTo({
                url: '../Modify/Modify'
            });
        },

        // 跳店铺
        toStore(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + id
            });
        },

        // 改变tabbar
        changeTabbar(e) {
            let text = e.currentTarget.dataset.text;
            this.setData({
                text: text
            });

            if (text == '首页') {
                this.initData();
                this.getFollows();
            }
        },

        toBuy(e) {
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.id
            });
        },

        /**
         * 生命周期函数--监听页面加载
         */
        initData() {
            this.setData({
                pageCurr: 1,
                stopLoad: false,
                followsList: []
            });
        },

        toStore(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + id
            });
        },

        toDetails(e) {
            let id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id
            });
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        // 获取状态
        getState() {
            return app.globalData.sjrequest('/basic/queryCountData', {}).then((res) => {
                this.setData({
                    countData: res.data.data
                });
            });
        },

        //获取拍卖数量
        getPmNum() {
            app.globalData.request.auctionRequest('/bidding/orderAndBiddingCount', {}).then((res) => {
                this.setData({
                    pmNum: res.data.data
                });
            });
        }
    }
};
</script>
<style>
.index-container {
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/* 首页 */
.home-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
/* 搜索框 */
.home-top-container {
    width: 100%;
}
.home-statu-container {
    width: 100%;
}
.search-container {
    width: 100%;
    display: flex;
    align-items: center;
}
.search-container-box {
    width: 484rpx;
    height: 64rpx;
    background: rgba(228, 228, 228, 0.3);
    border-radius: 16rpx;
    margin-left: 30rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}
/* 店铺卡片 */
.home-store-container {
    width: 710rpx;
    height: 80vh;
    /* background-color: #fff; */
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.home-store-container-bg {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(-2deg);
}
.home-swiper-container {
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
    position: absolute;
    left: 0;
    top: 0;
}
.home-swiper-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
}
.store-img {
    width: 100%;
    height: 30vh;
    vertical-align: bottom;
    position: relative;
}
/* 商家名字 */
.store-name-container {
    width: 100%;
    height: 98rpx;
    background: rgba(0, 0, 0, 0.32);
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 14rpx;
    box-sizing: border-box;
}
.store-name-top {
    width: 100%;
    margin-left: 6rpx;
    display: flex;
    align-items: flex-end;
}
.store-name {
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #ffffff;
}
.store-level-list {
    height: 28rpx;
    line-height: 28rpx;
    margin: 0 4rpx 4rpx 12rpx;
}
.store-score {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #fbe945;
}
.store-top-solid {
    width: 2rpx;
    height: 22rpx;
    background-color: #fff;
    margin: 0 12rpx 4rpx;
}
.store-visitor {
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #ffffff;
}
/* 标签列表 */
.label-list {
    width: 100%;
    display: flex;
    margin-top: 16rpx;
}
.label-item {
    width: fit-content;
    height: 40rpx;
    background: #f1ebd3;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #274636;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6rpx;
    margin-right: 8rpx;
}
/* 卡片内容 */
.home-card-content {
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10rpx 8rpx;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.32);
    box-sizing: border-box;
}
/* 商家信息 */
.home-info-box {
    width: 100%;
    height: 11vh;
    background: #ffffff;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 14rpx;
    padding: 6rpx 12rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    font-family: SF UI Text;
    font-weight: 400;
    color: #783705;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.home-info-item {
    width: 100%;
    display: flex;
    align-items: center;
}
.home-info-icon {
    width: 24rpx;
    height: 24rpx;
    margin-right: 10rpx;
}
.address-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.more-introduce {
    flex: 1;
    max-height: 60rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
/* 商品列表 */
.index-goods-box {
    width: 100%;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 8rpx;
    height: 36vh;
    padding: 0 12rpx;
    box-sizing: border-box;
}
.index-goods-list {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0rpx;
    box-sizing: border-box;
}
.index-goods-item {
    width: 330rpx;
    height: 124rpx;
    margin-right: 10rpx;
    margin-bottom: 16rpx;
    display: flex;
    align-items: center;
}
.index-goods-list .index-goods-item:nth-child(2n) {
    margin-right: 0;
}
.index-goods-img {
    width: 124rpx;
    height: 124rpx;
    background: #cccccc;
    border-radius: 8rpx;
}
.index-goods-content {
    flex: 1;
    height: 124rpx;
    margin-left: 12rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.index-goods-name {
    width: 170rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.index-goods-description {
    width: 170rpx;
    max-height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.index-goods-price-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.index-goods-price {
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #ff0000;
}
.index-goods-btn {
    width: 72rpx;
    height: 32rpx;
    background: linear-gradient(180deg, #fa5151 0%, #ff0000 100%);
    border-radius: 8rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-goods-list {
    width: 100%;
    height: 15vh;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 8rpx;
    overflow: hidden;
    padding: 0 10rpx;
    box-sizing: border-box;
}
.goods-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.home-goods-img {
    width: 124rpx;
    height: 124rpx;
    border-radius: 8rpx;
}
.home-goods-name {
    width: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.home-goods-type {
    width: 56rpx;
    height: 32rpx;
    background: linear-gradient(180deg, #fa5151 0%, #ff0000 100%);
    border-radius: 4rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.home-goods-price {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #ff0000;
}
/* 商家动态 */
/* 没有动态时 */
.home-no-dynamic {
    width: 100%;
    height: 21vh;
    background: #fff;
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 32rpx;
    color: #666666;
}
.home-dynamic-box {
    width: 100%;
    height: 21vh;
    /* background: linear-gradient(180deg, #C48D44 0%, #EDC988 24%, #C48D44 100%); */
    box-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.16);
    border-radius: 12rpx;
    padding: 10rpx 8rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.store-dynamic-list {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.store-dynamic-item {
    width: 100%;
    display: flex;
    align-items: center;
}
.store-dynamic-list .store-dynamic-item:last-child {
    margin-right: 0rpx;
}
.dynamic-content-container {
    width: 0;
    flex: 1;
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.dynamic-content-container-top {
    width: 100%;
    display: flex;
    align-items: center;
}
.dynamic-content-container-top-name {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    margin-left: 10rpx;
}
.dynamic-content-container-content {
    width: 100%;
    max-height: 68rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-top: 2rpx;
}
.dynamic-content-container-img-list {
    width: fit-content;
    height: 10vh;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 6rpx 0;
}
.dynamic-content-container-img-item {
    width: 10vh;
    height: 10vh;
    border-radius: 8rpx;
    margin-right: 18rpx;
}
.dynamic-content-container-bottom {
    width: 100%;
    height: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dynamic-content-container-bottom-time {
    width: fit-content;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 32rpx;
    color: #ffffff;
}
.dynamic-content-container-bottom-opreat-box {
    width: 146rpx;
    display: flex;
    align-items: center;
}
.dynamic-content-opreat {
    display: flex;
    align-items: center;
    height: 26rpx;
    font-size: 18rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 动态商品 */
.dynamic-goods-container {
    width: 216rpx;
    height: 20vh;
    background: #f5f5f5;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
}
.dynamic-goods-container-img {
    width: 100%;
    height: 12vh;
    background: #ffffff;
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    box-sizing: border-box;
}
.dynamic-goods-container-content {
    width: 100%;
    height: 8vh;
    padding: 4rpx 8rpx 10rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.dynamic-goods-container-name {
    width: 100%;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    margin-bottom: 10rpx;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dynamic-goods-container-text {
    width: 100%;
    max-height: 52rpx;
    font-size: 18rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.dynamic-goods-container-price {
    width: 100%;
    height: 32rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rpx;
    color: #ff0000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dynamic-goods-container-btn {
    width: 82rpx;
    height: 40rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* tabbar栏 */
.home-bottom-container {
    width: 100%;
    height: 72rpx;
    display: flex;
    padding-bottom: 30rpx;
}
.home-bottom-item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* 我的 */
.home-my-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.user-info {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10rpx;
}
.user-img {
    width: 100rpx;
    height: 100rpx;
    background-color: #fff;
    margin-left: 20rpx;
    border-radius: 50%;
}
.pc_name {
    flex: 1;
    margin-left: 28rpx;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
}
.system-notice-icon-container {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    right: 40rpx;
    top: 0rpx;
}
.noticeNum {
    width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: #06a9fd;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: -12rpx;
    right: -6rpx;
    text-align: center;
}
.pc_name-text {
    font-size: 21px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 14px;
    color: #ffffff;
    opacity: 1;
    height: 58rpx;
    position: relative;
}
/* 工具 */
.home-tool-box {
    width: 710rpx;
    height: 264rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx rgba(247, 247, 247, 0.05);
    border-radius: 16rpx;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    margin: 20rpx auto 0;
    padding: 20rpx 10rpx;
    box-sizing: border-box;
}
.home-tool-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.home-tool-item image {
    width: 64rpx;
    height: 64rpx;
}
.home-tool-item_text {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
    margin-top: 4rpx;
}
.tool-num {
    width: 30rpx;
    height: 30rpx;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    font-size: 20rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -6rpx;
    right: 25rpx;
}
/* 我的足迹 */
.follow-container {
    width: 710rpx;
    margin: 20rpx auto 8rpx;
    background: #ffffff;
    border-radius: 16rpx;
}
.follow-title {
    width: 232rpx;
    height: 46rpx;
    display: block;
    margin: 10rpx auto 0;
}
/* 我的关注 */
.follow-list {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.looked-box {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}
.follow-item-box {
    padding-top: 15rpx;
    box-sizing: border-box;
}
.big-dot {
    width: 32rpx;
    height: 32rpx;
    background: #ebebeb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.small-dot {
    width: 16rpx;
    height: 16rpx;
    background: red;
    border-radius: 50%;
}
.looked-time {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
    margin-left: 20rpx;
}
.follow-item {
    width: 100%;
    padding: 30rpx 0;
    box-sizing: border-box;
    border-bottom: 1rpx solid #ddd;
    box-sizing: border-box;
}
.looked-item {
    width: 98%;
    padding: 0;
    border: none;
    border-left: 1rpx solid #ececec;
    padding-left: 15rpx;
    margin-left: 17rpx;
    padding-bottom: 24rpx;
    box-sizing: border-box;
}
.follow-list .follow-list-cell:last-child .looked-item {
    border: none;
}
.follow-item .touxiang {
    width: 271rpx;
    height: 193rpx;
    border-radius: 14rpx;
}
.follow-content {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
}
.follow-name {
    max-width: 215rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 45rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 45rpx;
    color: #333333;
    margin-right: 20rpx;
}
.follow-content-info {
    display: flex;
    align-items: center;
}
.follow-star-list {
    display: flex;
}
.looked-man {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #333333;
}
/* 标签 */
.label-list {
    display: flex;
    flex-wrap: wrap;
}
.label-item {
    height: 32rpx;
    background: #f8ecd2;
    border-radius: 4rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #005050;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
    padding: 0 10rpx;
    margin-top: 10rpx;
}
.follow-content-botton {
    font-size: 29rpx;
    margin-top: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
