<template>
    <view>
        <store-close v-if="isClose"></store-close>
        <view>
            <view class="swiper-container">
                <swiper :indicator-dots="true" interval="3000" :style="'height:' + appWidth + 'px'" indicator-active-color="#fff" @change="swiperChange">
                    <swiper-item v-if="detailData.videoUrl">
                        <video id="swiperVideo" :src="detailData.videoUrl" :style="'width:100%;height:' + appWidth + 'px;'" mode="aspectFit" :poster="detailData.videoCover" />
                    </swiper-item>
                    <block v-for="(item, index) in detailData.imagList" :key="index">
                        <swiper-item>
                            <image
                                :src="item"
                                :style="'width:100%;height:' + appWidth + 'px;'"
                                mode="aspectFit"
                                :data-list="detailData.imagList"
                                :data-src="item"
                                @tap="imgClick"
                            />
                        </swiper-item>
                    </block>
                </swiper>
                <image v-if="detailData.remainingTime" class="sale-hot-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/sale-hot.png"></image>
            </view>
            <view class="goods-head">
                <!--  -->
                <view class="goods-price" style="width: 100%">
                    <view v-if="!(detailData.activityType == 1 || (detailData.activityType == 2 && detailData.isMember))">
                        <view style="font-size: 14px">
                            ￥
                            <text class="price">{{ DefaultSpec.originalPrice }}</text>
                        </view>
                    </view>
                    <view v-else>
                        <view>
                            ￥
                            <text class="origin-price">{{ DefaultSpec.lowPrice }}</text>
                        </view>
                        <view class="sale-box" v-if="DefaultSpec.originalPrice != DefaultSpec.lowPrice">
                            ￥
                            <text style="text-decoration: line-through; margin-left: 5px">{{ DefaultSpec.originalPrice }}</text>
                        </view>
                    </view>
                    <view class="like-share-box">
                        <!-- <view class="share-box" bindtap="selectIsLike">
        <image wx:if="{{!isLike}}" src="/pages/img/goods/like.png" class="goods-share-icon" />
        <image wx:else src="/pages/img/goods/liked.png" class="goods-share-icon" />
        {{!isLike?'收藏':'已收藏'}}
      </view> -->
                        <view class="share-box" @tap="parseEventDynamicCode($event, detailData.subscribe ? '' : 'showDingYue')">
                            <image
                                :src="
                                    detailData.subscribe
                                        ? 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/shop-dingyue-not.png'
                                        : 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/shop-dingyue-Ok.png'
                                "
                                class="goods-share-icon"
                            />
                            {{ detailData.subscribe ? '已通知' : '降价通知' }}
                        </view>
                    </view>
                </view>
                <!-- <van-sticky style="width:100%" wx:else>
    <view class="goods-sale-price-content" style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg1.png)">
    <view class="goods-price-box">
      <view class="no-sale-box">
        ￥<text class="origin-price">{{DefaultSpec.lowPrice}}</text>
      </view>
      <view class="sale-box" wx:if="{{DefaultSpec.originalPrice!=DefaultSpec.lowPrice}}">
        ￥<text style="text-decoration: line-through; margin-left: 5px;">{{DefaultSpec.originalPrice}}</text>
      </view>
      <view class="goods-price-box-member" wx:if="{{detailData.activityType==2}}">{{detailData.memberLevel.discount==10?'普通会员无优惠':detailData.memberLevel.name+'已优惠￥'+(DefaultSpec.originalPrice*1000-DefaultSpec.lowPrice*1000)/1000}}</view>
    </view>
    <view class="sale-text">{{detailData.commodityName}}</view>
  </view>
  </van-sticky> -->
            </view>
            <view v-if="!(detailData.activityType == 1 || (detailData.activityType == 2 && detailData.isMember))" class="goods-title">
                <image src="/static/pages/img/ziying.png" class="ziying" />
                {{ detailData.commodityName }}
            </view>
            <view v-if="!(detailData.activityType == 1 || (detailData.activityType == 2 && detailData.isMember))" class="goods-subtitle">{{ detailData.description }}</view>
            <view v-if="detailData.activityType == 1 || (detailData.activityType == 2 && detailData.isMember)" class="goods-subtitle-pro">
                <view class="des-box">
                    <image src="/static/pages/img/ziying.png" class="ziying" />
                    {{ detailData.description }}
                </view>
                <view class="like-share-box">
                    <!-- <view class="subscribe-box">
        <view style="width:100%;height:100%;" wx:if="{{!detailData.subscribe}}" bindtap="showDingYue">
          <view>订阅</view>
          <view>商品</view>
        </view>
        <view style="width:100%;height:100%;background-color:#ccc" wx:if="{{detailData.subscribe}}">
          <view>订阅</view>
          <view>成功</view>
        </view>
      </view> -->
                    <!-- <view class="share-box" bindtap="selectIsLike">
        <image wx:if="{{!isLike}}" src="/pages/img/goods/like.png" class="goods-share-icon" />
        <image wx:else src="/pages/img/goods/liked.png" class="goods-share-icon" />
        {{!isLike?'收藏':'已收藏'}}
      </view> -->
                    <!-- <view class="share-box"  bindtap="{{detailData.subscribe?'':'showDingYue'}}">
        <image src="{{detailData.subscribe?'/pages/img/goods/yidingyue.png':'/pages/img/goods/dingyue.png'}}" class="goods-share-icon" />
        {{detailData.subscribe?'已订阅':'订阅'}}
      </view> -->
                </view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1" v-if="!showCountDown"></view>
            <!-- 限时抢购 -->
            <view class="activity-container" v-if="detailData.remainingTime">
                <view class="activity-container-content">
                    <image class="activity-container-content-image" src="/static/pages/img/goods/xsqg.png"></image>
                    <view class="rematr-sale">
                        <view>距结束还剩：</view>
                        <van-count-down
                            class="activity-container-content-count-down"
                            :time="detailData.remainingTime * 1000"
                            @finish="finishedCountDown"
                            @change="changeTime"
                            use-slot
                        >
                            <view class="list_item_onLookers">
                                <text v-if="detailData.timeData.days != 0">{{ detailData.timeData.days }}</text>
                                <text v-if="detailData.timeData.days != 0" style="padding-right: 10rpx">天</text>
                                <text class="time-box">{{ detailData.timeData.hours < 10 ? '0' + detailData.timeData.hours : detailData.timeData.hours }}</text>
                                <text class="time-sybmol">:</text>
                                <text class="time-box">{{ detailData.timeData.minutes < 10 ? '0' + detailData.timeData.minutes : detailData.timeData.minutes }}</text>
                                <text class="time-sybmol">:</text>
                                <text class="time-box">{{ detailData.timeData.seconds < 10 ? '0' + detailData.timeData.seconds : detailData.timeData.seconds }}</text>
                            </view>
                        </van-count-down>
                    </view>
                </view>
            </view>
            <!-- 会员信息 -->
            <view v-if="memberShow == '1' || detailData.memberLevel.name">
                <navigator
                    class="member-info"
                    v-if="detailData.memberSetting.status && detailData.activityType == 2 && !fromShop"
                    :url="'/pages/member/card/card?marchantId=' + marchantId"
                    :style="
                        'background-image:url(' +
                        (detailData.memberLevel
                            ? 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%E9%A1%B5%2F%E4%BC%9A%E5%91%98%E5%95%86%E5%93%81%E9%95%BF%E6%9D%A1.png'
                            : 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%E9%A1%B5%2F%E6%9C%AA%E6%BF%80%E6%B4%BB%E4%BC%9A%E5%91%98%E5%95%86%E5%93%81%E9%95%BF%E6%9D%A1.png') +
                        ')'
                    "
                >
                    <view class="member-content">
                        <view v-if="detailData.memberLevel" class="member-text">
                            {{ detailData.memberLevel.name }}
                            <text style="font-size: 20rpx" v-if="detailData.memberLevel.discount < 10">（当前会员享受{{ detailData.memberLevel.discount }}折折扣）</text>
                            <text style="font-size: 20rpx" v-if="detailData.memberLevel.discount == 10">（升级会员等级享受优惠！）</text>
                        </view>
                        <view v-if="!detailData.memberLevel" class="member-text">
                            未激活会员
                            <text style="font-size: 20rpx">（点击这里，快速激活）</text>
                        </view>
                    </view>
                    <view class="member-bottom-text">商家发起活动时如商家价格低于会员价以活动价为优先</view>
                </navigator>
            </view>
            <!-- 间隔 -->
            <view class="fenge1" v-if="detailData.memberSetting.status && detailData.isSetMember"></view>
            <!-- 所选参数 -->
            <view class="select-params">
                <view class="select-params-item" @tap="showSaleFun">
                    <view class="params-title">优惠</view>
                    <view class="yhq-style">
                        <text class="yhq-text-btn">{{ saleState }}</text>
                        <scroll-view :scroll-x="true" style="width: 0; flex: 1">
                            <view class="yhq-scroll">
                                <view class="yhq-box" v-for="(item, index) in saleCanList" :key="index">
                                    满{{ item.confine }}减{{ item.deduct }}

                                    <!-- <image class="left-yuan" src="/pages/img/goods/left-yuan.png"></image>
            <image class="right-yuan" src="/pages/img/goods/right-yuan.png"></image> -->
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                    <image style="width: 32rpx; height: 40rpx" src="/static/pages/img/goods/more.png"></image>
                </view>
                <!-- <view class="select-params-item" bindtap="noActivity">
    <view class="params-title">活动</view>
    <text class="params-content-text">无活动</text>
    <image style="width:32rpx;height:40rpx" src="/pages/img/goods/more.png"></image>
  </view> -->
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 所选参数 -->
            <view class="select-params">
                <view class="select-params-item" @tap="parseEventDynamicCode($event, orderSwitch ? 'selectSpec' : '')" data-type="1">
                    <view class="params-title">规格</view>
                    <text class="params-content-text">
                        <text class="params-content-text-guige">{{ DefaultSpec.itemText }}</text>
                    </text>
                    <image style="width: 32rpx; height: 40rpx" src="/static/pages/img/goods/more.png"></image>
                </view>
                <view class="select-params-item select-params-item-address" @tap="parseEventDynamicCode($event, reserve ? '' : 'selectAddress')">
                    <view class="params-title">{{ reserve ? '商家地址' : '送至' }}</view>
                    <view class="params-content-text">
                        <image src="/static/pages/img/goods/position.png" style="width: 28rpx; height: 28rpx; margin-right: 8rpx"></image>
                        <block v-if="reserve">
                            <text>{{ shopInfo.merchant.address }}</text>
                        </block>
                        <block v-else>
                            <text v-if="shipping.provincesName">{{ shipping.provincesName }}{{ shipping.cityName }}{{ shipping.areaName }}{{ shipping.address }}</text>
                            <text v-if="!shipping.provincesName" style="color: #aaa">请选择收货地址</text>
                        </block>
                    </view>
                    <image style="width: 32rpx; height: 40rpx" src="/static/pages/img/goods/more.png"></image>
                </view>
                <!-- <view class="select-params-item" wx:if="{{haveWuliu||haveTongCheng}}">
    <view class="params-title">支持配送</view>    
    <image  src="/pages/img/goods/goodsCar.png" style="width:32rpx;height:32rpx;margin-left:20rpx;" wx:if="{{haveWuliu}}" /> 
    <text class="yhq-text-btn" wx:if="{{haveWuliu}}">支持物流配送</text>
    <image  src="/pages/img/goods/city.png" wx:if="{{haveTongCheng}}" style="width:32rpx;height:32rpx;margin-left:20rpx;" /> 
    <text class="yhq-text-btn" wx:if="{{haveTongCheng}}">支持同城配送</text>
  </view> -->
                <!-- haveTongCheng&&activityId==0 -->
                <view class="select-params-item" v-if="!city && !reserve">
                    <view class="params-title" style="margin-right: 24rpx">物流发货</view>
                    <text class="take-type-btn" style="background: linear-gradient(93deg, #ff972a 0%, #fd5c00 100%)">购买</text>
                    <view class="take-type-solid" style="background: linear-gradient(263deg, #ff972a 0%, #fd5c00 100%)"></view>
                    <text class="take-type-btn" style="background: linear-gradient(93deg, #ff972a 0%, #fd5c00 100%); width: 120rpx">接单发货</text>
                    <view class="take-type-solid" style="background: linear-gradient(263deg, #ff972a 0%, #fd5c00 100%); width: 88rpx"></view>
                    <text class="take-type-btn" style="background: linear-gradient(93deg, #ff972a 0%, #fd5c00 100%); width: 120rpx">收货完成</text>
                </view>
                <view class="select-params-item" v-else-if="city">
                    <view class="params-title" style="margin-right: 24rpx">同城配送</view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ff8b50 0%, #ff5700 100%)">购买</text>
                    <view class="take-type-solid" style="background: linear-gradient(270deg, #ff8b50 0%, #ff5700 100%)"></view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ff8b50 0%, #ff5700 100%)">配送</text>
                    <view class="take-type-solid" style="background: linear-gradient(270deg, #ff8b50 0%, #ff5700 100%)"></view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ff8b50 0%, #ff5700 100%)">完成</text>
                </view>
                <view class="select-params-item" v-else-if="reserve">
                    <view class="params-title" style="margin-right: 24rpx">预订自取</view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ee7c51 0%, #e73d2c 100%)">购买</text>
                    <view class="take-type-solid" style="background: linear-gradient(270deg, #ee7c51 0%, #e73d2c 100%)"></view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ee7c51 0%, #e73d2c 100%); width: 120rpx">门店团购</text>
                    <view class="take-type-solid" style="background: linear-gradient(270deg, #ee7c51 0%, #e73d2c 100%); width: 88rpx"></view>
                    <text class="take-type-btn" style="background: linear-gradient(90deg, #ee7c51 0%, #e73d2c 100%)">完成</text>
                </view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 标签 -->
            <view class="select-params">
                <view class="select-params-item select-params-item-label" v-if="detailData.arrLabels.length != 0 && detailData.arrLabels != null" @tap="showLabel">
                    <view class="params-title">保障</view>
                    <view class="params-label-box">
                        <view class="label-item" v-for="(item, index) in detailData.arrLabels" :key="index">
                            <image src="/static/pages/img/goods/fxbuy.png" style="width: 19rpx; height: 19rpx" />

                            <view class="label-text">{{ item }}</view>
                        </view>
                    </view>
                    <image style="width: 32rpx; height: 40rpx" src="/static/pages/img/goods/more.png"></image>
                </view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <view class="shop_info" @tap="goBusinessInfo">
                <image :src="shopInfo.merchant.logoPic" class="shop_img"></image>
                <view class="shop_msg">
                    <view class="shop_title me-full-text">
                        <text>{{ shopInfo.appletInfo.nickName }}</text>
                        <image class="goodsCommentList-enter" src="/static/pages/static/shop_return.png"></image>
                    </view>
                    <text class="shop_desc me-full-text">{{ shopInfo.appletInfo.signature }}</text>
                    <text class="shop_btn">企业认证</text>
                </view>
            </view>
            <view class="fenge1" v-if="goodsCommentList.length > 0"></view>
            <!-- 评论 -->
            <view class="goodsCommentList" v-if="goodsCommentList.length > 0">
                <view class="goodsCommentLis-title">
                    <view class="goodsCommentLis-title-left">
                        <view class="spec-title-style"></view>
                        <view class="goodsCommentLis-title-left-text">评价</view>
                        {{ detailData.countCommodityComment > 100 ? '100+' : detailData.countCommodityComment }}
                    </view>
                    <view class="goodsCommentLis-title-right" @tap="goCommentList">
                        好评度{{ detailData.probabilityComment }}
                        <image class="goodsCommentList-enter" src="/static/pages/img/enter.png"></image>
                    </view>
                </view>
                <view class="goodsCommentList-item" v-for="(item, index) in goodsCommentList" :key="index">
                    <view class="item-headinfo">
                        <view class="headinfo-left">
                            <image :src="item.headimgurl" class="headinfo-img"></image>
                        </view>
                        <view class="headinfo-right">
                            <view class="headinfo-name">{{ item.nickname }}</view>
                            <view class="headinfo-start">
                                <image
                                    :src="'/pages/img/order/start_b' + (item.grade > sindex ? 6 - item.grade + sindex : 0) + '.png'"
                                    class="start-img"
                                    v-for="(sitem, sindex) in 5"
                                    :key="sindex"
                                ></image>
                            </view>
                        </view>
                    </view>

                    <view class="item-text">{{ item.content }}</view>

                    <view class="item-image" v-if="item.imagList.length">
                        <image
                            :src="iitem"
                            mode="aspectFill"
                            class="image-img"
                            @tap="zoomImg"
                            :data-list="item.imagList"
                            :data-src="iitem"
                            v-for="(iitem, index1) in item.imagList"
                            :key="index1"
                        ></image>
                    </view>

                    <view class="item-footer">
                        <view class="footer-time">{{ item.addTime }}发表</view>
                        <view class="footer-operate">
                            <item @tap.native="toComment($event, { item })" :data-item="item" class="operate-item">
                                <image src="/static/pages/img/comment.png" class="operate-icon"></image>
                                <view class="operate-num">{{ item.reply }}</view>
                            </item>
                            <view @tap="liketap" :data-index="index" :data-id="item.id" class="operate-item">
                                <image v-if="!item.myPraise" src="/static/pages/img/good.png" class="operate-icon"></image>
                                <image v-else src="/static/pages/img/gooded.png" class="operate-icon"></image>
                                <view class="operate-num">{{ item.praise }}</view>
                            </view>
                        </view>
                    </view>

                    <view class="goodsCommentList-cut"></view>
                </view>
                <view class="goodsCommentList-footer" @tap="goCommentList">查看全部评价</view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 产品规格 -->
            <view class="content">
                <view class="cp-speci">
                    <view class="spec-title-style"></view>
                    详情
                </view>
                <view class="specifications-detail" v-for="(item, index) in detailData.preferences" :key="index">
                    <view class="p-title">{{ item.paramText }}</view>

                    <view class="p-detail">{{ item.paramValue }}</view>
                </view>
            </view>

            <!-- 商品详情图 -->
            <view class="zhutu-content">
                <image
                    style="width: 100%; display: block"
                    :src="item"
                    mode="widthFix"
                    :data-list="detailData.descrList"
                    :data-src="item"
                    @tap="imgClick"
                    v-for="(item, index) in detailData.descrList"
                    :key="index"
                ></image>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 服务 -->
            <view class="goods-detail-explain">
                <view class="cp-speci">
                    <view class="spec-title-style"></view>
                    服务
                </view>
                <view class="goods-detail-explain-top">
                    <view class="goods-detail-explain-top-solid"></view>
                    <text>价格说明</text>
                    <view class="goods-detail-explain-top-solid"></view>
                </view>
                <view class="goods-detail-explain-text">
                    1、销售价：销售价为商品的最终购买价， 是您最终决定是否购买商品的依据，销售价有可能是原价、促销价、会员价。 如果您是普通消费者购买价则是原价，
                    如果您是店铺会员购买价则是会员价，如果商家商品有促销活动购买价则是促销价。如有疑问， 您可在购买前联系商家进行咨询。
                </view>
                <view class="goods-detail-explain-text">
                    2、划线价：商品展示的划横线价格为商家店铺原价， 由于地区、 时间的差异性和市场行情波动， 原价不是一成不变的， 具体原价由商家定价。
                </view>
                <view class="goods-detail-explain-text">
                    3、异常问题：商品的具体售价以订单结算页价格为准； 如您发现活动商品售价或促销信息或会员信息有异常， 建议购买前先联系商家咨询。
                </view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 为你推荐 -->
            <view class="detail-recommend" v-if="recommendGoodsList.length > 0">
                <view class="cp-speci detail-recommend-top">
                    <view class="spec-title-style"></view>
                    为你推荐
                </view>
                <view class="detail-recommend-list">
                    <view class="detail-recommend-item" @tap="showDetail" :data-id="item.commodityId" v-for="(item, index) in recommendGoodsList" :key="index">
                        <image :src="item.thumbnail" mode="aspectFill" class="detail-recommend-img" />

                        <view class="detail-recommend-content">
                            <view class="detail-recommend-name">{{ item.commodityName }}</view>
                            <view class="detail-recommend-price">
                                <!-- <text class="cuxiao-box">促销</text> -->
                                ￥
                                <text style="font-size: 16px">{{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}</text>
                                <text
                                    style="text-decoration: line-through; margin-left: 5px; color: #ccc"
                                    v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)"
                                >
                                    ￥{{ item.originalPrice }}
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- <view class="daodile"> -信书技术支持-</view> -->
            <view style="width: 750rpx; display: flex; align-items: center; justify-content: center; height: 50rpx; line-height: 50rpx">
                <image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
            </view>
            <view class="foot"></view>
            <!-- <view class='place-empty'></view> -->

            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" @click="toKeFu" />
                <van-goods-action-icon v-if="!fromShop && isShare && formpage != 'home'" icon="shop-o" text="店铺" @tap.native="toIndex" />
                <van-goods-action-icon v-if="!isShare && formpage != 'home'" icon="shop-o" :text="activityId ? '店铺' : '店铺'" @tap.native="toBack" />
                <van-goods-action-icon
                    v-if="personnel == 0 && !city && !reserve && orderSwitch"
                    icon="cart-o"
                    text="购物车"
                    :info="countTrolley ? countTrolley : ''"
                    @tap.native="toCart"
                />
                <van-goods-action-icon v-if="fromShop && isShare" icon="shop-o" text="返回店铺" @tap.native="toStore" />
                <van-goods-action-button
                    v-if="personnel == 0 && !city && !reserve && orderSwitch"
                    text="加入购物车"
                    type="warning"
                    @tap.native="selectSpec($event, { type: '2' })"
                    data-type="2"
                />
                <van-goods-action-button
                    v-if="orderSwitch"
                    :text="city ? '同城商家配送' : reserve ? '预订门店团购' : '立即购买'"
                    @tap.native="selectSpec($event, { type: '3' })"
                    data-type="3"
                />
                <view class="bbb" v-if="orderSwitch === 0"><text>本店商品价格只展示不售卖</text></view>
            </van-goods-action>
            <!-- 分享 -->
            <van-popup :show="showShare" round z-index="999" position="bottom" @close="hideShare">
                <view class="share-top">
                    分享
                    <image @tap="hideShare" style="width: 41rpx; height: 41rpx" src="/static/pages/img/goods/share_close.png"></image>
                </view>
                <view class="share-bottom">
                    <view class="share-content-box">
                        <button class="share-btn-box" open-type="share">
                            <image style="width: 110rpx; height: 110rpx" src="/static/pages/img/goods/wxchat.png"></image>
                            <text class="share-btn-text">分享给好友</text>
                        </button>
                        <!-- <view class="share-line"></view>
        <view class="share-btn-box">
          <image style="width:110rpx;height:110rpx" src="/pages/img/goods/friend.png"></image>
          <text class="share-btn-text">生成分享海报</text>
        </view> -->
                    </view>
                    <view class="share-bottom-text">商品推荐，快分享给您的亲朋好友吧！！！</view>
                </view>
            </van-popup>
            <!-- 商家自营 -->
            <van-popup :show="showXS" position="bottom" z-index="999" closeable close-icon="close" @close="hideLabel">
                <view class="xs-content">
                    <view class="xs-top">商家自营保障</view>
                    <view class="xs-des">服务说明</view>
                    <view class="xs-item" v-for="(item, index) in labelList" :key="index">
                        <view class="xs-title">
                            <image src="/static/pages/img/hdui.png" class="dui" />
                            【{{ item.dict_label }}】
                        </view>

                        <view class="xs-text">{{ item.remark }}</view>
                    </view>
                    <view class="xs-btn" @tap="hideLabel">确认</view>
                </view>
            </van-popup>
            <!-- 规格 -->
            <van-popup :show="showSpec" round closeable position="bottom" @close="onClose" :close-on-click-overlay="false">
                <view class="good-info">
                    <view class="good-des">
                        <view class="good-img">
                            <image class="img" :src="DefaultSpec.imageUrl ? DefaultSpec.imageUrl : detailData.thumbnail"></image>
                        </view>
                        <view class="good-des-inner">
                            <view class="good-price-area">
                                <text class="good-price">
                                    ￥{{ detailData.activityType == 1 || (detailData.activityType == 2 && detailData.isMember) ? DefaultSpec.lowPrice : DefaultSpec.originalPrice }}
                                </text>
                                <text v-if="detailData.activityType == 2 && detailData.isMember" style="color: #ff5340; font-size: 24rpx; margin-left: 20rpx">
                                    {{
                                        detailData.memberLevel.discount == 10
                                            ? '普通会员无优惠'
                                            : detailData.memberLevel.name + '已优惠￥' + (DefaultSpec.originalPrice * 1000 - DefaultSpec.lowPrice * 1000) / 1000
                                    }}
                                </text>
                            </view>
                            <view class="good-inventory">
                                库存：
                                <text class="inventory">{{ activityId ? DefaultSpec.liveStock : DefaultSpec.stock }}</text>
                            </view>
                            <view class="good-select-specifications">
                                <text>{{ DefaultSpec.itemText }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="good-edit">
                        <view class="good-specifications">
                            <view>
                                <text>规格</text>
                            </view>
                            <scroll-view :scroll-y="true" style="max-height: 400rpx">
                                <view class="list-black">
                                    <view
                                        :class="'list-item ' + (normsIndex == index ? 'active' : '')"
                                        :data-index="index"
                                        @tap.stop.prevent="selectNorms"
                                        v-for="(skuitem, index) in detailData.skuList"
                                        :key="skuitem.id"
                                    >
                                        <image
                                            class="list-item-img"
                                            v-if="skuitem.imageUrl || skuitem.thumbnail"
                                            :src="skuitem.imageUrl ? skuitem.imageUrl : skuitem.thumbnail"
                                        ></image>

                                        <text>{{ skuitem.itemText }}</text>
                                    </view>
                                </view>
                            </scroll-view>
                        </view>
                        <view class="by-num">
                            <view>
                                <text>购买数量</text>
                            </view>
                            <view>
                                <text class="edit-num-btn" data-type="minus" @tap.stop.prevent="handleEdit">-</text>
                                <text class="edit-num">{{ buyNum }}</text>
                                <text class="edit-num-btn" data-type="add" @tap.stop.prevent="handleEdit">+</text>
                            </view>
                        </view>
                    </view>
                    <view class="btn-area">
                        <button class="btn buy-btn" v-if="specType == 2 || specType == 3" @tap.stop.prevent="comfirmSpec">确认</button>
                        <view class="btn-area-inner" v-if="specType == 1 && personnel == 0 && !city && !reserve">
                            <button class="btn add-cart-btn" @tap.stop.prevent="addCart">加入购物车</button>
                        </view>
                        <view class="btn-area-inner" v-if="specType == 1">
                            <button class="btn buy-btn" @tap.stop.prevent="doBuy">{{ city ? '下单配送' : reserve ? '立即预订' : '立即购买' }}</button>
                        </view>
                    </view>
                </view>
            </van-popup>
            <!-- 优惠券 -->
            <van-popup :show="showSale" @close="closeSale" round closeable position="bottom">
                <view class="sale-box-pop">
                    <view class="sale-title">优惠券</view>
                    <scroll-view :scroll-y="true" class="scroll-box">
                        <view class="sale-list">
                            <view
                                class="sale-item"
                                @tap="selectSale"
                                :data-index="index"
                                style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg_sub.png); background-size: 100% 173rpx; background-repeat: no-repeat"
                                v-for="(item, index) in saleCanList"
                                :key="index"
                            >
                                <view class="coupon-left">
                                    <view>￥{{ item.deduct }}</view>
                                    <view style="font-size: 24rpx; margin-left: 18rpx">满{{ item.confine }}元使用</view>
                                </view>

                                <view class="coupon-right">
                                    <view class="coupon-title">{{ item.couponName }}</view>
                                    <view class="coupon-time">截止日期：{{ item.endTime }}</view>
                                    <view class="coupon-state">{{ item.isDraw == 1 ? '已领取' : '未领取' }}</view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <view @tap="receiveSale" v-if="!receivedSale" class="sale-receive-btn">立即领取</view>
                    <view @tap="receivedSaleFun" v-if="receivedSale" class="sale-receive-btn received">已领取</view>
                </view>
            </van-popup>
        </view>
        <!-- <button  wx:if="{{!buton}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" class="butt">授权登录</button> -->
        <view class="bg_nocity" v-if="nocityFlag" @tap="closeBgNocity">
            <image class="nocity_img" src="/static/pages/Index/imgs/xiajia.png"></image>
            <image class="nocity_close_img" src="/static/pages/static/close.png"></image>
        </view>

        <!-- 授权用户信息 -->
        <view v-if="NickFlag" @tap="bindGetUserInfo" class="mask_login"></view>

        <!-- 授权手机号 -->
        <button v-if="!userPhone" class="get-phone-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @tap.stop.prevent="getPhoneNumber"></button>

        <van-popup :show="isEnd" :close-on-click-overlay="true" custom-style="border-radius:28rpx;" @click-overlay="hideEndPopup">
            <view class="me-fx-col me-fx-c-c activity-end-popup-content">
                <view class="title-text">活动已结束</view>
                <view class="goods-name">{{ detailInfo.commodityName }}</view>
                <image class="activity-end-img" src="/static/pages/Index/imgs/activity_end_img.png"></image>
                <button class="popup-btn" @tap="viewMoreActivity">查看更多活动</button>
            </view>
        </van-popup>

        <!-- 浏览用户 -->
        <view :class="'me-fx-row me-fx-start-c browse-user ' + showHideStyle">
            <image :src="browseUser[subscriptIndex].headUrl || '/pages/static/def-user.png'" class="user-avatar-img"></image>
            <text>{{ browseUser[subscriptIndex].nickName || '游客' }}在{{ browseUser[subscriptIndex].humanize }}浏览商品</text>
        </view>
    </view>
</template>

<script>
// import vanStepper from './@vant/weapp/stepper/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanGoodsAction from './@vant/weapp/goods-action/index';
// import vanGoodsActionIcon from './@vant/weapp/goods-action-icon/index';
// import vanGoodsActionButton from './@vant/weapp/goods-action-button/index';
// import vanSticky from './@vant/weapp/sticky/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// import vanIcon from './vant-weapp/icon/index';
import storeClose from '@/pages/Component/storeClose/index';
// pages/GoodsDetails/GoodsDetails.js
const time = require('../../../utils/util');

const app = getApp();
export default {
    components: {
        // vanStepper,
        // vanOverlay,
        // vanPopup,
        // vanGoodsAction,
        // vanGoodsActionIcon,
        // vanGoodsActionButton,
        // vanSticky,
        // vanCountDown,
        // vanIcon,
        storeClose
    },
    data() {
        return {
            detailData: {
                videoUrl: '',
                videoCover: '',
                imagList: [],
                remainingTime: '',
                activityType: 0,
                isMember: '',
                subscribe: false,
                description: '',

                timeData: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },

                memberLevel: {
                    name: '',
                    discount: 0
                },

                memberSetting: {
                    status: ''
                },

                isSetMember: '',
                arrLabels: [],
                preferences: [],
                descrList: '',
                thumbnail: '',
                skuList: []
            },

            // 详情数据
            DefaultSpec: {
                originalPrice: '',
                lowPrice: '',
                itemText: '',
                imageUrl: false,
                liveStock: '',
                stock: ''
            },

            // 默认规格
            NickFlag: false,

            normsIndex: 0,

            //默认索引
            goodsCommentList: [],

            //评论列表
            buyNum: 1,

            personnel: '',

            // 分销标识
            saleState: '无优惠',

            //优惠状态
            shipping: {
                provincesName: '',
                cityName: '',
                areaName: '',
                address: ''
            },

            // 地址
            recommendGoodsList: [],

            // 为你推荐
            openOverlay: false,

            isClose: false,

            // 是否关店
            index: 1,

            status: 1,
            activityId: 0,

            // 小店id
            scene: {},

            agentUserId: '',
            tempSpecId: 0,
            showShare: false,
            showCountDown: false,

            // 是否限时抢购
            isEnd: false,

            buton: false,

            // 是否登录
            fromShop: false,

            // 是否从小店进入
            isShare: false,

            // 是否分享进入
            salesUserId: 0,

            showSale: false,
            showSpec: false,
            showXS: false,
            isLike: false,
            receivedSale: true,

            //是否领取了优惠券
            goodsId: -1,

            marchantId: 0,
            orderType: 0,
            saleCanList: [],
            haveToStore: false,
            haveWuliu: false,
            haveTongCheng: false,
            specType: 0,

            // 1 规格  2 购物车  3 立即购买
            reserve: '',

            city: '',
            formpage: '',
            nocityFlag: false,
            orderSwitch: null,
            memberShow: 0,
            appWidth: 0,

            shopInfo: {
                merchant: {
                    address: '',
                    logoPic: ''
                },

                appletInfo: {
                    nickName: '',
                    signature: ''
                }
            },

            codeUserInfo: {},

            //code接口返回的用户信息
            userPhone: '',

            //用户手机号
            showHideStyle: '',

            //控制浏览用户显示隐藏样式 'show-bur'显示 'hide-bur'隐藏
            subscriptIndex: 0,

            //
            browseUser: [],

            countTrolley: '',
            labelList: '',
            isAuthorization: false,
            sindex: 0,
            iitem: '',

            skuitem: {
                id: '',
                imageUrl: '',
                thumbnail: '',
                itemText: ''
            },

            detailInfo: {
                commodityName: ''
            },

            headUrl: '',
            nickName: '',
            humanize: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        uni.getStorage({
            key: 'zl_userInfo',
            success: (res) => {
                var info = res.data;
                var phone = '';

                if (info.statusCode == 200 && info.data.code == 200) {
                    phone = info.data.data.phoneNumber;
                }

                this.setData({
                    codeUserInfo: info,
                    userPhone: phone
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        uni.hideHomeButton(); //隐藏返回首页按钮
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
        this.setData({
            showShare: false
        });
        uni.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        let orderType = this.city ? '&city=1' : this.reserve ? '&reserve=1' : '';
        let activityString = this.activityId ? '&activityId=' + this.activityId : '';
        let path = this.fromShop
            ? `/pages/Index/GoodsDetails/GoodsDetails?id=${this.goodsId}&sid=${this.tempSpecId}&salesUserId=${this.salesUserId}&pid=${this.personnel}&form=store&isShare=true` +
              `&orderSwitch=` +
              this.orderSwitch
            : `/pages/Index/GoodsDetails/GoodsDetails?id=${this.goodsId}&isShares=true` + `&orderSwitch=` + this.orderSwitch + orderType + `` + activityString;
        return {
            title: this.detailData.description,
            path
        };
    },
    onShareTimeline: function () {
        let orderType = this.city ? '&city=1' : this.reserve ? '&reserve=1' : '';
        let activityString = this.activityId ? '&activityId=' + this.activityId : '';
        console.log('this.activityId:', this.activityId);
        return {
            title: this.detailData.description,
            query: this.fromShop
                ? `id=${this.goodsId}&sid=${this.tempSpecId}&salesUserId=${this.salesUserId}&pid=${this.personnel}&form=store&isShare=true` +
                  activityString +
                  `&orderSwitch=` +
                  this.orderSwitch
                : `id=${this.goodsId}&isShares=true` + orderType + `&orderSwitch=` + this.orderSwitch + `` + activityString,
            imageUrl: this.detailData.imagList[0]
        };
    },
    methods: {
        /**
         * 生命周期函数--监听页面加载
         */
        onLoadClone3389: async function (options) {
            setTimeout(() => {
                this.queryBrowseUser();
            }, 4000); //获取浏览用户

            this.setData({
                memberShow: options.memberShow
            });

            if (options.city != '' || options.reserve != '') {
                this.setData({
                    city: options.city,
                    reserve: options.reserve
                });
            }

            this.setData({
                activityId: options.activityId
            });

            if (app.globalData.scene == '1154') {
                //朋友圈链接进入
                app.globalData.options = options;

                if (options.scene) {
                    // 小程序码
                    const scene = decodeURIComponent(options.scene);
                    await this.getCodeParams(scene);
                } else {
                    //  正常跳转
                    this.setData({
                        isShare: options.isShare ? true : false,
                        goodsId: options.id || '',

                        //商品id
                        tempSpecId: options.sid || '',

                        //规格id
                        agentUserId: options.agentUserId || '',

                        //分销id
                        personnel: options.pid || ''
                    });
                } //查看是否授权

                var that = this;
                uni.getSetting({
                    success: function (res) {
                        if (uni.getStorageSync('wx_userinfo_key')) {
                            if (uni.getStorageSync('token')) {
                                that.setData({
                                    buton: true
                                });
                            }
                        } else {
                            // 没有授权
                            that.setData({
                                buton: false
                            });
                        }
                    }
                });
                setTimeout(() => {
                    that.getParams();
                }, 200);
            } else {
                app.globalData.userLogin().then(async (res) => {
                    res = res || {};
                    console.log('商品详情登录信息：', res);

                    if (res !== 'true') {
                        this.setData({
                            NickFlag: !(res.nickname || res.headimgurl),

                            //用户昵称和头像都没有的话需要授权
                            userPhone: res.phoneNumber
                        });
                    }

                    app.globalData.options = options;

                    if (options.scene) {
                        // 小程序码
                        const scene = decodeURIComponent(options.scene);
                        await this.getCodeParams(scene);
                    } else {
                        //  正常跳转
                        this.setData({
                            isShare: options.isShare ? true : false,

                            // 是否分享进入
                            goodsId: options.id || '',

                            //商品id
                            tempSpecId: options.sid || '',

                            //规格id
                            agentUserId: options.agentUserId || '',

                            //分销id
                            personnel: options.pid || ''
                        });
                    } //查看是否授权

                    var that = this;
                    uni.getSetting({
                        success: function (res) {
                            if (uni.getStorageSync('wx_userinfo_key')) {
                                if (uni.getStorageSync('token')) {
                                    that.setData({
                                        buton: true
                                    });
                                }
                            } else {
                                // 没有授权
                                that.setData({
                                    buton: false
                                });
                            }
                        }
                    });
                    setTimeout(() => {
                        that.getParams();
                    }, 200);
                });
            }

            this.setData({
                appWidth: app.globalData.getSystemInfo.screenWidth
            });
        },

        showDingYue() {
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneTypes: [5, 6]
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: (res) => {
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
                                    targetType: 1,
                                    targetId: that.goodsId
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        that.getParams();
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

        //是否从小程序码进来
        getCodeParams(id) {
            let data = {
                id: id
            };
            let that = this;
            return app.globalData.sjrequest('/marchant/queryIdentifica', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        scene: JSON.parse(res.data.data.scene),
                        goodsId: JSON.parse(res.data.data.scene).id,
                        isShare: true
                    });

                    if (that.scene.pid) {
                        that.setData({
                            personnel: that.scene.pid
                        });
                    }

                    if (that.scene.sid) {
                        that.setData({
                            tempSpecId: that.scene.sid
                        });
                    } // if(that.data.scene.form == 'store'){  // 来自小店
                    //   this.setData({
                    //     fromShop:true,
                    //     activityId:that.data.scene.activityId,
                    //     salesUserId:that.data.scene.salesUserId
                    //   })
                    // }
                }
            });
        },

        async getParams() {
            console.log(this.goodsId);
            let data = {
                commodityId: this.goodsId
            };

            if (this.activityId) {
                data.activityId = this.activityId;
            }

            var that = this;
            await app.globalData.sjrequest('/commodity/queryCommodityInfo', data).then((res) => {
                if (res.data.code == 200) {
                    var resultData = res.data.data;
                    console.log(resultData, 'resultData');

                    if (resultData.isShelves == 0) {
                        this.setData({
                            nocityFlag: true
                        });
                    }

                    if (resultData.salesStoreCommodity) {
                        if (resultData.salesStoreCommodity.countdown) {
                            let time1 = time.formatTimeSec(resultData.salesStoreCommodity.countdown);
                            resultData.salesStoreCommodity.countdown = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
                            this.setData({
                                showCountDown: true,
                                isEnd: resultData.salesStoreCommodity.countdown <= 0
                            });
                        }
                    }

                    let orderType = resultData.marchant.businessModel.split(',').sort();
                    orderType = orderType[0];
                    this.setData({
                        orderType: orderType
                    });

                    if (resultData.marchant.businessModel.indexOf(1) != -1) {
                        this.setData({
                            haveWuliu: true
                        });
                    }

                    if (resultData.marchant.businessModel.indexOf(2) != -1) {
                        this.setData({
                            haveTongCheng: true
                        });
                    }

                    if (resultData.marchant.businessModel.indexOf(3) != -1) {
                        this.setData({
                            haveToStore: true
                        });
                    }

                    resultData.skuList.forEach((item, index) => {
                        if (item.stock == -1) {
                            item.stock = '有货';
                        }

                        if (item.isDefault == 1) {
                            that.setData({
                                DefaultSpec: item,
                                normsIndex: index
                            });
                        }

                        if (that.tempSpecId) {
                            if (item.id == that.tempSpecId) {
                                that.setData({
                                    DefaultSpec: item,
                                    normsIndex: index
                                });
                                return;
                            }
                        }
                    });

                    if (resultData.likeState == 0) {
                        that.setData({
                            isLike: true
                        });
                    }

                    if (resultData.commentList.length) {
                        resultData.commentList.forEach((item) => {
                            item.addTime = time.formatTime(item.addTime);
                        });
                    }

                    if (resultData.commodityCouponsList.length) {
                        resultData.commodityCouponsList.forEach((item) => {
                            item.endTime = time.formatTimeSec(item.endTime);
                        });
                    }

                    that.setData({
                        isEnd: resultData.remainingTime == 0,
                        detailData: resultData,
                        marchantId: resultData.marchantId,
                        shipping: resultData.shipping || {},
                        countTrolley: resultData.countTrolley,
                        goodsCommentList: resultData.commentList,
                        saleCanList: resultData.commodityCouponsList,
                        orderSwitch: resultData.marchant.orderSwitch
                    });

                    if (that.saleCanList.length) {
                        that.setData({
                            saleState: '已领券'
                        });
                        that.saleCanList.forEach((item) => {
                            if (item.isDraw == 0) {
                                that.setData({
                                    receivedSale: false,
                                    saleState: '可领券'
                                });
                            }
                        });
                    }
                } else if (res.data.code == 338) {
                    this.setData({
                        isClose: true
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }

                that.getLabelList();
            });

            if (!that.fromShop) {
                this.queryRecommendList();
                this.getShopInfo();
            }
        },

        queryRecommendList() {
            let data = {
                marchantId: this.detailData.marchantId,
                commodityId: this.detailData.commodityId
            };
            app.globalData.sjrequest('/commodity/queryRecommendList', data).then((res) => {
                if (res.data.code == 200) {
                    // if(res.data.data.length>4){
                    //   res.data.data.splice(4)
                    // }
                    this.setData({
                        recommendGoodsList: res.data.data
                    });
                    console.log('推荐', res.data.data);
                }
            });
        },

        noActivity() {
            uni.showToast({
                title: '暂无活动',
                icon: 'none'
            });
        },

        // 返回小店
        toStore() {
            uni.navigateTo({
                url: '/pages/smallShop/myShop/myShop?activityId=' + this.activityId
            });
        },

        finishedCountDown() {
            // 倒计时结束
            this.setData({
                showCountDown: false,
                isEnd: true
            });
        },

        // 优惠弹框
        showSaleFun() {
            if (this.detailData.commodityCouponsList.length) {
                this.setData({
                    showSale: true
                });
            } else {
                uni.showToast({
                    title: '暂无优惠',
                    icon: 'none'
                });
            }
        },

        closeSale() {
            this.setData({
                showSale: false
            });
        },

        receiveSale() {
            if (this.receivedSale) {
                uni.showToast({
                    title: '已领取优惠券',
                    icon: none
                });
                return;
            }

            var data = {
                couponsIds: []
            };
            this.saleCanList.forEach((item) => {
                data.couponsIds.push(item.id);
            });
            data.couponsIds = data.couponsIds.toString();
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/coupons/getCoupons', data, token).then((res) => {
                if (res.data.code == 200) {
                    this.saleCanList.forEach((item) => {
                        item.isDraw = 1;
                    });
                    this.setData({
                        showSale: false,
                        saleState: '已领券',
                        receivedSale: true,
                        saleCanList: this.saleCanList
                    });
                    uni.showToast({
                        title: '领取成功',
                        icon: 'none'
                    });
                }
            });
        },

        receivedSaleFun() {
            uni.showToast({
                title: '已经领取过了',
                icon: 'none'
            });
            this.setData({
                showSale: false
            });
        },

        // 评论列表
        goCommentList() {
            uni.navigateTo({
                url: '/pages/order/goodsCommentList/goodsCommentList?commodityId=' + this.goodsId
            });
        },

        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        },

        // 评论
        toComment(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var item = e.currentTarget.dataset['item'];
            app.globalData.goodsCommentDetails = item;
            uni.navigateTo({
                url: '/pages/order/goodsCommentDetails/goodsCommentDetails'
            });
        },

        // 点赞
        liketap(e) {
            var id = e.currentTarget.dataset['id'];
            var index = e.currentTarget.dataset['index'];
            var data = {
                commentId: id
            };
            app.globalData.sjrequest('/orderComment/operationPraise', data).then((res) => {
                var list = this.goodsCommentList;
                list[index].myPraise = !list[index].myPraise;

                if (list[index].myPraise) {
                    list[index].praise += 1;
                } else {
                    list[index].praise -= 1;
                }

                this.setData({
                    goodsCommentList: list
                });
            });
        },

        /* 运费*/
        findFreightStr() {
            let data = {
                commoditySkuId: this.DefaultSpec.id,
                province: this.shipping.provincesName
            };
            app.globalData.sjrequest('/commodity/findFreightStr', data).then((res) => {
                if (res.data.code == 200) {
                    let freightStr = 'DefaultSpec.freightStr';
                    this[DefaultSpec.freightStr] = res.data.data.freightStr;
                }
            });
        },

        /**选择规格 */
        selectNorms(e) {
            let index = e.currentTarget.dataset.index;

            if (index == this.normsIndex) {
                return;
            }

            this.setData({
                normsIndex: index,
                buyNum: 1,
                DefaultSpec: this.detailData.skuList[index]
            });
        },

        // 编辑数量
        handleEdit(e) {
            if (e.currentTarget.dataset.type === 'minus') {
                // 减一
                if (this.buyNum === 1) {
                    uni.showToast({
                        title: '数量不能少于1',
                        icon: 'none'
                    });
                    return;
                } else {
                    this.setData({
                        buyNum: this.buyNum - 1
                    });
                }
            } else {
                // 加一
                this.setData({
                    buyNum: this.buyNum + 1
                });
            }
        },

        /**立即购买 */
        doBuy() {
            if (this.buyNum > this.DefaultSpec.stock) {
                uni.showToast({
                    title: '库存不足',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    showSpec: false
                });
                return;
            } // if(!this.data.shipping.provincesName&&!this.data.haveToStore){
            //   this.selectAddress()
            //   return
            // }

            var { city, reserve } = this;
            let data = {
                marchantId: this.detailData.marchantId,
                orderType: city ? '2' : reserve ? '3' : '1',
                commoditys: [],
                shppingId: this.shipping.id || this.shipping.shippingId
            };
            data.commoditys.push({
                commodityId: this.detailData.commodityId,
                tempSpecId: this.DefaultSpec.id,
                amount: this.buyNum
            });
            uni.showLoading({
                title: '加载中...'
            });
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/order/onekeyAboutOrder', data, token).then((res) => {
                if (res.data.code === 200) {
                    uni.hideLoading(); // 更新 store 数据

                    app.globalData.store.setState({
                        submitObj: JSON.stringify(res.data.data)
                    });
                    let orderType = this.city ? '&orderType=2' : this.reserve ? '&orderType=3' : '&orderType=1';
                    console.log('city:', this.city);
                    this.setData({
                        showSpec: false
                    });
                    uni.navigateTo({
                        url:
                            `/pages/order/submitOrder/submitOrder?personnel=${this.personnel}&salesUserId=${this.salesUserId}&agentUserId=${this.agentUserId}&activityId=${this.activityId}` +
                            orderType
                    });
                } else {
                    uni.hideLoading();
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        /**查看商品详情 */
        showDetail(e) {
            const id = e.currentTarget.dataset.id;
            let otherOrder = this.city ? '&city=1' : this.reserve ? '&reserve=1' : '';
            uni.navigateTo({
                url: '../GoodsDetails/GoodsDetails?id=' + id + otherOrder
            });
        },

        //喜欢
        selectIsLike() {
            var state;

            if (this.detailData.likeState == 0) {
                state = 1;
            } else {
                state = 0;
            }

            let data = {
                commodityId: this.detailData.commodityId,
                state: state
            };
            app.globalData.sjrequest('/commodity/like', data).then((res) => {
                this.setData({
                    isLike: !this.isLike
                });
            });
        },

        //获取标签列表
        getLabelList() {
            let data = {
                labelIntros: this.detailData.arrLabels
            };
            app.globalData.sjrequest('/commodity/queryLabelIntro', data).then((res) => {
                console.log(res.data.data);
                this.setData({
                    labelList: res.data.data
                });
            });
        },

        // 显示隐藏标签
        showLabel() {
            this.setData({
                showXS: true
            });
        },

        hideLabel() {
            this.setData({
                showXS: false
            });
        },

        // 分享显示隐藏
        showShareFun() {
            this.setData({
                showShare: true
            });
        },

        hideShare() {
            this.setData({
                showShare: false
            });
        },

        // 图片预览
        imgClick(e) {
            var that = this;
            var src = e.currentTarget.dataset.src;
            var imgList = e.currentTarget.dataset.list;
            uni.previewImage({
                current: src,
                urls: imgList
            });
        },

        // 跳转页面
        toIndex() {
            let that = this; // + '&personnel=' + this.data.personnel

            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + this.detailData.marchantId
            });
        },

        toCart() {
            uni.navigateTo({
                url: '../ShopCart/ShopCart'
            });
        },

        // 选择规格
        selectSpec(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            if (this.detailData.remainingTime && !this.showCountDown) {
                //秒杀活动结束
                this.setData({
                    isEnd: true
                });
                return;
            }

            if (e.currentTarget.dataset.type == '2' && this.reserve) {
                uni.showToast({
                    title: '预订订单不可加入购物车',
                    icon: 'none'
                });
                return;
            }

            if (e.currentTarget.dataset.type == '2' && this.city) {
                uni.showToast({
                    title: '同城订单不可加入购物车',
                    icon: 'none'
                });
                return;
            }

            this.setData({
                showSpec: true,
                specType: e.currentTarget.dataset.type
            });
        },

        onClose() {
            this.setData({
                showSpec: false
            });
        },

        // 跳转收货地址
        selectAddress() {
            app.globalData.comefrom = 'goodsDetail';
            uni.navigateTo({
                url: '/pages/Address/AddressList/AddressList'
            });
        },

        // 确认规格
        comfirmSpec() {
            if (this.specType == 2) {
                this.addCart();
            }

            if (this.specType == 3) {
                this.doBuy();
            }
        },

        /** 加入购物车 */
        addCart() {
            if (this.DefaultSpec.stock == 0) {
                uni.showToast({
                    title: '暂无库存',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    showSpec: false
                });
                return;
            }

            var data = {
                tempSpecId: this.DefaultSpec.id,
                commodityId: this.DefaultSpec.commodityId,
                amount: this.buyNum,
                // 购买数量
                marchantId: this.detailData.marchantId,
                operate: 1
            };
            app.globalData.sjrequest('/commodity/addTrolley', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success'
                    });
                    let ids = uni.getStorageSync('merchantId');
                    app.globalData
                        .sjrequest('/commodity/countTrolley', {
                            marchantId: ids
                        })
                        .then((res) => {
                            this.setData({
                                countTrolley: res.data.data.countTrolley,
                                showSpec: false,
                                buyNum: 1
                            });
                        });
                }
            });
        },

        // 客服
        // toKeFu(){
        //   wx.navigateTo({
        //     url: `/pages/order/contact/contact?logoPic=${this.data.detailData.marchant.logoPic}&marchantId=${this.data.detailData.marchantId}&marchantName=${this.data.detailData.marchant.nickName}`,
        //   })
        // },
        // toBack(){
        //   if(!this.data.detailData.subscribe){
        //     var that = this
        //       let appid = wx.getStorageSync('appid')
        //       let data = {
        //           authorizerAppid:appid,
        //           sceneType:1
        //       }
        //       app.mb2request('/subTemplate/listPriTemplateId',data).then(res=>{
        //         debugger
        //           let tempData = res.data.data
        //           wx.requestSubscribeMessage({
        //               tmplIds: tempData,
        //               success: (res)=>{
        //                   wx.getSetting({
        //                       withSubscriptions: true,
        //                       success: result => {
        //                           wx.showToast({
        //                               title: '订阅消息成功',
        //                           })
        //                           let data = {
        //                               status: that.data.status,
        //                               marchantId: that.data.marchantId,
        //                               templateIds: tempData,
        //                               appId:appid
        //                           }
        //                           app.sjrequest('/basic/addsubscription', data).then(res => {
        //                               if (res.data.code == 200) {
        //                                   wx.showToast({
        //                                       title: '订阅消息成功',
        //                                   })
        //                                   this.triggerEvent && this.triggerEvent('event', true)
        //                               } else {
        //                                   wx.showToast({
        //                                       title: res.data.msg,
        //                                       icon: 'none'
        //                                   })
        //                               }
        //                           })
        //                       }
        //                   })
        //               },
        //               fail(e) {
        //                   console.log(e)
        //                   wx.showToast({
        //                       title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
        //                       icon: 'none'
        //                   })
        //               }
        //           })
        //       })
        //   }else{
        //     wx.navigateBack({
        //       delta: 0,
        //     })
        //   }
        //   var pages=getCurrentPages();
        //   var delta=0,bi=-1;
        //   for(var i=(pages.length-1);i>=0;i--){
        //     var pageItem=pages[i]; bi++;
        //     if(pageItem.route=='pages/shopHome/home/home'){
        //       delta=bi;
        //     }
        //   }
        //   if(delta){
        //     wx.navigateBack({delta});
        //   }else{
        //     // wx.navigateTo({
        //     //   url: '/pages/shopHome/home/home?marchantId=' + e.currentTarget.dataset.marchantid,
        //     // })
        //     wx.navigateTo({
        //       url: '/pages/shopHome/home/home',
        //     })
        //   }
        // },
        toBack() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        },

        closeBgNocity() {
            uni.redirectTo({
                url: '/pages/shopHome/home/home'
            });
        },

        bindGetUserInfo() {
            //拉起授权获取用户头像昵称信息
            uni.getUserProfile({
                lang: 'zh_CN',
                desc: '获取用户信息',
                complete: (res) => {
                    if (res.encryptedData) {
                        this.setData({
                            isAuthorization: false
                        });
                        this.login(res); //同意授权
                    } else {
                        //拒绝授权
                        setTimeout(() => {
                            uni.showToast({
                                title: '授权未成功',
                                icon: 'none'
                            });
                        }, 1000);
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
        login(userInfo) {
            var that = this;
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

                if (res.statusCode == 200 && res.data.code == 200) {
                    var data = res.data.data;
                    var userInfo = {
                        avatarUrl: data.headimgurl,
                        nickName: data.nickname
                    };
                    uni.setStorage({
                        key: 'wx_userinfo_key',
                        data: {
                            userInfo
                        }
                    });
                }

                that.setData({
                    NickFlag: false
                });
            });
        },

        goBusinessInfo() {
            uni.navigateTo({
                url: '/pages/Index/BusinessInfo/BusinessInfo'
            });
        },

        getShopInfo() {
            let ids = this.detailData.marchantId;
            app.globalData
                .sjrequest('/marchant/subjectInfo', {
                    merchantId: ids
                })
                .then((res) => {
                    this.setData({
                        shopInfo: res.data.data
                    });
                    console.log('res:', res);
                });
        },

        changeTime(e) {
            this.detailData.timeData = e.detail;
            this.setData({
                detailData: this.detailData
            });
        },

        hideEndPopup() {
            this.setData({
                isEnd: false
            });
        },

        viewMoreActivity() {
            this.setData({
                isEnd: true
            });
            var activityShop = 'pages/Index/saleList/saleList';
            var pages = getCurrentPages();
            var len = pages.length;
            var delta = -1;
            var isHas = false;

            for (var i = len - 1; i >= 0; i--) {
                var item = pages[i];
                delta++;

                if (item.route == activityShop) {
                    isHas = true;
                    break;
                }
            }

            setTimeout(() => {
                if (isHas) {
                    uni.navigateBack({
                        delta
                    });
                } else {
                    uni.redirectTo({
                        url: '/' + activityShop
                    });
                }
            }, 0);
        },

        getPhoneNumber(e) {
            var detail = e.detail;
            let appid = uni.getStorageSync('appid');
            var openid = uni.getStorageSync('thirdWxOpenId');

            if (detail.iv) {
                var { iv, encryptedData } = detail;
                app.globalData
                    .sjrequest('/thirdWxLogin/deciphering', {
                        appid,
                        openid,
                        iv,
                        encryptedData
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            var phone = res.data.data.phoneNumber;
                            var info = this.codeUserInfo;

                            if (info.data && info.data.data) {
                                info.data.data.phoneNumber;
                                uni.setStorage({
                                    key: 'zl_userInfo',
                                    data: info
                                });
                            }

                            this.setData({
                                userPhone: phone
                            });
                        }
                    });
            }
        },

        queryBrowseUser() {
            //查询浏览用户
            var { marchantId, goodsId } = this;

            if (marchantId && goodsId) {
                app.globalData
                    .sjrequest('/marchant/viewRecordList', {
                        merchantId: this.marchantId,
                        commodityId: this.goodsId
                    })
                    .then((res) => {
                        if (res.statusCode == 200 && res.data.code == 200) {
                            var list = res.data.data || [];
                            this.setData(
                                {
                                    browseUser: list
                                },
                                () => {
                                    this.showBrowseUser();
                                }
                            );
                        }
                    })
                    .catch((err) => {});
            } else {
                setTimeout(() => {
                    this.queryBrowseUser();
                }, 10000);
            }
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            str = str || '';
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        _omputedDate(dateStr) {
            //计算事件发生距离当前的时间
            var createDate = this._parseDate(dateStr, 'number');

            var nowDate = new Date().getTime();
            var milliseconds = nowDate - createDate;
            var UNITS = {
                年: 31557600000,
                月: 2629800000,
                天: 86400000,
                小时: 3600000,
                分钟: 60000,
                秒: 1000
            };
            var humanize = '';

            for (var key in UNITS) {
                if (milliseconds >= UNITS[key]) {
                    humanize = Math.floor(milliseconds / UNITS[key]) + key + '前';
                    break;
                }
            }

            return humanize || '刚刚';
        },

        showBrowseUser() {
            //展示浏览用户
            var subscriptIndex = this.subscriptIndex;
            var browseUser = this.browseUser;

            if (subscriptIndex == browseUser.length) {
                setTimeout(() => {
                    this.setData(
                        {
                            subscriptIndex: 0,
                            browseUser: []
                        },
                        () => {
                            this.queryBrowseUser();
                        }
                    );
                }, 30000);
            } else {
                var itemUser = browseUser[subscriptIndex];

                var humanize = this._omputedDate(itemUser.createTime);

                itemUser.humanize = humanize;
                this.setData(
                    {
                        showHideStyle: 'show-bur',
                        browseUser
                    },
                    () => {
                        setTimeout(() => {
                            this.setData({
                                showHideStyle: 'hide-bur'
                            });
                            setTimeout(() => {
                                subscriptIndex += 1;
                                this.setData(
                                    {
                                        showHideStyle: '',
                                        subscriptIndex
                                    },
                                    () => {
                                        setTimeout(() => {
                                            this.showBrowseUser();
                                        }, 1000);
                                    }
                                );
                            }, 1000);
                        }, 4000);
                    }
                );
            }
        },

        swiperChange(e) {
            var current = e.detail.current;
            var videoUrl = this.detailData.videoUrl;

            if (videoUrl) {
                var videoContext = uni.createVideoContext('swiperVideo');

                if (current == 0) {
                    // videoContext.play();
                } else {
                    videoContext.pause();
                }
            }
        },

        toKeFu() {
            console.log('占位：函数 toKeFu 未声明');
        },

        selectSale() {
            console.log('占位：函数 selectSale 未声明');
        }
    }
};
</script>
<style>
.wx-login {
    text-align: center;
    margin-top: 260rpx;
}
.wx-img {
    width: 520rpx;
    height: 330rpx;
}
.wx-btn {
    width: 320rpx;
    height: 68rpx;
    background: #ffffff;
    border: 1rpx solid #cccccc;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 68rpx;
    color: #db8b00;
}
.swiper-container {
    width: 100%;
    position: relative;
}
/*商品信息*/
.goods-head {
    display: flex;
    width: 100%;
}
.goods-price {
    width: 100%;
    padding: 0 30rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #e7a124;
    font-size: 28rpx;
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.goods-sale-price-content {
    width: 100%;
    height: 164rpx;
    padding: 20rpx 30rpx 0 30rpx;
    box-sizing: border-box;
    margin-top: -44rpx;
    margin-bottom: 20rpx;
    z-index: 200;
    background-size: 100% 164rpx;
    display: flex;
    align-items: center;
}
.goods-price-box {
    width: 280rpx;
    height: 110rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.no-sale-box {
    height: 60rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: rgba(255, 255, 255, 1);
}
.goods-price-box-member {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #f9dd15;
    white-space: nowrap;
}
.origin-price {
    font-weight: bold;
    font-size: 50rpx;
}
.sale-box {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ccc;
}
.sale-text {
    width: 0;
    flex: 1;
    height: 72rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: rgba(255, 255, 255, 1);
    margin-top: 34rpx;
    display: flex;
    align-items: center;
}
.price {
    font-size: 50rpx;
    font-family: PingFang SC;
    font-weight: bold;
    margin-right: 20rpx;
}
.originalprice {
    font-size: 22rpx;
    color: #999;
    text-decoration: line-through;
    padding-left: 1rpx;
}
.goods-title {
    width: 100%;
    padding: 10rpx 30rpx 0;
    font-size: 30rpx;
    font-family: PingFang SC;
    color: #333;
    box-sizing: border-box;
    line-height: 36rpx;
    font-weight: bold;
}
.goods-subtitle {
    margin-left: 30rpx;
    margin-right: 30px;
    font-size: 26rpx;
    font-family: PingFang SC;
    color: #999;
    line-height: 30rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;
    text-overflow: ellipsis;
}
.goods-subtitle-pro {
    padding: 0 30rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.des-box {
    width: 0;
    flex: 1;
    max-height: 72rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #333;
    margin-right: 30rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;
    text-overflow: ellipsis;
}
.like-share-box {
    width: 140rpx;
    display: flex;
    /* justify-content: space-between; */
    justify-content: flex-end;
    white-space: nowrap;
}
.share-box {
    display: flex;
    width: 44rpx;
    height: 72rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #333;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.subscribe-box {
    width: 72rpx;
    height: 72rpx;
    font-size: 24rpx;
    background: linear-gradient(180deg, #fba08c 0%, #e8320c 100%);
    color: #fff;
    border-radius: 6rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.goods-share-icon {
    width: 36rpx;
    height: 36rpx;
}
.fenge1 {
    width: 100%;
    height: 20rpx;
    background: #f2f2f2;
}
.goods-spec {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
}
.spec-title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}
.norms-list {
    width: 100%;
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
}

.norms-item {
    padding-left: 8rpx;
    padding-right: 8rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    border: 1rpx solid #ccc;
    height: 72rpx;
    background: #e2e2e2;
    color: #fff;
    margin-right: 10px;
    margin-top: 14rpx;
    display: flex;
    align-items: center;
}
img {
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
}
.goods-spec-name {
    padding: 0 26rpx;
}
.norms-active {
    background: #feae57;
    border: 1rpx solid #783705;
    border-radius: 6rpx;
    color: #fff;
}
.goods-num {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10rpx;
}
.goods-num-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}
/* 限时抢购 */
.activity-container {
    width: 100%;
    height: 105rpx;
    padding: 10rpx 0 15rpx;
    box-sizing: border-box;
    background-color: #f2f2f2;
}
.activity-container-content {
    width: 100%;
    height: 100%;
    background-color: #000;
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.activity-container-content-image {
    width: 188rpx;
    height: 36rpx;
    margin-right: 20rpx;
}
.activity-container-content-count-down {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rpx;
    color: #ffffff !important;
}
.van-count-down {
    color: #fff !important;
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
/* 所选参数 */
.select-params {
    width: 100%;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    font-family: PingFang SC;
    color: #666;
}
.select-params-item {
    width: 100%;
    height: 100rpx;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1rpx solid #f2f2f2;
}
.select-params-item-address {
    align-items: flex-start;
    padding-top: 20rpx;
    box-sizing: border-box;
}
.select-params-item-label {
    height: fit-content;
    align-items: flex-start;
    padding: 20rpx 0;
    box-sizing: border-box;
}
.select-params .select-params-item:last-child {
    border: none;
}
.params-title {
    font-weight: 400;
    color: #999;
    line-height: 40rpx;
    font-size: 26rpx;
}
.take-type-btn {
    width: 88rpx;
    height: 40rpx;
    background: linear-gradient(93deg, #ff972a 0%, #fd5c00 100%);
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.take-type-solid {
    width: 120rpx;
    height: 8rpx;
    background: linear-gradient(263deg, #ff972a 0%, #fd5c00 100%);
}
.params-content-text {
    width: 0;
    flex: 1;
    margin: 0 20rpx;
    font-size: 26rpx;
    line-height: 40rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.params-content-text-guige {
    width: fit-content;
    max-width: 560rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 20rpx;
    height: 40rpx;
    border: 2rpx solid #eb1918;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #eb1918;
    display: flex;
    align-items: center;
}
.yhq-style {
    width: 0;
    flex: 1;
    margin: 0 20rpx;
    display: flex;
}
.yhq-text-btn {
    width: fit-content;
    height: 35rpx;
    background: #eb1918;
    border-radius: 5rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    margin-right: 20rpx;
    padding: 0 10rpx;
    margin-left: 12rpx;
}
.yhq-scroll {
    display: flex;
    flex-wrap: nowrap;
}
.yhq-box {
    width: fit-content;
    height: 35rpx;
    font-size: 18rpx;
    font-weight: bold;
    margin-right: 20rpx;
    background: radial-gradient(circle at left, transparent 8rpx, #eb1918 0) left, radial-gradient(circle at right, transparent 8rpx, #eb1918 0) right;
    background-size: 51% 100%;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20rpx;
    border-radius: 6rpx;
    white-space: nowrap;
    position: relative;
}
/* .left-yuan{
      width: 8rpx;
      height: 16rpx;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .right-yuan{
      width: 8rpx;
      height: 16rpx;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    } */
/**商品标签 */
.label {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 30rpx;
    box-sizing: border-box;
    justify-content: space-between;
}
.params-label-box {
    width: 0;
    flex: 1;
    min-height: 40rpx;
    line-height: 40rpx;
    display: flex;
    align-items: center;
    margin-left: 20rpx;
    flex-wrap: wrap;
}
.label-item {
    margin-right: 20rpx;
    display: flex;
    align-items: center;
    height: 40rpx;
}
.label-text {
    white-space: nowrap;
    height: 30rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 26rpx;
    color: #333333;
    margin-left: 10rpx;
}
/* 评论 */
.goodsCommentList {
    padding: 0 30rpx;
}
.goodsCommentLis-title {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #333333;
    padding: 40rpx 0 20rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.goodsCommentLis-title-left {
    display: flex;
    align-items: center;
}
.goodsCommentLis-title-left-text {
    font-size: 32rpx;
    padding-right: 16rpx;
}
.goodsCommentLis-title-right {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 44rpx;
    color: #cccccc;
    display: flex;
    align-items: center;
}
.goodsCommentList-enter {
    width: 29rpx;
    height: 29rpx;
    padding-left: 8rpx;
}
.goodsCommentList-item {
    /* border-bottom: 1rpx solid #F2F2F2; */
    background: #ffffff;
    padding: 20rpx 0;
}
.item-headinfo {
    display: flex;
}
.headinfo-img {
    width: 68rpx;
    height: 68rpx;
    object-fit: cover;
    border-radius: 50%;
}
.headinfo-right {
    height: 68rpx;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
}
.headinfo-name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #333333;
}
.start-img {
    width: 24rpx;
    height: 24rpx;
    padding-right: 16rpx;
}
.item-text {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 45rpx;
    color: #333333;
    margin-top: 20rpx;
    word-break: break-all;
}
.item-image {
    margin-top: 20rpx;
    width: 100%;
    /* overflow-x: scroll;
    height: 200rpx; */
}
.image-img {
    width: 200rpx;
    height: 200rpx;
    object-fit: cover;
    padding-right: 20rpx;
}
.item-footer {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
}
.footer-time {
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
}
.footer-operate {
    display: flex;
}
.operate-item {
    display: flex;
}
.operate-icon {
    width: 34rpx;
    height: 34rpx;
    padding: 0 20rpx 0 40rpx;
}
.operate-num {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33rpx;
    color: #999999;
}
.goodsCommentList-cut {
    width: 100%;
    height: 1rpx;
    background: #f2f2f2;
    margin-top: 40rpx;
}
.goodsCommentList-footer {
    width: 160rpx;
    height: 44rpx;
    background: #ffffff;
    border: 1rpx solid #cccccc;
    border-radius: 24rpx;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 44rpx;
    color: #999999;
    text-align: center;
    margin: 20rpx auto 40rpx;
}
/*产品规格*/
.content {
    padding: 40rpx 30rpx;
}
.cp-speci {
    width: 100%;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000;
    line-height: 42rpx;
    display: flex;
    align-items: center;
}
.spec-title-style {
    width: 12rpx;
    height: 32rpx;
    background: linear-gradient(150deg, #ffb8a9 0%, #e8320c 100%);
    margin-right: 18rpx;
}
.specifications-detail {
    display: flex;
    font-size: 26rpx;
    color: #333;
    line-height: 50rpx;
    margin-top: 12rpx;
}
.p-title {
    width: 110rpx;
    color: #333;
    font-weight: bold;
    margin-right: 30rpx;
    text-align: justify;
    text-align-last: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.p-detail {
    width: 80%;
    color: #999;
}
/**底部操作 */
.footer {
    width: 96rpx;
    height: 200rpx;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 5%;
    right: 20rpx;
}
.share-btn {
    width: 96rpx;
    height: 96rpx;
}
.goods_detail_footer {
    width: 96rpx;
    height: 300rpx;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 5%;
    right: 20rpx;
}
.share-btn {
    width: 96rpx;
    height: 96rpx;
}
.buyType-title {
    width: 100%;
    height: 100rpx;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 36rpx;
    font-family: PingFang SC;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.buyType-close {
    width: 44rpx;
    height: 44rpx;
    position: absolute;
    top: 22rpx;
    right: 26rpx;
}
.buyType-select {
    width: 100%;
    height: 248rpx;
    padding: 0 36rpx 0 30rpx;
    box-sizing: border-box;
}
.buyType-item {
    width: 100%;
    height: 124rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.buyType-left {
    display: flex;
    align-items: center;
}
.buyType-text {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-left: 20rpx;
}
.baseline {
    border-bottom: 1rpx solid #f2f2f2;
}
.buyType-btn {
    width: 670rpx;
    height: 100rpx;
    background: rgba(0, 0, 0, 1);
    box-shadow: 0 0 28rpx 8rpx rgba(0, 0, 0, 0.05);
    border-radius: 50rpx;
    margin: 40rpx auto 0;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.daodile {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    color: #7c6f6e;
    font-family: PingFang SC;
    font-weight: 500;
    background: #fff;
    /* font-size: 20rpx;
    text-align: center;
    color: #999999;
    font-weight: bold; */
}
/* 服务 */
.goods-detail-explain {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
}
.goods-detail-explain-top {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
}
.goods-detail-explain-top-solid {
    width: 280rpx;
    height: 2rpx;
    background-color: #e4e4e4;
}
.goods-detail-explain-text {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 32rpx;
    color: #999999;
}
/* 为你推荐 */
.detail-recommend {
    padding: 0 30rpx;
    box-sizing: border-box;
    background: #fff;
}
.detail-recommend-top {
    padding: 40rpx 0 20rpx;
}
.detail-recommend-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.detail-recommend-item {
    width: 338rpx;
    margin-bottom: 14rpx;
    border-radius: 10rpx;
    border: 1px solid #e2e2e2;
}
.detail-recommend-img {
    width: 338rpx;
    height: 338rpx;
    object-fit: cover;
    border-radius: 10rpx 10rpx 0 0;
}
.detail-recommend-content {
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.detail-recommend-name {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
}
.detail-recommend-price {
    height: 44rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(231, 161, 36, 1);
    margin-top: 10rpx;
    display: flex;
    align-items: center;
}

.place-empty {
    height: 100rpx;
}
.foot {
    height: 185rpx;
    /* background-color: #f7f7f7; */
}
.cuxiao-box {
    padding: 0 4rpx;
    height: 28rpx;
    background: #ff5340;
    border-radius: 2rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-right: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
}
/* 分享 */
.share-top {
    width: 100%;
    height: 80rpx;
    background: #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    color: #666;
    font-weight: bold;
}
.share-bottom {
    width: 100%;
    height: 340rpx;
}
.share-content-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50rpx 130rpx;
    box-sizing: border-box;
}
.share-btn-box {
    border: none;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0 auto;
}
button::after {
    border: none;
}
.share-btn-text {
    font-size: 28rpx;
    color: #999999;
    line-height: 40rpx;
}
.share-line {
    width: 1rpx;
    height: 100rpx;
    background: #e2e2e2;
}
.share-bottom-text {
    width: 502rpx;
    height: 44rpx;
    background: #f8f9fb;
    border-radius: 24rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
.xs-content {
    padding: 22rpx 30rpx 40rpx;
}
.xs-top {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    text-align: center;
}
.xs-des {
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
.xs-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
}
.dui {
    width: 18rpx;
    height: 18rpx;
}
.xs-text {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.xs-btn {
    margin: 30rpx auto 0;
    height: 100rpx;
    background: #ff5340;
    box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}
.ziying {
    width: 88rpx;
    height: 30rpx;
    vertical-align: middle;
    margin-right: 6rpx;
}
.ban-pop {
    width: 500rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    padding: 70rpx 56rpx 40rpx;
}
.ban-img {
    width: 140rpx;
    height: 140rpx;
}
.ban-shadow {
    width: 72rpx;
    height: 16rpx;
    background: rgba(236, 236, 236, 1);
    border-radius: 50%;
    margin: 16rpx auto 30rpx;
}
.ban-btn {
    width: 280rpx;
    height: 80rpx;
    background: rgba(255, 83, 64, 1);
    box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.16);
    color: #fff;
    border-radius: 40rpx;
    margin: 40rpx auto 0;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 80rpx;
}
/* 消费方式 */
.overlay .box {
    width: 100%;
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;
    padding: 0 50rpx 0 20rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
}
.overlay .box .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 115rpx;
}
.overlay .box .title .flex {
    flex: 1;
}
.overlay .box .title .text {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 48rpx;
    color: #20252d;
    opacity: 1;
}
.overlay .box .title .icon {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.overlay .box .title .img {
    width: 44rpx;
    height: 44rpx;
}
.overlay .box .psfw {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 102rpx;
    border-top: 1rpx solid #e2e2e2;
}
.overlay .box .psfw .active {
    width: 240rpx;
    height: 64rpx;
    border: 1rpx solid #ff5340;
    position: relative;
}
.overlay .box .psfw .active .check {
    width: 28rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    bottom: 0;
}
.overlay .box .psfw .psfw-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay .box .psfw .psfw-box .icon {
    width: 44rpx;
    height: 34rpx;
}
.overlay .box .psfw .psfw-box .text {
    margin-left: 18rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 43rpx;
    color: #999999;
    opacity: 1;
}
.overlay .box .dnxf {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 102rpx;
    border-top: 1rpx solid #e2e2e2;
}
.overlay .box .dnxf .active {
    width: 240rpx;
    height: 64rpx;
    border: 1rpx solid #ff5340;
    position: relative;
}
.overlay .box .dnxf .active .check {
    width: 28rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    bottom: 0;
}
.overlay .box .dnxf .dnxf-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay .box .dnxf .dnxf-box .icon {
    width: 42rpx;
    height: 38rpx;
}
.overlay .box .dnxf .dnxf-box .text {
    margin-left: 18rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 43rpx;
    color: #999999;
    opacity: 1;
}
.overlay .box .btn {
    text-align: center;
    margin-top: 38rpx;
    margin-left: 5rpx;
}
.overlay .box .btn .img {
    width: 560rpx;
    height: 110rpx;
}
/* 分享 */
.activeIndex-share-img {
    width: 228rpx;
    height: 256rpx;
    float: right;
    margin: 20rpx 200rpx 0 0;
}
.activeIndex-share {
    padding-left: 96rpx;
    padding-top: 332rpx;
}
.activeIndex-share-text {
    font-size: 36rpx;
    font-family: DFPHaiBaoW12;
    line-height: 40rpx;
    color: #ffffff;
}
.activeIndex-share-text-span {
    color: #ec1919;
}
/* 商家自营 */
.xs-content {
    padding: 22rpx 30rpx 40rpx;
}
.xs-top {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
    text-align: center;
}
.xs-des {
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
}
.xs-title {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #333333;
}
.dui {
    width: 18rpx;
    height: 18rpx;
}
.xs-text {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #999999;
}
.xs-btn {
    margin: 30rpx auto 0;
    height: 100rpx;
    background: #ff5340;
    box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.16);
    border-radius: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}
/* 规格 */
.good-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.good-info .good-des {
    width: 100%;
    height: 283rpx;
    border-bottom: 1rpx solid #ececec;
    padding: 50rpx 40rpx 0rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background: #fff;
}
.good-info .good-des .good-img {
    width: 214rpx;
    height: 214rpx;
}
.good-info .good-des .good-img .img {
    width: 214rpx;
    height: 214rpx;
}
.good-info .good-des .good-des-inner {
    flex: 1;
    height: 90%;
    padding-left: 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}
.good-price-area,
.good-inventory,
.good-select-specifications {
    flex: 1;
    color: #999999;
}
.good-price-area {
    font-size: 36rpx;
    font-weight: bold;
    color: #ff3950;
}
.good-price-area .good-tag {
    font-size: 24rpx;
}
.good-inventory {
    font-size: 28rpx;
}
.good-inventory .inventory {
    color: #ff3950;
}
.good-select-specifications {
    font-size: 24rpx;
}
.good-info .good-edit {
    flex: 1;
    padding: 30rpx 40rpx;
    background: #fff;
    overflow: hidden;
    overflow-y: scroll;
}
.good-info .good-edit .good-specifications {
    overflow: hidden;
}
.good-info .good-edit .list-black {
    padding: 20rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.good-info .good-edit .list-black .list-item {
    overflow: hidden;
    padding: 4rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    border: 1rpx solid #ececec;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    border-radius: 6rpx;
    display: flex;
    align-items: center;
}
.good-info .good-edit .list-black .active {
    background: rgba(250, 51, 78, 0.05);
    border: 1rpx solid #fa334e;
}
.list-item-img {
    width: 58rpx;
    height: 58rpx;
    vertical-align: middle;
    margin-right: 15rpx;
}
.good-info .good-edit .by-num {
    margin: 20rpx 0 0rpx 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.good-info .good-edit .by-num .edit-num-btn {
    display: inline-block;
    width: 68rpx;
    height: 44rpx;
    margin-left: 15rpx;
    text-align: center;
    background: #f6f6f6;
    border-radius: 6rpx;
}
.good-info .good-edit .by-num .edit-num {
    display: inline-block;
    width: 80rpx;
    height: 44rpx;
    margin-left: 15rpx;
    text-align: center;
    background: #f6f6f6;
    border-radius: 6rpx;
}
.good-info .btn-area {
    width: 100%;
    height: 169rpx;
    padding-top: 40rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #ececec;
    background: #fff;
    display: flex;
    flex-direction: row;
    position: relative;
}
.good-info .btn-area .btn-area-inner {
    flex: 1;
    height: 100%;
}
.good-info .btn-area .btn {
    width: 86%;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    color: #fff;
    font-size: 32rpx;
}
.good-info .btn-area .add-cart-btn {
    background: #e7a124;
}
.good-info .btn-area .buy-btn {
    background: #101010;
}

/* 优惠 */
.sale-box-pop {
    width: 100%;
    /* height: 600rpx; */
    padding: 0 35rpx;
    box-sizing: border-box;
}
.sale-title {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-align: center;
    padding-top: 44rpx;
}
.scroll-box {
    width: 100%;
    max-height: 680rpx;
}
.sale-list {
    width: 100%;
    padding: 35rpx 30rpx;
    box-sizing: border-box;
    border-top: 2rpx solid rgba(226, 226, 226, 1);
}
.sale-item {
    width: 100%;
    height: 173rpx;
    display: flex;
    margin-bottom: 30rpx;
}
.sale-list .sale-item:last-child {
    margin-bottom: 0;
}
.coupon-left {
    width: 35%;
    height: 100%;
    font-size: 41rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
    box-sizing: border-box;
}
.coupon-right {
    width: 0;
    flex: 1;
    padding: 27rpx 10rpx 23rpx 20rpx;
    box-sizing: border-box;
}
.coupon-title {
    height: 28rpx;
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
}
.coupon-time {
    height: 24rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin: 20rpx 0;
}
.coupon-state {
    height: 24rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #cd9535;
}
.sale-receive-btn {
    width: 80%;
    height: 100rpx;
    border-radius: 50rpx;
    background-color: #f78f23;
    color: #fff;
    font-size: 40rpx;
    margin: 20rpx auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.received {
    background-color: #ccc;
}
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

.bg_nocity {
    height: 100vh;
    position: fixed;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.nocity_img {
    width: 570rpx;
    height: 570rpx;
}
.nocity_close_img {
    margin-top: 70rpx;
    width: 48rpx;
    height: 48rpx;
}

.bbb {
    border: 1px solid #111833;
    border-radius: 30rpx;
    padding: 10rpx 10rpx;
    font-size: 28rpx;
    background: #111833;
    color: #fff;
    width: 520rpx;
    text-align: center;
}
.mask_login {
    width: 100%;
    height: 100vh;
    top: 0;
    position: fixed;
}

/* 商家信息 */
.shop_info {
    background-color: #fff;
    display: flex;
    padding: 20rpx;
}
.shop_img {
    width: 120rpx;
    height: 120rpx;
    background-color: #eeeeee;
    border-radius: 8rpx;
    flex-shrink: 0;
}
.shop_msg {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.shop_title {
    font-size: 26rpx;
    color: #333333;
    font-weight: bold;
}
.shop_desc {
    color: #999999;
    font-size: 24rpx;
}
.shop_btn {
    background: linear-gradient(93deg, #df0303 0%, #ff6868 100%);
    color: #fff;
    width: 120rpx;
    font-size: 20rpx;
    text-align: center;
    border-radius: 6rpx;
}
.swiper-box {
    height: 414px;
}
.swiper-box-image {
    height: 414px;
}
.rematr-sale {
    display: flex;
    align-items: center;
    background: #000;
    color: #ffffff;
    font-size: 28rpx;
    border-radius: 14rpx;
    padding: 15rpx 0rpx 15rpx 10rpx;
}
.time-box {
    background-color: #fff;
    color: #000;
    padding: 8rpx 6rpx;
    border-radius: 8rpx;
}
.time-sybmol {
    padding: 0rpx 10rpx;
}
.sale-hot-img {
    position: absolute;
    width: 465rpx;
    height: 400rpx;
    left: -18px;
    top: -13px;
    transform: rotate(27deg);
}

/* 活动结束 蒙层 */
.activity-end-popup-content {
    background-color: #fff;
    border-radius: 28rpx;
    width: 580rpx;
    padding: 28rpx 0 34rpx;
}
.activity-end-popup-content .goods-name {
    font-size: 24rpx;
    color: #999;
}
.activity-end-popup-content .title-text {
    font-size: 36rpx;
    font-weight: bold;
}
.activity-end-popup-content .activity-end-img {
    width: 434rpx;
    height: 250rpx;
    margin: 68rpx 0 32rpx;
}
.activity-end-popup-content .popup-btn {
    font-size: 32rpx;
    width: 490rpx;
    height: 88rpx;
    border-radius: 48rpx;
    background: linear-gradient(273deg, #fe213f 0%, #ff662a 100%);
    color: #fff;
    padding: 0;
    line-height: 88rpx;
}

.get-phone-btn {
    position: fixed;
    width: 400rpx;
    height: 110rpx;
    padding: 0;
    margin: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: transparent;
}

/* 浏览用户 */
.browse-user {
    position: absolute;
    top: 90rpx;
    left: 50rpx;
    font-size: 24rpx;
    color: #fff;
    border-radius: 26rpx;
    padding-right: 15rpx;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 1s linear;
}
.browse-user .user-avatar-img {
    width: 50rpx;
    height: 50rpx;
    background-color: #ccc;
    margin-right: 20rpx;
    border-radius: 50%;
}
.show-bur {
    opacity: 1;
    top: 50rpx;
}
.hide-bur {
    opacity: 0;
    top: 0rpx;
}
</style>
