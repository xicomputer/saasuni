<template>
    <view class="my">
        <!-- 头部 -->
        <view class="my_header">
            <view class="my_header_up">
                <image :src="userInfo.avatarUrl" mode="aspectFill" class="my_header_up_left"></image>
                <view class="my_header_up_right">
                    <view class="my_header_up_right_name">
                        {{ userInfo.nickName }}
                        <navigator url="/pages/PersonalCenter/setUp/setUp" class="system-notice-icon-container" style="right: 100rpx">
                            <image style="width: 40rpx; height: 44rpx" src="/static/pages/img/setup.png"></image>
                        </navigator>
                        <navigator url="/pages/Notice/Notice?from=store" class="system-notice-icon-container">
                            <image style="width: 44rpx; height: 44rpx" src="/static/pages/img/my/system_notice_icon.png"></image>
                            <view class="noticeNum" v-if="noticeNum > 0">{{ noticeNum }}</view>
                        </navigator>
                    </view>
                    <image class="member-bg-img" @tap="toMember" v-if="userInfo.status == 1 && userInfo.memberLeve" src="/static/pages/img/index/member_bg.png">
                        <text class="member-bg-text">{{ userInfo.memberLeve.name }}</text>
                    </image>
                    <image class="member-bg-img" @tap="toMember" v-if="userInfo.status == 1 && !userInfo.memberLeve" src="/static/pages/img/index/no_member_bg.png">
                        <text class="member-bg-text">未激活会员</text>
                    </image>
                    <view class="my_header_up_right_text" v-if="!userInfo.status">{{ userInfo.signature || '该用户暂未设置签名~' }}</view>
                </view>
            </view>

            <!-- <view class="my_header_down">
      <block wx:for="{{headList}}" wx:key="index">
        <view class="my_header_down_item" bindtap="toDetail" data-idx="{{index}}"
          url="/pages/Index/couponList/couponList">
          <view class="my_header_down_item_price">
            <view class="my_header_down_item_price_num">{{item.num}}</view>
            <view class="my_header_down_item_price_text">{{item.unit}}</view>
          </view>
          <view class="my_header_down_item_text">{{item.name}}</view>
        </view>
      </block>
    </view> -->

            <view class="me-fx-row me-fx-sa-c num-info-box">
                <view class="me-fx-col me-fx-c-c" v-for="(item, index) in 3" :key="index">
                    <text class="count-num">0</text>

                    <text>余额</text>
                </view>
            </view>
        </view>

        <!-- 订单 -->
        <view style="margin-top: 58rpx">
            <!-- 订单 物流配送 -->
            <view class="my_order" v-if="isWuliu">
                <view class="my_order_title">物流订单</view>
                <view class="my_order_content">
                    <navigator
                        class="my_order_content_item"
                        :url="'/pages/order/orderList/orderList?activeTab=2&marchantId=' + marchantId + '&tabsItem=' + index"
                        v-for="(item, index) in deliveryOrderList"
                        :key="index"
                    >
                        <view class="img-container">
                            <image :src="item.icon"></image>
                            <view class="number" v-if="orderNum[index]">{{ orderNum[index] }}</view>
                        </view>

                        <view>{{ item.name }}</view>
                    </navigator>
                </view>
            </view>
            <!-- 订单 同城配送 -->
            <!-- <view class="my_order" wx:if="{{isToCity}}">
      <view class="my_order_title">同城配送</view>
      <view class="my_order_content">
        <navigator class="my_order_content_item" wx:for="{{cityOrderList}}" wx:key="index"
          url="/pages/order/orderListCity/orderListCity?marchantId={{marchantId}}&tabsitem={{index}}">
          <view class="img-container">
            <image src="{{item.icon}}"></image>
            <view class="number" wx:if="{{cityOrderNum[index]>0}}">{{cityOrderNum[index]}}</view>
          </view>
          <view>{{item.name}}</view>
        </navigator>
      </view>
    </view> -->
            <!-- 订单 同城自取 -->
            <!-- <view class="my_order" wx:if="{{isToStore}}">
      <view class="my_order_title">预订/自取</view>
      <view class="my_order_content" style="justify-content: space-around;">
        <navigator class="my_order_content_item" wx:for="{{selfOrderList}}" wx:key="index"
          url="/pages/order/orderListTake/orderListTake?tabsitem={{index}}&marchantId={{marchantId}}">
          <view class="img-container">
            <image src="{{item.icon}}"></image>
            <view class="number" wx:if="{{toStoreOrderNum[index]}}">{{toStoreOrderNum[index]}}</view>
          </view>
          <view>{{item.name}}</view>
        </navigator>
      </view>
    </view> -->
        </view>

        <!-- 我的工具 -->
        <view class="my_order">
            <view class="my_order_title">我的工具</view>
            <view class="my_tool">
                <block v-for="(item, index) in toolOrderList" :key="index">
                    <view class="my_order_content_item my_tool_item" @tap="pagesTo" :data-idx="index">
                        <image style="width: 64rpx; height: 64rpx; margin-bottom: 6rpx" :src="item.icon"></image>
                        <view>{{ item.name }}</view>
                    </view>
                </block>
            </view>
        </view>

        <!-- 我的足迹 -->
        <view class="me-fx-row me-fx-sb my_order plate-box">
            <view class="my_order_title" style="border: none">我的足迹</view>
            <navigator hover-class="none" class="more-navigor" url="/pages/Index/myFootPrint/myFootPrint">更多>></navigator>
        </view>
        <!-- 专属小店申请 -->
        <!-- <view class="my_order" wx:if="{{isDistribution}}" bindtap="toFenXiao">
    <view class="my_order_title">专属小店申请</view>
    <view class="my_shop">
      <view class="my_shop_text_one">专属小店申请，好货带不停</view>
      <view class="my_shop_text_two">佣金赚不停</view>
      <view class="my_shop_btn">
        <view class="my_shop_btn_text">立即申请</view>
      </view>
    </view>
  </view> -->
        <!-- 商家注册申请 -->
        <!-- <view class="my_order" bindtap="toRegister">
    <view class="my_order_title">商家注册申请</view>
    <view class="my_shop">
      <view class="my_shop_text_one">一键入驻 开店注册</view>
      <view class="my_shop_text_two">实体零售店可入驻</view>
      <view class="my_shop_btn">
        <view class="my_shop_btn_text">立即申请</view>
      </view>
    </view>
  </view> -->
        <image
            class="my_to_register"
            src="/static/pages/img/my/index_me_store_apply.png"
            style="width: 100%; height: 244rpx; margin-top: 20rpx; padding: 0 20rpx; box-sizing: border-box"
            @tap="toRegister"
        ></image>
    </view>
</template>

<script>
// pages/Index/components/my/my.js
export default {
    data() {
        return {
            deliveryOrderList: [
                {
                    icon: '/static/pages/img/my/daifukuan.png',
                    name: '待付款'
                },
                {
                    icon: '/static/pages/img/my/daifahuo.png',
                    name: '待发货'
                },
                {
                    icon: '/static/pages/img/my/daishouhuo.png',
                    name: '待收货'
                },
                {
                    icon: '/static/pages/img/my/daipingjia.png',
                    name: '已完成'
                },
                {
                    icon: '/static/pages/img/my/tuikuan.png',
                    name: '退款退货'
                }
            ],
            cityOrderList: [
                {
                    icon: '/static/pages/img/my/daifukuan.png',
                    name: '待付款'
                },
                {
                    icon: '/static/pages/img/my/daifahuo.png',
                    name: '待接单'
                },
                {
                    icon: '/static/pages/img/my/city.png',
                    name: '待收货'
                },
                {
                    icon: '/static/pages/img/my/daipingjia.png',
                    name: '已完成'
                },
                {
                    icon: '/static/pages/img/my/tuikuan.png',
                    name: '已退款'
                }
            ],
            selfOrderList: [
                {
                    icon: '/static/pages/img/my/daifukuan.png',
                    name: '待付款'
                },
                {
                    icon: '/static/pages/img/my/daifahuo.png',
                    name: '待使用'
                },
                {
                    icon: '/static/pages/img/my/daipingjia.png',
                    name: '已完成'
                }
            ]
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        },
        headList: {
            type: Array,
            default: () => []
        },
        toolOrderList: {
            type: Array,
            default: () => []
        },
        marchantId: {
            type: Number,
            default: 0
        },
        orderNum: {
            type: Array,
            default: () => []
        },
        cityOrderNum: {
            type: Array,
            default: () => []
        },
        noticeNum: {
            type: Number,
            default: 0
        },
        toStoreOrderNum: {
            type: Array,
            default: () => []
        },
        isToStore: {
            type: Boolean,
            default: false
        },
        isWuliu: {
            type: Boolean,
            default: false
        },
        isToCity: {
            type: Boolean,
            default: false
        },
        isDistribution: {
            type: Number,
            default: 0
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳会员
        toMember() {
            uni.navigateTo({
                url: `/pages/member/card/card?marchantId=${this.marchantId}`
            });
        },

        toRegister() {
            uni.navigateToMiniProgram({
                appId: 'wxab96682e938690ad'
            });
        },

        toFenXiao() {
            uni.navigateToMiniProgram({
                appId: 'wxcad66233bce675b4',
                path: `/pages/tabBar/home/home?marchant=${this.marchantId}`
            });
        },

        //  我的
        pagesTo(e) {
            let idx = e.currentTarget.dataset.idx;
            this.$emit('pagesTo', {
                detail: idx
            });
        },

        //  暂时跳优惠券
        toDetail(e) {
            let idx = e.currentTarget.dataset.idx;
            this.$emit('toDetail', {
                detail: idx
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

/* pages/Index/components/my/my.wxss */
/* 我的 */
.my {
    background-color: #f8f8f8;
    padding-bottom: 140rpx;
}
/* 头部 */
.my_header {
    height: 300rpx;
    background: linear-gradient(270deg, #fc5b0d 0%, #f64b5b 100%, #7c2a1a 100%);
    border-bottom-left-radius: 50% 20rpx;
    border-bottom-right-radius: 50% 20rpx;
    padding: 30rpx 20rpx 0;
    box-sizing: border-box;
}
.my_header_up {
    display: flex;
}
.my_header_up_left {
    width: 116rpx;
    height: 116rpx;
    border-radius: 50%;
}
.my_header_up_right {
    margin-left: 20rpx;
    flex: 1;
    width: 0;
    height: 116rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.my_header_up_right_name {
    font-size: 40rpx;
    font-weight: 600;
    color: #f4f4f4;
    position: relative;
}
.system-notice-icon-container {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    right: 20rpx;
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
    top: 0rpx;
    right: -6rpx;
    text-align: center;
}
.member-bg-img {
    width: 280rpx;
    height: 60rpx;
    position: relative;
}
.member-bg-text {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    padding-left: 40rpx;
    box-sizing: border-box;
    font-family: PingFang SC;
    font-weight: bold;
    color: #f4f4f4;
}
.my_header_up_right_text {
    font-size: 20rpx;
    font-weight: 600;
    color: #f4f4f4;
    display: flex;
    padding: 10rpx;
    width: fit-content;
}
.my_header_down {
    padding: 18rpx 114rpx 0;
    box-sizing: border-box;
    display: flex;
}
.my_header_down_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 60rpx;
}
.my_header_down_item_price {
    display: flex;
    align-items: flex-end;
}
.my_header_down_item_price_num {
    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
}
.my_header_down_item_price_text {
    font-size: 20rpx;
    font-weight: 400;
    color: #ffffff;
    margin-left: 8rpx;
}
.my_header_down_item_text {
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
}

/* 余额、积分、优惠券数量信息 */
.num-info-box {
    height: 130rpx;
    background-color: #fff;
    border-radius: 16rpx;
    font-size: 24rpx;
    color: #222;
    margin-top: 58rpx;
}
.num-info-box .count-num {
    font-size: 32rpx;
}

/* 订单 */
.my_order {
    width: 710rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin: 20rpx auto 0;
    padding: 0 30rpx 0 16rpx;
    box-sizing: border-box;
    box-shadow: 0px 6px 12px rgba(248, 248, 248, 1);
}
.my_order_title {
    height: 76rpx;
    line-height: 76rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    border-bottom: 1rpx solid #e4e4e4;
}
.my_order_content {
    display: flex;
    justify-content: space-between;
}
.my_order_content_item {
    padding-bottom: 20rpx;
    width: 20%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.img-container {
    position: relative;
}
.my_order_content_item .number {
    width: 26rpx;
    height: 26rpx;
    line-height: 26rpx;
    background: #ffffff;
    border: 1px solid #ff1c30;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ff1d2e;
    opacity: 1;
    position: absolute;
    top: 6rpx;
    right: 6rpx;
    text-align: center;
}
.my_order_content_item image {
    width: 90rpx;
    height: 90rpx;
}
.my_order_content_item view {
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
}
.my_tool {
    padding-top: 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}
.my_tool_item {
    width: 166rpx;
}
/* 小店 */
.my_shop {
    padding: 10rpx 0rpx 14rpx 34rpx;
}
.my_shop_text_one {
    font-size: 26rpx;
    font-weight: 400;
    color: #333333;
}
.my_shop_text_two {
    font-size: 20rpx;
    font-weight: 400;
    color: #333333;
    margin: 12rpx 0 10rpx;
}
.my_shop_btn {
    display: flex;
    justify-content: flex-end;
}
.my_shop_btn_text {
    width: 120rpx;
    height: 56rpx;
    background: #3584f9;
    box-shadow: 0px 2rpx 2rpx rgba(0, 0, 0, 0.16);
    border-radius: 10rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 56rpx;
    text-align: center;
    color: #ffffff;
}

.plate-box {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    align-items: center;
}
.plate-box .plate-title {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #e4e4e4;
}
</style>
