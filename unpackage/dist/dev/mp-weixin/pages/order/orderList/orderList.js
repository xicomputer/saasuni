(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/orderList/orderList"],{

/***/ 627:
/*!***********************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/main.js?{"page":"pages%2Forder%2ForderList%2ForderList"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _orderList = _interopRequireDefault(__webpack_require__(/*! ./pages/order/orderList/orderList.vue */ 628));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_orderList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 628:
/*!**************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orderList.vue?vue&type=template&id=13bbb15f& */ 629);
/* harmony import */ var _orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderList.vue?vue&type=script&lang=js& */ 631);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orderList.vue?vue&type=style&index=0&lang=css& */ 633);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/orderList/orderList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 629:
/*!*********************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=template&id=13bbb15f& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderList.vue?vue&type=template&id=13bbb15f& */ 630);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_template_id_13bbb15f___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 630:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=template&id=13bbb15f& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 631:
/*!***************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderList.vue?vue&type=script&lang=js& */ 632);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 632:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





















































































































































































































































































var _weappQrcodeMin = _interopRequireDefault(__webpack_require__(/*! ../../../utils/api/weapp.qrcode.min.js */ 462));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var toBottom = function toBottom() {__webpack_require__.e(/*! require.ensure | pages/Component/toBottom/index */ "pages/Component/toBottom/index").then((function () {return resolve(__webpack_require__(/*! ../../Component/toBottom/index */ 1497));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);}; // import vanPopup from './@vant/weapp/popup/index';
// import vanOverlay from './@vant/weapp/overlay/index';
// pages/Order/Order.js
var time = __webpack_require__(/*! ../../../utils/util */ 28);var app = getApp();var _default = { components: {
    // vanTab,
    // vanTabs,
    // vanImage,
    toBottom: toBottom
    // vanPopup,
    // vanOverlay
  },
  data: function data() {
    return {
      // active: 0
      pageCurr: 1,

      pageSize: 10,
      activeTab: '2',
      toBottom: false,
      isSubmit: false,
      marchantId: 0,

      dntabs: [
      {
        name: '待消费' },

      {
        name: '已取消' },

      {
        name: '已完成' },

      {
        name: '退款/退货' }],



      pstabs: [
      {
        name: '待付款' },

      {
        name: '待发货' },

      {
        name: '待收货' },

      {
        name: '已完成' },

      {
        name: '退款/退货' }],



      tabsList: [],
      tabsItem: 0,
      shopOrderStatus: 0,
      deliveryOrderStatus: 0,
      orderList: [],
      showQRCode: false,
      showHexiao: false,
      isTake: false,
      isCheck: false,
      takeData: {},

      cartShop: {
        appName: '' },


      tabsitem: '',
      verification: 0,
      name: '' };

  },
  /**
      * 生命周期函数--监听页面加载
      */
  onLoad: function onLoad(options) {
    this.setData({
      cartShop: _objectSpread({}, app.globalData.setInfo) });


    if (options.marchantId) {
      this.setData({
        marchantId: options.marchantId });

    }

    this.setData({
      activeTab: options.activeTab || 2,
      tabsitem: parseInt(options.tabsItem) || 0 });

    uni.setNavigationBarTitle({
      title: this.activeTab == 1 ? '店内订单' : '物流订单' });

  },
  /**
      * 生命周期函数--监听页面初次渲染完成
      */
  onReady: function onReady() {},
  /**
                                   * 生命周期函数--监听页面显示
                                   */
  onShow: function onShow() {
    this.getParam();
    this.clearData();
    uni.showLoading({
      title: '加载中',
      mask: true });

    this.getOrderList();
  },
  /**
      * 生命周期函数--监听页面隐藏
      */
  onHide: function onHide() {
    this.clearData();
  },
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
  onReachBottom: function onReachBottom() {
    if (this.toBottom == false) {
      this.getOrderList();
    }
  },
  methods: {
    // 获取页面参数
    getParam: function getParam() {
      if (this.activeTab == '1') {
        this.setData({
          tabsList: this.dntabs });

      } else if (this.activeTab == '2') {
        this.setData({
          tabsList: this.pstabs });

      }
    },

    //切换订单状态
    onChange: function onChange(e) {
      this.clearData();
      var index = e.detail.index;
      this.setData({
        tabsitem: index });

      uni.showLoading({
        title: '加载中',
        mask: true });

      this.getOrderList();
    },

    //清空数据
    clearData: function clearData() {
      this.setData({
        pageCurr: 1,
        orderList: [],
        toBottom: false,
        verification: 0 });

    },

    //显示二维码
    showQR: function showQR(e) {var _this = this;
      var uniqueId = e.currentTarget.dataset.uniqueid;
      this.setData({
        showQRCode: true });

      var data = {
        uniqueId: uniqueId };

      console.log(data);
      app.globalData.sjrequest('/order/queryVerification', data).then(function (res) {
        _this.setData({
          verification: res.data.data.verification });

        (0, _weappQrcodeMin.default)({
          width: 110,
          height: 110,
          canvasId: 'myQrcode',
          text: res.data.data.verification });

      });
    },

    onClose: function onClose() {
      this.setData({
        showQRCode: false,
        showHexiao: false });

    },

    showNumer: function showNumer() {
      this.setData({
        showHexiao: true });

    },

    // 评论
    comment: function comment(e) {
      var orderIdx = e.currentTarget.dataset.orderidx;
      var goodsIdx = e.currentTarget.dataset.goodsidx;
      var goodsData = this.orderList[orderIdx].orderCommodity[goodsIdx];
      var orderList = this.orderList[orderIdx];
      app.globalData.marchantId = orderList.marchantId;
      //商家id
      app.globalData.commodityId = goodsData.commodityId; //商品id
      app.globalData.commodityLogo = goodsData.thumbnail; //商品图片

      app.globalData.commodityName = goodsData.commodityName; //商品名称

      app.globalData.orderUniqueId = goodsData.uniqueId; //订单uid

      uni.navigateTo({
        url: '../postGoodsComment/postGoodsComment' });

    },

    // 撤销申请
    cancelRefund: function cancelRefund(e) {
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
            console.log(e.currentTarget.dataset);
            var data = {
              orderCommodityId: e.currentTarget.dataset.ordercommodityid,
              orderId: e.currentTarget.dataset.orderid };

            app.globalData.sjrequest('/order/cancelChargeback', data).then(function (res) {
              if (res.data.code == 200) {
                uni.showToast({
                  title: '撤销退款成功',
                  icon: 'none',
                  success: function success() {
                    that.clearData();
                    that.setData({
                      tabsitem: 3 });

                  } });

              }
            });
          }
        } });

    },

    read: function read() {
      this.setData({
        isCheck: !this.isCheck });

    },

    // 电话联系
    callStore: function callStore(e) {
      var tel = e.currentTarget.dataset.tel;
      uni.makePhoneCall({
        phoneNumber: tel });

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
      var that = this;
      var data = this.takeData;
      data.receivingType = type;
      this.cancelTake();
      app.globalData.sjrequest('/order/updateCityOrder', data).then(function (res) {
        if (res.data.code == 200) {
          that.clearData();
          that.getOrderList();
        }
      });
    },

    // 配送订单操作
    updateCityOrder: function updateCityOrder(e) {
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
                  that.clearData();
                  that.getOrderList();
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
        console.log(item);
        var data = {
          marchantId: merchantId,
          appid: appid,
          uniqueId: item.uniqueId,
          paymentWay: 2,
          actualMoney: item.actualMoney,
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
                that.clearData();
                that.getOrderList();
                that.setData({
                  isSubmit: false });

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

    toApplyReturn: function toApplyReturn(e) {
      uni.navigateTo({
        url: "../applyReturn/applyReturn?uniqueId=".concat(e.currentTarget.dataset.uniqueid, "&selfUniqueId=").concat(e.currentTarget.dataset.selfuniqueid) });

    },

    getOrderList: function getOrderList() {var _this2 = this;
      if (this.activeTab == 1) {
        // 店内订单
        switch (this.tabsitem) {
          case 0:
            this.setData({
              shopOrderStatus: 1 });

            break;

          case 1:
            this.setData({
              shopOrderStatus: 3 });
            //已取消

            break;

          case 2:
            this.setData({
              shopOrderStatus: 4 });
            //已完成

            break;

          case 3:
            this.setData({
              shopOrderStatus: 5 });
            //退货退款

            break;}


        var data = {
          pageCurr: this.pageCurr,
          pageSize: this.pageSize,
          orderState: this.shopOrderStatus };

        app.globalData.sjrequest('/order/queryReserveOrder', data).then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.length < _this2.pageSize) {
              _this2.setData({
                toBottom: true });

            }

            res.data.data.forEach(function (item) {
              item.orderTime = time.formatTimeSec(item.orderTime, 'Y-M-D h:m:s');
            });
            _this2.setData({
              orderList: res.data.data.concat(_this2.orderList) });

            console.log(_this2.orderList);
          }
        });
      }

      if (this.activeTab == 2) {
        // 配送订单
        switch (this.tabsitem) {
          case 0:
            this.setData({
              deliveryOrderStatus: 0 });
            //待付款

            break;

          case 1:
            this.setData({
              deliveryOrderStatus: 1 });
            //已发货

            break;

          case 2:
            this.setData({
              deliveryOrderStatus: 2 });
            //已收货

            break;

          case 3:
            this.setData({
              deliveryOrderStatus: 4 });
            //已完成

            break;

          case 4:
            this.setData({
              deliveryOrderStatus: 5 });
            //退款退货

            break;}


        var _data = {
          pageCurr: this.pageCurr,
          pageSize: this.pageSize,
          orderState: this.deliveryOrderStatus };


        if (this.marchantId) {
          _data.marchantId = this.marchantId;
        }

        app.globalData.sjrequest('/order/queryCityOrder', _data).then(function (res) {
          if (res.data.code == 200) {
            uni.hideLoading();

            if (res.data.data.length < _this2.pageSize) {
              _this2.setData({
                toBottom: true });

            }

            res.data.data.forEach(function (item) {
              item.orderTime = time.formatTimeSec(item.orderTime);
            });
            _this2.setData({
              orderList: _toConsumableArray(new Set(_this2.orderList.concat(res.data.data))),
              pageCurr: _this2.pageCurr + 1 });

          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none' });

          }
        });
      }
    },

    copyOrder: function copyOrder(e) {
      var order = e.currentTarget.dataset.order;
      uni.setClipboardData({
        data: order,

        success: function success(res) {
          uni.showToast({
            title: '复制成功' });

        } });

    }
    /**
       * 用户点击右上角分享
       */ } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 633:
/*!***********************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderList.vue?vue&type=style&index=0&lang=css& */ 634);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 634:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/order/orderList/orderList.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[627,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/orderList/orderList.js.map