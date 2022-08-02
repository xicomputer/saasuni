<template>
    <view class="invoice-container">
        <view v-if="!Invoice.length" class="no-invoice">
            <image class="no-invoice-img" src="/static/pages/img/no_notice.png"></image>
            <view class="no-invoice-text">您还没有添加发票……</view>
        </view>
        <no-data text="您还没有发票哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img2.png" v-if="!Invoice.length"></no-data>
        <view v-else class="InvoiceList">
            <van-radio-group :value="radio" @change="change">
                <view @tap="backOrder" v-for="(item, index) in Invoice" :key="index" style="position: relative;">
                    <van-swipe-cell :right-width="' ' + 65 + ' '">
                        <view class="InvoiceList-item" @tap="backOrder" :data-item="item">
                            <van-radio :name="item.id" checked-color="#ec1919" icon-size="20px"></van-radio>
                            <view class="right">
                                <view class="cpy-name">{{ item.companyName }}</view>
                                <view class="cpy-number">税号{{ item.companyDp }}</view>
                                <view class="cpy-email">邮箱{{ item.email }}</view>
                            </view>
                        </view>
                        <view style="position: absolute;top: 40rpx;right: 30rpx;" @tap="clickDel" :data-id="item.id" class="del">删除</view>
                    </van-swipe-cell>
                </view>
            </van-radio-group>
        </view>
        <view class="addlist-footer-btn">
            <navigator url="../NewInvoice/NewInvoice" class="saveBtn">添加发票</navigator>
        </view>
    </view>
</template>

<script>
// import vanRadio from './@vant/weapp/radio/index';
import noData from '@/pages/Component/noData/index';
// import vanRadioGroup from './@vant/weapp/radio-group/index';
// import vanCell from './@vant/weapp/cell/index';
// import vanCellGroup from './@vant/weapp/cell-group/index';
// import vanSwipeCell from './@vant/weapp/swipe-cell/index';
// pages/Invoice/InvoiceList/InvoiceList.js
const app = getApp();
export default {
    components: {
        // vanRadio,
        noData,
        // vanRadioGroup,
        // vanCell,
        // vanCellGroup,
        // vanSwipeCell
    },
    data() {
        return {
            radio: '1',
            Invoice: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.showInvoiceList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
			this.showInvoiceList();
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
     */ methods: {
        backOrder(e) {
            let { from } = app.globalData.store.getState();

            if (from === 'submitOrder') {
                let itemObj = e.currentTarget.dataset.item;
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1]; // 当前页面

                var prevPage = pages[pages.length - 2];
                var invoice = 'submitObj.invoice';
                prevPage[submitObj.invoice] = itemObj;

                app.globalData.store.setState({
                    from: ''
                });
                uni.navigateBack({
                    delta: 1
                });
            }
        },

        showInvoiceList() {
            var that = this;
            app.globalData.sjrequest('/commodity/queryInvoice').then((res) => {
                console.log('发票列表', res.data.data);
                this.setData({
                    Invoice: res.data.data
                });
                that.Invoice.forEach((item, index) => {
                    if (item.isDefault == 1) {
                        this.setData({
                            radio: item.id
                        });
                    }
                });
            });
        },

        change(e) {
            console.log(e.detail);
            let data = {
                invoiceId: e.detail
            };
            app.globalData.sjrequest('/commodity/defaultInvoice', data).then((res) => {
                if ((res.data.code = 200)) {
                    this.setData({
                        radio: e.detail
                    });
                }
            });
        },

        /**删除 */
        clickDel(e) {
            var that = this;
            uni.showModal({
                title: '提示',
                content: '确认删除此发票吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定 可以调用删除方法了
                        let data = {
                            id: e.currentTarget.dataset.id
                        };
                        app.globalData.sjrequest('/commodity/delInvoice', data).then((res) => {
                            console.log(res);
                            that.showInvoiceList();
                        });
                    } else if (sm.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    }
};
</script>
<style>
.invoice-container {
    min-height: 100vh;
}
.InvoiceList {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 210rpx;
}
.InvoiceList-item {
    width: 100%;
    height: 240rpx;
    display: flex;
    padding: 0 40rpx;
    padding-top: 34rpx;
    padding-right: 0;
    padding-bottom: 40rpx;
    box-sizing: border-box;
    align-items: flex-start;
    border-bottom: 1rpx solid #ececec;
}
.van-radio {
    height: 163rpx;
    align-items: flex-start;
}
.right {
    height: 163rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
}
.cpy-name {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    opacity: 1;
}
.cpy-number {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
    opacity: 1;
}
.cpy-email {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999;
    opacity: 1;
}

.addlist-footer-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 210rpx;
}
.saveBtn {
    width: 90%;
    height: 100rpx;
    background: linear-gradient(274deg, #fc5800 0%, #f64756 100%);
    box-shadow: 0px 10px 20px rgba(251, 37, 12, 0.16);
    border-radius: 50rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 100rpx;
    color: rgba(255, 255, 255, 1);
    margin: 40rpx 5% 0;
}
.del {
    width: 130rpx;
    height: 40rpx;
		line-height: 40rpx;
    background: #ff5340;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #fff;
}
.no-invoice {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-invoice-img {
    width: 632rpx;
    height: 368rpx;
}

.no-invoice-text {
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
</style>
