<template>
    <view style="min-height: 100vh">
        <view v-if="!saleGoodsListClone.length" class="no-dynamic">
            <image class="no-dynamic-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-dynamic-text">暂无数据</view>
        </view>
        <view v-else class="goods-list">
            <navigator
                class="good-item"
                :url="'/pages/Index/GoodsDetails/GoodsDetails?id=' + item.id + '&sid=' + item.tempSpecId + '&activityId=' + item.activityId"
                v-for="(item, index) in saleGoodsListClone"
                :key="index"
            >
                <image class="good-img" :src="item.thumbnail" mode="aspectFill" style="width: 100%; height: 650rpx"></image>

                <!-- <view class="sale-header me-fx-row me-fx-start-c">
        <image class="sale-header-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/sale-pro-info.png"></image>
        <van-count-down use-slot class="activity-container-content-count-down" time="{{item.remainingTime*1000}}"  bind:change="changeTime" data-index="{{index}}"  >
          <view class="list_item_onLookers">
              <text wx:if="{{item.timeData.days!=0}}">{{item.timeData.days}}</text>
              <text wx:if="{{item.timeData.days!=0}}">天</text>
              <text>{{item.timeData.hours < 10?'0'+item.timeData.hours:item.timeData.hours}}</text>
              <text>:</text>
              <text>{{item.timeData.minutes < 10?'0'+item.timeData.minutes:item.timeData.minutes}}</text>
              <text>:</text>
              <text>{{item.timeData.seconds < 10?'0'+item.timeData.seconds:item.timeData.seconds}}</text>
          </view>
        </van-count-down>
      </view> -->

                <view class="good-info-list">
                    <view class="good-top">
                        <view class="good-name-box">
                            <view class="cuxiao">秒杀</view>
                            <view class="good-name">{{ item.commodityName }}</view>
                        </view>
                        <view class="good-describe">{{ item.description }}</view>
                    </view>
                    <view class="good-bottom">
                        <view class="good-price-box">
                            <view class="good-activity-price">
                                <text style="font-size: 32rpx">￥</text>
                                {{ item.lowPrice }}
                            </view>
                            <view class="good-original-price">￥{{ item.originalPrice }}</view>
                        </view>
                        <view class="rematr-sale">
                            <view>距结束还剩:</view>
                            <van-count-down
                                v-if="item.remainingTime"
                                use-slot
                                class="activity-container-content-count-down"
                                :time="item.remainingTime * 1000"
                                @change="changeTime($event, { index })"
                                :data-index="index"
                            >
                                <view class="list_item_onLookers">
                                    <text v-if="item.timeData.days != 0">{{ item.timeData.days }}</text>
                                    <text v-if="item.timeData.days != 0" style="padding-right: 10rpx">天</text>
                                    <text class="time-box">{{ item.timeData.hours < 10 ? '0' + item.timeData.hours : item.timeData.hours }}</text>
                                    <text class="time-sybmol">:</text>
                                    <text class="time-box">{{ item.timeData.minutes < 10 ? '0' + item.timeData.minutes : item.timeData.minutes }}</text>
                                    <text class="time-sybmol">:</text>
                                    <text class="time-box">{{ item.timeData.seconds < 10 ? '0' + item.timeData.seconds : item.timeData.seconds }}</text>
                                </view>
                            </van-count-down>
                        </view>
                    </view>
                </view>
            </navigator>
            <!-- 底部 -->
            <!-- <view class="daodile">——信书技术支持——</view> -->
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
        </view>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/shopHome/components/saleList/saleList.js
const app = getApp();
export default {
    components: {
        // vanPopup,
        // vanCountDown
    },
    data() {
        return {
            marchantId: 0,
            saleGoodsListClone: [],
            skuList: [],
            buyNum: 1,
            orderType: 1,
            skuActive: null,
            show: false,

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

            orderSwitch: null,

            userInfo: {
                memberLeve: {
                    discount: 0,
                    name: ''
                }
            },

            skuitem: {
                active: false,
                id: '',
                imageUrl: false,
                thumbnail: '',
                itemText: ''
            }
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        saleGoodsList: {
            type: Array
        },
        marchantId: {
            type: [String, Number]
        },
        orderSwitch: {
            type: [Number, String]
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 促销
        getCategoryGoodsList() {
            var data = {
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryPromotionList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    this.setData({
                        saleGoodsListClone: res.data.data
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

        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            this.saleGoodsList[index].timeData = e.detail;
            this.setData({
                saleGoodsListClone: this.saleGoodsList
            });
        }
    },
    watch: {
        saleGoodsList: {
            handler: function (newVal, oldVal) {
                this.saleGoodsListClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
/* 促销 */
.no-dynamic {
    width: 100%;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-dynamic-img {
    width: 632rpx;
    height: 368rpx;
}

.no-dynamic-text {
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
    width: 50rpx;
    height: 38rpx;
    text-align: center;
    background: linear-gradient(0deg, #fe5c00 0%, #fe1a00 100%);
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
    padding-bottom: 10rpx;
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
    /* width: 160rpx;
  height: 52rpx; */
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
.sold-all {
    background-color: #999;
}
/* 底部 */
.daodile {
    font-size: 20rpx;
    text-align: center;
    color: #999999;
    font-weight: bold;
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
.sale-header {
    height: 76rpx;
    background-color: #eb1918;
    width: 100%;
    padding: 0rpx 20rpx;
}
.sale-header-img {
    width: 188rpx;
    height: 36rpx;
    flex-shrink: 0;
}
.list_item_onLookers {
    color: #ffff !important;
    padding-left: 10rpx;
    font-size: 28rpx;
    padding-right: 20rpx;
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
.sale-img-clock {
    width: 36rpx;
    height: 36rpx;
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
</style>
