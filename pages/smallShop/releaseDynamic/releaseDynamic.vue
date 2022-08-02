<template>
    <view>
        <view class="dynamic-top">
            <image src="/static/pages/img/smallShop/warn.png" style="width: 36rpx; height: 30rpx"></image>
            {{ appraiseCount > 0 ? '你还可以发布' + appraiseCount + '消息' : '您暂时无法发布消息' }}（每完成一笔订单/可发布一条消息）
        </view>
        <view class="release-dynamic-box">
            <textarea class="txtarea" :value="content" @input="bindTextAreaBlur" maxlength="200" auto-height placeholder="请输入发表的内容" placeholder-style="font-size:24rpx" />
            <!-- 上传图片 -->
            <view class="content-image">
                <view class="image-box" v-for="(item, index) in fileList" :key="index">
                    <image :src="item" class="image-img" @tap="zoomImg" mode="aspectFill" :data-list="fileList" :data-src="item"></image>

                    <image src="/static/pages/img/shanchu.png" class="image-del" @tap="delImg" :data-index="index"></image>
                </view>
                <view v-if="fileList.length < 6" class="image-box uploadImg" @tap="uploadImage">
                    <image class="uploadImg-btn" src="/static/pages/img/order/upload.png"></image>
                    上传图片
                </view>
            </view>
        </view>
        <view class="notice-content">
            <image src="/static/pages/img/smallShop/warn.png" style="width: 36rpx; height: 30rpx; margin-left: 22rpx; margin-right: 8rpx"></image>
            购买过小店商品客户可以参与商品评价发布
        </view>
        <view class="dynamic-notice">
            <image src="/static/pages/img/smallShop/gantang.png" style="width: 24rpx; height: 24rpx; margin-right: 8rpx"></image>
            <text class="notice-text">尊敬的用户，您发布的内容须遵守相关法律法规和订阅通知规 则，请严格遵守相关规定，以免违规。</text>
        </view>
        <view class="dynamic-bottom">
            <view class="cancel-btn" @tap="cancel">取消</view>
            <view class="cancel-btn comfirm-btn" @tap="submit">发布</view>
        </view>
    </view>
</template>

<script>
// pages/smallShop/releaseDynamic/releaseDynamic.js
const app = getApp();
export default {
    data() {
        return {
            fileList: [],

            // 图片数据
            appraiseCount: 0,

            // 可发布消息数量
            content: '',

            // 输入的内容
            imgUuid: '',

            // 图片imgUuid
            // 小店id
            storeId: 0,

            tabActive: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            storeId: options.storeId
        });
        this.releaseCount(options.storeId);
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
        // 查询发布信息
        releaseCount(id) {
            let data = {
                storeId: id
            };
            return app.globalData.sjrequest('/sales/queryAppraiseCount', data).then((res) => {
                if (res.data.code == 200) {
                    this.setData({
                        appraiseCount: res.data.data.appraiseCount
                    });
                }
            });
        },

        // 赋值
        bindTextAreaBlur: function (e) {
            this.setData({
                content: e.detail.value
            });
        },

        // 取消
        cancel() {
            uni.showModal({
                content: '确定要取消发布吗？',
                showCancel: true,
                //是否显示取消按钮
                cancelText: '继续发布',
                //默认是“取消”
                cancelColor: '#576b95',
                //取消文字的颜色
                confirmText: '取消发布',
                //默认是“确定”
                confirmColor: '#ccc',
                //确定文字的颜色
                success: function (res) {
                    if (res.cancel) {
                        //点击取消,默认隐藏弹框
                        return;
                    } else {
                        uni.navigateBack({
                            delta: 0
                        });
                    }
                }
            });
        },

        // 选择图片
        uploadImage() {
            const _this = this;

            uni.chooseImage({
                count: 6 - _this.fileList.length,
                sizeType: ['compressed'],
                sourceType: ['album'],

                success(res) {
                    res.tempFilePaths.forEach((item, index) => {
                        _this.fileList.push(item);
                    });

                    _this.setData({
                        fileList: _this.fileList
                    });
                }
            });
        },

        // 放大图片
        zoomImg(e) {
            const { src, list } = e.currentTarget.dataset;
            let imgList = [];

            for (var index = 0; index < list.length; index++) {
                imgList[index] = list[index].httpAddress;
            }

            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: imgList // 需要预览的图片http链接列表
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

        // 上传图片
        upload(count) {
            const _this = this;

            var fxToken = uni.getStorageSync('token');
            uni.uploadFile({
                url: app.globalData.imgUrl2,
                //仅为示例，非真实的接口地址
                filePath: _this.fileList[count],
                header: {
                    token: fxToken,
                    'Content-Type': 'multipart/form-data',
                    //form-data格式
                    Accept: 'application/json'
                },
                name: 'imgs',
                formData: _this.imgUuid
                    ? {
                          uuid: _this.imgUuid,
                          token: uni.getStorageSync('token')
                      }
                    : {
                          token: uni.getStorageSync('token')
                      },

                complete(res) {
                    console.log(res);
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
                content: this.content,
                //评价内容
                imgUuid: this.imgUuid,
                //图片标识
                storeId: this.storeId
            };
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/sales/AddComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '发布成功'
                    });
                    var pages = getCurrentPages();
                    var currPage = pages[pages.length - 1]; // 当前页面

                    var prevPage = pages[pages.length - 2];
                    uni.navigateBack({
                        delta: 1,
                        success: function () {
                            prevPage.setData({
                                tabActive: 2
                            });
                            prevPage.reGetList();
                        }
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
            if (this.appraiseCount <= 0) {
                uni.showToast({
                    title: '先去完成一笔订单吧~',
                    icon: 'none'
                });
                return;
            }

            if (this.content == '') {
                uni.showToast({
                    title: '说点儿什么吧 ~~',
                    icon: 'none'
                });
                return;
            }

            uni.showLoading({
                title: '发布中',
                mask: true
            });

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
page {
    background: #f4f4f4;
}
.dynamic-top {
    width: 100%;
    height: 58rpx;
    background: #e4e4e4;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #000000;
    padding-left: 32rpx;
    box-sizing: border-box;
}
.release-dynamic-box {
    width: 690rpx;
    padding: 46rpx 20rpx 28rpx;
    box-sizing: border-box;
    margin: 20rpx auto;
    background-color: #fff;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 20rpx;
}
.notice-content {
    width: 690rpx;
    margin: 0 auto;
    height: 54rpx;
    background-color: #fff;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34rpx;
    color: #eb1918;
}
.txtarea {
    width: 100%;
    min-height: 50rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #333333;
}
/* 上传图片 */
.content-image .image-box:nth-child(3n) {
    margin: 30rpx 0rpx 0 0;
}
.content-image {
    padding-bottom: 10rpx;
    display: flex;
    flex-wrap: wrap;
}
.image-box {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin: 30rpx 20rpx 0 0;
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
.uploadImg {
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    color: #999999;
    font-weight: 600;
}
.uploadImg-btn {
    width: 68rpx;
    height: 61rpx;
    margin-bottom: 16rpx;
}
/* 通知 */
.dynamic-notice {
    width: 690rpx;
    height: 70rpx;
    background: rgba(228, 228, 228, 0.44);
    border-radius: 10rpx;
    position: absolute;
    bottom: 134rpx;
    left: 30rpx;
    padding: 6rpx 94rpx 6rpx 64rpx;
    box-sizing: border-box;
    display: flex;
}
.notice-text {
    width: 0;
    flex: 1;
    font-size: 20rpx;
    font-weight: 600;
    color: #999999;
}
/* 底部 */
.dynamic-bottom {
    width: 100%;
    height: 100rpx;
    background: #ffffff;
    border-bottom: 2rpx solid #4e4e4e;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 52rpx;
    box-sizing: border-box;
}
.cancel-btn {
    width: 148rpx;
    height: 66rpx;
    background: #999999;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.comfirm-btn {
    background: #eb1918;
    margin-left: 36rpx;
}
</style>
