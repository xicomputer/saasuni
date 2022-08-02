<template>
    <view>
        <store-close v-if="isClose"></store-close>

        <view class="index" v-if="nowTabbarText == '首页'">
            <!-- banner图 -->
            <swiper v-if="'markerInfo.recommendList'" class="swiper" indicator-dots autoplay>
                <block v-for="(item, index) in markerInfo.recommendList" :key="index">
                    <swiper-item>
                        <navigator hover-class="none" class="img" :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&sid=' + item.tempSpecId">
                            <image :src="item.thumbnail" :data-list="markerInfo.recommendList" :data-src="item.thumbnail" mode="aspectFill" class="img" />
                            <view v-if="item.description" class="description-text">{{ item.description }}</view>
                        </navigator>
                    </swiper-item>
                </block>
            </swiper>
            <swiper v-else class="swiper" indicator-dots autoplay>
                <block v-for="(item, index) in markerInfo.homeImg" :key="index">
                    <swiper-item>
                        <image :src="item.httpAddress" @tap="imgClick" :data-list="markerInfo.homeImg" :data-src="item.httpAddress" mode="aspectFill" class="img" />
                    </swiper-item>
                </block>
            </swiper>

            <!-- 通知栏 -->
            <view class="notice-bar-container" v-if="noticeContent.length">
                <image src="/static/pages/img/index/notice_bar.png" style="width: 36rpx; height: 36rpx"></image>
                <text class="notice-title-text">公告:</text>
                <van-notice-bar style="flex: 1" color="#ff0000" background="#fff" :text="noticeContent"></van-notice-bar>
            </view>

            <!-- 关注 -->
            <view class="follow-container">
                <view class="follow-user-list">
                    <block v-for="(item, index) in markerInfo.allConcerns" :key="index">
                        <image class="follow-user-image" :style="'left: ' + 28 * index + 'rpx;'" :src="item.headimgurl"></image>

                        <view v-if="index == 19" :style="'left: ' + 28 * index + 'rpx;'" class="follow-user-image follow-user-more">99+</view>
                    </block>
                </view>
                <view @tap="parseEventDynamicCode($event, markerInfo.subscribe == 0 ? 'showDingYue' : '')" class="follow-btn-container">
                    <image
                        :src="markerInfo.subscribe == 0 ? '/pages/img/index/store_subscribe.png' : '/pages/img/index/store_subscribed.png'"
                        style="width: 48rpx; height: 48rpx"
                    ></image>
                    {{ markerInfo.subscribe == 0 ? '店铺订阅' : '已订阅' }}
                </view>
            </view>

            <!-- 商家信息 -->
            <view class="marchant-info">
                <view class="label">
                    <view class="label-item" v-for="(item, index) in markerInfo.labelsList" :key="index">
                        <image src="/static/pages/img/my/hdui.png" class="icon" />

                        <view class="text">{{ item }}</view>
                    </view>
                </view>
                <view class="content">
                    <view class="item">
                        <image src="/static/pages/img/my/ic_clock.png" class="icon" />
                        <text>营业时间:{{ markerInfo.openingTime }}-{{ markerInfo.closingTime }}</text>
                        <image style="margin-left: 20rpx" src="/static/pages/img/yirenzheng.png" class="renzheng" />
                        <view class="visitor">
                            <image src="/static/pages/img/visitor.png" class="icon1" />
                            访客{{ markerInfo.accessNumber }}
                        </view>
                    </view>
                    <view class="item">
                        <image src="/static/pages/img/my/ic_dz.png" class="icon" />
                        <text>{{ markerInfo.entirelyAddress }}</text>
                    </view>
                    <view class="item">
                        <view>
                            <image src="/static/pages/img/my/ic_introduce.png" class="icon" />
                        </view>
                        <view class="more-introduce">
                            {{ markerInfo.brief }}
                        </view>
                    </view>
                </view>
            </view>

            <!-- 推荐酒店 -->
            <hotel v-if="hotelList.length" :hotelList="hotelList"></hotel>

            <!-- 推荐零售 -->
            <retail v-if="shopList.length > 0" :shopList="shopList"></retail>

            <!-- 积分乐园 -->
            <view @tap="toIntergral" v-if="isIntegral && countDown > 0" class="index_integral_box">
                <view class="index_integral_title" style="background-image: url(https://xssj.letterbook.cn/applet/images/index_task_bg.png)">
                    <van-count-down use-slot @change="changeTime" @finish="overTimeFun" :time="countDown">
                        <text v-if="timeData.days != 0" class="index_integral_countdown_text" style="padding: 4rpx 8rpx">{{ timeData.days }}</text>
                        <text v-if="timeData.days != 0" class="index_integral_countdown">天</text>
                        <text class="index_integral_countdown_text">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</text>
                        <text class="index_integral_countdown">:</text>
                        <text class="index_integral_countdown_text">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</text>
                        <text class="index_integral_countdown">:</text>
                        <text class="index_integral_countdown_text">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</text>
                    </van-count-down>
                </view>
            </view>

            <!-- 搜索商品 -->
            <view class="search-container">
                <navigator class="search-container-content" :url="'/pages/Index/searchGood/searchGood?marchantId=' + marchantId">
                    <image src="/static/pages/img/my/search.png" style="width: 52rpx; height: 52rpx; margin-right: 10rpx"></image>
                    请输入商品名称
                </navigator>
                <view class="subscribe-notice" v-if="!markerInfo.subscribe1" @tap="showDingYue1">商品通知</view>
                <view class="subscribe-notice" style="background: #ccc" v-if="markerInfo.subscribe1">已订阅</view>
            </view>

            <!-- 活动入口 -->
            <view class="me-fx-row me-fx-sb activity-entery">
                <view class="activity-item" v-for="(item, index) in activityList" :key="index">
                    <image src="" :class="activityList.length == 1 ? 'active-img1' : 'active-img2'"></image>
                </view>
            </view>

            <!-- 商品类别 -->
            <view class="goods">
                <category1 v-if="goodsList.length && markerInfo.shopTemplateId == 1" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category1>
                <category2 v-if="goodsList.length && markerInfo.shopTemplateId == 2" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category2>
                <category3 v-if="goodsList.length && markerInfo.shopTemplateId == 3" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category3>
                <category4 v-if="goodsList.length && markerInfo.shopTemplateId == 4" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category4>
                <category5 v-if="goodsList.length && markerInfo.shopTemplateId == 5" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category5>
                <category6 v-if="goodsList.length && markerInfo.shopTemplateId == 6" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category6>
                <category7 v-if="goodsList.length && markerInfo.shopTemplateId == 7" :goodsList="goodsList" :marchantId="marchantId" :orderType="orderType"></category7>
                <!-- 商品推荐 -->
                <view class="recommend">
                    <view class="title" v-if="ltSix.length">
                        <view class="tips"></view>
                        <view class="name">本店热卖</view>
                    </view>
                    <view class="ltSix" v-if="ltSix.length">
                        <view
                            :data-id="item.commodityId"
                            @tap="toGoodsDetails"
                            class="item"
                            :style="index == ltSix.length - 1 ? 'border-bottom: none' : ''"
                            v-for="(item, index) in ltSix"
                            :key="index"
                        >
                            <view class="left">
                                <image :src="item.thumbnail" class="img" mode="aspectFill" />
                            </view>

                            <view class="right">
                                <view class="name">{{ item.commodityName }}</view>
                                <view class="desc">{{ item.description }}</view>
                                <view class="foot">
                                    <view class="price">
                                        <text class="icon">￥</text>
                                        {{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                                        <text class="cheaper" v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)">￥{{ item.originalPrice }}</text>
                                    </view>
                                    <view class="cart" @tap.stop.prevent="addCart" :data-item="item">加入购物车</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="lgFive" v-if="lgFive.length">
                        <view :data-id="item.commodityId" @tap="toGoodsDetails" class="item" v-for="(item, index) in lgFive" :key="index">
                            <image :src="item.thumbnail" class="img" mode="aspectFill" />

                            <view class="name">{{ item.commodityName }}</view>

                            <view class="foot">
                                <view class="left">
                                    <view class="price">
                                        <text class="icon">￥</text>
                                        {{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                                        <text class="cheaper" v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)">￥{{ item.originalPrice }}</text>
                                    </view>
                                </view>
                                <view class="right" @tap.stop.prevent="addCart" :data-item="item">
                                    <image class="icon" src="/static/pages/img/shop-cart.png" />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 过去风采 -->
            <view class="style" v-if="markerInfo.thepointSins.length > 0">
                <view class="title">
                    <view class="tips"></view>
                    <view class="name">过去风采</view>
                </view>
                <view class="content" v-for="(item, index) in markerInfo.thepointSins" :key="index">
                    <view class="time" :style="index == 0 ? '' : 'margin-top:45rpx'">{{ item.addTime }}</view>

                    <view class="imaBox">
                        <view class="borderBox left"></view>
                        <swiper class="middle">
                            <block v-for="(sitem, index1) in item.sin" :key="index1">
                                <swiper-item>
                                    <image class="img" @tap="imgClick" :data-list="item.sin" :data-src="sitem.httpAddress" mode="aspectFill" :src="sitem.httpAddress" />
                                </swiper-item>
                            </block>
                        </swiper>
                        <view class="borderBox right"></view>
                    </view>
                </view>
            </view>
            <view class="footer">——信书技术支持——</view>
        </view>

        <!-- 优惠券 -->
        <view :style="isDiscount ? '' : 'display:none'" class="promotion">
            <view style="background-image: url(https://xssj.letterbook.cn/applet/images/coupon_bg.png)" class="sale-pop-box">
                <view class="sale-list-container">
                    <scroll-view :scroll-y="true" class="scroll-box">
                        <view class="sale-list">
                            <view
                                class="sale-item"
                                style="background-image: url(https://xssj.letterbook.cn/applet/images/coupon_item_bg.png)"
                                v-for="(item, index) in saleCanList"
                                :key="index"
                            >
                                <view class="sale-left">
                                    <view class="sale-price-icon">￥</view>
                                    <view class="sale-price-num">{{ item.deduct }}</view>
                                </view>

                                <view class="sale-right">
                                    <view class="sale-price-desc">满{{ item.confine }}可用</view>
                                    <view class="sale-price-name">{{ item.couponName }}</view>
                                    <view class="sale-over-time">过期时间：{{ item.endTime }}</view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <view class="sale-comfirm" @tap="receiveSale">{{ saleState }}</view>
                </view>
            </view>
            <image class="sale-close" @tap="closeSale" src="/static/pages/img/goods/close.png"></image>
        </view>

        <!-- 关注 -->
        <van-overlay :show="showFollow" z-index="999">
            <view class="follow-pop-container">
                <view class="follow-pop" style="background-image: url(https://xssj.letterbook.cn/applet/images/follow-bg.png)">
                    <image :src="markerInfo.logoPic" style="width: 128rpx; height: 128rpx; border-radius: 50%"></image>
                    <view class="follow-name">{{ markerInfo.nickName }}</view>
                    <view class="follow-brief">{{ markerInfo.brief }}</view>
                    <view class="follow-btn" @tap="addDelConcerns">关注一下呗</view>
                    <view class="follow-solid"></view>
                    <image @tap="closeFollow" src="/static/pages/img/close-s.png" style="width: 60rpx; height: 60rpx"></image>
                </view>
            </view>
        </van-overlay>

        <!-- 下单 -->
        <van-popup :show="show" round closeable position="bottom" @close="onClose1" :close-on-click-overlay="false">
            <view class="good-info">
                <view class="good-des">
                    <view class="good-img">
                        <image class="img" :src="goodsData.imageUrl ? goodsData.imageUrl : goodsData.thumbnail"></image>
                    </view>
                    <view class="good-des-inner">
                        <view class="good-price-area">
                            <text class="good-price">
                                ￥{{ goodsData.activityType == 1 || (goodsData.activityType == 2 && goodsData.isMember) ? goodsData.lowPrice : goodsData.originalPrice }}
                            </text>
                            <text v-if="goodsData.activityType == 2 && goodsData.isMember" style="color: #ff5340; font-size: 24rpx; margin-left: 20rpx">
                                {{
                                    userInfo.memberLeve.discount == 10
                                        ? '普通会员无优惠'
                                        : userInfo.memberLeve.name + '已优惠￥' + (goodsData.originalPrice * 1000 - goodsData.lowPrice * 1000) / 1000
                                }}
                            </text>
                        </view>
                        <view class="good-inventory">
                            库存：
                            <text class="inventory">{{ goodsData.stock == -1 ? '有货' : goodsData.stock == 0 ? '暂无库存' : goodsData.stock }}</text>
                        </view>
                        <view class="good-select-specifications">
                            <text>{{ goodsData.itemText ? goodsData.itemText : '请选择规格' }}</text>
                        </view>
                    </view>
                </view>
                <view class="good-edit">
                    <view class="good-specifications">
                        <view>
                            <text>规格</text>
                        </view>
                        <scroll-view :scroll-y="true" style="max-height: 360rpx">
                            <view class="list-black">
                                <view
                                    :class="'list-item ' + (skuitem.active ? 'active' : '')"
                                    :data-index="index"
                                    @tap.stop.prevent="handleSelectSku"
                                    v-for="(skuitem, index) in skuList"
                                    :key="skuitem.id"
                                >
                                    <image class="list-item-img" :src="skuitem.imageUrl ? skuitem.imageUrl : skuitem.thumbnail"></image>

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
                    <view class="btn-area-inner">
                        <button class="btn add-cart-btn" @tap.stop.prevent="handlePopupAddCart">加入购物车</button>
                    </view>
                    <view class="btn-area-inner">
                        <button class="btn buy-btn" @tap.stop.prevent="surexf">立即购买</button>
                    </view>
                </view>
            </view>
        </van-popup>
        <navigator v-if="buton" url="/pages/shopHome/home/home" class="butt">授权登录</navigator>

        <!-- Tabbar栏 -->
        <view class="custom-tab-bar" :style="'padding-bottom:' + (isAdapter ? '38rpx' : '0rpx')">
            <view class="custom-tab-bar-item" v-if="item.isHave" @tap="changeTab" :data-text="item.text" v-for="(item, index) in tabList" :key="index">
                <image
                    style="width: 56rpx; height: 56rpx; box-shadow: 0rpx 6rpx 12rpx rgba(247, 247, 247, 0.16)"
                    :src="nowTabbarText == item.text ? item.imgActive : item.img"
                ></image>

                <text :class="nowTabbarText == item.text ? 'custom-tab-bar-text custom-tab-bar-text-active' : 'custom-tab-bar-text'">{{ item.text }}</text>
            </view>
        </view>

        <!-- 活动 -->
        <view class="activity-container" v-if="nowTabbarText == '活动'">
            <!-- 喊价 -->
            <view class="activity-container-type" v-if="auctionList.length">
                <view class="activity-container-top">
                    <text>喊价商品进行中</text>
                    <navigator class="activity-container-top-right" :url="'/pages/activity/pmhd/list/list?merchantId=' + marchantId">查看更多>></navigator>
                </view>
                <view class="activity-container-goods-box">
                    <block v-for="(item, index) in auctionList" :key="index">
                        <navigator :url="'/pages/activity/pmhd/details/details?auctionId=' + item.auctionId" class="activity-container-item">
                            <image :src="item.logoImg" mode="aspectFill" style="width: 100%; height: 320rpx; position: relative">
                                <!-- 预约人数 -->
                                <view class="subscribe-box" v-if="item.status == 1">预约人数:{{ item.reserveNumber || 0 }}</view>
                                <!-- 起步价 -->
                                <view class="subscribe-box" v-if="item.status == 2" style="background: linear-gradient(180deg, #fa5151 0%, #ff0000 100%)">
                                    起歩价:{{ item.xsAuctionItem.startingPrice || 0 }}
                                </view>
                            </image>
                            <view class="activity-container-item-content">
                                <!-- 开喊时间 -->
                                <view class="paimai-time" @finish="getAuctionList" v-if="item.status == 1" style="background: #07c160">
                                    <van-count-down :time="item.startTime" format="开喊时间: DD天HH:mm:ss"></van-count-down>
                                </view>
                                <!-- 距喊品结束 -->
                                <view class="paimai-time" @finish="getAuctionList" v-if="item.status == 2">
                                    <van-count-down :time="item.endTime1" format="距离喊价结束:DD天HH:mm:ss"></van-count-down>
                                </view>
                                <!-- 已结束 -->
                                <view class="paimai-time" v-if="item.status == 3" style="background: #999">已结束 {{ item.endTime }}</view>
                                <view class="activity-container-item-name">{{ item.xsAuctionItem.auctionItemName }}</view>
                                <view class="activity-container-item-explain">{{ item.xsAuctionItem.description }}</view>
                                <view class="activity-container-bottom">
                                    <view class="activity-container-price">
                                        <text style="font-size: 24rpx">{{ item.auctionPrice ? (item.status == 3 ? '成交价' : '当前价') : '起步价' }}：￥</text>
                                        {{ item.auctionPrice || item.xsAuctionItem.startingPrice || 0 }}
                                    </view>
                                    <view v-if="item.status == 3" class="activity-container-btn" style="background: #999999">已结束</view>
                                    <view v-else class="activity-container-btn">参与</view>
                                </view>
                            </view>
                        </navigator>
                    </block>
                </view>
            </view>

            <!-- 促销 -->
            <view class="activity-container-type" v-if="saleGoodsList.length">
                <view class="activity-container-top">
                    <text>促销商品进行中</text>
                    <navigator class="activity-container-top-right" :url="'/pages/Index/saleList/saleList?marchantId=' + marchantId + '&orderType=' + orderType">
                        查看更多>>
                    </navigator>
                </view>
                <view class="sale-container-goods-box">
                    <navigator
                        class="sale-container-item"
                        :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&sid=' + item.tempSpecId"
                        v-for="(item, index) in saleGoodsList"
                        :key="index"
                    >
                        <image :src="item.thumbnail" mode="aspectFill" style="width: 200rpx; height: 200rpx; border-radius: 20rpx"></image>

                        <view class="sale-container-item-content">
                            <view class="sale-container-top">
                                <view class="sale-container-item-name">{{ item.commodityName }}</view>
                                <view class="sale-container-item-explain">{{ item.description }}</view>
                            </view>
                            <view class="sale-container-bottom">
                                <view class="sale-container-price">
                                    <text style="font-size: 24rpx">￥</text>
                                    {{ item.activityType == 1 ? item.lowPrice : item.originalPrice }}
                                </view>
                                <view class="sale-container-btn" @tap.stop.prevent="goBuy" :data-item="item">购买</view>
                            </view>
                        </view>
                    </navigator>
                </view>
            </view>
            <no-data v-if="!saleGoodsList.length && !auctionList.length" text="暂无活动" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img1.png"></no-data>
        </view>

        <!-- 订阅通知 -->
        <view class="dynamic-shop" v-if="!(nowTabbarText != '订阅通知' || userInfo.community == 0)">
            <!-- 推荐酒店 -->
            <dynamic-list
                :marchantId="marchantId"
                :hotelList="hotelList"
                :commentList="commentList"
                :storeDynamicList="storeDynamicList"
                :markerInfo="markerInfo"
                :status="status"
                @showDingYue="showDingYue"
                v-if="userInfo.community != 3"
            ></dynamic-list>
            <!-- <image bindtap="toWrite" src="/pages/img/index/write-comment.png" class="right-bottom" hidden="{{userInfo.community==3}}"></image> -->
            <!-- 小店排行 -->
            <view class="shop-list-top-box" v-if="!(userInfo.community == 2 || storeList.length == 0)">
                <image class="shoop-list-top-img" src="https://xssj.letterbook.cn/applet/images/store-list-img.png"></image>
            </view>
            <view class="shop-list" v-if="userInfo.community != 2">
                <!-- 通知栏 -->
                <view class="notice-bar-container" v-if="noticeContent.length">
                    <image src="/static/pages/img/index/notice_bar.png" style="width: 36rpx; height: 36rpx"></image>
                    <text class="notice-title-text">公告:</text>
                    <van-notice-bar style="flex: 1; height: 56rpx" color="#ff0000" background="#fff" :text="noticeContent"></van-notice-bar>
                </view>
                <view class="shop-item-box" v-if="userInfo.community != 2" v-for="(item, index) in storeList" :key="index">
                    <navigator class="shop-item" :url="'/pages/smallShop/myShop/myShop?storeId=' + item.storeId">
                        <view class="shop-item-left">
                            <image class="shop-item-left-logo" :src="item.headImgUrl" mode="aspectFill"></image>
                            <view class="shop-item-left-content">
                                <view>{{ item.nickName }}的小店</view>
                            </view>
                        </view>
                        <view class="shop-item-right">
                            <image src="/static/pages/img/index/huoyue.png" style="margin-bottom: 20rpx"></image>
                            <!-- {{item.praise}} -->
                            活跃中
                        </view>
                    </navigator>
                </view>
            </view>
        </view>

        <!-- 我的 -->
        <my
            :userInfo="userInfo"
            :orderNum="orderNum"
            :cityOrderNum="cityOrderNum"
            :toStoreOrderNum="toStoreOrderNum"
            :noticeNum="noticeNum"
            :headList="headList"
            :toolOrderList="toolOrderList"
            :marchantId="marchantId"
            @pagesTo="pagesTo"
            @toDetail="toDetail"
            :isDistribution="markerInfo.isDistribution"
            :isWuliu="isWuliu"
            :isToCity="isToCity"
            :isToStore="isToStore"
            v-if="nowTabbarText == '我的'"
        ></my>

        <!-- 购物车 -->
        <view class="cart-main" v-if="nowTabbarText == '购物车'">
            <!-- 编辑 -->
            <view class="edit-area">
                <view class="edit-inner">
                    <view class="select-all-area">
                        <text class="click-area" @tap="selectAll">
                            <text :class="'icon-text iconfont ' + (isAll ? 'icon-select1 red-style' : 'icon-selectnor')"></text>
                            <text>全选</text>
                        </text>
                    </view>
                    <view class="delet-area">
                        <text class="click-area" @tap="deleteFun">
                            <text class="icon-text iconfont icon-delete"></text>
                            <text>删除</text>
                        </text>
                    </view>
                </view>
            </view>
            <!-- 没有添加商品 -->
            <no-data text="您还没有添加商品哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img3.png" v-if="!shopCartlist.length"></no-data>
            <view v-else class="scroll-area">
                <view class="list-area">
                    <view class="item-area" v-for="(item, index) in shopCartlist" :key="item.marchantId">
                        <view class="item-header" @tap="toStore" :data-marchantId="item.marchantId">
                            <text class="item-header-select-area" :data-pid="index" @tap.stop.prevent="handleGoodsSelect">
                                <text :class="'item-header-select iconfont ' + (item.isSelect ? 'icon-select1 red-style' : 'icon-selectnor')"></text>
                            </text>
                            <image class="item-header-img" :src="item.logoPic"></image>
                            <text>{{ item.nickName }}</text>
                        </view>

                        <view class="item-goods">
                            <view
                                class="item-good"
                                @tap="toGoodsdetail"
                                :data-commodityId="goodItem.commodityId"
                                v-for="(goodItem, goodIndex) in item.commoditys"
                                :key="goodItem.commodityId"
                            >
                                <view class="item-good-l">
                                    <text class="select-area" :data-pid="index" :data-cid="goodIndex" @tap.stop.prevent="handleGoodItemSelect">
                                        <text :class="'icon-text iconfont ' + (goodItem.isPitch ? 'icon-select1 red-style' : 'icon-selectnor')"></text>
                                    </text>
                                </view>

                                <view class="item-good-c">
                                    <image class="good-img" :src="goodItem.imageUrl ? goodItem.imageUrl : goodItem.thumbnail"></image>
                                </view>

                                <view class="item-good-r">
                                    <view class="good-title">
                                        <text>{{ goodItem.commodityName }}</text>
                                    </view>
                                    <view class="good-model">
                                        <text>规格：{{ goodItem.itemText }}</text>
                                    </view>
                                    <view class="number-price">
                                        <view class="price">
                                            ￥{{ goodItem.activityType == 1 || (goodItem.activityType == 2 && goodItem.isMember) ? goodItem.lowPrice : goodItem.originalPrice }}
                                        </view>
                                        <view class="edit-num">
                                            <!-- 减一 -->
                                            <text class="edit-subtract" :data-pi="index" :data-ci="goodIndex" data-type="minus" @tap.stop.prevent="handleEditNum">
                                                <text class="iconfont icon-minuscircle"></text>
                                            </text>
                                            <text class="num" :data-pi="index" :data-ci="goodIndex" data-type="edit" @tap.stop.prevent="handleEditNum">{{ goodItem.amount }}</text>
                                            <!-- 加一 -->
                                            <text class="edit-add" :data-pi="index" :data-ci="goodIndex" data-type="add" @tap.stop.prevent="handleEditNum">
                                                <text class="iconfont icon-add"></text>
                                            </text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>

                        <view class="item-footer">
                            <view class="item-footer-l">
                                <text>合计：</text>
                                <text>￥{{ item.subtotal }}</text>
                            </view>
                            <view class="item-footer-r">
                                <van-button round class="settlement-btn" :data-pi="index" @tap.native="handleGoSettlement($event, { pi: index })">去结算</van-button>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <van-dialog use-slot title="请输入您的内容" :show="show1" show-cancel-button @close="onClose" @confirm="confirm">
                <view class="num-input">
                    <input type="number" :value="value" maxlength="3" title="" @input="handleInput" @blur="validate" />
                </view>
            </van-dialog>
            <van-toast id="van-toast" />
            <van-dialog id="van-dialog" />
        </view>
        <!-- 完成任务后弹框 -->
        <taskPop :showTaskPop="showTaskPop" :text="taskText" :marchantId="marchantId" style="position: fixed; top: 0; left: 0; right: 0; z-index: 9999"></taskPop>

        <!-- 新品 热卖视频 -->
        <view v-if="nowTabbarText == '热卖'" :class="isAdapter ? 'news-container news-container-sp' : 'news-container'">
            <video-list v-if="hotSaleGoodsList.length" :videoList="hotSaleGoodsList"></video-list>
            <no-data text="您还没有热卖视频哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img8.png" v-else></no-data>
        </view>

        <!-- 会员 -->
        <view style="background: #fff; min-height: 100vh" v-if="nowTabbarText == '会员'">
            <!-- 浮窗 -->
            <view class="right-bottom-btn-container" v-if="userInfo.status == 1 || isIntegral">
                <image class="right-bottom-btn-img" @tap="toMember" v-if="userInfo.status == 1" src="/static/pages/img/index/right_bottom_icon1.png"></image>
            </view>
            <view v-if="!memberGoodsList.length" class="no-dynamic">
                <image class="no-dynamic-img" src="https://xssj.letterbook.cn/applet/images/sj_no_data_img0.png"></image>
                <view class="no-dynamic-text">暂无会员商品</view>
            </view>

            <view class="member-goods-list" v-else>
                <view class="me-fx-row goods-item-box" v-for="(item, index) in memberGoodsList" :key="index">
                    <image class="goods-img" :src="item.thumbnail"></image>

                    <view class="me-fx-col me-fx-sb goods-info">
                        <view class="goods-item-top">
                            <view class="me-fx-row me-fx-start-c">
                                <image src="" class="logo-img"></image>
                                <view class="goods-name">{{ item.commodityName }}</view>
                            </view>
                            <view class="introduce">{{ item.description }}</view>
                        </view>
                        <view class="me-fx-row me-fx-sb-c goods-item-price">
                            <view class="price-str">
                                ￥
                                <text class="price-num">{{ item.lowPrice }}</text>
                            </view>
                            <image src="/static/pages/Index/static/cart.png" class="item-cart"></image>
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

        <!-- 推荐 -->
        <recommend v-if="nowTabbarText == '商品推荐'" @recommendEvent="parseRecommendEvent"></recommend>
    </view>
</template>

<script>
import menu from './components/navs-bong/navs-bong';
// import vanSticky from './@vant/weapp/sticky/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanTabbar from './@vant/weapp/tabbar/index';
// import vanTabbarItem from './@vant/weapp/tabbar-item/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// import vanNoticeBar from './@vant/weapp/notice-bar/index';
import taskPop from '@/pages/Index/integral/components/integralTask/integralTask';
import mpVideoSwiper from '../../miniprogram_npm/video-swiper/miniprogram_dist/index';
import category1 from './components/category1/index';
import category2 from './components/category2/index';
import category3 from './components/category3/index';
import category4 from './components/category4/index';
import category5 from './components/category5/index';
import category6 from './components/category6/index';
import category7 from './components/category7/index';
import my from './components/my/index';
import videoList from './components/videoList/index';
import dynamicList from './components/dynamic/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
import noData from '@/pages/Component/noData/index';
import storeClose from '@/pages/Component/storeClose/index';
import hotel from '@/pages/Index/components/hotel/index';
import retail from '@/pages/Index/components/retail/index';
import recommend from './components/recommend/recommend';
// pages/Index/Index.js
// import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const time = require('../../utils/util');

const app = getApp();

const formate = require('../../utils/util');

export default {
    components: {
        menu,
        // vanSticky,
        // vanPopup,
        // vanTabbar,
        // vanTabbarItem,
        // vanOverlay,
        // vanNoticeBar,
        taskPop,
        mpVideoSwiper,
        category1,
        category2,
        category3,
        category4,
        category5,
        category6,
        category7,
        my,
        videoList,
        dynamicList,
        // vanCountDown,
        noData,
        storeClose,
        hotel,
        retail,
        recommend
    },
    data() {
        return {
            isAdapter: false,
            isClose: false,

            // 是否关店
            isWuliu: false,

            // 开启物流
            isToStore: false,

            // 开启到店
            isToCity: false,

            // 开启同城
            status: 1,

            status1: 1,

            navs: [
                {
                    name: '购物车',
                    src: '/img/my/menu-gwc.png',
                    url: './ShopCart/ShopCart',
                    inAnimation: 'menu-in-animation1',
                    outAnimation: 'menu-out-animation1',
                    bottom: '280rpx',
                    right: '80rpx'
                },
                {
                    name: '我的',
                    src: '/img/my/menu-wd.png',
                    url: '/pages/tabPage/me/me',
                    bottom: '150rpx',
                    right: '160rpx',
                    inAnimation: 'menu-in-animation2',
                    outAnimation: 'menu-out-animation2'
                },
                {
                    name: '返回',
                    src: '/img/my/menu-fh.png',
                    url: 'top',
                    bottom: '20rpx',
                    right: '80rpx',
                    inAnimation: 'menu-in-animation3',
                    outAnimation: 'menu-out-animation3'
                }
            ],

            uniqueId: '',

            // 用户标识
            noticeContent: '',

            buton: true,
            showFollow: false,

            // 关注弹框
            toolList: [],

            marchantId: -1,
            noticeNum: 0,
            orderType: 0,
            markerInfo: [],

            //商家信息
            goodsList: [],

            //商品
            personnel: '',

            //关注
            shopList: [],

            //零售店铺
            hotelList: [],

            // 酒店店铺
            ltSix: [],

            lgFive: [],
            activeEnter: false,
            showTaskPop: false,

            // 任务弹框
            taskText: '你已完成发布动态任务获取3积分',

            // 任务文字
            shopIndex: 0,

            isFixed: false,

            // 是否吸顶
            isPromotion: false,

            isPromotionIcon: false,
            isDiscount: false,
            saleCanList: [],
            saleState: '已领取',
            show: false,

            //下单弹框
            skuList: [],

            //规格列表
            skuActive: null,

            //当前规格
            goodsData: {
                imageUrl: false,
                thumbnail: '',
                activityType: 0,
                isMember: '',
                lowPrice: '',
                originalPrice: '',
                stock: '',
                itemText: false
            },

            //当前商品数据
            buyNum: 1,

            //购买数量
            index: 0,

            //方式索引
            // tabbar
            nowTabbarText: '首页',

            tabList: [],

            tabList1: [
                {
                    img: '/static/image/index/index1.png',
                    imgActive: '/static/image/index/index1_active.png',
                    text: '首页',
                    isHave: true
                },
                {
                    img: '/static/image/index/index7.png',
                    imgActive: '/static/image/index/index7_active.png',
                    text: '热卖',
                    isHave: true
                },
                {
                    // img:'/image/index/index2.png',
                    // imgActive:'/image/index/index2_active.png',
                    // text:'活动',
                    // isHave:true
                    img: '/static/image/index/index1.png',
                    imgActive: '/static/image/index/index1_active.png',
                    text: '商品推荐',
                    isHave: true
                },
                {
                    img: '/static/image/index/index6.png',
                    imgActive: '/static/image/index/index6_active.png',
                    text: '会员',
                    isHave: true
                },
                {
                    img: '/static/image/index/index5.png',
                    imgActive: '/static/image/index/index5_active.png',
                    text: '购物车',
                    isHave: true
                },
                {
                    img: '/static/image/index/index3.png',
                    imgActive: '/static/image/index/index3_active.png',
                    text: '订阅通知',
                    isHave: true
                },
                {
                    img: '/static/image/index/index4.png',
                    imgActive: '/static/image/index/index4_active.png',
                    text: '我的',
                    isHave: true
                }
            ],

            // 促销
            saleGoodsList: [],

            auctionList: [],

            // 会员
            memberGoodsList: [],

            // 订阅通知
            weekList: ['星期日', '已签到', '未签到', '签到', '星期四', '星期五', '星期六'],

            commentList: [],

            // 评论列表
            storeDynamicList: [],

            // 商家动态列表
            storeList: [],

            // 小店排行列表
            // 我的
            headList: [
                // {
                //   num: 0,
                //   unit: '元',
                //   name: '余额',
                // },
                // {
                //   num: 0,
                //   unit: '张',
                //   name: '会员卡',
                // },
                {
                    num: 0,
                    unit: '分',
                    name: '积分'
                },
                {
                    num: 0,
                    unit: '张',
                    name: '优惠券'
                }
            ],

            toolOrderList: [
                {
                    icon: '/static/pages/img/my/kefu.png',
                    name: '客服',
                    url: '/pages/order/contact/contact'
                },
                {
                    icon: '/static/pages/img/my/shop-cart.png',
                    name: '购物车',
                    url: '/pages/Index/ShopCart/ShopCart'
                },
                {
                    icon: '/static/pages/img/my/wodedontai.png',
                    name: '评论',
                    url: '/pages/Index/dynamic/commentList/commentList'
                },
                {
                    icon: '/static/pages/img/my/notice.png',
                    name: '我的优惠券',
                    url: '/pages/Index/couponList/couponList'
                },
                {
                    icon: '/static/pages/img/my/paimai_icon.png',
                    name: '喊价',
                    url: `/pages/activity/pmhd/pmEnter/pmEnter`
                },
                {
                    icon: '/static/pages/img/my/store_apply.png',
                    name: '小店申请'
                }
            ],

            isIntegral: 0,

            // 是否进入订阅通知
            userInfo: {
                memberLeve: {
                    discount: 0,
                    name: ''
                },

                community: 0,
                status: 0
            },

            // 用户信息
            orderNum: [],

            // 订单数字
            cityOrderNum: [],

            // 同城配送订单数字
            toStoreOrderNum: [],

            // 到店订单数字
            // 购物车
            openOverlay: false,

            editObj: {
                pi: '',
                ci: '',
                value: ''
            },

            show1: false,
            value: '',
            num: '',
            isAll: false,
            shopCartlist: [],
            listItem: '',

            // 热卖
            videoList: [],

            hotSaleGoodsList: [],

            // 热卖商品列表
            nowSaleGoods: {},

            // 当前热卖商品
            countDown: '',

            //积分活动倒计时
            timeData: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },

            overTime: false,

            // 倒计时结束
            //活动列表
            activityList: [{}, {}, {}, {}, {}],

            activeStatuList: '',
            scene: '',
            cartNum: '',
            close: false,

            sitem: {
                httpAddress: ''
            },

            skuitem: {
                active: false,
                id: '',
                imageUrl: false,
                thumbnail: '',
                itemText: ''
            },

            goodItem: {
                commodityId: '',
                isPitch: false,
                imageUrl: false,
                thumbnail: '',
                commodityName: '',
                itemText: '',
                activityType: 0,
                isMember: '',
                lowPrice: '',
                originalPrice: '',
                amount: ''
            },

            goodIndex: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 是否是iso
        app.globalData.options = options;

        if (options.scene) {
            const scene = decodeURIComponent(options.scene);
            await this.getCodeParams(scene);
        } else {
            if (options.personnel) {
                this.setData({
                    personnel: options.personnel
                });
            }

            if (options.uniqueId) {
                this.setData({
                    uniqueId: options.uniqueId
                });
            }

            this.setData(
                {
                    marchantId: options.marchantId || -1
                },
                () => {
                    if (options.nowTabbarText) {
                        this.setData({
                            nowTabbarText: '热卖'
                        });
                        this.getVideoList();
                    }
                }
            );
        }

        this.setData({
            activeStatuList: app.globalData.activeStatuList,
            isAdapter: app.globalData.isAdapter
        });
        var that = this; //查看是否授权

        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    // 已授权
                    if (uni.getStorageSync('token')) {
                        that.setData({
                            buton: false
                        });
                    }

                    that.getUserInfo(); //that.getSeckill()//获得活动数据

                    that.showMarkerInfo(); //商家信息

                    if (that.uniqueId) {
                        that.getShareState();
                    }

                    that.queryRecommendList(); //商品热卖

                    that.getCategoryGoods(); //获得分类商品
                    // that.getCartNum()//获得购物车数字
                    // that.shopRecommendList()//店铺推荐

                    that.isShowSale(); //促销弹框
                    // that.getUserIntegral()
                } else {
                    //用户没有授权
                    that.setData({
                        buton: true
                    });
                    uni.navigateTo({
                        url: '/pages/shopHome/home/home'
                    });
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.onShowClone3389();
    },
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
    onPullDownRefresh: function () {
        this.getUserInfo();
        this.getCartNum(); //获得购物车数字
        //this.getSeckill()//获得活动数据

        this.showMarkerInfo(); //商家信息

        if (this.uniqueId) {
            this.getShareState();
        }

        this.queryRecommendList(); //商品热卖

        this.getCategoryGoods(); //获得分类商品
        // this.shopRecommendList()//店铺推荐

        this.isShowSale(); //优惠弹框
        // this.getUserIntegral()

        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 2000);
    },
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
            path: '/pages/shopHome/home/home?marchantId=' + this.marchantId + '&uniqueId=' + uniqueId,
            imageUrl: this.markerInfo.homeImg[0]
        };
    },
    methods: {
        /**
         * 生命周期函数--监听页面显示
         */
        onShowClone3389: function () {
            uni.hideHomeButton(); //隐藏返回首页按钮

            if (this.marchantId != -1) {
                this.getCartNum();
                this.getOrderNum();
                this.getUserIntegral();
                this.geteCountDown(); //获得积分任务列表
            }
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
                        marchantId: JSON.parse(res.data.data.scene).id
                    });
                    app.globalData.marchantId = JSON.parse(res.data.data.scene).id;

                    if (that.scene.pid) {
                        this.setData({
                            personnel: that.scene.pid
                        });
                    }

                    that.onShowClone3389({});
                }
            });
        },

        // 获取积分任务
        // getTaskList(){
        //   let data = {marchantId:this.data.marchantId}
        //   return app.sjrequest('/integral/queryMyTaskList',data).then(res=>{
        //     this.setData({
        //       taskList:res.data.data
        //     })
        //     this.geteCountDown()
        //   })
        // },
        // 获得积分倒计时
        geteCountDown() {
            let data = {
                marchantId: this.marchantId,
                type: 3
            };
            app.globalData.sjrequest('/integral/operateSignin', data).then((res) => {
                if (res.data.code == 200) {
                    let time1 = time.formatTimeSec(res.data.data.countDownTime || '');
                    time1 = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
                    this.setData({
                        countDown: time1
                    });
                }
            });
        },

        changeTime(e) {
            this.setData({
                timeData: e.detail
            });
        },

        // 倒计时结束
        overTimeFun() {
            this.setData({
                overTime: true
            });
        },

        // 完成任务
        toFinishTask(e) {
            let url = e.currentTarget.dataset.url;
            uni.navigateTo({
                url: url + '?marchantId=' + this.marchantId
            });
        },

        //获得购物车数量
        getCartNum() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/countTrolley', data).then((res) => {
                if (res.data.code == 200) {
                    var countTrolley = res.data.data.countTrolley;
                    this.setData({
                        cartNum: countTrolley
                    });
                }
            });
        },

        // 跳会员
        toMember() {
            uni.navigateTo({
                url: `/pages/member/card/card?marchantId=${this.marchantId}`
            });
        },

        // 跳会员
        toIntergral() {
            uni.navigateTo({
                url: `/pages/Index/integral/integral?marchantId=${this.marchantId}`
            });
        },

        /**图片预览 */
        imgClick(e) {
            var src = e.currentTarget.dataset.src;
            var imgList = e.currentTarget.dataset.list;
            var list = [];

            for (var index = 0; index < imgList.length; index++) {
                list[index] = imgList[index].httpAddress;
            }

            uni.previewImage({
                current: src,
                urls: list
            });
        },

        /**商家基本信息 */
        showMarkerInfo() {
            var data = {
                id: this.marchantId
            };
            app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then((res) => {
                if (res.data.code == 200) {
                    var result = res.data.data;
                    console.log('详情信息：', res);

                    if (result.businessModel) {
                        if (result.businessModel.indexOf('1') != -1) {
                            this.setData({
                                isWuliu: true
                            });
                        }

                        if (result.businessModel.indexOf('2') != -1) {
                            this.setData({
                                isToCity: true
                            });
                        }

                        if (result.businessModel.indexOf('3') != -1) {
                            this.setData({
                                isToStore: true
                            });
                        }
                    }

                    let orderType = result.businessModel.split(',').sort();
                    orderType = orderType[0];
                    this.setData({
                        orderType: orderType
                    }); // if(!result.isfans&&!this.data.buton){
                    //   this.setData({
                    //     showFollow:true
                    //   })
                    // }

                    if (result.thepointSins) {
                        result.thepointSins.forEach((item) => {
                            item.addTime = formate.formatDate(item.addTime);
                        });
                    }

                    var noticeTxt = '';

                    if (result.notify) {
                        result.notify.forEach((item) => {
                            noticeTxt = noticeTxt + item.content;
                        });
                    }

                    if (res.data.data.marchantCorrelationList.length) {
                        var list = [];
                        var hotelList = [];
                        res.data.data.marchantCorrelationList.forEach((item) => {
                            if (item.marchantCorrelation.source == 1) {
                                list.push(item);
                            }

                            if (item.marchantCorrelation.source == 2) {
                                hotelList.push(item);
                            }
                        });
                    } //result.shopTemplateId=7;测试赋值

                    this.setData({
                        tabList: this.tabList1,
                        markerInfo: result,
                        noticeContent: noticeTxt,
                        shopList: list,
                        hotelList: hotelList
                    });
                    uni.setNavigationBarTitle({
                        title: this.markerInfo.nickName
                    });
                } else if (res.data.code == 338) {
                    this.setData({
                        isClose: true
                    });
                }
            });
        },

        // 分享转发
        getShareState() {
            let data = {
                marchantId: this.marchantId,
                uniqueId: this.uniqueId,
                type: 4
            };
            app.globalData.sjrequest('/transiter/onTransmit', data).then((res) => {});
        },

        showDingYue() {
            // 获取用户信息
            var that = this;
            uni.requestSubscribeMessage({
                tmplIds: [app.globalData.sj_publish_article],
                success: function (res) {
                    uni.getSetting({
                        withSubscriptions: true,
                        success: (result) => {
                            if (result.subscriptionsSetting['jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'] == 'accept') {
                                that.setData({
                                    status: 2
                                });
                            }

                            if (res['jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'] == 'accept') {
                                let data = {
                                    status: that.status,
                                    marchantId: that.marchantId,
                                    templateIds: 'jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        let isDingYue = 'markerInfo.subscribe';
                                        that[markerInfo.subscribe] = 1;
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
        },

        async showDingYue1() {
            // 订阅
            var that = this;
            uni.requestSubscribeMessage({
                tmplIds: [app.globalData.sj_commodity_modify, app.globalData.sj_commodity_add],
                success: function (res) {
                    uni.getSetting({
                        withSubscriptions: true,
                        success: (result) => {
                            if (
                                result.subscriptionsSetting['5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc'] == 'accept' ||
                                result.subscriptionsSetting['7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'] == 'accept'
                            ) {
                                that.setData({
                                    status1: 2
                                });
                                console.log('总是订阅');
                            } else {
                                console.log('订阅1次');
                            }

                            if (res['5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc'] == 'accept' || res['7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'] == 'accept') {
                                let data = {
                                    status: that.status1,
                                    marchantId: that.marchantId,
                                    templateIds: '5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc,7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        let isDingYue = 'markerInfo.subscribe1';
                                        that[markerInfo.subscribe1] = 1;
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
                        }
                    });
                },

                fail() {
                    uni.showToast({
                        title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                        icon: 'none'
                    });
                }
            });
        },

        // 个人中心
        toMy() {
            uni.switchTab({
                url: '/pages/tabPage/me/me'
            });
        },

        /** 商品热卖 */
        queryRecommendList() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryRecommendList', data).then((res) => {
                if (res.data.code == 200) {
                    var result = res.data.data;
                    this.setData({
                        ltSix: result.slice(0, 5),
                        lgFive: result.slice(5)
                    });
                }
            });
        },

        /** 店铺推荐 */
        shopRecommendList() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/marchant/queryRecommendList', data).then((res) => {
                if (res.data.code == 200) {
                    var result = res.data.data;
                    this.setData({
                        shopList: result
                    });
                }
            });
        },

        scroll(e) {
            this.setData({
                shopIndex: Math.round((e.detail.scrollLeft / 529) * 2)
            });
        },

        /** 添加关注 */
        addDelConcerns() {
            var data = {
                marchantId: this.marchantId,
                type: 1
            };

            if (this.personnel != 0) {
                data.saleUniqueId = this.personnel;
            }

            app.globalData.sjrequest('/marchant/operateConcerns', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '关注成功！',
                        icon: 'success'
                    });
                    this.markerInfo.isfans = 1;
                    this.setData({
                        markerInfo: this.markerInfo,
                        showFollow: false
                    });
                }
            });
        },

        // 关闭关注弹框
        closeFollow() {
            this.setData({
                showFollow: false
            });
        },

        /** 获得分类商品 */
        getCategoryGoods() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryClassifyCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    // res.data.data.forEach(item => {
                    //   var dataList={'marchantId':this.data.marchantId,'classifyId':item.id,'pageCurr':1,'pageSize':5}
                    //   app.sjrequest('/commodity/queryCommodityList',dataList).then(result =>{
                    //     if(result.data.code==200){
                    //       item.list = result.data.data
                    //     }
                    this.setData({
                        goodsList: res.data.data
                    }); //   })
                    // });
                }
            });
        },

        /** 查看商品详情 */
        toGoodsDetails(e) {
            var id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id
            });
        },

        /** 加入购物车 */
        addCart(e) {
            var item = e.item || e.currentTarget.dataset.item;
            item.itemText = '';
            this.setData({
                goodsData: item,
                buyNum: 1,
                skuActive: null,
                show: true
            });
            this.getSku(item.commodityId); // var item = e.currentTarget.dataset.item
            // var data={
            //   'tempSpecId':item.tempSkuId,
            //   'commodityId':item.commodityId,
            //   'amount':1,
            //   'marchantId':this.data.marchantId,
            //   'operate':1
            // }
            // app.sjrequest('/commodity/addTrolley',data).then(res =>{
            //   if(res.data.code==200){
            //     this.getCartNum()
            //     wx.showToast({
            //       title:'添加成功',
            //       icon:'success'
            //     })
            //   }
            // })
        },

        // 获得商品规格
        getSku(commodityId) {
            var that = this;
            var data = {
                commodityId: commodityId,
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryCommoSku', data).then((res) => {
                if (res.data.code == 200) {
                    that.setData({
                        skuList: res.data.data,
                        goodsData: res.data.data[0]
                    });
                    res.data.data.forEach((item, index) => {
                        let skuItem = 'skuList[' + index + '].active';

                        if (item.isDefault == 1) {
                            that.skuList[index].active = true;
                            that.setData({
                                goodsData: item
                            });
                        } else {
                            that.skuList[index].active = false;
                        }
                    });
                }
            });
        },

        //关闭商品弹框
        onClose1() {
            this.setData({
                show: false
            });
        },

        // 切换 sku
        handleSelectSku(e) {
            if (this.skuActive === e.currentTarget.dataset.index) {
                return;
            } else {
                this.setData({
                    skuActive: e.currentTarget.dataset.index
                });
                this.skuList.forEach((el, i) => {
                    let skuItem = 'skuList[' + i + '].active';
                    this.skuList[i].active = false;
                });
                let skuItem = 'skuList[' + this.skuActive + '].active';
                this.skuList[this.skuActive].active = true;
                this.setData({
                    goodsData: this.skuList[this.skuActive]
                });
            }
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

        // 加入购物车
        handlePopupAddCart() {
            var data = {
                tempSpecId: this.goodsData.id,
                commodityId: this.goodsData.commodityId,
                amount: this.buyNum,
                marchantId: this.marchantId,
                operate: 1
            };
            app.globalData.sjrequest('/commodity/addTrolley', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success'
                    });
                    this.getCartNum();
                }
            });
        },

        //确认下单
        surexf() {
            if (this.goodsData.stock == 0) {
                uni.showToast({
                    title: '暂无库存',
                    icon: 'none'
                });
                return;
            }

            console.log(this.orderType);
            let jsonData = {
                marchantId: this.marchantId,
                orderType: this.orderType,
                commoditys: [
                    {
                        commodityId: this.goodsData.commodityId,
                        tempSpecId: this.goodsData.id,
                        amount: this.buyNum
                    }
                ]
            }; // 使用社交token

            const token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/order/onekeyAboutOrder', jsonData, token).then((res) => {
                if (res.data.code === 200) {
                    // 更新 store 数据
                    app.globalData.store.setState({
                        submitObj: JSON.stringify(res.data.data)
                    });
                    uni.navigateTo({
                        url: '/pages/order/submitOrder/submitOrder'
                    });
                }
            }); // }
        },

        /** 获取秒杀数据 */
        getSeckill() {
            const data = {
                merchantId: this.marchantId
            };
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest1('/activity/findActivityState', data, token).then((res) => {
                if (res.data.code == 200) {
                    var list = res.data.data;
                    list.forEach((item) => {
                        switch (item.state) {
                            case -1:
                                item.name = '未开放';
                                break;

                            case 0:
                                item.name = '未发布';
                                break;

                            case 1:
                                item.name = '未开始';
                                break;

                            case 2:
                                item.name = '进行中';
                                break;

                            case 3:
                                item.name = '已结束';
                                break;
                        }
                    });
                    this.setData({
                        toolList: res.data.data
                    });
                }
            });
        },

        /** 去秒杀 */
        toSeckill(e) {
            var index = e.currentTarget.dataset.index;

            if (this.toolList[index].state == 1 || this.toolList[index].state == 2) {
                uni.navigateTo({
                    url: this.toolList[index].url + '?marchantId=' + this.marchantId
                });
            } else {
                uni.showToast({
                    title: '活动' + this.toolList[index].name,
                    icon: 'none'
                });
            }
        },

        //判断弹什么框
        isShowWhatBox() {
            const that = this;
            let activeStatuList = that.activeStatuList;
            let listIndex = -1; // 判断是否弹过促销框和优惠框

            let flag = 0; //0-都没弹过，1-都弹过，2-只弹过促销框，3-只弹过优惠框

            activeStatuList.forEach((item, index) => {
                if (item.marchantId == that.marchantId) {
                    if (item.isPromotion == true) {
                        if (item.isDiscount == true) {
                            flag = 1; //都弹过
                        } else {
                            flag = 2; //只弹过促销框

                            listIndex = index;
                        }

                        return;
                    }

                    if (item.isDiscount == true) {
                        if (item.isPromotion == true) {
                            flag = 1; //都弹过
                        } else {
                            flag = 3; //只弹过优惠框

                            listIndex = index;
                        }

                        return;
                    }
                }
            }); // flag：0-都没弹过，1-都弹过，2-只弹过促销框，3-只弹过优惠框

            if (flag == 0) {
                //都没弹过
                activeStatuList.push({
                    marchantId: that.marchantId,
                    isPromotion: true,
                    isDiscount: false,
                    discountNum: 0
                });
                that.setData({
                    // isPromotion: true
                    isPromotionIcon: true
                }); // 优惠判断

                that.isShowSale();
            } else if (flag == 1 || flag == 2) {
                //都弹过、弹过促销框
                that.setData({
                    isPromotionIcon: true
                }); // 优惠判断

                that.isShowSale();
            } else if (flag == 3) {
                //弹过优惠框
                activeStatuList[listIndex].isPromotion = true;
                that.setData({
                    isPromotion: true
                }); // 优惠判断

                that.isShowSale();
            }

            app.globalData.activeStatuList = this.activeStatuList;
        },

        /** 促销是否弹窗 */
        isShowPromotion() {
            const data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryPromotionList', data).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.length) {
                        this.isShowWhatBox(); //判断弹什么框
                    }
                }
            });
        },

        // 关闭促销弹窗
        promotionClose() {
            this.setData({
                isPromotion: false,
                isPromotionIcon: true
            });
            this.isShowSale();
        },

        // 进入促销列表
        promotionEnter() {
            this.setData({
                isPromotion: false,
                isPromotionIcon: true
            });
            uni.navigateTo({
                url: './promotionList/promotionList?marchantId=' + this.marchantId + '&marchantName=' + this.markerInfo.nickName
            });
        },

        // 进入游戏抽奖列表
        yxcjEnter() {
            uni.navigateTo({
                url: '/pages/activity/yxcj/activeList/activeList?marchantId=' + this.marchantId
            });
        },

        // 优惠是否弹框
        isShowSale() {
            let data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/coupons/queryCouponsGet', data).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.length) {
                        let saleCanList = [];
                        res.data.data.forEach((item) => {
                            if (item.isDraw == 0) {
                                saleCanList.push(item);
                                this.setData({
                                    isDiscount: true,
                                    saleState: '点击领券'
                                });
                            }

                            item.endTime = formate.formatDate(item.endTime);
                        });
                        this.setData({
                            saleCanList: saleCanList
                        });
                        app.globalData.activeStatuList = this.activeStatuList;
                    }
                }
            });
        },

        // 关闭优惠弹窗
        closeSale() {
            this.setData({
                isDiscount: false
            });
        },

        receiveSale() {
            var data = {
                couponsIds: []
            };
            this.saleCanList.forEach((item) => {
                if (item.isDraw == 0) {
                    data.couponsIds.push(item.id);
                }
            });
            data.couponsIds = data.couponsIds.toString();
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/coupons/getCoupons', data, token).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        isDiscount: false
                    });
                    uni.showToast({
                        title: '领取成功',
                        icon: 'none'
                    });
                }
            });
        },

        toMe() {
            uni.switchTab({
                url: '/pages/tabPage/me/me'
            });
        },

        // tabbar
        changeTab(e) {
            let text = e.currentTarget.dataset.text;
            this.setData({
                nowTabbarText: text
            });

            if (text == '首页') {
                uni.setNavigationBarTitle({
                    title: this.markerInfo.nickName
                });
            }

            if (text == '活动') {
                uni.setNavigationBarTitle({
                    title: '活动'
                });
                this.getCategoryGoodsList();
                this.getAuctionList();
            }

            if (text == '热卖') {
                uni.setNavigationBarTitle({
                    title: '热卖'
                });
                this.getVideoList();
            }

            if (text == '购物车') {
                uni.showLoading({
                    title: '加载中'
                });
                this.getCartData();
                uni.setNavigationBarTitle({
                    title: '购物车'
                });
            }

            if (text == '订阅通知') {
                uni.setNavigationBarTitle({
                    title: '订阅通知'
                });
            }

            if (text == '我的') {
                uni.setNavigationBarTitle({
                    title: '我的'
                });
            }

            if (text == '会员') {
                this.getMemberGoodsList();
                uni.setNavigationBarTitle({
                    title: '会员'
                });
            }

            if (text == '商品推荐') {
                this.getMemberGoodsList();
                uni.setNavigationBarTitle({
                    title: '商品推荐'
                });
            }
        },

        // 活动
        getCategoryGoodsList() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryPromotionList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        saleGoodsList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 获得拍卖列表
        getAuctionList() {
            const params = {
                pageNum: 1,
                pageSize: 4,
                merchantId: this.marchantId
            };
            app.globalData.request.auctionRequest('/auction/list', params).then((res) => {
                if (res.data.code == 200) {
                    const result = res.data.data;
                    result.forEach((item) => {
                        item.startTime = new Date(item.startTime.replace(/-/g, '/')).getTime() - new Date().getTime();
                        item.endTime1 = new Date(item.endTime.replace(/-/g, '/')).getTime() - new Date().getTime();
                    });
                    this.setData({
                        auctionList: result
                    });
                }
            });
        },

        // 会员
        getMemberGoodsList() {
            var data = {
                marchantId: this.marchantId
            };
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

        // 去下单
        goBuy(e) {
            var item = e.currentTarget.dataset.item;
            item.stock = '请选择规格';
            item.itemText = '请选择规格';
            this.setData({
                goodsData: item,
                buyNum: 1,
                skuActive: null,
                show: true
            });
            this.getSku(item.id);
        },

        // 订阅通知
        // 获取订阅通知列表
        getCommunityList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 10,
                stick: 1,
                isMarchant: 0
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatTime(item.addTime);
                    });
                    this.setData({
                        commentList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 获取商家动态
        getStoreDynamicList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 10,
                isMarchant: 1,
                stick: 1
            };
            return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.forEach((item) => {
                        item.addTime = time.formatDateTime(item.addTime);
                    });
                    this.setData({
                        storeDynamicList: res.data.data
                    });
                }
            });
        },

        //  小店排行列表
        getStoreList() {
            let data = {
                marchantId: this.marchantId,
                pageCurr: 1,
                pageSize: 5
            };
            return app.globalData.sjrequest('/marchant/queryMarchantStoreList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        storeList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        toWrite() {
            uni.navigateTo({
                url: `/pages/Index/dynamic/postComment/postComment?marchantId=${this.marchantId}`
            });
        },

        // 点赞/取消
        operationPraise(e) {
            const { id, idx } = e.currentTarget.dataset;
            console.log(id, idx);
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

        // 更多评论
        toMore() {
            uni.navigateTo({
                url: `/pages/Index/dynamic/commentList/commentList?marchantId=${this.marchantId}&stick=1`
            });
        },

        //  我的
        pagesTo(e) {
            var idx = e.detail;

            switch (idx) {
                case 0:
                    uni.navigateTo({
                        url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}&marchantName=${this.markerInfo.nickName}&logoPic=${this.markerInfo.logoPic}`
                    });
                    break;

                case 2:
                    uni.navigateTo({
                        url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}` + `&stick=2`
                    });
                    break;

                case 5:
                    uni.navigateToMiniProgram({
                        appId: 'wxcad66233bce675b4',
                        path: `/pages/tabBar/home/home?marchant=${this.marchantId}`
                    });

                default:
                    uni.navigateTo({
                        url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}`
                    });
            }
        },

        // 跳会员
        toMember() {
            uni.navigateTo({
                url: `/pages/member/card/card?marchantId=${this.marchantId}`
            });
        },

        //  暂时跳优惠券
        toDetail(e) {
            let idx = e.detail;

            switch (idx) {
                case 0:
                    if (this.isIntegral) {
                        uni.navigateTo({
                            url: '/pages/Index/integral/integral?marchantId=' + this.marchantId
                        });
                    } else {
                        uni.showToast({
                            title: '商家未开放',
                            icon: 'none'
                        });
                    }

                    break;

                case 1:
                    uni.navigateTo({
                        url: '/pages/Index/couponList/couponList?marchantId=' + this.marchantId
                    });
                    break;

                default:
                    uni.showToast({
                        title: '敬请期待',
                        icon: 'none'
                    });
            }
        },

        // 获取用户信息
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
                    }

                    if (res.data.data.community == 0) {
                        // 未开启订阅通知
                        let tabs = 'tabList1[5].isHave';
                        this[tabList1[5].isHave] = false;
                    } else {
                        let tabs = 'tabList1[4].isHave';
                        this[tabList1[5].isHave] = false;
                    }

                    if (!res.data.data.statusv) {
                        // 热卖是否开启
                        let tabs = 'tabList1[1].isHave';
                        this[tabList1[5].isHave] = false;
                    }

                    if (!res.data.data.statusm) {
                        // 会员是否开启
                        let tabs = 'tabList1[3].isHave';
                        this[tabList1[5].isHave] = false;
                    }

                    var wxUserInfo = uni.getStorageSync('wx_userinfo_key') || {};
                    this.setData({
                        userInfo: { ...res.data.data, avatarUrl: wxUserInfo.userInfo.avatarUrl, nickName: wxUserInfo.userInfo.nickName }
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //  查询用户积分
        getUserIntegral() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/integral/queryInte', data).then((res) => {
                if (res.data.code == 200) {
                    let integral = 'headList[0].num';
                    this[headList[0].num] = res.data.data.isopen ? res.data.data.score : 0;
                    this.setData({
                        isIntegral: res.data.data.isopen
                    });
                }
            });
        },

        // 获取数字
        getOrderNum() {
            var data = {
                type: 2,
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/basic/queryCountAmount', data).then((res) => {
                var list = [res.data.data.citywideOrderState0, res.data.data.citywideOrderState1, res.data.data.citywideOrderState2, 0, res.data.data.citywideRefundState];
                var cityList = [res.data.data.sendState0, res.data.data.sendState1, res.data.data.sendState2];
                let couponNum = 'headList[1].num';
                var list1 = [res.data.data.fetchState0, res.data.data.fetchState1, 0];
                this[headList[1].num] = res.data.data.countUserCoupons;
                this.setData({
                    orderNum: list,
                    cityOrderNum: cityList,
                    toStoreOrderNum: list1,
                    noticeNum: res.data.data.sumCount
                });
            });
        },

        getCartData() {
            // 使用社交token
            const data =
                this.marchantId == -1
                    ? {}
                    : {
                          marchantId: this.marchantId
                      };
            return app.globalData.sjrequest('/commodity/queryTrolleyList', data).then((res) => {
                if (res.data.code === 200) {
                    uni.hideLoading();
                    this.setData({
                        shopCartlist: res.data.data
                    });
                    this.disposeData();
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        //确认消费方式
        surexf1() {
            let jsonData = {
                marchantId: this.listItem.marchantId,
                orderType: this.orderType,
                commoditys: []
            };
            this.listItem.commoditys.forEach((el) => {
                jsonData.commoditys.push({
                    commodityId: el.commodityId,
                    tempSpecId: el.tempSpecId,
                    amount: el.amount
                });
            });
            console.log(jsonData); // 使用社交token

            const token = uni.getStorageSync('token');
            uni.showLoading({
                title: '结算中'
            });
            app.globalData.sjrequest1('/order/onekeyAboutOrder', jsonData, token).then((res) => {
                uni.hideLoading();

                if (res.data.code === 200) {
                    // 更新 store 数据
                    app.globalData.store.setState({
                        submitObj: JSON.stringify(res.data.data)
                    });
                    uni.navigateTo({
                        url: '/pages/order/submitOrder/submitOrder'
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

        // 去结算
        handleGoSettlement(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var pi = e.currentTarget.dataset.pi;
            console.log('去结算', pi); // if (!this.data.list[pi].isSelect) {
            // Toast('未选中对于的商品!')
            // console.log(this.data.list[pi])
            // } else {

            var isSelect = false;
            this.shopCartlist[pi].commoditys.forEach((el) => {
                if (el.isPitch) {
                    isSelect = true;
                }
            });

            if (isSelect) {
                const arr = [];
                this.shopCartlist[pi].commoditys.forEach((el) => {
                    if (el.isPitch) {
                        arr.push(el);
                    }
                });
                const listItem = { ...this.shopCartlist[pi], commoditys: arr };
                console.log(listItem);
                this.setData({
                    openOverlay: true,
                    listItem: listItem
                });
                this.surexf1();
            } else {
                Toast('未选中对应的商品!');
            } // }
        },

        //跳转商品详情
        toGoodsdetail(e) {
            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.commodityid
            });
        },

        toStore(e) {
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + e.currentTarget.dataset.marchantid
            });
        },

        // 修改购物车信息
        changeCartInfo(storeIndex, goodsIndex) {
            let that = this;
            let params = this.shopCartlist[storeIndex].commoditys[goodsIndex];
            let data = {
                tempSpecId: params.tempSpecId,
                commodityId: params.commodityId,
                marchantId: params.marchantId,
                amount: params.amount,
                operate: 3
            };
            app.globalData.sjrequest('/commodity/addTrolley', data).then((res) => {
                if (res.data.code == 200) {
                    that.getCartData();
                }
            });
        },

        // 编辑 num
        handleEditNum(e) {
            console.log(e);
            let pi = e.currentTarget.dataset.pi;
            let ci = e.currentTarget.dataset.ci;
            let type = e.currentTarget.dataset.type;
            var goodItem = 'shopCartlist[' + pi + '].commoditys[' + ci + '].amount';

            if (type === 'add') {
                if (this.shopCartlist[pi].commoditys[ci].amount === this.shopCartlist[pi].commoditys[ci].inventory) {
                    Toast('该宝贝不能购买更多哦');
                } else {
                    this.shopCartlist[pi].commoditys[ci].amount = this.shopCartlist[pi].commoditys[ci].amount + 1;
                }
            } else if (type === 'minus') {
                // 减一
                if (this.shopCartlist[pi].commoditys[ci].amount === 1) {
                    this.shopCartlist[pi].commoditys[ci].amount = 1;
                } else {
                    this.shopCartlist[pi].commoditys[ci].amount = this.shopCartlist[pi].commoditys[ci].amount - 1;
                }
            } else {
                // 编辑
                this.setData({
                    'editObj.pi': pi,
                    'editObj.ci': ci,
                    value: this.shopCartlist[pi].commoditys[ci].amount,
                    show1: true
                });
            }

            this.changeCartInfo(pi, ci);
        },

        // 监听输入的值
        handleInput(e) {
            if (e.detail.value != '') {
                let value = this.validateNumber(e.detail.value);
                this.setData({
                    value: parseInt(value)
                });
            }
        },

        // 校验只能输入数字
        validateNumber(val) {
            return val.replace(/^(0+)|[^\d]+/g, '');
        },

        // 弹框确定事件
        confirm(e) {
            if (this.value > this.shopCartlist[this.editObj.pi].commoditys[this.editObj.ci].inventory) {
                Toast('该宝贝不能购买更多哦');
            } else {
                var goodItem = 'shopCartlist[' + this.editObj.pi + '].commoditys[' + this.editObj.ci + '].amount';
                this.shopCartlist[this.editObj.pi].commoditys[this.editObj.ci].amount = this.value;
                this.changeCartInfo(this.editObj.pi, this.editObj.ci);
            }
        },

        // 弹框取消
        onClose() {
            this.setData({
                close: false
            });
        },

        // 删除 购物车数据
        deleteFun() {
            const postIds = [];
            this.shopCartlist.forEach((el) => {
                el.commoditys.forEach((it) => {
                    if (it.isPitch) {
                        postIds.push(it.trolleyId);
                    }
                });
            });

            if (postIds.length) {
                Dialog.alert({
                    title: '提示',
                    message: '确认将宝贝删除',
                    showCancelButton: true,
                    cancelButtonText: '我再想想',
                    confirmButtonText: '删除'
                }).then(() => {
                    var postDatas = {
                        trolleyIds: postIds.join(',')
                    }; // 使用社交token

                    const token = uni.getStorageSync('token');
                    app.globalData.sjrequest('/commodity/deleteTrolley', postDatas, token).then((res) => {
                        if (res.data.code === 200) {
                            this.getCartData();
                        }
                    });
                });
            } else {
                uni.showToast({
                    title: '您还没择宝贝哦！',
                    icon: 'none'
                });
            }

            this.disposeData();
        },

        // 商品选中事件
        handleGoodItemSelect(e) {
            var pid = e.currentTarget.dataset.pid;
            var cid = e.currentTarget.dataset.cid;
            var isPitch;
            var trolleyId;
            trolleyId = this.shopCartlist[pid].commoditys[cid].trolleyId;

            if (this.shopCartlist[pid].commoditys[cid].isPitch == 0) {
                isPitch = 1;
            }

            if (this.shopCartlist[pid].commoditys[cid].isPitch == 1) {
                isPitch = 0;
            }

            let data = [
                {
                    trolleyId,
                    isPitch
                }
            ];
            app.globalData.sjrequest1('/commodity/operatorIsPitch', data).then((res) => {
                this.getCartData();
            });
            this.disposeData();
        },

        // 选中商家事件
        async handleGoodsSelect(e) {
            var pid = e.currentTarget.dataset.pid;
            var commoditys = this.shopCartlist[pid].commoditys;
            let data = [];

            if (this.shopCartlist[pid].isSelect) {
                commoditys.forEach((item) => {
                    data.push({
                        trolleyId: item.trolleyId,
                        isPitch: 0
                    });
                });
            } else {
                commoditys.forEach((item) => {
                    data.push({
                        trolleyId: item.trolleyId,
                        isPitch: 1
                    });
                });
            }

            app.globalData.sjrequest1('/commodity/operatorIsPitch', data).then((res) => {
                const token = uni.getStorageSync('token');
                let data =
                    this.marchantId == -1
                        ? {}
                        : {
                              marchantId: this.marchantId
                          };
                app.globalData.sjrequest('/commodity/queryTrolleyList', data, token).then((res) => {
                    if (res.data.code === 200) {
                        var listItem = 'shopCartlist[' + pid + '].isSelect';
                        this.shopCartlist[pid].isSelect = !this.shopCartlist[pid].isSelect;
                        this.setData({
                            shopCartlist: res.data.data
                        });
                        this.disposeData();
                    }
                });
            });
        },

        // 全选
        selectAll() {
            let arr = this.shopCartlist;
            let data = [];

            if (this.isAll) {
                arr.forEach((el, i) => {
                    el.list.forEach((it, ind) => {
                        var listItem = 'shopCartlist[' + i + '].isSelect';
                        data.push({
                            trolleyId: it.trolleyId,
                            isPitch: 0
                        });
                        this.shopCartlist[i].isSelect = true;
                    });
                });
            } else {
                arr.forEach((el, i) => {
                    el.commoditys.forEach((it, ind) => {
                        var listItem = 'shopCartlist[' + i + '].isSelect';
                        data.push({
                            trolleyId: it.trolleyId,
                            isPitch: 1
                        });
                        this.shopCartlist[i].isSelect = true;
                    });
                });
            }

            app.globalData.sjrequest1('/commodity/operatorIsPitch', data).then((res) => {
                const token = uni.getStorageSync('token');
                let data =
                    this.marchantId == -1
                        ? {}
                        : {
                              marchantId: this.marchantId
                          };
                app.globalData.sjrequest('/commodity/queryTrolleyList', data, token).then((res) => {
                    console.log(res);

                    if (res.data.code === 200) {
                        this.setData({
                            shopCartlist: res.data.data,
                            isAll: !this.isAll
                        });
                        this.disposeData();
                    }
                });
            });
        },

        // 处理数据
        disposeData() {
            const arr = this.shopCartlist;
            var allSelect = true;

            if (arr.length == 0) {
                allSelect = false;
            }

            arr.forEach((el, i) => {
                var listItem = 'shopCartlist[' + i + '].hj';
                var listItemSelect = 'shopCartlist[' + i + '].isSelect';
                var num = 0;
                var isSelet = true;
                el.commoditys.forEach((it, idx) => {
                    if (it.isPitch) {
                        num += it.originalPrice * it.amount * 100;
                    } else {
                        isSelet = false;
                        allSelect = false;
                    }
                });
                this.shopCartlist[i].isSelect = isSelet;
                this.shopCartlist[i].hj = num / 100;
            });
            this.setData({
                isAll: allSelect
            }); // if (allSelect) {
            //     this.setData({
            //         isAll: true
            //     })
            // } else {
            //     this.setData({
            //         isAll: false
            //     })
            // }
        },

        scrollParev(e) {
            var that = this;
            clearTimeout(this.queryTime);
            this.queryTime = setTimeout(function () {
                console.log(e.detail.isFixed);
                that.setData({
                    isFixed: e.detail.isFixed
                });
            }, 100);
        },

        // 获取视频列表
        getVideoList() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/commodity/queryVideoCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    let list = [];

                    if (res.data.data.length) {
                        res.data.data.forEach((item, index) => {
                            list.push({
                                id: index,
                                url: item.videoUrl
                            });
                        });
                        this.setData({
                            videoList: list,
                            hotSaleGoodsList: res.data.data,
                            nowSaleGoods: res.data.data[0]
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

        toBuy(e) {
            uni.navigateTo({
                url: `/pages/Index/GoodsDetails/GoodsDetails?id=${e.currentTarget.dataset.id}`
            });
        },

        // 改变视频
        bindchange(e) {
            console.log(e.detail);
            this.setData({
                nowSaleGoods: this.hotSaleGoodsList[e.detail.activeId]
            });
        },

        //处理推荐页面组件事件
        parseRecommendEvent(e) {
            console.log(e);
            var eventType = e.eventType;

            if (eventType == 'addCart') {
                this.addCart({
                    item: e.goodsInfo
                });
            }
        },

        validate() {
            console.log('占位：函数 validate 未声明');
        }
    }
};
</script>
<style>
/* pages/Index/Index.wxss */
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
/* 积分乐园 */
/* .integral-index-container{
  background-size: 750rpx 266rpx;
  background-repeat: no-repeat;
} */
/* 浮窗结束 */
.shop_title {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
}
.shop_title_tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.shop_title_name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.shop_content_list {
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
}
.shop_content {
    width: 360rpx;
    height: 300rpx;
    margin-right: 10rpx;
    background-size: 360rpx 300rpx;
    background-repeat: no-repeat;
    padding: 12rpx;
    box-sizing: border-box;
    position: relative;
}
.shop_type_img {
    width: 170rpx;
    height: 82rpx;
    position: absolute;
    top: 0;
    left: -10rpx;
}
.shop_content_title {
    font-weight: bold;
    font-size: 20rpx;
    color: #ffffff;
    margin-bottom: 8rpx;
    margin-left: 150rpx;
    margin-top: 10rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.shop_content_box {
    border-radius: 16rpx;
    background-color: #ffffff;
    font-size: 18rpx;
    color: #783705;
    font-weight: bold;
    line-height: 26rpx;
    display: flex;
}
.shop_content_left {
    width: 50%;
    height: 100%;
}
.shop_content_left image {
    width: 100%;
    height: 228rpx;
    vertical-align: bottom;
    border-radius: 16rpx 0 0 16rpx;
}
.shop_content_right {
    flex: 1;
    width: 0;
    padding: 20rpx 12rpx 12rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.shop_content_right_address {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.shop_content_right_intro {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.wx-login {
    text-align: center;
    margin-top: 260rpx;
}
.wx-login .wx-img {
    width: 520rpx;
    height: 330rpx;
}
.wx-login .wx-btn {
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
.index {
    background: #f8f9fb;
}
.index .swiper {
    width: 100%;
    height: 460rpx;
    background-color: #fff;
}
.index .swiper .img {
    width: 100%;
    height: 100%;
    position: relative;
}
.index .swiper .img .description-text {
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 20rpx;
    color: #f7f8f8;
    position: absolute;
    width: 100%;
    left: 0rpx;
    bottom: 0;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
}

.index .tool {
    width: 100%;
    height: 220rpx;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20rpx;
    animation: activeEnter 1.2s linear both;
}
.index .tool .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.index .tool .item .icon {
    width: 154rpx;
    height: 127rpx;
}
.index .tool .item .text {
    width: 120rpx;
    height: 32rpx;
    background: linear-gradient(180deg, #ffcca4 0%, #ff4400 100%);
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 32rpx;
    color: #ffffff;
    text-align: center;
    border-radius: 20rpx;
    margin-top: -15rpx;
}
.index .marchant .title {
    width: 100%;
    height: 80rpx;
    background: #ffffff;
    box-shadow: 0px 5px 10px rgba(255, 72, 5, 0.15);
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
}
.index .marchant .title .logo {
    width: 75rpx;
    height: 75rpx;
    border-radius: 50%;
}
.index .marchant .title .name {
    margin-left: 20rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 39rpx;
    color: #783705;
    max-width: 450rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
/* 通知栏 */
.notice-bar-container {
    width: 100%;
    height: 56rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.notice-title-text {
    width: 72rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-left: 10rpx;
}
.van-notice-bar {
    padding: 0rpx !important;
    font-size: 24rpx !important;
    font-weight: bold;
    height: 56rpx !important;
}
/* 通知栏结束 */
/* 关注列表 */
.follow-container {
    width: 100%;
    height: 80rpx;
    background: #fff;
    margin: 12rpx 0;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}
.follow-user-list {
    position: absolute;
    height: 80rpx;
}
.follow-user-image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
}
.follow-user-more {
    background: rgba(0, 0, 0, 0.4);
    font-size: 22rpx;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    line-height: 56rpx;
}
.follow-btn-container {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    position: absolute;
    right: 20rpx;
    bottom: 0;
}
/* 关注列表结束 */
.marchant-info {
    width: 100%;
    height: fit-content !important;
    background: #ffffff;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* animation: activeEnter 1.2s linear both; */
}
.index .marchant-info .tips {
    width: 100%;
    height: 48rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.index .marchant-info .tips .left {
    display: flex;
}
.renzheng {
    width: 183rpx;
    height: 40rpx;
    padding-right: 20rpx;
}
.type {
    width: 111rpx;
    height: 40rpx;
    padding-right: 20rpx;
}
.visitor {
    display: flex;
    align-items: center;
    height: 40rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ff6f0b;
    background: #f9e7c6;
    border-radius: 20rpx;
    padding-right: 16rpx;
}
.icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
}
.icon1 {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
}
.index .marchant-info .tips .right {
    height: 48rpx;
    background: linear-gradient(180deg, #fba08c 0%, #e8320c 100%);
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
}
.index .marchant-info .tips .right .icon {
    width: 36rpx;
    height: 26rpx;
}
.index .marchant-info .tips .right .text {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding-left: 15rpx;
}
.index .marchant-info .label {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;
}
.index .marchant-info .label .label-item {
    display: flex;
    align-items: center;
}
.index .marchant-info .label .label-item .icon {
    width: 19rpx;
    height: 19rpx;
}
.index .marchant-info .label .label-item .text {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    padding: 0 10rpx 0 5rpx;
}
.index .marchant-info .content .item {
    margin-top: 20rpx;
    display: flex;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #783705;
}
.index .marchant-info .content .item .icon {
    width: 26rpx;
    height: 26rpx;
    margin-right: 20rpx;
    margin-top: 6rpx;
}
.index .marchant-info .content .item .more-introduce {
    max-height: 144rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
/* 工具 */
.tool-container {
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    height: 88rpx;
    background: #ffffff;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
}
.tool-container-fixed {
    background-color: #fca33f;
}
.tool-item {
    height: 70rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx;
    position: relative;
}
.tool-txet {
    height: 28rpx;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: #333333;
}
/* 商品 */
.index .goods {
    padding: 0 20rpx;
}
.category {
    position: relative;
}
.category .item {
    height: 435rpx;
}
.category .item .title {
    width: 100%;
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.category .item .title .left {
    display: flex;
    justify-content: center;
    align-items: center;
}
.category .item .title .left .tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.category .item .title .left .name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.category .item .title .right {
    display: flex;
    justify-content: center;
    align-items: center;
}
.category .item .title .right .more {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #cccccc;
    padding-right: 8rpx;
}
.category .item .title .right .img {
    width: 24rpx;
    height: 24rpx;
}
.index .goods .category .item .content {
    width: 590rpx;
    height: 325rpx;
    background: linear-gradient(180deg, #ffb54d 0%, #ef7d1a 100%);
    box-shadow: 0px 5rpx 10rpx rgba(40, 14, 0, 0.15);
    border-radius: 20rpx;
    display: flex;
    margin-right: 20rpx;
}
.category .item .content .left .img {
    width: 381rpx;
    height: 325rpx;
    border-radius: 20rpx 0 0 20rpx;
}
.category .item .content .right {
    font-family: PingFang SC;
    color: #ffffff;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.category .item .content .right .name {
    font-size: 28rpx;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.category .item .content .right .price {
    font-size: 22rpx;
}
.category .item .content .right .price .money {
    font-size: 28rpx;
    font-weight: bold;
}
.category .item .content .right .desc {
    font-size: 24rpx;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .title {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
}
.index .goods .recommend .title .tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.index .goods .recommend .title .name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.index .goods .recommend .ltSix {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx 10rpx;
}
.index .goods .recommend .ltSix .item {
    height: 220rpx;
    border-bottom: 1rpx dashed #e2e2e2;
    padding-top: 20rpx;
    display: flex;
}
.index .goods .recommend .ltSix .item .left {
    width: 200rpx;
}
.index .goods .recommend .ltSix .item .left .img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 20rpx;
}
.index .goods .recommend .ltSix .item .right {
    padding-left: 20rpx;
    width: 440rpx;
    height: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.index .goods .recommend .ltSix .item .right .name {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .ltSix .item .right .desc {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .ltSix .item .right .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.index .goods .recommend .ltSix .item .right .foot .price {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #ff5340;
}
.index .goods .recommend .ltSix .item .right .foot .price .icon {
    font-size: 22rpx;
}
.index .goods .recommend .ltSix .item .right .foot .cart {
    width: 180rpx;
    height: 50rpx;
    background: #ff5340;
    border-radius: 5rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 50rpx;
    text-align: center;
    color: #ffffff;
}
.index .goods .recommend .lgFive {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.index .goods .recommend .lgFive .item {
    width: 345rpx;
    background: #ffffff;
    margin-top: 20rpx;
    border-radius: 20rpx;
}
.index .goods .recommend .lgFive .item .img {
    width: 345rpx;
    height: 0rpx;
    min-height: 280rpx;
    border-radius: 20rpx 20rpx 0 0;
}
.index .goods .recommend .lgFive .item .name {
    padding-left: 20rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .lgFive .item .foot {
    padding-left: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.index .goods .recommend .lgFive .item .foot .left {
    display: flex;
    align-items: center;
}
.index .goods .recommend .lgFive .item .foot .left .price {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff5340;
}
.index .goods .recommend .lgFive .item .foot .left .price .icon {
    font-size: 22rpx;
}
.cheaper {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 34rpx;
    color: #cccccc;
    text-decoration: line-through;
    margin-left: 4rpx;
}
.index .goods .recommend .lgFive .item .foot .right .icon {
    width: 60rpx;
    height: 60rpx;
}
.index .goods .recommend .shop {
    display: flex;
}
.index .goods .recommend .shop .item {
    width: 529rpx;
    height: 221rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.15);
    opacity: 1;
    border-radius: 10rpx;
    margin: 0 28rpx 28rpx 0;
    display: flex;
    align-items: center;
}
.index .goods .recommend .shop .item .left {
    padding-left: 20rpx;
}
.index .goods .recommend .shop .item .left .img {
    width: 180rpx;
    height: 180rpx;
}
.index .goods .recommend .shop .item .right {
    padding-left: 20rpx;
    box-sizing: border-box;
    width: 330rpx;
    height: 221rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.index .goods .recommend .shop .item .right .goodsName {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .shop .item .right .goodsDesc {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.index .goods .recommend .dotBox {
    margin-bottom: 32rpx;
    display: flex;
    justify-content: center;
}
.index .goods .recommend .dotBox .dot {
    width: 18rpx;
    height: 10rpx;
    background: #cccccc;
    margin-right: 20rpx;
}
.index .goods .recommend .dotBox .active {
    width: 36rpx;
    height: 10rpx;
    background: #eb421f;
    margin-right: 20rpx;
}
.index .brand {
    width: 100%;
    height: 500rpx;
    background: #ffffff;
    position: relative;
    margin-bottom: 20rpx;
}
.index .brand .left {
    position: absolute;
    left: 0;
    bottom: 0;
}
.index .brand .left .img-bg {
    width: 750rpx;
    height: 285rpx;
}
.index .brand .middle {
    padding: 0rpx 48rpx 0rpx 30rpx;
    position: relative;
}
.index .brand .middle .title {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
}
.index .brand .middle .title .tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.index .brand .middle .title .name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.index .brand .middle .content {
    font-size: 28rpx;
    font-family: MicrosoftYaHei;
    line-height: 52rpx;
    color: #333333;
    text-indent: 2rem;
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
}
.index .style {
    background: #fff;
    padding: 0 30rpx;
    margin-top: 20rpx;
}
.index .style .title {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
}
.index .style .title .tips {
    width: 15rpx;
    height: 33rpx;
    background: linear-gradient(149deg, #ffb8a9 0%, #e8320c 100%);
}
.index .style .title .name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #783705;
    padding-left: 20rpx;
}
.index .style .content .time {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 14rpx;
    color: #333333;
    margin-bottom: 5rpx;
}
.index .style .content .imaBox {
    width: 100%;
    height: 510rpx;
    display: flex;
    position: relative;
}
.index .style .content .imaBox .borderBox {
    width: 61rpx;
    height: 88rpx;
    opacity: 0.4;
    position: absolute;
}
.index .style .content .imaBox .left {
    border-left: 10rpx solid #707070;
    border-bottom: 10rpx solid #707070;
    left: 0;
    bottom: 0;
}
.index .style .content .imaBox .middle {
    width: 610rpx;
    height: 390rpx;
    background: #f2f2f2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -185rpx;
    margin-left: -305rpx;
}
.index .style .content .imaBox .middle .img {
    width: 612rpx;
    height: 390rpx;
    position: absolute;
    top: 14rpx;
    left: 14rpx;
}
.index .style .content .imaBox .right {
    border-top: 10rpx solid #707070;
    border-right: 10rpx solid #707070;
    top: 0;
    right: 0;
}
.index .footer {
    height: 140rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 140rpx;
    text-align: center;
    color: #7c6f6e;
}
@keyframes activeEnter {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(-50%);
    }
    80% {
        transform: translateX(0%);
    }
    90% {
        transform: translateX(10%);
    }
    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}
.promotion {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.61);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.promotionBox-close {
    width: 60rpx;
    height: 60rpx;
    margin-top: 40rpx;
}
.promotionBox-img {
    width: 460rpx;
    height: 460rpx;
}
.promotionBox-btn {
    width: 263rpx;
    height: 56rpx;
    background: linear-gradient(90deg, #f09046, #f8d355, #f09438);
    box-shadow: 0rpx 13rpx 29rpx 0rpx rgba(152, 34, 22, 0.64);
    border-radius: 28rpx;
    font-size: 27rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    line-height: 56rpx;
    text-align: center;
    margin: -150rpx 0 100rpx;
    margin-top: -150rpx;
    margin-bottom: 100rpx;
}
.discount-icon {
    width: 100rpx;
    height: 80rpx;
    position: fixed;
    bottom: 450rpx;
    right: 20rpx;
    z-index: 3;
}
/* 优惠券 */
.sale-pop-box {
    width: 493rpx;
    background-size: 100% 360rpx;
    background-repeat: no-repeat;
}
.scroll-box {
    width: 100%;
    max-height: 360rpx;
    border-radius: 0px 0px 20px 20px;
    margin-top: 340rpx;
    margin-bottom: 30rpx;
}
.sale-list-container {
    background: #d13941;
    padding: 0rpx 32rpx 32rpx;
    box-sizing: border-box;
}
.sale-list {
    width: 100%;
}
.sale-item {
    width: 100%;
    height: 96rpx;
    display: flex;
    background-size: 100% 96rpx;
    background-repeat: no-repeat;
    color: #ffffff;
    margin-top: 10rpx;
}
.sale-left {
    width: 172rpx;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff002a;
    font-weight: bold;
}
.sale-right {
    height: 100%;
    flex: 1;
    margin-left: 20rpx;
    margin-top: 6rpx;
}
.sale-price-icon {
    font-size: 24rpx;
    line-height: 24rpx;
    margin-bottom: -10rpx;
}
.sale-price-num {
    font-size: 50rpx;
    font-family: Source Han Sans CN;
    line-height: 50rpx;
}
.sale-price-name {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    max-width: 200rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.sale-over-time {
    height: 22rpx;
    font-size: 16rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22rpx;
    color: #999999;
}
.sale-price-desc {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #ff002a;
}
.sale-close {
    width: 60rpx;
    height: 60rpx;
    margin-top: 30rpx;
}
.sale-comfirm {
    width: 344rpx;
    height: 68rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.27);
    border-radius: 16rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff002a;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* 授权蒙版 */
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
/* 关注弹框 */
.follow-pop-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.follow-pop {
    width: 704rpx;
    height: 716rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 110rpx;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.follow-name {
    width: 280rpx;
    height: 56rpx;
    font-size: 40rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 56rpx;
    color: #ffffff;
    margin-top: 18rpx;
    margin-bottom: 14rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}
.follow-brief {
    width: 336rpx;
    height: 102rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: #e4e4e4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.follow-btn {
    width: 336rpx;
    height: 72rpx;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ff0000;
    margin-top: 44rpx;
}
.follow-solid {
    width: 2rpx;
    height: 60rpx;
    margin-top: 20rpx;
    background-color: #fff;
}
/* 下单弹框 */
.good-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
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
}
.good-info .good-edit .list-black .list-item {
    float: left;
    overflow: hidden;
    padding: 4rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    border: 1rpx solid #ececec;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    border-radius: 6rpx;
}
.good-info .good-edit .list-black .active {
    background: rgba(250, 51, 78, 0.05);
    border: 1rpx solid #fa334e;
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
}
.good-info .good-edit .list-black .list-item {
    float: left;
    overflow: hidden;
    padding: 4rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    border: 1rpx solid #ececec;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    border-radius: 6rpx;
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
    margin: 20rpx 0 50rpx 0;
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
.cartNum {
    width: 26rpx;
    height: 26rpx;
    line-height: 26rpx;
    background: #ff1d2e;
    border: 1px solid #ff1c30;
    border-radius: 50%;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    opacity: 1;
    position: absolute;
    top: -7rpx;
    right: 34rpx;
    text-align: center;
}
/* 促销 */
.no-dynamic {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-dynamic-img {
    width: 600rpx;
    height: 524rpx;
}

.no-dynamic-text {
    margin-top: 10rpx;
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #fff;
}
/* 活动 */
.activity-container {
    width: 100%;
    min-height: 100vh;
    padding: 20rpx 20rpx 120rpx;
    box-sizing: border-box;
    background-color: #ffff;
}

.activity-container-type {
    width: 100%;
}
.activity-container-top {
    width: 100%;
    height: 56rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    position: relative;
}
.subscribe-box {
    width: fit-content;
    height: 44rpx;
    background: #07c160;
    border-radius: 20rpx 0rpx 20rpx 0rpx;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;
    box-sizing: border-box;
}
.activity-container-top-right {
    font-weight: 400;
    font-size: 20rpx;
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
}
.activity-container-goods-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20rpx;
}
.activity-container-item {
    width: 340rpx;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 20rpx;
}
.activity-container-item-content {
    width: 100%;
    padding: 4rpx 10rpx 22rpx;
    box-sizing: border-box;
}
.paimai-time {
    width: 100%;
    height: 48rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
.activity-container-item-name {
    width: 100%;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.activity-container-item-explain {
    width: 100%;
    max-height: 56px;
    margin: 4rpx 0 8rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.activity-container-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.activity-container-price {
    flex: 1;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.activity-container-btn {
    width: 80rpx;
    height: 40rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 促销 */
.sale-container-goods-box {
    width: 100%;
}
.sale-container-item {
    width: 100%;
    height: 240rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx #f8f8f8;
    border-radius: 20rpx;
    margin-top: 16rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
}
.sale-container-item-content {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.sale-container-top {
    width: 100%;
    overflow: hidden;
}
.sale-container-item-name {
    width: 450rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #000000;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 12rpx;
}
.sale-container-item-explain {
    height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.sale-container-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.sale-container-price {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ff0000;
}
.sale-container-btn {
    width: 80rpx;
    height: 40rpx;
    background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
    border-radius: 8rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

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

/* 底部 */
.daodile {
    width: 100%;
    height: 38rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 38rpx;
    color: #7c6f6e;
    text-align: center;
    margin-top: 50rpx;
    margin-bottom: 120rpx;
}
/* 订阅通知 */
.dynamic-shop {
    min-height: 85vh;
    background-color: #f7f7f7;
    padding: 0rpx 0rpx 110rpx;
}
.dynamic-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
}
/* 小店排行 */
.shop-list-top-box {
    width: 100%;
    height: 198rpx;
}
.shoop-list-top-img {
    width: 100%;
    height: 198rpx;
}
.shop-list-solid {
    width: 8rpx;
    height: 50rpx;
    background-color: #fff;
    position: absolute;
    bottom: -26rpx;
    left: 190rpx;
}
.shop-list {
    border-radius: 20rpx;
    background-color: #ffffff;
    margin-bottom: 20rpx;
    overflow: hidden;
}
.right-bottom {
    width: 88rpx;
    height: 88rpx;
    position: fixed;
    bottom: 20%;
    right: 4%;
}
.shop-title {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    margin: 0 30rpx;
    text-align: center;
}
.shop-notice {
    display: flex;
    align-items: center;
    width: 634rpx;
    height: 32rpx;
    background: #e4e4e4;
    box-shadow: 0rpx 2rpx 2rpx rgba(0, 0, 0, 0.16);
    border-radius: 44rpx;
    font-size: 18rpx;
    font-weight: bold;
    line-height: 32rpx;
    color: #000000;
    margin: 0 30rpx;
}
.shop-notice image {
    width: 26rpx;
    height: 26rpx;
    margin: 0 6rpx 0 18rpx;
}
.shop-week {
    display: flex;
    justify-content: space-between;
    height: 28rpx;
    font-size: 20rpx;
    font-weight: bold;
    color: #000000;
    margin: 20rpx 30rpx 0;

    line-height: 28rpx;
    text-align: center;
}
.shop-signed {
    width: 68rpx;
    color: #ffffff;
    background: #e23e3e;
    box-shadow: 0rpx 2rpx 2rpx rgba(0, 0, 0, 0.16);
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shop-sign {
    width: 68rpx;
    color: #e1563d;
    border: 2rpx solid #e1563d;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shop-noSign {
    width: 68rpx;
    color: #999999;
    border: 2rpx solid #999999;
    box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shop-item {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shop-item-left {
    display: flex;
    align-items: center;
}
.shop-item-left-number {
    width: 40rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #000000;
    margin-right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shop-item-left-logo {
    width: 82rpx;
    height: 82rpx;
    border-radius: 50%;
}
.shop-item-left-content {
    height: 82rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8rpx;

    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}
.shop-item-left-content-active {
    font-size: 24rpx;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
}
.shop-item-left-content-active-pro {
    width: 200rpx;
    height: 20rpx;
    background: #aeaeae;
    border-radius: 40rpx;
    margin-left: 26rpx;
}
.shop-item-left-content-active-inPro {
    width: 100rpx;
    height: 20rpx;
    background: #ffba00;
    border-radius: 40rpx;
}
.shop-item-right {
    font-size: 20rpx;
    font-weight: 400;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.shop-item-right image {
    width: 33rpx;
    height: 33rpx;
}
page {
    position: relative;
}
/* 搜索框 */
.search-container {
    width: 100%;
    height: 110rpx;
    background: #ffffff;
    position: sticky;
    top: 0;
    left: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 16rpx;
    border-top-left-radius: 16rpx;
    z-index: 88;
}
.search-container-content {
    width: 564rpx;
    height: 60rpx;
    background: #f6f6f6;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #f95607;
    display: flex;
    align-items: center;
    justify-content: center;
}
.subscribe-notice {
    width: 122rpx;
    height: 48rpx;
    background: linear-gradient(180deg, #fba08c 0%, #e8320c 100%);
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-left: 24rpx;
}

/*活动图片列表*/
.activity-entery {
    padding: 0 30rpx;
    flex-wrap: wrap;
}
.activity-entery .activity-item {
    margin-bottom: 20rpx;
}
.activity-entery .active-img1 {
    height: 144rpx;
    width: 686rpx;
    border-radius: 20rpx;
    background-color: #ccc;
}
.activity-entery .active-img2 {
    height: 176rpx;
    width: 332rpx;
    border-radius: 20rpx;
    background-color: #ccc;
}

/* 颜值指数 */
.index-head-left-info-desc {
    display: flex;
    align-items: center;
}
.index-head-left-info-desc-text {
    font-size: 20rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999;
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

/* 购物车 */
.cart-main {
    width: 100vw;
    height: 100vh;
    background: #f2f2f2;
}
.cart-main .red-style {
    color: #ec1919;
}
.cart-main .edit-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 90rpx;
    background: #f2f2f2;
    padding: 20rpx 30rpx 10rpx 30rpx;
    box-sizing: border-box;
}
.cart-main .edit-area .edit-inner {
    width: 100%;
    font-size: 24rpx;
    background: #fff;
    border-radius: 4rpx;
    line-height: 60rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
}
.cart-main .edit-area .edit-inner .icon-text {
    margin-right: 10rpx;
}
.cart-main .edit-area .edit-inner .select-all-area {
    flex: 1;
}
.cart-main .edit-area .edit-inner .delet-area {
    flex: 1;
    text-align: right;
}
.cart-main .edit-area .edit-inner .click-area {
    display: inline-block;
    width: 140rpx;
    height: 100%;
}
.cart-main .scroll-area {
    padding-top: 90rpx;
    width: 100%;
    background: #f2f2f2;
    box-sizing: border-box;
}
.cart-main .scroll-area .list-area .item-area {
    width: 100%;
    background: #f2f2f2;
    padding: 0 26rpx;
    box-sizing: border-box;
    margin-bottom: 33rpx;
}
.cart-main .scroll-area .list-area .item-area:last-child {
    margin-bottom: 0;
}
.cart-main .scroll-area .list-area .item-area .item-header {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    background: #fbfafa;
    border-radius: 20px 20px 0px 0px;
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
}
.cart-main .scroll-area .list-area .item-area .item-header .item-header-select-area {
    display: inline-block;
    width: 53rpx;
    height: 80rpx;
}
.cart-main .scroll-area .list-area .item-area .item-header .item-header-select-area .item-header-select {
    margin-right: 9rpx;
}
.cart-main .scroll-area .list-area .item-area .item-header .item-header-img {
    width: 54rpx;
    height: 54rpx;
    border-radius: 50%;
    border: 1rpx solid #fbfafa;
    vertical-align: middle;
    margin-right: 14rpx;
}
.cart-main .scroll-area .list-area .item-area .item-goods {
    width: 100%;
    background: #fff;
    padding: 20rpx 0rpx;
    box-sizing: border-box;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good {
    width: 100%;
    height: 154rpx;
    margin-bottom: 26rpx;
    display: flex;
    flex-direction: row;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good:last-child {
    margin-bottom: 0;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-l {
    width: 56rpx;
    padding-top: 2rpx;
    box-sizing: border-box;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-l .select-area {
    width: 56rpx;
    height: 80rpx;
    text-indent: 16rpx;
    display: inline-block;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-c {
    width: 154rpx;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-c .good-img {
    width: 154rpx;
    height: 154rpx;
    border-radius: 10rpx;
    vertical-align: middle;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r {
    flex: 1;
    width: 0;
    padding: 0 20rpx;
    box-sizing: border-box;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .good-title {
    width: 100%;
    height: 35rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 41rpx;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .good-model {
    margin-top: 7rpx;
    width: 100%;
    height: 30rpx;
    font-size: 22rpx;
    font-weight: 400;
    line-height: 31rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price {
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
    margin-top: 40rpx;
    display: flex;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .price {
    flex: 1;
    font-size: 26rpx;
    font-weight: 400;
    color: #ec1919;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .edit-num {
    flex: 1;
    text-align: right;
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .edit-num .edit-subtract,
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .edit-num .edit-add {
    display: inline-block;
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    color: #999999;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .edit-num .edit-add {
    color: #ec1919;
}
.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-r .number-price .edit-num .num {
    display: inline-block;
    width: 60rpx;
    height: 50rpx;
    text-align: center;
}
.cart-main .scroll-area .list-area .item-area .item-footer {
    width: 100%;
    margin-top: 10rpx;
    height: 100rpx;
    line-height: 100rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    border: 1rpx solid #ececec;
    box-shadow: 0px -2rpx 10rpx rgba(0, 0, 29, 0.08);
    opacity: 1;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    display: flex;
    flex-direction: row;
}
.cart-main .scroll-area .list-area .item-area .item-footer .item-footer-l {
    flex: 1;
    text-align: left;
    color: #333333;
}
.cart-main .scroll-area .list-area .item-area .item-footer .item-footer-l text:nth-of-type(1) {
    font-size: 26rpx;
}
.cart-main .scroll-area .list-area .item-area .item-footer .item-footer-l text:nth-of-type(2) {
    font-size: 36rpx;
}
.cart-main .scroll-area .list-area .item-area .item-footer .item-footer-r {
    flex: 1;
    text-align: right;
}
.cart-main .scroll-area .list-area .item-area .item-footer .item-footer-r .settlement-btn {
    font-size: 24rpx;
    color: #ffffff;
    padding: 9rpx 39rpx;
    background: #ffcb3f;
    border-radius: 60rpx;
}
.cart-main .num-input {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    padding: 5rpx 30rpx;
    box-sizing: border-box;
}
.cart-main .num-input input {
    display: block;
    width: 80%;
    margin-left: 10%;
    height: 90rpx;
    line-height: 90rpx;
}
.cart-main .overlay .box {
    width: 100%;
    height: 550rpx;
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;
    padding: 0 50rpx 0 20rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
}
.cart-main .overlay .box .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 115rpx;
}
.cart-main .overlay .box .title .flex {
    flex: 1;
}
.cart-main .overlay .box .title .text {
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
.cart-main .overlay .box .title .icon {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.cart-main .overlay .box .title .img {
    width: 44rpx;
    height: 44rpx;
}
.cart-main .overlay .box .psfw {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 102rpx;
    border-top: 1rpx solid #e2e2e2;
}
.cart-main .overlay .box .psfw .active {
    width: 240rpx;
    height: 64rpx;
    border: 1rpx solid #ff5340;
    position: relative;
}
.cart-main .overlay .box .psfw .active .check {
    width: 28rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    bottom: 0;
}
.cart-main .overlay .box .psfw .psfw-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cart-main .overlay .box .psfw .psfw-box .icon {
    width: 44rpx;
    height: 34rpx;
}
.cart-main .overlay .box .psfw .psfw-box .text {
    margin-left: 18rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 43rpx;
    color: #999999;
    opacity: 1;
}
.cart-main .overlay .box .dnxf {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 102rpx;
    border-top: 1rpx solid #e2e2e2;
}
.cart-main .overlay .box .dnxf .active {
    width: 240rpx;
    height: 64rpx;
    border: 1rpx solid #ff5340;
    position: relative;
}
.cart-main .overlay .box .dnxf .active .check {
    width: 28rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    bottom: 0;
}
.cart-main .overlay .box .dnxf .dnxf-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cart-main .overlay .box .dnxf .dnxf-box .icon {
    width: 42rpx;
    height: 38rpx;
}
.cart-main .overlay .box .dnxf .dnxf-box .text {
    margin-left: 18rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 43rpx;
    color: #999999;
    opacity: 1;
}
.cart-main .overlay .box .btn {
    text-align: center;
    margin-top: 38rpx;
    margin-left: 5rpx;
}
.cart-main .overlay .box .btn .img {
    width: 560rpx;
    height: 110rpx;
}
.no-cart {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-cart-img {
    width: 632rpx;
    height: 368rpx;
}

.no-cart-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42rpx;
    color: #000;
    opacity: 1;
    margin-top: 40rpx;

    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 29rpx;
    color: #999999;
}
/* 新品 */
.news-container {
    width: 100%;
    /* height: calc(100vh - 100rpx); */
    position: relative;
    background-color: #f5f5f5;
}
/* .news-container-sp{
    height: calc(100vh - 168rpx);
  } */
.container {
    padding: 0;
}
.video-container {
    width: 100%;
    height: calc(100vh - 100rpx);
}
.news-goods-container {
    width: 100%;
    height: 138rpx;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 16rpx 20rpx;
    box-sizing: border-box;
}
.news-goods-top {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.news-goods-name {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 44rpx;
    color: #ffffff;
    flex: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.news-goods-price {
    flex: 1;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
}
.news-goods-sale-price {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #ffffff;
}
.news-goods-origin-price {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #f7f7f7;
    text-decoration: line-through;
}
.news-goods-bottom {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    margin-top: 10rpx;
    justify-content: space-between;
}
.news-goods-introduction {
    width: 500rpx;
    height: 56rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.news-goods-btn {
    width: 132rpx;
    height: 48rpx;
    background: #e23e3e;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 积分乐园 */
.index_integral_box {
    width: 100%;
    height: 84rpx;
    margin-top: 20rpx;
}
.index_integral_title {
    margin: 0 auto;
    width: 100%;
    height: 84rpx;
    padding-right: 10rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-size: 100% 84rpx;
}
.index_integral_countdown {
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    margin: 0 4rpx;
}
.index_integral_countdown_text {
    color: #ffffff;
    background-color: #ff0000;
    border-radius: 6rpx;
    padding: 4rpx 4rpx;
    font-weight: 500;
}
.index_integral {
    margin: 0 auto;
    width: 732rpx;
    height: 188rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 0 26rpx;
    box-sizing: border-box;
}
.index_integral_item {
    height: 94rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid #f4f4f4;
}
.index_integral_item_left {
    width: 0;
    flex: 1;
    display: flex;
}
.index_integral_item_left_image {
    width: 60rpx;
    height: 60rpx;
}
.index_integral_item_left_box {
    width: 0;
    flex: 1;
    margin-left: 14rpx;
    height: 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.index_integral_item_left_up {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #000000;
}
.index_integral_item_left_down {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    font-weight: 400;
    color: #000000;
}
.index_integral_item_left_down_pro {
    width: 200rpx;
    height: 12rpx;
    background: #efedec;
    border-radius: 8rpx;
}
.index_integral_item_left_down_pro_in {
    height: 100%;
    background: #fbe945;
    border-radius: 8rpx;
}
.index_integral_item_right {
    width: 108rpx;
    height: 48rpx;
    background: linear-gradient(180deg, #f94e40 0%, #ff1500 100%, #7d2720 100%);
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
/* tabbar */
.custom-tab-bar {
    width: 100%;
    height: 100rpx;
    background: #fff;
    border-top: 1rpx solid #e4e4e4;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 99;
}
.custom-tab-bar-item {
    width: 0;
    flex: 1;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.custom-tab-bar-text {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
    white-space: nowrap;
    margin-top: 2rpx;
}
.custom-tab-bar-text-active {
    color: #fb5050;
}
</style>
