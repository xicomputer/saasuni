(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/seckill/order-detail/order-detail"],{

/***/ 1091:
/*!*******************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/main.js?{"page":"pages%2Fseckill%2Forder-detail%2Forder-detail"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _orderDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/seckill/order-detail/order-detail.vue */ 1092));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_orderDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 1092:
/*!**********************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-detail.vue?vue&type=template&id=330d7426& */ 1093);
/* harmony import */ var _order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order-detail.vue?vue&type=script&lang=js& */ 1095);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-detail.vue?vue&type=style&index=0&lang=css& */ 1097);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/seckill/order-detail/order-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1093:
/*!*****************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=template&id=330d7426& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order-detail.vue?vue&type=template&id=330d7426& */ 1094);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_template_id_330d7426___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1094:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=template&id=330d7426& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1095:
/*!***********************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order-detail.vue?vue&type=script&lang=js& */ 1096);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1096:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import vanPopup from './@vant/weapp/popup/index';
// import vanCountDown from '../../../miniprogram_npm/@vant/weapp/count-down/index';
// pages/seckill/order-detail/order-detail.js
var app = getApp();var _default =
{
  components: {
    // vanPopup,
    // vanCountDown
  },
  data: function data() {
    return {
      appId: '',
      orderState: '',
      adornUrl: '/static/pages/seckill/imgs/dfh.png',
      topTitle: '',

      //头部标题
      showCancelWhy: false,

      //弹窗显示状态
      whyNum: 0,

      //取消原因序号
      whyList: [
      {
        content: '信息填写错误',
        whyNum: 1 },

      {
        content: '不想买了',
        whyNum: 2 },

      {
        content: '卖家问题',
        whyNum: 3 },

      {
        content: '其他',
        whyNum: -1 }],



      whyType: 1,

      //原因类型 1取消订单 2退款
      whyPopupTitle: '',

      //原因弹窗标题
      reasonText: '',

      //理由
      orderInfo: {
        isDelete: 0,
        orderState: 0,
        expressNo: '',
        bannerImgUrls: '',
        commodityName: '',
        skuName: '',
        livePrice: '',
        price: '',
        amount: '',
        actualMoney: '',
        orderTime: '',
        message: '',
        orderNumber: '',
        isEnd: 0,
        activityOrderRefundResponse: false },


      //订单信息
      logisticsInfo: {},

      //物流信息
      nowLogisticsItem: {
        status: '',
        time: '' },


      //物流最新节点信息
      shippingAddress: {
        contacts: '',
        contactWay: '' },


      //地址信息
      fullAddress: '',

      //完整收货地址
      isOverdue: false,

      //待支付订单是否过期
      downTimeObj: {
        minutes: '',
        seconds: '',
        days: '',
        hours: '' },


      //剩余自动确认收货天数
      residueDay: 3,

      dataList: '',
      userShipping: '',
      downTimes: '' };

  },
  /**
      * 生命周期函数--监听页面加载
      */
  onLoad: function onLoad(options) {
    var orderNum = options.orderNum;
    var orderState = options.state;

    if (orderNum) {
      this.orderNum = orderNum;
      this.getOrderDetailInfo();
    }

    if (orderState) {
      this.setPageTitle(orderState);
      this.setData({
        orderState: orderState });

    }
  },
  /**
      * 生命周期函数--监听页面初次渲染完成
      */
  onReady: function onReady() {var _this = this;
    uni.getStorage({
      key: 'appid',
      success: function success(res) {
        _this.setData({
          appId: res.data });

      } });

  },
  /**
      * 生命周期函数--监听页面显示
      */
  onShow: function onShow() {},
  /**
                                 * 生命周期函数--监听页面隐藏
                                 */
  onHide: function onHide() {},
  /**
                                 * 生命周期函数--监听页面卸载
                                 */
  onUnload: function onUnload() {},
  /**
                                     * 页面相关事件处理函数--监听用户下拉动作
                                     */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
                                                       * 页面上拉触底事件的处理函数
                                                       */
  onReachBottom: function onReachBottom() {},
  /**
                                               * 用户点击右上角分享
                                               */
  onShareAppMessage: function onShareAppMessage() {},
  methods: {
    setPageTitle: function setPageTitle(state) {
      var navTitle = '';
      var topTitle = '';
      var adornUrl = '';
      //设置页码标题
      switch (Number(state)) {
        case 0:
          navTitle = '待付款';
          topTitle = '等待您的付款';
          adornUrl = '/static/pages/seckill/imgs/dfk.png';
          break;

        case 1:
          navTitle = '待发货';
          topTitle = '等待商家发货';
          adornUrl = '/static/pages/seckill/imgs/dfh.png';
          break;

        case 2:
          navTitle = '待收货';
          topTitle = '等待您收货';
          adornUrl = '/static/pages/seckill/imgs/dsh.png';
          break;

        case 3:
          navTitle = '已取消';
          adornUrl = '/static/pages/seckill/imgs/yqx.png';
          break;

        case 4:
          navTitle = '已完成';
          topTitle = '买家已确认收货';
          adornUrl = '/static/pages/seckill/imgs/ywc.png';
          break;}


      uni.setNavigationBarTitle({
        title: navTitle });

      this.setData({
        topTitle: topTitle,
        adornUrl: adornUrl });

    },

    jumpLogisticsShow: function jumpLogisticsShow() {
      //跳转物流信息展示
      var logisticsInfo = this.logisticsInfo;
      var query = "wlNumber=".concat(logisticsInfo.number, "&wlCompany=").concat(logisticsInfo.expName, "&orderNumber=").concat(logisticsInfo.orderNumber);
      uni.navigateTo({
        url: '/pages/order/logistics/logistics?' + query });

    },

    closePopup: function closePopup() {
      //关闭弹窗
      this.setData({
        showCancelWhy: false });

    },

    openWhyList: function openWhyList(e) {
      //打开取消订单原因列表选择弹窗
      var type = e.currentTarget.dataset.type;
      var orderItem = this.orderInfo;

      if (orderItem.activityOrderRefundResponse) {
        //申请了退款
        uni.navigateTo({
          url: '/pages/seckill/refund-order/refund-order' });

      } else {
        var title = type == 0 ? '选择取消理由' : '选择退款原因';
        this.setData({
          showCancelWhy: true,
          whyType: type,
          whyPopupTitle: title });

      }
    },

    selectWhy: function selectWhy(e) {
      //选择理由
      var whyNum = e.currentTarget.dataset.whynum;

      if (this.whyNum != whyNum) {
        this.setData({
          whyNum: whyNum });

      }
    },

    textareaChange: function textareaChange(e) {
      //输入框内容改变
      var value = e.detail.value;
      this.setData({
        reasonText: value });

    },

    popupConfrimHandle: function popupConfrimHandle() {
      //原因弹窗确认操作
      var whyType = this.whyType;
      var whyNum = this.whyNum;
      var whyList = this.whyList;
      var whyItem = whyList.find(function (item) {return item.whyNum == whyNum;}) || {};
      var reasonText = whyNum == -1 ? this.reasonText : whyItem.content;

      if (whyType == 1) {
        this.cancelOrder(reasonText);
      } else if (whyType == 2) {
        this.applyRefund(reasonText);
      }
    },

    cancelOrder: function cancelOrder(reasonText) {var _this2 = this;
      //确认取消订单
      if (!reasonText) {
        return uni.showToast({
          title: '请选择原因',
          icon: 'none' });

      }

      this.setData({
        showCancelWhy: false });

      app.globalData.
      sjrequest1('/activityOrderBusiness/cancelOrder', {
        orderNumber: this.orderNum,
        refundReason: reasonText //退款原因
      }).
      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          uni.showToast({
            title: '操作成功',
            icon: 'none' });

          dataList.splice(index, 1);
          _this2.setData({
            dataList: dataList });

          var eventChannel = _this2.getOpenerEventChannel();
          eventChannel.emit('uploadOrderList');
          uni.navigateBack();
        }
      });
    },

    applyRefund: function applyRefund(reasonText) {
      //确认申请退款
      var state = this.orderInfo.orderState;
      var reqUrl = '';

      switch (state) {
        case 1:
          reqUrl = '/activityOrderBusiness/beforeSendCommodityRefund';
          break;
        //待发货退款

        case 4:
          reqUrl = '/activityOrderBusiness/afterSendCommodityRefund';
          break;
        //收货后退款
      }

      app.globalData.
      sjrequest1(reqUrl, {
        orderNumber: this.orderNum,
        refundReason: reasonText //退款原因
      }).
      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          uni.showToast({
            title: '操作成功',
            icon: 'none' });

        }
      });
    },

    jumpAddressList: function jumpAddressList() {var _this3 = this;
      //跳转收货地址列表
      if (this.fullAddress) {
        return;
      }

      app.globalData.store.setState({
        from: 'submitOrder' });

      uni.navigateTo({
        url: '/pages/Address/AddressList/AddressList',
        events: {
          addressChange: function addressChange(data) {
            var shipping = data.shipping;
            var fullAddress = _this3.joinAddress(shipping);
            _this3.setData({
              userShipping: shipping,
              fullAddress: fullAddress });

          } } });


    },

    getLogisticsInfo: function getLogisticsInfo() {var _this4 = this;
      //获取物流信息
      app.globalData.
      sjrequest1('/activityOrderBusiness/queryLogisticsDetails', {
        expressNumber: this.orderInfo.expressNo,
        orderNumber: this.orderInfo.orderNumber }).

      then(function (res) {
        console.log('物流信息：', res);

        if (res.statusCode == 200 && res.data.code === 0) {
          var data = res.data.data;
          var info = JSON.parse(data);
          var nowLogisticsItem = info.result.list[0];
          _this4.setData({
            logisticsInfo: info.result,
            nowLogisticsItem: nowLogisticsItem });

        }
      });
    },

    joinAddress: function joinAddress(shipping) {
      //拼接收货地址
      var provincesName = shipping.provincesName,cityName = shipping.cityName,areaName = shipping.areaName,address = shipping.address;
      return provincesName + cityName + areaName + address;
    },

    _parseDate: function _parseDate(str, resType) {
      //resType 取值 'object' | 'number'
      var a = str.split(/[^0-9]+/);
      var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
      return resType == 'number' ? date.getTime() : date;
    },

    getOrderDetailInfo: function getOrderDetailInfo() {var _this5 = this;
      app.globalData.
      sjrequest1('/activityOrderBusiness/detailOrder', {
        orderNumber: this.orderNum }).

      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          var data = res.data.data;
          var shippingAddress = JSON.parse(data.shippingAddress);
          var fullAddress = _this5.joinAddress(shippingAddress);

          if (data.orderState === 0) {
            var totalBuyTimes = 15 * 60 * 1000;

            var orderTimes = _this5._parseDate(data.orderTime, 'number');

            var nowTimes = new Date().getTime();
            var diffTimes = nowTimes - orderTimes; //时间差毫秒数

            var downTimes = totalBuyTimes - diffTimes; //剩余时间

            var isOverdue = downTimes <= 0;
            _this5.setData({
              isOverdue: isOverdue,
              downTimes: downTimes });

          } else if (data.orderState === 2) {
            var nowTimes = new Date().getTime();

            var deliveryTimes = _this5._parseDate(data.deliveryTime, 'number');

            var diffTimes = deliveryTimes - nowTimes;
            _this5.setData({
              downTimes: diffTimes });

          }

          _this5.setData(
          {
            orderInfo: data,
            shippingAddress: shippingAddress,
            fullAddress: fullAddress },

          function () {
            if (data.expressNo) {
              _this5.getLogisticsInfo();
            }
          });

          _this5.computedSurplus(data.deliveryTime); //计算剩余收货时间
        }
      });
    },

    computedSurplus: function computedSurplus(deliveryTime) {
      if (deliveryTime) {
        var totalTimes = 3 * 86400000;
        var nowTimes = new Date().getTime();

        var deliveryTimes = this._parseDate(deliveryTime, 'number');

        var downTimes = totalTimes - (nowTimes - deliveryTimes);
        this.setData({
          downTimes: downTimes });

      }
    },

    finishFun: function finishFun() {
      //倒计时完成
      this.setData({
        isOverdue: true });

    },

    changeFun: function changeFun(e) {
      //倒计时改变
      var detail = e.detail;

      for (var key in detail) {
        var value = detail[key];

        if (value < 10) {
          detail[key] = '0' + value;
        } else {
          detail[key] = value;
        }
      }

      this.setData({
        downTimeObj: detail });

    },

    remindDelivery: function remindDelivery() {
      //提醒发货
      var orderInfo = this.orderInfo;
      app.globalData.
      sjrequest1('/activityOrderBusiness/sendDeliverySms', {
        orderNumber: orderInfo.orderNumber }).

      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          uni.showToast({
            title: '已提醒',
            icon: 'none' });

        } else {
          uni.showToast({
            title: res.data.info || '已提醒',
            icon: 'none' });

        }
      });
    },

    goPay: function goPay() {var _this6 = this;
      //待支付订单 去支付
      if (this.activation) {
        return;
      }

      this.activation = true;
      setTimeout(function () {
        _this6.activation = null;
      }, 1500);
      var orderInfo = this.orderInfo;var
      appId = this.appId;
      uni.showLoading({
        title: '请求支付',
        mask: true });

      app.globalData.
      sjrequest1('/activityOrderBusiness/wxPay', {
        orderNumber: orderInfo.orderNumber,
        merchantId: orderInfo.marchantId,
        appId: appId }).

      then(function (res) {
        uni.hideLoading();

        if (res.statusCode == 200 && res.data.code === 0) {
          var data = res.data.data;
          uni.requestPayment(_objectSpread(_objectSpread({},
          data), {}, {
            success: function success(res) {
              var query = {
                orderNum: data.orderNo,
                goodsName: orderInfo.commodityName,
                skuName: orderInfo.skuName,
                buyCount: orderInfo.amount };

              var queryStr = JSON.stringify(query);
              queryStr = 'query=' + encodeURIComponent(queryStr);
              uni.navigateTo({
                url: '/pages/seckill/pay-success/pay-success?' + queryStr });

            } }));

        }
      });
    },

    jumpGoodsDetail: function jumpGoodsDetail() {
      //重新购买时 跳转活动商品详情
      var orderInfo = this.orderInfo;
      uni.navigateTo({
        url: '/pages/seckill/detail/detail?activityId=' + orderInfo.activityId });

    },

    jumpEvaluate: function jumpEvaluate() {
      //跳转评价页面
      var orderInfo = this.orderInfo;
      app.globalData.marchantId = orderInfo.marchantId; //商家id

      app.globalData.commodityId = orderInfo.commodityId; //商品id

      app.globalData.commodityLogo = orderInfo.imageUrl; //商品图片

      app.globalData.commodityName = orderInfo.commodityName; //商品名称

      app.globalData.orderUniqueId = orderInfo.orderNumber; //订单uid

      uni.navigateTo({
        url: '/pages/order/postGoodsComment/postGoodsComment' });

    },

    confirmDelivery: function confirmDelivery() {var _this7 = this;
      //确认收货
      var orderInfo = this.orderInfo;
      app.globalData.
      sjrequest1('/activityOrderBusiness/confirmOrder', {
        orderNumber: orderInfo.orderNumber }).

      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          uni.showToast({
            title: '已收货',
            icon: 'none' });

          var eventChannel = _this7.getOpenerEventChannel();
          eventChannel.emit('uploadOrderList');
          uni.navigateBack();
        }
      });
    },

    delOrder: function delOrder() {
      //删除订单
      var orderInfo = this.orderInfo; // activityOrderBusiness/deleteOrder

      app.globalData.
      sjrequest1('/activityOrderBusiness/cancelOrder', {
        orderNumber: orderInfo.orderNumber }).

      then(function (res) {
        if (res.statusCode == 200 && res.data.code === 0) {
          uni.showToast({
            title: '已删除',
            icon: 'none' });

        }
      });
    },

    contactMerchant: function contactMerchant() {var _this8 = this;
      //联系商家
      uni.getStorage({
        key: 'zl_userInfo',
        success: function success(res) {
          var data = res.data;

          if (data.statusCode == 200 && data.data.code == 200) {
            var info = data.data.data;
            var appName = info.setInfo.appName;
            var headImage = info.setInfo.headImage;
            var merchantId = _this8.orderInfo.marchantId;
            uni.navigateTo({
              url: "/pages/order/contact/contact?logoPic=".concat(headImage, "&marchantId=").concat(merchantId, "&marchantName=").concat(appName) });

          }
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 1097:
/*!*******************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order-detail.vue?vue&type=style&index=0&lang=css& */ 1098);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1098:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/seckill/order-detail/order-detail.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[1091,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/seckill/order-detail/order-detail.js.map