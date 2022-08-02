<script>
//app.js
import request from './utils/request.js';
import store from './store/index.js';
const ourl1 = 'https://xssj.letterbook.cn/xssj-third'; // 正式环境
// const ourl1='https://test.xssj.letterbook.cn/xssj-third'; // 测试环境
// const ourl1 = 'http://192.168.2.174:1255/xssj-third'   // 直播测试环境
// const ourl2 = 'https://xssj.letterbook.cn/xssh' // 商户

const ourl2 = 'http://192.168.2.174:8084/xssh'; // 商户

const ourl3 = 'https://xssj.letterbook.cn/thirdService'; //全局事件总线

class GlobalEvents {
    constructor() {
        this.events = {};
    }

    $on(eventName, callback) {
        this.events[eventName] = {
            name: eventName,
            fun: callback
        };
    }

    $emit(eventName, data) {
        var eventItem = this.events[eventName];
        eventItem.fun(data);
    }
}

export default {
    data() {
        return {};
    },
    //拍卖请求
    onLaunch: function (options) {
        console.log('scene:', options.scene);
        this.globalData.scene = options.scene; // 新版本

        if (uni.canIUse('getUpdateManager')) {
            const updateManager = uni.getUpdateManager();

            if (updateManager) {
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    if (res.hasUpdate) {
                        updateManager.onUpdateReady(function () {
                            uni.showToast({
                                title: '发现新的版本，将重新打开小程序',
                                icon: 'none',
                                duration: 1000
                            });
                            setTimeout(() => {
                                updateManager.applyUpdate();
                            }, 1000);
                        });
                        updateManager.onUpdateFailed(function () {
                            // 新的版本下载失败
                            uni.showModal({
                                title: '已经有新版本了哟~',
                                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                            });
                        });
                    }
                });
            }
        } //获取系统信息

        uni.getSystemInfo({
            success: (res) => {
                this.globalData.getSystemInfo = res;

                if (res.errMsg == 'getSystemInfo:ok') {
                    if (res.screenHeight != res.safeArea.bottom) {
                        this.globalData.isAdapter = true;
                    }
                }
            }
        }); //获取胶囊信息

        this.globalData.MenuButton = uni.getMenuButtonBoundingClientRect(); //判断token过期

        if (uni.getStorageSync('token')) {
            let data = {
                sjToken: uni.getStorageSync('token')
            };
            this.globalData.sjrequest('/userRegister/queryAllToken', data, uni.getStorageSync('token')).then((res) => {
                try {
                    if (res.data.data.state == 0) {
                        uni.clearStorage();
                        uni.navigateTo({
                            url: '/pages/shopHome/home/home'
                        });
                    }

                    if (res.statusCode == 200 && res.data.code == 200) {
                        uni.setStorage({
                            key: 'marchant_number_key',
                            data: res.data.data.marchantNumber
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
    },
    onShow() {},
    globalData: {
        userInfo: null,
        sj_publish_article: 'jvI8z85nDADGOrxnLxVsfx4JTASr2g80ZxnjkS59BEo',

        //订阅文章更新通知
        sj_commodity_modify: '5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc',

        //商品更新通知
        sj_commodity_add: '7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI',

        // 商品上新通知
        sj_refund: 'Fo6Lv3ByfA8U2yFkLoRz3qpUA-WR_5kGmaRPvgKz-Eo',

        //退款结果通知
        sj_shipments: 'Frrj06BIXoVD_Tnivp2s2IjSOuR-JUe_IzBBR4ImBB4',

        //订单发货提醒
        sj_activity: 'kQ6BVoIFknkMw-Qs0ofFzqZKrk7kxPETCSYf64HWRHw',

        //新活动通知
        sj_order: 'CkBQIUccLZ7tt7k1ZMv9NZk2hfMY0LT23AzL2Tidv9Q',

        //订单支付成功通知
        appid: 'wxcad66233bce675b4',

        //appid需自己提供，此处的appid我随机编写
        secret: '7ddc2addea6172ba1346c226cafc99d5',

        //secret需自己提供，此处的secret我随机编写
        // 商品详情页选择地址需要的参数
        comefrom: '',

        options: {},

        // 传的参数
        // 商品评论需要的参数
        marchantId: 0,

        //商家id
        homeId: 0,

        // 主页id
        commodityId: 0,

        //商品id
        commodityLogo: '',

        //商品图片
        commodityName: '',

        //商品名称
        orderUniqueId: '',

        //订单uid
        goodsCommentDetails: '',

        //商品评论详情
        // imgUrl: ourl1 + '/file/uploadSignFile', //图片地址上传
        imgUrl2: ourl1 + '/file/uploadFile',

        //图片地址上传
        activeStatuList: [],

        getSystemInfo: null,

        // 系统信息
        MenuButton: null,

        // 胶囊信息
        firstIn: true,

        isAdapter: false,
        userInfo: null,
        setInfo: {},
        scene: '',
        imgFlag: false,
        globalEvent: new GlobalEvents(),
        request: request,
        store: store,

        // 分销 post form-data
        //第一种状态的底部
        fxrequest(url, data, fxToken) {
            let promise = new Promise((resolve, reject) => {
                // var fxToken = wx.getStorageSync('fxToken')
                uni.request({
                    url: ourl + url,
                    method: 'POST',
                    data: data,
                    header: {
                        fxToken: fxToken,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        // post form-data
        sjrequest(url, data) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl1 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        // post form-data
        mbrequest(url, data) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl3 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/json'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        // post form-data
        mb2request(url, data) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl1 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/json'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        // post form-data 商户
        shrequest(url, data) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl2 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        // post  json
        sjrequest1(url, data, token) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl1 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/json;charset=UTF-8'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);

                            if (res.data.code !== 0 && res.data.code !== 200) {
                                var data = res.data;
                                setTimeout(() => {
                                    uni.showToast({
                                        title: data.info,
                                        icon: 'none'
                                    });
                                }, 400);
                            }
                        } else {
                            reject(res.data);
                            console.log(res.data, '报错信息');
                        }
                    },
                    fail: (res) => {
                        console.log(res, '错误信息');
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        signInRequest(url, data) {
            let promise = new Promise((resolve, reject) => {
                var token = uni.getStorageSync('token');
                uni.request({
                    url: ourl1 + url,
                    method: 'POST',
                    data: data,
                    header: {
                        token: token,
                        'content-type': 'application/json;charset=UTF-8'
                    },
                    success: (res) => {
                        if (res.statusCode == 200) {
                            resolve(res);

                            if (res.data.code !== 0 && res.data.code !== 200) {
                                var data = res.data;
                            }
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (res) => {
                        console.log(res, '错误信息');
                        uni.showToast({
                            title: '网络出错',
                            icon: 'none',
                            duration: 1500
                        });
                        reject('网络出错');
                    }
                });
            });
            return promise;
        },

        userLogin(flag) {
            var that = this;
						console.log(flag,'flag');
            if (this.setInfo.merchantId && !flag) {
                return new Promise(function (resolve, reject) {
                    resolve('true');
                });
            }

            return new Promise(function (resolve, reject) {
                uni.login({
                    success: function (res) {
                        const accountInfo = uni.getAccountInfoSync();
                        var appid = accountInfo.miniProgram.appId;

                        if (res.code) {
                            var code = res.code;
                            let data = {
                                appid,
                                code
                            };
                            that.sjrequest('/thirdWxLogin/code', data).then((res) => {
                                console.log(res, '登录信息');

                                if (res.statusCode == 200 && res.data.code == 200) {
																// that.globalData.setInfo = res.data.data.setInfo;
																// that.globalData.environment = res.data.data.environment;
                                    that.setInfo = res.data.data.setInfo;
                                    that.environment = res.data.data.environment;
                                    let users = {
                                        userInfo: {
                                            avatarUrl: res.data.data.headimgurl,
                                            nickName: res.data.data.nickname
                                        }
                                    };
																		console.log(users,'users');
                                    uni.setStorage({
                                        data: res.data.data.setInfo.merchantId,
                                        key: 'merchantId'
                                    });
                                    uni.setStorage({
                                        data: res.data.data.orderSwitch,
                                        key: 'orderSwitch'
                                    });
                                    uni.setStorage({
                                        data: res.data.data.nickname,
                                        key: 'userName'
                                    });
                                    uni.setStorage({
                                        data: res.data.data.setInfo.openId,
                                        key: 'thirdWxOpenId'
                                    });
                                    uni.setStorage({
                                        key: 'openId1',
                                        data: res.data.data.setInfo.openId
                                    });
                                    uni.setStorage({
                                        data: res.data.data.setInfo.openId,
                                        key: 'openId_1'
                                    });
                                    uni.setStorage({
                                        data: res.data.data.setInfo.sessionKey,
                                        key: 'sessionkey'
                                    });
                                    uni.setStorage({
                                        data: res.data.data.setInfo.appId,
                                        key: 'appid'
                                    });
                                    uni.setStorage({
                                        key: 'wx_userinfo_key',
                                        data: users
                                    });
                                    uni.setStorage({
                                        key: 'res',
                                        data: res
                                    });
                                    uni.setStorage({
                                        key: 'zl_userInfo',
                                        data: res
                                    });
                                    uni.setStorage({
                                        key: 'zl_jwt',
                                        data: res.data.data.jwt
                                    });
                                    uni.setStorage({
                                        key: 'token',
                                        data: res.data.data.token
                                    });
                                    resolve(res.data.data);
                                } else {
                                    reject('获取用户失败');
                                }
                            });
                        }
                    },
                    fail: (err) => {
                        console.log(err, '登录错误信息');
                        reject(err);
                    }
                });
            });
        },

        environment: '',

        authLogin(data) {
            app.sjrequest('/thirdWxLogin/auth', data).then((res) => {
                console.log(res, 'auth');
                uni.hideLoading();
            });
        },

        // 图片上传
        //   requestUploadFile(url,data,fxToken){
        //     let promise = new Promise((resolve,reject) => {
        //         var fxToken = wx.getStorage('fxToken')
        //         wx.uploadFile({
        //             url: ourl + url,
        //             filePath: data, //chooseImage上传的图片
        //             name: 'headImg',//需要传给后台的图片字段名称
        //             header: {
        //                 fxToken:fxToken,
        //                 "Content-Type": "multipart/form-data", //form-data格式
        //                 'Accept': 'application/json',
        //             },
        //             success:(res) => {
        //                 resolve(res);
        //             }
        //         })
        //     })
        //     return promise;
        //   }
        setIndex(ishide = 0) {
            let that = this;

            if (ishide == 'page') {
                that.sjrequest('/marchant/operateConcerns', {
                    type: 4
                }).then((res) => {});
                return;
            }

            if (ishide == 'hide' || ishide == 0) {
                return new Promise((resolve, reject) => {
                    that.sjrequest('/marchant/operateConcerns', {
                        type: 4
                    }).then((res) => {
                        if (res.data.code == 200 && res.data.data.isHome) {
                            if (ishide) {
                                resolve('ishide');
                            } else {
                                // wx.navigateTo({
                                //   url: `/pages/shopHome/home/home?marchantId=${ res.data.data.isHome}`
                                // })
                            }
                        }
                    });
                });
            } else {
                if (ishide !== 'show') {
                    that.sjrequest('/marchant/operateConcerns', {
                        type: 4
                    }).then((res) => {
                        if (res.data.code == 200 && res.data.data.isHome) {
                            // wx.navigateTo({
                            //   url: `/pages/shopHome/home/home?marchantId=${ res.data.data.isHome}`
                            // })
                        }
                    });
                }
            }
        },

        padLeftZero(str) {
            return ('00' + str).substr(str.length);
        },

        formatDate(date, fmt) {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }

            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            };

            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + '';
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
                }
            }

            return fmt;
        },

        formatTime(date, tag = '/') {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            let t1;
            let t2 = [hour, minute, second].map(this.formatNumber).join(':');

            if (tag == '月') {
                t1 = [month, day].map(this.formatNumber).join(tag);
            } else {
                t1 = [year, month, day].map(this.formatNumber).join(tag);
            }

            if (tag == '小时') {
                t2 = [hour].map(this.formatNumber).join(':');
                return `${t2}`;
            }

            return `${t1} ${t2}`;
        },

        formatNumber(n) {
            n = n.toString();
            return n[1] ? n : '0' + n;
        },

        getLastDayTime(day) {
            return new Date().getTime() + day * 24 * 3600 * 1000;
        },

        // end app.js
        cdebounce(func, delay, immediate) {
            var timer = null;
            return function () {
                var that = this;
                var args = arguments;

                if (timer) {
                    clearTimeout(timer);
                }

                if (immediate) {
                    var doNow = !timer;
                    timer = setTimeout(function () {
                        timer = null;
                    }, delay);

                    if (doNow) {
                        func.apply(that, args);
                    }
                } else {
                    timer = setTimeout(function () {
                        func.apply(that, args);
                    }, delay);
                }
            };
        }
    }
};
</script>
<style>
@import './styles/iconfont.css';
@import './styles/me_common.css'; /**app.wxss**/

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}

.line-clamp2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
}
</style>
