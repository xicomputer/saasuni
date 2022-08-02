<template>
    <view class="ifo_bigBox">
        <view class="fareninfo">法人信息</view>
        <view class="info">
            <van-field :value="useName" label="姓名：" placeholder="请填写姓名" @blur="onDescribe1" required />
            <van-field :value="tel" type="tel" label="电话-商家账号:" @blur="onDescribe2" placeholder="请填写电话号码" required />
            <van-field :value="card" label="身份证号码：" placeholder="请填写身份证号码" @blur="onDescribe3" required />
        </view>

        <view class="fareninfo">商家信息</view>
        <!-- 商家信息 -->
        <view class="sj_info" style="padding-bottom: 10px">
            <view class="sj_category" @tap="clickCategory">
                <van-field
                    placeholder-style="font-size: 28rpx;color: #333333;"
                    size="large"
                    :value="businessName"
                    @blur="onDescribe4"
                    label="经营品类"
                    placeholder="请选择经营品类"
                    readonly
                    required
                />
            </view>
            <van-field
                placeholder-style="font-size: 28rpx;color: #333333;"
                size="large"
                :value="shop_pname"
                label="商家名称："
                @blur="onDescribe5"
                placeholder="请填写商家名称"
                required
            />
            <view @tap="openshopshow">
                <van-field
                    placeholder-style="font-size: 28rpx;color: #333333;"
                    size="large"
                    :value="shop_address"
                    @blur="onDescribe6"
                    label="商家地址："
                    placeholder="请选择商家地址"
                    readonly
                    required
                />
            </view>
            <van-field
                placeholder-style="font-size: 28rpx;color: #333333;"
                size="large"
                :value="shop_detail_address"
                label="详细地址："
                @blur="onDescribe7"
                placeholder="请填写详细地址"
                required
            />
        </view>

        <!-- 营业执照 -->
        <view class="fareninfo">
            <span style="color: #ee0a24; font-size: 11px">*</span>
            营业执照
        </view>
        <view class="business">
            <van-uploader @after-read="afterRead4" @oversize="oversize">
                <image :src="license" class="license" :lazy-load="true" mode="aspectFill"></image>
            </van-uploader>
            <view class="business-text">须与上面填写法人信息一致</view>
        </view>
        <view class="submit" @tap="clickSubimt">立即提交</view>
        <van-popup :show="show" @close="onClose" position="bottom" custom-style="height: 50%;">
            <van-area :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" title="标题" @cancel="cancel" @confirm="confirm" v-if="showarea" />
        </van-popup>
        <!-- 经营品类弹框 -->
        <van-popup :show="showCategory" @close="onClose1" position="bottom" style="height: 70vh; border-radius: 8px 8px 0 0">
            <view style="display: flex">
                <view class="categories-body-left">
                    <van-sidebar :active-key="activeKey">
                        <van-sidebar-item
                            :title="item.businessName"
                            :data-index="item.marchantTypeId"
                            @tap.native="onChange($event, { index: item.marchantTypeId })"
                            v-for="(item, index) in navList"
                            :key="index"
                        ></van-sidebar-item>
                    </van-sidebar>
                    <!-- <view class="categories-nav-item {active: navActive === idx}" wx:for="(nav, idx) in{{navList}}" wx:key="idx" bindtap="changeNav(nav, idx)">{{item.businessName }}</view> -->
                </view>
                <view class="categories-body-right">
                    <view class="categories-nav-right-item" :data-index="item" @tap="suerCategories" v-for="(item, index) in showGoodsList" :key="index">
                        <image :src="item.industryImage" style="width: 130rpx; height: 130rpx"></image>

                        <view style="line-height: 48rpx">{{ item.businessName }}</view>
                    </view>
                </view>
            </view>
        </van-popup>
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
// import vanUploader from './@vant/weapp/uploader/index';
// import vanField from './@vant/weapp/field/index';
// import vanArea from './@vant/weapp/area/index';
// import vanPopup from './@vant/weapp/popup/index';
// import vanSidebar from './@vant/weapp/sidebar/index';
// import vanSidebarItem from './@vant/weapp/sidebar-item/index';
// import vanDialog from './@vant/weapp/dialog/index';
// pages/ImproveInformation/ImproveInformation.js
import AreaList from '../../public/js/area';
// import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
export default {
    components: {
        // vanUploader,
        // vanField,
        // vanArea,
        // vanPopup,
        // vanSidebar,
        // vanSidebarItem,
        // vanDialog
    },
    data() {
        return {
            useName: '',
            tel: '',
            card: '',
            businessName: '',
            shop_pname: '',
            shop_address: '',
            shop_detail_address: '',
            isCard1: false,
            isCard2: false,
            isCard3: false,
            isbusiness: false,
            card1: 'https://xssj.letterbook.cn/applet/images/card1.png',
            card2: 'https://xssj.letterbook.cn/applet/images/card2.png',
            card3: 'https://xssj.letterbook.cn/applet/images/card3.png',
            shop_Category: '',
            license: 'https://xssj.letterbook.cn/applet/images/face.png',
            showarea: false,
            show: false,
            areaList: AreaList,
            shop_address: '',
            showCategory: false,
            navList: [],
            navListItem: [],
            navActive: '',
            marchantTypeId: '',
            businessName: '',
            provinceidcode: '',
            cityidcode: '',
            areaidcode: '',
            uniqueId: '',
            activeKey: '',
            showGoodsList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var uniqueId = uni.getStorageSync('uniqueId');
        this.setData({
            uniqueId: uniqueId
        });
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
        // 限制图片上传的大小
        // oversize:function(file){
        //   wx.showToast({
        //     title: '文件大小不能超过4M',
        //     icon: 'none'
        //   })
        //   return
        // },
        afterRead4(event) {
            var that = this;
            const { file } = event.detail;
            console.log(file.path, '***');
            that.setData({
                license: file.path,
                isbusiness: true
            });
        },

        clickCategory: function () {
            var token = uni.getStorageSync('token');
            var that = this;
            that.setData({
                showCategory: true
            });
            uni.request({
                //接口，
                url: 'https://xssj.letterbook.cn/xssh/merchant/queryMarchantBigTypeList',
                header: {
                    token: token,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {},
                method: 'POST',
                success: function (res) {
                    console.log(res);
                    that.setData({
                        navList: res.data.data
                    });
                    console.log(res.data.data[0].marchantTypeId, '****');
                    that.getMarchantItem(res.data.data[0].marchantTypeId);
                },
                fail: function () {
                    doFail();
                }
            });
        },

        getMarchantItem: function (index) {
            var token = uni.getStorageSync('token');
            var that = this;
            uni.request({
                //接口，
                url: 'https://xssj.letterbook.cn/xssh/merchant/queryMarchantLittleTypeList',
                header: {
                    token: token,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    parentId: index
                },
                method: 'POST',
                success: function (res) {
                    that.setData({
                        navListItem: res.data.data
                    });
                },
                fail: function () {
                    doFail();
                }
            });
        },

        onChange: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.target.dataset.index);
            this.getMarchantItem(e.target.dataset.index);
        },

        suerCategories: function (event) {
            console.log(event.currentTarget.dataset.index.marchantTypeId);
            this.setData({
                showCategory: false,
                marchantTypeId: event.currentTarget.dataset.index.marchantTypeId,
                businessName: event.currentTarget.dataset.index.businessName
            });
        },

        // changeNav:function(val,idx){
        //   console.log(val,idx)
        //   this.setData({
        //     navActive:idx
        //   })
        //   this.getMarchantItem(val.marchantTypeId)
        // },
        openshopshow: function () {
            var that = this; // that.data.showarea = !that.data.showarea

            that.setData({
                show: true,
                showarea: true
            });
        },

        onClose() {
            this.setData({
                show: false
            });
        },

        onClose1() {
            this.setData({
                showCategory: false
            });
        },

        cancel: function () {
            this.setData({
                show: false
            });
        },

        confirm: function (item) {
            console.log(item);
            var values = item.detail.values;

            if (values[0].name != '' && values[1].name != '' && values[2].name != '') {
                var province = values[0].name;
                var city = values[1].name;
                var area = values[2].name;
                this.provinceidcode = values[0].code;
                this.cityidcode = values[1].code;
                this.areaidcode = values[2].code;
                this.setData({
                    show: false,
                    shop_address: province + ' ' + city + ' ' + area
                });
            }
        },

        onDescribe1: function (e) {
            this.setData({
                useName: e.detail.value
            });
        },

        onDescribe2: function (e) {
            this.setData({
                tel: e.detail.value
            });
        },

        onDescribe3: function (e) {
            this.setData({
                card: e.detail.value
            });
        },

        onDescribe4: function (e) {
            this.setData({
                businessName: e.detail.value
            });
        },

        onDescribe5: function (e) {
            this.setData({
                shop_pname: e.detail.value
            });
        },

        onDescribe6: function (e) {
            this.setData({
                shop_address: e.detail.value
            });
        },

        onDescribe7: function (e) {
            this.setData({
                shop_detail_address: e.detail.value
            });
        },

        clickSubimt: function () {
            var token = uni.getStorageSync('token'); //console.log(this.data.tel)

            if (this.useName == '') {
                uni.showToast({
                    title: '请填写姓名',
                    icon: 'none'
                });
                return;
            }

            if (this.useName.length > 10) {
                uni.showToast({
                    title: '姓名不能超过十个字符',
                    icon: 'none'
                });
                return;
            }

            if (this.tel == '') {
                uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                });
                return;
            }

            if (!/^1[3456789]\d{9}$/.test(this.tel)) {
                uni.showToast({
                    title: '手机号有误',
                    icon: 'none'
                });
                return;
            }

            if (this.card == '') {
                uni.showToast({
                    title: '请输入身份证',
                    icon: 'none'
                });
                return;
            }

            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

            if (reg.test(this.card) === false) {
                uni.showToast({
                    title: '身份证输入有误',
                    icon: 'none'
                });
                return;
            }

            if (this.businessName == '') {
                uni.showToast({
                    title: '请选择经营品类',
                    icon: 'none'
                });
                return;
            }

            if (this.shop_pname == '') {
                uni.showToast({
                    title: '请填写商家名称',
                    icon: 'none'
                });
                return;
            }

            if (this.shop_pname.length > 10) {
                uni.showToast({
                    title: '商家名称不能超过',
                    icon: 'none'
                });
                return;
            }

            if (this.shop_address == '') {
                uni.showToast({
                    title: '请选择商家地址',
                    icon: 'none'
                });
                return;
            }

            if (this.shop_detail_address == '') {
                uni.showToast({
                    title: '请填写商家详细地址',
                    icon: 'none'
                });
                return;
            }

            if (this.shop_detail_address.length > 30) {
                uni.showToast({
                    title: '商家详细地址不能超过30个字符',
                    icon: 'none'
                });
                return;
            }

            if (this.isbusiness == false) {
                uni.showToast({
                    title: '请上传营业执照',
                    icon: 'none'
                });
                return;
            }

            Dialog.confirm({
                title: '提示',
                message: '确认提交？'
            }).then(() => {
                uni.request({
                    //接口，
                    //url:'https://xssj.letterbook.cn/xssh/merchant/addMarchant',
                    header: {
                        token: token,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        licenseImg: this.license,
                        legalPerson: this.useName,
                        //姓名
                        legalPersonCardId: this.tel,
                        //电话
                        legalPersonCardId: this.card,
                        //身份证号码
                        nickName: this.shop_pname,
                        //商家名称
                        address: this.shop_detail_address,
                        //详细地址
                        marchantTypeId: this.marchantTypeId,
                        //经营品类id
                        provinceid: this.provinceidcode,
                        cityid: this.cityidcode,
                        areaid: this.areaidcode,
                        uniqueId: this.uniqueId
                    },
                    method: 'POST',
                    success: function (res) {
                        uni.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function () {
                        doFail();
                    }
                });
            });
        },

        oversize() {
            console.log('占位：函数 oversize 未声明');
        }
    }
};
</script>
<style>
/* pages/ImproveInformation/ImproveInformation.wxss */
.ifo_bigBox {
    width: 100%;
    min-height: 100vh;
    background: #f2f2f2;
}

.fareninfo {
    height: 50rpx;
    padding: 26rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 50rpx;
    color: #333333;
    opacity: 1;
    text-align: center;
}

.info {
    width: 690rpx;
    height: 319rpx;
    margin: 0 15px;
    background: #fff;
    border-radius: 20rpx;
}

.info .van-field__label {
    width: 221rpx;
}

.info_xx {
    font-size: 32rpx;
    color: #ff0000;
}

.info_name input {
    margin-top: 4rpx;
}

.row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 40rpx;
    padding: 0 30rpx;
}

.delete {
    width: 300rpx;
    height: 210rpx;
    background: #ffffff;
    border: 1px dashed #e7a124;
    opacity: 1;
    text-align: center;
}

.ziz {
    width: 269rpx;
    height: 171rpx;
    padding: 19.5rpx 14.5rpx;
}

.show {
    visibility: visible;
}

.hidden {
    visibility: hidden;
}

.icon {
    width: 35rpx;
    height: 35rpx;
}

.zhong {
    width: 300rpx;
    height: 210rpx;
    background: #ffffff;
    border: 1px dashed #e7a124;
    opacity: 1;
    /* flex: 5; */
    /* position: relative; */
}

.thirdOne {
    width: 300rpx;
    height: 210rpx;
    background: #ffffff;
    border: 1px dashed #e7a124;
    opacity: 1;
    margin-top: 13rpx;
}

.im1 {
    position: absolute;
    width: 96%;
    margin-left: 2%;
}

.im2 {
    width: 84%;
    height: 266rpx;
    margin-left: 8%;
    margin-top: 4%;
}

.add {
    flex: 1;
    text-align: center;
}

/* 商家信息 */
.sj_info {
    width: 690rpx;
    height: 375rpx;
    margin: 0 auto;
    background: #ffffff;
    opacity: 1;
    border-radius: 10rpx;
}
.sj_info .van-field__label,
.sj_info input {
    font-size: 28rpx;
    color: #333333;
}
.sj_category {
    height: 106rpx;
}

/*营业执照*/
.business {
    height: 264px;
    margin: 0 15px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.license {
    width: 310rpx;
    height: 380rpx;
}
.business-text {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
    color: rgba(255, 0, 0, 1);
    opacity: 1;
    margin-top: 10rpx;
}

.submit {
    width: 670rpx;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    background: rgba(16, 16, 16, 1);
    box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 100rpx;
    margin: 0 auto;
    color: #fff;
    margin-top: 60rpx;
    margin-bottom: 80rpx;
    font-size: 32rpx;
}
/* 精品分类 */
.categories-body-left {
    background: #f4f5f7;
    width: 160rpx;
    height: 73vh;
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1;
}
.categories-nav-item {
    display: block;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    color: #666666;
    position: relative;
    font-size: 32rpx;
}
.active {
    background: #ffffff;
}
.categories-body-right {
    background: #ffffff;
    height: 70vh;
    overflow-y: scroll;
    padding: 20rpx 0;
    flex: 3;
}
.categories-nav-right-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    width: 33.33%;
    float: left;
}
.van-sidebar-item {
    width: 188rpx;
}
</style>
