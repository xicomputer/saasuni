<template>
    <view>
        <view class="release-dynamic-box">
            <textarea class="txtarea" :value="content" @input="bindTextAreaBlur" maxlength="100" auto-height placeholder="来吧，尽情发挥吧..." placeholder-style="color:#999" />
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
        <view class="dynamic-conent-box">
            <view>每天可以发布一条信息</view>
            <view class="dynamic-conent-btn" @tap="submit">发布</view>
        </view>
        <!-- 通知 -->
        <view class="dynamic-notice">尊敬的用户，您发布的内容须遵守相关法律法规和订阅通知规则， 请严格遵守相关规定，已免违规</view>

        <!-- <view class="dynamic-notice">
  <image src="/pages/img/smallShop/gantang.png" style="width:24rpx;height:24rpx;margin-right:8rpx"></image>
  <text class="notice-text">尊敬的用户，您发布的内容须遵守相关法律法规和订阅通知规则，请严格遵守相关规定，以免违规。</text>
</view>
<view class="dynamic-bottom">
  <view class="cancel-btn" bindtap="cancel">取消</view>
  <view class="cancel-btn comfirm-btn" bindtap="submit">发布</view>
</view> -->
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
            content: '',

            // 输入的内容
            imgUuid: '',

            // 图片imgUuid
            // 小店id
            storeId: 0,

            marchantId: '',
            taskText: '',
            showTaskPop: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            marchantId: options.marchantId
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

        // 预览图片
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

        // 上传图片
        upload(count) {
            const _this = this;

            var fxToken = uni.getStorageSync('token');
            uni.uploadFile({
                url: app.globalData.imgUrl2,
                //仅为示例，非真实的接口地址
                filePath: _this.fileList[count],
                name: 'imgs',
                formData: _this.imgUuid
                    ? {
                          uuid: _this.imgUuid,
                          token: uni.getStorageSync('token')
                      }
                    : {
                          token: uni.getStorageSync('token')
                      },
                header: {
                    token: fxToken,
                    'Content-Type': 'multipart/form-data',
                    //form-data格式
                    Accept: 'application/json'
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
                marchantId: this.marchantId
            };
            var token = uni.getStorageSync('token');
            app.globalData.sjrequest('/marchant/addMarchantComment', data).then((res) => {
                if (res.data.code == 200) {
                    uni.showToast({
                        title: '发布成功,等待审核',
                        icon: 'none'
                    });
                    let result = res.data.data;
                    setTimeout((res) => {
                        if (result.bomb) {
                            var pages = getCurrentPages();
                            var currPage = pages[pages.length - 1]; // 当前页面

                            var prevPage = pages[pages.length - 2];

                            if (prevPage.data.taskText) {
                                prevPage.setData({
                                    taskText: '你已完成发布动态任务获取3积分'
                                });
                            }

                            prevPage.setData({
                                showTaskPop: true
                            });
                        }

                        uni.navigateBack({
                            delta: 0
                        });
                    }, 1000);
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
            if (this.content.length < 5) {
                uni.showToast({
                    title: '评论最少5字哟~',
                    icon: 'none'
                });
                return;
            }

            if (this.fileList.length == 0) {
                uni.showToast({
                    title: '评论最少需要上传一张图片哟~',
                    icon: 'none'
                });
                return;
            }

            uni.showLoading({
                title: '发布中',
                mask: true
            });
            this.upload(0);
        }
    }
};
</script>
<style>
.release-dynamic-box {
    width: 100%;
    padding: 28rpx;
    box-sizing: border-box;
}
.txtarea {
    width: 100%;
    min-height: 300rpx;
    font-size: 24rpx;
    font-weight: bold;
    line-height: 34rpx;
    color: #333333;
}
/* 上传图片 */
.content-image .image-box:nth-child(4n) {
    margin: 20rpx 0rpx 0 0;
}
.content-image {
    padding-bottom: 10rpx;
    display: flex;
    flex-wrap: wrap;
}
.image-box {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin: 20rpx 18rpx 0 0;
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
    border: 2rpx dashed #999999;
}
.uploadImg-btn {
    width: 68rpx;
    height: 61rpx;
    margin-bottom: 16rpx;
}
/* 发布 */
.dynamic-conent-box {
    width: 100%;
    height: 68rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    border-top: 2rpx solid #f4f4f4;
    border-bottom: 2rpx solid #f4f4f4;
}
.dynamic-conent-btn {
    width: 110rpx;
    height: 46rpx;
    background: #fe4a0b;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* 通知 */
.dynamic-notice {
    width: 594rpx;
    height: 64rpx;
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 32rpx;
    color: #999999;
    margin-top: 16rpx;
    margin-left: 20rpx;
}
</style>
