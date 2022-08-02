<template>
    <!-- pages/extension/product/product.wxml -->
    <!-- <text>pages/extension/product/product.wxml</text> -->
    <view>
        <!-- 搜索 -->
        <!-- <view>
    <view class="search-container" style="background-color: #fff;">
            <view class="relative">
                <image mode="widthFix" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/seach.png"></image>
                <input class="search-input" 	placeholder="请输入搜索关键字" type="text" v-model="search" />
                <text>搜索</text>
            </view>
      </view>
      <view style="width: 100%;height: 82rpx;box-shadow:0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);display: flex;align-items: center;justify-content: space-around;background: #fff;">
        <text style="color: red;">佣金</text>
        <text>销量</text>
        <text>价格</text>
      </view>
   </view> -->

        <!-- 内容 -->
        <view>
            <view style="width: 710rpx; margin: 20rpx auto; background-color: #fff; display: flex; flex-direction: column" v-for="(item, index) in 4" :key="index">
                <view style="display: flex; padding: 20rpx">
                    <image style="width: 176rpx; height: 176rpx; border-radius: 8rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/youhuijuan"></image>
                    <view style="margin-left: 15rpx">
                        <view style="font-size: 32rpx; font-weight: 900" class="u-line-1">t商品名称商品名称商品名称商品itle</view>
                        <view style="font-size: 24rpx; color: #999999" class="u-line-1">佣金比例20%</view>
                        <view style="color: #ff0000; font-size: 28rpx">¥1759.00</view>
                    </view>
                </view>

                <view style="display: flex; align-items: center; justify-content: space-between; padding: 20rpx">
                    <view
                        style="
                            display: flex;
                            background: linear-gradient(to right, #8eeb8e, #04f741);
                            width: 272rpx;
                            height: 66rpx;
                            line-height: 66rpx;
                            align-items: center;
                            justify-content: center;
                            border-radius: 34rpx;
                        "
                    >
                        <image style="width: 48rpx; height: 48rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/wxfff.png"></image>
                        <text style="color: #fff">分享赚钱</text>
                    </view>
                    <view
                        style="
                            display: flex;
                            background: linear-gradient(to right, #fcd086, #fdaa18);
                            width: 272rpx;
                            height: 66rpx;
                            line-height: 66rpx;
                            align-items: center;
                            justify-content: center;
                            border-radius: 34rpx;
                        "
                    >
                        <!-- <image style="width:48rpx;height:48rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/wxfff.png"></image> -->
                        <text style="color: #fff">预计赚￥0.39</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/extension/product/product.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {}
};
</script>
<style>
/* pages/extension/product/product.wxss */
page {
    min-height: 100%;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #f7f7f7 !important;
}

.u-line-1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.u-line-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.search-container {
    height: 135rpx;
}

.search-container .relative {
    top: 30rpx;
    position: relative;
    width: 710rpx;
    left: 50%;
    margin-left: -355rpx;
}

.search-container .relative image {
    position: absolute;
    z-index: 10;
    top: 17rpx;
    left: 23rpx;
    width: 28rpx;
    height: 28rpx;
}

.search-container .relative .search-input {
    width: calc(100% - 60rpx);
    height: 58rpx;
    border-radius: 20px;
    background-color: rgb(241, 241, 241);
    position: absolute;
    padding-left: 60rpx;
    color: #ababab;
    font-size: 26rpx;
    font-weight: 300;
}

.search-container .relative text {
    position: absolute;
    right: 30rpx;
    top: 8rpx;
    color: #f7724a;
    font-size: 26rpx;
}

.search-container .relative text::before {
    content: '';
    display: inline-block;
    background-color: #f79a7e;
    width: 1px;
    top: 8rpx;
    height: 33rpx;
    position: absolute;
    right: 80rpx;
}
</style>
