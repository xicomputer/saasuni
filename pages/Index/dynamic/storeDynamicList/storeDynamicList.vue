<template>
    <view class="comment-list">
        <!-- 没数据 -->
        <no-data v-if="!commentList.length" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img7.png"></no-data>
        <!-- 有数据 -->
        <view class="store-danamic-item" v-for="(item, index) in commentList" :key="index">
            <navigator class="store-danamic-content" hover-class="none" :url="'/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?id=' + item.id">
                <view class="store-info-box">
                    <image class="store-dynamic-logo" :src="item.userInfo.logoPic"></image>
                    <view class="store-dynamic-box-info">
                        <view class="store-dynamic-name">{{ item.userInfo.nickname }}</view>
                        <view class="store-dynamic-time">{{ item.addTime }}</view>
                    </view>

                    <image class="back" @tap.stop.prevent="toStore" src="/static/pages/img/index/dynamic_to_store.png"></image>
                    <view
                        class="dingyue-btn"
                        @tap.stop.prevent="parseEventDynamicCode($event, isSubscribe ? '' : 'showDingYue')"
                        :style="isSubscribe ? 'background-color:#e4e4e4;color:#FFF' : ''"
                    >
                        {{ isSubscribe ? '已订阅' : '+订阅' }}
                    </view>
                </view>
                <view class="store-dynamic-text">{{ item.content }}</view>
                <view class="store-dynamic-img-list">
                    <image
                        :class="item.commodity ? 'store-dynamic-img' : 'store-dynamic-img store-dynamic-big-img'"
                        @tap.stop.prevent="imgClick"
                        :data-list="item.imagList"
                        :data-src="pitem"
                        mode="aspectFill"
                        :src="pitem"
                        v-if="!((!item.commodity && index >= 1) || (item.commodity && index >= 2))"
                        v-for="(pitem, index1) in item.imagList"
                        :key="index1"
                    >
                        <view class="store-dynamic-img-more" v-if="!((item.commodity && index != 1) || (!item.commodity && index != 0))">
                            +{{ item.commodity ? item.imagList.length - 2 : item.imagList.length - 1 }}
                        </view>
                    </image>
                </view>
                <!-- 商品信息 -->
                <view class="dynamic-goods-container" v-if="item.commodity" @tap.stop.prevent="toBuy" :data-id="item.commodity.id">
                    <image :src="item.commodity.thumbnail" class="dynamic-goods-container-img" mode="aspecFill"></image>
                    <view class="dynamic-goods-container-content">
                        <view class="dynamic-goods-container-name">{{ item.commodity.commodityName }}</view>
                        <view class="dynamic-goods-container-text">{{ item.commodity.description }}</view>
                        <view class="dynamic-goods-bottom">
                            <view class="dynamic-goods-container-price">
                                <text style="font-size: 22rpx">￥</text>
                                {{
                                    item.commodity.activityType == 1 || (item.commodity.activityType == 2 && item.commodity.isMember)
                                        ? item.commodity.lowPrice
                                        : item.commodity.originalPrice
                                }}
                            </view>
                            <view class="dynamic-goods-container-btn">购买商品</view>
                        </view>
                    </view>
                </view>
            </navigator>

            <!-- <view class="store-dynamic-bottom" >
      <view class="store-dynamic-bottom-item" catchtap="{{isSubscribe?'':'showDingYue'}}">
        <image class="store-dynamic-bottom-item-icon" src="{{isSubscribe?'/pages/img/index/dynamic/dingyued.png':'/pages/img/index/dynamic/dingyue.png'}}"></image>
        <text>{{isSubscribe?'已订阅':'订阅'}}</text>
      </view>
      <navigator class="store-dynamic-bottom-item" hover-class="none" url="/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?id={{item.id}}&isFocus=true">
        <image class="store-dynamic-bottom-item-icon" src="/pages/img/index/dynamic/comment.png"></image>
        <text>{{item.reply||'评论'}}</text>
      </navigator>
      <view class="store-dynamic-bottom-item" catchtap="operationPraise" data-id="{{item.id}}" data-idx="{{index}}">
        <image class="store-dynamic-bottom-item-icon" src="{{item.isPraise?'/pages/img/index/dynamic/praised.png':'/pages/img/index/dynamic/praise.png'}}"></image>
        <text>{{item.praise||'点赞'}}</text>
      </view>
    </view> -->
        </view>
        <view v-if="stopLoad && commentList.length" class="no-more">没有更多了~</view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
const app = getApp();

const formate = require('../../../../utils/util');

export default {
    components: {
        noData
    },
    data() {
        return {
            commentList: [],

            //评论列表
            pageCurr: 1,

            stopLoad: false,
            marchantId: 0,
            status: 1,

            // 是否订阅
            isSubscribe: 0,

            pitem: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        uni.showLoading({
            title: '加载中'
        });
        this.setData({
            marchantId: options.marchantId,
            status: options.status
        });
        await this.getCommunityList();
        uni.hideLoading();
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
    onPullDownRefresh: async function () {
        uni.showLoading({
            title: '刷新中'
        });
        this.setData({
            commentList: [],
            pageCurr: 1,
            stopLoad: false
        });
        await this.getCommunityList();
        uni.stopPullDownRefresh();
        setTimeout(function () {
            uni.hideLoading({
                success() {
                    uni.showToast({
                        title: '刷新成功'
                    });
                }
            });
        }, 500);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.stopLoad) {
            this.getCommunityList();
        }
    },
    /**
     * 用户点击右上角分享
     */ methods: {
        // 点赞/取消
        operationPraise(e) {
            const { id, idx } = e.currentTarget.dataset;
            let data = {
                commentId: id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                let isPraise = 'commentList[' + idx + '].isPraise';
                let praise = 'commentList[' + idx + '].praise';

                if (this.commentList[idx].isPraise) {
                    this.commentList[idx].praise = this.commentList[idx].praise - 1;
                    this.commentList[idx].isPraise = 0;
                } else {
                    this.commentList[idx].praise = this.commentList[idx].praise + 1;
                    this.commentList[idx].isPraise = 1;
                }
            });
        },

        // 获取订阅通知列表
        getCommunityList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: this.pageCurr,
                pageSize: 10,
                stick: 1,
                isMarchant: 1
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = formate.formatTime(item.addTime);
                    });
                    this.setData({
                        pageCurr: this.pageCurr + 1,
                        isSubscribe: res.data.data[0].userInfo.subscribe,
                        commentList: [...this.commentList, ...res.data.data]
                    });

                    if (res.data.data.length < 10) {
                        this.setData({
                            stopLoad: true
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

        showDingYue() {
            // 获取用户信息
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneType: 4
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        uni.getSetting({
                            withSubscriptions: true,
                            success: (result) => {
                                uni.showToast({
                                    title: '订阅消息成功'
                                });
                                let data = {
                                    status: that.status,
                                    marchantId: that.marchantId,
                                    templateIds: tempData,
                                    appId: appid,
                                    targetType: 5
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        uni.showToast({
                                            title: '订阅消息成功'
                                        });
                                        this.$emit('event', {
                                            detail: true
                                        });
                                    } else {
                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        });
                                    }
                                });
                            }
                        });
                    },

                    fail(e) {
                        console.log(e);
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    }
                });
            });
        },

        toBuy(e) {
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.id
            });
        },

        // 跳转详情
        toDetail(e) {
            let item = JSON.stringify(e.currentTarget.dataset.item);
            uni.navigateTo({
                url: '/pages/Index/dynamic/storeDynamicDetails/storeDynamicDetails?item=' + encodeURIComponent(item)
            });
        },

        // 跳转商品详情
        toGoodsDetail(e) {
            let item = e.currentTarget.dataset.item;
            console.log(item);
            uni.navigateTo({
                url: `/pages/Index/GoodsDetails/GoodsDetails?id=${item.id}&sid=${item.tempSpecId}`
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

        //  跳转到店铺
        toStore() {
            var that = this;

            if (this.isSubscribe == 0) {
                // 如果未订阅的状态
                uni.requestSubscribeMessage({
                    tmplIds: [app.globalData.sj_publish_article],
                    success: function (res) {
                        if (res['jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'] == 'accept') {
                            let data = {
                                status: that.status,
                                marchantId: that.marchantId,
                                templateIds: 'jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'
                            };
                            app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                if (res.data.code == 200) {
                                    uni.showToast({
                                        title: '订阅消息成功'
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

                    fail(e) {
                        console.log(e);
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    },

                    complete() {
                        uni.navigateTo({
                            url: '/pages/shopHome/home/home?marchantId=' + that.marchantId
                        });
                    }
                });
            } else {
                // 已订阅的状态
                uni.navigateTo({
                    url: '/pages/shopHome/home/home?marchantId=' + that.marchantId
                });
            }
        }
    }
};
</script>
<style>
page {
    background-color: #f2f2f2;
}
/* 商家动态 */
.store-danamic-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.1);
    margin-bottom: 20rpx;
}
.store-danamic-content {
    width: 100%;
    height: 750rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.store-info-box {
    width: 100%;
    height: 62rpx;
    display: flex;
    align-items: center;
}
.store-dynamic-logo {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
}
.store-dynamic-box-info {
    flex: 1;
    margin-left: 20rpx;
}
.store-dynamic-name {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.store-dynamic-time {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
}
.dingyue-btn {
    width: 110rpx;
    height: 46rpx;
    background: rgba(254, 74, 11, 0.25);
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fe4a0b;
}
.store-dynamic-text {
    width: 100%;
    margin-top: 16rpx;
    height: 72rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    vertical-align: middle;
}
.store-dynamic-img-list {
    width: 100%;
    display: flex;
    padding: 20rpx 0;
}
.store-dynamic-img {
    width: 320rpx;
    height: 320rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
    position: relative;
}
.store-dynamic-big-img {
    width: 540rpx;
    height: 540rpx;
}
.store-dynamic-img-more {
    width: 86rpx;
    height: 38rpx;
    background: #fe4a0b;
    border-radius: 20rpx 0rpx 0rpx 20rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 20rpx;
}
/* 商品 */
.dynamic-goods-container {
    width: 100%;
    height: 220rpx;
    padding: 20rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
}
.dynamic-goods-container-img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 10rpx;
}
.dynamic-goods-container-content {
    flex: 1;
    height: 180rpx;
    margin-left: 18rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.dynamic-goods-container-name {
    width: 100%;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dynamic-goods-container-text {
    width: 100%;
    max-height: 64rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 32rx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.dynamic-goods-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dynamic-goods-container-price {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.dynamic-goods-container-btn {
    width: 160rpx;
    height: 50rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.store-dynamic-bottom {
    width: 100%;
    height: 104rpx;
    padding: 0 156rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.store-dynamic-bottom-item {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}
.store-dynamic-bottom-item-icon {
    width: 40rpx;
    height: 40rpx;
}

.no-more {
    font-size: 24rpx;
    text-align: center;
    color: #999999;
    padding-bottom: 10rpx;
}
.back {
    width: 88rpx;
    height: 88rpx;
    margin-right: 20rpx;
    /* position: fixed;
  left: 20rpx;
  bottom: 308rpx; */
}
</style>
