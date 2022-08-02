<template>
    <!-- pages/Index/shopHome/components/componentsPage/member/member.wxml -->
    <view style="position: relative">
        <!-- 会员 -->
        <view style="background: #fff; min-height: 100vh">
            <!-- 浮窗 -->
            <view class="right-bottom-btn-container">
                <image class="right-bottom-btn-img" @tap="toMember" src="/static/pages/img/index/right_bottom_icon1.png"></image>
            </view>
            <view v-if="!memberGoodsList.length" class="no-data-container">
                <image class="no-data-container-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/%E7%BB%84%205558%403x.png"></image>
                <view class="no-data-container-text"><text>暂无会员商品</text></view>
            </view>

            <view class="member-goods-list" v-else>
                <view class="me-fx-row goods-item-box" @tap="goshop" :data-id="item.id" :data-name="item.commodityName" v-for="(item, index) in memberGoodsList" :key="index">
                    <image class="goods-img" style="width: 283rpx; height: 283rpx" :src="item.thumbnail" mode="aspectFill"></image>

                    <view class="me-fx-col me-fx-sb goods-info">
                        <view class="goods-item-top">
                            <view class="me-fx-row me-fx-start-c">
                                <!-- <image src='' class='logo-img'></image> -->
                                <view class="goods-name">{{ item.commodityName }}</view>
                            </view>
                            <view class="introduce">{{ item.description }}</view>
                        </view>
                        <view class="me-fx-row me-fx-sb-c goods-item-price">
                            <view class="price-str">
                                ￥
                                <text class="price-num">{{ item.lowPrice }}</text>
                            </view>
                            <image src="/static/pages/static/cart.png" class="item-cart" v-if="orderSwitch"></image>
                            <text class="orderSwitch" v-else>参考价</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="daodile">——信书技术支持——</view>

            <!-- <view wx:else class="goods-list">
        <block wx:for="{{memberGoodsList}}" wx:key="index">
        <navigator style="{{index % 4 == 0?'':index % 4 == 3?'width: 220rpx;':'width: 220rpx;margin-right: 14rpx'}}" class="good-item" url="/pages/Index/GoodsDetails/GoodsDetails?id={{item.id}}&sid={{item.tempSpecId}}">
            <van-notice-bar wx:if="{{index % 4 != 0 &&item.isMember}}" scrollable text="{{userInfo.memberLeve.discount==10?'普通会员无优惠':userInfo.memberLeve.name+'已优惠￥'+(item.originalPrice*1000-item.lowPrice*1000)/1000}}"  class="member-lever-box"/>
            <image class="good-img" src="{{item.thumbnail}}" mode="aspectFill" style="{{index % 4 != 0?'width: 100%;height:166rpx':'width:100%;height:650rpx'}}"></image>
            <view class="good-info-list">
            <view class="good-top">
                <view class="good-name-box">
                <view class="cuxiao">会员专区</view>
                <view class="good-name" style="{{index % 4 != 0?'font-size: 26rpx;':''}}">{{item.commodityName}}</view>
                </view>
                <view wx:if="{{index % 4 == 0}}" class="good-describe">{{item.description}}</view>
            </view>
            <view class="good-bottom">
                <view class="good-price-box">
                <view class="good-activity-price" style="{{index % 4 != 0?'font-size: 26rpx;':''}}"><text style="{{index % 4 != 0?'font-size: 20rpx;':'font-size:32rpx'}}">￥</text>{{ item.lowPrice }}</view>
                <view class="member-sale-container" wx:if="{{index % 4 == 0 &&item.isMember}}">{{userInfo.memberLeve.discount==10?'普通会员无优惠':userInfo.memberLeve.name+'已优惠￥'+(item.originalPrice*1000-item.lowPrice*1000)/1000}}</view>
                </view>
                <view class="buy-btn-statu" catchtap="goBuy" data-item="{{item}}" style="{{index % 4 != 0?'font-size: 20rpx;':''}}">购买</view>
            </view>
            </view>
        </navigator>
        </block> 
        <view class="daodile">——信书技术支持——</view>
    </view>-->
        </view>
    </view>
</template>

<script>
// pages/shopHome/member/member.js
const app = getApp();
export default {
    data() {
        return {
            memberGoodsList: [],
            userInfo: {},
            isIntegral: 0,
            marchantId: null,
            orderSwitch: null,
            mainOrderType: '' //主推业务 1物流 2同城 3预订
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (options.orderSwitch != undefined) {
            let orderSwitch = options.orderSwitch;
            let ids = options.marchantId;
            this.setData({
                marchantId: ids,
                orderSwitch: orderSwitch
            });
        } else {
            let orderSwitch = uni.getStorageSync('orderSwitch');
            let ids = uni.getStorageSync('merchantId');
            this.setData({
                marchantId: ids,
                orderSwitch: orderSwitch
            });
        }

        this.setData(
            {
                mainOrderType: options.mainOrderType || ''
            },
            () => {
                this.getUserInfo();
                this.getMemberGoodsList();
            }
        );
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
        let uniqueId = uni.getStorageSync('uniqueId1');
        return {
            title: this.markerInfo.nickName,
            path: 'pages/shopHome/member/member?marchantId=' + this.marchantId + '&orderSwitch=' + this.orderSwitch
        };
    },
    methods: {
        // 会员
        getMemberGoodsList() {
            var data = {
                marchantId: this.marchantId
            };
            var mainOrderType = this.mainOrderType;

            if (mainOrderType) {
                data.orderTemplate = mainOrderType;
            }

            app.globalData.sjrequest('/commodity/queryMemberCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        memberGoodsList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 跳转到激活会员
        toMember() {
            uni.navigateTo({
                url: `/pages/member/card/card?marchantId=${this.marchantId}`
            });
        },

        // 获取用户信息 ，如果是会员显示memberleve字段，如果不是则没有此字段
        getUserInfo() {
            let data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/userRegister/queryUserInfo', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();

                    if (res.data.data.uniqueId) {
                        uni.setStorage({
                            data: res.data.data.uniqueId,
                            key: 'uniqueId1'
                        });
                    } // if(res.data.data.community==0){   // 未开启订阅通知
                    //   let tabs = 'tabList1[5].isHave'
                    //   this.setData({
                    //     [tabs]:false
                    //   })
                    // }else{
                    //   let tabs = 'tabList1[4].isHave'
                    //   this.setData({
                    //     [tabs]:false
                    //   })
                    // }
                    // if(!res.data.data.statusv){   // 热卖是否开启
                    //   let tabs = 'tabList1[1].isHave'
                    //   this.setData({
                    //     [tabs]:false
                    //   })
                    // }
                    // if(!res.data.data.statusm){   // 会员是否开启
                    //   let tabs = 'tabList1[3].isHave'
                    //   this.setData({
                    //     [tabs]:false
                    //   })
                    // }

                    var wxUserInfo = uni.getStorageSync('wx_userinfo_key') || {};
                    this.setData({
                        userInfo: { ...res.data.data, avatarUrl: wxUserInfo.userInfo.avatarUrl, nickName: wxUserInfo.userInfo.nickName }
                    });
                    console.log(this.userInfo, 'userInfo');
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        goshop(e) {
            const { name, id } = e.currentTarget.dataset;
            var mainOrderType = this.mainOrderType;
            var url = `/pages/Index/GoodsDetails/GoodsDetails?id=` + id + `&memberShow=1`;

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
        }
    }
};
</script>
<style>
@import '../../../styles/me_common.css'; /* pages/Index/shopHome/components/componentsPage/member/member.wxss */
/* 浮窗 */
.right-bottom-btn-container {
    width: 88rpx;
    position: fixed;
    bottom: 15%;
    right: 3%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.right-bottom-btn-img {
    width: 88rpx;
    height: 88rpx;
}
.right-bottom-btn-container .right-bottom-btn-img:nth-child(2) {
    margin-top: 20rpx;
}
/*会员商品列表*/
/*会员商品列表*/
.member-goods-list {
    padding: 30rpx;
    box-sizing: border-box;
}
.member-goods-list .goods-item-box {
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    background-color: #25262e;
}
.member-goods-list .goods-img {
    width: 244rpx;
    height: 204rpx;
    background-color: #fff;
}
.member-goods-list .goods-info {
    flex: 1;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
}
.member-goods-list .goods-item-top .logo-img {
    width: 30rpx;
    height: 30rpx;
}
.member-goods-list .goods-item-top .goods-name {
    font-size: 28rpx;
    color: #fff;
}
.member-goods-list .goods-item-top .introduce {
    font-size: 24rpx;
    color: #cecece;
}
.member-goods-list .price-str {
    font-size: 24rpx;
    color: #fff;
}
.member-goods-list .price-num {
    font-size: 32rpx;
}
.member-goods-list .item-cart {
    width: 48rpx;
    height: 48rpx;
}
.no-data-container {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-data-container-img {
    height: 424rpx;
}

.no-data-container-text {
    margin-top: 10rpx;
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
}
/* 秒杀商品列表 */
.goods-list {
    position: relative;
    padding: 30rpx;
    box-sizing: border-box;
}
.good-item {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    background-color: white;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    position: relative;
}
.count-down-box {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(51, 51, 51, 0.7);
    width: 100%;
    height: 48rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 20rpx;
    box-sizing: border-box;
}
.small-count-down-box {
    height: 40rpx;
    padding-left: 8rpx;
    font-size: 20rpx;
}
.paimai-time .van-count-down {
    font-size: 20rpx !important;
}
.van-count-down {
    color: #fff !important;
    font-size: 24rpx !important;
}
.member-lever-box {
    width: 100%;
    height: 40rpx;
    position: absolute;
    top: 126rpx;
    left: 0;
}
.member-lever-box .van-notice-bar {
    height: 40rpx !important;
    background: rgba(51, 51, 51, 0.7) !important;
    color: #ff5340 !important;
}
.good-info-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rpx 8rpx 20rpx;
    box-sizing: border-box;
}
.good-name-box {
    width: 100%;
    display: flex;
    align-items: center;
}
.cuxiao {
    width: 36rpx;
    height: 38rpx;
    text-align: center;
    background: linear-gradient(46deg, #c40e17 0%, #f96b73 52%, #c5111a 100%);
    border-radius: 4rpx;
    font-size: 16rpx;
    font-weight: bold;
    line-height: 16rpx;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
}
.good-name {
    width: 0;
    flex: 1;
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #101010;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
.good-describe {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    word-wrap: break-word;
}
.good-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10rpx;
}
.good-price-box {
    display: flex;
    align-items: flex-end;
}
.good-activity-price {
    height: 60rpx;
    font-size: 44rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: #ff5340;
}
.good-original-price {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22rpx;
    color: #999;
    margin-left: 20rpx;
    text-decoration: line-through;
}
.member-sale-container {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 28rpx;
    color: #ff5340;
    margin-bottom: 10rpx;
    margin-left: 20rpx;
}
.buy-btn-statu {
    padding: 8rpx;
    background: #000000;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.no-dynamic-text {
    text-align: center;
}
.daodile {
    font-size: 20rpx;
    text-align: center;
    color: #999999;
    font-weight: bold;
    position: absolute;
    width: 100%;
    bottom: 0rpx;
    display: flex;
    justify-content: center;
}
.orderSwitch {
    background-color: #f9f1e4;
    padding: 5rpx 10rpx;
    font-size: 28rpx;
    border-radius: 8rpx;
}
</style>
