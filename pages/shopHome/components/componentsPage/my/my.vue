<template>
    <view class="my">
        <!-- 头部 -->
        <view class="my_header">
            <view class="header">
                <!-- 头像部分 -->
                <view class="head-portrait">
                    <image class="via" :src="userInfo.avatarUrl"></image>
                    <view>
                        <view class="nameBox">
                            <text class="name">{{ userInfo.nickName ? userInfo.nickName : '补充信息' }}</text>
                            <!-- 以下为普通会员的接口 -->
                            <!-- <view class="vip" bindtap="toMember" wx:if="{{userInfo.status==1&&userInfo.memberLeve}}">
              <text wx:if="{{userInfo.status==1&&userInfo.memberLeve}}" class="vipText">{{userInfo.memberLeve.name}}</text>
              <text wx:if="{{userInfo.status==1&&!userInfo.memberLeve}}" class="vipText">未激活会员</text>
              <image class="vipImage" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2FGroup%201099%402x.png" bindtap=""></image>
            </view> -->
                            <!-- 新接口去往卡卷 -->
                            <view class="vip" @tap="goCoupons" v-if="userInfo.status == 1 && userInfo.memberLeve">
                                <image
                                    class="vipImage"
                                    mode="aspectFill"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%88%91%E7%9A%84%E5%8D%A1%E5%8D%B7.png"
                                    @tap=""
                                ></image>
                            </view>
                        </view>
                        <!-- 签名接口需要调整 -->
                        <navigator hover-class="none" class="user-modify-btn" url="/pages/Modify/Modify">{{ userInfo.signature || '该用户暂未设置签名~' }}</navigator>
                    </view>
                </view>
                <!-- 积分和优惠券 -->
                <!-- <view class="coupons">
        <view bindtap="{{activityInfo.integralSettingStatus?'goIntegral':''}}" wx:if="{{signData.signinUserList.length > 0}}">
          <view>
            <text>积分乐园</text>
            <text>{{jifenNum?jifenNum:"0"}}</text>
          </view>
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%88%91%E7%9A%84%E7%A7%AF%E5%88%86.png"></image>
        </view>
        <view bindtap="goCoupons">
          <view>
            <text>我的卡卷</text>
            <text>{{CouponsNum}}</text>
          </view>
          <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%8D%A1%E5%8D%B7.png"></image>
        </view>
      </view> -->
            </view>
            <image
                class="header_bgc"
                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%A4%B4%E9%83%A8%E8%83%8C%E6%99%AF%402x.png"
            ></image>
        </view>

        <!-- 店铺公告 -->
        <!-- <view  wx:if="{{list.length>0}}">
    <swiper style="margin-top:58rpx;" class="notice-box {{noticeBox}} " vertical autoplay circular easing-function='easeInOutCubic'>
      <swiper-item class='me-fx-row me-fx-start-c notice-content {{contentBox}}' wx:for='{{list}}' wx:key='index'>
        <text class='icon icon-notice {{textColor}}'></text>
        <text class='me-fx-1 me-full-text {{textColor}} text_eee'>店铺公告：{{item.content}}</text>
      </swiper-item>
    </swiper>
  </view> -->

        <!-- 签到 -->
        <signInHome :userInfo="userInfo" :firstSignInData="signData"></signInHome>
        <!-- 普通订单 -->
        <view class="regular-orders">
            <view class="activity">
                <text>普通订单</text>
            </view>
            <view class="details">
                <navigator
                    hover-class="none"
                    :url="'/pages/order/' + item.page + '/' + item.page + '?activeTab=2&marchantId=' + marchantId + '&tabsItem=' + index"
                    v-for="(item, index) in deliveryOrderList"
                    :key="index"
                >
                    <image :src="item.icon"></image>

                    <text>{{ item.name }}</text>

                    <text v-if="item.name == '物流订单' && regularOrdersNum > 0" class="orderNumber">{{ regularOrdersNum }}</text>

                    <text v-if="item.name == '到店订单' && bookingOrdersNum > 0" class="orderNumber">{{ bookingOrdersNum }}</text>

                    <text v-if="item.name == '同城订单' && sameOrderNum > 0" class="orderNumber">{{ sameOrderNum }}</text>
                </navigator>
                <!-- <view bindtap="toOrder">
                    <image src="../../../../static/My/到店订单.png"></image>
                    <text>到店订单</text>
                </view>
                <view bindtap="toOrder">
                    <image src="../../../../static/My/邀一返三.png"></image>
                    <text>同城订单</text>
                </view> -->
            </view>
        </view>

        <!-- 活动订单 -->
        <view class="regular-orders">
            <view class="activity">
                <text>活动订单</text>
            </view>
            <view class="details">
                <navigator hover-class="none" @tap="toActive" :data-idx="index" v-for="(item, index) in toolList" :key="index">
                    <image :src="item.icon"></image>

                    <text>{{ item.name }}</text>

                    <!-- <text wx:if="{{item.name == '拼团' && toolsListNums.jsmsOrderCount > 0}}" class="orderNumber">{{toolsListNums.jsmsOrderCount}}</text> -->

                    <text v-if="item.name == '秒杀' && toolsListNums.ttptOrderCount > 0" class="orderNumber">{{ toolsListNums.ttptOrderCount }}</text>

                    <!-- <text wx:if="{{item.name == '邀一退三' && toolsListNums.tsfyOrderCount > 0}}" class="orderNumber">{{toolsListNums.tsfyOrderCount}}</text> -->
                </navigator>
            </view>
        </view>

        <!-- 会员权益，如果不是会员 -->
        <view class="regular-orders" v-if="userInfo.status == 1 && !userInfo.memberLeve && codeInfo.length > 0">
            <view class="activity">
                <text>官方粉丝群</text>
            </view>
            <view class="details">
                <navigator class="navwidth" hover-class="none" @tap="goimg">
                    <image
                        src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E7%A6%8F%E5%88%A9%E7%A4%BE%E7%BE%A4icon.png"
                    ></image>
                    <text>官方粉丝群</text>
                </navigator>
            </view>
        </view>

        <!-- 会员权益，如果是会员 -->
        <view class="memberRight" v-if="userInfo.status == 1 && userInfo.memberLeve">
            <view class="rightContent">
                <view @tap="toMember">
                    <text class="memberLevel">{{ userInfo.memberLeve.name }}</text>
                    <text class="currentIntegral">会员积分: {{ memberInfo.member.integral || 0 }}</text>
                    <view>
                        <text>会员等级</text>
                        <image
                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E4%BC%9A%E5%91%98%E6%9D%83%E7%9B%8Amore.png"
                            class="levelMore"
                            mode="widthFix"
                        ></image>
                    </view>
                    <image
                        class="memberRight-Img"
                        mode="aspectFill"
                        src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E4%BC%9A%E5%91%98%E6%9D%83%E7%9B%8AImg.png"
                    ></image>
                </view>
                <view class="memberGoods">
                    <view class="memberGoodsContent">
                        <view @tap="aciveUrl">
                            <image
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E4%BC%9A%E5%91%98%E5%95%86%E5%93%81icon.png"
                            ></image>
                            <text>会员商品</text>
                        </view>
                        <view @tap.stop.prevent="goimg" v-if="codeInfo.length > 0">
                            <image
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E7%A6%8F%E5%88%A9%E7%A4%BE%E7%BE%A4icon.png"
                            ></image>
                            <text>官方粉丝群</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- <view class="my_order">
    <view class="my_order_title">我的工具</view>
    <view class="my_tool">
      <block wx:for="{{toolList}}" wx:key="index">
        <view wx:if="{{!orderSwitch&&item.name=='购物车'}}"></view>
        <view wx:else class="my_order_content_item my_tool_item" bindtap="pagesTo" data-idx="{{index}}">
          <image style="width:40rpx;height:40rpx;margin-bottom:6rpx" src="{{item.icon}}"></image>
          <view>{{item.name}}</view>
          <view wx:if='{{toolsListNums[item.numKey]>0}}' class='badge-style'></view>
        </view>
      </block>
    </view>
  </view> -->
        <!-- 精选服务,由我的工具改版 -->
        <view class="service">
            <!-- 文本 -->
            <view class="text">
                <text>精选服务</text>
            </view>
            <!-- 内容 -->
            <view class="content">
                <view class="single" :url="item.url" @tap="pagesTo" :data-idx="index" v-for="(item, index) in service" :key="index">
                    <image class="icon" :src="item.icon"></image>

                    <text>{{ item.name }}</text>

                    <image
                        class="more-icon"
                        mode="widthFix"
                        src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2Fmore-icon.png"
                    ></image>
                </view>
            </view>
        </view>
        <!-- 以下为原福利社群展示轮播图 -->
        <!-- <swiper style="height:200rpx" wx:if="{{codeInfo.length>0}}" autoplay="true" interval="3000" duration="1000">
    <swiper-item wx:for="{{codeInfo}}" wx:key='index' circular>
      <view class="my_code">
        <image class="code_img" src="../../../../static/code_bg.png"></image>
        <view class="me-fx-row code_content">
          <view class="code_left">
            <view class="code_left_name me-full-text">{{item.wechatgroupname}}</view>
            <view class="code_left_desc me-full-text">{{item.describes?item.describes:""}}</view>
          </view>
          <view class="me-fx-1 me-fx-row me-fx-c-c">
            <view class="me-fx-col">
              <image class="code_right_img" data-src="{{item.wechatgroupqrcode}}" bindtap="goimg" src="{{item.wechatgroupqrcode}}"></image>
              <text class="code_right_btn" data-src="{{item.wechatgroupqrcode}}" bindtap='saveImg'>保存二维码</text>
            </view>
            <text class="code_right_text">点击长按识别</text>
          </view>
        </view>
      </view>
    </swiper-item>
  </swiper> -->

        <!-- <view class='plate-box' style='margin-bottom:10px;'>
            <view class='plate-title'></view>
            <view class='nav-list-container'>
                <navigator hover-class='none' hover-class='none' class='nav-item-box' wx:for='{{reservationList}}' wx:key='index' url="/pages/order/orderListTake/orderListTake?tabsitem={{index}}">
                    <image class='nav-icon-img' src='{{"../../../image/tabpage/"+item.icon+".png"}}'></image>
                    <text>{{item.name}}</text>
                    <view class="number" wx:if="{{toStoreOrderNum[index]}}">{{toStoreOrderNum[index]}}</view>
                </navigator>
            </view>
        </view> -->

        <!-- 我的足迹 -->
        <!-- <view class='me-fx-row me-fx-sb my_order plate-box'>
      <view class='my_order_title' style='border:none;'>我的足迹</view>
      <navigator hover-class='none' hover-class='none' class='more-navigor' 
        url="/pages/Index/myFootPrint/myFootPrint"
      >更多>></navigator>
  </view> -->

        <!-- <image class="my_to_register" 
    src="/pages/img/my/index_me_store_apply.png" 
  ></image> -->
    </view>
</template>

<script>
import signInHome from '../../signInHome/signInHome';
let app = getApp();
export default {
    components: {
        signInHome
    },
    data() {
        return {
            // 普通订单渲染数据
            regularOrdersNum: 0,

            // 普通订单数量
            bookingOrdersNum: 0,

            // 活动订单数量
            sameOrderNum: 0,

            // 同城订单数量
            memberInfo: {
                member: {
                    integral: ''
                }
            },

            // 会员积分
            deliveryOrderList: [
                {
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E7%89%A9%E6%B5%81%E8%AE%A2%E5%8D%95.png',
                    name: '物流订单',
                    page: 'orderList' // 不同的组件，原为普通订单
                },
                {
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%88%B0%E5%BA%97%E8%AE%A2%E5%8D%95.png',
                    name: '到店订单',
                    page: 'orderListTake'
                },
                {
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%90%8C%E5%9F%8E%E8%AE%A2%E5%8D%95.png',
                    name: '同城订单',
                    page: 'orderListCity'
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

            reservationList: [
                //预定/自取
                {
                    name: '待付款',
                    icon: 'me_icon1'
                },
                {
                    name: '待自取',
                    icon: 'me_icon2'
                },
                {
                    name: '已完成',
                    icon: 'me_icon4'
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
            ],

            distributionList: [
                //同城配送
                {
                    name: '待付款',
                    icon: 'me_icon1'
                },
                {
                    name: '待接单',
                    icon: 'me_icon2'
                },
                {
                    name: '待收货',
                    icon: 'me_icon6'
                },
                {
                    name: '已完成',
                    icon: 'me_icon4'
                },
                {
                    name: '已退款',
                    icon: 'me_icon5'
                }
            ],

            // 活动订单渲染数据
            toolList: [
                // {
                // icon: '/pages/img/my/kefu.png', name: '客服',
                // url:'/pages/order/contact/contact'
                // },
                {
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E7%A7%92%E6%9D%80.png',
                    name: '秒杀',
                    jump: true,
                    url: '/pages/seckill/order-classify/order-classify',
                    numKey: 'jsmsOrderCount'
                }
            ],

            // 精选服务渲染数据
            service: [
                // {
                //   name: '我的收藏',
                //   icon: '../static/My/收藏.png',
                //   jump: true,
                //   page: ''
                // },
                {
                    name: '我的地址',
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E6%94%B6%E8%97%8F.png',
                    jump: true,
                    url: '/pages/Address/AddressList/AddressList'
                },
                {
                    name: '发票信息',
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%8F%91%E7%A5%A8%E4%BF%A1%E6%81%AF.png',
                    jump: true,
                    url: '/pages/Invoice/InvoiceList/InvoiceList'
                },
                {
                    icon: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FMy%2F%E5%9C%A8%E7%BA%BF%E5%AE%A2%E6%9C%8D.png',
                    name: '在线客服',
                    url: '/pages/order/contact/contact'
                }
            ],

            headList: [
                // { val: 0, unit: '元',name: '余额' },
                {
                    val: 0,
                    unit: '分',
                    name: '积分'
                },
                {
                    val: 0,
                    unit: '张',
                    name: '优惠券'
                }
            ],

            jifenNumClone: 0,
            isAuthorization: false,
            type: 0,
            jifenNumClone: '',
            orderNumClone: [],
            cityOrderNumClone: [],
            toStoreOrderNumClone: [],
            noticeNumClone: 0
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        signData: Object,
        // 签到数据
        mainBusinessModel: {
            type: String
        },
        userInfo: {
            type: Object,
            default: () => ({})
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
        },
        CouponsNum: {
            type: [Number, String]
        },
        jifenNum: {
            type: [Number, String],
            default: 0
        },
        activityInfo: {
            type: Object
        },
        list: {
            type: Array,
            default: () => []
        },
        codeInfo: {
            type: Array
        },
        orderSwitch: {
            type: [Number, String]
        },
        toolsListNums: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        orderNum: {
            handler: function (nowVal) {
                this.orderNumClone = this.deepClone(this.orderNum);
                let count = 0;

                for (let item of nowVal) {
                    count += item;
                }

                this.setData({
                    regularOrdersNum: count
                });
            },

            immediate: true,
            deep: true
        },

        toStoreOrderNum: {
            handler: function (nowVal) {
                this.toStoreOrderNumClone = this.deepClone(this.toStoreOrderNum);
                let count = 0;

                for (let item of nowVal) {
                    count += item;
                }

                this.setData({
                    bookingOrdersNum: count
                });
            },

            immediate: true,
            deep: true
        },

        cityOrderNum: {
            handler: function (nowVal) {
                this.cityOrderNumClone = this.deepClone(this.cityOrderNum);
                let count = 0;

                for (let item of nowVal) {
                    count += item;
                }

                this.setData({
                    sameOrderNum: count
                });
            },

            immediate: true,
            deep: true
        },

        jifenNum: {
            handler: function (newVal, oldVal) {
                this.jifenNumClone = newVal;
            },

            immediate: true
        },

        noticeNum: {
            handler: function (newVal, oldVal) {
                this.noticeNumClone = newVal;
            },

            immediate: true
        }
    },
    beforeMount: function () {
        // this.getQueryInte()
        // this.getOrderNum();//获取数量
        this.getMemberInfo();
    },
    destroyed: function () {},
    /* 组件的方法列表 */
    methods: {
        // 跳转激活会员
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

        // 旧跳转接口
        // pagesTo(e) {
        //   let idx = e.currentTarget.dataset.idx;
        //   var configItem = this.data.toolList[idx];
        //   if (configItem.jump) {
        //     wx.navigateTo({
        //       url: configItem.url
        //     });
        //   } else {
        //     this.triggerEvent('pagesTo', idx)
        //   }
        // },
        // 新精选服务跳转接口
        pagesTo(e) {
            let idx = e.currentTarget.dataset.idx;
            var configItem = this.service[idx];

            if (configItem.jump) {
                uni.navigateTo({
                    url: configItem.url
                });
            } else {
                this.$emit('pagesTo', {
                    detail: 0
                }); //由于父组件触发函数需要0，所以传个零，不然无法进入客服页面
            }
        },

        // 跳转活动页面
        toActive(e) {
            let idx = e.currentTarget.dataset.idx;
            var configItem = this.toolList[idx];

            if (configItem.jump) {
                uni.navigateTo({
                    url: configItem.url
                });
            }
        },

        //  暂时跳优惠券
        toDetail(e) {
            let idx = e.currentTarget.dataset.idx;
            this.$emit('toDetail', {
                detail: idx
            });
        },

        getQueryInte() {
            let that = this;
            app.globalData
                .sjrequest('/integral/queryInte', {
                    marchantId: this.marchantId
                })
                .then((res) => {
                    that.setData({
                        jifenNumClone: res.data.data.score
                    });
                });
        },

        // 获取数字
        getOrderNum() {
            var data = {
                type: 2,
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/basic/queryCountAmount', data).then((res) => {
                var result = res.data.data;
                var orderNum = [result.citywideOrderState0, result.citywideOrderState1, result.citywideOrderState2, 0, result.citywideRefundState];
                var cityOrderNum = [result.sendState0, result.sendState1, result.sendState2];
                let couponNum = 'headList[1].num';
                var toStoreOrderNum = [result.fetchState0, result.fetchState1, 0];
                this[headList[1].num] = result.countUserCoupons;
                this.setData({
                    orderNumClone: orderNum,
                    cityOrderNumClone: cityOrderNum,
                    toStoreOrderNumClone: toStoreOrderNum,
                    noticeNumClone: result.sumCount
                });
            });
        },

        //授权
        bindGetUserInfo(res) {
            uni.getUserProfile({
                lang: 'zh_CN',
                desc: '获取用户信息',
                complete: (res) => {
                    console.log('授权信息=====：', res);

                    if (res.encryptedData) {
                        this.setData({
                            isAuthorization: false
                        });
                        console.log(res, '5555555555555555');
                        uni.setStorageSync('wx_userinfo_key', res); //同意授权

                        this.login();
                    } else {
                        //拒绝授权
                        setTimeout(() => {
                            uni.showToast({
                                title: '授权未成功',
                                icon: 'none'
                            });
                        }, 1000);
                        this.cancel();
                    }
                }
            });
        },

        cancel() {
            var pages = getCurrentPages();
            var beforePage = pages[pages.length - 2];
            uni.navigateBack({
                delta: 0,
                success: function () {
                    beforePage.onLoad(app.globalData.options);
                }
            });
        },

        //登录
        login() {
            var that = this;
            var userInfo = uni.getStorageSync('wx_userinfo_key');
            var encryptedData = userInfo.encryptedData;
            var iv = userInfo.iv;
            var openid = uni.getStorageSync('thirdWxOpenId');
            let appid = uni.getStorageSync('appid');
            let data = {
                appid,
                openid,
                encryptedData,
                iv
            };
            uni.showLoading({
                title: '加载中'
            });
            app.globalData.sjrequest('/thirdWxLogin/auth', data).then((res) => {
                uni.hideLoading();
                that.cancel();
                that.$emit('reload');
            });
        },

        goCoupons() {
            console.log('999');
            uni.navigateTo({
                url: `/pages/Index/couponList/couponList?marchantId=${this.marchantId}`
            });
        },

        goIntegral() {
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${this.marchantId}`
            });
        },

        saveImg(e) {
            let img = e.currentTarget.dataset.src;
            uni.downloadFile({
                url: img,

                success(e) {
                    uni.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,

                        success() {
                            uni.showToast({
                                title: '保存成功',
                                icon: 'none'
                            });
                        }
                    });
                },

                fail(e) {
                    console.log(e);
                }
            });
        },

        aciveUrl(e) {
            let marchantId = this.marchantId;
            var mainBusinessModel = this.mainBusinessModel;
            uni.navigateTo({
                url: '/pages/shopHome/member/member?marchantId=' + marchantId + '&mainOrderType=' + mainBusinessModel
            });
        },

        // 展示图片
        goimg(e) {
            let srcArr = [];

            for (let arr of this.codeInfo) {
                srcArr.push(arr.wechatgroupqrcode);
            }

            uni.previewImage({
                urls: srcArr
            });
        },

        getMemberInfo() {
            let data = {
                marchantId: this.marchantId,
                type: 1
            };
            app.globalData.sjrequest('/member/queryMemberInfo', data).then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.data, '会员积分');
                    this.setData({
                        memberInfo: res.data.data
                    });

                    if (res.data.data.member) {
                        this.setData({
                            type: 1
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
@import '../../../../../styles/me_common.css';

/* pages/Index/components/my/my.wxss */
/* 我的 */
.my {
    padding: 200rpx 30rpx 30rpx 30rpx;
}

/* 精选服务 */
.service {
    background-color: white;
    padding-bottom: 10rpx;
    width: 690rpx;
    border-radius: 40rpx;
    margin-top: 30rpx;
}

.service .text {
    width: 100%;
    height: 100rpx;
}

.service .text > text {
    font-size: 36rpx;
    display: inline-block;
    margin-top: 40rpx;
    margin-left: 40rpx;
    font-weight: bold;
}

.service .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.service .content .single {
    height: 110rpx;
    width: 634rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.service .content .single:not(:last-child) {
    border-bottom: 1rpx solid #e2e2e2;
}

.service .content .single .icon {
    width: 52rpx;
    height: 52rpx;
}

.service .content .single text {
    flex-basis: 80%;
    font-size: 30rpx;
    font-weight: 400;
    color: #444;
}

.service .content .single .more-icon {
    width: 40rpx;
    height: 40rpx;
}

/* 精选服务 */
/* 订单css */
.regular-orders {
    width: 100%;
    height: 232rpx;
    background-color: white;
    margin-top: 30rpx;
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
}

.regular-orders .activity {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
}

.regular-orders .activity > text {
    font-size: 35rpx;
    margin-left: 50rpx;
    margin-top: 10rpx;
    font-weight: bold;
}

.regular-orders .details {
    width: 100%;
    height: 150rpx;
    display: flex;
    align-items: center;
    padding: 0 0 0 50rpx;
}

.regular-orders .details navigator {
    width: 105rpx;
    height: 105rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 80rpx;
    position: relative;
}

.regular-orders .details .navwidth {
    width: 125rpx;
    height: 105rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 80rpx;
}

.regular-orders .details navigator text:nth-of-type(1) {
    font-size: 24rpx;
}

.regular-orders .details navigator .orderNumber {
    position: absolute;
    top: -10rpx;
    right: 10rpx;
    width: 30rpx;
    background-color: #ff5757;
    height: 30rpx;
    font-size: 26rpx;
    color: white;
    line-height: 30rpx;
    text-align: center;
    border: white 2rpx solid;
    border-radius: 40rpx;
}

.regular-orders .details navigator image {
    width: 60rpx;
    height: 60rpx;
}

/* 订单css */
/* 头部 */

.my_header > image {
    width: 100%;
    height: 660rpx;
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    z-index: 0;
}

.header {
    width: 100%;
    height: 160rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin-bottom: 30rpx;
    z-index: 1;
}

.header .head-portrait {
    width: 100%;
    height: 160rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .head-portrait .vip {
    width: 112rpx;
    height: 32rpx;
    position: absolute;
}

.header .head-portrait .via {
    width: 128rpx;
    height: 128rpx;
    background-color: #ffafaf;
    border-radius: 500rpx;
}

.header .head-portrait > view {
    width: 510rpx;
    height: 110rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.header .head-portrait > view > navigator:nth-of-type(1) {
    font-size: 25rpx;
    color: #333;
    font-weight: 500;
}

.header .head-portrait > view .nameBox {
    width: 510rpx;
    height: 70rpx;
    display: flex;
}

.header .head-portrait > view .nameBox .name {
    width: 340rpx;
    font-size: 45rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.header .head-portrait > view .nameBox .vip {
    height: 40rpx;
    position: relative;
    right: -85rpx;
    top: 30rpx;
}

.header .head-portrait > view .nameBox .vip .vipImage {
    width: 114rpx;
    height: 46rpx;
    position: absolute;
}

.header .head-portrait > view .nameBox .vip .vipText {
    color: #e5d3b6;
    font-size: 18rpx;
    position: absolute;
    z-index: 2;
    left: 50rpx;
    top: 6rpx;
}

.header .coupons {
    width: 100%;
    height: 130rpx;
    display: flex;
    justify-content: space-between;
}

.header .coupons > view {
    width: 332rpx;
    height: 122rpx;
    position: relative;
}

.header .coupons > view > view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 177rpx;
    height: 80rpx;
    margin-left: 28rpx;
    margin-top: 23rpx;
}

.header .coupons > view > view text {
    font-size: 28rpx;
    position: relative;
    z-index: 11;
}

.header .coupons > view image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

/* 头部 */

/* 以上为新html的css代码 ————————————————————————————————————————————————————————————————————————————————  ————————————  -————————*/
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
    color: #333;
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
    flex-shrink: 0;
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
    color: #333;
    display: flex;
    /* padding: 10rpx; */
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
    width: 133rpx;
    position: relative;
}

.my_tool_item .badge-style {
    color: #fff;
    position: absolute;
    top: -10rpx;
    right: 20rpx;
    background-color: red;
    font-size: 22rpx;
    border-radius: 50%;
    width: 20rpx;
    height: 20rpx;
    text-align: center;
    line-height: 20rpx;
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

.my_to_register {
    width: 100%;
    height: 244rpx;
    margin-top: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.notice-box {
    height: 80rpx;
    background-color: #fff;
    color: #000;
    margin: 0rpx 24rpx;
    padding: 10rpx;
    border-radius: 16rpx;
}

.text_eee {
    font-size: 24rpx;
    -webkit-line-clamp: 2;
}

.my_code {
    position: relative;
    height: 192rpx;
    width: 710rpx;
    margin: 20rpx auto;
}

.code_img {
    height: 192rpx;
    width: 710rpx;
    position: absolute;
    top: 0;
    z-index: 9;
}

.code_content {
    z-index: 99;
    position: relative;
    height: 100%;
}

.code_left {
    width: 420rpx;
    margin: 20rpx;
    flex-shrink: 0;
}

.code_left_name {
    font-weight: bold;
    font-size: 28rpx;
    color: #333;
    text-align: center;
}

.code_left_desc {
    font-size: 24rpx;
    color: #999999;
    -webkit-line-clamp: 3;
}

.code_right_img {
    width: 120rpx;
    height: 120rpx;
    background-color: #e4e4e4;
}

.code_right_btn {
    border: 1px solid #000000;
    border-radius: 8rpx;
    background-color: #000;
    color: #fff;
    font-size: 20rpx;
    font-weight: bold;
    text-align: center;
    margin-top: 10rpx;
}

.code_right_text {
    width: 20rpx;
    font-size: 18rpx;
    color: #999999;
    margin-left: 20rpx;
}

.memberRight {
    margin-top: 30rpx;
    width: 100%;
}

.memberRight .rightText {
    display: inline-block;
    height: 60rpx;
    margin-left: 50rpx;
    font-weight: bold;
    font-size: 35rpx;
    color: #333;
}

.memberRight .rightContent {
    height: 480rpx;
}

.memberRight .rightContent view:nth-child(1) {
    height: 270rpx;
    position: relative;
}

.memberRight .rightContent view:nth-child(1) .memberLevel {
    position: absolute;
    font-size: 52rpx;
    font-weight: 600;
    color: #e4a24b;
    left: 50rpx;
    top: 30rpx;
    z-index: 1;
}

.memberRight .rightContent view:nth-child(1) .currentIntegral {
    position: absolute;
    font-size: 28rpx;
    left: 50rpx;
    color: #e4a24b;
    top: 120rpx;
    z-index: 1;
}

.memberRight .rightContent > view:nth-child(1) > view {
    width: 118rpx;
    height: 30rpx;
    position: absolute;
    font-size: 28rpx;
    left: 50rpx;
    color: #e4a24b;
    bottom: 22rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}

.memberRight .rightContent view:nth-child(1) > view > image {
    width: 12rpx;
}

.memberRight .rightContent view:nth-child(1) > view > text {
    font-size: 24rpx;
    color: #e4a24b;
}

.memberRight .rightContent view:nth-child(1) .memberRight-Img {
    width: 100%;
    height: 270rpx;
    position: absolute;
    top: 0;
    z-index: 0;
}

.memberRight .rightContent .memberGoods {
    width: 100%;
    height: 210rpx;
    background-color: rgb(255, 255, 255);
    border-radius: 0 0 20rpx 20rpx;
    display: flex;
    justify-content: center;
}

.memberRight .rightContent .memberGoods .memberGoodsContent {
    width: 400rpx;
    height: 210rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.memberRight .rightContent .memberGoods .memberGoodsContent view {
    width: 130rpx;
    height: 120rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.memberRight .rightContent .memberGoods .memberGoodsContent view > image {
    width: 74rpx;
    height: 74rpx;
}

.memberRight .rightContent .memberGoods .memberGoodsContent view > text {
    font-size: 24rpx;
    color: #3a3a3a;
}
</style>
