<template>
    <view class="orderList">
        <view class="list_tab">
            <block v-for="(item, index) in statusList" :key="index">
                <view @tap="changeTab" :data-index="index" :class="'list_tab_item ' + (index == status ? 'list_tab_item_active' : '')">{{ item }}</view>
            </block>
        </view>
        <view style="height: 88rpx"></view>
        <view class="order_item" v-for="(item, index) in orderList" :key="index">
            <view @tap="toShop" :data-item="item" class="order_item_shop">
                <view class="order_item_shop_left">
                    <image :src="item.merchantLogo" mode="aspectFill"></image>
                    <view>{{ item.merchantName }}</view>
                </view>
                <view class="order_item_shop_right">{{ statusList[status] }}{{ statusList[status] == '退款/售后' ? typeList[item.refundStatus] : '' }}</view>
            </view>

            <view @tap="toDetails" :data-item="item" class="order_item_goods">
                <view class="order_item_goods_left">
                    <image :src="item.logoImg" mode="aspectFill"></image>
                    <view class="order_item_goodsInfo">
                        <view class="order_item_goodsInfo_name">{{ item.auctionItemName }}</view>
                        <view class="order_item_goodsInfo_desc">{{ item.description }}</view>
                    </view>
                </view>
                <view class="order_item_goods_right">
                    <view>成交价：￥{{ item.xsAuctionOrderItem.totalMoney }}</view>
                    <view>
                        已付金额：
                        <text style="color: #ff0000">￥{{ item.xsAuctionOrderItem.money }}</text>
                    </view>
                </view>
            </view>

            <view style="padding-bottom: 20rpx" class="order_item_orderInfo">
                <view class="order_item_orderInfo">
                    订单编号：{{ item.xsAuctionOrderItem.orderNo }}
                    <image @tap="copyOrder" class="copy_img" src="/static/pages/static/copy.png" :data-order="item.xsAuctionOrderItem.orderNo"></image>
                </view>
                <view class="order_item_orderInfo">喊价单号：{{ item.auctionNo }}</view>
                <view class="order_item_orderInfo">订单生成时间：{{ item.xsAuctionOrderItem.payTime }}</view>
                <view v-if="statusList[status] != '退款/售后'" class="order_item_orderInfo">
                    联系人：
                    <text style="margin: 0 24rpx 0 12rpx">{{ item.receivingName }}</text>
                    {{ item.receivingTelephone }}
                    <view class="order_item_orderInfo">收货地址：{{ item.receivingAddress }}</view>
                </view>
                <block v-if="statusList[status] == '退款/售后'">
                    <view class="order_item_orderInfo">退款金额：￥{{ item.xsAuctionOrderItem.money }}</view>
                    <view class="order_item_orderInfo">申请退款时间：{{ item.xsAuctionOrderItem.refundApplyTime }}</view>
                    <view class="order_item_orderInfo">退款理由：{{ item.refundReason }}</view>
                </block>
            </view>

            <block v-if="statusList[status] == '待收货' && statusList[status] == '已完成'">
                <view style="border-top: 2rpx solid #f4f4f4" class="order_item_orderInfo">
                    <view class="order_item_orderInfo">{{ item.mailName }}：{{ item.mailOrderNo }}</view>
                    <view class="order_item_orderInfo">发货时间：{{ item.xsAuctionOrderItem.deliverGoodsTime }}</view>
                    <view v-if="statusList[status] == '已完成'" class="order_item_orderInfo">确认收货时间：{{ item.xsAuctionOrderItem.receivingrGoodsTime }}</view>
                </view>
            </block>

            <block v-if="statusList[status] == '退款/售后' && item.refundStatus != 2">
                <view style="border-top: 2rpx solid #f4f4f4" class="order_item_orderInfo">
                    <view v-if="typeList[item.refundStatus] == '（已拒绝）'" class="order_item_orderInfo">商家拒绝退款理由：{{ item.refuseReason }}</view>
                    <view v-if="item.refundStatus == 3 || typeList[item.refundStatus] == '（已完成）'" class="order_item_orderInfo">
                        {{ item.refundMailName }}：{{ item.refundMailOrderNo }}
                    </view>
                    <view v-if="typeList[item.refundStatus] == '（已完成）'" class="order_item_orderInfo">退款时间：{{ item.xsAuctionOrderItem.refundTime }}</view>
                </view>
            </block>

            <view class="order_item_btnList">
                <view @tap="contactShop" :data-item="item" class="order_item_btn color9">联系商家</view>
                <view v-if="statusList[status] == '待发货'" @tap="showReason" :data-index="index" class="order_item_btn color3">申请退款</view>
                <view v-if="statusList[status] == '待收货'" @tap="sureOrder" :data-index="index" class="order_item_btn colorRed">确认收货</view>
                <view v-if="statusList[status] == '已完成'" @tap="showReason" :data-index="index" class="order_item_btn color3">申请退货</view>
                <view
                    v-if="statusList[status] == '退款/售后' && typeList[item.refundStatus] == '（退款中）' && item.refundStatus == 2"
                    @tap="showSureReturn"
                    :data-index="index"
                    class="order_item_btn colorRed"
                >
                    确认退货
                </view>
            </view>
        </view>
        <!-- 退款退货原因 -->
        <view v-if="isShowReason" class="mask">
            <view class="reason">
                <view class="reason_title">
                    <view @tap="showNotReason" class="reason_title_cancel">取消</view>
                    <view>请选择原因</view>
                    <view @tap="sureReason" class="reason_title_sure">确定</view>
                </view>
                <view class="reason_content">
                    <block v-for="(item, index) in reasonList" :key="index">
                        <view @tap="changeReason" :data-index="index" class="reason_content_item">
                            <view>{{ item }}</view>
                            <block v-if="item != '其他'">
                                <icon v-if="reasonIndex == index" type="success" color="#F00" size="42rpx"></icon>
                                <view v-else class="reason_content_item_icon"></view>
                            </block>
                        </view>
                    </block>
                    <view class="reason_content_textarea">
                        <textarea @input="getReasonInfo" @focus="textareaFocus" :value="reasonInfo" maxlength="20" placeholder="输入你的退款原因"></textarea>
                        <view>0/20</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 确认退货 -->
        <view v-if="isSureReturn" class="mask mask_center">
            <view class="return">
                <view class="return_item">
                    <view class="return_item_lable">物流公司</view>
                    <input @input="getLogisticsCompany" :value="logistics.company" placeholder="请输入物流公司名字" class="return_item_input" />
                </view>
                <view class="return_item">
                    <view class="return_item_lable">快递单号</view>
                    <input @input="getLogisticsNumber" :value="logistics.number" placeholder="请输入物流单号" class="return_item_input" />
                </view>
                <view class="return_btn">
                    <view @tap="sureReturn" style="color: #333333" class="mask_center">确认退货</view>
                    <view class="return_btn_line"></view>
                    <view @tap="showNotSureReturn" style="color: #999999" class="mask_center">取消</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/activity/pmhd/orderList/orderList.js
const app = getApp();
export default {
    data() {
        return {
            orderList: [],
            pageNum: 1,
            pageSize: 10,
            stopLoading: true,
            orderIndex: -1,
            isShowReason: false,

            //选择原因框
            isSureReturn: false,

            //确认退货框
            status: -1,

            statusList: ['待发货', '待收货', '已完成', '退款/售后'],
            typeList: ['', '（申请中）', '（退款中）', '（退款中）', '（已完成）', '（已拒绝）'],
            reasonIndex: -1,
            reasonList: ['不喜欢/不是自己想要的', '商品质量问题', '收到的商品破损、损坏', '商品出现了发错、漏拍', '发票的问题', '收到商品与店铺描述不符合', '其他'],
            reasonInfo: '',

            //其他原因
            logistics: {
                company: '',
                number: ''
            },

            merchantId: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        app.globalData.options = options;
        const status = options.status || 0;
        this.setData({
            status: Number(status),
            merchantId: options.merchantId
        });
        this.getOrderList();
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
    onReachBottom: function () {
        if (this.stopLoading) {
            this.setData({
                pageNum: this.pageNum + 1
            });
            this.getOrderList();
        }
    },
    methods: {
        // 获得订单列表
        getOrderList() {
            let params = {};

            if (this.merchantId) {
                params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    merchantId: this.merchantId,
                    auctionId: this.auctionId,
                    status: this.status + 1
                };
            } else {
                params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    auctionId: this.auctionId,
                    status: this.status + 1
                };
            }

            app.globalData.request.auctionRequest('/order/list', params).then((res) => {
                if (res.data.code == 200) {
                    let result = res.data.data;

                    if (result.length < this.pageSize) {
                        this.setData({
                            stopLoading: false
                        });
                    }

                    for (let index in result) {
                        result[index].status = result[index].status + 1;
                    }

                    this.setData({
                        orderList: this.orderList.concat(result)
                    });
                }
            });
        },

        // 去商家
        toShop(e) {
            const { item } = e.currentTarget.dataset; // app.request.auctionRequest('/order/clearOrderUnread', item.auctionId)

            uni.navigateTo({
                url: `/pages/shopHome/home/home?marchantId=${item.merchantId}`
            });
        },

        // 去详情
        toDetails(e) {
            const { item } = e.currentTarget.dataset; // app.request.auctionRequest('/order/clearOrderUnread', item.auctionId)

            uni.navigateTo({
                url: `/pages/activity/pmhd/details/details?auctionId=${item.auctionId}`
            });
        },

        // 联系商家
        contactShop(e) {
            const { item } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/order/contact/contact?logoPic=${item.merchantLogo}&marchantId=${item.merchantId}&marchantName=${item.merchantName}`
            });
        },

        // 切换状态
        changeTab(e) {
            const { index } = e.currentTarget.dataset;

            if (index != this.status) {
                this.setData({
                    status: index,
                    pageNum: 1,
                    stopLoading: true,
                    orderList: []
                });
                this.getOrderList();
            }
        },

        // 打开退款退货原因
        showReason(e) {
            const { index } = e.currentTarget.dataset;
            this.setData({
                isShowReason: true,
                reasonIndex: -1,
                orderIndex: index
            });
        },

        // 隐藏退款退货原因
        showNotReason() {
            this.setData({
                isShowReason: false
            });
        },

        // 选择原因
        changeReason(e) {
            this.setData({
                reasonIndex: e.currentTarget.dataset.index
            });
        },

        // 其他原因获焦
        textareaFocus() {
            this.setData({
                reasonIndex: this.reasonList.length - 1
            });
        },

        // 获得用户填写的其他原因
        getReasonInfo(e) {
            this.setData({
                reasonInfo: e.detail.value
            });
        },

        // 确认选择原因
        sureReason() {
            if (this.reasonIndex == -1 || (this.reasonIndex == this.reasonList.length - 1 && this.reasonInfo == '')) {
                uni.showToast({
                    title: '请选择或者填写原因',
                    icon: 'none'
                });
            } else {
                let refundReason;

                if (this.reasonIndex == this.reasonList.length - 1) {
                    refundReason = this.reasonInfo;
                } else {
                    refundReason = this.reasonList[this.reasonIndex];
                }

                const params = {
                    orderNo: this.orderList[this.orderIndex].xsAuctionOrderItem.orderNo,
                    //订单编号
                    refundReason: refundReason //退款退货原因
                };
                app.globalData.request.auctionRequest('/order/orderRefund', params).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '申请成功,等待商家审核',
                            icon: 'none'
                        });
                        this.showNotReason();
                        this.setData({
                            status: 4,
                            pageNum: 1,
                            stopLoading: true,
                            orderList: []
                        });
                        this.getOrderList();
                    }
                });
            }
        },

        // 打开确认退货框
        showSureReturn(e) {
            const { index } = e.currentTarget.dataset;
            this.setData({
                ['logistics.company']: '',
                ['logistics.number']: '',
                isSureReturn: true,
                orderIndex: index
            });
        },

        // 隐藏确认退货框
        showNotSureReturn() {
            this.setData({
                isSureReturn: false
            });
        },

        // 获得用户填写的物流公司
        getLogisticsCompany(e) {
            this.setData({
                ['logistics.company']: e.detail.value
            });
        },

        // 获得用户填写的物流单号
        getLogisticsNumber(e) {
            this.setData({
                ['logistics.number']: e.detail.value
            });
        },

        // 确认退货
        sureReturn() {
            if (this.logistics.company == '' || this.logistics.number == '') {
                uni.showToast({
                    title: '物流公司和物流单号不能为空哦~',
                    icon: 'none'
                });
            } else {
                const params = {
                    orderNo: this.orderList[this.orderIndex].xsAuctionOrderItem.orderNo,
                    //订单编号
                    refundMailName: this.logistics.company,
                    refundMailOrderNo: this.logistics.number,
                    refundStatus: 2
                };
                app.globalData.request.auctionRequest('/order/orderRefund', params).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '申请成功,等待商家审核',
                            icon: 'none'
                        });
                        this.showNotSureReturn();
                        this.setData({
                            status: 3,
                            pageNum: 1,
                            stopLoading: true,
                            orderList: []
                        });
                        this.getOrderList();
                    }
                });
            }
        },

        // 确认收货
        sureOrder(e) {
            const { index } = e.currentTarget.dataset;
            const params = {
                orderNo: this.orderList[index].xsAuctionOrderItem.orderNo //订单编号
            };
            app.globalData.request.auctionRequest('/order/orderConfirm', params).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '收货成功',
                        icon: 'none'
                    });
                    this.setData({
                        status: 2,
                        pageNum: 1,
                        stopLoading: true,
                        orderList: []
                    });
                    this.getOrderList();
                }
            });
        },

        copyOrder(e) {
            var order = e.currentTarget.dataset.order;
            uni.setClipboardData({
                data: order,

                success(res) {
                    uni.showToast({
                        title: '复制成功'
                    });
                }
            });
        }
    }
};
</script>
<style>
.orderList {
    min-height: 100vh;
    background: #f8f8f8;
}
.list_tab {
    background: #f8f8f8;
    width: 100%;
    height: 88rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
.list_tab_item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    font-weight: 500;
    color: #999999;
}
.list_tab_item_active {
    color: #ff0000;
    position: relative;
}
.list_tab_item_active::before {
    content: '';
    width: 44rpx;
    height: 0rpx;
    border-bottom: 4rpx solid #ff0000;
    position: absolute;
    left: 50%;
    bottom: 20rpx;
    transform: translate(-50%);
}
.order_item {
    width: 100%;
    background-color: #ffffff;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
}
.order_item_shop {
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}
.order_item_shop_left {
    display: flex;
    align-items: center;
}
.order_item_shop_left image {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}
.order_item_shop_right {
    font-size: 26rpx;
}
.order_item_goods {
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #f4f4f4;
}
.order_item_goods_left {
    display: flex;
}
.order_item_goods_left image {
    width: 152rpx;
    height: 154rpx;
}
.order_item_goodsInfo {
    margin-left: 20rpx;
}
.order_item_goodsInfo_name {
    width: 300rpx;
    line-height: 34rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.order_item_goodsInfo_desc {
    margin-top: 20rpx;
    width: 300rpx;
    line-height: 28rpx;
    font-size: 20rpx;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.order_item_goods_right {
    font-size: 22rpx;
    font-weight: bold;
    color: #333333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10rpx;
}
.order_item_orderInfo {
    padding-top: 8rpx;
    font-size: 22rpx;
    font-weight: 500;
    color: #333333;
}
.order_item_btnList {
    margin-top: 16rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.order_item_btn {
    width: 168rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    border-radius: 60rpx;
    font-size: 32rpx;
    font-weight: 400;
    margin-left: 40rpx;
}
.color9 {
    color: #999999;
    border: 2rpx solid #999999;
}
.color3 {
    color: #333333;
    border: 2rpx solid #333333;
}
.colorRed {
    color: #ff0000;
    border: 2rpx solid #ff0000;
}
/* 退款退货原因 */
.reason {
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.reason_title {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    height: 74rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.reason_title_cancel {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
}
.reason_title_sure {
    font-size: 28rpx;
    font-weight: 500;
    color: #ff0000;
}
.reason_content {
    margin-top: 10rpx;
}
.reason_content_item {
    width: 100%;
    padding: 0 30rpx;
    border-top: 2rpx solid #f4f4f4;
    box-sizing: border-box;
    height: 74rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    font-weight: 500;
    color: #333333;
}
.reason_content_item_icon {
    width: 38rpx;
    height: 38rpx;
    border-radius: 50%;
    border: 2rpx solid #999999;
}
.reason_content_textarea {
    margin: 0 30rpx 20rpx;
    height: 162rpx;
    background: #f4f4f4;
    border-radius: 16rpx;
    font-size: 24rpx;
    font-weight: 400;
    padding: 16rpx;
    box-sizing: border-box;
    position: relative;
}
.reason_content_textarea view {
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    position: absolute;
    right: 8rpx;
    bottom: 8rpx;
}
/* 确认退货 */
.return {
    width: 626rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding-top: 40rpx;
}
.return_item {
    display: flex;
    align-items: center;
    margin: 20rpx 40rpx;
}
.return_item_lable {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}
.return_item_input {
    width: 292rpx;
    height: 54rpx;
    font-size: 22rpx;
    font-weight: 400;
    border: 2rpx solid #999999;
    border-radius: 12rpx;
    margin-left: 20rpx;
    padding-left: 12rpx;
    box-sizing: border-box;
}
.return_btn {
    width: 100%;
    height: 100rpx;
    border-top: 2rpx solid #f4f4f4;
    margin-top: 40rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.return_btn_line {
    height: 100%;
    width: 2rpx;
    background-color: #f4f4f4;
    font-size: 32rpx;
    font-weight: 400;
    color: #333333;
}

/* 蒙版 */
.mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
}
.mask_center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.copy_img {
    width: 40rpx;
    height: 40rpx;
}
</style>
