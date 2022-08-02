<template>
    <view>
        <!-- pages/smallShop/Scart/Scart.wxml -->

        <view class="index">
            <image class="xiaoxingxing" :animation="animation1" src="/static/pages/img/smallShop/1.png"></image>
            <image class="xiaoxingxing" :animation="animation1" style="left: 660rpx" src="/static/pages/img/smallShop/2.png"></image>
            <image class="xiaoxingxing" :animation="animation1" style="left: 680rpx" src="/static/pages/img/smallShop/3.png"></image>
            <menu :navs="navs" :cartnum="cartNum" />
            <view class="index-head">
                <view class="index-head-left">
                    <image :src="userInfoSj.headImgUrl" mode="aspectFill" class="index-head-left-img"></image>
                    <view class="index-head-left-info">
                        <view class="index-head-left-info-name">{{ userInfoSj.nickName }}的小店</view>
                        <view class="index-head-left-info-desc">
                            <view class="index-head-left-info-desc-text">人缘口碑</view>
                            <view class="index-head-left-info-desc-starList">
                                <image src="/static/pages/img/smallShop/star_s.png" class="index-head-left-info-desc-starItem" v-for="(item, index) in 5" :key="index"></image>
                            </view>
                        </view>
                        <view class="index-head-left-info-desc">
                            <view class="index-head-left-info-desc-text">颜值指数</view>
                            <view class="index-head-left-info-desc-starList">
                                <image src="/static/pages/img/smallShop/star_s.png" class="index-head-left-info-desc-starItem" v-for="(item, index) in 5" :key="index"></image>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="index-head-right">
                    <view class="index-head-right-item" style="margin-left: 0rpx">
                        <view class="index-head-right-item-upText">点赞数</view>
                        <image src="/static/pages/img/smallShop/like.png" class="index-head-right-item-icon" :animation="animation"></image>
                        <view class="index-head-right-item-downText">{{ userInfoSj.praise }}</view>
                    </view>
                    <view class="index-head-right-item" @tap="share">
                        <view class="index-head-right-item-upText">分享</view>
                        <image src="/static/pages/img/smallShop/shop_icon.png" class="index-head-right-item-icon"></image>
                    </view>
                    <view class="index-head-right-item">
                        <view class="index-head-right-item-upText">收藏数</view>
                        <image src="/static/pages/img/smallShop/star_b.png" class="index-head-right-item-icon"></image>
                        <view class="index-head-right-item-downText" v-if="countFavoriteUser > 0">{{ countFavoriteUser }}</view>
                    </view>
                </view>
            </view>
            <view class="index-content">
                <!-- <view class="index-content-title">
      <view class="index-content-title-recommend">推荐</view>
      <image src="/pages/img/smallShop/star.png" wx:if="{{!isFavorite}}" bindtap="operaFavorite" class="index-content-title-icon"></image>
      <image src="/pages/img/smallShop/star_b.png" wx:if="{{isFavorite}}" bindtap="operaFavorite" class="index-content-title-icon"></image>
      <view class="index-content-title-text" wx:if="{{isFavorite}}">您已收藏小店</view>
      <view class="index-content-title-text" wx:if="{{!isFavorite}}" bindtap="operaFavorite">收藏TA的小店</view>
    </view> -->
                <view class="index-content-title" v-if="userList.length">
                    <view style="display: flex; align-items: center">
                        <!-- <van-icon name="browsing-history" color="#f5a283"  size="50rpx" /> -->
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
                <scroll-view
                    :scroll-y="true"
                    class="index-content-content"
                    :refresher-enabled="true"
                    @scrolltolower="goodsTobottom"
                    @refresherrefresh="refrenshHotSale"
                    :refresher-triggered="isLoad"
                >
                    <view class="index-content-content-data">
                        <view class="store-no-good" v-if="goodsList.length == 0">
                            <image class="no-data-img" style="width: 326rpx; height: 278rpx; margin-top: 60rpx" src="https://xssj.letterbook.cn/applet/images/no_shop.png"></image>
                            <view class="no-good-text">您的小店还没有商品</view>
                        </view>

                        <view
                            class="index-content-content-data-item"
                            :url="
                                '/pages/Index/GoodsDetails/GoodsDetails?id=' +
                                item.commodityId +
                                '&sid=' +
                                item.tempSpecId +
                                '&pid=' +
                                item.saleUniqueId +
                                '&form=store&storeId=' +
                                storeId
                            "
                            v-for="(item, index) in goodsList"
                            :key="index"
                        >
                            <image
                                v-if="item.isHotSale"
                                src="/static/pages/img/smallShop/hot_bg.png"
                                style="width: 160rpx; height: 160rpx; position: absolute; right: 0; top: 0; z-index: 99"
                            ></image>

                            <image :src="item.imagList[0]" class="index-content-content-data-item-logo" mode="aspectFill">
                                <view class="count-down-box" v-if="!item.ishide">
                                    <text style="margin: 0 14rpx">活动倒计时</text>
                                    <van-count-down :time="item.countdown" @finish="finishedCountDown($event, { idx: index })" :data-idx="index" format=" HH : mm : ss " />
                                </view>
                            </image>

                            <view class="index-content-content-data-item-info">
                                <view class="index-content-content-data-item-info-name">{{ item.commodityName }}</view>
                                <view class="index-content-content-data-item-info-foot">
                                    <view class="index-content-content-data-item-info-foot-price">¥{{ item.activityType ? item.lowPrice : item.originalPrice }}</view>
                                    <view class="scartDel">
                                        <!-- <image  bindtap="shareScart" data-source="{{item}}" src='/pages/img/smallShop/share.png' style="width:32rpx;height:32rpx;margin-right:40rpx;"></image> -->
                                        <image @tap="showManagement" :data-source="item" src="/static/pages/img/smallShop/guanli.png" style="width: 32rpx; height: 32rpx"></image>
                                    </view>
                                </view>
                            </view>

                            <!-- 管理商品 -->

                            <view class="management-container" v-if="item.showManage">
                                <view class="management-item management-item-bottom" @tap="setHot">
                                    <image src="/static/pages/img/smallShop/hot.png" style="width: 32rpx; height: 32rpx; margin: 0 30rpx 0 14rpx"></image>
                                    <view class="management-text">{{ item.isHotSale ? '取消热销' : '设为热销' }}</view>
                                </view>
                                <!-- <view class="management-item management-item-bottom" bindtap="setActivity">
              <image src="/pages/img/smallShop/setmanage.png" style="width:32rpx;height:32rpx;margin:0 30rpx 0 14rpx"></image>
              <view class="management-text">设置抢购</view>
            </view> -->
                                <view class="management-item" @tap="delScart">
                                    <image src="/static/pages/img/scartDel.png" style="width: 32rpx; height: 32rpx; margin: 0 30rpx 0 14rpx"></image>
                                    <view class="management-text">移除商品</view>
                                </view>
                            </view>

                            <!-- end index-content-content-data-item-info -->
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="foot">
            <view class="foot_table me-fx-row">
                <view class="me-fx-col me-fx-1 me-fx-c-c br-r" @tap="goSmallIndex">
                    <image class="foot_table_img" src="/static/static/image/tabbar/tabbar_01.png"></image>
                    <text>首页</text>
                </view>
                <view class="me-fx-col me-fx-1 me-fx-c-c" @tap="goScart">
                    <image class="foot_table_img" src="/static/static/image/tabbar/scartHover.png"></image>
                    <text class="cur">小店</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();

const time = require('../../../utils/util');

export default {
    data() {
        return {
            name: '',
            userInfo: {},
            isLoad: false,

            userInfoSj: {
                headImgUrl: '',
                nickName: '',
                praise: ''
            },

            storeId: '',
            storeData: {},

            //小店的参数
            goodsList: '',

            selectGoods: {},

            // 选中的商品
            userList: [1, 2, 3],

            toBottom: false,

            // 小店商品是否触底
            pageCurr: 1,

            pageSize: 10,
            useStore: true,
            animation1: '',
            navs: [],
            cartNum: 0,
            animation: '',
            countFavoriteUser: 0
        };
    },
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
    onPullDownRefresh: function () {
        this.setData({
            name: '',
            userInfo: {},
            userInfoSj: {},
            storeId: '',
            storeData: {},
            //小店的参数
            goodsList: '',
            userList: [1, 2, 3],
            toBottom: false,
            // 小店商品是否触底
            pageCurr: 1,
            pageSize: 10
        });
        this.onLoadClone3389({});
    },
    methods: {
        onLoadClone3389: function (options) {
            const storeId = uni.getStorageSync('storeId');
            this.setData({
                storeId: storeId || 'storeId is undefiner'
            });
            this.getMyInfo();
            this.getScartData();
        },

        getMyInfo() {},
        getScartData() {},

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

        // 关闭管理
        closeManage() {
            this.goodsList.forEach((item) => {
                item.showManage = false;
            });
            this.setData({
                goodsList: this.goodsList
            });
        },

        // 小店 设置抢购
        setActivity() {
            var item = this.selectGoods;
            uni.navigateTo({
                url: `/pages/smallShop/setSale/setSale?id=${item.id}&goodsImg=${item.imagList[0]}&originalPrice=${item.originalPrice}&lowPrice=${item.lowPrice}&commodityName=${item.commodityName}&isPromotion=${item.isPromotion}`
            });
            this.closeManage();
        },

        // 设为热销
        setHot() {},

        // 小店 删除商品
        delScart() {},

        goSmallIndex() {
            uni.redirectTo({
                url: '/pages/smallShop/exclusive/exclusive'
            });
        },

        goodsTobottom() {
            if (!this.toBottom) {
                this.getScartData();
            }
        },

        share() {
            // let storeId =  wx.getStorageSync('storeId');
            // wx.navigateToMiniProgram({
            //     appId:'wx132b20834f422e55',
            //     path:'/pages/smallShop/myShop/myShop?storeId='+storeId,
            // });
            return;
            var that = this;
            uni.requestSubscribeMessage({
                tmplIds: [app.globalData.fx_sale, app.globalData.fx_order_sale_refund, app.globalData.fx_order_sale],
                complete: function (res) {
                    let cout = that.goodsList;

                    if (cout.length == 0) {
                        uni.showToast({
                            title: '请进入首页，添加商品！',
                            icon: 'none',
                            duration: 1000
                        });
                    } else {
                        uni.navigateTo({
                            url: '../../retail/PosterScart/PosterScart?share="share"'
                        });
                    }
                }
            });
        },

        shareScart(e) {
            let that = this;
            let data = e.currentTarget.dataset.source;
            let cdata = this;
            let salesUserId = cdata.userInfoSj.salesUserId;
            let saleUniqueId = data.saleUniqueId;
            let commodityid = data.commodityId;
            let tempskuid = data.tempSpecId;
            let storeId = uni.getStorageSync('storeId');
            uni.requestSubscribeMessage({
                tmplIds: [app.globalData.fx_sale, app.globalData.fx_order_sale_refund, app.globalData.fx_order_sale],
                complete: function (res) {
                    uni.navigateTo({
                        url: `../../retail/Poster/Poster?commodityId=${commodityid}&tempSkuId=${tempskuid}&storeId=${storeId}&salesUserId=${salesUserId}&saleUniqueId=${saleUniqueId}`
                    });
                }
            });
        },

        showManagement(e) {
            let item = e.currentTarget.dataset.source;
            this.goodsList.forEach((res) => {
                if (res.id == item.id) {
                    res.showManage = !res.showManage;
                } else {
                    res.showManage = false;
                }
            });
            this.setData({
                goodsList: this.goodsList,
                selectGoods: item
            });
        },

        refrenshHotSale() {
            // 刷新商品
            uni.showLoading({
                title: '刷新中'
            });

            if (this._freshing) {
                return;
            }

            this._freshing = true;
            setTimeout(async () => {
                this.setData({
                    pageCurr: 1,
                    toBottom: false,
                    goodsList: [],
                    isLoad: false
                });
                await this.getScartData();
                uni.showToast({
                    title: '刷新成功',
                    icon: 'none'
                });
                this._freshing = false;
            }, 1000);
        },

        goScart() {
            console.log('占位：函数 goScart 未声明');
        }
    }
};
</script>
<style>
/* pages/smallShop/Scart/Scart.wxss */
.index {
    background-color: #f9f9f9;
    padding: 0 30rpx;
    box-sizing: border-box;
    min-height: 100vh;
}
.index-head {
    background: #cd4c4c;
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
/* .index-content-title{
    display: flex;
    width: fit-content;
    margin-top: 27rpx;
  } */
.index-content-title {
    background: #fff;
    margin: 5rpx;
    margin-top: 20rpx;
    border-radius: 20rpx;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
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
    height: calc(100vh - 310rpx);
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
.store-no-good {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-data-img {
    width: 326rpx;
    height: 278rpx;
    margin-top: 60rpx;
}
.no-good-text {
    font-size: 28rpx;
    color: 999;
    margin-top: 40rpx;
}
.index-content-content-data-item {
    width: 330rpx;
    background: #ffffff;
    margin-top: 20rpx;
    border: 1rpx solid #e8e8e8;
    box-shadow: 0rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.04);
    border-radius: 10rpx;
    position: relative;
}
.index-content-content-data-item-logo {
    width: 100%;
    height: 350rpx;
    border-radius: 10rpx;
    position: relative;
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
.index-content-content-data-item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 17rpx 13rpx 16rpx 19rpx;
    box-sizing: border-box;
    width: 100%;
}
.index-content-content-data-item-info-name {
    width: 100%;
    font-size: 25rpx;
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
/* 管理商品 */
.management-container {
    width: 220rpx;
    height: 120rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 20rpx;
    position: absolute;
    bottom: 80rpx;
    right: 30rpx;
}
.management-item {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
}
.management-item-bottom {
    box-sizing: border-box;
    border-bottom: 2rpx solid #e4e4e4;
}
.management-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}

.xiaoxingxing {
    width: 20rpx;
    height: 20rpx;
    position: absolute;
    top: 60rpx;
    left: 640rpx;
    opacity: 0;
}
.scartDel {
    display: inline;
}

.foot {
    height: 160rpx;
    background-color: #f9f9f9;
}
.foot_table {
    border-top: 1px solid #e3e3e3;
    font-size: 24rpx;
    height: 100rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    color: #999;
}
.foot_table > view {
    justify-content: space-between;
    padding-top: 5rpx;
}
.foot_table_img {
    width: 60rpx;
    height: 60rpx;
}
.cur {
    color: #cd4c4c;
}
</style>
