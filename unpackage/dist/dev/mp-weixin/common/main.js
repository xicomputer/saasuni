(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!**********************************************!*\
  !*** D:/products/xssj_New_basic_uni/main.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 5);var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));


var _polyfill = _interopRequireDefault(__webpack_require__(/*! ./polyfill/polyfill */ 15));



var _mixins = _interopRequireDefault(__webpack_require__(/*! ./polyfill/mixins */ 17));


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;_polyfill.default.init(); // 全局mixins，用于实现setData等功能，请勿删除！';

_vue.default.mixin(_mixins.default);
_vue.default.config.productionTip = false;
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!**********************************************!*\
  !*** D:/products/xssj_New_basic_uni/App.vue ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 12);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */
/*!***********************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/App.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 8 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/App.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _request = _interopRequireDefault(__webpack_require__(/*! ./utils/request.js */ 9));
var _index = _interopRequireDefault(__webpack_require__(/*! ./store/index.js */ 10));var _globalData;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var ourl1 = 'https://xssj.letterbook.cn/xssj-third'; // 正式环境
// const ourl1='https://test.xssj.letterbook.cn/xssj-third'; // 测试环境
// const ourl1 = 'http://192.168.2.174:1255/xssj-third'   // 直播测试环境
// const ourl2 = 'https://xssj.letterbook.cn/xssh' // 商户

var ourl2 = 'http://192.168.2.174:8084/xssh'; // 商户

var ourl3 = 'https://xssj.letterbook.cn/thirdService'; //全局事件总线
var
GlobalEvents = /*#__PURE__*/function () {
  function GlobalEvents() {_classCallCheck(this, GlobalEvents);
    this.events = {};
  }_createClass(GlobalEvents, [{ key: "$on", value: function $on(

    eventName, callback) {
      this.events[eventName] = {
        name: eventName,
        fun: callback };

    } }, { key: "$emit", value: function $emit(

    eventName, data) {
      var eventItem = this.events[eventName];
      eventItem.fun(data);
    } }]);return GlobalEvents;}();var _default =


{
  data: function data() {
    return {};
  },
  //拍卖请求
  onLaunch: function onLaunch(options) {var _this = this;
    console.log('scene:', options.scene);
    this.globalData.scene = options.scene; // 新版本

    if (uni.canIUse('getUpdateManager')) {
      var updateManager = uni.getUpdateManager();

      if (updateManager) {
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              uni.showToast({
                title: '发现新的版本，将重新打开小程序',
                icon: 'none',
                duration: 1000 });

              setTimeout(function () {
                updateManager.applyUpdate();
              }, 1000);
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              uni.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~' });

            });
          }
        });
      }
    } //获取系统信息

    uni.getSystemInfo({
      success: function success(res) {
        _this.globalData.getSystemInfo = res;

        if (res.errMsg == 'getSystemInfo:ok') {
          if (res.screenHeight != res.safeArea.bottom) {
            _this.globalData.isAdapter = true;
          }
        }
      } });
    //获取胶囊信息

    this.globalData.MenuButton = uni.getMenuButtonBoundingClientRect(); //判断token过期

    if (uni.getStorageSync('token')) {
      var data = {
        sjToken: uni.getStorageSync('token') };

      this.globalData.sjrequest('/userRegister/queryAllToken', data, uni.getStorageSync('token')).then(function (res) {
        try {
          if (res.data.data.state == 0) {
            uni.clearStorage();
            uni.navigateTo({
              url: '/pages/shopHome/home/home' });

          }

          if (res.statusCode == 200 && res.data.code == 200) {
            uni.setStorage({
              key: 'marchant_number_key',
              data: res.data.data.marchantNumber });

          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  },
  onShow: function onShow() {},
  globalData: (_globalData = {
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

    isAdapter: false }, _defineProperty(_globalData, "userInfo",
  null), _defineProperty(_globalData, "setInfo",
  {}), _defineProperty(_globalData, "scene",
  ''), _defineProperty(_globalData, "imgFlag",
  false), _defineProperty(_globalData, "globalEvent",
  new GlobalEvents()), _defineProperty(_globalData, "request",
  _request.default), _defineProperty(_globalData, "store",
  _index.default), _defineProperty(_globalData, "fxrequest", function fxrequest(



  url, data, fxToken) {
    var promise = new Promise(function (resolve, reject) {
      // var fxToken = wx.getStorageSync('fxToken')
      uni.request({
        url: ourl + url,
        method: 'POST',
        data: data,
        header: {
          fxToken: fxToken,
          'content-type': 'application/x-www-form-urlencoded' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "sjrequest", function sjrequest(


  url, data) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl1 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/x-www-form-urlencoded' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "mbrequest", function mbrequest(


  url, data) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl3 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/json' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "mb2request", function mb2request(


  url, data) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl1 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/json' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "shrequest", function shrequest(


  url, data) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl2 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/x-www-form-urlencoded' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "sjrequest1", function sjrequest1(


  url, data, token) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl1 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/json;charset=UTF-8' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);

            if (res.data.code !== 0 && res.data.code !== 200) {
              var data = res.data;
              setTimeout(function () {
                uni.showToast({
                  title: data.info,
                  icon: 'none' });

              }, 400);
            }
          } else {
            reject(res.data);
            console.log(res.data, '报错信息');
          }
        },
        fail: function fail(res) {
          console.log(res, '错误信息');
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "signInRequest", function signInRequest(

  url, data) {
    var promise = new Promise(function (resolve, reject) {
      var token = uni.getStorageSync('token');
      uni.request({
        url: ourl1 + url,
        method: 'POST',
        data: data,
        header: {
          token: token,
          'content-type': 'application/json;charset=UTF-8' },

        success: function success(res) {
          if (res.statusCode == 200) {
            resolve(res);

            if (res.data.code !== 0 && res.data.code !== 200) {
              var data = res.data;
            }
          } else {
            reject(res.data);
          }
        },
        fail: function fail(res) {
          console.log(res, '错误信息');
          uni.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 1500 });

          reject('网络出错');
        } });

    });
    return promise;
  }), _defineProperty(_globalData, "userLogin", function userLogin(

  flag) {
    var that = this;
    console.log(flag, 'flag');
    if (this.setInfo.merchantId && !flag) {
      return new Promise(function (resolve, reject) {
        resolve('true');
      });
    }

    return new Promise(function (resolve, reject) {
      uni.login({
        success: function success(res) {
          var accountInfo = uni.getAccountInfoSync();
          var appid = accountInfo.miniProgram.appId;

          if (res.code) {
            var code = res.code;
            var data = {
              appid: appid,
              code: code };

            that.sjrequest('/thirdWxLogin/code', data).then(function (res) {
              console.log(res, '登录信息');

              if (res.statusCode == 200 && res.data.code == 200) {
                // that.globalData.setInfo = res.data.data.setInfo;
                // that.globalData.environment = res.data.data.environment;
                that.setInfo = res.data.data.setInfo;
                that.environment = res.data.data.environment;
                var users = {
                  userInfo: {
                    avatarUrl: res.data.data.headimgurl,
                    nickName: res.data.data.nickname } };


                console.log(users, 'users');
                uni.setStorage({
                  data: res.data.data.setInfo.merchantId,
                  key: 'merchantId' });

                uni.setStorage({
                  data: res.data.data.orderSwitch,
                  key: 'orderSwitch' });

                uni.setStorage({
                  data: res.data.data.nickname,
                  key: 'userName' });

                uni.setStorage({
                  data: res.data.data.setInfo.openId,
                  key: 'thirdWxOpenId' });

                uni.setStorage({
                  key: 'openId1',
                  data: res.data.data.setInfo.openId });

                uni.setStorage({
                  data: res.data.data.setInfo.openId,
                  key: 'openId_1' });

                uni.setStorage({
                  data: res.data.data.setInfo.sessionKey,
                  key: 'sessionkey' });

                uni.setStorage({
                  data: res.data.data.setInfo.appId,
                  key: 'appid' });

                uni.setStorage({
                  key: 'wx_userinfo_key',
                  data: users });

                uni.setStorage({
                  key: 'res',
                  data: res });

                uni.setStorage({
                  key: 'zl_userInfo',
                  data: res });

                uni.setStorage({
                  key: 'zl_jwt',
                  data: res.data.data.jwt });

                uni.setStorage({
                  key: 'token',
                  data: res.data.data.token });

                resolve(res.data.data);
              } else {
                reject('获取用户失败');
              }
            });
          }
        },
        fail: function fail(err) {
          console.log(err, '登录错误信息');
          reject(err);
        } });

    });
  }), _defineProperty(_globalData, "environment",

  ''), _defineProperty(_globalData, "authLogin", function authLogin(

  data) {
    app.sjrequest('/thirdWxLogin/auth', data).then(function (res) {
      console.log(res, 'auth');
      uni.hideLoading();
    });
  }), _defineProperty(_globalData, "setIndex", function setIndex()





















  {var ishide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var that = this;

    if (ishide == 'page') {
      that.sjrequest('/marchant/operateConcerns', {
        type: 4 }).
      then(function (res) {});
      return;
    }

    if (ishide == 'hide' || ishide == 0) {
      return new Promise(function (resolve, reject) {
        that.sjrequest('/marchant/operateConcerns', {
          type: 4 }).
        then(function (res) {
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
          type: 4 }).
        then(function (res) {
          if (res.data.code == 200 && res.data.data.isHome) {
            // wx.navigateTo({
            //   url: `/pages/shopHome/home/home?marchantId=${ res.data.data.isHome}`
            // })
          }
        });
      }
    }
  }), _defineProperty(_globalData, "padLeftZero", function padLeftZero(

  str) {
    return ('00' + str).substr(str.length);
  }), _defineProperty(_globalData, "formatDate", function formatDate(

  date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds() };


    for (var k in o) {
      if (new RegExp("(".concat(k, ")")).test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
      }
    }

    return fmt;
  }), _defineProperty(_globalData, "formatTime", function formatTime(

  date) {var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var t1;
    var t2 = [hour, minute, second].map(this.formatNumber).join(':');

    if (tag == '月') {
      t1 = [month, day].map(this.formatNumber).join(tag);
    } else {
      t1 = [year, month, day].map(this.formatNumber).join(tag);
    }

    if (tag == '小时') {
      t2 = [hour].map(this.formatNumber).join(':');
      return "".concat(t2);
    }

    return "".concat(t1, " ").concat(t2);
  }), _defineProperty(_globalData, "formatNumber", function formatNumber(

  n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }), _defineProperty(_globalData, "getLastDayTime", function getLastDayTime(

  day) {
    return new Date().getTime() + day * 24 * 3600 * 1000;
  }), _defineProperty(_globalData, "cdebounce", function cdebounce(


  func, delay, immediate) {
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
  }), _globalData) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!*******************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/App.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 13);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 13 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/App.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map