<template>
    <view>
        <van-search
            :value="value"
            placeholder="搜索商家店名"
            shape="round"
            use-action-slot
            placeholder-style="font-size: 28rpx;font-weight: 400;color: #999999;"
            @change="onChange"
            @search="onClick"
            maxlength="15"
            custom-class="search-container"
        >
            <view slot="action" class="search-btn" @tap="onClick">搜索</view>
        </van-search>
        <!-- 店铺 -->
        <view class="store-container" v-if="value">
            <view class="store-item" @tap="toStore" :data-id="item.marchantId" :data-name="item.nickName" v-for="(item, index) in storeList" :key="index">
                <image class="goods-img" mode="aspectFill" :src="item.logoPic"></image>

                <view class="goods-content">
                    <view class="goods-name">{{ item.nickName }}</view>
                    <view class="goods-address">{{ item.brief }}</view>
                </view>

                <view class="goods-content-btn-box">
                    <view class="goods-content-btn" v-if="!item.isfans" @tap.stop.prevent="followStore" :data-id="item.marchantId" :data-name="item.nickName">关注</view>
                    <view class="goods-content-btn" v-if="item.isfans" style="background: #ccc">已关注</view>
                    <view class="goods-content-btn">进入</view>
                </view>
            </view>
        </view>
        <!-- 历史记录 -->
        <view class="search-record-container" v-if="list.length != 0">
            <view class="search-record-top">
                <text>历史记录</text>
                <image @tap="changeDel" v-if="!isDel" src="/static/pages/img/my/del.png" style="width: 28rpx; height: 28rpx"></image>
                <view v-if="isDel" class="search-record-top-del-box">
                    <text style="color: #999" @tap="clearRecord">全部删除</text>
                    <view class="solid"></view>
                    <text @tap="changeDel">完成</text>
                </view>
            </view>
            <view class="search-record-content">
                <view class="search-record-list">
                    <view class="search-record-item" @tap="selectRecord" :data-item="item" v-for="(item, index) in list" :key="index">
                        {{ item }}

                        <image v-if="isDel" src="/static/pages/img/my/del_btn.png" @tap.stop.prevent="delRecord" :data-idx="index" class="del-btn"></image>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import vanSearch from './@vant/weapp/search/index';
// pages/Index/searchShop/searchShop.js
const app = getApp();
export default {
    components: {
        // vanSearch
    },
    data() {
        return {
            isDel: false,
            // 是否处于删除状态
            list: [],
            // 历史记录
            value: '',
            // 搜索的值
            storeList: [] // 店铺列表
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (uni.getStorageSync('recordList')) {
            this.setData({
                list: uni.getStorageSync('recordList')
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
        // 搜索商家
        searchStore() {
            let data = {
                searchName: this.value
            };
            return app.globalData.sjrequest('/marchant/searchMarchant', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();

                    if (res.data.data == '') {
                        uni.showToast({
                            title: '未搜索到商家，请检查商家名称是否正确',
                            icon: 'none'
                        });
                    }

                    this.setData({
                        storeList: res.data.data
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }

                this.setRecord();
            });
        },

        // 跳店铺
        toStore(e) {
            let id = e.currentTarget.dataset.id;
            this.setData({
                value: e.currentTarget.dataset.name
            });
            this.setRecord();
            uni.navigateTo({
                url: '/pages/shopHome/home/home?marchantId=' + id
            });
        },

        // 关注商家
        followStore(e) {
            let that = this;
            let data = {
                marchantId: e.currentTarget.dataset.id,
                type: 1
            };
            app.globalData.sjrequest('/marchant/operateConcerns', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '关注成功！',
                        icon: 'success'
                    });
                    that.setData({
                        value: e.currentTarget.dataset.name
                    });
                    that.setRecord();
                    that.searchStore();
                }
            });
        },

        // 搜索内容改变
        onChange(e) {
            this.setData({
                value: e.detail.trim(),
                storeList: []
            });
        },

        // 改变删除状态
        changeDel() {
            this.setData({
                isDel: !this.isDel
            });
        },

        // 选择历史记录
        selectRecord(e) {
            if (!this.isDel) {
                this.setData({
                    value: e.currentTarget.dataset.item
                });
                this.searchStore();
                this.setRecord();
            }
        },

        // 清空历史记录
        clearRecord() {
            this.setData({
                list: []
            });
            this.setStorage();
        },

        // 删除历史记录
        delRecord(e) {
            this.list.splice(e.currentTarget.dataset.idx, 1);
            this.setData({
                list: this.list
            });
            this.setStorage();
        },

        // 点击搜索
        onClick() {
            if (this.value) {
                uni.showLoading({
                    title: '搜索中'
                });
                this.searchStore();
            } else {
                uni.showToast({
                    title: '请先输入商家店名',
                    icon: 'none'
                });
            }
        },

        // 把历史记录存储到本地缓存
        setRecord() {
            var arr = this.list;

            if (this.value != '') {
                if (arr.indexOf(this.value) != -1) {
                    // 数组中存在该历史记录
                    arr.unshift(
                        ...arr.splice(
                            arr.findIndex((i) => i == this.value),
                            1
                        )
                    ); // 将他放到第一位
                } else {
                    // 数组中不存在该记录
                    arr.unshift(this.value);
                }

                arr.splice(10);
                this.setData({
                    list: arr
                });
            }

            this.setStorage();
        },

        // 存储到本地
        setStorage() {
            let that = this;
            uni.setStorage({
                data: that.list,
                key: 'recordList'
            });
        }
    }
};
</script>
<style>
/* pages/Index/searchShop/searchShop.wxss */
page {
    background-color: #f8f8f8;
}
.search-container {
    padding-right: 10rpx !important;
    box-sizing: border-box;
}
.van-search__content {
    background-color: #ededed !important;
}
.search-btn {
    font-size: 28rpx;
    font-weight: bold;
    color: #101010;
}
/* 历史记录 */
.search-record-container {
    width: 100%;
    margin-top: 60rpx;
}
.search-record-top {
    width: 100%;
    padding: 0 36rpx;
    box-sizing: border-box;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-record-top-del-box {
    width: 180rpx;
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3a84fe;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.solid {
    width: 2rpx;
    height: 24rpx;
    background-color: #999;
}
.search-record-content {
    width: 100%;
    margin-top: 32rpx;
    padding: 0rpx 8rpx 0 30rpx;
    box-sizing: border-box;
}
.search-record-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.search-record-item {
    width: fit-content;
    height: 56rpx;
    background: rgba(0, 0, 0, 0.13);
    border-radius: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 38rpx;
    margin: 0 20rpx 30rpx 0;
    position: relative;
}
.del-btn {
    width: 36rpx;
    height: 36rpx;
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
}
/* 店铺 */
.store-container {
    width: 100%;
}
.store-item {
    width: 100%;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #eee;
}
.goods-img {
    width: 80rpx;
    height: 80rpx;
    background: #ededed;
    border-radius: 50%;
}
.goods-content {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 36rpx 0 16rpx;
}
.goods-name {
    height: 50rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 50rpx;
    color: #101010;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.goods-address {
    height: 28rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 28rpx;
    color: #999999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.goods-content-btn-box {
    width: 184rpx;
    height: 44rpx;
    display: flex;
    justify-content: space-between;
}
.goods-content-btn {
    width: 88rpx;
    height: 44rpx;
    background: #eb1918;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
}
</style>
