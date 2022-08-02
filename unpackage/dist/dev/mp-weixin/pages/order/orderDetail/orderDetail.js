(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/orderDetail/orderDetail"],{

/***/ 635:
/*!***************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/main.js?{"page":"pages%2Forder%2ForderDetail%2ForderDetail"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _orderDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/order/orderDetail/orderDetail.vue */ 636));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_orderDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 636:
/*!******************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orderDetail.vue?vue&type=template&id=061d9805& */ 637);
/* harmony import */ var _orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderDetail.vue?vue&type=script&lang=js& */ 639);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orderDetail.vue?vue&type=style&index=0&lang=css& */ 641);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["render"],
  _orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/orderDetail/orderDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 637:
/*!*************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=template&id=061d9805& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetail.vue?vue&type=template&id=061d9805& */ 638);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_template_id_061d9805___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 638:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=template&id=061d9805& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 639:
/*!*******************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetail.vue?vue&type=script&lang=js& */ 640);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 640:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var storeClose = function storeClose() {__webpack_require__.e(/*! require.ensure | pages/Component/storeClose/index */ "pages/Component/storeClose/index").then((function () {return resolve(__webpack_require__(/*! @/pages/Component/storeClose/index */ 1469));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};


















































































































































































































































































































































// import vanOverlay from './@vant/weapp/overlay/index';
// pages/order/orderDetail/orderDetail.js
var time = __webpack_require__(/*! ../../../utils/util */ 28);

var app = getApp();var _default =
{
  components: {
    // vanPopup,
    // vanIcon,
    // vanCountDown,
    storeClose: storeClose
    // vanOverlay
  },
  data: function data() {
    return {
      /**
              * orderState:
              *  0待付款，1待发货，2待收货,3已完成(头部样式)
              *  4退款中
              *  5商家处理中,6商家已拒绝，7买家同意，8退货成功，9买家发货
              */
      isClose: false,

      // 是否关店
      orderState: 0,

      orderStateList: [
      //订单状态
      {
        state: '等待您付款',
        prompt: '剩余14分钟59秒自动取消' },

      {
        state: '等待商家发货',
        prompt: '2天内商家未发货订单自动取消' },

      {
        state: '等待您收货',
        prompt: '签收后三天内未收货将自动确认收货' },

      {
        state: '您的订单已完成',
        prompt: '' },

      {
        state: '退款申请中',
        prompt: '商家会在1个工作日内给你退款' },

      {
        state: '请等待商家处理',
        prompt: '将会在24小时内处理' },

      {
        state: '卖家已拒绝，您需要处理',
        prompt: '请与商家进行沟通' },

      {
        state: '请退货并填写物流信息',
        prompt: '请在两天内处理,超时自动取消' },

      {
        state: '退款成功',
        prompt: '您已成功退款' },

      {
        state: '已填写物流信息',
        prompt: '将会在三天内处理，如超时平台将默认商家自动确认收货' }],



      returnStateList: [
      //退货状态
      {
        state: '您已成功发起退款申请，请耐心等待商家处理。',
        prompt: '商家同意或者超时未处理你系统将退款给您。' },

      {
        state: '拒绝原因：货物已被损坏',
        prompt: '商家已拒绝您的退货申请。' },

      {
        state: '商家已同意退货申请，请尽早发货',
        prompt: '' },

      {
        state: '退款总金额',
        prompt: '退回微信' },

      {
        state: '您已填写物流单号，请耐心等待',
        prompt: '商家同意或者超时未处理系统将退款给你' }],



      prompts: ['未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物', '交易的钱款还在平台中间账户，确保你资金安全', '请填写真实物流信息，逾期未填写，退货申请将撤销'],

      refundReasonList: [
      //退款原因
      {
        name: '不喜欢/不想要了' },

      {
        name: '未按时发货' },

      {
        name: '发票的问题' },

      {
        name: '收货地址填错了' },

      {
        name: '其他' }],



      reasonBox: false,
      isSubmit: false,
      logisticsBox: false,
      topList: [],
      refundState: 0,

      citInfo: {
        endTime: '',
        totalPrice: '',
        thumbnail: '',
        commodityName: '',
        itemText: '',
        amount: '',
        actualMoney: '',
        refundReason: '',
        applyRefundTime: '',
        commList: [],
        isSettle: '',
        isSupportRefund: 0,
        uniqueId: '',

        shipping: {
          contacts: '',
          contactWay: '',
          provincesName: '',
          cityName: '',
          areaName: '',
          address: '' },


        message: false,
        freight: '',
        sumDeduct: '',
        expressNo: '',
        expressCompany: '',
        logoPic: '',
        marchantId: '',
        nickName: '',
        chargebackCount: 0,
        orderState: 0,
        chargebackAllCount: 0 },


      refundInfo: {
        list: [],
        refundReason: '',
        totalPrice: '',
        applyRefundTime: '' },


      deliveryRefund: false,
      showCancel: false,
      deliveryCompany: '',
      deliveryNumber: '',
      message: '',
      len: 0,
      uniqueId: '',
      reason: '',
      payState: false,

      // 是否付款
      isTake: false,

      isCheck: false,

      cartShop: {
        headImage: '',
        appName: '' },


      takeData: {},
      useStore: true,
      clone_options: '',
      state: '',
      prompt: '',
      tempSpecId: '',
      refundReason: '',
      _options: null };

  },
  /**
      * 生命周期函数--监听页面加载
      */
  onLoad: function onLoad(options) {
    console.log(options, 'options');
    this._options = options;
    if (this._options.deliveryRefund == 5) {
      this.setData({
        deliveryRefund: true });

    }

    this.setData({
      uniqueId: this._options.deliveryUniqueId });


    if (this._options.state) {
      this.refundDetails(this._options.uniqueId);
    }

    this.queryCity(this._options.uniqueId);
    this.setData({
      cartShop: _objectSpread({}, app.globalData.setInfo) });

    this.setData({
      clone_options: options });

  },
  /**
      * 生命周期函数--监听页面初次渲染完成
      */
  onReady: function onReady() {},
  /**
                                   * 生命周期函数--监听页面显示
                                   */
  onShow: function onShow() {

  },
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
                                               */methods: {
    // 拒绝退款
    refund: function refund() {
      this.setData({
        reasonBox: true });

    },

    // 取消拒绝退款
    refundOnClose: function refundOnClose() {
      this.setData({
        reasonBox: false });

    },

    // 填写物流信息
    logistics: function logistics() {
      this.setData({
        logisticsBox: true });

    },

    // 取消填写物流信息
    logisticsOnClose: function logisticsOnClose() {
      this.setData({
        logisticsBox: false });

    },

    // 选择拒绝原因
    radioChange: function radioChange(e) {
      var refundReasonList = this.refundReasonList;

      for (var i = 0, len = refundReasonList.length; i < len; ++i) {
        refundReasonList[i].checked = refundReasonList[i].name === e.detail.value;
      }

      this.setData({
        refundReasonList: refundReasonList });

    },

    // 评论
    comment: function comment(e) {
      var index = e.currentTarget.dataset.index;
      var goodsData = this.citInfo.commList[index];
      var citInfo = this.citInfo;
      app.globalData.marchantId = citInfo.marchantId;
      //商家id
      app.globalData.commodityId = goodsData.commodityId; //商品id
      app.globalData.commodityLogo = goodsData.thumbnail; //商品图片

      app.globalData.commodityName = goodsData.commodityName; //商品名称

      app.globalData.orderUniqueId = goodsData.uniqueId; //订单uid

      uni.navigateTo({
        url: '../postGoodsComment/postGoodsComment' });

    },

    // 选择其他
    inputFocus: function inputFocus() {
      console.log('focus');
      var refundReasonList = this.refundReasonList;

      for (var i = 0, len = refundReasonList.length; i < len; ++i) {
        refundReasonList[i].checked = refundReasonList[i].name == '其他';
      }

      this.setData({
        refundReasonList: refundReasonList });

    },

    // 查看物流
    checkWl: function checkWl() {
      uni.navigateTo({
        url: '../logistics/logistics?wlNumber=' + this.citInfo.expressNo + '&wlCompany=' + this.citInfo.expressCompany + '&orderNumber=' + this.citInfo.orderNumber });

    },

    queryCity: function queryCity(uniqueId) {var _this = this;
      var data = {
        uniqueId: uniqueId };


      if (!this.deliveryRefund) {
        //配送订单
        app.globalData.sjrequest('/order/queryCityInfo', data).then(function (res) {
          if (res.data.code == 200) {
            var timestamp = Date.parse(new Date());

            if (res.data.data.arrivalTime) {
              res.data.data.arrivalTime = time.formatTimeSec(res.data.data.arrivalTime);
            }

            if (res.data.data.orderTime) {
              res.data.data.orderTime = time.formatTimeSec(res.data.data.orderTime);
            }

            res.data.data.endTime = res.data.data.endTime * 1000 - timestamp + 5000;
            console.log(res.data.data.endTime);
            _this.setData({
              citInfo: res.data.data });


            if (res.data.data.refundState == 0) {
              if (res.data.data.orderState < 4) {
                _this.setData({
                  orderState: res.data.data.orderState });

                console.log(_this.orderState);
              }
            }

            if (res.data.data.refundState == 1) {
              _this.setData({
                orderState: 5 });

            }

            if (res.data.data.refundState == 2) {
              _this.setData({
                orderState: 7 });

            }

            if (res.data.data.refundState == 3) {
              _this.returnStateList[1].state = '拒绝原因:' + res.data.data.rejectReason;
              _this.setData({
                orderState: 6,
                returnStateList: _this.returnStateList });

            }

            if (res.data.data.refundState == 4) {
              _this.setData({
                orderState: 9 });

            }

            if (res.data.data.refundState == 5) {
              _this.setData({
                orderState: 8 });

            }

            if (res.data.data.orderState == 4) {
              _this.setData({
                orderState: 3 });

            }
          }
        });
      }

      if (this.deliveryRefund) {
        var _data = {
          uniqueId: this.uniqueId };

        app.globalData.sjrequest('/order/chargebackDetails', _data).then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.applyRefundTime) {
              res.data.data.applyRefundTime = time.formatTimeSec(res.data.data.applyRefundTime);
            }

            console.log(res.data.data);
            _this.setData({
              citInfo: res.data.data });


            if (res.data.data.refundState == 1) {
              _this.setData({
                orderState: 5 });

            }

            if (res.data.data.refundState == 2) {
              _this.setData({
                orderState: 7 });

            }

            if (res.data.data.refundState == 3) {
              _this.returnStateList[1].state = '拒绝原因:' + res.data.data.refundReason;
              _this.setData({
                orderState: 6,
                returnStateList: _this.returnStateList });

            }

            if (res.data.data.refundState == 4) {
              _this.setData({
                orderState: 9 });

            }

            if (res.data.data.refundState == 5) {
              _this.setData({
                orderState: 8 });

            }
          }
        });
      }
    },

    showPopup: function showPopup() {
      this.setData({
        showCancel: true });

    },

    // 输入事件
    inputContent: function inputContent(e) {
      this.setData({
        message: e.detail.value,
        len: e.detail.value.length });

    },

    inputDeliveryCompany: function inputDeliveryCompany(e) {
      this.setData({
        deliveryCompany: e.detail.value });

    },

    inputDeliveryNumber: function inputDeliveryNumber(e) {
      var value = this.validateNumber(e.detail.value);
      this.setData({
        deliveryNumber: parseInt(value) });

    },

    // 校验只能输入数字
    validateNumber: function validateNumber(val) {
      return val.replace(/^(0+)|[^\d]+/g, '');
    },

    wroteDelivery: function wroteDelivery() {
      var that = this;

      if (this.deliveryCompany == '') {
        uni.showToast({
          title: '请输入快递公司',
          icon: 'none' });

        return;
      }

      if (this.deliveryNumber == '') {
        uni.showToast({
          title: '请输入快递单号',
          icon: 'none' });

        return;
      }

      var data = {
        uniqueId: this.uniqueId,
        tExpressCompany: this.deliveryCompany,
        tExpressNo: this.deliveryNumber };

      app.globalData.sjrequest('/order/chargeback', data).then(function (res) {
        if (res.data.code == 200) {
          that.setData({
            logisticsBox: false });

          that.queryCity(that.uniqueId);
        }
      });
    },

    //确认退款
    confirmCancel: function confirmCancel() {var _this2 = this;
      this.refundReasonList.forEach(function (item) {
        if (item.checked) {
          _this2.setData({
            reason: item.name });

        }
      });

      if (this.reason == '其他') {
        if (this.message == '') {
          uni.showToast({
            title: '请输入退款原因',
            icon: 'none' });

          this.setData({
            reason: '' });

          return;
        } else {
          this.setData({
            reason: this.message });

        }
      }

      if (this.reason == '') {
        uni.showToast({
          title: '请选择退款原因',
          icon: 'none' });

        return;
      }

      var that = this;
      var data = {
        uniqueId: this.citInfo.uniqueId,
        reason: this.reason,
        orderId: this.citInfo.orderId };

      console.log(data);
      var token = uni.getStorageSync('token');
      var appid = uni.getStorageSync('appid');
      var data2s = {
        authorizerAppid: appid,
        sceneType: 3 };

      app.globalData.mb2request('/subTemplate/listPriTemplateId', data2s).then(function (res) {
        var tempData = res.data.data;
        uni.requestSubscribeMessage({
          tmplIds: tempData,
          success: function success(res) {
            var data3s = {
              status: 1,
              marchantId: that.citInfo.marchantId,
              templateIds: tempData,
              appId: appid,
              targetId: that.citInfo.orderId,
              targetType: 4 };

            app.globalData.sjrequest('/basic/addsubscription', data3s).then(function (res) {});
          },
          complete: function complete() {
            app.globalData.sjrequest1('/order/ezchargeback', data, token).then(function (res) {
              if (res.data.code == 200) {
                uni.showToast({
                  title: '申请成功,等待商家同意',
                  icon: 'none',
                  duration: 1000 });

                setTimeout(function () {
                  uni.redirectTo({
                    url: "/pages/order/orderList/orderList?activeTab=2&marchantId=".concat(that.citInfo.marchantId, "&tabsItem=4") });

                }, 1000);
              }
            });
          } });

      });
    },

    copy: function copy() {
      uni.setClipboardData({
        data: this.citInfo.orderNumber,
        success: function success() {
          uni.showToast({
            title: '复制成功',
            icon: 'none' });

        } });

    },

    copyTd: function copyTd() {
      uni.setClipboardData({
        data: this.citInfo.expressNo,
        success: function success() {
          uni.showToast({
            title: '复制成功',
            icon: 'none' });

        } });

    },

    onClose: function onClose() {
      this.setData({
        showCancel: false });

    },

    // 再来一单
    rebuy: function rebuy() {var _this3 = this;
      var that = this;
      var data = {
        marchantId: this.citInfo.marchantId,
        commoditys: [],
        orderType: this.citInfo.orderType,
        shppingId: this.citInfo.shipping.id };

      this.citInfo.commList.forEach(function (el) {
        data.commoditys.push({
          commodityId: el.commodityId,
          tempSpecId: el.tempSpecId,
          amount: el.amount });

      });
      var token = uni.getStorageSync('token');
      app.globalData.sjrequest1('/order/onekeyAboutOrder', data, token).then(function (res) {
        if (res.data.code === 200) {
          // 更新 store 数据
          app.globalData.store.setState({
            submitObj: JSON.stringify(res.data.data) });

          uni.navigateTo({
            url: '/pages/order/submitOrder/submitOrder?personnel=' + (that.citInfo.saleUniqueId || 0) });

        } else if (res.data.code == 338) {
          _this3.setData({
            isClose: true });

        }
      });
    },

    // 撤销申请
    cancelRefund: function cancelRefund() {
      var that = this;
      uni.showModal({
        title: '撤销退货申请',
        content: '是否要撤销退货申请，撤销后将无法再次申请退货',
        showCancel: true,
        //是否显示取消按钮
        cancelText: '否',
        //默认是“取消”
        confirmText: '是',
        //默认是“确定”
        success: function success(res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            var data = {
              orderCommodityId: that.citInfo.orderCommodityId,
              orderId: that.citInfo.orderId };

            app.globalData.sjrequest('/order/cancelChargeback', data).then(function (res) {
              if (res.data.code == 200) {
                uni.showToast({
                  title: '撤销退款成功',
                  icon: 'none',
                  success: function success() {
                    uni.navigateBack({
                      delta: 0 });

                  } });

              }
            });
          }
        } });

    },

    // 配送订单操作
    updateCityOrder: function updateCityOrder(e) {
      console.log(e);
      var that = this;
      var ev = e.currentTarget.dataset;
      var data = {
        uniqueId: ev.uniqueid,
        orderState: ev.id,
        marchantId: ev.marchantid };

      var text;
      var notice;
      switch (parseInt(ev.id)) {
        case 3:
          text = '确认取消订单吗？';
          notice = '取消成功';
          break;

        case 4:
          text = '确认收货吗？';
          notice = '已确认收货';
          break;

        case 5:
          text = '确认删除订单吗？';
          notice = '删除成功';
          break;}


      if (ev.id != 2) {
        uni.showModal({
          title: '提示',
          content: text,
          success: function success(sm) {
            if (sm.confirm) {
              // 用户点击了确定 可以调用删除方法了
              app.globalData.sjrequest('/order/updateCityOrder', data).then(function (res) {
                if (res.data.code == 200) {
                  uni.navigateBack({
                    delta: 0 });

                }
              });
            } else if (sm.cancel) {
              console.log('用户点击取消');
            }
          } });

      }

      if (ev.id == 2) {
        app.globalData.sjrequest('/order/updateCityOrder', data).then(function (res) {
          if (res.data.code == 200) {
            uni.showToast({
              title: '已提醒商家',
              icon: 'none' });

          } else if (res.data.code == 309) {
            uni.showToast({
              title: '您已经提醒过了，一天只能提醒一次哦!',
              icon: 'none' });

          }
        });
      }
    },

    //倒计时结束
    countDownOver: function countDownOver() {
      if (this.payState) {
        return;
      }

      var data = {
        uniqueId: this.citInfo.uniqueId,
        orderState: 3,
        marchantId: this.citInfo.marchantId };

      app.globalData.sjrequest('/order/updateCityOrder', data).then(function (res) {
        if (res.data.code == 200) {
          uni.showToast({
            title: '已自动为您取消订单',
            icon: 'none',
            duration: 2000,
            success: function success() {
              setTimeout(function () {
                uni.navigateBack({
                  delta: 0 });

              }, 2000);
            } });

        }
      });
    },

    // 支付订单
    payOrder: function payOrder(e) {
      if (!this.isSubmit) {
        // 防止多次点击
        this.setData({
          isSubmit: true });

        var item = e.currentTarget.dataset.item;
        var that = this;
        var merchantId = uni.getStorageSync('merchantId');
        var appid = uni.getStorageSync('appid');
        var data = {
          uniqueId: item.uniqueId,
          paymentWay: 2,
          actualMoney: item.actualMoney,
          marchantId: merchantId,
          appid: appid,
          orderNumber: item.orderNumber,
          body: item.nickName,
          payPlatform: 'JSAPI' };

        app.globalData.sjrequest('/order/paymentOrder', data).then(function (res) {
          if (res.data.code == 200) {
            uni.requestPayment({
              appId: res.data.data.appId,
              nonceStr: res.data.data.nonceStr,
              // 支付签名随机串，不长于 32 位
              package: res.data.data.package,
              // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: res.data.data.signType,
              // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              timeStamp: res.data.data.timeStamp,
              // 支付签名时间戳，
              paySign: res.data.data.paySign,
              // 支付签名
              success: function success(res) {
                that.setData({
                  payState: true });

                uni.showToast({
                  title: '支付成功',
                  duration: 1000 });

                setTimeout(function () {
                  uni.navigateBack({
                    delta: 0 });

                }, 1000);
              },
              fail: function fail(res) {
                uni.showToast({
                  title: '支付失败',
                  icon: 'none' });

                that.setData({
                  isSubmit: false });

              } });

          }
        });
      }
    },

    read: function read() {
      this.setData({
        isCheck: !this.isCheck });

    },

    // 收货弹框
    getOrderGoods: function getOrderGoods(e) {
      var el = e.currentTarget.dataset;
      var data = {
        uniqueId: el.uniqueid,
        orderState: el.id,
        marchantId: el.marchantid };

      this.setData({
        isTake: true,
        takeData: data });

    },

    // 取消收货
    cancelTake: function cancelTake() {
      this.setData({
        isTake: false,
        isCheck: false });

    },

    // 确认收货
    confirmTake: function confirmTake(e) {
      if (!this.isCheck) {
        uni.showToast({
          title: '请先勾选我已知悉',
          icon: 'none' });

        return;
      }

      var type = e.currentTarget.dataset.type;
      var data = this.takeData;
      data.receivingType = type;
      this.cancelTake();
      app.globalData.sjrequest('/order/updateCityOrder', data).then(function (res) {
        if (res.data.code == 200) {
          uni.navigateBack({
            delta: 0 });

        }
      });
    },

    refundDetails: function refundDetails(uniqueId) {var _this4 = this;
      var data = {
        uniqueId: uniqueId };

      app.globalData.sjrequest('/order/refundDetails', data).then(function (res) {
        if (res.data.code == 200) {
          if (res.data.data.applyRefundTime) {
            res.data.data.applyRefundTime = time.formatTimeSec(res.data.data.applyRefundTime);
          }

          _this4.setData({
            refundInfo: res.data.data,
            orderState: 5 });

        }
      });
    } },

  watch: {
    _options: {
      handler: function handler(newVal, oldVal) {
        this.clone_options = newVal;
      },

      immediate: true } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 641:
/*!***************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetail.vue?vue&type=style&index=0&lang=css& */ 642);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 642:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderDetail/orderDetail.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[635,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/orderDetail/orderDetail.js.map