<template>
    <view>
        <!-- pages/shopHome/components/ToCity/ToCity.wxml -->
        <view v-if="tempId < 5" hidden>
            <!-- 新版开始22.05.27 -->
            <view>
                <view style="width: 710rpx; margin: 0 auto; background: #fff; border-radius: 10rpx 10rpx 0 0; border-bottom: 1px solid #f1f1f1; padding: 20rpx; margin-top: 20rpx">
                    <view style="width: 100%; background: rgba(0, 0, 0, 0.5); height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative">
                        <image
                            style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx"
                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                            mode
                        ></image>
                        <view style="position: absolute; top: 25rpx; left: 120rpx; color: white"><text>关东的首发式地方</text></view>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; top: 25rpx; right: 0">门店团购</text>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; bottom: -16rpx; left: 120rpx">上门自取</text>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; bottom: -16rpx; left: 230rpx">进店消费</text>
                    </view>
                    <view style="width: 100%; display: flex; align-items: center; margin-top: 30rpx; padding: 10rpx">
                        <block v-for="(item, clone__i0__) in 4" :key="clone__i0__">
                            <view style="display: flex; flex-direction: column; margin-right: 10rpx">
                                <image
                                    style="width: 180rpx; height: 180rpx"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                                    mode
                                ></image>
                                <text class="u-line-2;" style="width: 180rpx; font-size: 22rpx; margin: 10rpx 0">
                                    <text style="padding: 3rpx 6rpx; color: #fff; background: #ff0000; border-radius: 10rpx; font-size: 20rpx">到店</text>
                                    <text>青岛啤酒啊实撒旦飞洒地方撒旦打实的</text>
                                </text>
                                <text style="color: red">￥28.00</text>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
            <view>
                <view style="width: 710rpx; margin: 0 auto; background: #fff; border-radius: 10rpx 10rpx 0 0; border-bottom: 1px solid #f1f1f1; padding: 20rpx">
                    <view style="width: 100%; background: rgba(0, 0, 0, 0.5); height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative">
                        <image
                            style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx"
                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                            mode
                        ></image>
                        <view style="position: absolute; top: 25rpx; left: 120rpx; color: white"><text>关东的首发式地方</text></view>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; top: 25rpx; right: 0">同城急速配送</text>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; bottom: -16rpx; left: 120rpx">60分钟内送达</text>
                    </view>
                    <view style="width: 100%; display: flex; align-items: center; margin-top: 30rpx; padding: 10rpx">
                        <block v-for="(item, clone__i1__) in 4" :key="clone__i1__">
                            <view style="display: flex; flex-direction: column; margin-right: 10rpx">
                                <image
                                    style="width: 180rpx; height: 180rpx"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                                    mode
                                ></image>
                                <text class="u-line-2;" style="width: 180rpx; font-size: 22rpx; margin: 10rpx 0">
                                    <text style="padding: 3rpx 6rpx; color: #fff; background: #ff0000; border-radius: 10rpx; font-size: 20rpx">同城</text>
                                    <text>青岛啤酒啊实撒旦飞洒地方撒旦打实的</text>
                                </text>
                                <text style="color: red">￥28.00</text>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
            <view>
                <view
                    style="width: 710rpx; margin: 0 auto; background: #fff; border-radius: 10rpx 10rpx 0 0; border-bottom: 1px solid #f1f1f1; padding: 20rpx"
                    v-if="mainOrderType !== '1' && logisticsList.length !== 0"
                >
                    <view style="width: 100%; background: rgba(0, 0, 0, 0.5); height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative">
                        <image
                            style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx"
                            src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                            mode
                        ></image>
                        <view style="position: absolute; top: 25rpx; left: 120rpx; color: white"><text>关东的首发式地方</text></view>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; top: 25rpx; right: 0">全国物流</text>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; bottom: -16rpx; left: 120rpx">7天无理由退货</text>
                        <text style="padding: 3rpx 10rpx; color: white; background: red; font-size: 20rpx; position: absolute; bottom: -16rpx; left: 280rpx">质量保障</text>
                    </view>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in logisticsList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="1" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>

                    <view style="width: 100%; display: flex; align-items: center; margin-top: 30rpx; padding: 10rpx">
                        <block v-for="(item, clone__i2__) in 4" :key="clone__i2__">
                            <view style="display: flex; flex-direction: column; margin-right: 10rpx">
                                <image
                                    style="width: 180rpx; height: 180rpx"
                                    src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg"
                                    mode
                                ></image>
                                <text class="u-line-2;" style="width: 180rpx; font-size: 22rpx; margin: 10rpx 0">
                                    <text style="padding: 3rpx 6rpx; color: #fff; background: #ff0000; border-radius: 10rpx; font-size: 20rpx">物流</text>
                                    <text>青岛啤酒啊实撒旦飞洒地方撒旦打实的</text>
                                </text>
                                <text style="color: red">￥28.00</text>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
            <!-- 新版结束 -->
            <!-- 横排 -->
            <!-- 物流 -->
            <view :class="'toCity me-fx-row me-fx-sb ' + tempBox" v-if="(isToCity && isToStore) || isWuliu">
                <view class="book" v-if="tempId != 3 && isWuliu && logisticsList.length > 0">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='1' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">物流商品</text>
                    <text class="item_desc">用户下单需快递取货</text>
                </view>
                <image class="right_img" src="../../../static/right.png"></image>
            </view> -->
                    <view-more-title
                        title="物流商品"
                        title-size="24"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        :add-pd="tempId"
                        @click="jumpGoodsList($event, { type: '1' })"
                        data-type="1"
                    ></view-more-title>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in logisticsList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" v-if="tempId != 1 && tempId != 3.1 && isToStore && shopList2.length > 0">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='3' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">预订商品</text>
                    <text class="item_desc">用户需要到店取货或消费</text>
                </view>
                <image class="right_img" src="../../../static/right.png"></image>
            </view> -->
                    <view-more-title
                        title="预订商品"
                        title-size="24"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        @click="jumpGoodsList($event, { type: '3' })"
                        data-type="3"
                    ></view-more-title>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList2" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="3" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" v-if="tempId != 4 && isToCity && shopList.length > 0">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='2' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">同城配送商品</text>
                    <text class="item_desc">用户下单同城可配送</text>
                </view>
                <image class="right_img" src="../../../static/right.png" ></image>
            </view> -->
                    <view-more-title
                        title="同城商品"
                        title-size="24"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        @click="jumpGoodsList($event, { type: '2' })"
                        data-type="2"
                    ></view-more-title>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="2" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>

        <view hidden>
            <!-- 横排 -->
            <!-- 物流 -->
            <view :class="'toCity me-fx-row me-fx-sb ' + tempBox">
                <view class="book" style="background-color: #e9f0ff" v-if="mainOrderType !== '1' && logisticsList.length !== 0">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='1' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">物流商品</text>
                    <text class="item_desc">用户下单需快递取货</text>
                </view>
                <image class="right_img" src="../../../static/right.png"></image>
            </view> -->
                    <view-more-title
                        title="物流配送"
                        title-size="24"
                        title-color="#417Df1"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        :add-pd="tempId"
                        @click="jumpGoodsList($event, { type: '1' })"
                        data-type="1"
                    ></view-more-title>
                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in logisticsList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="1" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" v-if="mainOrderType !== '2' && shopList2.length !== 0" style="background-color: #ffefdb">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='3' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">预订商品</text>
                    <text class="item_desc">用户需要到店取货或消费</text>
                </view>
                <image class="right_img" src="../../../static/right.png"></image>
            </view> -->
                    <view-more-title
                        title="预订到店"
                        title-size="24"
                        title-color="#FF7500"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        @click="jumpGoodsList($event, { type: '3' })"
                        data-type="3"
                    ></view-more-title>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList2" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="3" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" v-if="mainOrderType !== '3' && shopList.length !== 0" style="background-color: #fdeaec">
                    <!-- <view class="title me-fx-row me-fx-sb me-fx-start-c" 
                data-type='2' bindtap="jumpGoodsList"
            >
                <view class="me-fx-col">
                    <text class="item_name">同城配送商品</text>
                    <text class="item_desc">用户下单同城可配送</text>
                </view>
                <image class="right_img" src="../../../static/right.png" ></image>
            </view> -->
                    <view-more-title
                        title="同城配送"
                        title-size="24"
                        :img-name="'t' + tempId + '-' + (tempId == 3 ? 1 : tempId) + '.png'"
                        @click="jumpGoodsList($event, { type: '2' })"
                        data-type="2"
                        title-color="#F94052"
                    ></view-more-title>

                    <scroll-view :scroll-x="true" class="product1_list">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="2" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text">{{ item.commodityName }}</text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>

        <view style="margin-top: 60rpx">
            <!-- 横排 -->
            <!-- 物流 -->
            <view :class="'toCity ' + tempBox" style="margin-top: 60rpx; width: 700rpx; margin: 0 auto; background: #fff">
                <view class="book" style="background-color: #fff; width: 100%" v-if="mainOrderType !== '1' && isWuliu && logisticsList.length > 0">
                    <view
                        style="width: 100%; background: rgba(0, 0, 0, 0.75); height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative"
                        @tap="jumpGoodsList"
                        data-type="1"
                    >
                        <image style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx" :src="headImage" mode></image>
                        <view style="position: absolute; top: 20rpx; left: 120rpx; color: white; font-size: 30rpx">
                            <text>{{ nickName }}</text>
                        </view>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                top: 25rpx;
                                right: 0;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            全国物流
                        </text>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                bottom: -18rpx;
                                left: 120rpx;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            7天无理由退货
                        </text>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                bottom: -18rpx;
                                left: 280rpx;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            质量保障
                        </text>
                    </view>
                    <scroll-view :scroll-x="true" class="product1_list" style="width: 100%; margin-top: 20rpx">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in logisticsList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="1" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>

                                    <text class="product_name me-full-text u-line-2" style="font-weight: 550; font-size: 20rpx; height: 60rpx">
                                        <text style="color: #fff; background: #ff0000; border-radius: 5rpx; font-size: 18rpx; padding: 0 5rpx">全国</text>
                                        {{ item.commodityName }}
                                    </text>

                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" style="background-color: #ffffff; width: 100%; margin-top: 20rpx" v-if="mainOrderType !== '3' && isToStore && shopList2.length > 0">
                    <view style="width: 100%; background: #484efe; height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative" @tap="jumpGoodsList" data-type="3">
                        <image style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx" :src="headImage" mode></image>
                        <view style="position: absolute; top: 20rpx; left: 120rpx; color: white">
                            <text>{{ address }}</text>
                        </view>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                top: 25rpx;
                                right: 0;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            门店团购
                        </text>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                bottom: -16rpx;
                                left: 120rpx;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            上门自取
                        </text>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: red;
                                font-size: 18rpx;
                                position: absolute;
                                bottom: -16rpx;
                                left: 230rpx;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            进店消费
                        </text>
                    </view>
                    <scroll-view :scroll-x="true" class="product1_list" style="width: 100%; margin-top: 20rpx">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList2" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="3" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text u-line-2" style="font-weight: 550; font-size: 20rpx; height: 60rpx">
                                        <text style="color: #fff; background: #ff0000; border-radius: 5rpx; font-size: 18rpx; padding: 0 5rpx">到店</text>
                                        {{ item.commodityName }}
                                    </text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="book" style="background-color: #ffffff; width: 100%; margin-top: 25rpx" v-if="mainOrderType !== '2' && isToCity && shopList.length > 0">
                    <view style="width: 100%; background: rgba(255, 0, 0, 1); height: 84rpx; border-radius: 10rpx 10rpx 0 0; position: relative" @tap="jumpGoodsList" data-type="2">
                        <image style="width: 72rpx; height: 72rpx; border-radius: 20%; margin-top: 30rpx; margin-left: 20rpx" :src="headImage" mode></image>
                        <view style="position: absolute; top: 20rpx; left: 120rpx; color: white; font-size: 30rpx">
                            <text>{{ nickName }}</text>
                        </view>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: rgb(0, 0, 0);
                                font-size: 18rpx;
                                position: absolute;
                                top: 25rpx;
                                right: 0;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            同城急速配送
                        </text>
                        <text
                            style="
                                padding: 1rpx 6rpx;
                                color: white;
                                background: rgb(0, 0, 0);
                                font-size: 18rpx;
                                position: absolute;
                                bottom: -18rpx;
                                left: 120rpx;
                                font-weight: 550;
                                border-radius: 8rpx;
                            "
                        >
                            60分钟内送达
                        </text>
                    </view>
                    <scroll-view :scroll-x="true" class="product1_list" style="width: 100%; margin-top: 20rpx">
                        <view class="me-fx-row me-fx-start-c">
                            <block v-for="(item, index) in shopList" :key="index">
                                <view class="me-fx-col me-fx-sb-c product_info" :data-id="item.commodityId" data-type="2" @tap="jumpGoodsDetail">
                                    <image class="product_img" :src="item.thumbnail"></image>
                                    <text class="product_name me-full-text u-line-2" style="font-weight: 550; font-size: 20rpx; height: 60rpx">
                                        <text style="color: #fff; background: #ff0000; border-radius: 5rpx; font-size: 18rpx; padding: 0 5rpx">同城</text>
                                        {{ item.commodityName }}
                                    </text>
                                    <view class="me-fx-row price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
                                        <text class="product_price">￥</text>
                                        <text class="price">{{ item.lowPrice }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>

        <!-- 竖排 -->
        <!-- <view wx:if='{{false}}'  class="toCity me-fx-col">
        <view class="book2" wx:if="{{isToStore&&shopList2.length>0}}">
            <view class="book2_title me-fx-row">
                <view class="me-fx-col title_info" data-type='3' bindtap="jumpGoodsList">
                    <text class="item2_name">本店可(预订商品)</text>
                    <view class="me-fx-row me-fx-sb me-fx-start-c">
                        <text class="item2_desc">用户需要到店取货或消费</text>
                        <image class="right_img" src="../../../static/right.png"></image>
                    </view>
                </view>
            </view>
            <scroll-view scroll-x='true' class="product2_list">
                <view class="me-fx-row me-fx-start-c">
                    <block wx:for="{{shopList2}}" wx:key="index">
                        <view  class="me-fx-col me-fx-sb-c product_info" data-id="{{item.commodityId}}" data-type='3' bindtap="jumpGoodsDetail"> 
                            <image class="product_img" src="{{item.thumbnail}}"></image>
                            <text class="product_name me-full-text">{{item.commodityName}}</text>
                            <view class="me-fx-row price_info"><text class="product_price">￥</text> <text class="price">{{item.lowPrice}}</text></view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="book2" wx:if="{{isToCity&&shopList.length>0}}">
            <view class="book2_title me-fx-row">
                <view class="me-fx-col title_info" data-type='2' bindtap="jumpGoodsList">
                    <text class="item2_name">本店可(同城配送商品)</text>
                    <view class="me-fx-row me-fx-sb me-fx-start-c">
                        <text class="item2_desc">用户下单同城可配送</text>
                        <image class="right_img" src="../../../static/right.png"></image>
                    </view>
                </view>
            </view>
            <scroll-view scroll-x='true' class="product2_list">
                <view class="me-fx-row me-fx-start-c">
                    <block wx:for="{{shopList}}" wx:key="index">
                        <view  class="me-fx-col me-fx-sb-c product_info" data-id="{{item.commodityId}}" data-type='2' bindtap="jumpGoodsDetail"> 
                            <image class="product_img" src="{{item.thumbnail}}"></image>
                            <text class="product_name me-full-text">{{item.commodityName}}</text>
                            <view class="me-fx-row price_info"><text class="product_price">￥</text> <text class="price">{{item.lowPrice}}</text></view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
    </view>
</view> -->

        <!-- <view class="city" wx:else>
    <view class="me-fx-col me-fx-c-c list-top-msg {{listTopMsgBg}}">
        <text>{{msg}}</text>
        <view>({{address}})</view>
    </view>
    <view class="me-fx-row me-fx-sb city" wx:if="{{tempId==5}}">
        <view class="city_info me-fx-col me-fx-start-c" wx:for='{{shopList}}' wx:key='index' bindtap="rePage" data-id="{{item.commodityId}}">
            <image src='{{item.thumbnail}}' class='goods-img'></image>
            <text class="city_desc me-full-text">{{item.description}}</text>
            <view class="city_pay me-fx-row me-fx-sb me-fx-start-c">
                <view><text class="class_price">￥</text><text class="logPrice">{{item.lowPrice}}</text></view>
                <view class="btn_price">{{shopType=="book"?"门店团购":"同城配送"}}</view>
            </view>
        </view>
    </view>
    <view class="me-fx-row me-fx-sb city" wx:if="{{tempId == 6 }}">
        <view class="city_info me-fx-col me-fx-start-c" wx:for='{{shopList}}' wx:key='index' bindtap="rePage" data-id="{{item.commodityId}}">
            <view class="temp2-pro-bg" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_short_product.png)">
                <image src='{{item.thumbnail}}' class='goods-img'></image>
            </view>
            <text class="city_desc2 me-full-text">{{item.description}}</text>
            <view class="city_pay me-fx-row me-fx-sb me-fx-start-c">
                <view><text class="class_price">￥</text><text class="logPrice">{{item.lowPrice}}</text></view>
                <view style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_long_btn.png)" class="temp2_btn_price">{{shopType=="book"?"门店团购":"同城配送"}}</view>
            </view>
        </view>
    </view>
    <view class="me-fx-row me-fx-sb city " wx:if="{{tempId == 7}}">
        <view class="city_info3 me-fx-col br_black me-fx-start-c" wx:for='{{shopList}}' wx:key='index' bindtap="rePage" data-id="{{item.commodityId}}">
            <image src='{{item.thumbnail}}' class='goods-img'></image>
            <text class="city_desc3 me-full-text">{{item.description}}</text>
            <view class="city_pay3 me-fx-row me-fx-sb me-fx-start-c">
               <view class="city_pay3_btn" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp3_price_btn.png)">{{item.lowPrice}}</view>
            </view>
        </view>
    </view>
    <view class="me-fx-row me-fx-sb city " wx:if="{{tempId == 8}}">
        <view class="city_info4 me-fx-col br_black me-fx-start-c" wx:for='{{shopList}}' wx:key='index' bindtap="rePage" data-id="{{item.commodityId}}">
            <image src='{{item.thumbnail}}' class='goods-img2'></image>
            <view class="product4-item2-msg me-fx-col" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_info_bg.png)"> 
                <text class="temp4_price2">￥{{item.lowPrice}}</text>
            </view>
            <view class="product4-item2-btn1" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn2.png)">
                <text>{{shopType=="book"?"门店团购":"同城配送"}}</text>
            </view>
            <view class="product4-item2-btn2" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn1.png)">
                <text class="me-full-text">{{item.commodityName}}</text>
            </view>
        </view>
    </view>
</view> -->
    </view>
</template>

<script>
import viewMoreTitle from '../view-more-title/view-more-title';
// pages/shopHome/components/ToCity/ToCity.js
export default {
    components: {
        viewMoreTitle
    },
    data() {
        return {
            listTopMsgBg: '',
            tempBox: '',
            clone__i0__: '',
            clone__i1__: '',
            clone__i2__: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tempId: {
            type: [String, Number],
            default: ''
        },
        headImage: {
            type: String
        },
        shopList: {
            type: Array
        },
        //同城
        shopList2: {
            type: Array
        },
        //预订
        logisticsList: {
            type: Array
        },
        //物流
        marchantId: {
            type: [String, Number]
        },
        isToCity: {
            type: Boolean,
            default: false
        },
        nickName: {
            type: String
        },
        isToStore: {
            type: Boolean,
            default: false
        },
        isWuliu: {
            type: Boolean,
            default: false
        },
        msg: {
            type: String
        },
        shopType: {
            type: String
        },
        address: {
            type: String
        },
        mainOrderType: {
            type: String
        }
    },
    beforeMount: function () {},
    watch: {
        //监听数据
        tempId: {
            handler: function (nowVal, oldVal) {
                var bgColor = '';
                var tempBox = '';
                switch (nowVal) {
                    case 1:
                    case 4:
                    case 3:
                        tempBox = 'temp-box-' + nowVal;
                        break;

                    case 5:
                        bgColor = 'top-msg-bg1';
                        break;

                    case 6:
                        bgColor = 'top-msg-bg2';
                        break;

                    case 7:
                        bgColor = 'top-msg-bg3';
                        break;

                    case 8:
                        bgColor = 'top-msg-bg4';
                        break;

                    case 3.1:
                        tempBox = 'temp-box-' + 31;
                        break;
                }

                this.setData({
                    listTopMsgBg: bgColor,
                    tempBox
                });
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        jumpGoodsList(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //跳转商品列表
            var type = e.currentTarget.dataset.type;
            var marchantId = this.marchantId;
            var url = '/pages/shopHome/CityList/CityList';
            url += `?listType=${type}&marchantId=${marchantId}`;
            uni.navigateTo({
                url
            });
        },

        jumpGoodsDetail(e) {
            //跳转商品详情
            let id = e.currentTarget.dataset.id;
            let type = e.currentTarget.dataset.type;
            console.log(id, type, 'id和type');
            let url = `/pages/Index/GoodsDetails/GoodsDetails?id=${id}`;

            if (type != 1) {
                if (type == 2) {
                    url += `&city=1`;
                } //同城

                if (type == 3) {
                    url += `&reserve=1`;
                } //预订
            }

            uni.navigateTo({
                url
            });
        },

        rePage(e) {
            var id = e.currentTarget.dataset.id;

            if (this.shopType == 'book') {
                uni.navigateTo({
                    url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id + '&reserve=1'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id + '&city=1'
                });
            }
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css'; /* pages/shopHome/components/ToCity/ToCity.wxss */

.shop_city {
    margin: 20rpx 0rpx;
}

.list-top-msg {
    width: 470rpx;
    height: 76rpx;
    color: #fff;
    border-radius: 8rpx;
    padding: 12rpx 18rpx;
    margin: 0 auto;
    font-size: 18rpx;
    font-weight: bold;
}

.top-msg-bg1 {
    background-color: #111833;
}

.top-msg-bg2 {
    background-color: #95b966;
}

.top-msg-bg3 {
    background-color: #202021;
}

.top-msg-bg4 {
    background-color: #ffbb38;
}

.city_info {
    width: 368rpx;
    height: 502rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
}

.city {
    margin-top: 20rpx;
}

.goods-img {
    width: 312rpx;
    height: 312rpx;
    margin: 10rpx;
}

.city {
    flex-wrap: wrap;
}

.city_desc {
    color: #333333;
    font-size: 26rpx;
    font-weight: bold;
    margin: 20rpx;
    -webkit-line-clamp: 2;
    height: 80rpx;
}

.city_desc2 {
    color: #333333;
    font-size: 26rpx;
    font-weight: bold;
    margin: 20rpx;
    height: 66rpx;
}

.btn_price {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    border-radius: 30px;
    font-size: 24rpx;
    width: 130rpx;
    height: 40rpx;
    text-align: center;
    font-weight: bold;
}

.city_pay {
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
    font-weight: bold;
}

.city {
    margin-top: 20rpx;
}

/* 模板6 */
.temp2-pro-bg {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.temp2_btn_price {
    background-size: 100% 100%;
    color: #fff;
    font-size: 24rpx;
    width: 150rpx;
    height: 46rpx;
    text-align: center;
    line-height: 46rpx;
}

/* 模板7 */
.br_black {
    border: 1px solid #ededed;
}

.city_info3 {
    width: 368rpx;
    height: 520rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
}

.city_pay3_btn {
    width: 210rpx;
    height: 70rpx;
    background-size: 100% 100%;
    text-align: center;
    line-height: 90rpx;
    color: #fff;
    font-weight: bold;
}
.u-line-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.city_desc3 {
    color: #333333;
    font-size: 26rpx;
    font-weight: bold;
    margin: 20rpx 20rpx 0rpx;
    -webkit-line-clamp: 2;
    height: 80rpx;
}

/* 模板8 */
.city_info4 {
    width: 368rpx;
    height: 368rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    border-radius: 8rpx;
    position: relative;
}

.goods-img2 {
    width: 100%;
    height: 100%;
}

.product4-item2-msg {
    position: absolute;
    width: 100%;
    bottom: 0rpx;
    height: 116rpx;
    background-size: 100% 100%;
}

.product4-item2-btn1 {
    position: absolute;
    width: 128rpx;
    bottom: 20rpx;
    height: 40rpx;
    background-size: 100% 100%;
    right: 0rpx;
    color: #fff;
    font-size: 22rpx;
    text-align: center;
    line-height: 40rpx;
}

.product4-item2-btn2 {
    position: absolute;
    width: 272rpx;
    bottom: 80rpx;
    height: 54rpx;
    background-size: 100% 100%;
    left: 0rpx;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
    line-height: 54rpx;
}

.temp4_price2 {
    margin: 40rpx 15rpx 0rpx;
    font-size: 40rpx;
    color: #ff0202;
    font-weight: bold;
}

/* 模板1-4 */

.toCity {
    width: 100%;
}

.temp-box-31 > view:first-child {
    /* background: linear-gradient(90deg, #FECCB5 0%, #FFB7B8 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); color:#8B2723; */
    background-color: #fff;
    /* box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.082); */
}

.temp-box-31 > view:last-child {
    /* background: linear-gradient(90deg, #CDD9FF 0%, #D6CEFF 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); color:#3D62C6; */
    background-color: #fff;
    /* box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.082); */
}

.temp-box-1 > view:first-child {
    background: linear-gradient(90deg, #feccb5 0%, #ffb7b8 100%);
    /* box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); */
    color: #8b2723;
}

.temp-box-1 > view:last-child {
    background: linear-gradient(90deg, #cdd9ff 0%, #d6ceff 100%);
    /* box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); */
    color: #3d62c6;
}

.temp-box-4 > view:first-child {
    background: linear-gradient(269deg, #fa8ac5 0%, #fdc5de 100%);
    /* box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); */
    color: #fff;
}

.temp-box-4 > view:last-child {
    background: linear-gradient(90deg, #6e89fd 0%, #a162f7 100%);
    /* box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01); */
    color: #fff;
}

.temp-box-3 > view:first-child,
.temp-box-3 > view:last-child {
    background: linear-gradient(90deg, #d9d9d9 0%, #6a6a6a 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.01);
    color: #333;
}

.book {
    width: 339rpx;
    overflow: hidden;
    height: 354rpx;
    background-color: #fff;
    border-radius: 15rpx;
    position: relative;
    margin-bottom: 60rpx;
}

.right_img {
    width: 14rpx;
    height: 24rpx;
}

.title {
    padding: 20rpx;
    padding-bottom: 0rpx;
    margin-bottom: 15rpx;
}

.item_name {
    font-size: 28rpx;
    font-weight: bold;
}

.item_desc {
    font-size: 20rpx;
}

.sub-title {
    box-sizing: border-box;
    padding-left: 20rpx;
    position: relative;
    bottom: 10rpx;
}

.product1_list {
    padding: 10rpx;
    box-sizing: border-box;
    width: 312rpx;
    margin: 0 auto;
    border-radius: 12rpx;
}

.product_info {
    margin-right: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
}

.product_img {
    width: 132rpx;
    height: 132rpx;
    border-radius: 10rpx 10rpx 0 0;
}

.product_name {
    width: 130rpx;
    font-size: 24rpx;
    margin: 10rpx 0rpx 0rpx;
    color: #333;
}

.price_info {
    color: #ff5757;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.product_price {
    font-size: 24rpx;
}

.price {
    font-size: 30rpx;
}

.book2 {
    background-color: #fff;
    height: 336rpx;
    border-radius: 24rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
}

.title_info {
    width: 100%;
}

.item2_name {
    font-size: 28rpx;
    font-weight: bold;
}

.item2_desc {
    font-size: 20rpx;
    color: #666666;
}

.product2_list {
    margin-top: 20rpx;
}
</style>
