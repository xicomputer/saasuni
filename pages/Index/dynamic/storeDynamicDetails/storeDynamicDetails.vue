<template>
    <view>
        <!-- 推荐酒店 -->
        <!-- <hotel wx:if="{{hotelList.length}}" hotelList="{{hotelList}}"></hotel> -->

        <view class="store-danamic-item">
            <view class="store-danamic-content">
                <view class="store-info-box">
                    <image class="store-dynamic-logo" :src="dynamicData.userInfo.logoPic"></image>
                    <view class="store-dynamic-box-info">
                        <view class="store-dynamic-name">{{ dynamicData.userInfo.nickname }}</view>
                        <view class="store-dynamic-time">{{ dynamicData.addTime }}</view>
                    </view>
                    <view
                        class="dingyue-btn"
                        @tap.stop.prevent="parseEventDynamicCode($event, subscribe ? '' : 'showDingYue')"
                        :style="subscribe ? 'background-color:#e4e4e4;color:#FFF' : ''"
                    >
                        {{ subscribe ? '已订阅' : '+订阅' }}
                    </view>
                </view>
                <view class="store-dynamic-text">{{ dynamicData.content }}</view>
                <view class="store-dynamic-img-list">
                    <image
                        :class="dynamicData.commodity ? 'store-dynamic-img' : 'store-dynamic-img store-dynamic-big-img'"
                        @tap.stop.prevent="imgClick"
                        :data-list="dynamicData.imagList"
                        :data-src="pitem"
                        mode="aspectFill"
                        :src="pitem"
                        v-if="!((!dynamicData.commodity && index >= 1) || (dynamicData.commodity && index >= 2))"
                        v-for="(pitem, index) in dynamicData.imagList"
                        :key="index"
                    >
                        <view class="store-dynamic-img-more" v-if="!((dynamicData.commodity && index != 1) || (!dynamicData.commodity && index != 0))">
                            +{{ dynamicData.commodity ? dynamicData.imagList.length - 2 : dynamicData.imagList.length - 1 }}
                        </view>
                    </image>
                </view>
                <!-- 商品信息 -->
                <view class="dynamic-goods-container" v-if="dynamicData.commodity" @tap.stop.prevent="toBuy" :data-id="dynamicData.commodity.id">
                    <image :src="dynamicData.commodity.thumbnail" class="dynamic-goods-container-img" mode="aspecFill"></image>
                    <view class="dynamic-goods-container-content">
                        <view class="dynamic-goods-container-name">{{ dynamicData.commodity.commodityName }}</view>
                        <view class="dynamic-goods-container-text">{{ dynamicData.commodity.description }}</view>
                        <view class="dynamic-goods-bottom">
                            <view class="dynamic-goods-container-price">
                                <text style="font-size: 22rpx">￥</text>
                                {{
                                    dynamicData.commodity.activityType == 1 || (dynamicData.commodity.activityType == 2 && dynamicData.commodity.isMember)
                                        ? dynamicData.commodity.lowPrice
                                        : dynamicData.commodity.originalPrice
                                }}
                            </view>
                            <view class="dynamic-goods-container-btn">购买商品</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 评论 commentDataList.length -->
        <view class="comment-container" v-if="false">
            <view class="comment-title">全部评论</view>
            <view class="comment-item" v-for="(item, index) in commentDataList" :key="index">
                <image class="comment-user-img" :src="item.userInfo.headimgurl"></image>

                <view class="comment-content">
                    <view class="comment-top-info">
                        <view class="comment-top-left">
                            <view class="comment-name">{{ item.userName }}</view>
                            <!-- <image class="member-img" src="/pages/img/index/member_icon.png"></image> -->
                        </view>
                        <view class="comment-top-left">
                            <view>{{ item.addTime }}</view>
                            <!-- <view class="user-info-solid"></view>
            <image class="user-info-icon" src="{{item.isPraise?'/pages/img/index/dynamic/praised.png':'/pages/img/index/dynamic/praise.png'}}"  bindtap="operationPraise" data-id="{{item.id}}" data-idx="{{index}}"></image> -->
                        </view>
                    </view>
                    <view class="user-signature">{{ item.userInfo.signature || ' 暂无个性签名' }}</view>
                    <view class="user-commnet-text">{{ item.content }}</view>
                    <!-- <view class="store-reply">{{}}</view> -->
                </view>
            </view>
        </view>

        <!-- 底部 -->
        <!-- <view class="store-dynamic-bottom">
    <view class="store-dynamic-bottom-item" catchtap="{{subscribe?'':'showDingYue'}}">
      <image class="store-dynamic-bottom-item-icon" src="{{subscribe?'/pages/img/index/dynamic/dingyued.png':'/pages/img/index/dynamic/dingyue.png'}}"></image>
    </view>
    <view class="store-dynamic-bottom-item" bindtap="commentFocus">
      <image class="store-dynamic-bottom-item-icon" src="/pages/img/index/dynamic/comment.png"></image>
      <view class="comment-number" wx:if="{{dynamicData.reply>0}}">{{dynamicData.reply>99?99:dynamicData.reply}}</view>
    </view>
    <view class="store-dynamic-bottom-item" catchtap="operationPraise" data-id="{{dynamicData.id}}">
      <view class="parise-box">
        <image class="store-dynamic-bottom-item-icon" src="{{dynamicData.isPraise?'/pages/img/index/dynamic/praised1.png':'/pages/img/index/dynamic/praise1.png'}}"></image>
        <text>{{dynamicData.praise||'点赞'}}</text>
      </view>
    </view>
  </view> -->

        <!-- 输入框 -->
        <view class="input-container" :style="'bottom:' + inputHeight + 'px'" v-if="isFocus">
            <textarea
                class="input-text"
                :show-confirm-bar="false"
                :value="content"
                @input="inputContent"
                maxlength="80"
                placeholder="我来聊几句"
                :auto-height="false"
                :auto-focus="isFocus"
                :adjust-position="false"
                @confirm="releaseComment"
                confirm-type="send"
                @focus="inputFocus"
                @blur="inputBlur"
            ></textarea>
            <view class="confirm-btn" @tap="parseEventDynamicCode($event, content.length ? 'releaseComment' : '')" :style="content.length ? '' : 'background-color:#FFD1C1'">
                发表
            </view>
        </view>
        <!-- <view class="bottom" style="bottom:{{inputHeight}}px">
  <input bindinput="inputContent" value="{{content}}" adjust-position="{{false}}" maxlength="50" bindconfirm="releaseComment" confirm-type="send" bindfocus="inputFocus" bindblur="inputBlur"
/>
  <view class="bottom_right" bindtap="releaseComment">
    <image src="/pages/img/index/dynamic_icon_3.png" mode="aspectFill" ></image>
    <view>发布</view>
  </view>
</view> -->
    </view>
</template>

<script>
import hotel from '@/pages/Index/components/hotel/index';
const app = getApp();

const time = require('../../../../utils/util');

export default {
    components: {
        hotel
    },
    data() {
        return {
            dynamicData: {
                userInfo: {
                    logoPic: '',
                    nickname: ''
                },

                addTime: '',
                content: '',
                commodity: false,
                imagList: ''
            },

            commentDataList: [],

            // 评论列表
            content: '',

            isFocus: false,
            subscribe: 0,
            hotelList: [],
            inputHeight: 0,
            pitem: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        if (options.isFocus) {
            this.setData({
                isFocus: true
            });
        }

        await this.getCommunityList(options.id);
        this.getCommentInfo();
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
     */ methods: {
        // 获取订阅通知列表
        getCommunityList(id) {
            let data = {
                stick: 3,
                commentId: id
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data[0].addTime = time.formatTime(res.data.data[0].addTime);

                    if (res.data.data[0].marchantCorrelationList.length) {
                        var hotelList = [];
                        res.data.data[0].marchantCorrelationList.forEach((item) => {
                            if (item.marchantCorrelation.source == 2) {
                                hotelList.push(item);
                            }
                        });
                    }

                    this.setData({
                        dynamicData: res.data.data[0],
                        subscribe: res.data.data[0].userInfo.subscribe,
                        hotelList: hotelList
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

        // 点赞/取消
        operationPraise() {
            let data = {
                commentId: this.dynamicData.id
            };
            return app.globalData.sjrequest('/marchant/operationPraise', data).then((res) => {
                var pages = getCurrentPages();
                var prevPge = pages[pages.length - 2];
                prevPge.data.commentList.forEach((item, idx) => {
                    //更新上一个页面的内容
                    let isPraise1 = 'commentList[' + idx + '].isPraise';
                    let praise1 = 'commentList[' + idx + '].praise';

                    if (item.id == this.dynamicData.id) {
                        if (item.isPraise) {
                            prevPge.commentList[idx].praise = this.dynamicData.praise - 1;
                            prevPge.commentList[idx].isPraise = 0;
                        } else {
                            prevPge.commentList[idx].praise = this.dynamicData.praise + 1;
                            prevPge.commentList[idx].isPraise = 1;
                        }
                    }
                });
                let isPraise = 'dynamicData.isPraise';
                let praise = 'dynamicData.praise';

                if (this.dynamicData.isPraise) {
                    this[dynamicData.praise] = this.dynamicData.praise - 1;
                    this[dynamicData.isPraise] = 0;
                } else {
                    this[dynamicData.praise] = this.dynamicData.praise + 1;
                    this[dynamicData.isPraise] = 1;
                }
            });
        },

        // 获取评论信息
        getCommentInfo() {
            let data = {
                commentId: this.dynamicData.id
            };
            return app.globalData.sjrequest('/marchant/queryMarchantCommentReply', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatTime(item.addTime);
                    });
                    this.setData({
                        commentDataList: res.data.data
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

        // 输入文字
        inputContent(e) {
            this.setData({
                content: e.detail.value.trim()
            });
        },

        // 发布评论
        releaseComment() {
            if (!this.content) {
                uni.showToast({
                    title: '说点什么吧~',
                    icon: 'none'
                });
                return;
            }

            let data = {
                commentId: this.dynamicData.id,
                content: this.content,
                isMarchant: 0,
                parentId: 0
            };
            let that = this;
            app.globalData.sjrequest('/marchant/addMarchantCommentReply', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '评论成功'
                    });
                    let reply = 'dynamicData.reply';
                    this[dynamicData.reply] = this.dynamicData.reply + 1;
                    this.setData({
                        content: ''
                    });
                    that.getCommentInfo();
                    var pages = getCurrentPages();
                    var prevPge = pages[pages.length - 2];
                    prevPge.data.commentList.forEach((item, index) => {
                        if (item.id == data.commentId) {
                            let reply = `commentList[${index}].reply`;
                            prevPge.commentList[index].reply = item.reply + 1;
                        }
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        inputFocus(e) {
            console.log(e, '键盘弹起');
            var inputHeight = 0;

            if (e.detail.height) {
                inputHeight = e.detail.height;
            }

            this.setData({
                inputHeight: inputHeight
            });
        },

        inputBlur() {
            this.setData({
                inputHeight: 0,
                isFocus: false
            });
        },

        toBuy(e) {
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.id
            });
        },

        commentFocus() {
            this.setData({
                isFocus: true
            });
        }
    }
};
</script>
<style>
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
    padding: 20rpx 20rpx 0;
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
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: #000000;
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
    height: 116rpx;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
.store-dynamic-bottom-item {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.store-dynamic-bottom-item-icon {
    width: 56rpx;
    height: 56rpx;
}
.comment-number {
    width: 50rpx;
    height: 50rpx;
    background: #f34f18;
    border-radius: 50%;
    position: absolute;
    right: 70rpx;
    top: 8rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.parise-box {
    width: 162rpx;
    height: 76rpx;
    background: #fe4a0b;
    box-shadow: 0rpx 6rpx 12rpx rgba(254, 74, 11, 0.7);
    border-radius: 38rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 评论 */
.comment-container {
    width: 100%;
    padding: 20rpx 30rpx 20rpx 20rpx;
    box-sizing: border-box;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.1);
    margin-bottom: 130rpx;
}
.comment-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #000000;
}
.comment-item {
    width: 100%;
    display: flex;
    margin-top: 20rpx;
}
.comment-user-img {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
}
.comment-content {
    flex: 1;
    margin-left: 10rpx;
}
.comment-top-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.comment-top-left {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
.comment-name {
    max-width: 200rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.member-img {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
}
.user-info-solid {
    width: 2rpx;
    height: 34rpx;
    background-color: #666;
    margin: 0 20rpx;
}
.user-info-icon {
    width: 40rpx;
    height: 40rpx;
}
.user-signature {
    width: 50%;
    height: 26rpx;
    font-size: 18rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user-commnet-text {
    width: 100%;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
    margin-top: 8rpx;
    word-break: break-all;
}

/* 输入框 */
.input-container {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
}
.input-text {
    width: 572rpx;
    min-height: 50rpx;
    max-height: 120rpx;
    font-weight: bold;
    background-color: #ecedef;
    border-radius: 8rpx;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #333;
    padding: 12rpx;
    box-sizing: border-box;
}
.confirm-btn {
    width: 110rpx;
    height: 50rpx;
    background: #fe4a0b;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 14rpx;
}
</style>
