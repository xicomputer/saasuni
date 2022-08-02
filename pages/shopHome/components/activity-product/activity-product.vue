<template>
    <view style="min-height: 80vh; margin-top: 20rpx">
        <!-- 模板1 -->
        <view class="product3" v-if="tempId == 1">
            <scroll-view :scroll-x="true" class="product1_list">
                <view class="me-fx-row me-fx-start-c">
                    <block v-for="(item, index) in productList" :key="index">
                        <view :class="'List3_title me-fx-sb-c ' + (currentIndex == index ? 'cur3' : '')" @tap="titleClick" :data-idx="index">{{ item.classifyName }}</view>
                    </block>
                </view>
            </scroll-view>
            <view class="list1_shop2 me-fx-row">
                <view class="shop3_Info me-fx-col" @tap="toGoodsDetails" :data-id="item.id" v-for="(item, index) in productList[currentIndex].commodityList" :key="index">
                    <image :src="item.thumbnail"></image>

                    <text class="me-full-text">{{ item.commodityName }}</text>

                    <view class="me-fx-row addShop3 me-fx-sb me-fx-start-c">
                        <view class="shop2_money">
                            <text class="price2">￥</text>
                            <text class="red">{{ item.lowPrice }}</text>
                        </view>
                        <image src="/static/pages/static/add.png" v-if="orderSwitch"></image>
                        <view class="orderSwitch1" v-else>参考价</view>
                    </view>
                </view>
            </view>
            <view class="me-fx-row me-fx-c-c more-5" @tap="goColumn" :data-id="productList[currentIndex].id">
                <text>查看更多</text>
            </view>
        </view>
        <!-- 模板2 -->
        <view class="product3" v-else-if="tempId == 2">
            <scroll-view :scroll-x="true" class="product1_list">
                <view class="me-fx-row me-fx-start-c">
                    <block v-for="(item, index) in productList" :key="index">
                        <view :class="'List3_title me-fx-sb-c ' + (currentIndex == index ? 'curl3' : '')" @tap="titleClick" :data-idx="index">{{ item.classifyName }}</view>
                    </block>
                </view>
            </scroll-view>
            <view class="list1_shop2 me-fx-row">
                <view class="shop3_Info me-fx-col" @tap="toGoodsDetails" :data-id="item.id" v-for="(item, index) in productList[currentIndex].commodityList" :key="index">
                    <image mode="aspectFit" :src="item.thumbnail"></image>

                    <text class="me-full-text">{{ item.commodityName }}</text>

                    <view class="me-fx-row addShop3 me-fx-sb me-fx-start-c">
                        <view class="shop2_money">
                            <text class="price2s">￥</text>
                            <text class="red2">{{ item.lowPrice }}</text>
                        </view>
                        <image src="/static/pages/static/temp2_car.png" v-if="orderSwitch"></image>
                        <view class="orderSwitch2" v-else>参考价</view>
                    </view>
                </view>
            </view>
            <view class="me-fx-row me-fx-c-c more-5" @tap="goColumn" :data-id="productList[currentIndex].id">
                <text>查看更多</text>
            </view>
        </view>
        <!-- 模板3 -->
        <view class="product4" v-else-if="tempId == 3">
            <view class="product11_Info" v-for="(item, index) in productList" :key="index">
                <view class="Info2_title me-fx-row me-fx-c-c Info3_item2 lll_item2" @tap="goColumn" :data-name="item.classifyName" :data-id="item.id">
                    <image src="/static/pages/static/img_l2.png"></image>
                    <text class="add3">{{ item.classifyName }}</text>
                    <image src="/static/pages/static/img_r2.png"></image>
                    <text class="more-xxx">查看更多</text>
                </view>

                <view class="product4_content">
                    <view class="product4_shop me-fx-row">
                        <view
                            class="me-fx-col me-fx-c-c shop4_pro"
                            @tap="toGoodsDetails"
                            :data-id="item.id"
                            v-if="index < 6"
                            v-for="(item, index1) in item.commodityList"
                            :key="index1"
                        >
                            <view class="shop3_item">
                                <image :src="item.thumbnail"></image>
                                <text class="me-full-text shop3_item_name">{{ item.commodityName }}</text>
                                <view class="shop3_item_price">
                                    <text>￥</text>
                                    <text>{{ item.lowPrice }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 模板4 -->
        <view class="product5" v-else-if="tempId == 4">
            <view class="product11_Info" v-for="(item, index) in productList" :key="index">
                <view class="Info2_title me-fx-row me-fx-c-c Info11_item2" @tap="navito" :data-name="item.classifyName" :data-id="item.id">
                    <image class="leaves_d2" src="/static/pages/static/leaves_d2.png"></image>
                    <text>{{ item.classifyName }}</text>
                    <image class="leaves_x2" src="/static/pages/static/leaves_x2.png"></image>
                    <text class="more-xxx">查看更多</text>
                </view>

                <view class="Info11_item2info me-fx-row me-fx-sb">
                    <view class="me-fx-row me-fx-sb item_11Info" v-if="index < 4" v-for="(item, index1) in item.commodityList" :key="index1">
                        <view class="me-fx-row Info11_shortPro" @tap="toGoodsDetails" :data-id="item.id">
                            <image mode="aspectFit" :src="item.thumbnail"></image>
                            <view class="me-fx-col shortPro11_Info me-fx-1 me-fx-sb">
                                <text class="clamp2 Name11_Info me-full-text">{{ item.commodityName }}</text>
                                <view class="info11_price">
                                    <text class="price11_text">￥</text>
                                    <text class="Info11_money">{{ item.lowPrice }}</text>
                                </view>
                                <view class="btn_cart11 me-fx-row me-fx-start-c" v-if="orderSwitch">
                                    <image src="/static/pages/static/cart11.png"></image>
                                    <text>立即购买</text>
                                </view>
                                <view class="btn_cart11 me-fx-row me-fx-c-c" v-else>
                                    <text>参考价</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 模板5 -->
        <view class="product_last" v-if="tempId == 5">
            <block v-for="(item, index) in productList" :key="index">
                <view v-if="item.activityList.list.length">
                    <view class="me-fx-row me-fx-c-c" @tap="goColumn" :data-item="item" :style="'transform:translateX(' + 15 * (item.classifyName.length - 1) + 'rpx)'">
                        <text
                            :style="
                                'background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/border.png);transform:translateX(' + -30 * index + 'rpx)'
                            "
                            class="item_name"
                            v-for="(item, index1) in item.classifyName"
                            :key="index1"
                        >
                            {{ item }}
                        </text>
                    </view>
                    <view class="me-fx-row me-fx-c-c more" @tap="goColumn" :data-item="item">查看更多</view>
                    <view v-if="index == 0">
                        <view @tap="toGoodsDetails" :data-item="temp" class="shop1_Info me-fx-col me-fx-sb" v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                            <view class="product1_title">{{ temp.commodityName }}</view>

                            <image class="product1_img" mode="aspectFit" :src="temp.imageUrl"></image>

                            <view class="countdown countdown5" v-if="countdown">
                                <text>距结束还剩：</text>
                                <van-count-down use-slot @change="changeJfTime($event, { subs: index + '-' + ti })" :data-subs="index + '-' + ti" :time="temp.downDiffTimes">
                                    <view class="c5-main">
                                        <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                        <text v-if="temp.downTime.days != 0">天</text>
                                        <text class="c5-pd">{{ temp.downTime.hours }}</text>
                                        <text>:</text>
                                        <text class="c5-pd">{{ temp.downTime.minutes }}</text>
                                        <text>:</text>
                                        <text class="c5-pd">{{ temp.downTime.seconds }}</text>
                                    </view>
                                </van-count-down>
                            </view>

                            <view class="product1_desc me-full-text" v-else>{{ temp.commodityName }}</view>

                            <view class="product1_money me-fx-row me-fx-start-end">
                                <text>价格:</text>
                                <text class="price">￥{{ temp.lowPrice }}</text>
                                <text class="oldprice" v-if="countdown">￥{{ temp.price }}</text>
                                <image src="/static/image/tabpage/ms-btn5.png" class="price5_img" v-if="templateTag == 'JSMS'" />
                                <image src="/static/image/tabpage/to-pt5.png" class="price5_img" v-if="templateTag == 'TTPT'" />
                            </view>
                        </view>
                    </view>
                    <view class="product2_infos me-fx-row me-fx-sb" v-else>
                        <view @tap="toGoodsDetails" :data-item="temp" class="shop2_Info" v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                            <text class="me-full-text product2_desc" v-if="countdown">{{ temp.commodityName }}</text>

                            <image class="product2_img" mode="aspectFit" :src="temp.imageUrl"></image>

                            <view class="countdown countdown5 fz20" v-if="countdown">
                                <text>距结束还剩：</text>
                                <van-count-down use-slot @change="changeJfTime($event, { subs: index + '-' + ti })" :data-subs="index + '-' + ti" :time="temp.downDiffTimes">
                                    <view class="c5-main fz20">
                                        <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                        <text v-if="temp.downTime.days != 0">天</text>
                                        <text class="c5-pd">{{ temp.downTime.hours }}</text>
                                        <text>:</text>
                                        <text class="c5-pd">{{ temp.downTime.minutes }}</text>
                                        <text>:</text>
                                        <text class="c5-pd">{{ temp.downTime.seconds }}</text>
                                    </view>
                                </van-count-down>
                            </view>

                            <text class="product2_desc me-full-text me-full-line2" v-if="!countdown">{{ temp.commodityName }}</text>

                            <view class="product2_money me-fx-row me-fx-start-c">
                                <text>价格:</text>
                                <text class="price2">￥{{ temp.lowPrice }}</text>
                            </view>

                            <image src="/static/image/tabpage/ms-btn5.png" class="price5_img" v-if="templateTag == 'JSMS'" />

                            <image src="/static/image/tabpage/to-pt5.png" class="price5_img" v-if="templateTag == 'TTPT'" />
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <!-- 模板6 -->
        <view v-if="tempId == 6">
            <block v-for="(item, index) in productList" :key="index">
                <view class="product2_temp2" v-if="item.activityList.list.length">
                    <view
                        class="temp2_product me-fx-row me-fx-c-c"
                        @tap="goColumn"
                        :data-item="item"
                        style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_bg.png)"
                    >
                        <image class="right_img" src="/static/pages/static/leaves_d.png"></image>
                        <view class="temp2_item_name" style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_item_name.png)">
                            <text class="item-text me-full-text">{{ item.classifyName }}</text>
                        </view>
                        <text class="temp2_more">查看更多</text>
                    </view>
                    <view v-if="index == 0">
                        <view class="temp2_product_info" @tap="toGoodsDetails" :data-item="temp" v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                            <view class="temp2_product_info2">
                                <view
                                    class="temp2_prodct_bg"
                                    style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_long_product.png)"
                                >
                                    <view class="temp2_pro_msg me-fx-row me-fx-start-c me-fx-sb">
                                        <image mode="aspectFit" :src="temp.imageUrl" class="temp2_product1_img"></image>
                                        <view class="me-fx-col me-fx-sb temp2_product1_msg me-fx-start-c">
                                            <text class="temp2_product1_name me-full-text">{{ temp.commodityName }}</text>
                                            <view
                                                style="
                                                    background: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_desc.png);
                                                    background-size: 100% 100%;
                                                    padding: 0 20rpx;
                                                    width: 100%;
                                                "
                                            >
                                                <view class="me-fx-row me-fx-c-c countdown countdown6 fz20" v-if="countdown">
                                                    <van-count-down
                                                        use-slot
                                                        @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                        :data-subs="index + '-' + ti"
                                                        :time="temp.downDiffTimes"
                                                    >
                                                        <view class="c6-main">
                                                            <text>距结束</text>
                                                            <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                            <text v-if="temp.downTime.days != 0">天</text>
                                                            <text class="c5-pd">{{ temp.downTime.hours }}</text>
                                                            <text>:</text>
                                                            <text class="c5-pd">{{ temp.downTime.minutes }}</text>
                                                            <text>:</text>
                                                            <text class="c5-pd">{{ temp.downTime.seconds }}</text>
                                                        </view>
                                                    </van-count-down>
                                                </view>
                                                <text class="temp2_product1_btn me-full-text" v-else>{{ temp.commodityName }}</text>
                                            </view>
                                            <view class="c6-price">
                                                <text class="c6-oldprice" v-if="countdown">￥{{ temp.price }}</text>
                                                <text class="temp2_product1_price">￥{{ temp.lowPrice }}</text>
                                            </view>

                                            <view
                                                style="
                                                    background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_long_btn.png);
                                                    background-size: 100% 100%;
                                                    padding: 12rpx 20rpx;
                                                    display: flex;
                                                    align-items: center;
                                                "
                                            >
                                                <image src="/static/image/tabpage/ms-btn6.png" class="c6-btn" v-if="templateTag == 'JSMS'" />
                                                <image src="/static/image/tabpage/to-pt6.png" class="c6-btn" v-if="templateTag == 'TTPT'" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class="temp2_product_info">
                            <view class="temp2_product_info2" @tap="toGoodsDetails" :data-item="item.activityList.list[0]">
                                <view
                                    class="temp2_prodct_bg"
                                    style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_long_product.png)"
                                >
                                    <view class="temp2_pro_msg me-fx-row me-fx-start-c me-fx-sb">
                                        <image mode="aspectFit" :src="item.activityList.list[0].imageUrl" class="temp2_product1_img"></image>
                                        <view class="me-fx-col me-fx-sb temp2_product1_msg me-fx-start-c">
                                            <text class="me-full-text temp2_product1_name">{{ item.activityList.list[0].commodityName }}</text>
                                            <view
                                                style="
                                                    background: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_desc.png);
                                                    background-size: 100% 100%;
                                                    padding: 0 20rpx;
                                                "
                                            >
                                                <view class="countdown countdown6 fz20" v-if="countdown">
                                                    <text>距结束</text>
                                                    <van-count-down
                                                        use-slot
                                                        @change="changeJfTime($event, { subs: index + '-0' })"
                                                        :data-subs="index + '-0'"
                                                        :time="item.activityList.list[0].downDiffTimes"
                                                    >
                                                        <view class="c6-main">
                                                            <text v-if="item.activityList.list[0].downTime.days != 0">{{ item.activityList.list[0].downTime.days }}</text>
                                                            <text v-if="item.activityList.list[0].downTime.days != 0">天</text>
                                                            <text class="c5-pd">{{ item.activityList.list[0].downTime.hours }}</text>
                                                            <text>:</text>
                                                            <text class="c5-pd">{{ item.activityList.list[0].downTime.minutes }}</text>
                                                            <text>:</text>
                                                            <text class="c5-pd">{{ item.activityList.list[0].downTime.seconds }}</text>
                                                        </view>
                                                    </van-count-down>
                                                </view>
                                                <text class="temp2_product1_btn me-full-text" v-else>{{ item.activityList.list[0].commodityName }}</text>
                                            </view>

                                            <view class="c6-price">
                                                <text class="temp2_product1_price">￥{{ item.activityList.list[0].lowPrice }}</text>
                                                <text class="c6-oldprice" v-if="countdown">￥{{ item.activityList.list[0].price }}</text>
                                            </view>
                                            <view
                                                style="
                                                    background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_long_btn.png);
                                                    background-size: 100% 100%;
                                                    padding: 12rpx 20rpx;
                                                    display: flex;
                                                    align-items: center;
                                                "
                                            >
                                                <image src="/static/image/tabpage/ms-btn6.png" class="c6-btn" v-if="templateTag == 'JSMS'" />
                                                <image src="/static/image/tabpage/to-pt6.png" class="c6-btn" v-if="templateTag == 'TTPT'" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="temp2_product2_info">
                            <block v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                                <view class="me-fx-col temp2_prodct2_info2 me-fx-sb" @tap="toGoodsDetails" :data-item="temp" v-if="ti != 0">
                                    <view
                                        class="temp2_product2_top me-fx-row me-fx-c-c"
                                        style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_short_product.png)"
                                    >
                                        <image mode="aspectFit" :src="temp.imageUrl" class="temp2_product1_img"></image>
                                        <view
                                            class="temp2_product2_btn"
                                            style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_desc.png)"
                                        >
                                            <view class="countdown countdown6 fz20" v-if="countdown">
                                                <text>距结束</text>
                                                <van-count-down
                                                    use-slot
                                                    @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                    :data-subs="index + '-' + ti"
                                                    :time="temp.downDiffTimes"
                                                >
                                                    <view class="c6-main">
                                                        <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                        <text v-if="temp.downTime.days != 0">天</text>
                                                        <text class="c5-pd">{{ temp.downTime.hours }}</text>
                                                        <text>:</text>
                                                        <text class="c5-pd">{{ temp.downTime.minutes }}</text>
                                                        <text>:</text>
                                                        <text class="c5-pd">{{ temp.downTime.seconds }}</text>
                                                    </view>
                                                </van-count-down>
                                            </view>
                                            <text class="me-full-text" v-else>{{ temp.commodityName }}</text>
                                        </view>
                                    </view>
                                    <view class="temp2_product2_foot me-fx-col me-fx-start-c me-fx-sb">
                                        <view class="me-full-text temp2_product2_desc">{{ temp.commodityName }}</view>
                                        <view class="me-fx-row me-fx-sb temp2_product2_money" style="margin-bottom: 10rpx">
                                            <view class="me-fx-row me-fx-start-c">
                                                <text class="temp2_product2_price me-full-text">￥{{ temp.lowPrice }}</text>
                                                <text class="oldprice">￥{{ temp.price }}</text>
                                            </view>
                                            <view
                                                class="temp2_product2_btn2"
                                                style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/class2_short_btn.png)"
                                            >
                                                <image src="/static/image/tabpage/ms-btn6.png" class="c6-btn-min" v-if="templateTag == 'JSMS'" />
                                                <image src="/static/image/tabpage/to-pt6min.png" class="c6-btn-min" v-if="templateTag == 'TTPT'" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <!-- 模板7 -->
        <view v-if="tempId == 7">
            <block v-for="(item, index) in productList" :key="index">
                <view class="product3_temp3" v-if="item.activityList.list.length">
                    <view class="product3-item me-fx-row me-fx-sb me-fx-start-c" @tap="goColumn" :data-item="item">
                        <image class="temp3_item_img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp3_left_img.png"></image>
                        <text class="product3-item-name me-full-text">{{ item.classifyName }}</text>
                        <image class="temp3_item_img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp3_right_img.png"></image>
                    </view>
                    <view class="product3-item1" v-if="index == 0" @tap="toGoodsDetails" :data-item="item.activityList.list[0]">
                        <image class="product3-item1-img" mode="aspectFit" :src="item.activityList.list[0].imageUrl"></image>
                        <view class="product3-item1-info">
                            <text class="product3-item1-name me-full-text">{{ item.activityList.list[0].commodityName }}</text>
                            <block v-if="countdown">
                                <view class="c7-prices">
                                    <text class="c7p-price">秒杀价:¥{{ item.activityList.list[0].lowPrice }}</text>
                                    <text class="c7p-oldprice">原价:¥{{ item.activityList.list[0].price }}</text>
                                </view>
                                <view class="me-fx-row me-fx-sb">
                                    <view class="countdown countdown7">
                                        <text>距结束:</text>
                                        <van-count-down
                                            use-slot
                                            @change="changeJfTime($event, { subs: index + '-0' })"
                                            :data-subs="index + '-0'"
                                            :time="item.activityList.list[0].downDiffTimes"
                                        >
                                            <view class="me-fx-row c6-main" style="color: #333; font-size: 25rpx">
                                                <text v-if="item.activityList.list[0].downTime.days != 0">{{ item.activityList.list[0].downTime.days }}</text>
                                                <text v-if="item.activityList.list[0].downTime.days != 0">天</text>
                                                <text class="c7-txt">{{ item.activityList.list[0].downTime.hours }}</text>
                                                <text>:</text>
                                                <text class="c7-txt">{{ item.activityList.list[0].downTime.minutes }}</text>
                                                <text>:</text>
                                                <text class="c7-txt">{{ item.activityList.list[0].downTime.seconds }}</text>
                                            </view>
                                        </van-count-down>
                                    </view>
                                    <image v-if="templateTag == 'JSMS'" class="c7-btn" src="/static/image/tabpage/ms-btn7.png"></image>
                                    <image v-if="templateTag == 'TTPT'" class="c7-btn" src="/static/image/tabpage/to-pt7.png"></image>
                                </view>
                            </block>
                            <block v-else>
                                <text class="product3-item1-desc me-full-text">{{ item.activityList.list[0].commodityName }}</text>
                                <view class="me-fx-row me-fx-start-c me-fx-sb">
                                    <text class="product3-item1-price">￥{{ item.activityList.list[0].lowPrice }}</text>
                                    <text class="product3-item1-btn">全国发货</text>
                                </view>
                            </block>
                        </view>
                    </view>
                    <view class="product3-item2" v-if="index == 1">
                        <view class="me-fx-row me-fx-sb">
                            <view class="me-fx-col" @tap="toGoodsDetails" :data-item="item.activityList.list[0]">
                                <image class="product3-item2-img1" :src="item.activityList.list[0].imageUrl"></image>
                                <view class="product3-item2-info1 me-fx-row me-fx-sb">
                                    <text class="product3-item2-text me-full-text">{{ item.activityList.list[0].commodityName }}</text>
                                    <text class="product3-item2-text">￥{{ item.activityList.list[0].lowPrice }}</text>
                                </view>
                            </view>
                            <view class="me-fx-col me-fx-sb">
                                <view @tap="toGoodsDetails" :data-item="item.activityList.list[1]" v-if="item.activityList.list[1]">
                                    <image class="product3-item2-img2" :src="item.activityList.list[1].imageUrl"></image>
                                    <view class="product3-item2-info2 me-fx-row me-fx-c-c">
                                        <text class="product3-item2-text1" v-if="countdown">秒杀价</text>
                                        <text class="product3-item2-text me-fx-row">￥{{ item.activityList.list[1].lowPrice }}</text>
                                    </view>
                                </view>
                                <view @tap="toGoodsDetails" :data-item="item.activityList.list[2]" v-if="item.activityList.list[2]">
                                    <image class="product3-item2-img2" :src="item.activityList.list[2].imageUrl"></image>
                                    <view class="product3-item2-info2 me-fx-row me-fx-c-c">
                                        <text class="product3-item2-text1" v-if="countdown">秒杀价</text>
                                        <text class="product3-item2-text">￥{{ item.activityList.list[2].lowPrice }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="product3-item3" v-if="index != 1 && index != 0">
                        <block v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                            <view @tap="toGoodsDetails" :data-item="temp" class="me-fx-row product3-item3-list me-fx-start-c me-fx-sb" v-if="ti % 2 == 0">
                                <image class="product3-item3-img" :src="temp.imageUrl"></image>
                                <view class="product3-item3-info me-fx-col me-fx-sb">
                                    <text class="product3-item3-name me-full-text">{{ temp.commodityName }}</text>
                                    <block v-if="countdown">
                                        <view class="countdown countdown7">
                                            <text>距结束:</text>
                                            <van-count-down
                                                use-slot
                                                @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                :data-subs="index + '-' + ti"
                                                :time="temp.downDiffTimes"
                                            >
                                                <view class="me-fx-row c6-main" style="color: #333; font-size: 25rpx">
                                                    <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                    <text v-if="temp.downTime.days != 0">天</text>
                                                    <text class="c7-txt">{{ temp.downTime.hours }}</text>
                                                    <text>:</text>
                                                    <text class="c7-txt">{{ temp.downTime.minutes }}</text>
                                                    <text>:</text>
                                                    <text class="c7-txt">{{ temp.downTime.seconds }}</text>
                                                </view>
                                            </van-count-down>
                                        </view>
                                        <view class="me-fx-row me-fx-sb">
                                            <text>¥{{ temp.lowPrice }}</text>
                                            <image v-if="templateTag == 'JSMS'" class="c7-btn" src="/static/image/tabpage/ms-btn7.png"></image>
                                            <image v-if="templateTag == 'TTPT'" class="c7-btn" src="/static/image/tabpage/to-pt7.png"></image>
                                        </view>
                                    </block>
                                    <block v-else>
                                        <text class="product3-item3-desc me-full-text">{{ temp.commodityName }}</text>
                                        <view class="me-fx-row me-fx-start-c me-fx-sb">
                                            <text class="product3-item3-price">￥{{ temp.lowPrice }}</text>
                                            <text class="product3-item3-btn">全国发货</text>
                                        </view>
                                    </block>
                                </view>
                            </view>

                            <view class="me-fx-row product3-item3-list me-fx-start-c me-fx-sb" @tap="toGoodsDetails" :data-item="temp" v-else>
                                <view class="product3-item3-info me-fx-col me-fx-sb">
                                    <text class="product3-item3-name me-full-text">{{ temp.commodityName }}</text>
                                    <block v-if="countdown">
                                        <view class="countdown countdown7">
                                            <text>距结束:</text>
                                            <van-count-down
                                                use-slot
                                                @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                :data-subs="index + '-' + ti"
                                                :time="temp.downDiffTimes"
                                            >
                                                <view class="me-fx-row c6-main" style="color: #333; font-size: 25rpx">
                                                    <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                    <text v-if="temp.downTime.days != 0">天</text>
                                                    <text class="c7-txt">{{ temp.downTime.hours }}</text>
                                                    <text>:</text>
                                                    <text class="c7-txt">{{ temp.downTime.minutes }}</text>
                                                    <text>:</text>
                                                    <text class="c7-txt">{{ temp.downTime.seconds }}</text>
                                                </view>
                                            </van-count-down>
                                        </view>
                                        <view class="me-fx-row me-fx-sb">
                                            <text>¥{{ temp.lowPrice }}</text>
                                            <image v-if="templateTag == 'JSMS'" class="c7-btn" src="/static/image/tabpage/ms-btn7.png"></image>
                                            <image v-if="templateTag == 'TTPT'" class="c7-btn" src="/static/image/tabpage/to-pt7.png"></image>
                                        </view>
                                    </block>
                                    <block v-else>
                                        <text class="product3-item3-desc me-full-text">{{ temp.commodityName }}</text>
                                        <view class="me-fx-row me-fx-start-c me-fx-sb">
                                            <text class="product3-item3-price">￥{{ temp.lowPrice }}</text>
                                            <text class="product3-item3-btn">全国发货</text>
                                        </view>
                                    </block>
                                </view>
                                <image class="product3-item3-img" :src="temp.imageUrl"></image>
                            </view>
                        </block>
                    </view>
                    <view class="me-fx-row me-fx-c-c">
                        <text class="product3-more" @tap="goColumn" :data-item="item">查看更多</text>
                    </view>
                </view>
            </block>
        </view>
        <!-- 模板8 -->
        <view v-if="tempId == 8">
            <block v-for="(item, index) in productList" :key="index">
                <view class="product4_temp1" v-if="item.activityList.list.length">
                    <image class="temp4-header-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_bg_header.png"></image>
                    <view class="product4-item me-fx-row me-fx-sb me-fx-start-c" @tap="goColumn" :data-item="item">
                        <view class="product4-item-title me-fx-row me-fx-c-c">
                            <text class="product4-item-name me-full-text">{{ item.classifyName }}</text>
                            <text class="more4">查看更多 >>></text>
                        </view>
                    </view>
                    <block v-if="index == 0">
                        <view class="me-fx-col me-fx-c-c product4-item1-prolist">
                            <block v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                                <view class="product4-shop-info" @tap="toGoodsDetails" :data-item="temp">
                                    <image class="product4-item-pro1" :src="temp.imageUrl"></image>
                                    <view v-if="countdown" class="c8-desc me-fx-col">
                                        <view class="countdown countdown8">
                                            <van-count-down
                                                use-slot
                                                @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                :data-subs="index + '-' + ti"
                                                :time="temp.downDiffTimes"
                                            >
                                                <view class="c8-main">
                                                    <text>距结束:</text>
                                                    <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                    <text v-if="temp.downTime.days != 0">天</text>
                                                    <text class="c8-txt">{{ temp.downTime.hours }}</text>
                                                    <text>:</text>
                                                    <text class="c8-txt">{{ temp.downTime.minutes }}</text>
                                                    <text>:</text>
                                                    <text class="c8-txt">{{ temp.downTime.seconds }}</text>
                                                </view>
                                            </van-count-down>
                                        </view>
                                        <view class="c8-price me-fx-row">
                                            <text class="temp4_price">￥{{ temp.lowPrice }}</text>
                                            <text class="c8p-oldprice">￥{{ temp.price }}</text>
                                            <image class="c8_btn" v-if="templateTag == 'JSMS'" src="/static/image/tabpage/ms-btn8.png"></image>
                                            <image class="c8_btn" v-if="templateTag == 'TTPT'" src="/static/image/tabpage/to-pt8.png"></image>
                                        </view>
                                    </view>
                                    <block v-else>
                                        <view
                                            class="product4-item-msg me-fx-col"
                                            style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_info_bg.png)"
                                        >
                                            <text class="product4-msg-desc me-full-text">{{ temp.commodityName }}</text>
                                            <text class="temp4_price">￥{{ temp.lowPrice }}</text>
                                        </view>
                                        <view
                                            class="product4-item-btn1"
                                            style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn2.png)"
                                        >
                                            <text>全国发货</text>
                                        </view>
                                    </block>
                                    <view class="product4-item-btn2" style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn1.png)">
                                        <text class="me-full-text">{{ temp.commodityName }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </block>
                    <block v-else>
                        <view class="me-fx-row me-fx-sb product4-item2-prolist">
                            <block v-for="(temp, ti) in item.activityList.list" :key="temp.ti">
                                <view class="product4-pro-info2" @tap="toGoodsDetails" :data-item="temp">
                                    <image class="product4-item-pro2" :src="temp.imageUrl"></image>
                                    <view
                                        class="product4-item2-msg me-fx-col"
                                        style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_info_bg.png)"
                                    >
                                        <view class="c8-lf" v-if="countdown">
                                            <view class="countdown countdown81">
                                                <text>距结束:</text>
                                                <van-count-down
                                                    use-slot
                                                    @change="changeJfTime($event, { subs: index + '-' + ti })"
                                                    :data-subs="index + '-' + ti"
                                                    :time="temp.downDiffTimes"
                                                >
                                                    <view class="c8-main1">
                                                        <text v-if="temp.downTime.days != 0">{{ temp.downTime.days }}</text>
                                                        <text v-if="temp.downTime.days != 0">天</text>
                                                        <text class="c8-txt">{{ temp.downTime.hours }}</text>
                                                        <text>:</text>
                                                        <text class="c8-txt">{{ temp.downTime.minutes }}</text>
                                                        <text>:</text>
                                                        <text class="c8-txt">{{ temp.downTime.seconds }}</text>
                                                    </view>
                                                </van-count-down>
                                            </view>
                                        </view>
                                        <view class="me-fx-row me-fx-sb-c">
                                            <view class="c8-price1">
                                                <text class="c8-price12">￥{{ temp.lowPrice }}</text>
                                                <text class="c8-price13">￥{{ temp.price }}</text>
                                            </view>
                                            <image class="c8_btn1" v-if="templateTag == 'JSMS'" src="/static/image/tabpage/ms-btn8.png"></image>
                                            <image class="c8_btn1" v-if="templateTag == 'TTPT'" src="/static/image/tabpage/to-pt8.png"></image>
                                        </view>
                                    </view>
                                    <view
                                        class="product4-item2-btn1"
                                        v-if="!countdown"
                                        style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn2.png)"
                                    >
                                        <text>全国发货</text>
                                    </view>
                                    <view
                                        class="product4-item2-btn2"
                                        style="background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp4_btn1.png)"
                                    >
                                        <text class="me-full-text">{{ temp.commodityName }}</text>
                                    </view>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
let app = getApp();
export default {
    components: {
        // vanCountDown
    },
    data() {
        return {
            tempId: 1,
            productList: [],
            currentIndex: 0,
            JifentimeData: {},
            footImg: '/static/pages/static/foot_Img.png',
            activityLog: '',
            commodityList: [],
            id: '',

            temp: {
                ti: '',
                commodityName: '',
                imageUrl: '',
                downDiffTimes: '',

                downTime: {
                    days: 0,
                    hours: '',
                    minutes: '',
                    seconds: ''
                },

                lowPrice: '',
                price: ''
            },

            ti: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        tempId: {
            type: [String, Number],
            default: 1
        },
        marchantId: {
            type: String,
            default: ''
        },
        orderSwitch: {
            type: [Number, String]
        },
        countdown: {
            type: Boolean,
            default: false
        },
        templateTag: {
            // TJFL推荐返利 JSMS秒杀活动 TTPT拼团
            type: String,
            default: ''
        }
    },
    beforeMount: function () {
        var templateTag = this.templateTag;
        var activityLog = '';

        if (templateTag == 'JSMS') {
            activityLog = '/static/image/tabpage/c6_btn.png';
        } else if (templateTag == 'TTPT') {
            activityLog = '';
        }

        this.setData({
            activityLog
        });
        this.getDataList();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        changeJfTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var detail = e.detail;
            var subs = e.currentTarget.dataset.subs;
            var productList = this.productList;
            var [index, ti] = subs.split('-');

            for (var key in detail) {
                var value = detail[key];

                if (value < 10) {
                    detail[key] = '0' + value;
                } else {
                    detail[key] = value;
                }
            }

            productList[index].activityList.list[ti].downTime = detail;
            this.setData({
                productList
            });
        },

        titleClick(e) {
            this.setData({
                currentIndex: e.currentTarget.dataset.idx
            });
        },

        toGoodsDetails(e) {
            var item = e.currentTarget.dataset.item;
            var activityId = item.activityId;
            var type = item.templateTag;
            var url = '';

            if (type == 'JSMS') {
                url = '/pages/seckill/detail/detail?activityId=' + activityId;
            } else if (type == 'TTPT') {
                url = '/pages/group_booking/detail/detail?activityId=' + activityId;
            }

            uni.navigateTo({
                url
            });
        },

        navito(e) {
            const { name, id } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/Index/GoodsList/GoodsList?category=${name}&marchantId=${this.marchantId}&classifyId=${id}`
            });
        },

        goColumn(e) {
            var item = e.currentTarget.dataset.item;
            var { id, templateTag } = item;
            var url = '/pages/shopHome/activity_classity_list/activity_classity_list';
            url += '?classid=' + id + '&type=' + templateTag;
            uni.navigateTo({
                url
            });
        },

        _parseDate(str, resType) {
            //resType 取值 'object' | 'number'
            var a = str.split(/[^0-9]+/);
            var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
            return resType == 'number' ? date.getTime() : date;
        },

        getDataList() {
            var tempId = this.tempId;
            var templateTag = this.templateTag;
            var reqData = {
                pageSize: 30,
                currentPage: 1,
                merchantId: this.marchantId
            };

            if (tempId > 4) {
                reqData.templateTag = templateTag;
            }

            app.globalData.sjrequest1('/activityCommodityBusiness/commodityClassifyPageList', reqData).then((res) => {
                if (res.statusCode && res.data.code === 0) {
                    var data = res.data.data || {};
                    var list = data.list || [];
                    list.forEach((item) => {
                        item.activityList || (item.activityList = {});
                        var activityList = item.activityList;
                        activityList.list || (activityList.list = []);
                        var productList = activityList.list || [];
                        productList.forEach((temp) => {
                            var nowTimes = new Date().getTime();

                            var endTimes = this._parseDate(temp.endTime, 'number');

                            var diffTimes = endTimes - nowTimes;
                            temp.downDiffTimes = diffTimes;
                            temp.downTime = {
                                days: '',
                                hours: '',
                                minutes: '',
                                seconds: ''
                            };
                            var skuList = temp.activityCommoditySkuList || [];
                            var skuItem1 = skuList[0] || {};
                            temp.imageUrl = temp.bannerImgUrls[0];
                            temp.price = skuItem1.price;
                            temp.lowPrice = skuItem1.livePrice;
                        });
                    });
                    this.setData({
                        productList: list
                    });
                }
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';
@import '../../iconfont/iconfont.css';
.countdown {
    display: flex;
    align-items: center;
}
.countdown5 {
    border-radius: 10rpx;
    font-size: 32rpx;
    padding: 6rpx 20rpx;
    color: #ffb400;
    background: #02265a;
}
.countdown7 {
    color: #303030;
    font-size: 28rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.countdown8 {
    border-radius: 0 26rpx 26rpx 0;
    background: #ff0000;
    font-size: 30rpx;
    color: #fff;
    padding: 0 16rpx;
}
.c8-main {
    font-size: 30rpx;
    color: #fff;
}
.c8-price {
    align-items: center;
    width: 100%;
    padding-left: 24rpx;
    box-sizing: border-box;
}
.c8_btn {
    width: 210rpx;
    height: 60rpx;
}
.c8-price1 {
    display: flex;
    line-height: 1;
    align-items: flex-end;
}
.c8-price12 {
    color: #ff0202;
    font-size: 40rpx;
    font-weight: bold;
}
.c8-price13 {
    text-decoration: line-through;
    font-size: 24rpx;
    font-weight: bold;
    padding-left: 10rpx;
    color: #333333;
}
.c8_btn1 {
    width: 128rpx;
    height: 40rpx;
}
.c8-lf {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 16rpx;
    padding-left: 10rpx;
}
.c8_btn image {
    width: 150rpx;
    height: 32rpx;
}
.c8-desc {
    border-radius: 16rpx 100rpx 16rpx 16rpx;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40rpx 0 10rpx 0;
    align-items: flex-start;
}
.c7-txt {
    border-radius: 14rpx;
    /* padding: 4rpx; */
    width: 44rpx;
    height: 50rpx;
    text-align: center;
    line-height: 50rpx;
    background: #000000;
    color: #fff;
    margin: 0 4rpx;
}
.fz20 {
    white-space: nowrap;
    font-size: 20rpx;
}
.c5-main {
    color: #ffb400;
    font-size: 32rpx;
}
.countdown6 {
    font-size: 20rpx;
    color: #fff;
}
.countdown81 {
    color: #000000;
    font-size: 24rpx;
}
c6-price {
    display: flex;
    align-items: center;
}
.c6_price2 {
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.c6-btn {
    width: 204rpx;
    height: 58rpx;
}
.c6-btn-min {
    width: 95rpx;
    height: 74rpx;
}
.c7-btn {
    width: 246rpx;
    height: 70rpx;
}
.c7-btn1 {
    width: 220rpx;
    height: 56rpx;
}
.c6_btn1 {
    width: 52rpx;
    height: 52rpx;
}
.c7-prices {
    display: flex;
    justify-content: center;
    align-items: center;
}
.c7p-price {
    font-size: 40rpx;
    color: #090808;
    font-weight: bold;
}
.c7p-oldprice {
    padding-left: 74rpx;
    color: #ffb400;
    font-size: 24rpx;
    text-decoration: line-through;
}
.c8p-oldprice {
    color: #ffb400;
    font-size: 30rpx;
    text-decoration: line-through;
    font-weight: bold;
    flex: 1;
    padding: 0 30rpx;
    box-sizing: border-box;
}
.c6-oldprice {
    color: #ffb400;
    font-size: 24rpx;
    padding-right: 10rpx;
    text-decoration: line-through;
}
.c6-main {
    color: #303030;
    font-size: 20rpx;
    color: #fff;
}
.c5-pd {
    padding: 0 4rpx;
    color: #fff;
}
.price5_img {
    width: 204rpx;
    height: 60rpx;
}
.price5_imgs {
    width: 180rpx;
    height: 48rpx;
}
/* 模板5*/
.product_last {
    margin: 0rpx 32rpx;
}

.item_name {
    width: 106rpx;
    height: 106rpx;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50rpx;
    color: #ffb400;
}

.more {
    color: #ffb400;
    font-size: 20rpx;
    margin: 10rpx 0rpx;
}

.shop1_Info {
    height: 640rpx;
    border: 1px solid #ffb400;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background-color: #133f7e;
    color: #ffb400;
    padding: 20rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product1_title {
    font-size: 40rpx;
    font-weight: bold;
}

.product1_img {
    width: 370rpx;
    height: 370rpx;
    border-radius: 8rpx;
}

.product1_desc {
    font-size: 34rpx;
    -webkit-line-clamp: 2;
}

.product1_money {
    font-size: 34rpx;
    line-height: 1;
}

.oldprice {
    font-size: 24rpx;
    color: #ffb400;
    padding-right: 48rpx;
    text-decoration: line-through;
}

.price {
    font-size: 50rpx;
    font-weight: bold;
    padding: 0rpx 20rpx;
}

.price_btn {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 30rpx;
    height: 60rpx;
    width: 180rpx;
    text-align: center;
    line-height: 60rpx;
}

.product2_infos {
    flex-wrap: wrap;
}

.shop2_Info {
    width: 330rpx;
    border: 1px solid #ffb400;
    background-color: #133f7e;
    border-radius: 10rpx;
    color: #ffb400;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0 10rpx 0;
    margin-bottom: 20rpx;
}

.product2_img {
    width: 296rpx;
    height: 296rpx;
    margin: 10rpx 0;
    border-radius: 8rpx;
}

.product2_money {
    font-size: 26rpx;
    line-height: 1;
    padding: 10rpx 0;
}

.product2_desc {
    font-size: 30rpx;
    padding: 0rpx 20rpx;
    line-height: 32rpx;
}

.price2 {
    font-size: 42rpx;
    font-weight: bold;
}

.price2_btn {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 30rpx;
    height: 48rpx;
    width: 180rpx;
    text-align: center;
    line-height: 48rpx;
}

.more {
    color: #ffb400;
    font-size: 20rpx;
    margin: 10rpx 0rpx;
}

.shop1_Info {
    height: 660rpx;
    border: 1px solid #ffb400;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background-color: #133f7e;
    color: #ffb400;
    padding: 20rpx;
    box-sizing: border-box;
}
.product1_title {
    font-size: 40rpx;
    font-weight: bold;
}
.product1_img {
    width: 370rpx;
    height: 370rpx;
    border-radius: 8rpx;
}
.product1_desc {
    font-size: 34rpx;
    -webkit-line-clamp: 2;
}
.product1_money {
    font-size: 34rpx;
    width: 100%;
}
.price {
    font-size: 50rpx;
    font-weight: bold;
    padding: 0rpx 20rpx;
}
.price_btn {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 30rpx;
    height: 60rpx;
    width: 180rpx;
    text-align: center;
    line-height: 60rpx;
    font-style: italic;
}
.shop1_Info .down-count-str {
    padding: 3rpx 20rpx;
    font-size: 32rpx;
    color: #ffb400;
    background-color: #02265a;
    border-radius: 10rpx;
}

.product2_infos {
    flex-wrap: wrap;
}
.shop2_Info {
    width: 330rpx;
    border: 1px solid #ffb400;
    height: 488rpx;
    background-color: #133f7e;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    color: #ffb400;
}
.product2_img {
    width: 296rpx;
    height: 296rpx;
    margin-top: 10rpx;
    border-radius: 8rpx;
}
.product2_money {
    font-size: 26rpx;
}
.product2_desc {
    font-size: 26rpx;
    padding: 0rpx 50rpx;
}
.price2 {
    font-size: 42rpx;
    font-weight: bold;
}
.price2_btn {
    background: linear-gradient(93deg, #fef3c2 0%, #b27e2e 33%, #f2e3b8 66%, #d2a04b 100%);
    color: #121212;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 30rpx;
    height: 48rpx;
    width: 180rpx;
    text-align: center;
    line-height: 48rpx;
    margin-bottom: 20rpx;
}
.shop2_Info .down-count-str {
    padding: 3rpx 20rpx;
    font-size: 20rpx;
    color: #ffb400;
    background-color: #02265a;
    border-radius: 10rpx;
    margin-top: 16rpx;
}

/* 模板6 */
.temp2_product {
    height: 190rpx;
    background-size: 100% 100%;
    position: relative;
}

.right_img {
    width: 48rpx;
    height: 48rpx;
    padding-top: 30rpx;
    padding-right: 18rpx;
}

.temp2_item_name {
    width: 476rpx;
    height: 106rpx;
    background-size: 100% 100%;
    margin-bottom: 20rpx;
    font-size: 50rpx;
    color: #008123;
    font-weight: bold;
    line-height: 106rpx;
    display: flex;
    justify-content: center;
    letter-spacing: 10rpx;
}

.item-text {
    width: 450rpx;
    text-align: center;
}

.temp2_more {
    position: absolute;
    bottom: 10rpx;
    color: #008123;
    font-size: 23rpx;
    padding-left: 48rpx;
}

.temp2_product_info {
    background-color: #fffde0;
    margin: 0rpx 20rpx 20rpx;
    padding: 15rpx;
}

.temp2_product_info2 {
    border: 1px solid #aab966;
    width: 100%;
    height: 100%;
}

.temp2_prodct_bg {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}

.temp2_product1_img {
    width: 264rpx;
    height: 264rpx;
    flex-shrink: 0;
}

.temp2_pro_msg {
    height: 100%;
    padding-left: 40rpx;
    padding-right: 40rpx;
}

.temp2_product1_msg {
    width: 280rpx;
    height: 240rpx;
}

.temp2_product1_name {
    font-size: 32rpx;
    font-weight: bold;
    color: #080808;
    border-bottom: 6rpx solid #aab966;
    text-align: center;
}

.temp2_product1_btn {
    height: 46rpx;
    width: 100%;
    color: #fff;
    font-size: 20rpx;
    background-size: 100% 100%;
    text-align: center;
    line-height: 46rpx;
}

.temp2_product1_price {
    color: #c0222a;
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
}

.temp2_product1_btn2 {
    font-size: 26rpx;
    color: #fff;
}

.temp2_product2_info {
    display: flex;
    margin: 0rpx 20rpx;
    flex-wrap: wrap;
    justify-content: space-between;
}

.temp2_prodct2_info2 {
    height: 520rpx;
    background-color: #fffde0;
    width: 350rpx;
    margin-bottom: 20rpx;
}

.temp2_product2_top {
    background-size: 100% 100%;
    height: 330rpx;
    margin: 15rpx;
    position: relative;
    border: 1px solid #aab966;
}

.temp2_product2_btn {
    position: absolute;
    text-align: center;
    bottom: -30rpx;
    width: 200rpx;
    height: 60rpx;
    background-size: 100% 100%;
    color: #fff;
    font-size: 28rpx;
    line-height: 60rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
}

.temp2_product2_foot {
    background: linear-gradient(90deg, #6da96a 0%, #37926e 100%);
    /* height: 130rpx; */
    /* padding: 0rpx 50rpx; */
    color: #fff;
}

.temp2_product2_desc {
    font-size: 25rpx;
}

.temp2_product2_btn2 {
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    padding: 12rpx 20rpx;
}

.temp2_product2_btn2 > text {
    font-size: 26rpx;
    font-weight: bold;
    width: 60rpx;
    display: block;
    line-height: 28rpx;
}

.temp2_product2_money {
    margin-bottom: 5px;
    width: 100%;
    align-items: center;
}

.temp2_product2_price {
    color: #c0222a;
    font-size: 36rpx;
    font-weight: bold;
}

/* 模板7 */
.product3_temp3 {
    color: #fff;
}

.temp3_item_img {
    width: 174rpx;
    height: 30rpx;
    flex-shrink: 0;
}

.product3-item {
    margin: 0rpx 60rpx;
}

.product3-item-name {
    font-weight: bold;
    font-size: 40rpx;
}

.product3-item1 {
    margin: 20rpx;
    border-top-right-radius: 60rpx;
    border-top-left-radius: 60rpx;
    background-color: #fff;
    overflow: hidden;
}

.product3-item1-img {
    width: 100%;
    height: 860rpx;
}

.product3-item1-info {
    height: 208rpx;
    color: #000;
    background-color: #fff;
    margin: 20rpx;
}

.product3-item1-name {
    font-weight: bold;
    font-size: 32rpx;
}

.product3-item1-desc {
    color: #6f6f6f;
    font-size: 28rpx;
    -webkit-line-clamp: 2;
}

.product3-item1-price {
    font-size: 40rpx;
    font-weight: bold;
}

.product3-item1-btn {
    background-color: #000;
    color: #fff;
    padding: 5rpx 30rpx;
    font-weight: bold;
    border-radius: 20rpx;
}

.product3-item2 {
    margin: 20rpx;
}

.product3-item2-img1 {
    width: 490rpx;
    height: 490rpx;
}

.product3-item2-info1 {
    background-color: #000;
    width: 490rpx;
}

.product3-item2-info2 {
    background-color: #000;
    width: 210rpx;
    text-align: center;
}
.product3-item2-text1 {
    font-size: 24rpx;
}
.product3-item2-text {
    font-size: 24rpx;
    padding: 10rpx;
}

.product3-item2-img2 {
    width: 210rpx;
    height: 210rpx;
}

.product3-item3 {
    margin: 20rpx;
    color: #090808;
}

.product3-item3-info {
    width: 400rpx;
    height: 238rpx;
}

.product3-item3-img {
    width: 238rpx;
    height: 238rpx;
    flex-shrink: 0;
}

.product3-item3-list {
    background-color: #fff;
    height: 246rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
}

.product3-item3-name {
    font-size: 28rpx;
}

.product3-item3-desc {
    font-size: 24rpx;
    color: #494949;
    -webkit-line-clamp: 2;
}

.product3-more {
    border: 1px solid #fff;
    padding: 10rpx 38rpx;
    font-weight: bold;
    font-size: 30rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
}

.product3-item3-price {
    font-size: 36rpx;
    color: #090808;
    font-weight: bold;
}

.product3-item3-btn {
    background-color: #000;
    color: #fff;
    padding: 5rpx 30rpx;
    font-weight: bold;
    border-radius: 20rpx;
}

/* 模板8 */
.temp4-header-img {
    height: 100rpx;
    width: 100%;
}

.product4_temp1 {
    background-color: #1c3c9c;
    border-radius: 40rpx;
    /* border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx; */
    margin-bottom: 20rpx;
}

.product4-item-title {
    background-color: #b81a20;
    border-radius: 10rpx;
    height: 88rpx;
    margin-bottom: 20rpx;
    position: relative;
    width: 100%;
}

.product4-item-name {
    font-size: 40rpx;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2rpx;
    width: 400rpx;
    text-align: center;
}

.more4 {
    color: #fff;
    position: absolute;
    right: 40rpx;
    font-size: 26rpx;
}

.product4-item {
    margin: 20rpx;
}

.product4-item-pro1 {
    width: 620rpx;
    height: 620rpx;
    border-radius: 16rpx;
}

.product4-shop-info {
    position: relative;
    margin-bottom: 20rpx;
}

.product4-item-msg {
    position: absolute;
    width: 100%;
    bottom: 0rpx;
    height: 208rpx;
    background-size: 100% 100%;
}

.product4-item-btn1 {
    position: absolute;
    width: 184rpx;
    bottom: 40rpx;
    height: 60rpx;
    background-size: 100% 100%;
    right: 0rpx;
    color: #fff;
    font-size: 26rpx;
    text-align: center;
    line-height: 60rpx;
}

.product4-item-btn2 {
    position: absolute;
    width: 338rpx;
    bottom: 160rpx;
    height: 80rpx;
    background-size: 100% 100%;
    left: 0rpx;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    line-height: 80rpx;
}

.product4-msg-desc {
    margin: 50rpx 15rpx 0rpx;
    color: #000000;
    width: 460rpx;
}

.temp4_price {
    font-size: 55rpx;
    color: #ff0202;
    font-weight: bold;
}

.product4-item2-prolist {
    flex-wrap: wrap;
    margin: 20rpx;
}

.product4-item-pro2 {
    width: 350rpx;
    height: 350rpx;
    border-radius: 16rpx;
}

.product4-pro-info2 {
    position: relative;
    margin-bottom: 20rpx;
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
.c8-main1 {
    font-size: 24rpx;
    color: #333;
}
.product4-item2-btn2 {
    position: absolute;
    width: 272rpx;
    bottom: 100rpx;
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

/* 模板2 */
.product3 {
    margin: 32rpx;
}

.List3_title {
    margin-right: 70rpx;
    font-size: 26rpx;
    color: #fff;
}

.product1_list .cur3 {
    background: #fe4f4f;
    color: #fff;
    padding: 0rpx 20rpx;
    border-radius: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
}

.list1_shop2 {
    flex-wrap: wrap;
    justify-content: space-between;
}

.list1_shop2:after {
    content: '';
    width: 320rpx;
    height: 0px;
    visibility: hidden;
}

.product1_list .curl3 {
    background: #fff;
    color: #000;
    padding: 0rpx 20rpx;
    border-radius: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
}

.shop3_Info {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    width: 320rpx;
    margin: 20rpx 0 0;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
}

.shop3_Info > image {
    width: 320rpx;
    height: 320rpx;
}

.shop3_Info > text {
    padding: 10rpx 20rpx;
    font-size: 24rpx;
    height: 24rpx;
    font-weight: 300;
}

.addShop3 {
    padding: 0rpx 10rpx 10rpx;
}

.addShop3 > image {
    width: 50rpx;
    height: 50rpx;
}

.product1_list {
    box-sizing: border-box;
    border-radius: 20rpx;
    padding: 16rpx;
    white-space: nowrap;
}

.more-5 {
    margin-top: 20rpx;
    color: #000;
}

.more-5 > text {
    background-color: #fff;
    border-radius: 18rpx;
    padding: 5rpx 20rpx;
    font-size: 28rpx;
}

/* 模板3 */
.product4 {
    margin: 32rpx;
}

.Info11_item2 {
    background-color: #9ec06c;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
}

.Info11_item2 > text {
    padding: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
}

.Info11_item2 > text.more_text {
    font-size: 22rpx;
}

.product11_Info {
    margin-bottom: 20rpx;
}

.Info11_item2info {
    flex-wrap: wrap;
}

.Info11_list {
    width: 314rpx;
    height: 556rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.Info11_list image {
    width: 314rpx;
    height: 334rpx;
}

.btn_cart11 {
    background-color: #9ec06c;
    width: 150rpx;
    border-radius: 10rpx;
    padding: 5rpx 5rpx;
}

.btn_cart11 > image {
    width: 30rpx;
    height: 30rpx;
    padding-right: 10rpx;
}

.clamp2 {
    -webkit-line-clamp: 2;
}

.item_11Info {
    margin-bottom: 20rpx;
}

.btn_cart11 > text {
    color: #fff;
    font-size: 26rpx;
}

.info11_price {
    color: #f16e2a;
}

.Info11_money {
    font-weight: bold;
    font-size: 32rpx;
    text-overflow: ellipsis;
    width: 132rpx;
    display: inline-block;
    overflow: hidden;
    float: right;
}

.shortPro11_Info {
    padding: 20rpx;
    width: 158rpx;
}

.Name11_Info {
    font-size: 28rpx;
    height: 96rpx;
}

.price11_text {
    font-size: 24rpx;
}

.Shop11_Info {
    padding: 20rpx;
}

.Shop11_Info > text {
    font-size: 32rpx;
}

.Info11_item {
    width: 354rpx;
}

.Info11_shortPro {
    width: 330rpx;
    height: 270rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
}

.Info11_shortPro > image {
    height: 270rpx;
    width: 168rpx;
}

.shortPro_Info > text {
    padding: 10rpx;
}

.shortPro_Info .btn_cart11 {
    margin-left: 10rpx;
}

.Info11_ItemPro {
    background-color: #9ec06c;
    width: 165rpx;
    height: 270rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    position: relative;
}

.Info11_ItemPro > image {
    width: 165rpx;
    height: 270rpx;
}

.classifyName11 {
    width: 40rpx;
    font-size: 34rpx;
}

.more6 {
    position: absolute;
    width: 22rpx;
    font-size: 22rpx;
    right: 30rpx;
    bottom: 30rpx;
}

.Info3_item2 {
    background-color: rgba(0, 0, 0, 0);
}

.Info3_item2 > text {
    color: #000;
}

.product4_content {
    width: 686rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}

.shop3_item {
    color: #000;
    width: 176rpx;
    height: 258rpx;
    text-align: center;
}

.shop3_item > image {
    width: 176rpx;
    height: 176rpx;
    border-radius: 20rpx;
}

.shop3_item_name {
    font-size: 24rpx;
}

.shop3_item_price {
    text-align: center;
    font-size: 28rpx;
}

.shop4_pro {
    width: 33%;
}

.product4_shop {
    flex-wrap: wrap;
    padding: 20rpx;
}

.Info3_item2 > image {
    width: 41rpx;
    height: 22rpx;
}

.Info3_item2 > text {
    padding: 10rpx 20rpx;
}

.icon-right {
    font-size: 24rpx;
}

.lll_item2 {
    position: relative;
}

.more-xxx {
    position: absolute;
    right: 0rpx;
    font-size: 26rpx;
}

/* 模板1 */
.List3_title {
    margin-right: 70rpx;
    font-size: 26rpx;
    color: #fff;
}

.product1_list .cur3 {
    background: #fe4f4f;
    color: #fff;
    padding: 0rpx 20rpx;
    border-radius: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
}

.product1_list .curl3 {
    background: #fff;
    color: #000;
    padding: 0rpx 20rpx;
    border-radius: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
}

.shop3_Info {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    width: 320rpx;
    margin: 20rpx 0 0;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
}

.shop3_Info > image {
    width: 320rpx;
    height: 320rpx;
}

.shop3_Info > text {
    padding: 10rpx 20rpx;
    font-size: 24rpx;
    height: 24rpx;
    font-weight: 300;
}

.addShop3 {
    padding: 0rpx 10rpx 10rpx;
}

.addShop3 > image {
    width: 50rpx;
    height: 50rpx;
}

/* 4号模板 */
.Info11_item2 {
    background-color: #9ec06c;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
}

.Info11_item2 > text {
    padding: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
}

.Info11_item2 > text.more_text {
    font-size: 22rpx;
}

.product11_Info {
    margin-bottom: 20rpx;
}

.Info11_item2info {
    flex-wrap: wrap;
}

.Info11_list {
    width: 314rpx;
    height: 556rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.Info11_list image {
    width: 314rpx;
    height: 334rpx;
}

.btn_cart11 {
    background-color: #9ec06c;
    width: 150rpx;
    border-radius: 10rpx;
    padding: 5rpx 5rpx;
}

.btn_cart11 > image {
    width: 30rpx;
    height: 30rpx;
    padding-right: 10rpx;
}

.clamp2 {
    -webkit-line-clamp: 2;
}

.item_11Info {
    margin-bottom: 20rpx;
}

.btn_cart11 > text {
    color: #fff;
    font-size: 26rpx;
}

.info11_price {
    color: #f16e2a;
}

.Info11_money {
    font-weight: bold;
    font-size: 32rpx;
    text-overflow: ellipsis;
    width: 132rpx;
    display: inline-block;
    overflow: hidden;
    float: right;
}

.shortPro11_Info {
    padding: 20rpx;
    width: 158rpx;
}

.Name11_Info {
    font-size: 28rpx;
    height: 96rpx;
}

.price11_text {
    font-size: 24rpx;
}

.Shop11_Info {
    padding: 20rpx;
}

.Shop11_Info > text {
    font-size: 32rpx;
}

.Info11_item {
    width: 354rpx;
}

.Info11_shortPro {
    width: 330rpx;
    height: 270rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
}

.Info11_shortPro > image {
    height: 270rpx;
    width: 168rpx;
}

.shortPro_Info > text {
    padding: 10rpx;
}

.shortPro_Info .btn_cart11 {
    margin-left: 10rpx;
}

.Info11_ItemPro {
    background-color: #9ec06c;
    width: 165rpx;
    height: 270rpx;
    border-radius: 20rpx;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    position: relative;
}

.Info11_ItemPro > image {
    width: 165rpx;
    height: 270rpx;
}

.classifyName11 {
    width: 40rpx;
    font-size: 34rpx;
}

.leaves_d2 {
    width: 48rpx !important;
    height: 48rpx !important;
}

.leaves_x2 {
    width: 32rpx !important;
    height: 32rpx !important;
}

.Info11_item2 > image {
    width: 48rpx;
    height: 48rpx;
}

.Info2_title .add3 {
    color: #000;
    padding: 10rpx 5rpx;
}

.product5 {
    margin: 0rpx 32rpx;
}
</style>
