<template>
    <view>
        <!-- 会员 -->
        <view style="background: #fff; min-height: 100vh">
            <!-- 会员信息 -->
            <!-- 会员信息 -->
            <view>
                <navigator
                    class="member-info"
                    :url="'/pages/member/card/card?marchantId=' + marchantId"
                    :style="
                        'background-image:url(' +
                        (detailData.memberLeve
                            ? 'https://xssj.letterbook.cn/applet/images/goods_member_card_bg.png'
                            : 'https://xssj.letterbook.cn/applet/images/good_member_card_bg.png') +
                        ')'
                    "
                >
                    <view class="member-content">
                        <view v-if="detailData.memberLeve" class="member-text">
                            {{ detailData.memberLeve.name }}
                            <text style="font-size: 20rpx" v-if="detailData.memberLeve.discount < 10">（当前会员享受{{ detailData.memberLeve.discount }}折折扣）</text>
                            <text style="font-size: 20rpx" v-if="detailData.memberLeve.discount == 10">（升级会员等级享受优惠！）</text>
                        </view>
                        <view v-if="!detailData.memberLeve" class="member-text">
                            未激活会员
                            <text style="font-size: 20rpx">（点击这里，快速激活）</text>
                        </view>
                    </view>
                    <view class="member-bottom-text">商家发起活动时如商家价格低于会员价以活动价为优先</view>
                </navigator>
            </view>
            <!-- 浮窗 -->
            <view class="right-bottom-btn-container">
                <image class="right-bottom-btn-img" @tap="toMember" src="/static/pages/img/index/right_bottom_icon1.png"></image>
            </view>
            <view v-if="!memberGoodsList.length" class="no-dynamic me-fx-col me-fx-c-c">
                <image class="no-dynamic-img" src="https://xssj.letterbook.cn/applet/images/sj_no_data_img0.png"></image>
                <view class="no-dynamic-text">暂无会员商品</view>
            </view>
            <view class="member-goods-list" v-else>
                <view class="me-fx-row goods-item-box" @tap="goshop" :data-id="item.id" :data-name="item.commodityName" v-for="(item, index) in memberGoodsList" :key="index">
                    <image class="goods-img" :src="item.thumbnail"></image>

                    <view class="me-fx-col me-fx-sb goods-info">
                        <view class="goods-item-top">
                            <view class="me-fx-row me-fx-start-c">
                                <view class="goods-name">{{ item.commodityName }}</view>
                            </view>
                            <view class="introduce">{{ item.description }}</view>
                        </view>
                        <view class="me-fx-row me-fx-sb-c goods-item-price">
                            <view class="price-str">
                                ￥
                                <text class="price-num">{{ item.lowPrice }}</text>
                            </view>
                            <image src="/static/pages/static/cart.png" class="item-cart"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/componentsPage/member/member.js
export default {
    data() {
        return {
            memberGoodsList: [],
            userInfo: {},
            isIntegral: 0,
            marchantId: null
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        memberGoodsList: {
            type: Array
        },
        userInfo: {
            type: Object
        },
        isIntegral: {
            type: [Number, String]
        },
        marchantId: {
            type: [[Number, String]]
        },
        detailData: {
            type: Object
        }
    },
    beforeMount: function () {
        this.userInfo = this.userInfo;
        this.memberGoodsList = this.memberGoodsList;
        this.isIntegral = this.isIntegral;
        this.marchantId = this.marchantId;
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳会员
        toMember() {
            console.log(this.userInfo);
            uni.navigateTo({
                url: `/pages/member/card/card?marchantId=${this.marchantId}`
            });
        },

        goshop(e) {
            const { name, id } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/Index/GoodsDetails/GoodsDetails?id=` + id + `&memberShow=1`
            });
        }
    }
};
</script>
<style>
@import '../../../../../styles/me_common.css'; /* pages/Index/shopHome/components/componentsPage/member/member.wxss */

.no-dynamic-text {
    text-align: center;
}
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
    width: 308rpx;
    height: 244rpx;
    background-color: #ccc;
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

/* 会员信息 */
.member-info {
    width: 100%;
    height: 80rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    padding: 6rpx 14rpx 0 120rpx;
    box-sizing: border-box;
    background-size: 750rpx 80rpx;
    background-repeat: no-repeat;
}
.member-content {
    width: 100%;
    /* display: flex; */
    /* align-items: center; */
}
.member-text {
    font-size: 30rpx;
    height: 42rpx;
    font-weight: bold;
    color: #ffffff;
}
.member-bottom-text {
    height: 24rpx;
    font-size: 18rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 24rpx;
    color: #ffffff;
}
/* 秒杀商品列表 */
/* .goods-list{
position: relative;
padding: 30rpx;
box-sizing: border-box;
}
.good-item{
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
.count-down-box{
position: absolute;
left: 0;
top: 0;
background: rgba(51, 51, 51, 0.7);
width: 100%;
height: 48rpx;
font-size: 24rpx;
font-family: PingFang SC;
font-weight: bold;
color: #FFFFFF;
display: flex;
align-items: center;
padding-left: 20rpx;
box-sizing: border-box;
}
.small-count-down-box{
height: 40rpx;
padding-left: 8rpx;
font-size: 20rpx;
}
.paimai-time .van-count-down{
font-size: 20rpx!important;
}
.van-count-down{
color:#fff!important;
font-size: 24rpx!important;
}
.member-lever-box{
width: 100%;
height: 40rpx;
position: absolute;
top: 126rpx;
left: 0;
}
.member-lever-box .van-notice-bar{
height: 40rpx!important;
background: rgba(51, 51, 51, 0.7)!important;
color:#FF5340!important;
}
.good-info-list{
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 8rpx 8rpx 20rpx;
box-sizing: border-box;
}
.good-name-box{
width: 100%;
display: flex;
align-items: center;
}
.cuxiao{
width: 36rpx;
height: 38rpx;
text-align: center;
background: linear-gradient(46deg, #C40E17 0%, #F96B73 52%, #C5111A 100%);
border-radius: 4rpx;
font-size: 16rpx;
font-weight: bold;
line-height: 16rpx;
color: #FFFFFF;

display: flex;
align-items: center;
justify-content: center;
margin-right: 10rpx;
}
.good-name{
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
.good-describe{
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
.good-bottom{
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10rpx;
}
.good-price-box{
display: flex;
align-items: flex-end;
}
.good-activity-price{
height: 60rpx;
font-size: 44rpx;
font-family: PingFang SC;
font-weight: bold;
line-height: 60rpx;
color: #FF5340;
}
.good-original-price{
font-size: 24rpx;
font-family: PingFang SC;
font-weight: bold;
line-height: 22rpx;
color: #999;
margin-left: 20rpx;
text-decoration: line-through;
}
.member-sale-container{
height: 28rpx;
font-size: 20rpx;
font-family: PingFang SC;
font-weight: 600;
line-height: 28rpx;
color: #FF5340;
margin-bottom: 10rpx;
margin-left: 20rpx;
}
.buy-btn-statu{
padding: 8rpx;
background: #000000;
border-radius: 8rpx;
font-size: 28rpx;
font-family: PingFang SC;
font-weight: bold;
color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
} */
</style>
