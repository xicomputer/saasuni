<template>
    <!-- 商家推荐 -->
    <!--  -->

    <view class="recommend-box">
        <!-- --------------2号模板-------------- -->
        <view v-if="tempId == 1" class="temp2-container container-bg1">
            <view-more-title
                title="商家推荐"
                title-color="#A73243"
                title-size="40"
                :img-name="'t' + tempId + '-4.png'"
                @click="goComment"
                sub-title="为你推荐好物"
            ></view-more-title>

            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row">
                    <view class="me-fx-col goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods-img"></image>

                        <view class="me-fx-1 me-fx-col goods-info">
                            <text class="me-full-text goods-name">{{ item.commodityName }}</text>
                            <view style="text-align: center">
                                <text class="price2">￥</text>
                                <text class="price-text">{{ item.lowPrice }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- --------------3号模板-------------- -->
        <view v-if="tempId == 2" class="temp3-container">
            <view class="me-fx-row me-fx-sb-c title-box">
                <view class="me-fx-row me-fx-start-end">
                    <text class="title-text">商家推荐</text>
                    <text class="subtitle-text">为你推荐好物</text>
                </view>
                <navigator @tap="goComment" class="me-fx-row me-fx-c-c more">
                    <text>更多</text>
                    <text class="icon icon-right"></text>
                </navigator>
            </view>
            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row">
                    <view class="me-fx-col goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                        <view class="item-top-el"></view>

                        <view class="item-bottom-el"></view>

                        <view class="me-fx-col me-fx-sa-c goods-content">
                            <view class="goods-name me-full-text view-start">{{ item.commodityName }}</view>
                            <image :src="item.thumbnail" class="goods-img"></image>
                            <view class="buy-btn" v-if="orderSwitch">立即抢购</view>
                            <view class="buy-btn" v-else>参考价</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- --------------3号模板-------------- -->
        <view v-if="tempId == 3" class="temp5-container">
            <view class="me-fx-col me-fx-c-c">
                <text class="title-text">商家推荐</text>
                <text class="subtitle-text">BUSINESS RECOMMENDATION</text>
            </view>
            <view v-if="index == 0" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                <view class="first-goods">
                    <image :src="item.thumbnail" class="first-goods-img"></image>
                    <view class="goods-info">
                        <view class="goods-name">{{ item.commodityName }}</view>
                        <view class="me-fx-row me-fx-sb-c price-box">
                            <view>
                                <text class="text_yuan">￥</text>
                                <text>{{ item.lowPrice }}</text>
                            </view>
                            <view class="me-fx-row me-fx-sa-c buy-btn" v-if="orderSwitch">
                                <text class="icon icon-cart"></text>
                                <text>立即购买</text>
                            </view>
                            <view class="me-fx-row me-fx-c-c buy-btn" v-else>
                                <text>参考价</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="me-fx-row me-fx-sb goods-list">
                <view @tap="toGoodsDetails" :data-id="item.commodityId" v-if="index != 0" v-for="(item, index) in recommends" :key="index">
                    <view class="goods-item">
                        <image :src="item.thumbnail" class="goods-img"></image>
                        <view class="goods-info">
                            <view class="me-full-text">{{ item.commodityName }}</view>
                            <view class="me-fx-row me-fx-sb-c price-text">
                                <view>
                                    <text class="text_yuan">￥</text>
                                    <text>{{ item.lowPrice }}</text>
                                </view>
                                <view class="me-fx-row me-fx-c-c full-right-box" v-if="orderSwitch">
                                    <text class="icon icon-right"></text>
                                </view>
                                <view class="me-fx-row me-fx-c-c full-right-box-order" v-else>
                                    <text>参考价</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- --------------4号模板-------------- -->
        <view v-if="tempId == 4" class="temp2-container container-bg4">
            <!-- <view class='me-fx-row me-fx-sb-c title-box'>
            <view class='me-fx-row me-fx-start-end'>
                <text class='title-text'>商家推荐</text>
                <text class='subtitle-text'>为你推荐好物</text>
            </view>
            <navigator bindtap="goComment" class='me-fx-row me-fx-c-c more'>
                <text>更多</text>
                <text class='icon icon-right'></text>
            </navigator>
        </view> -->
            <view-more-title title="商家推荐" title-color="#fff" title-size="40" :img-name="'t' + tempId + '-4.png'" @click="goComment" sub-title="为你推荐好物"></view-more-title>

            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row">
                    <view class="me-fx-col goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods-img"></image>

                        <view class="me-fx-1 me-fx-col goods-info">
                            <text class="me-full-text goods-name">{{ item.commodityName }}</text>
                            <view style="text-align: center">
                                <text class="price2">￥</text>
                                <text class="price-text">{{ item.lowPrice }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- <view wx:if='{{tempId==4}}' class='temp11-container' >
        <view class='me-fx-row me-fx-c commend_list11'>
            <image class='leaves-dimg' src='../../../static/leaves_d2.png'></image>
            <text class='title-text'>商家推荐</text>
            <image class='leaves-ximg' src='../../../static/leaves_x2.png'></image>
        </view>
        <view class='goods-list'>
            <block wx:for='{{recommends}}' wx:key='index'>
                <view class='me-fx-row goods-item' wx:if='{{index%2===0}}' bindtap="toGoodsDetails" data-id="{{item.commodityId}}">
                    <image src='{{item.thumbnail}}' class='goods-img'></image>
                    <view class='me-fx-col me-fx-sb goods-info'>
                        <view class='me-full-text me-full-line2 goods-name'>{{item.commodityName}}</view>
                        <view class='price-text'><text>￥</text> <text >{{item.lowPrice}}</text></view>
                        <view class='me-fx-row me-fx-sa-c buy-btn btn-right'  wx:if="{{orderSwitch}}">
                            <text class='icon icon-cart'></text>
                            <text>立即购买</text>
                        </view>
                        <view class='me-fx-row me-fx-sa-c buy-btn btn-right' wx:else>
                            <text>参考价</text>
                        </view>
                    </view>
                </view>
                <view class='me-fx-row goods-item' wx:else bindtap="toGoodsDetails" data-id="{{item.commodityId}}">
                    <view class='me-fx-col me-fx-sb-end goods-info'>
                        <view style="align-self: flex-start;" class='me-full-text me-full-line2 goods-name'>{{item.commodityName}}</view>
                        <view style="align-self: flex-end;"><text class="text11-price">￥</text> <text class='price-text'>{{item.lowPrice}}</text></view>
                        <view class='me-fx-row me-fx-sa-c buy-btn' wx:if="{{orderSwitch}}">
                            <text class='icon icon-cart'></text>
                            <text>立即购买</text>
                        </view>
                        <view class='me-fx-row me-fx-sa-c buy-btn' wx:else>
                            <text>参考价</text>
                        </view>
                    </view>
                    <image src='{{item.thumbnail}}' class='goods-img'></image>
                </view>
            </block>
        </view>
    </view> -->

        <!-- --------------3号模板-------------- -->
        <view v-if="tempId == 10" class="me-fx-row me-fx-c-c temp4-container">
            <image src="/static/pages/static/tuijian_bg.png" class="tuijian-bg-img"></image>
            <view class="temp-content">
                <navigator @tap="goComment" class="me-fx-row me-fx-sb subtitle-text me-fx-start-end">
                    <view class="me-fx-row me-fx-start-end">
                        <view class="title-text">商家推荐</view>
                        <text>欢迎选购</text>
                    </view>
                    <text class="moreShops">更多</text>
                </navigator>
                <scroll-view scroll-x class="goods-scroll">
                    <view class="me-fx-row">
                        <view class="goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                            <image :src="item.thumbnail" class="goods-img"></image>

                            <view class="goods-name me-full-text view-start">{{ item.commodityName }}</view>

                            <view class="view-start">
                                <text class="txt3_price">￥</text>
                                <text class="price-text">{{ item.lowPrice }}</text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>

        <!-- --------------6号模板-------------- -->
        <view v-if="tempId == 7" class="temp6-container">
            <view class="me-fx-row me-fx-sb-c title-box">
                <view class="me-fx-row me-fx-start-end">
                    <text class="title-text">商家推荐</text>
                    <text class="subtitle-text">欢迎选购</text>
                </view>
                <navigator @tap="goComment" class="me-fx-row me-fx-c-c more">
                    <text>更多</text>
                    <text class="icon icon-right"></text>
                </navigator>
            </view>
            <view class="me-fx-row me-fx-sb goods-list">
                <view class="goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                    <image :src="item.thumbnail" class="goods-img"></image>

                    <view class="me-fx-col me-fx-sa-c goods-info">
                        <view class="me-full-text">{{ item.commodityName }}</view>
                        <view class="me-fx-row me-fx-c-c price-box">
                            <text class="text_yuan">￥</text>
                            <text>{{ item.lowPrice }}</text>
                        </view>
                        <view class="me-fx-row me-fx-sa-c buy-btn">
                            <text class="icon icon-cart"></text>
                            <text>立即购买</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- --------------7号模板-------------- -->
        <view v-if="tempId == 6" class="temp7-container">
            <!-- <view class='me-fx-row me-fx-sb-c title-box'>
            <view class='me-fx-row me-fx-start-end'>
                <text class='title-text'>商家推荐</text>
                <text class='subtitle-text'>欢迎选购</text>
            </view>
            <navigator bindtap="goComment" class='me-fx-row me-fx-c-c more'>
                <text>更多</text>
                <text class='icon icon-right'></text>
            </navigator>
        </view> -->
            <view class="goods-list" style="width: 710rpx; margin: 0 auto">
                <view
                    class="me-fx-row goods-item"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 0 10rpx"
                    @tap="toGoodsDetails"
                    :data-id="item.commodityId"
                    v-for="(item, index) in recommends"
                    :key="index"
                >
                    <image :src="item.thumbnail" class="goods-img" style="width: 140rpx; height: 140rpx" mode="aspectFill"></image>

                    <view
                        class="me-fx-col me-fx-sb goods-info"
                        style="width: 60%; height: 100%; padding: 20rpx 0; margin-left: 15rpx; display: flex; justify-content: space-between"
                    >
                        <view class="me-full-text me-full-line2 txt7_name u-line-1" style="font-size: 24rpx; font-weight: 600">{{ item.commodityName }}</view>
                        <text class="describe u-line-1" style="font-size: 20rpx; color: #999">{{ item.description }}</text>
                        <!-- <view>
                        <text class='preferential-label'>会员特惠</text>
                    </view> -->
                        <view class="me-fx-row me-fx-sb-c">
                            <view>
                                <text class="text7_moneyt" style="color: red">￥</text>
                                <text class="price-text" style="color: red">{{ item.lowPrice }}</text>
                            </view>
                            <view class="me-fx-row me-fx-sa-c buy-btn">
                                <!-- <text class='icon icon-cart'></text> -->
                                <!-- <text>立即购买</text> -->
                            </view>
                        </view>
                    </view>

                    <view style="padding-top: 20rpx">
                        <view
                            style="
                                background-color: #ff0000;
                                color: white;
                                padding: 5rpx 10rpx;
                                border-radius: 10rpx 10rpx 0rpx 0rpx;
                                font-size: 18rpx;
                                font-weight: 600;
                                text-align: center;
                            "
                        >
                            {{ btnTitle }}
                        </view>
                        <view
                            style="
                                text-align: center;
                                border: 2px solid red;
                                font-size: 18rpx;
                                padding: 0 10rpx;
                                border-radius: 0rpx 0rpx 10rpx 10rpx;
                                color: #ff0000;
                                font-size: 18rpx;
                            "
                        >
                            在线支付
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- --------------8号模板-------------- -->
        <view v-if="tempId == 8" class="me-fx-row me-fx-c-c temp4-container">
            <image src="/static/pages/static/tuijian_bg2.png" class="tuijian-bg-img"></image>
            <view class="temp-content">
                <view class="title-text">商家推荐</view>
                <navigator @tap="goComment" class="me-fx-row me-fx-sb-c subtitle-text">
                    <text>欢迎选购</text>
                    <text>更多</text>
                </navigator>
                <scroll-view scroll-x class="goods-scroll">
                    <view class="me-fx-row">
                        <view class="goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                            <image :src="item.thumbnail" class="goods-img"></image>

                            <view class="me-fx-row me-fx-c-c">
                                <text>￥{{ item.lowPrice }}</text>
                                <!-- <text class='original-price'>￥120.00</text> -->
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>

        <!-- --------------9号模板-------------- -->
        <view v-if="tempId == 8" class="temp9-container">
            <view class="me-fx-row me-fx-sb-c title-box">
                <view class="me-fx-row me-fx-start-end">
                    <text class="title-text">商家推荐</text>
                    <text class="subtitle-text">为你推荐好物11</text>
                </view>
                <navigator @tap="goComment" class="me-fx-row me-fx-c-c more">
                    <text>更多</text>
                    <text class="icon icon-right"></text>
                </navigator>
            </view>
            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row">
                    <view class="me-fx-col goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods-img"></image>

                        <view class="me-fx-1 me-fx-col me-fx-sa-c goods-info">
                            <text class="me-full-text goods-name">{{ item.commodityName }}</text>
                            <text class="price-text">￥{{ item.lowPrice }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- --------------10号模板-------------- -->
        <view v-if="tempId == 9" class="temp10-container">
            <view class="me-fx-col me-fx-c-c">
                <text class="subtitle-text">BUSINESS RECOMMENDATION</text>
                <image class="interval-img" src="/static/pages/static/interval_line.png"></image>
                <text class="title-text">商家推荐</text>
            </view>
            <view class="me-fx-row me-fx-sb goods-list">
                <view class="goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                    <image :src="item.thumbnail" class="goods-img"></image>

                    <view class="me-fx-col me-fx-sa goods-info">
                        <view class="me-full-text me-full-text me-full-line2">{{ item.commodityName }}</view>
                        <view class="me-fx-row me-fx-sb-c">
                            <text class="price-text">￥{{ item.lowPrice }}</text>
                            <view class="me-fx-row me-fx-c-c cart-box">
                                <text class="icon icon-cart"></text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- --------------12号模板-------------- -->
        <view v-if="tempId == 11" class="temp12-container">
            <view class="me-fx-row me-fx-sb-c title-box">
                <view class="me-fx-row me-fx-start-end">
                    <text class="title-text">商家推荐</text>
                    <text class="subtitle-text">为你推荐好物</text>
                </view>
                <navigator @tap="goComment" class="me-fx-row me-fx-c-c more">
                    <text>更多</text>
                    <text class="icon icon-right"></text>
                </navigator>
            </view>
            <scroll-view :scroll-x="true" class="goods-scroll">
                <view class="me-fx-row">
                    <view class="me-fx-col goods-item" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods-img"></image>

                        <view class="me-fx-1 me-fx-col me-fx-sa-c goods-info">
                            <text class="me-full-text goods-name">{{ item.commodityName }}</text>
                            <text class="price-text">￥{{ item.lowPrice }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- --------------13号模板-------------- -->

        <!-- 4月6日之前更改使用模板 ， 将tempId == 3.1 -->
        <view class="temp5-container" v-if="tempId == 300">
            <view>
                <view class="name-event">
                    <image :src="img"></image>
                    <view class="activity-container">
                        <!-- 上半部分 -->
                        <view class="text">
                            <text>今日推荐</text>
                            <view class="goodGoods">天天好货推荐</view>
                            <view class="hotStyle">爆款直销</view>
                            <view>
                                <text @tap="toMore">更多</text>
                                <image
                                    class="more-icon"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png"
                                ></image>
                            </view>
                        </view>
                        <!-- 下半部分 -->
                        <view class="img">
                            <view class="single" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                                <image :src="item.thumbnail"></image>

                                <!-- <text class="line-clamp2">{{item.commodityName}}</text> -->

                                <view class="price">
                                    <view class="price-new">
                                        <text class="yang1">￥</text>
                                        <text>{{ item.lowPrice }}</text>
                                    </view>
                                    <!-- 没有旧商品价格 -->
                                    <!-- <view class="price-old">
                                    <text class="yang2">￥</text>
                                    <text>{{item.priceArr[0]}}</text>
                                </view> -->
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 目前使用模板 -->
        <view class="temp5-container" v-if="tempId == 3.1">
            <view>
                <view class="name-event">
                    <image :src="img"></image>
                    <view class="activity-container">
                        <!-- 上半部分 -->
                        <view class="text">
                            <text>今日 · 推荐</text>
                            <!-- <view class="goodGoods">天天好货推荐</view> -->
                            <image
                                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E5%A4%A9%E5%A4%A9%E6%8E%A8%E8%8D%90.gif"
                                mode="aspectFill"
                            ></image>
                            <!-- <view>
                            <text bindtap="toMore">更多</text>
                            <image class="more-icon" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png"></image>
                        </view> -->
                        </view>
                        <!-- 下半部分 -->
                        <view class="img">
                            <view class="single" @tap="toGoodsDetails" :data-id="item.commodityId" v-for="(item, index) in recommends" :key="index">
                                <text>{{ item.commodityName }}</text>

                                <view class="inMiddle">
                                    <image class="GoodsImg" :src="item.thumbnail"></image>
                                    <text class="describe">{{ item.description }}</text>
                                </view>

                                <!-- <text class="line-clamp2">{{item.commodityName}}</text> -->

                                <view class="price">
                                    <view class="price-new">
                                        <text class="yang1">￥</text>
                                        <text>{{ item.lowPrice }}</text>
                                    </view>
                                </view>

                                <image
                                    class="popup"
                                    v-if="mainOrderType == '3'"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E9%97%A8%E5%BA%97%E5%9B%A2%E8%B4%AD.png"
                                ></image>

                                <image
                                    class="popup"
                                    v-if="mainOrderType == '2'"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2F%E5%90%8C%E5%9F%8E%E9%85%8D%E9%80%81.png"
                                ></image>

                                <image
                                    class="popup"
                                    v-if="mainOrderType == '1'"
                                    :data-goodinfo="item"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%88%86%E7%B1%BB-%E7%89%A9%E6%B5%81%E9%85%8D%E9%80%81_slices%2FGroup%202985%402x.png"
                                ></image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 下面为基础版首次进入页面的商家推荐模块，旧模块 -->
    </view>
    <!-- <view class="shop_recommend" wx:else>
    <view class="me-fx-row me-fx-c-c">
        <text class="recommend_title">商家为你推荐好货，支持全国发货</text>
    </view>
    <view class="me-fx-row me-fx-sb recommends">
        <view class="recommends_info me-fx-col me-fx-start-c" wx:for='{{recommends}}' wx:key='index' bindtap="toGoodsDetails" data-id="{{item.commodityId}}">
            <image src='{{item.thumbnail}}' class='goods-img'></image>
            <text class="recomnmend_desc me-full-text">{{item.description}}</text>
            <view class="recommend_pay me-fx-row me-fx-sb me-fx-start-c">
                <view><text class="class_price">￥</text><text class="logPrice">{{item.lowPrice}}</text></view>
                <view class="btn_price">全国发货</view>
            </view>
        </view>
    </view>
</view> -->
</template>

<script>
import viewMoreTitle from '../view-more-title/view-more-title';
// pages/Index/shopHome/components/recommend/recommend.js
// 商家推荐模块
export default {
    components: {
        viewMoreTitle
    },
    data() {
        return {
            recommends: [],
            label: [],
            btnTitle: '',
            img: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        mainOrderType: {
            type: String,
            default: ''
        },
        tempId: {
            type: [String, Number],
            default: 1
        },
        mainGoodsList: {
            // 截取四个出来
            type: Array,
            default: () => []
        },
        marchantId: {
            type: String,
            default: ''
        },
        orderSwitch: {
            type: [Number, String]
        }
    },
    watch: {
        mainOrderType: {
            handler: function (nowVal, oldVal) {
                if (nowVal) {
                    var btnTitle = '';

                    switch (Number(nowVal)) {
                        case 1:
                            btnTitle = '物流发货';
                            break;

                        case 2:
                            btnTitle = '同城配送';
                            break;

                        case 3:
                            btnTitle = '门店团购';
                            break;
                    }

                    console.log(btnTitle, 'btnTitle');
                    this.setData({
                        btnTitle
                    });
                }
            },

            immediate: true,
            deep: true
        },
        mainGoodsList: {
            handler: function (val) {
                // 截取四份数据给今日推荐
                console.log(val, '今日推荐');
                this.setData({
                    recommends: val
                });
            },

            immediate: true,
            deep: true
        }
    },
    beforeMount: function () {
        // 在组件实例进入页面节点树时执行
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转更多页面
        toMore() {
            uni.navigateTo({
                url: `/pages/shopHome/recommendList/recommendList?mainOrderType=${this.mainOrderType}`
            });
        },

        // 去往当个商品详情页
        toGoodsDetails(e) {
            var id = e.currentTarget.dataset.id; // 商品ID

            var mainOrderType = this.mainOrderType; // 商家经营模式

            var url = '/pages/Index/GoodsDetails/GoodsDetails?id=' + id;

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
        },

        goComment() {
            // this.triggerEvent('myManager', '商品推荐')
            var { marchantId, mainOrderType } = this;
            var query = `marchantId=${marchantId}&title=商家推荐&mainOrderType=${mainOrderType}`;
            uni.navigateTo({
                url: '/pages/shopHome/column/column?' + query
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';
@import '../../iconfont/iconfont.css';

.u-line-1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.u-line-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.activity-container {
    border-radius: 20rpx;
}

.more-icon {
    width: 14rpx !important;
    height: 26rpx !important;
}

.name-event {
    width: 100%;
    border-radius: 20rpx;
    position: relative;
    margin-top: 30rpx;
}

.line-clamp2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.name-event > image {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -111;
}

.name-event .activity-container .text {
    width: 100%;
    height: 105rpx;
    display: flex;
    align-items: center;
}

.name-event .activity-container .text text {
    font-size: 38rpx;
    color: #333;
    font-weight: bolder;
    margin-left: 25rpx;
    letter-spacing: 1rpx;
}

.name-event .activity-container .text view {
    width: 115rpx;
    height: inherit;
    margin-right: 8rpx;
    display: flex;
    align-items: center;
}

.name-event .activity-container .text view text {
    font-size: 26rpx;
    margin-right: 5rpx;
    color: #333;
    font-weight: 400;
}

.name-event .activity-container .img {
    display: flex;
    flex-direction: column;
}
.name-event .activity-container .text > image {
    width: 200rpx;
    height: 46rpx;
    margin-left: 20rpx;
    margin-bottom: 2rpx;
}
/* .name-event .activity-container .text .goodGoods {
  font-size: 24rpx;
  color: #ffff;
  width: 200rpx;
  height: 46rpx;
  background-color: #60aff5;
  border-radius: 50rpx;
  padding-left: 25rpx;
  padding-top: 5rpx;
  box-sizing: border-box;
  letter-spacing: 1rpx;
  background: linear-gradient(90deg, rgba(250, 103, 54, 1) 0%, rgba(252, 83, 63, 1) 100%);
  margin-left: 20rpx;
  margin-bottom: 2rpx;
} */

.name-event .activity-container .text .hotStyle {
    font-size: 24rpx;
    width: 140rpx;
    height: 46rpx;
    border-radius: 50rpx;
    box-sizing: border-box;
    border: 2rpx solid #ff4b39;
    padding: 4rpx 0 0 20rpx;
}

.name-event .activity-container .img .single {
    width: 100%;
    height: 546rpx;
    background-color: #fff2e2;
    border-radius: 10rpx;
    margin-right: 14rpx;
    margin-bottom: 30rpx;
    position: relative;
}
.name-event .activity-container .img .single:last-child {
    margin-bottom: 0;
}

.name-event .activity-container .img .single .inMiddle {
    width: 640rpx;
    height: 300rpx;
    margin-top: 170rpx;
    margin-left: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-event .activity-container .img .single .inMiddle .GoodsImg {
    width: 250rpx;
    height: 300rpx;
    border-radius: 10rpx;
    background-color: #81bed5;
}

.name-event .activity-container .img .single .inMiddle .describe {
    width: 350rpx;
    font-size: 24rpx;
    font-weight: bolder;
    line-height: 46rpx;
    color: #333;
    overflow: hidden;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.name-event .activity-container .img .single > text:nth-child(1) {
    position: absolute;
    top: 38rpx;
    left: 8rpx;
    margin-left: 14rpx;
    font-size: 36rpx;
    font-weight: bold;
}

.name-event .activity-container .img .single .price {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 70rpx;
    right: 252rpx;
    width: 122rpx;
    height: 30rpx;
}

.name-event .activity-container .img .single .price .price-new {
    display: flex;
    align-items: baseline;
}

.name-event .activity-container .img .single .price .price-new > text:nth-child(1) {
    font-size: 24rpx;
    color: #fa6b2b;
}

.name-event .activity-container .img .single .price .price-new > text:nth-child(2) {
    margin-left: -1rpx;
    font-size: 36rpx;
    color: #fa6b2b;
    font-weight: 400;
}

.name-event .activity-container .img .single .price .price-old {
    display: flex;
    align-items: center;
    margin-top: 37rpx;
}

.name-event .activity-container .img .single .price .price-old > text {
    position: relative;
    font-size: 24rpx;
    color: #999;
}

.name-event .activity-container .img .single .price .price-old > text:nth-child(2)::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 18rpx;
    left: -15rpx;
    width: 38rpx;
    height: 3rpx;
    background: #999;
}

/* 以上为新模块css */
.shop_recommend {
    margin: 20rpx 0rpx;
}

.recommend_title {
    font-size: 24rpx;
    color: #ff4545;
    font-weight: bold;
}

.recommends_info {
    width: 368rpx;
    height: 502rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
}

.recommends {
    margin-top: 20rpx;
}

.goods-img {
    width: 312rpx;
    height: 312rpx;
    margin: 10rpx;
}

.recommends {
    flex-wrap: wrap;
}

.recomnmend_desc {
    color: #333333;
    font-size: 26rpx;
    font-weight: bold;
    margin: 20rpx;
    -webkit-line-clamp: 2;
    height: 80rpx;
}

.btn_price {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    border-radius: 30px;
    font-size: 24rpx;
    width: 130rpx;
    height: 40rpx;
    text-align: center;
}

.recommend_pay {
    width: 320rpx;
    margin-bottom: 10rpx;
}

.class_price {
    font-size: 22rpx;
    color: #ff1c1c;
}

.logPrice {
    color: #ff1c1c;
    font-size: 36rpx;
}

/* 5号模板 */

/* --------2号模板样式--------- */
/* --------3号模板样式--------- */
.temp3-container {
    padding: 0 32rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #fff;
}

.temp3-container .title-box {
    margin-bottom: 20rpx;
    width: 100%;
    color: #fff;
}

.temp3-container .title-text {
    font-size: 40rpx;
    font-weight: bold;
}

.temp3-container .subtitle-text {
    font-size: 24rpx;
    font-weight: 600;
    margin-left: 12rpx;
}

.temp3-container .icon-right {
    font-size: 24rpx;
}

.temp3-container .goods-scroll {
    width: 686rpx;
    border-radius: 20rpx;
}

.temp3-container .goods-item {
    width: 182rpx;
    height: 312rpx;
    overflow: hidden;
    position: relative;
    border-radius: 20rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
}

.temp3-container .goods-item .item-top-el {
    height: 170rpx;
    background-color: #eab87b;
}

.temp3-container .goods-item .item-bottom-el {
    height: 146rpx;
    background-color: #f6e8ce;
}

.temp3-container .goods-content {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
}

.temp3-container .goods-name {
    color: #fff;
    font-size: 24rpx;
    margin: 0rpx 20rpx;
}

.temp3-container .goods-img {
    width: 158rpx;
    height: 158rpx;
    border-radius: 15rpx;
    background-color: #fff;
}

.temp3-container .price-text {
    color: #000000;
    font-size: 30rpx;
}

.temp3-container .buy-btn {
    padding: 0 15rpx;
    background-color: #000000;
    font-size: 22rpx;
    color: #fff;
    border-radius: 8rpx;
    margin-bottom: 15rpx;
}

.view-start {
    align-self: flex-start;
    margin: 0rpx 10rpx;
    color: #fe4f4f;
}

.full-right-box-order {
    border-radius: 10rpx;
    color: #fff;
    background-color: #333;
}

.full-right-box-order > text {
    font-size: 28rpx;
    padding: 5rpx 10rpx;
}

/* 6模板 */
.temp5-container {
    box-sizing: border-box;
}

.temp5-container .title-text {
    font-size: 40rpx;
    color: #333;
    font-weight: bold;
}

.temp5-container .subtitle-text {
    font-size: 24rpx;
    color: #999;
}

.temp5-container .first-goods {
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
    margin-top: 20rpx;
}

.temp5-container .first-goods-img {
    width: 100%;
    height: 686rpx;
    border-radius: 20rpx;
    background-color: #ccc;
}

.temp5-container .goods-info {
    padding: 16rpx 20rpx;
    box-sizing: border-box;
}

.temp5-container .goods-name {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 12rpx;
}

.temp5-container .price-box {
    font-size: 40rpx;
    color: #333;
}

.temp5-container .original-price {
    font-size: 28rpx;
    color: #666;
    text-decoration: line-through;
}

.temp5-container .buy-btn {
    background-color: #353336;
    color: #fff;
    font-size: 28rpx;
    padding: 0 10rpx;
    border-radius: 16rpx;
}

.temp5-container .goods-list {
    margin-top: 20rpx;
    flex-wrap: wrap;
}

.temp5-container .goods-item {
    padding: 10rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
    margin-bottom: 20rpx;
    width: 334rpx;
}

.temp5-container .goods-img {
    width: 100%;
    height: 316rpx;
    background-color: #ccc;
    border-radius: 20rpx;
}

.temp5-container .goods-list .goods-info {
    padding: 10rpx;
    box-sizing: border-box;
}

.temp5-container .goods-list .price-text {
    font-size: 40rpx;
    font-weight: bold;
}

.temp5-container .full-right-box {
    width: 48rpx;
    height: 48rpx;
    border-radius: 10rpx;
    color: #fff;
    background-color: #333;
}

.temp5-container .full-right-box .icon-right {
    font-size: 24rpx;
}

.goods-name {
    font-size: 24rpx;
}

/* 1和4 号模板 */

.temp2-container {
    padding: 16rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #fff;
    position: relative;
    width: 710rpx;
    margin: 20rpx auto;
    border-radius: 18rpx;
}

.temp2-container .title-box {
    margin-bottom: 20rpx;
    width: 100%;
    color: #333;
}

.container-bg1 {
    background: linear-gradient(269deg, #ffb7cd 0%, #ffd0ca 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01);
}

.container-bg1 .title-box {
    color: #a73243;
}

.container-bg4 {
    background: linear-gradient(269deg, #0396ff 0%, #abdcff 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01);
}

.container-bg4 .title-box {
    color: #fff;
}

.temp2-container .title-text {
    font-size: 32rpx;
    font-weight: bold;
}

.temp2-container .subtitle-text {
    font-size: 24rpx;
    margin-left: 12rpx;
}

.temp2-container .icon-right {
    font-size: 24rpx;
}

.temp2-container .goods-scroll {
    width: 678rpx;
    height: 306rpx;
    margin-top: 15rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    background-color: #fff;
    padding: 16rpx;
}

.temp2-container .goods-item {
    width: 184rpx;
    height: 274rpx;
    color: #333;
    font-family: 'DIN_font';
    border-radius: 20rpx;
    flex-shrink: 0;
    margin-right: 36rpx;
}

.temp2-container .goods-img {
    width: 100%;
    height: 184rpx;
    border-radius: 20rpx;
    background-color: #ccc;
}

.temp2-container .goods-info {
    padding: 0 15rpx;
    box-sizing: border-box;
}

.temp2-container .goods-name {
    font-size: 24rpx;
}

.temp2-container .price-text {
    font-size: 28rpx;
}

/* 8号模板 */
/* --------11号模板样式--------- */
.temp11-container {
    padding: 0 32rpx;
    box-sizing: border-box;
}

.temp11-container .leaves-dimg {
    width: 48rpx;
    height: 48rpx;
    position: relative;
    top: 5px;
}

.temp11-container .title-text {
    font-size: 40rpx;
    color: #fff;
    font-weight: bold;
    padding: 0rpx 10rpx;
}

.temp11-container .leaves-ximg {
    width: 32rpx;
    height: 32rpx;
    top: 27rpx;
    position: relative;
}

.temp11-container .goods-item {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
    background-color: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
}

.temp11-container .goods-img {
    width: 258rpx;
    height: 258rpx;
    border-radius: 20rpx;
    background-color: #ccc;
}

.temp11-container .goods-info {
    flex: 1;
    font-size: 32rpx;
    padding: 16rpx;
    box-sizing: border-box;
}

.temp11-container .goods-name {
    line-height: 45rpx;
    font-size: 32rpx;
}

.temp11-container .price-text {
    font-size: 36rpx;
    color: #f16e2a;
}

.text11-price {
    font-size: 32rpx;
    color: #f16e2a;
}

.temp11-container .buy-btn {
    background-color: #9ec06c;
    color: #fff;
    font-size: 28rpx;
    padding: 0 10rpx;
    border-radius: 8rpx;
    width: 160rpx;
}

.commend_list11 {
    margin-bottom: 20rpx;
}

.temp11-container .buy-btn .icon-cart {
    font-size: 32rpx;
}

.name-event .activity-container .img .single .popup {
    width: 155rpx;
    height: 56rpx;
    position: absolute;
    right: 30rpx;
    bottom: 48rpx;
}
.support {
    height: 40rpx;
    font-size: 20rpx;
    text-align: center;
    color: rgb(0, 0, 0);
    font-weight: bold;
}
</style>
