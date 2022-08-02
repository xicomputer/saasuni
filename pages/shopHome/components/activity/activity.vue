<template>
    <view>
        <!-- <view class="activity"  wx:if="{{tempId < 12}}">
    <view class="me-fx-row me-fx-sb activity_list">
        <view class="me-fx-row activitys_Info {{tempBg}}"  bindtap="goSaleShop" data-url="/pages/shopHome/dynamic/dynamic">
            <view class="Info_msg me-fx-row me-fx-start-c">
                <text class="good-express">精彩快讯</text>
                <image class="Info_msg_img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FRectangle%201415%402x.png"></image>
                <view class="me-fx-col shop_msg_info">
                    <text class="new_msg {{'text_color'+tempId}}">最新消息</text>
                </view>
                <image class="right-arrow" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FVector%402x.png" mode="widthFix" ></image>
            </view>
            <view class="me-fx-1 me-fx-row me-fx-c-c">
            </view>
        </view>
    </view>
</view> -->

        <view class="activity" style="margin: 0 auto; margin-top: 20rpx" v-if="tempId < 12">
            <image
                class="alerts-Img"
                @tap="goSaleShop"
                data-url="/pages/shopHome/dynamic/dynamic"
                src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E5%95%86%E5%AE%B6%E6%B6%88%E6%81%AF%E9%80%9A%E7%9F%A5.png"
                mode="aspectFill"
            ></image>
        </view>
        <view
            v-else
            style="position: absolute; z-index: 9999; width: 90rpx; height: 90rpx; margin-left: -45rpx"
            @tap="goSaleShop"
            data-url="/pages/shopHome/dynamic/dynamic"
        ></view>
    </view>
</template>

<script>
// pages/Index/shopHome/components/activity/activity.js
const app = getApp();
export default {
    data() {
        return {
            tempBg: ''
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        commentList: Array,
        marchantId: {
            type: String,
            default: ''
        },
        tempId: {
            type: [String, Number],
            default: 1
        },
        shopList: {
            type: Array,
            default: () => []
        },
        hotelList: {
            type: Array,
            default: () => []
        },
        activityInfo: {
            type: Object
        }
    },
    beforeMount: function () {
        // this.getActiveList();
    },
    // 监听数据
    watch: {
        tempId: {
            handler: function (nowVal, oldVal) {
                if (nowVal) {
                    this.setData({
                        tempBg: 'temp-bg' + nowVal
                    });
                }
            },

            immediate: true,
            deep: true
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goSaleShop(e) {
            let url = e.currentTarget.dataset.url;
            let marchantId = uni.getStorageSync('merchantId');
            uni.navigateTo({
                url: url
            });
        },

        //获得活动列表
        getActiveList() {
            const data = {
                marchantId: this.marchantId,
                sourceType: 'applet'
            };
            app.globalData.sjrequest('/activity/queryActivityList', data).then((res) => {
                console.log('活动列表：====', res);
            });
        }
    }
};
</script>
<style>
@import '../../../../styles/me_common.css';

.activity {
    width: 600rpx;
    margin: 0 auto;
    margin-top: 30rpx;
}
.activity_list {
    flex-wrap: wrap;
}
.good-express {
    position: absolute;
    top: 18rpx;
    z-index: 10;
    color: #fff;
    left: 45rpx;
    font-size: 30rpx;
}
.good-express::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 8rpx;
    left: 155rpx;
    width: 2rpx;
    height: 36rpx;
    background-color: rgb(224, 40, 40);
}
.activitys_Info {
    height: 85rpx;
    border-radius: 20rpx;
    box-shadow: 0px 0px 14px 0px rgba(177, 177, 177, 0.295);
    width: 100%;
    color: rgb(90, 90, 90);
}
.right-arrow {
    width: 15rpx;
    height: 26rpx;
    position: absolute;
    left: 631rpx;
    top: 30rpx;
}
.temp-bg1 {
    background-color: #f69761;
}

.temp-bg2 {
    background-color: #fff7e4;
    color: #333;
}

.temp-bg4 {
    background-color: #5db6fa;
}

.temp-bg3 {
    background-color: #ffffff;
}

.Info_msg {
    padding: 20rpx 0rpx 20rpx 25rpx;
    position: relative;
}

.Info_msg_img {
    width: 154rpx;
    height: 48rpx;
}

.shop_msg_info {
    padding-left: 40rpx;
}

.shop_msg {
    font-size: 20rpx;
}

.new_msg {
    font-size: 34rpx;
    margin-top: 4rpx;
}

.new_desc {
    font-size: 20rpx;
}

.activitys_Info_btn {
    background-color: #fff;
    font-size: 20rpx;
    padding: 14rpx 30rpx;
    margin-right: 15rpx;
    border-radius: 6rpx;
}

.temp-bg1 .activitys_Info_btn {
    color: #f69761;
}

.temp-bg4 .activitys_Info_btn {
    color: #5db6fa;
}

.temp-bg3 .activitys_Info_btn {
    color: #212121;
}
.alerts-Img {
    height: 120rpx;
    width: 600rpx;
    margin: 0 auto;
}
</style>
