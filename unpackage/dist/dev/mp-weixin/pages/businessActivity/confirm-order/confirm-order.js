(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/businessActivity/confirm-order/confirm-order"],{

/***/ 923:
/*!******************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/main.js?{"page":"pages%2FbusinessActivity%2Fconfirm-order%2Fconfirm-order"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _confirmOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/businessActivity/confirm-order/confirm-order.vue */ 924));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_confirmOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 924:
/*!*********************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm-order.vue?vue&type=template&id=219b46cc& */ 925);
/* harmony import */ var _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirm-order.vue?vue&type=script&lang=js& */ 927);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./confirm-order.vue?vue&type=style&index=0&lang=css& */ 929);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/businessActivity/confirm-order/confirm-order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 925:
/*!****************************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=template&id=219b46cc& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirm-order.vue?vue&type=template&id=219b46cc& */ 926);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_template_id_219b46cc___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 926:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=template&id=219b46cc& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 927:
/*!**********************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirm-order.vue?vue&type=script&lang=js& */ 928);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 928:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var addSubtractNum = function addSubtractNum() {__webpack_require__.e(/*! require.ensure | pages/Component/add-subtract-num/add-subtract-num */ "pages/Component/add-subtract-num/add-subtract-num").then((function () {return resolve(__webpack_require__(/*! @/pages/Component/add-subtract-num/add-subtract-num */ 1539));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};





































































































// import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
var app = getApp();var _default =
{
  components: {
    addSubtractNum: addSubtractNum
    // vanDatetimePicker
  },
  data: function data() {
    return {
      message: '',
      //留言
      totalAmount: 0,
      buyCount: 1,
      goodsName: '',
      activityId: '',
      //活动id
      commodityId: '',
      //商品id
      shareUserId: '',
      //分享用户id
      skuInfo: {
        imageUrl: '',
        skuName: '',
        livePrice: '' },

      //规格信息
      userShipping: {
        contacts: '',
        contactWay: '' },

      //地址信息
      fullAddress: '',
      //完整收货地址
      appid: '',
      merchantId: '',
      merchantAddress: '',
      //商家地址
      orderType: '',
      //商家支持的配送方式
      arriveTime: '',
      //预订时间
      orderTemplate: '',
      //订单模板 1.物流 2.同城 3.预订
      showDateTime: false,
      radioList: [],
      //配送方式列表
      minDate: new Date().getTime(),
      currentDate: new Date().getTime(),
      showBookTime: '',
      isLocal: false //与商家是否在同一个城市
    };
  },
  /**
      * 生命周期函数--监听页面加载
      */
  onLoad: function onLoad(options) {
    var query = options.query || '';
    query = decodeURIComponent(query);
    query = JSON.parse(query);
    this.joinRadioList(query.orderType);
    var livePrice = query.skuInfo.livePrice;
    var buyCount = query.buyCount;
    var totalAmount = this.computedTotalAmount(livePrice, buyCount);
    var fullAddress = this.joinAddress(query.userShipping);
    this.setData(_objectSpread(_objectSpread({}, query), {}, { totalAmount: totalAmount, fullAddress: fullAddress }));
  },
  /**
      * 生命周期函数--监听页面初次渲染完成
      */
  onReady: function onReady() {var _this = this;
    uni.getStorage({
      key: 'merchantId',
      success: function success(res) {
        _this.setData(
        {
          merchantId: res.data },

        function () {
          _this.getMerchantInfo();
        });

      } });

    uni.getStorage({
      key: 'appid',
      success: function success(res) {
        _this.setData({
          appid: res.data });

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
    jumpAddressList: function jumpAddressList() {var _this2 = this;
      //跳转收货地址列表
      app.globalData.store.setState({
        from: 'submitOrder' });

      uni.navigateTo({
        url: '/pages/Address/AddressList/AddressList',
        events: {
          addressChange: function addressChange(data) {
            var shipping = data.shipping;
            var fullAddress = _this2.joinAddress(shipping);
            _this2.setData(
            {
              userShipping: shipping,
              fullAddress: fullAddress },

            function () {
              _this2.checkLocal(); //校验同城地址
            });

          } } });


    },

    checkLocal: function checkLocal() {
      //校验同城地址
      var userShipping = this.userShipping;
      var merchantAddress = this.merchantAddress;var
      provincesName = userShipping.provincesName,cityName = userShipping.cityName,areaName = userShipping.areaName;
      var res1 = merchantAddress.includes(provincesName);
      var res2 = merchantAddress.includes(cityName);
      var isLocal = res1 && res2;
      this.setData({
        isLocal: isLocal });

    },

    joinRadioList: function joinRadioList(orderTemplate) {
      //组合配送方式列表
      orderTemplate = orderTemplate || '';
      var list = [
      {
        name: '物流发货',
        value: 1 },

      {
        name: '同城配送',
        value: 2 },

      {
        name: '预定自取',
        value: 3 }];


      var radioList = [];
      list.forEach(function (item) {
        var bool = orderTemplate.includes(item.value);

        if (bool) {
          radioList.push(item);
        }
      });
      this.setData({
        radioList: radioList });

    },

    radioChange: function radioChange(e) {
      var value = e.detail.value;
      this.setData({
        orderTemplate: value });

    },

    openSelDateTime: function openSelDateTime() {
      var minDate = new Date().getTime();
      this.setData({
        showDateTime: true,
        minDate: minDate });

    },

    confirmDateTime: function confirmDateTime(e) {
      //确定选择日期时间
      var detail = e.detail;
      var date = new Date(detail);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;

      if (month < 10) {
        month = '0' + month;
      }

      var dayNum = date.getDate();

      if (dayNum < 10) {
        dayNum = '0' + dayNum;
      }

      var hour = date.getHours();

      if (hour < 10) {
        hour = '0' + hour;
      }

      var minute = date.getMinutes();

      if (minute < 10) {
        minute = '0' + minute;
      }

      var showBookTime = "".concat(year, "\u5E74").concat(month, "\u6708").concat(dayNum, "\u65E5").concat(hour, "\u65F6").concat(minute, "\u5206");
      var arriveTime = "".concat(year, "-").concat(month, "-").concat(dayNum, " ").concat(hour, ":").concat(minute, ":00");
      this.setData({
        currentDate: detail,
        showBookTime: showBookTime,
        showDateTime: false,
        arriveTime: arriveTime });

    },

    cancelSelDateTime: function cancelSelDateTime() {
      this.setData({
        showDateTime: false });

    },

    getMerchantInfo: function getMerchantInfo() {var _this3 = this;
      var data = {
        id: this.merchantId };

      app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then(function (res) {
        if (res.statusCode == 200 && res.data.code == 200) {
          var data = res.data.data;
          var merchantAddress = data.entirelyAddress;
          _this3.setData(
          {
            merchantAddress: merchantAddress },

          function () {
            _this3.checkLocal(); //校验同城地址
          });

        }
      });
    },

    settlement: function settlement() {var _this4 = this;
      //结算
      if (this.activation) {
        return;
      }

      this.activation = true;
      setTimeout(function () {
        _this4.activation = null;
      }, 1500);var
      userShipping = this.userShipping,skuInfo = this.skuInfo,buyCount = this.buyCount,merchantId = this.merchantId,arriveTime = this.arriveTime,message = this.message,activityId = this.activityId,shareUserId = this.shareUserId,appid = this.appid,commodityId = this.commodityId,orderTemplate = this.orderTemplate,isLocal = this.isLocal;

      if (!orderTemplate) {
        return uni.showToast({
          title: '请选择配送方式',
          icon: 'none' });

      }

      var reqData = {
        commodityId: commodityId,
        //商品id,
        appId: appid,
        //appid
        merchantId: merchantId,
        //商家id
        activityId: activityId,
        //活动id
        amount: buyCount,
        //购买数量
        message: message,
        //用户留言
        skuId: skuInfo.skuId,
        //商品规格id
        orderType: orderTemplate //配送方式
      };

      if (shareUserId) {
        reqData.shareUserId = shareUserId;
      } //分享者id

      if (orderTemplate != 3 && !userShipping.id) {
        //除了预订 其他配送方式需要校验地址
        return uni.showToast({
          title: '你还未添加收货地址',
          icon: 'none' });

      } else {
        reqData.userHippingId = userShipping.id;
      }

      if (orderTemplate == 3) {
        //预订需要添加预订时间
        if (arriveTime) {
          reqData.arriveTime = arriveTime;
        } else {
          return uni.showToast({
            title: '请选择预订时间',
            icon: 'none' });

        }
      }

      if (orderTemplate == 2 && !isLocal) {
        return uni.showToast({
          title: '您的收货地址不在同城范围内',
          icon: 'none' });

      }

      uni.showLoading({
        title: '生成订单',
        mask: true });

      app.globalData.sjrequest1('/activityOrderBusiness/wxPay', reqData).then(function (res) {
        uni.hideLoading();

        if (res.statusCode == 200 && res.data.code == 0) {
          var data = res.data.data;
          var orderNumber = data.orderNo;
          uni.requestPayment(_objectSpread(_objectSpread({},
          data), {}, {
            success: function success(res) {
              var eventChannel = _this4.getOpenerEventChannel();
              eventChannel.emit('uploadData');
              uni.setStorage({
                key: 'orderTemplate_key',
                data: orderTemplate,
                success: function success() {} });

              _this4.subscribeMsg(orderNumber, function () {
                uni.navigateBack();
              });
            } }));

        }
      });
    },

    subscribeMsg: function subscribeMsg(orderNum, callback) {var _this5 = this;
      var appid = this.appid;

      if (appid) {
        return app.globalData.
        sjrequest1('/subTemplate/listPriTemplateId', {
          authorizerAppid: appid,
          sceneTypes: [1, 3, 7] }).

        then(function (res) {
          if (res.statusCode == 200 && res.data.code == 200) {
            return res.data.data;
          }
        }).
        then(function (tempids) {
          uni.requestSubscribeMessage({
            tmplIds: tempids,
            success: function success(res) {
              if (res[tempids[0]] === 'accept') {
                app.globalData.
                sjrequest1('/subscription/add', [
                {
                  marchantid: _this5.merchantId,
                  appid: _this5.appid,
                  templateid: tempids[0],
                  targetid: orderNum,
                  targettype: 6,
                  status: 1 },

                {
                  marchantid: _this5.merchantId,
                  appid: _this5.appid,
                  templateid: tempids[1],
                  targetid: _this5.activityId,
                  targettype: 2,
                  status: 1 },

                {
                  marchantid: _this5.merchantId,
                  appid: _this5.appid,
                  templateid: tempids[2],
                  targetid: _this5.activityId,
                  targettype: 2,
                  status: 1 }]).


                then(function (res) {
                  if (res.statusCode == 200 && res.data.code == 0) {
                    uni.showToast({
                      title: '订阅成功',
                      icon: 'none' });

                  }
                });
              }
            },
            complete: function complete(res) {
              callback();
            } });

        });
      }
    },

    countChange: function countChange(e) {
      //购买数量改变
      var buyCount = e.detail.value;
      var totalAmount = this.totalAmount;
      var livePrice = this.skuInfo.livePrice;
      totalAmount = buyCount * livePrice;
      totalAmount = totalAmount.toFixed(2);
      totalAmount = Number(totalAmount);
      this.setData({
        buyCount: buyCount,
        totalAmount: totalAmount });

    },

    computedTotalAmount: function computedTotalAmount(price, count) {
      //计算总金额
      var totalNum = price * count;
      totalNum = totalNum.toFixed(2);
      return Number(totalNum);
    },

    joinAddress: function joinAddress(shipping) {
      //拼接收货地址
      var provincesName = shipping.provincesName,cityName = shipping.cityName,areaName = shipping.areaName,address = shipping.address;
      return provincesName + cityName + areaName + address;
    },

    messageChange: function messageChange(e) {
      //输入留言
      var value = e.detail.value;
      this.setData({
        message: value });

    },

    onInput: function onInput() {
      console.log('占位：函数 onInput 未声明');
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 929:
/*!******************************************************************************************************************************!*\
  !*** D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuild/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./confirm-order.vue?vue&type=style&index=0&lang=css& */ 930);
/* harmony import */ var _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_confirm_order_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 930:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/products/xssj_New_basic_uni/pages/businessActivity/confirm-order/confirm-order.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[923,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/businessActivity/confirm-order/confirm-order.js.map