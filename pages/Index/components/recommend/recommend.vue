<template>
    <view>
        <!-- <view class=' top-container'>
        <view class='me-fx-row me-fx-sb-c top-search-container'>
            <view class='me-fx-row me-fx-start-c top-search'>
                <image class='search-icon' src='../../static/search-icon.png'></image>
                <view>请输入商品名称</view>
            </view>
            <button class='notice-btn'>商品通知</button>
        </view>
        <view class='me-fx-row me-fx-sb-c top-tab-list'>
            <view class='top-tab-item {{selTabItem==item.id?"sel-tab-item":""}}' 
                wx:for='{{topTabList}}' wx:key='index' bindtap='switchTopTab'
                data-tid='{{item.id}}'
            >{{item.name}}</view>
        </view>
    </view> -->

        <view class="goods-list">
            <!-- 横向 -->
            <scroll-view v-if="typeModel == 0" :scroll-y="true" class="goods-scroll">
                <view class="me-fx-row me-fx-sb list-container">
                    <view class="goods-item" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods-img"></image>

                        <view class="goods-info">
                            <view class="describe-text">{{ item.commodityName }}</view>
                            <view class="describe-desc">{{ item.description }}</view>
                            <view class="me-fx-row me-fx-sb-c">
                                <view class="price-box">
                                    ￥
                                    <text class="price-num">{{ item.lowPrice }}</text>
                                </view>
                                <image src="/static/pages/Index/static/red_cart.png" class="cart-img" @tap="addCartGoods" :data-item="item"></image>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <!-- 竖向 -->
            <scroll-view :scroll-y="true" class="goods-scroll" v-else>
                <view class="me-fx-col list-container2">
                    <view class="me-fx-row goods2" v-for="(item, index) in recommends" :key="index">
                        <image :src="item.thumbnail" class="goods2-img"></image>

                        <view class="goods2-info me-fx-1 me-fx-col me-fx-sb">
                            <view>
                                <view class="describe-text">{{ item.commodityName }}</view>
                                <view class="describe-desc">{{ item.description }}</view>
                            </view>
                            <view class="me-fx-row me-fx-start-c me-fx-sb">
                                <view class="price-box">
                                    ￥
                                    <text class="price-num">{{ item.lowPrice }}</text>
                                </view>
                                <view class="btn_cart11 me-fx-row me-fx-start-c">
                                    <image class="cart-img2" src="/static/pages/Index/static/cart11.png"></image>
                                    <text>立即购买</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/Index/components/recommend/recommend.js
export default {
    data() {
        return {
            typeModel: 1,
            selTabItem: 1,
            topTabList: [
                {
                    name: '推荐',
                    id: 1
                },
                {
                    name: '销量',
                    id: 2
                },
                {
                    name: '价格',
                    id: 3
                }
            ],
            goodsList: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 2
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                }
            ]
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        recommends: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTopTab(e) {
            var tid = e.currentTarget.dataset.tid;
            this.setData({
                selTabItem: tid
            });
        },

        addCartGoods(e) {
            var item = e.currentTarget.dataset.item;
            this.$emit('recommendEvent', {
                detail: {
                    eventType: 'addCart',
                    goodsInfo: item
                }
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

.top-container {
    padding: 0 30rpx;
    box-sizing: border-box;
}
.top-container .top-search-container {
    height: 80rpx;
}
.top-container .top-search {
    padding: 0 18rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 532rpx;
    height: 52rpx;
    font-size: 22rpx;
    color: #a0a0a0;
    border-radius: 26rpx;
}
.top-search .search-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 15rpx;
}
.top-container .notice-btn {
    padding: 0 15rpx;
    margin: 0;
    background-color: #fe4f4f;
    font-size: 24rpx;
    border-radius: 26rpx;
    color: #fff;
    line-height: 52rpx;
    height: 52rpx;
}

.top-container .top-tab-list {
    font-size: 28rpx;
    color: #333;
    height: 80rpx;
}
.top-container .top-tab-item {
    flex: 1;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
}
.top-container .sel-tab-item {
    font-size: 32rpx;
    color: #fe4f4f;
}

/* 商品列表 */
.goods-list {
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
}
.goods-list .goods-scroll {
    height: calc(100vh - 100rpx);
}
.goods-list .list-container {
    flex-wrap: wrap;
    padding: 30rpx 0;
}
.goods-item {
    border-radius: 20rpx;
    overflow: hidden;
    width: 336rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    flex-shrink: 0;
}
.goods-item .goods-img {
    width: 336rpx;
    height: 336rpx;
    background-color: #ccc;
}
.goods-item .goods-info {
    padding: 12rpx;
    box-sizing: border-box;
    font-size: 28rpx;
}
.describe-text {
    font-size: 32rpx;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.describe-desc {
    font-size: 28rpx;
    color: #999999;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
}
.price-box {
    font-size: 28rpx;
    color: #fe4f4f;
    font-weight: bold;
}
.price-num {
    font-size: 36rpx;
}
.cart-img {
    width: 84rpx;
    height: 84rpx;
}
.cart-img2 {
    width: 30rpx;
    height: 30rpx;
    margin-right: 5rpx;
}
.btn_cart11 {
    background-color: #fe4f4f;
    width: 150rpx;
    border-radius: 10rpx;
    padding: 5rpx 5rpx;
}
.btn_cart11 > text {
    color: #fff;
    font-size: 26rpx;
}

.goods2-info {
    padding: 20rpx;
}
.list-container2 {
    margin-top: 20rpx;
}
.goods2 {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
}
.goods2-img {
    width: 240rpx;
    height: 240rpx;
    border-radius: 20rpx;
}
</style>
