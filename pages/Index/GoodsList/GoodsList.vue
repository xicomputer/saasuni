<template>
    <view>
        <!-- 商品列表 -->
        <view class="goods-list">
            <navigator class="good-item" :url="'../GoodsDetails/GoodsDetails?id=' + item.id" v-for="(item, index) in goodsList" :key="index">
                <image class="good-img" :src="item.thumbnail" mode="aspectFill" style="width: 200rpx; height: 200rpx"></image>

                <view class="good-info-list">
                    <view class="good-top">
                        <view class="good-name">{{ item.commodityName }}</view>
                        <view class="good-describe">{{ item.description }}</view>
                    </view>
                    <view class="good-bottom">
                        <view class="good-price-box">
                            <view class="good-activity-price">
                                <text style="font-size: 22rpx">￥</text>
                                {{ item.activityType == 1 || (item.activityType == 2 && item.isMember) ? item.lowPrice : item.originalPrice }}
                            </view>
                            <view class="good-original-price" v-if="item.activityType == 1 || (item.activityType == 2 && item.isMember)">￥{{ item.originalPrice }}</view>
                        </view>
                        <view class="buy-btn" @tap.stop.prevent="goBuy" :data-item="item">
                            <text class="buy-btn-statu">立即下单</text>
                        </view>
                    </view>
                </view>
            </navigator>
        </view>
        <!-- 底部 -->
        <view class="daodile">——信书技术支持——</view>
        <!-- 下单 -->
        <van-popup :show="show" round closeable position="bottom" @close="onClose" :close-on-click-overlay="false">
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
                        <!-- <button class="btn buy-btn" catchtap="handleBuy">立即购买</button> -->
                        <button class="btn buy-btn" @tap.stop.prevent="surexf">立即购买</button>
                    </view>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
// import vanPopup from './@vant/weapp/popup/index';
// import vanOverlay from './@vant/weapp/overlay/index';
const app = getApp();
export default {
    components: {
        // vanPopup,
        // vanOverlay
    },
    // "navigationBarBackgroundColor": "#783705",
    data() {
        return {
            goodsList: [],
            marchantId: '',
            classifyId: '',
            category: '',
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

            //购买数量,
            // openOverlay:false,//下单方式弹框
            index: 0,

            //方式索引
            orderType: 0,

            skuitem: {
                active: false,
                id: '',
                imageUrl: false,
                thumbnail: '',
                itemText: ''
            }
        };
    },
    // "navigationBarTextStyle": "white"

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId,
            classifyId: options.classifyId,
            orderType: options.orderType
        });
        uni.setNavigationBarTitle({
            title: options.category + '系列'
        });
        this.getCategoryGoods();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
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
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */ methods: {
        getCategoryGoods() {
            var data = {
                marchantId: this.marchantId,
                classifyId: this.classifyId,
                pageCurr: 1,
                pageSize: 10
            };
            app.globalData.sjrequest('/commodity/queryCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        goodsList: res.data.data
                    });
                }
            });
        },

        // 去下单
        goBuy(e) {
            var item = e.currentTarget.dataset.item;
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
            let that = this;
            var data = {
                commodityId: commodityId,
                marchantId: this.marchantId
            };
            app.globalData.sjrequest('/commodity/queryCommoSku', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
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
        onClose() {
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
            if (this.goodsData.stock == 0) {
                uni.showToast({
                    title: '暂无库存',
                    icon: 'none'
                });
                return;
            }

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

        //  // 下单方式弹框
        //  handleBuy() {
        //   if(this.data.skuActive==null){
        //     wx.showToast({
        //       title:'请选择规格',
        //       icon:'none'
        //     })
        //     return
        //   }
        //   this.setData({
        //     show: false,
        //     // openOverlay:true
        //   })
        // },
        // //关闭下单方式
        // closexf(){
        //   this.setData({
        //       openOverlay:false
        //   })
        //   this.setData({
        //       index:0
        //   })
        // },
        // //选择消费方式
        // checkxf(e){
        //   this.setData({
        //       index:e.currentTarget.dataset.index
        //   })
        // },
        //确认下单
        surexf() {
            // if(this.data.index===0){
            //   wx.showToast({
            //     title: '请选择一种消费方式'
            //   })
            // }else{
            // this.setData({
            //     openOverlay:false
            // })
            if (this.goodsData.stock == 0) {
                uni.showToast({
                    title: '暂无库存',
                    icon: 'none'
                });
                return;
            }

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
        }
    }
};
</script>
<style>
page {
    padding: 20rpx;
    box-sizing: border-box;
    background: #f2f2f2;
}
/* 头部 */
.goods-head {
    height: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.goods-head-img {
    width: 42rpx;
    height: 42rpx;
}
.good-head-text {
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
/* 秒杀商品列表 */
.good-item {
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: white;
    margin-top: 20rpx;
    border-radius: 20rpx;
}
.good-info-list {
    width: 0;
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.good-top {
    margin-top: 10rpx;
}
.good-name {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #333333;
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
    align-items: flex-end;
}
.good-price-box {
    display: flex;
    align-items: center;
}
.good-activity-price {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40rpx;
    color: #ff5340;
}
.good-original-price {
    height: 30rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 30rpx;
    color: #cccccc;
    margin-left: 5rpx;
    text-decoration: line-through;
}
.buy-btn {
    width: 128rpx;
    height: 60rpx;
    background: #ff5340;
    border-radius: 5rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.buy-btn-statu {
    height: 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 30rpx;
    color: #ffffff;
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
.popup-content-header {
    display: flex;
    padding: 24px 0 8px 18px;
    border-bottom: 1px solid #cccccc;
}
.goods-img {
    width: 107px;
    height: 107px;
}

.goods-info {
    flex: 1;
    padding-left: 13px;
}
.money {
    font-size: 18px;
    color: #ec1919;
}
.stock {
    font-size: 14px;
    color: #999999;
    margin-top: 21px;
}
.tips {
    font-size: 12px;
    color: #999999;
    margin-top: 18px;
}
.popup-content-body {
    padding: 15px 0 0 25px;
    border-bottom: 1px solid #cccccc;
}
.title {
    font-size: 14px;
}

.norms-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
}

.norms-item {
    padding-left: 4px;
    padding-right: 4px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 36px;
    height: 36px;
    background: #f6f6f6;
    margin-right: 15px;
    margin-top: 7px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
}
.sku-img {
    width: 29px;
    height: 29px;
    line-height: 36px;
}
.spec-name {
    margin: 0 10px;
}
.norms-active {
    background: rgba(250, 51, 78, 0.05);
    border: 1px solid rgba(236, 25, 25, 1);
    border-radius: 3px;
}
.buy-num {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
}
.label {
    flex: 1;
    font-size: 14px;
}
.c-btn {
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    width: 34px;
    height: 22px;
}
.num {
    width: 40px;
}
.num.disabled {
    color: #999999;
}
.footer {
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.span {
    width: 160px;
    line-height: 44px;
    text-align: center;
    border-radius: 22px;
    color: #ffffff;
    font-size: 16px;
}

.add {
    background: #e7a124;
    margin-right: 25px;
}

.purchase {
    background: #101010;
}
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
.overlay .box {
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
</style>
