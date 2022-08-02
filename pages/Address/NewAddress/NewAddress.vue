<template>
    <view class="newadd">
        <view class="add_list_box">
            <view class="addList">
                <view class="add_list_title">收货人</view>
                <input
                    style="padding-left: 40px"
                    class="inputBold"
                    type="text"
                    placeholder="请填写收货人姓名"
                    maxlength="16"
                    placeholder-class="placeholder"
                    @blur="updateName"
                    :value="addrname"
                />
            </view>
            <view class="addList">
                <view class="add_list_title">手机号码</view>
                <input
                    type="tel"
                    placeholder="请填写收货人手机号"
                    placeholder-class="placeholder"
                    maxlength="11"
                    class="inputBold"
                    :value="addrphone"
                    @blur="updatePhone"
                    blur="animate()"
                />
            </view>
            <view class="addList">
                <view class="add_list_title">所在地区</view>
                <input type="text" disabled placeholder="省市区县、乡镇等" placeholder-class="placeholder" class="inputBold" :value="shop_address" @tap="showAreaList" />
                <!-- <image catchtap="getPosition" style="width:28rpx;height:28rpx;padding:20rpx" src="/pages/img/order/addr.png"></image> -->
            </view>
            <view class="addList">
                <view class="add_list_title">详细地址</view>
                <input placeholder="街道、楼牌号等" class="text_area inputBold" placeholder-class="placeholder" @input="addrareaFun" :value="addrarea" maxlength="50" />
            </view>
            <view class="default_list">
                <view class="default_left">
                    <view class="default_text1">设置默认地址</view>
                    <view class="default_text2">提醒：每次下单会默认推荐使用该地址</view>
                </view>
                <image src="/static/pages/img/xuanze.png" @tap="onChange" v-if="checked" class="check_default_icon" />
                <image src="/static/pages/img/weixuan.png" @tap="onChange" v-if="!checked" class="check_default_icon" />
            </view>
        </view>
        <view class="addlist-footer-btn">
            <view class="saveBtn" @tap="saveBtn">保存</view>
        </view>
        <van-popup :show="showarea" @close="onClose" position="bottom" custom-style="height: 50%;" z-index="999">
            <van-area value="areaCode" :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" @cancel="cancel" @confirm="confirm" v-if="showarea" />
        </van-popup>
        <!-- <view class="shadow" wx:if="{{showarea}}" bindtap="cancel"></view> -->
    </view>
</template>

<script>
// import vanArea from './@vant/weapp/area/index';
// import vanPopup from './@vant/weapp/popup/index';
// pages/Address/NewAddress/NewAddress.js
import AreaList from '../../../public/js/area';
const app = getApp();
export default {
    // components: {
    //     vanArea,
    //     vanPopup
    // },
    data() {
        return {
            region: ['省市区县', '、', '乡镇等'],
            customItem: '',
            // 默认地址选择
            defaultboll: 0,
            addrname: '',
            addrphone: '',
            addrarea: '',
            isDefault: 0,
            //标识是否为默认地址 1是 0否
            title: '',
            shippingId: '',
            address: '',
            checked: true,
            showarea: false,
            areaList: AreaList,
            provincesName: '',
            //省
            cityName: '',
            //市
            areaName: '',
            //区
            provincesId: '',
            //省code
            cityId: '',
            //市code
            areaId: '',
            //区code
            shop_address: '',
            addr: {},
            path: '/addlist',
            from: '',
            orderData: '',
            title: '新建地址'
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.item) {
            uni.setNavigationBarTitle({
                title: '修改地址'
            });
            var item = JSON.parse(options.item);
            console.log(item, '这个item是什么');
            this.setData({
                title: '修改地址',
                shippingId: item.shippingId,
                addrarea: item.address,
                checked: item.isDefault == 1 ? true : false,
                provincesName: item.provincesName,
                cityName: item.cityName,
                areaName: item.areaName,
                addrname: item.contacts,
                addrphone: item.contactWay,
                areaId: item.areaId,
                shop_address: item.provincesName + '' + item.cityName + '' + item.areaName
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
        onChange() {
            this.setData({
                checked: !this.checked
            });
        },

        showAreaList() {
            this.setData({
                showarea: true
            });
        },

        /*点击取消*/
        cancel() {
            this.setData({
                showarea: false
            });
        },

        updateName(e) {
            this.setData({
                addrname: e.detail.value
            });
        },

        updatePhone(e) {
            this.setData({
                addrphone: e.detail.value
            });
        },

        addrareaFun(e) {
            this.setData({
                addrarea: e.detail.value
            });
            console.log(this.addrarea);
        },

        confirm: function (item) {
            console.log(item);
            var values = item.detail.values;

            if (values[0].name != '' && values[1].name != '' && values[2].name != '') {
                var province = values[0].name;
                var city = values[1].name;
                var area = values[2].name;
                this.setData({
                    showarea: false,
                    shop_address: province + ' ' + city + ' ' + area,
                    areaName: area,
                    cityName: city,
                    provincesName: province,
                    areaId: values[2].code
                });
                console.log(this.shop_address);
            }
        },

        saveBtn() {
            var that = this;
            var pages = getCurrentPages();
            var prevPge = pages[pages.length - 2];

            if (this.addrname == '') {
                uni.showToast({
                    icon: 'none',
                    title: '收货人姓名不能为空！'
                });
                return;
            }

            if (this.addrphone == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请填写收货人手机号！'
                });
                return;
            }

            var re = /^1\d{10}$/;
            let str = this.addrphone;

            if (!re.test(str)) {
                uni.showToast({
                    icon: 'none',
                    title: '抱歉手机号不合法'
                });
                return;
            }

            if (this.shop_address == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请选择所在地区'
                });
                return;
            }

            if (this.addrareaFun == '') {
                uni.showToast({
                    icon: 'none',
                    title: '请填写详细地址！'
                });
                return;
            }

            if (this.checked == true) {
                this.setData({
                    isDefault: 1
                });
            } else {
                this.setData({
                    isDefault: 0
                });
            }

            1;

            if (this.title == '新建地址') {
                let data = {
                    address: this.addrarea,
                    contacts: this.addrname,
                    contactWay: this.addrphone,
                    provincesName: this.provincesName,
                    cityName: this.cityName,
                    areaId: this.areaId,
                    areaName: this.areaName,
                    isDefault: this.isDefault
                };
                uni.showLoading({
                    title: '保存中',
                    mask: true
                });
                app.globalData.sjrequest('/commodity/addShipping', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            title: '新建成功！'
                        });
                        uni.navigateBack({
                            delta: 0,
                            success: (res) => {
                                // prevPge.showaddrList();
                            }
                        });
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
                    }
                });
            } else {
                let data = {
                    address: this.addrarea,
                    contacts: this.addrname,
                    contactWay: this.addrphone,
                    provincesName: this.provincesName,
                    cityName: this.cityName,
                    areaId: this.areaId,
                    areaName: this.areaName,
                    isDefault: this.isDefault,
                    shippingId: this.shippingId
                };
                console.log(data, '修改参数');
                uni.showLoading({
                    title: '修改中',
                    mask: true
                });
                app.globalData.sjrequest('/commodity/updateShipping', data).then((res) => {
                    if (res.data.code == 200) {
                        uni.showToast({
                            icon: 'none',
                            title: '修改成功！'
                        }).then((res) => {
                            uni.navigateBack({
                                delta: 0,
                                success: (res) => {
                                    // prevPge.showaddrList();
                                },
                                fail: (res) => {
                                    uni.showToast({
                                        title: res.data.message,
                                        icon: 'none'
                                    });
                                },
                                complete: (res) => {}
                            });
                        });
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
                    }
                });
            }
        },

        // getPosition() {
        //   let that = this
        //   wx.getSetting({
        //     success(res) { // 查看所有权限
        //       console.log(res.authSetting['scope.userLocation'])
        //       let status = res.authSetting['scope.userLocation'] // 查看位置权限的状态，此处为初次请求，所以值为undefined
        //       if (!status) { // 如果是首次授权(undefined)或者之前拒绝授权(false)
        //         wx.authorize({ // 发起请求用户授权
        //           scope: 'scope.userLocation',
        //           success() { // 用户允许了授权
        //             wx.chooseLocation({
        //               success(res) {
        //                 console.log(res)
        //                 that.loadCity(res.longitude, res.latitude)
        //                 that.setData({
        //                   addrarea: res.name
        //                 })
        //               }
        //             })
        //           },
        //           fail() {
        //             wx.showToast({
        //               title: '没有获取地理位置的权限，请点击右上角的设置进行授权',
        //               icon: 'none'
        //             })
        //           }
        //         })
        //       } else {
        //         wx.chooseLocation({
        //           success(res) {
        //             console.log(res)
        //             that.loadCity(res.longitude, res.latitude)
        //             that.setData({
        //               addrarea: res.name
        //             })
        //           }
        //         })
        //       }
        //     }
        //   })
        // },
        // 逆地理编码得到省市区
        loadCity: function (longitude, latitude) {
            var that = this;
            var ak = 'nAETk3quykytq5oGFuDuxZWG6ex2j7yz';
            uni.request({
                url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=' + ak + '&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
                data: {},
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    console.log(res); // 打印信息，可以参考下图
                    // 省

                    var province = res.data.result.addressComponent.province; // 市

                    var city = res.data.result.addressComponent.city; // 区

                    var district = res.data.result.addressComponent.district;
                    var newCity = province + ' ' + city + ' ' + district;
                    var areaId = res.data.result.addressComponent.adcode;
                    that.setData({
                        shop_address: province + ' ' + city + ' ' + district,
                        areaName: district,
                        cityName: city,
                        provincesName: province,
                        areaId: areaId
                    });
                    console.log(newCity);
                },
                fail: function () {
                    util.showErrorToast('定位当前位置失败');
                }
            });
        },

        onClose() {
            console.log('占位：函数 onClose 未声明');
        }
    }
};
</script>
<style>
/* pages/Address/NewAddress/NewAddress.wxss */
.newadd {
    min-height: 100vh;
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
    background: rgba(255, 83, 64, 1);
    box-shadow: 0px 0px 28rpx 8rpx rgba(0, 0, 0, 0.05);
    border-radius: 50rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 100rpx;
    color: rgba(255, 255, 255, 1);
    margin: 40rpx 5% 0;
}

.add_list_box {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 30rpx;
}

.addList {
    width: 100%;
    height: 110rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid #ececec;
}

.add_list_title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    display: flex;
}

.addList input {
    flex-grow: 1;
    height: 54rpx;
    padding-left: 50rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    font-family: PingFang SC;
    border: none;
    /* font-weight:bold; */
    color: #333;
}

.inputBold {
    font-weight: bold;
}

.picker {
    margin-top: 34rpx;
}

.picker1 {
    flex-grow: 1;
    height: 110rpx;
    padding-left: 66rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
}

.add_right {
    display: flex;
    align-items: center;
}

.dw_icon {
    width: 30rpx;
    height: 30rpx;
}

.dw_text {
    margin-left: 10rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
}

.add_detail_list {
    display: flex;
    box-sizing: border-box;
    padding-top: 44rpx;
    /* height: 168rpx; */
    border-bottom: 1rpx solid #ececec;
}

.text_area {
    width: 0;
    flex: 1;
    font-size: 28rpx;
    line-height: 34rpx;
    font-family: PingFang SC;
    color: #333;
    padding-left: 44rpx;
    box-sizing: border-box;
    height: auto;
    border: none;
}

.default_list {
    width: 100%;
    height: 170rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1rpx solid #ececec;
}

.default_text1 {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
    margin-bottom: 28rpx;
}

.default_text2 {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(154, 154, 154, 1);
}

.check_default_icon {
    width: 76rpx;
    height: 40rpx;
}
.placeholder {
    color: #ccc;
}
/* .van-picker {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
} */
.shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: #000;
    opacity: 0.6;
}
</style>
