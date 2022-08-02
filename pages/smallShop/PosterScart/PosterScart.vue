<template>
    <!-- <view>{{webViewUrl}}</view> -->
    <!-- <web-view src="{{webViewUrl}}"  bindmessage="getMessage"></web-view> -->

    <view class="poster-page-box">
        <canvas-synthetic
            class="mySynthetic"
            canvas-id="canvas_shop_1"
            :canvas-width="330"
            :canvas-height="505"
            canvas-bgcolor="#FA5B3D"
            :imgs="imgs"
            @generateComplete="getCompleteImg"
            :texts="texts"
            :showline="false"
        ></canvas-synthetic>

        <view class="poster-img-container">
            <image :src="testimgUrl" @longpress="longtapPoster" mode="widthFix" style="width: 90%; background-color: #fff; margin-top: 40rpx"></image>
        </view>

        <view class="img_xiaodian">
            <button v-if="testimgUrl !== ''" class="save-poster-btn" open-type="share" @tap="fenxPoster">分享小店</button>
            <button v-if="testimgUrl !== ''" class="save-poster-btn" @tap="savePoster">保存海报</button>
        </view>
    </view>
</template>

<script>
import canvasSynthetic from '../components/canvas_synthetic/canvas_synthetic';
const app = getApp();
export default {
    components: {
        canvasSynthetic
    },
    data() {
        return {
            webViewUrl: '',
            testUrl: '',
            storeId: 0,

            imgs: [
                {
                    src: '',
                    width: 40,
                    height: 40,
                    x: 17,
                    y: 19
                },
                {
                    src: '/static/pages/img/poster/poster_shop_xing.png',
                    width: 75,
                    height: 14,
                    x: 238,
                    y: 20
                },
                {
                    src: '/static/pages/img/poster/poster_shop_xing.png',
                    width: 75,
                    height: 14,
                    x: 238,
                    y: 36
                },
                {
                    src: 'https://xssj.letterbook.cn/applet/images/poster_shop_bg.png',
                    width: 297,
                    height: 341,
                    x: 17,
                    y: 70
                },
                {
                    src: '/static/pages/img/poster/poster_shop_right.png',
                    width: 31,
                    height: 10,
                    x: 120,
                    y: 475
                },
                {
                    src: '',
                    width: 71,
                    height: 71,
                    x: 242,
                    y: 422
                }
            ],

            texts: [
                {
                    content: '某某的小店',
                    color: '#fff',
                    size: 11,
                    x: 65,
                    y: 31
                },
                {
                    content: '人缘口碑：',
                    color: '#fff',
                    size: 11,
                    x: 183,
                    y: 22
                },
                {
                    content: '颜值指数：',
                    color: '#fff',
                    size: 11,
                    x: 183,
                    y: 38
                },
                {
                    content: '小店带点货',
                    color: '#fff',
                    size: 12,
                    x: 17,
                    y: 425
                },
                {
                    content: '欢迎小店赚点生活费',
                    color: '#fff',
                    size: 12,
                    x: 17,
                    y: 449
                },
                {
                    content: '长按扫码进入小店',
                    color: '#FFDF36',
                    size: 12,
                    x: 17,
                    y: 473
                }
            ],

            //生成的海报地址
            testimgUrl: '',

            codeImg: ''
        };
    },
    onLoad: function (options) {
        this.reqParams = { ...options };
        this.setData({
            storeId: options.storeId
        });
    },
    onShareAppMessage: function (res) {
        var { storeId, nickName } = this.reqParams;
        return {
            title: nickName + '的小店',
            path: 'pages/smallShop/myShop/myShop?storeId=' + storeId
        };
    },
    //页面加载完成生命周期
    async onReady() {
        var { storeId } = this.reqParams;
        this.synthetic = this.$mp.page.selectComponent('.mySynthetic');
        this.getCode(storeId);
    },
    methods: {
        setImg2obj: function (obj) {
            let o = {};

            for (let i in obj) {
                let key = this.setImg2objSub(obj[i])[0];
                o[key] = 'data:image/png;base64,' + this.setImg2objSub(obj[i])[1];
            }

            return o;
        },

        setImg2objSub: function (str) {
            let aPos = str.indexOf(':');
            let key = str.substr(0, aPos);
            let value = str.substr(aPos + 1);
            return [key, value];
        },

        getMessage() {},

        navigateToH5: function () {
            let scartHaipao = uni.getStorageSync('scartHaipao');
            let url = 'https://xssj.letterbook.cn/seals/smallShop.html';
            let curl = this.tohaipaoUrl(scartHaipao, url);
            this.setData({
                webViewUrl: curl
            });
        },

        tohaipaoUrl(data, url) {
            let codeImg = this.codeImg;
            let curl = url;
            let imgInit = { ...data, codeImg };

            for (let i in imgInit) {
                imgInit[i] = encodeURI(imgInit[i]);
            }

            var imgs = this.imgs;
            var texts = this.texts;
            imgs[0].src = data.headImgUrl;
            imgs[5].src = codeImg;
            texts[0].content = data.nickName + '的小店';
            this.setData(
                {
                    imgs,
                    texts
                },
                () => {
                    uni.showLoading({
                        title: '海报生成中'
                    });
                    this.synthetic.startSyntheticImg();
                }
            );
            let imgInitStr = JSON.stringify(imgInit);
            curl = `${curl}?data=${imgInitStr}`;
            return curl;
        },

        fenxPoster() {},

        // 获取小程序码
        getCode(storeId) {
            let that = this;
            let scene = encodeURIComponent(`{"storeId":${storeId}}`);
            uni.request({
                url: 'https://xssj.letterbook.cn/xssh/merchant/appSharing',
                method: 'get',
                data: {
                    page: 'pages/smallShop/myShop/myShop',
                    scene: scene,
                    type: 'sj'
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    that.setData(
                        {
                            codeImg: res.data.data
                        },
                        () => {
                            that.navigateToH5();
                        }
                    );
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },

        //海报合成完成回调
        getCompleteImg(event) {
            var { url } = event.detail;
            this.setData({
                testimgUrl: url
            });
            uni.hideLoading();
        },

        //保存海报
        savePoster() {
            this.synthetic.saveImg();
        },

        //长按海报
        longtapPoster() {}
    }
};
</script>
<style>
.board {
    position: fixed;
    top: 2000rpx;
}
.poster-bg {
    width: 100%;
    background: #fff;
    padding-top: 20px;
    height: 100vh;
}
.poster-page {
    width: 640rpx;
    height: 1100rpx;
    background: linear-gradient(180deg, rgba(254, 121, 109, 1) 0%, rgba(255, 83, 64, 1) 100%);
    opacity: 1;
    border-radius: 30rpx;
    position: relative;
    margin: 0 auto;
}
.post-zj {
    padding: 30rpx;
    position: absolute;
    width: 550rpx;
    height: 860rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 9px rgba(254, 140, 85, 0.63);
    opacity: 1;
    border-radius: 20rpx;
    left: 50%;
    top: 160rpx;
    transform: translateX(-50%);
}
.poster-img {
    width: 100%;
    height: 520rpx;
}

.goods-info {
    height: 50px;
    background: rgba(255, 255, 255, 1);
    margin: 10px 0;
}

.van-ellipsis {
    height: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 19px;
    color: rgba(51, 51, 51, 1);
}

.goods-price {
    height: 35px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 19px;
    color: rgba(236, 25, 25, 1);
    opacity: 1;
}
.icon {
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 38rpx;
    color: #ec1919;
}

.user-info {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    box-sizing: border-box;
}
.user-contianer {
    display: flex;
}
.user-img {
    width: 33px;
    height: 33px;
    margin-right: 7px;
}

.user-box {
    display: flex;
    height: 33px;
    flex-direction: column;
    justify-content: space-between;
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
}

.QR-code {
    width: 70px;
    height: 70px;
}
.logo_info {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
    box-sizing: border-box;
}
.user-contianer {
    display: flex;
    justify-content: center;
}
.user-img {
    width: 43px;
    height: 43px;
    margin-right: 7px;
}

.user-box {
    display: flex;
    height: 33px;
    flex-direction: column;
    justify-content: space-between;
}
.user-name {
    text-align: center;

    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    opacity: 1;
}
span {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 31px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
}

.QR-code {
    width: 70px;
    height: 70px;
}

.share {
    width: 304rpx;
    height: 60rpx;
    /* margin-top: 60rpx; */
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 38rpx;
    color: rgba(51, 51, 51, 1);
}

.clone {
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.clone-icon {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 14px;
    color: rgba(51, 51, 51, 1);
}
.clone-img {
    width: 55px;
    height: 55px;
}

.poster {
    width: 276px;
    height: 433px;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 auto;
}

.qrcode {
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
}

.htmUrl {
    text-align: center;
    margin: 0 auto;
    width: 95%;
    height: 95%;
}

.btn-area {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.btn-area .btn-l {
    width: 200rpx;
    text-align: center;
}
.btn-area .btn-r {
    width: 200rpx;
    text-align: center;
}
.btn-area .img-area image {
    width: 110rpx;
    height: 110rpx;
}

.poster-page-box {
    padding-bottom: 40rpx;
}
.poster-img-container {
    display: flex;
    justify-content: center;
}
/*保存海报按钮样式*/
.save-poster-btn {
    background-color: #eb1918;
    width: 300rpx;
    height: 66rpx;
    border-radius: 66rpx;
    color: #fff;
    line-height: 66rpx;
    padding: 0;
    font-size: 24rpx;
    margin-top: 54rpx;
}
.img_xiaodian {
    display: flex;
    justify-content: space-between;
}
</style>
