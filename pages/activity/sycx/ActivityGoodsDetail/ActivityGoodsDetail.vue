<template>
    <view>
        <view>
            <view class="swiper-container">
                <swiper :indicator-dots="true" :autoplay="true" interval="3000" style="height: 500rpx" indicator-active-color="#fff">
                    <block v-for="(item, index) in detailData.commodity.imagList" :key="index">
                        <swiper-item>
                            <image :src="item" style="width: 100%; height: 500rpx" mode="aspectFill" :data-list="detailData.commodity.imagList" :data-src="item" @tap="imgClick" />
                        </swiper-item>
                    </block>
                </swiper>
                <view class="count-down" v-if="!isApp">
                    <van-count-down
                        v-if="detailData.state == 2"
                        :time="time"
                        class="aaa"
                        format="距活动结束还剩：DD 天 HH 时 mm 分 ss 秒"
                        @finish="countDownOver($event, { state: '2' })"
                        data-state="2"
                    />
                    <van-count-down
                        v-if="detailData.state == 1"
                        :time="time"
                        class="aaa"
                        format="距活动开始还剩：DD 天 HH 时 mm 分 ss 秒"
                        @finish="countDownOver($event, { state: '1' })"
                        data-state="1"
                    />
                </view>
            </view>
            <view class="goods-head">
                <view class="goods-price" style="width: 100%" v-if="detailData.commodity.activityType == 0">
                    <view style="font-size: 14px">
                        ￥
                        <text class="price">{{ DefaultSpec.originalPrice }}</text>
                    </view>
                    <view class="share-box" @tap="showShareFun">
                        <image src="/static/pages/activity/img/share.png" class="goods-share-icon" />
                        分享
                    </view>
                </view>
                <van-sticky style="width: 100%" v-else>
                    <!-- https://xssj.letterbook.cn/applet/images/sale_bg.png -->
                    <view
                        class="goods-sale-price-content"
                        v-if="detailData.commodity.activityType == 1"
                        style="background-image: url(https://xssj.letterbook.cn/applet/images/sale_bg1.png)"
                    >
                        <view class="goods-price-box">
                            <view class="no-sale-box">
                                ￥
                                <text class="origin-price">{{ DefaultSpec.lowPrice }}</text>
                            </view>
                            <view class="sale-box">
                                ￥
                                <text style="text-decoration: line-through; margin-left: 5px">{{ DefaultSpec.originalPrice }}</text>
                            </view>
                        </view>
                        <view class="sale-text">{{ detailData.commodity.commodityName }}</view>
                    </view>
                </van-sticky>
            </view>
            <view v-if="detailData.commodity.activityType == 0" class="goods-title">
                <image src="/static/pages/activity/img/ziying.png" class="ziying" />
                {{ detailData.commodity.commodityName }}
            </view>
            <view v-if="detailData.commodity.activityType == 0" class="goods-subtitle">{{ detailData.commodity.description }}</view>
            <view v-if="detailData.commodity.activityType" class="goods-subtitle-pro">
                <view class="des-box">
                    <image src="/static/pages/img/ziying.png" class="ziying" />
                    {{ detailData.commodity.description }}
                </view>
                <view class="share-box" @tap="showShareFun">
                    <image src="/static/pages/img/share.png" class="goods-share-icon" />
                    分享
                </view>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <view class="label" v-if="detailData.commodity.labels.length != 0 && detailData.commodity.labels != null" @tap="showLabel">
                <view style="display: flex; flex: 1">
                    <text style="color: #e7a124; font-weight: bold; margin-right: 10rpx">放心购</text>
                    <view class="label-item" v-for="(item, index) in detailData.commodity.labels" :key="index">
                        <image src="/static/pages/img/hdui.png" class="hdui" />

                        <view class="label-text">{{ item }}</view>
                    </view>
                </view>
                <image style="width: 11rpx; height: 20rpx" src="/static/pages/img/back-icon.png"></image>
            </view>

            <!-- 运费 -->
            <view class="freight-box">
                <text style="font-weight: bold; color: #333">运费</text>
                <text>运费</text>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 库存 -->
            <view class="freight-box">
                <text style="font-weight: bold; color: #333">库存</text>
                <text v-if="DefaultSpec.liveStock == -1">有货</text>
                <text v-else>{{ DefaultSpec.liveStock }}件</text>
            </view>
            <!-- 间隔 -->
            <view class="fenge1"></view>
            <!-- 规格 -->
            <view class="goods-spec">
                <view class="goods-num" v-if="!isApp">
                    <view class="goods-num-text">数量</view>
                    <van-stepper :value="value" :decimal-length="0" max="99" integer @change="changeBuyNum" />
                </view>
                <view class="spec-title">规格</view>
                <view class="norms-list">
                    <view
                        :class="normsIndex == index ? 'norms-item norms-active' : 'norms-item'"
                        @tap="selectNorms"
                        :data-index="index"
                        v-for="(item, index) in detailData.activityCommoditySku"
                        :key="index"
                    >
                        <image style="width: 48rpx; height: 48rpx; vertical-align: middle" :src="item.imageUrl" v-if="item.imageUrl != null && item.imageUrl != ''" />

                        <span class="goods-spec-name">{{ item.itemText }}</span>
                    </view>
                </view>
            </view>
            <!-- 宝贝详情 -->
            <view class="fenge2">
                <view class="divLine"></view>
                <view class="shangpin-text">商品详情</view>
                <view class="divLine"></view>
            </view>
            <!-- 产品规格 -->
            <view class="content">
                <view class="cp-speci">产品规格</view>
                <view class="specifications-detail" v-for="(item, index) in detailData.commodity.preferences" :key="index">
                    <view class="p-title">{{ item.paramText }}</view>

                    <view class="p-detail">{{ item.paramValue }}</view>
                </view>
            </view>
            <!-- 商品详情图 -->
            <view class="fenge1"></view>
            <view class="zhutu-content">
                <image
                    style="width: 100%; display: block"
                    :src="item"
                    mode="widthFix"
                    :data-list="detailData.commodity.descrList"
                    :data-src="item"
                    @tap="imgClick"
                    v-for="(item, index) in detailData.commodity.descrList"
                    :key="index"
                ></image>
            </view>
            <!-- 为你推荐 -->
            <view class="detail-recommend" v-if="recommendGoodsList.length > 0">
                <view class="detail-recommmed-top">
                    <view class="detail-line"></view>
                    <view class="detail--recommend-title">为你推荐</view>
                    <view class="detail-line"></view>
                </view>
                <view class="detail-recommend-list">
                    <view class="detail-recommend-item" @tap="showDetail" :data-id="item.commodityId" v-for="(item, index) in recommendGoodsList" :key="index">
                        <image :src="item.thumbnail" alt="" class="detail-recommend-img" />

                        <view class="detail-recommend-content">
                            <view class="detail-recommend-name">{{ item.commodityName }}</view>
                            <view class="detail-recommend-price">
                                <text v-if="item.activityType" class="cuxiao-box">促销</text>
                                ￥
                                <text style="font-size: 16px">{{ item.lowPrice }}</text>
                                <text style="text-decoration: line-through; margin-left: 5px; color: #ccc">￥{{ item.originalPrice }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="daodile">—— 信书技术支持 ——</view>
            <!-- 底部条 -->
            <van-goods-action v-if="!isApp">
                <van-goods-action-icon icon="shop-o" text="店铺" @click="toStore" />
                <van-goods-action-icon icon="cart-o" text="购物车" @click="toShopCart" />
                <van-goods-action-button v-if="canBuy && canNotBuyText != '已售罄' && canNotBuyText != '活动未开始'" text="立即购买" @click="doBuy" />
                <van-goods-action-button v-else color="#cccccc" :text="canNotBuyText" />
            </van-goods-action>
        </view>
        <!-- 分享 -->
        <van-overlay :show="showShare" @tap.native="showShare = false" z-index="999" @click="hideShare">
            <view class="activeIndex-share">
                <view class="activeIndex-share-text">亲，请点击右上角</view>
                <view class="activeIndex-share-text">
                    即可分享
                    <text class="activeIndex-share-text activeIndex-share-text-span">好友</text>
                </view>
            </view>
        </van-overlay>
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
    </view>
</template>

<script>
// import vanStepper from './@vant/weapp/stepper/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// import vanGoodsAction from './@vant/weapp/goods-action/index';
// import vanGoodsActionIcon from './@vant/weapp/goods-action-icon/index';
// import vanGoodsActionButton from './@vant/weapp/goods-action-button/index';
// import vanSticky from './@vant/weapp/sticky/index';
// pages/GoodsDetails/GoodsDetails.js
const app = getApp();
export default {
    components: {
        // vanStepper,
        // vanOverlay,
        // vanPopup,
        // vanCountDown,
        // vanGoodsAction,
        // vanGoodsActionIcon,
        // vanGoodsActionButton,
        // vanSticky
    },
    data() {
        return {
            detailData: [],

            // 详情数据
            DefaultSpec: {
                originalPrice: '',
                lowPrice: '',
                liveStock: ''
            },

            // 默认规格
            normsIndex: 0,

            //默认索引
            value: 1,

            canNotBuyText: '不能购买',
            recommendGoodsList: [],

            // 为你推荐
            labelList: [],

            // 标签列表
            openOverlay: false,

            index: 1,
            showShare: false,
            showXS: false,
            canBuy: true,
            isApp: false,
            time: 2 * 1000,
            clone_options: {},
            isAuthorization: false,
            imagList: [],
            activityType: 0,
            commodityName: '',
            description: '',
            labels: [],
            preferences: [],
            descrList: ''
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
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //查看是否授权
        var that = this;
        uni.getSetting({
            success: function (res) {
                if (uni.getStorageSync('wx_userinfo_key')) {
                    // 已授权
                    that.setData({
                        isAuthorization: false
                    });
                    that.getParams(that._options.id, that._options.seckillId);
                } else {
                    // 没有授权
                    that.setData({
                        isAuthorization: true
                    });
                }
            }
        }); // this.getParams(this.data._options.id,this.data._options.seckillId)
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
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.detailData.commodity.commodityName,
            path: '/pages/activity/sycx/ActivityGoodsDetail/ActivityGoodsDetail?id=' + this._options.id + '&seckillId=' + this._options.seckillId,
            imageUrl: ''
        };
    },
    methods: {
        /**
         * 生命周期函数--监听页面加载
         */
        onLoadClone3389: function (options) {
            this.setData({
                clone_options: options
            });

            if (options.fromApp) {
                this.setData({
                    isApp: true
                });
            } // this.getParams(options.id,options.seckillId)
        },

        async getParams(id, seckillId) {
            let data = {
                activityCommodityId: id,
                seckillId: seckillId
            };
            var that = this;
            var timestamp = Date.parse(new Date());
            await app.globalData.sjrequest('/seckill/commodityListInfo', data).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.commodity.labels = res.data.data.commodity.labels.split(',');
                    res.data.data.commodity.preferences = JSON.parse(res.data.data.commodity.preferences);
                    var useTime = 0;

                    if (res.data.data.state == 1) {
                        useTime = res.data.data.startTime * 1000 - timestamp;
                        this.setData({
                            canBuy: false,
                            canNotBuyText: '活动未开始'
                        });
                    }

                    if (res.data.data.state == 2) {
                        useTime = res.data.data.endTime * 1000 - timestamp;
                        this.setData({
                            canBuy: true
                        });
                    }

                    that.setData({
                        DefaultSpec: res.data.data.activityCommoditySku[0],
                        normsIndex: 0,
                        detailData: res.data.data,
                        time: useTime
                    });
                    let haveStock = 0;
                    this.detailData.activityCommoditySku.forEach((item) => {
                        haveStock = haveStock + item.liveStock;
                    });

                    if (haveStock == 0) {
                        uni.showToast({
                            title: '该规格已经卖完了'
                        });
                        this.setData({
                            canNotBuyText: '已售罄'
                        });
                    }

                    that.getLabelList();
                }
            });
            this.queryRecommendList();
        },

        //获取商品推荐
        queryRecommendList() {
            let data = {
                marchantId: this.detailData.commodity.marchantId,
                commodityId: this.detailData.commodity.id
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

        /**选择规格 */
        selectNorms(e) {
            let index = e.currentTarget.dataset.index;

            if (this.detailData.activityCommoditySku[index].liveStock == 0) {
                this.setData({
                    canNotBuyText: '已售罄'
                });
            } else {
                this.setData({
                    canNotBuyText: ''
                });
            }

            this.setData({
                normsIndex: index,
                DefaultSpec: this.detailData.activityCommoditySku[index]
            });
        },

        /**立即购买 */
        doBuy() {
            let data = {
                seckillId: this.detailData.seckillId,
                orderList: []
            };
            data.orderList.push({
                marchantId: this.detailData.commodity.marchantId,
                commList: [
                    {
                        skuId: this.DefaultSpec.id,
                        amount: this.value
                    }
                ]
            });
            console.log(data);
            app.globalData.sjrequest1('/seckill/onekeyAboutOrder', data).then((res) => {
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
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 改变购买数量
        changeBuyNum(e) {
            this.setData({
                value: e.detail
            });
        },

        /**查看商品详情 */
        showDetail(e) {
            const id = e.currentTarget.dataset.id;
            uni.navigateTo({
                url: '../GoodsDetails/GoodsDetails?id=' + id
            });
        },

        //获取标签列表
        getLabelList() {
            let data = {
                labelIntros: this.detailData.commodity.labels
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

        async repeatLoad() {
            var that = this;
            await this.onLoadClone3389(this._options, {});

            if (this.detailData.state == 1) {
                uni.showModal({
                    title: '提示',
                    content: '刷新失败，请重试',
                    success: function (res) {
                        if (res.confirm) {
                            //这里是点击了确定以后
                            that.repeatLoad();
                        } else {
                            //这里是点击了取消以后
                            uni.navigateBack({
                                delta: 0
                            });
                        }
                    }
                });
            }
        },

        async countDownOver(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            if (e.currentTarget.dataset.state == 1) {
                uni.showLoading({
                    title: '刷新中...'
                });
                this.repeatLoad();
            }

            if (e.currentTarget.dataset.state == 2) {
                uni.showToast({
                    title: '活动结束了',
                    icon: 'none'
                });
                this.setData({
                    canBuy: false,
                    canNotBuyText: '活动已结束'
                });
            }
        },

        // 跳转购物车
        toShopCart() {
            uni.navigateTo({
                url: '../../../Index/ShopCart/ShopCart'
            });
        },

        toStore() {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        },

        //授权
        bindGetUserInfo(res) {
            if (res.detail.encryptedData) {
                this.setData({
                    isAuthorization: false
                }); //同意授权

                this.login();
            } else {
                //拒绝授权
                uni.showToast({
                    title: '授权未成功',
                    icon: 'none'
                });
            }
        },

        //登录
        login() {
            var that = this;
            uni.getUserProfile({
                success: function (res) {
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                    let data = {
                        encryptedData: encryptedData,
                        iv: iv
                    };
                    uni.showLoading({
                        title: '登录中'
                    });
                    app.globalData.authLogin(data);
                }
            });
        }
    },
    watch: {
        _options: {
            handler: function (newVal, oldVal) {
                this.clone_options = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.stepper {
    z-index: 1 !important;
    background-color: yellow;
}
.swiper-container {
    width: 100%;
    position: relative;
}
.count-down {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    background: rgba(255, 0, 0, 1);
    text-align: right;
    position: absolute;
    padding-right: 30rpx;
    box-sizing: border-box;
    bottom: 0;
    right: 0;
}
.van-count-down {
    width: 100%;
    height: 100%;
    color: #fff !important;
    line-height: 60rpx !important;
    font-size: 24rpx !important;
    font-family: PingFang SC;
    font-weight: 400;
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
    height: 130rpx;
    padding: 20rpx 50rpx 0 30rpx;
    box-sizing: border-box;
    margin-top: -22rpx;
    margin-bottom: 20rpx;
    z-index: 200;
    background-size: 100% 130rpx;
    display: flex;
    align-items: center;
}
.goods-price-box {
    width: 220rpx;
}
.no-sale-box {
    height: 70rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 60rpx;
    color: rgba(255, 255, 255, 1);
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
    max-height: 72rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 36rpx;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;
    text-overflow: ellipsis;
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
    font-weight: bold;
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
.share-box {
    display: flex;
    width: 44rpx;
    height: 72rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36rpx;
    color: #ccc;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.goods-share-icon {
    width: 34rpx;
    height: 34rpx;
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
    /* padding-bottom: 10px; */
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
    color: #333;
    margin-right: 10px;
    margin-top: 14rpx;
    display: flex;
    align-items: center;
}
.goods-spec-name {
    padding: 0 26rpx;
}
.norms-active {
    background: rgba(231, 161, 36, 0.2);
    border: 1rpx solid #783705;
    border-radius: 6rpx;
    color: #feae57;
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
/**商品标签 */
.label {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 30rpx;
    box-sizing: border-box;
    justify-content: space-between;
}
.label-item {
    margin-right: 10rpx;
    display: flex;
    align-items: center;
}
.hdui {
    width: 28rpx;
    height: 28rpx;
    margin-right: 6rpx;
}
.label-text {
    white-space: nowrap;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999;
}
/* 运费 */
.freight-box {
    width: 100%;
    height: 60rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    color: #666;
}
/*宝贝详情*/
.fenge2 {
    height: 90rpx;
    line-height: 90rpx;
    background: #f2f2f2;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12rpx;
}
.divLine {
    width: 120rpx;
    height: 1rpx;
    background: #3c3c3c;
}
.shangpin-text {
    padding: 0 68rpx;
}
/*产品规格*/
.content {
    padding-bottom: 20rpx;
}
.cp-speci {
    width: 90%;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000;
    line-height: 42rpx;
    margin: 0 auto;
    padding: 20rpx 0px;
    border-bottom: 1rpx solid #3c3c3c;
}
.specifications-detail {
    display: flex;
    font-size: 26rpx;
    color: #333;
    line-height: 50rpx;
    margin-top: 12rpx;
}
.p-title {
    color: #ccc;
    margin-right: 30rpx;
    width: 20%;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.p-detail {
    width: 80%;
    color: rgba(153, 153, 153, 1);
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
    font-size: 20rpx;
    text-align: center;
    color: #999999;
    font-weight: bold;
}
.detail-recommend {
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #f2f2f2;
}
.detail-recommmed-top {
    width: 100%;
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.detail-line {
    width: 178rpx;
    height: 2rpx;
    background: #ccc;
}
.detail--recommend-title {
    height: 36rpx;
    font-size: 28rpx;
    font-family: PingFang-SC-Medium;
    line-height: 36rpx;
    color: rgba(153, 153, 153, 1);
    margin: 0 24rpx;
}
.detail-recommend-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.detail-recommend-item {
    width: 340rpx;
    background: #fff;
    margin-bottom: 14rpx;
    border-radius: 10rpx;
}
.detail-recommend-img {
    width: 340rpx;
    height: 340rpx;
    object-fit: cover;
    border-radius: 10rpx 10rpx 0 0;
}
.detail-recommend-content {
    padding: 10rpx 20rpx;
    box-sizing: border-box;
}
.detail-recommend-name {
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
}
.activeIndex-share-img {
    width: 228rpx;
    height: 256rpx;
    float: right;
    margin: 20rpx 44rpx 0 0;
}
.activeIndex-share {
    padding-left: 96rpx;
    padding-top: 332rpx;
}
.activeIndex-share-text {
    font-size: 32rpx;
    font-family: DFPHaiBaoW12;
    line-height: 80rpx;
    color: #ffffff;
}
.activeIndex-share-text-span {
    color: #ec1919;
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
</style>
