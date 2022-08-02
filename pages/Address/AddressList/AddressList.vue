<template>
    <view class="addList">
        <view class="add_have_list">
            <no-data text="您还没有添加地址哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img9.png" v-if="!addList.length"></no-data>
            <view v-else>
                <view v-for="(item, index) in addList" :key="index" style="position: relative;">
                    <van-swipe-cell :right-width="' ' + 65 + ' '">
                        <view class="add_list" @tap.stop.prevent="backOrder" :data-item="item">
                            <view class="add_top">
                                <view class="add_top_item">
                                    <view class="add_name">{{ item.contacts }}</view>
                                    <view class="add_tel">{{ item.contactWay }}</view>
                                    <view class="defalut_icon" v-if="item.isDefault == 1">默认</view>
                                </view>
                            </view>
                            <view class="addressDetail">
                                <view class="addDetail">{{ item.provincesName }}{{ item.cityName }}{{ item.areaName }}{{ item.address }}</view>
                            </view>
                            <view class="xiu_icon" @tap.stop.prevent="clickEdit" :data-item="item">编辑</view>
                        </view>
												<view style="position: absolute;right: 30rpx;top: 40rpx;" @tap="clickDel" :data-id="item.shippingId" class="del">删除</view>
                    </van-swipe-cell>
                </view>
            </view>

            <view class="me-fx-row row_bottom">
                <view @tap="WxSetAddress" class="saveBtn">微信地址</view>
                <navigator class="addlist-footer-btn" url="../NewAddress/NewAddress">
                    <view class="saveBtn">新建地址</view>
                </navigator>
            </view>
        </view>

        <!-- 确认删除的弹窗 -->
        <view class="delect_bg" v-if="delet_boll">
            <view class="delet_view">
                <view class="delet_title">确定将这个地址删除？</view>
                <view class="btn_group">
                    <view class="think_btn" @tap="close_delet">我再想想</view>
                    <view class="delect_btn" @tap="sure_delet">删除</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import vanCell from './@vant/weapp/cell/index';
// import noData from '@/pages/Component/noData/index';
// import vanCellGroup from './@vant/weapp/cell-group/index';
// import vanSwipeCell from './@vant/weapp/swipe-cell/index';
// import vanArea from './@vant/weapp/area/index';
const { default: toast } = require('../../../miniprogram_npm/@vant/weapp/toast/toast'); // pages/Address/AddressList/AddressList.js

const app = getApp();
export default {
    // components: {
    //     vanCell,
    //     noData,
    //     vanCellGroup,
    //     vanSwipeCell,
    //     vanArea
    // },
    data() {
        return {
            addList: [],
            haveAdd: true,
            title: '管理收货地址',
            orderData: '',
            useStore: true,
            shipping: '',
            name: '',
            tel: '',
            areaId: '',
            cityId: '',
            provinceId: '',
            area: '',
            city: '',
            province: '',

            address: {
                name: '',
                tel: '',
                detail: ''
            },

            logisticsContactMan: '',
            logisticsAddress: '',
            logisticsTel: '',
            delet_boll: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.showaddrList();

        if (app.globalData.comefrom) {
            uni.setNavigationBarTitle({
                title: '请选择收货地址'
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
			this.showaddrList();
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
    methods: {
        backOrder(e) {
            let { from } = app.globalData.store.getState();
            let comefrom = app.globalData.comefrom;

            if (from === 'submitOrder') {
                let itemObj = e.currentTarget.dataset.item;
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1]; // 当前页面

                var prevPage = pages[pages.length - 2];
                var shipping = 'submitObj.shipping';
                prevPage[submitObj.shipping] = itemObj;

                app.globalData.store.setState({
                    from: ''
                });
                uni.navigateBack({
                    delta: 1
                });

                if (typeof prevPage.changeNum == 'function') {
                    prevPage.changeNum();
                }

                const eventChannel = this.getOpenerEventChannel();
                eventChannel.emit('addressChange', {
                    shipping: itemObj
                });
            }

            if (comefrom === 'goodsDetail' || comefrom == 'member') {
                let itemObj = e.currentTarget.dataset.item;
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1]; // 当前页面

                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                    shipping: itemObj
                });

                if (comefrom == 'member') {
                    prevPage.setData({
                        name: itemObj.contacts,
                        tel: itemObj.contactWay,
                        areaId: itemObj.areaId,
                        cityId: itemObj.cityId,
                        provinceId: itemObj.provincesId,
                        area: itemObj.areaName,
                        city: itemObj.cityName,
                        province: itemObj.provincesName,
                        address: itemObj.address
                    });
                } // 更新 store 数据

                app.globalData.comefrom = '';
                uni.navigateBack({
                    delta: 1,
                    success: function () {
                        if (comefrom === 'goodsDetail') {
                            prevPage.findFreightStr();
                        }
                    }
                });
            }

            if (comefrom === 'integral') {
                let itemObj = e.currentTarget.dataset.item;
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1]; // 当前页面

                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                    logisticsContactMan: itemObj.contacts,
                    logisticsAddress: itemObj.provincesName + itemObj.cityName + itemObj.areaName + itemObj.address,
                    logisticsTel: itemObj.contactWay
                }); // 更新 store 数据

                app.globalData.comefrom = '';
                uni.navigateBack({
                    delta: 0
                });
            }

            if (comefrom == 'pmhd') {
                let itemObj = e.currentTarget.dataset.item;
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                console.log(itemObj);
                prevPage.setData({
                    ['address.name']: itemObj.contacts,
                    ['address.tel']: itemObj.contactWay,
                    ['address.detail']: itemObj.provincesName + itemObj.cityName + itemObj.areaName + itemObj.address
                }); // 更新 store 数据

                app.globalData.comefrom = '';
                uni.navigateBack({
                    delta: 0
                });
            }
        },

        saveBtn() {
            uni.navigateTo({
                url: `/pages/Address/NewAddress/NewAddress`
            });
        },

        showaddrList() {
            var that = this;
            app.globalData.sjrequest('/commodity/queryShipping').then((res) => {
                console.log(res.data.data, '收货地址');
                this.setData({
                    addList: res.data.data
                });
            });
        },

        /**删除 */
        clickDel(e) {
            var that = this;
            uni.showModal({
                title: '提示',
                content: '确认删除此地址吗？',
                success: function (sm) {
                    if (sm.confirm) {
                        // 用户点击了确定 可以调用删除方法了
                        let data = {
                            shippingId: e.currentTarget.dataset.id
                        };
                        console.log(data, '删除参数');
                        app.globalData.sjrequest('/commodity/deleteShipping', data).then((res) => {
                            console.log(res);
                            that.showaddrList();
                        });
                    } else if (sm.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        /**编辑收货地址 */
        clickEdit(e) {
            console.log(e.currentTarget.dataset.item);
            var item = JSON.stringify(e.currentTarget.dataset.item);
            uni.navigateTo({
                url: '../NewAddress/NewAddress?item=' + item
            });
        },

        WxSetAddress() {
            let that = this;
            uni.chooseAddress({
                success(res) {
                    let data = {
                        address: res.detailInfo,
                        contacts: res.userName,
                        contactWay: res.telNumber,
                        provincesName: res.provinceName,
                        cityName: res.cityName,
                        areaId: res.postalCode,
                        areaName: res.countyName,
                        isDefault: 1
                    };
                    console.log(res);
                    uni.showLoading({
                        title: '保存中',
                        mask: true
                    });
                    app.globalData.sjrequest('/commodity/addShipping', data).then((res) => {
                        uni.hideLoading({});

                        if (res.data.code == 200) {
                            that.showaddrList();
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    });
                }
            });
        },

        close_delet() {
            console.log('占位：函数 close_delet 未声明');
        },

        sure_delet() {
            console.log('占位：函数 sure_delet 未声明');
        }
    }
};
</script>
<style>
.addList {
    min-height: 100vh;
}
.addicon {
    width: 632rpx;
    height: 346rpx;
    position: absolute;
    top: 174rpx;
    left: 58rpx;
}
.add_noneText {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    width: 100%;
    position: absolute;
    top: 478rpx;
    left: 0;
}
.add_btn {
    width: 170rpx;
    height: 50rpx;
    background: #101010;
    border-radius: 24rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 528rpx;
    left: 284rpx;
}
.add_have_list {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-bottom: 210rpx;
}
.add_list {
    width: 100%;
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1rpx solid #ececec;
}
.add_top {
    width: 690rpx;
    margin-bottom: 26rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.add_top_item {
    display: flex;
    align-items: center;
}
.add_name {
    margin-right: 58rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333;
}
.add_tel {
    margin-right: 11px;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #555;
}
.addDetail {
    width: 632rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 36rpx;
}
.defalut_icon {
    width: 52rpx;
    height: 30rpx;
    background: rgba(231, 161, 36, 1);
    border-radius: 1rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 30rpx;
}
.xiu_icon {
    height: 24rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    position: absolute;
    bottom: 44rpx;
    right: 30rpx;
}
.addlist-footer-btn {
    /* position: fixed;
	bottom: 0;
	width:100%;
	height:210rpx; */
}
.saveBtn {
    /* width: 90%;*/
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
    /* margin: 40rpx 5% 0; */
    width: 260rpx;
}
.row_bottom {
    width: 100%;
    position: fixed;
    bottom: 40px;
    justify-content: space-around;
}
.del_icon {
    width: 30rpx;
    height: 32rpx;
    padding: 0 20rpx;
}

.delect_bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgb(0, 0, 0, 0.6);
}
.delet_view {
    width: 600rpx;
    height: 300rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 20rpx;
    position: fixed;
    top: 408rpx;
    left: 74rpx;
    box-sizing: border-box;
}
.delet_title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top: 100rpx;
    margin-bottom: 48rpx;
}
.btn_group {
    display: flex;
}
.think_btn {
    width: 100px;
    height: 80rpx;
    background: rgba(244, 244, 244, 1);
    border-radius: 34rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    margin-left: 50rpx;
    margin-right: 100rpx;
}
.delect_btn {
    width: 200rpx;
    height: 80rpx;
    background: #ec1919;
    border-radius: 40rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
}
.addressDetail {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 24rpx;
    color: #fff;
    text-align: center;
    background-color: #e7a124;
}
.del {
    width: 130rpx;
    height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
    background: #ff5340;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #fff;
}
.no-address {
    width: 100%;
    height: 80vh;
    padding: 20rpx 60rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-address-img {
    width: 632rpx;
    height: 368rpx;
}

.no-address-text {
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
