<template>
    <!-- pages/Index/shopHome/components/Tabbar/tabbar.wxml -->
    <!-- Tabbar栏 -->
    <view class="custom-tab-bar">
        <view
            class="custom-tab-bar-item"
            v-if="item.isHave"
            @tap="changeTab"
            :data-text="item.text"
            data-url="/pages/shopHome/dynamic/dynamic"
            v-for="(item, index) in tabList"
            :key="index"
        >
            <image :class="item.text == '商家文化' ? 'shopsSty' : 'custom-Img'" :src="nowTabbarTextClone == item.text ? item.imgActive : item.img" mode="aspectFill"></image>

            <!-- /image/index/index1_active.png -->

            <text v-if="item.text !== '商家文化'" :class="nowTabbarTextClone == item.text ? 'custom-tab-bar-text custom-tab-bar-text-active' : 'custom-tab-bar-text'">
                {{ item.text }}
            </text>
        </view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/Tabbar/tabbar.js
export default {
    data() {
        return {
            wwe: 'bv',
            addHei: 'addHei',
            // tabList: [],
            nowTabbarTextClone: '首页',
            // markerInfo: {},
            nowTabbarTextClone: ''
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        tabList: {
            type: Array,
            default: () => []
        },
        // markerInfo: {
        //     type: Object,
        //     default: () => ({})
        // },
        nowTabbarText: {
            type: String
        }
    },
    beforeMount: function () {
        this.setData({
            addHei: getApp().globalData.isAdapter
        });
        // this.tabList = this.tabList;
        // this.markerInfo = this.markerInfo;
        this.nowTabbarTextClone = this.nowTabbarText;
    },
    watch: {
        tabList: {
            handler: function (a) {
                console.log(a, 'tab值');
            },

            immediate: true,
            deep: true
        },

        nowTabbarText: {
            handler: function (newVal, oldVal) {
                this.nowTabbarTextClone = newVal;
            },

            immediate: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // tabbar
        changeTab(e) {
            let text = e.currentTarget.dataset.text;
            this.setData({
                nowTabbarTextClone: text
            });

            if (text == '首页') {
                // wx.setNavigationBarTitle({
                //     title: this.data.markerInfo.nickName
                // })
            }

            if (text == '活动') {
                uni.setNavigationBarTitle({
                    title: '活动'
                });
            }

            if (text == '热卖') {
                uni.setNavigationBarTitle({
                    title: '热卖'
                });
            }

            if (text == '购物车') {
                uni.showLoading({
                    title: '加载中'
                });
                uni.setNavigationBarTitle({
                    title: '购物车'
                });
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            }

            if (text == '订阅通知') {
                uni.setNavigationBarTitle({
                    title: '订阅通知'
                });
            }

            if (text == '我的') {
                uni.setNavigationBarTitle({
                    title: '我的'
                });
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            }

            if (text == '会员') {
                uni.setNavigationBarTitle({
                    title: '会员'
                });
            }

            if (text == '商品推荐') {
                uni.setNavigationBarTitle({
                    title: '商品推荐'
                });
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            }

            this.$emit('myManager', {
                detail: text
            }); // if (text == '商家文化') {
            //         let url = e.currentTarget.dataset.url
            //         let marchantId = wx.getStorageSync('merchantId')
            //         wx.navigateTo({
            //             url: url+"?marchantId="+marchantId,
            //         })
            // }
        }
    }
};
</script>
<style>
/* pages/Index/shopHome/components/Tabbar/tabbar.wxss */
/* tabbar */
.custom-tab-bar {
    width: 100%;
    height: 140rpx;
    background: #fff;
    border-top: 1rpx solid #e4e4e4;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 99;
}

.custom-tab-bar-item {
    width: 0;
    flex: 1;
    height: 120%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10rpx;
    position: relative;
}

.custom-tab-bar-text {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 28rpx;
    color: #999999;
    white-space: nowrap;
    margin-top: 5rpx;
}

.custom-tab-bar-text-active {
    color: #fb5050;
}

.custom-tab-bar-item .custom-Img {
    width: 40rpx;
    height: 40rpx;
    box-shadow: 0rpx 6rpx 12rpx rgba(247, 247, 247, 0.16);
}

.custom-tab-bar-item .shopsSty {
    width: 90rpx !important;
    height: 90rpx !important;
}
</style>
