<template>
    <view>
        <!-- 搜索框 -->

        <view :class="'me-fx-row me-fx-sb-c search-box ' + searchBoxBg" :style="'top:' + heights + 'px;position:' + (fixed ? 'fixed' : 'relative')">
            <navigator class="search-container-content" hover-class="none" :url="'/pages/Index/searchGood/searchGood?marchantId=' + marchantId">
                <view :class="'me-fx-row me-fx-start-c search-ipt ' + iptBgClass">
                    <image class="search-icon" src="/static/pages/static/search-icon.png"></image>
                    <text>请输入商品名称</text>
                </view>
            </navigator>
            <button :class="'subscribe-btn ' + btnBgClass" @tap="parseEventDynamicCode($event, subscribe == 0 ? 'showDingYue' : '')">
                {{ subscribe === 0 ? '商品订阅' : '已订阅' }}
            </button>
        </view>
        <view v-if="fixed" class="placeholder-empty"></view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/search/search.js
const app = getApp();
export default {
    data() {
        return {
            searchBoxBg: '',
            iptBgClass: '',
            btnBgClass: '',
            fixed: false,
            heights: '',
            marchantId: '',
            subscribe: 0
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        // tempId: {
        //     type: [String, Number],
        //     value: 1
        // },
    },
    beforeMount: function () {},
    /**
     * 组件的方法列表
     */
    methods: {
        getBg() {
            var tempId = this.tempId;
            var searchBoxBg = '';
            var iptBgClass = '';
            var btnBgClass = '';
            switch (tempId) {
                case '3':
                    searchBoxBg = 'search-box-bg2';
                    break;

                default:
                    searchBoxBg = 'search-box-bg1';
            }

            switch (tempId) {
                case '3':
                    iptBgClass = 'ipt-bg2';
                    break;

                default:
                    iptBgClass = 'ipt-bg1';
            }

            switch (tempId) {
                case '1':
                    btnBgClass = 'btn-bg2';
                    break;

                case '2':
                    btnBgClass = 'btn-bg3';
                    break;

                case '4':
                    btnBgClass = 'btn-bg6';
                    break;

                case '3':
                    btnBgClass = 'btn-bg5';
                    break;

                case '5':
                case '6':
                    btnBgClass = 'btn-bg6';
                    break;

                case '7':
                    btnBgClass = 'btn-bg8';
                    break;

                case '9':
                    btnBgClass = 'btn-bg9';
                    break;

                case '8':
                    btnBgClass = 'btn-bg8s';
                    break;

                case '10':
                    btnBgClass = 'btn-bg10';
                    break;

                default:
                    btnBgClass = 'btn-bg1';
            }

            this.setData({
                searchBoxBg,
                iptBgClass,
                btnBgClass
            });
        },

        //  订阅商铺
        showDingYue() {
            // 获取用户信息
            var that = this;
            let appid = uni.getStorageSync('appid');
            let data = {
                authorizerAppid: appid,
                sceneType: 1
            };
            app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then((res) => {
                let tempData = res.data.data;
                uni.requestSubscribeMessage({
                    tmplIds: tempData,
                    success: function (res) {
                        uni.getSetting({
                            withSubscriptions: true,
                            success: (result) => {
                                uni.showToast({
                                    title: '订阅消息成功'
                                }); // this.triggerEvent('event', true)
                                // if (result.subscriptionsSetting['jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'] == 'accept') {
                                //     that.setData({
                                //         status: 2
                                //     })
                                // }
                                // if (res['jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo'] == 'accept') {

                                let data = {
                                    status: that.status,
                                    marchantId: that.marchantId,
                                    templateIds: tempData,
                                    appId: appid
                                };
                                app.globalData.sjrequest('/basic/addsubscription', data).then((res) => {
                                    if (res.data.code == 200) {
                                        uni.showToast({
                                            title: '订阅消息成功'
                                        });
                                        this.$emit('event', {
                                            detail: true
                                        });
                                    } else {
                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        });
                                    }
                                });
                            }
                        });
                    },

                    fail(e) {
                        console.log(e);
                        uni.showToast({
                            title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
                            icon: 'none'
                        });
                    }
                });
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';
</style>
