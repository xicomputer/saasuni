<template>
    <!-- pages/Index/shopHome/components/componentsPage/shopCart/shopCart.wxml -->
    <view class="cart-main">
        <!-- <view class="address_Info">
    <view class="address me-fx-row me-fx-start-c">
        <image src="../static/path.png"></image>
        <text>湖南省长沙市开福区</text>
    </view>
  </view> -->
        <view class="item_foot me-fx-row me-fx-start-c" style="bottom: 140rpx">
            <view class="me-fx-row me-fx-sb foot_info" v-for="(item, index) in shopCartlistClone.length ? shopCartlistClone : 1" :key="item.marchantId">
                <view class="me-fx-row me-fx-start-c" @tap="selectAll">
                    <text class='icon-text iconfont iconBig' :class="[isAll ? 'icon-select1 red-style' : 'icon-selectnor']"></text>
                    <text>全选</text>
                </view>

                <view class="me-fx-row me-fx-sb me-fx-1 me-fx-start-c">
                    <view class="me-fx-row me-fx-end-c me-fx-1">
                        合计：
                        <text class="red">￥{{ subtotal ? subtotal : 0 }}</text>
                    </view>
                    <view class="redbtn" :data-pi="index" @tap="handleGoSettlement">结算</view>
                </view>
            </view>
        </view>
        <!-- 编辑 -->
        <!-- 
 <view class="edit-area">
    <view class="edit-inner">
      <view class="select-all-area">
        <text class="click-area" bindtap="selectAll">
          <text class="icon-text iconfont {{isAll ? 'icon-select1 red-style' : 'icon-selectnor'}}"></text>
          <text>全选</text>
        </text>
      </view>
      <view class="delet-area">
        <text class="click-area" bindtap="delete">
          <text class="icon-text iconfont icon-delete"></text>
          <text>删除</text>
        </text>
      </view>
    </view> 
  </view>-->

        <!-- 没有添加商品 -->
        <no-data text="您还没有添加商品哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img3.png" v-if="!shopCartlistClone.length" height="30"></no-data>

        <view v-else class="scroll-area">
            <view class="list-area">
                <view class="item-area" v-for="(item, index) in shopCartlistClone" :key="item.marchantId">
                    <view class="item-header" :data-marchantId="item.marchantId">
                        <view class="me-fx-row me-fx-sb">
                            <view>
                                <text class="item-header-select-area" :data-pid="index" @tap.stop.prevent="handleGoodsSelect">
                                    <text class="item-header-select iconfont iconBig" :class="[item.isSelect ? 'icon-select1 red-style' : 'icon-selectnor']"></text>
                                </text>
                                <image class="item-header-img" :src="cartShop.headImage"></image>
                                <text>{{ cartShop.appName }}</text>
                            </view>
                            <view class="delet-area">
                                <text class="click-area" @tap="deleteFun">
                                    <text class="icon-text iconfont icon-delete"></text>
                                    <text>删除</text>
                                </text>
                            </view>
                        </view>
                    </view>

                    <view class="item-goods">
                        <view
                            class="item-good"
                            @tap="toGoodsdetail"
                            :data-activity="goodItem.activityId"
                            :data-commodityId="goodItem.commodityId"
                            v-for="(goodItem, goodIndex) in item.commoditys"
                            :key="goodItem.commodityId"
                        >
                            <view class="item-good-l">
                                <text class="select-area" :data-pid="index" :data-cid="goodIndex" @tap.stop.prevent="handleGoodItemSelect">
                                    <text :class="'icon-text iconfont iconBig ' + (goodItem.isPitch ? 'icon-select1 red-style' : 'icon-selectnor')"></text>
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
                                <view class="me-fx-row me-fx-start-c shop-cart-miaosha" v-if="goodItem.remainingTime">
                                    <view class="br-miaosha">
                                        <text class="shopcart-miaosha-text">秒杀</text>
                                        <van-count-down use-slot @change="changeTime($event, { index: goodIndex })" :data-index="goodIndex" :time="goodItem.remainingTime * 1000">
                                            <view class="list_item_onLookers">
                                                <text>距结束</text>
                                                <text v-if="goodItem.timeData.days != 0">{{ goodItem.timeData.days || 0 }}</text>
                                                <text v-if="goodItem.timeData.days != 0">天</text>
                                                <text>{{ goodItem.timeData.hours }}</text>
                                                <text>:</text>
                                                <text>{{ goodItem.timeData.minutes }}</text>
                                                <text>:</text>
                                                <text>{{ goodItem.timeData.seconds }}</text>
                                            </view>
                                        </van-count-down>
                                    </view>
                                </view>
                                <view :class="'number-price ' + (goodItem.remainingTime ? '' : 'mt-cart')">
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
                </view>
            </view>
        </view>

        <!-- 猜你喜欢 -->
        <view class="recommend-goods" v-if="likeGoodsList.length">
            <view class="me-fx-row me-fx-c-c top-title">
                <view class="line-x"></view>
                <view class="point"></view>
                <view class="title-text">猜你喜欢</view>
                <view class="point"></view>
                <view class="line-x"></view>
            </view>
            <!-- <view class='me-fx-row me-fx-sb goods-list'>
      <view class='goods-item' wx:for='{{likeGoodsList}}' wx:key='index' 
        bindtap='jumpGoodsDetail' data-item='{{item}}'
      >
        <image src='{{item.thumbnail}}' class='goods-img'></image>
        <view class='name-price-info'>
          <view class='me-full-text me-full-line2 goods-name'>{{item.commodityName}}</view>
          <view class='me-fx-row me-fx-sb-c'>
            <view class='price-box'>
              <text>￥</text>
              <text class='price-num'>{{item.originalPrice}}</text>
            </view>
            <text class='adorn-point'>...</text>
          </view>
        </view>
      </view>
    </view> -->
            <!-- 新版购物车浏览商品6.1 -->
            <view>
                <view
                    style="display: flex; align-items: center; width: 700rpx; margin: 0 auto; margin-top: 20rpx"
                    @tap="jumpGoodsDetail"
                    :data-item="item"
                    v-for="(item, index) in likeGoodsList"
                    :key="index"
                >
                    <image :src="item.thumbnail" style="width: 140rpx; height: 140rpx"></image>

                    <view style="width: 60%; height: 100%; padding: 20rpx 0; margin-left: 15rpx; display: flex; justify-content: space-between; flex-direction: column">
                        <view class="u-line-1 goods-name" style="font-size: 24rpx; font-weight: 600">{{ item.commodityName }}</view>
                        <text class="describe u-line-1" style="font-size: 20rpx; color: #999">{{ item.description }}</text>

                        <view class="me-fx-row me-fx-sb-c">
                            <view class="price-box">
                                <text style="color: red">￥</text>
                                <text class="price-num" style="color: red">{{ item.originalPrice }}</text>
                            </view>
                            <!-- <text class='adorn-point'>...</text> -->
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

        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <van-dialog use-slot title="请输入您的内容" :show="show1" show-cancel-button @close="onClose" @confirm="confirm">
            <view class="num-input">
                <input type="number" :value="value" maxlength="3" title="" @input="handleInput" @blur="validate" />
            </view>
        </van-dialog>
        <view class="cart_foot"></view>
    </view>
</template>

<script>
import noData from '@/pages/Component/noData/index';
// import vanDialog from '@/@vant/weapp/dialog/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// // pages/Index/shopHome/components/componentsPage/shopCart/shopCart.js
import Toast from '@/miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '@/miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
export default {
    components: {
        noData,
        // vanDialog,
        // vanCountDown
    },
    data() {
        return {
            addHei: false,
            // marchantId: null,
            sopenOverlay: false,
            isClose: false,

            // 是否关店
            index: 0,

            cartShop: {
                headImage: '',
                appName: ''
            },

            editObj: {
                pi: '',
                ci: '',
                value: ''
            },

            show: false,
            value: '',
            num: '',
            isAll: false,
            shopCartlistClone: [],
            listItem: '',
            // marchantId: -1,
            orderType: 0,
            subtotal: 0,

            //猜你喜欢商品
            likeGoodsList: [],

            btnTitle: '',
            openOverlay: false,
            close: false,

            goodItem: {
                activityId: '',
                commodityId: '',
                isPitch: false,
                imageUrl: false,
                thumbnail: '',
                commodityName: '',
                itemText: '',
                remainingTime: '',

                timeData: {
                    days: 0,
                    hours: '',
                    minutes: '',
                    seconds: ''
                },

                activityType: 0,
                isMember: '',
                lowPrice: '',
                originalPrice: '',
                amount: ''
            },

            goodIndex: 0,
            show1: '',
            shopCartlistClone: []
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
        shopCartlist: {
            type: Array
        },
        marchantId: {
            type: [Number, String],
            default: ''
        },
        mainOrderType: {
            type: String,
            default: ''
        }
    },
    beforeMount: function () {
        this.setData({
            addHei: getApp().globalData.isAdapter
        }); // this.getCartData()
        // this.marchantId = this.marchantId;
        this.setData({
            cartShop: { ...app.globalData.setInfo }
        });
        app.globalData.globalEvent.$on('homeRefresh', () => {
            this.getLikeCommodityList();
        });
    },
		// mounted() {
		// 	console.log(this.marchantId,'mar');
		// },
    // 监听数据
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

        marchantId: {
            handler: function (nowVal) {
                if (nowVal) {
                    this.getLikeCommodityList();
                }
            },

            immediate: true,
            deep: true
        },

        shopCartlist: {
            handler: function (newVal, oldVal) {
                this.shopCartlistClone = newVal;
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
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
                        shopCartlistClone: res.data.data,
                        subtotal: res.data.data[0] ? res.data.data[0].subtotal : '0'
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

        // //选择消费方式
        // checkxf(e){
        //     this.setData({
        //         index:e.currentTarget.dataset.index
        //     })
        // },
        //关闭消费方式
        closexf() {
            this.setData({
                openOverlay: false
            }); // wx.showTabBar()

            this.setData({
                index: 0
            });
        },

        //确认消费方式
        surexf() {
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
                } else if (res.data.code == 338) {
                    uni.hideLoading();
                    this.setData({
                        isClose: true
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
        handleGoSettlement(e) {
            var pi = e.currentTarget.dataset.pi;
            let orderType = this.shopCartlist[pi].businessModel.split(',').sort();
            orderType = orderType[0];
            this.setData({
                orderType: orderType
            });
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
                this.surexf();
            } else {
                Toast('未选中对应的商品!');
            } // }
        },

        //跳转商品详情
        toGoodsdetail(e) {
            let activityStr = '';

            if (e.currentTarget.dataset.activity) {
                activityStr = '&activityId=' + e.currentTarget.dataset.activity;
            }

            uni.navigateTo({
                url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.commodityid + activityStr
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
                try {
                    console.log('333');
                } catch (error) {
                    console.log('444');
                }

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
                    this.shopCartlistClone[pi].commoditys[ci].amount = this.shopCartlist[pi].commoditys[ci].amount + 1;
                }
            } else if (type === 'minus') {
                // 减一
                if (this.shopCartlist[pi].commoditys[ci].amount === 1) {
                    this.shopCartlistClone[pi].commoditys[ci].amount = 1;
                } else {
                    this.shopCartlistClone[pi].commoditys[ci].amount = this.shopCartlist[pi].commoditys[ci].amount - 1;
                }
            } else {
                // 编辑
                this.setData({
                    'editObj.pi': pi,
                    'editObj.ci': ci,
                    value: this.shopCartlist[pi].commoditys[ci].amount,
                    show: true
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
                this.shopCartlistClone[this.editObj.pi].commoditys[this.editObj.ci].amount = this.value;
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
                    context: this,
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
                        this.shopCartlistClone[pid].isSelect = !this.shopCartlist[pid].isSelect;
                        this.setData({
                            shopCartlistClone: res.data.data,
                            subtotal: res.data.data[0] ? res.data.data[0].subtotal : '0'
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
						console.log(arr,'arr');
            if (this.isAll) {
                arr.forEach((el, i) => {
                    el.commoditys.forEach((it, ind) => {
                        var listItem = 'shopCartlist[' + i + '].isSelect';
                        data.push({
                            trolleyId: it.trolleyId,
                            isPitch: 0
                        });
                        this.shopCartlistClone[i].isSelect = true;
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
                        this.shopCartlistClone[i].isSelect = true;
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
                        this.setData({
                            shopCartlistClone: res.data.data,
                            isAll: !this.isAll,
                            subtotal: res.data.data[0] ? res.data.data[0].subtotal : '0'
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
                this.shopCartlistClone[i].isSelect = isSelet;
                this.shopCartlistClone[i].hj = num / 100;
            });
            this.setData({
                isAll: allSelect
            });
        },

        changeTime(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let shopCartlist = this.shopCartlist;
            const { index } = e.currentTarget.dataset;
            var detail = e.detail;

            if (detail.days < 10) {
                detail.days = '0' + detail.days;
            }

            if (detail.hours < 10) {
                detail.hours = '0' + detail.hours;
            }

            if (detail.minutes < 10) {
                detail.minutes = '0' + detail.minutes;
            }

            if (detail.seconds < 10) {
                detail.seconds = '0' + detail.seconds;
            }

            shopCartlist[0].commoditys[index].timeData = detail;
            this.setData({
                shopCartlistClone: shopCartlist
            });
        },

        // getLikeCommodityList(){//猜你喜欢商品, 旧需求，直接请求
        //     app.sjrequest('/marchant/likeCommodityList',{
        //         merchantId:this.properties.marchantId
        //     }).then(res=>{
        //         console.log('猜你喜欢商品',res);
        //         if(res.statusCode==200 && res.data.code==200){
        //             var list=res.data.data;
        //             this.setData({likeGoodsList:list});
        //         }
        //     })
        // },
        async getLikeCommodityList() {
            //猜你喜欢商品, 新，当前主经营模式是什么就返回什么样的商品
            try {
                let data = {
                    marchantId: this.marchantId,
                    orderTemplate: String(this.mainOrderType)
                };
                console.log(data, '猜你喜欢商品请求数据');
                let res = await app.globalData.sjrequest('/commodity/queryCommodityList', data);
                console.log('猜你喜欢商品', res);

                if (res.statusCode == 200 && res.data.code == 200) {
                    var list = res.data.data;
                    this.setData({
                        likeGoodsList: list
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        jumpGoodsDetail(e) {
            var id = e.currentTarget.dataset.item.commodityId;
            var mainOrderType = this.mainOrderType;
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

        validate() {
            console.log('占位：函数 validate 未声明');
        }
    }
};
</script>
<style>
@import '../../../../../styles/iconfont.css';
@import '../../../../../styles/me_common.css'; /* pages/Index/shopHome/components/componentsPage/shopCart/shopCart.wxss */

/* 购物车 */
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

.cart_foot {
    height: 260rpx;
}

.cart-main {
    width: 100vw;
    height: 100vh;
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
    background: #fff;
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
    padding-top: 20rpx;
    width: 100%;
    box-sizing: border-box;
}

.cart-main .scroll-area .list-area {
    background-color: #fff;
    width: 686rpx;
    margin: 0 auto;
    border-radius: 20px;
    padding: 30rpx 0;
}

.cart-main .scroll-area .list-area .item-area {
    width: 100%;
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
    background: #fff;
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
    width: 80rpx;
    height: 80rpx;
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
    width: 75rpx;
    padding-top: 2rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-l .select-area {
    width: 56rpx;
    height: 56rpx;
    text-indent: 16rpx;
    display: inline-block;
}

.iconBig {
    font-size: 20px;
    padding-top: 8rpx;
}

.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-c {
    width: 172rpx;
}

.cart-main .scroll-area .list-area .item-area .item-goods .item-good .item-good-c .good-img {
    width: 172rpx;
    height: 172rpx;
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

.item-footer {
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

.item-footer .item-footer-l {
    flex: 1;
    text-align: left;
    color: #333333;
}

.item-footer .item-footer-l text:nth-of-type(1) {
    font-size: 26rpx;
}

.item-footer .item-footer-l text:nth-of-type(2) {
    font-size: 36rpx;
}

.item-footer .item-footer-r {
    flex: 1;
    text-align: right;
}

.item-footer .item-footer-r .settlement-btn {
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

.address_Info {
    height: 80rpx;
    background-color: #fff;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
}

.address {
    height: 80rpx;
    margin: 0rpx 20rpx;
}

.address > image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
}

.address > text {
    font-size: 28rpx;
}

.red {
    color: #ff453a;
    font-weight: bold;
}

.redbtn {
    color: #fff;
    background-color: #ff453a;
    width: 130rpx;
    margin-left: 20rpx;
    border-radius: 20rpx;
    text-align: center;
}

.item_foot {
    position: fixed;
    bottom: 80rpx;
    border: 1px solid #e3e3e3;
    width: 100%;
    height: 80rpx;
    background-color: #fff;
}

.foot_info {
    width: 100%;
    padding: 0rpx 20rpx;
}

.mt-cart {
    margin-top: 40rpx;
}

.shopcart-miaosha-text {
    color: #fff;
    background-color: #ff0000;
    font-size: 20rpx;
    padding: 4rpx 20rpx;
    border-radius: 24rpx;
}

.br-miaosha {
    border: 1rpx solid #ff0000;
    border-radius: 24rpx;
    display: flex;
    font-weight: bold;
    margin-top: 5rpx;
}

.list_item_onLookers {
    font-size: 20rpx;
    color: #ff1000;
    padding: 0rpx 10rpx;
}

/* 猜你喜欢推荐的商品 */
.recommend-goods {
    margin-top: 56rpx;
}

.recommend-goods .top-title .line-x {
    width: 110rpx;
    height: 4rpx;
    background-color: #fe4f4f;
}

.recommend-goods .top-title .point {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background-color: #fe4f4f;
}

.recommend-goods .top-title .title-text {
    margin: 0 15rpx;
    font-size: 28rpx;
    color: #fe4f4f;
    font-weight: bold;
}

.recommend-goods .goods-list {
    padding: 24rpx 20rpx;
    box-sizing: border-box;
    flex-wrap: wrap;
}

.recommend-goods .goods-list .goods-item {
    width: 348rpx;
    /* height: 502rpx; */
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 20rpx;
}

.recommend-goods .goods-list .goods-img {
    width: 348rpx;
    /* height: 348rpx; */
    background-color: #ccc;
}

.recommend-goods .goods-list .name-price-info {
    padding: 0 15rpx;
    box-sizing: border-box;
}

.recommend-goods .goods-list .goods-name {
    font-size: 26rpx;
    color: #333;
}

.recommend-goods .goods-list .price-box {
    font-size: 24rpx;
    color: #fe4f4f;
    font-weight: bold;
}

.recommend-goods .goods-list .price-num {
    font-size: 36rpx;
}

.recommend-goods .goods-list .adorn-point {
    font-size: 40rpx;
    color: #333;
    position: relative;
    bottom: 5rpx;
    z-index: 1;
}
</style>
