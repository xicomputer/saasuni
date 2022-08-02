<template>
    <view class="postGoodsComment">
        <view class="postGoodsComment-goods">
            <view class="goods-title">商品评价</view>
            <view class="goods-content">
                <view class="goods-left">
                    <image class="goods-logo" :src="commodityLogo"></image>
                </view>
                <view class="goods-right">
                    <view class="goods-name">{{ commodityName }}</view>
                    <view class="goods-star">
                        <block v-for="(item, index) in 5" :key="index">
                            <image
                                :src="'../../img/order/start_b' + (startLevel > index ? 6 - startLevel + index : 0) + '.png'"
                                class="start-img"
                                @tap="changeStartLevel"
                                :data-index="index + 1"
                            ></image>
                        </block>
                        <view class="start-text">{{ startList[startLevel].name }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="postGoodsComment-content">
            <view class="content-textarea">
                <textarea @input="getInputValue" :value="content" placeholder="请谈谈您对该商品的看法吧" maxlength="100" class="textarea-input"></textarea>
                <view class="textarea-num">{{ contentLen }}/100</view>
            </view>
            <view class="content-image">
                <view class="image-box" v-for="(item, index) in fileList" :key="index">
                    <!-- <image src="{{item.httpAddress}}" class="image-img" bindtap="zoomImg" data-list="{{fileList}}" data-src="{{item.httpAddress}}"></image> -->

                    <image :src="item" class="image-img" @tap="zoomImg" :data-list="fileList" :data-src="item"></image>

                    <image src="/static/pages/img/shanchu.png" class="image-del" @tap="delImg" :data-index="index"></image>
                </view>
                <view v-if="fileList.length < 6" class="uploadImg" @tap="uploadImage">
                    <image class="uploadImg-btn" src="/static/pages/img/order/upload.png"></image>
                </view>
            </view>
        </view>
        <view class="postGoodsComment-tips">
            <view class="tips-box">
                <view class="tips-left">
                    <image src="/static/pages/img/order/tips.png" class="tips-img"></image>
                </view>
                <view class="tips-right">尊敬的用户，您发布的内容须遵守相关法律法规和订阅通知规则，请严格遵守相关规定，以免违规。</view>
            </view>
        </view>
        <view class="postGoodsComment-footer">
            <view class="footer-anonymous" @tap="changeAnonymous">
                <view :class="'anonymous-noChoose ' + (isAnonymous ? 'isShow' : '')"></view>
                <image src="/static/pages/img/check2.png" :class="'anonymous-isChoose ' + (isAnonymous ? '' : 'isShow')"></image>
                <view class="anonymous-text">匿名评价</view>
            </view>
            <view class="footer-btn" @tap="submit">
                <view class="btn-text">发布</view>
            </view>
        </view>
        <view class="postGoodsComment-fill"></view>
    </view>
</template>

<script>
// import vanUploader from './@vant/weapp/uploader/index';
// pages/order/postGoodsComment/postGoodsComment.js
const app = getApp();
export default {
    components: {
        // vanUploader
    },
    data() {
        return {
            marchantId: 0,

            //商家id
            commodityId: 0,

            //商品id
            commodityLogo: '',

            //商品图片
            commodityName: '',

            //商品名称
            orderUniqueId: '',

            //订单uid
            // tempFilePaths: [],//临时文件数组
            imgUuid: '',

            //图片组标识对象
            startLevel: 0,

            //等级
            content: '',

            //评价内容
            contentLen: 0,

            //评价长度
            fileList: [],

            //评价图片
            isAnonymous: false,

            //是否匿名
            startList: [
                {
                    name: ''
                },
                {
                    name: '非常差'
                },
                {
                    name: '差'
                },
                {
                    name: '一般'
                },
                {
                    name: '好'
                },
                {
                    name: '非常好'
                }
            ],

            name: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            marchantId: app.globalData.marchantId,
            //商家id
            commodityId: app.globalData.commodityId,
            //商品id
            commodityLogo: app.globalData.commodityLogo,
            //商品图片
            commodityName: app.globalData.commodityName,
            //商品名称
            orderUniqueId: app.globalData.orderUniqueId //订单uid
        });
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
        //更改星级等级
        changeStartLevel(e) {
            const { index } = e.currentTarget.dataset;
            this.setData({
                startLevel: index
            });
        },

        // 绑定评价内容
        getInputValue(e) {
            const value = e.detail.value;
            this.setData({
                content: value,
                contentLen: value.length > 100 ? 100 : value.length
            });
        },

        // 上传图片
        uploadImage() {
            const _this = this;

            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album'],

                success(res) {
                    const fileList = res.tempFilePaths[0];
                    const tempFilePaths = _this.fileList;
                    tempFilePaths.push(fileList);

                    _this.setData({
                        fileList: tempFilePaths
                    });
                }
            });
        },

        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            });
        },

        // 删除图片
        delImg(e) {
            const { index } = e.currentTarget.dataset;
            let imgList = this.fileList;
            imgList.splice(index, 1);
            this.setData({
                fileList: imgList
            });
        },

        // 是否匿名评价
        changeAnonymous() {
            this.setData({
                isAnonymous: !this.isAnonymous
            });
        },

        // 上传图片
        upload(count) {
            const _this = this;

            var fxToken = uni.getStorageSync('token');
            uni.uploadFile({
                url: app.globalData.imgUrl2,
                //仅为示例，非真实的接口地址
                filePath: _this.fileList[count],
                name: 'imgs',
                header: {
                    token: fxToken,
                    'Content-Type': 'multipart/form-data',
                    //form-data格式
                    Accept: 'application/json'
                },
                formData: _this.imgUuid
                    ? {
                          uuid: _this.imgUuid
                      }
                    : {},

                complete(res) {
                    count++;

                    _this.setData({
                        imgUuid: JSON.parse(res.data).data.imgUuid
                    });

                    if (count == _this.fileList.length) {
                        // 图片上传完毕，去上传文字
                        _this.sendComment();
                    } else {
                        _this.upload(count);
                    }
                }
            });
        },

        // 发送评论
        sendComment() {
            const data = {
                marchantId: this.marchantId,
                //商家id
                commodityId: this.commodityId,
                //商品id
                commodityName: this.commodityName,
                //商品id
                orderUniqueId: this.orderUniqueId,
                //订单uid
                isMarchant: 0,
                //是否为商家1-商家，0-用户
                grade: this.startLevel ? this.startLevel : 5,
                //评价等级
                content: this.content,
                //评价内容
                // imgs: this.data.fileList,//评价图片
                imgUuid: this.imgUuid,
                //图片标识
                anonymous: this.isAnonymous ? 1 : 0 //是否匿名0-否,1-是
            };

            if (this.content == '' && this.fileList.length == 0) {
                uni.showToast({
                    title: '说点儿什么吧 ~~',
                    icon: 'none'
                });
                return;
            }

            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/orderComment/addOrderComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '评价成功'
                    });
                    uni.redirectTo({
                        url: '../goodsCommentList/goodsCommentList?commodityId=' + this.commodityId
                    });
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
        },

        // 提交评论
        submit() {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            console.log(this.fileList, '22222222');

            if (this.fileList.length == 0) {
                this.sendComment();
            } else {
                this.upload(0);
            }
        }
    }
};
</script>
<style>
.postGoodsComment {
    background: #f8f9fb;
    padding-top: 20rpx;
}
.postGoodsComment-goods {
    height: 240rpx;
    background: #ffffff;
    padding-left: 30rpx;
}
.goods-title {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: #333333;
    padding: 20rpx 0;
}
.goods-content {
    display: flex;
}
.goods-logo {
    width: 140rpx;
    height: 140rpx;
    object-fit: cover;
}
.goods-right {
    padding-left: 20rpx;
    height: 140rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.goods-name {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 42rpx;
    color: #333333;
}
.goods-star {
    display: flex;
}
.start-img {
    width: 40rpx;
    height: 40rpx;
    padding-right: 25rpx;
}
.start-text {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 38rpx;
    color: #999999;
}
.postGoodsComment-content {
    margin-top: 20rpx;
    background: #ffffff;
}
.content-textarea {
    position: relative;
    padding: 30rpx;
}
.textarea-input {
    height: 160rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
}
.textarea-num {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #b9b9b9;
    text-align: right;
}
.content-image {
    padding: 0 0 40rpx 40rpx;
    display: flex;
    flex-wrap: wrap;
}
.image-box {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin: 30rpx 30rpx 0 0;
}
.image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.image-del {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    top: 0;
    right: 0;
}
.postGoodsComment-tips {
    margin-top: 2rpx;
    padding: 40rpx 30rpx;
    background: #ffffff;
}
.tips-box {
    display: flex;
    background: #f8f9fb;
    padding: 20rpx;
}
.tips-left {
    padding-right: 14rpx;
}
.tips-right {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #b9b9b9;
}
.tips-img {
    width: 34rpx;
    height: 34rpx;
}
.postGoodsComment-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    background: #ffffff;
    box-shadow: 0px 0px 27rpx rgba(0, 0, 0, 0.11);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    box-sizing: border-box;
}
.footer-anonymous {
    display: flex;
    align-items: center;
}
.anonymous-noChoose {
    width: 34rpx;
    height: 34rpx;
    border-radius: 50%;
    border: 1rpx solid #b9b9b9;
    margin-right: 14rpx;
    box-sizing: border-box;
}
.anonymous-isChoose {
    width: 34rpx;
    height: 34rpx;
    margin-right: 14rpx;
}
.anonymous-text {
    font-size: 26rpx;
    font-weight: 400;
    line-height: 30rpx;
    color: #b9b9b9;
}
.btn-text {
    width: 160rpx;
    height: 88rpx;
    background: #a03a0c;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 88rpx;
    color: #f8f9fb;
    text-align: center;
}
.postGoodsComment-fill {
    height: 120rpx;
}
.isShow {
    display: none;
}
.uploadImg {
    width: 200rpx;
    height: 200rpx;
    background: #f2f2f2;
    margin: 30rpx 30rpx 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.uploadImg-btn {
    width: 68rpx;
    height: 61rpx;
}
</style>
