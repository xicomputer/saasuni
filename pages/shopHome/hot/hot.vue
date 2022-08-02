<template>
    <!-- pages/shopHome/hot/hot.wxml -->
    <!-- 新品 热卖视频 -->
    <view v-if="nowTabbarText != '热卖'" :class="isAdapter ? 'news-container news-container-sp' : 'news-container'">
        <video-list v-if="hotSaleGoodsList.length" :videoList="hotSaleGoodsList"></video-list>
        <no-data v-else text="您还没有热卖视频哦！" url="https://xssj.letterbook.cn/applet/images/sj_no_data_img8.png"></no-data>
    </view>
</template>

<script>
import videoList from '../../Component/videoList/index';
import noData from '@/pages/Component/noData/index';
// pages/shopHome/hot/hot.js
const app = getApp();
export default {
    components: {
        videoList,
        noData
    },
    data() {
        return {
            hotSaleGoodsList: [],
            marchantId: null,
            videoList: [],
            nowSaleGoods: {},
            nowTabbarText: '',
            isAdapter: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //wx.getStorageSync("merchantId")
        let ids = uni.getStorageSync('merchantId');
        this.setData({
            marchantId: ids
        });
        this.getVideoList();
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
     */
    onShareAppMessage: function () {},
    methods: {
        // 获取视频列表
        getVideoList() {
            let data = {
                marchantId: this.marchantId
            };
            return app.globalData.sjrequest('/commodity/queryVideoCommodityList', data).then((res) => {
                if (res.data.code == 200) {
                    uni.hideLoading();
                    let list = [];

                    if (res.data.data.length) {
                        res.data.data.forEach((item, index) => {
                            list.push({
                                id: index,
                                url: item.videoUrl
                            });
                        });
                        this.setData({
                            videoList: list,
                            hotSaleGoodsList: res.data.data,
                            nowSaleGoods: res.data.data[0]
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>
<style>
/* pages/shopHome/hot/hot.wxss */
</style>
