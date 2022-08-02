
  !function(){try{var a=Function("return this")();a&&!a.Math&&(Object.assign(a,{isFinite:isFinite,Array:Array,Date:Date,Error:Error,Function:Function,Math:Math,Object:Object,RegExp:RegExp,String:String,TypeError:TypeError,setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval}),"undefined"!=typeof Reflect&&(a.Reflect=Reflect))}catch(a){}}();
  /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"common/runtime": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"common/runtime": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"pages/Component/dynamic/index":1,"pages/shopHome/components/componentsPage/shopCart/shopCart":1,"pages/Component/recommend/recommend":1,"pages/Component/videoList/index":1,"pages/shopHome/components/Article/Article":1,"pages/shopHome/components/Tabbar/tabbar":1,"pages/shopHome/components/ToCity/ToCity":1,"pages/shopHome/components/activity-product/activity-product":1,"pages/shopHome/components/activity/activity":1,"pages/shopHome/components/activity_v2/activity_v2":1,"pages/shopHome/components/addWeChat/addWeChat":1,"pages/shopHome/components/banner/banner":1,"pages/shopHome/components/category-pages/category-pages":1,"pages/shopHome/components/componentsPage/community/community":1,"pages/shopHome/components/componentsPage/member/member":1,"pages/shopHome/components/componentsPage/my/my":1,"pages/shopHome/components/coupon/coupon":1,"pages/shopHome/components/culture/culture":1,"pages/shopHome/components/goodsTypes/goodsTypes":1,"pages/shopHome/components/hotLive/hotLive":1,"pages/shopHome/components/hotVideo/hotVideo":1,"pages/shopHome/components/integral/integral":1,"pages/shopHome/components/notice/notice":1,"pages/shopHome/components/product/product":1,"pages/shopHome/components/recommend/recommend":1,"pages/shopHome/components/saleList/saleList":1,"pages/shopHome/components/search/search":1,"pages/shopHome/components/shopsSlogan/shopsSlogan":1,"pages/shopHome/components/signInHome/signInHome":1,"pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity":1,"pages/shopHome/components/tjfl-classify/tjfl-classify":1,"pages/shopHome/components/tomap/tomap":1,"pages/shopHome/components/union/union":1,"pages/Component/noData/index":1,"miniprogram_npm/video-swiper/miniprogram_dist/index":1,"pages/Component/storeClose/index":1,"pages/Index/components/category1/index":1,"pages/Index/components/category2/index":1,"pages/Index/components/category3/index":1,"pages/Index/components/category4/index":1,"pages/Index/components/category5/index":1,"pages/Index/components/category6/index":1,"pages/Index/components/category7/index":1,"pages/Index/components/dynamic/index":1,"pages/Index/components/hotel/index":1,"pages/Index/components/my/index":1,"pages/Index/components/navs-bong/navs-bong":1,"pages/Index/components/recommend/recommend":1,"pages/Index/components/retail/index":1,"pages/Index/components/videoList/index":1,"pages/Index/integral/components/integralTask/integralTask":1,"pages/Component/toBottom/index":1,"pages/smallShop/myShop/components/navs-bong/navs-bong":1,"pages/smallShop/components/canvas_synthetic/canvas_synthetic":1,"pages/videoPlay/components/scroll-video":1,"pages/Component/auth-get-info/auth-get-info":1,"pages/businessActivity/components/countdown/countdown":1,"pages/Component/add-subtract-num/add-subtract-num":1,"pages/group_booking/components/canvas_synthetic/canvas_synthetic":1,"pages/seckill/components/canvas_synthetic/canvas_synthetic":1,"pages/Component/hotel/index":1,"pages/shopHome/components/view-more-title/view-more-title":1,"pages/videoPlay/components/video-button-bar":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({"pages/Component/dynamic/index":"pages/Component/dynamic/index","pages/shopHome/components/componentsPage/shopCart/shopCart":"pages/shopHome/components/componentsPage/shopCart/shopCart","pages/Component/recommend/recommend":"pages/Component/recommend/recommend","pages/Component/videoList/index":"pages/Component/videoList/index","pages/shopHome/components/Article/Article":"pages/shopHome/components/Article/Article","pages/shopHome/components/Tabbar/tabbar":"pages/shopHome/components/Tabbar/tabbar","pages/shopHome/components/ToCity/ToCity":"pages/shopHome/components/ToCity/ToCity","pages/shopHome/components/activity-product/activity-product":"pages/shopHome/components/activity-product/activity-product","pages/shopHome/components/activity/activity":"pages/shopHome/components/activity/activity","pages/shopHome/components/activity_v2/activity_v2":"pages/shopHome/components/activity_v2/activity_v2","pages/shopHome/components/addWeChat/addWeChat":"pages/shopHome/components/addWeChat/addWeChat","pages/shopHome/components/banner/banner":"pages/shopHome/components/banner/banner","pages/shopHome/components/category-pages/category-pages":"pages/shopHome/components/category-pages/category-pages","pages/shopHome/components/componentsPage/community/community":"pages/shopHome/components/componentsPage/community/community","pages/shopHome/components/componentsPage/member/member":"pages/shopHome/components/componentsPage/member/member","pages/shopHome/components/componentsPage/my/my":"pages/shopHome/components/componentsPage/my/my","pages/shopHome/components/coupon/coupon":"pages/shopHome/components/coupon/coupon","pages/shopHome/components/culture/culture":"pages/shopHome/components/culture/culture","pages/shopHome/components/goodsTypes/goodsTypes":"pages/shopHome/components/goodsTypes/goodsTypes","pages/shopHome/components/hotLive/hotLive":"pages/shopHome/components/hotLive/hotLive","pages/shopHome/components/hotVideo/hotVideo":"pages/shopHome/components/hotVideo/hotVideo","pages/shopHome/components/integral/integral":"pages/shopHome/components/integral/integral","pages/shopHome/components/notice/notice":"pages/shopHome/components/notice/notice","pages/shopHome/components/product/product":"pages/shopHome/components/product/product","pages/shopHome/components/recommend/recommend":"pages/shopHome/components/recommend/recommend","pages/shopHome/components/saleList/saleList":"pages/shopHome/components/saleList/saleList","pages/shopHome/components/search/search":"pages/shopHome/components/search/search","pages/shopHome/components/shopsSlogan/shopsSlogan":"pages/shopHome/components/shopsSlogan/shopsSlogan","pages/shopHome/components/signInHome/signInHome":"pages/shopHome/components/signInHome/signInHome","pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity":"pages/shopHome/components/tj-tg-ms-activity/tj-tg-ms-activity","pages/shopHome/components/tjfl-classify/tjfl-classify":"pages/shopHome/components/tjfl-classify/tjfl-classify","pages/shopHome/components/tomap/tomap":"pages/shopHome/components/tomap/tomap","pages/shopHome/components/union/union":"pages/shopHome/components/union/union","pages/Component/noData/index":"pages/Component/noData/index","miniprogram_npm/video-swiper/miniprogram_dist/index":"miniprogram_npm/video-swiper/miniprogram_dist/index","pages/Component/storeClose/index":"pages/Component/storeClose/index","pages/Index/components/category1/index":"pages/Index/components/category1/index","pages/Index/components/category2/index":"pages/Index/components/category2/index","pages/Index/components/category3/index":"pages/Index/components/category3/index","pages/Index/components/category4/index":"pages/Index/components/category4/index","pages/Index/components/category5/index":"pages/Index/components/category5/index","pages/Index/components/category6/index":"pages/Index/components/category6/index","pages/Index/components/category7/index":"pages/Index/components/category7/index","pages/Index/components/dynamic/index":"pages/Index/components/dynamic/index","pages/Index/components/hotel/index":"pages/Index/components/hotel/index","pages/Index/components/my/index":"pages/Index/components/my/index","pages/Index/components/navs-bong/navs-bong":"pages/Index/components/navs-bong/navs-bong","pages/Index/components/recommend/recommend":"pages/Index/components/recommend/recommend","pages/Index/components/retail/index":"pages/Index/components/retail/index","pages/Index/components/videoList/index":"pages/Index/components/videoList/index","pages/Index/integral/components/integralTask/integralTask":"pages/Index/integral/components/integralTask/integralTask","pages/Component/toBottom/index":"pages/Component/toBottom/index","pages/smallShop/myShop/components/navs-bong/navs-bong":"pages/smallShop/myShop/components/navs-bong/navs-bong","pages/smallShop/components/canvas_synthetic/canvas_synthetic":"pages/smallShop/components/canvas_synthetic/canvas_synthetic","pages/videoPlay/components/scroll-video":"pages/videoPlay/components/scroll-video","pages/Component/auth-get-info/auth-get-info":"pages/Component/auth-get-info/auth-get-info","pages/businessActivity/components/countdown/countdown":"pages/businessActivity/components/countdown/countdown","pages/Component/add-subtract-num/add-subtract-num":"pages/Component/add-subtract-num/add-subtract-num","pages/group_booking/components/canvas_synthetic/canvas_synthetic":"pages/group_booking/components/canvas_synthetic/canvas_synthetic","pages/seckill/components/canvas_synthetic/canvas_synthetic":"pages/seckill/components/canvas_synthetic/canvas_synthetic","pages/Component/hotel/index":"pages/Component/hotel/index","pages/shopHome/components/view-more-title/view-more-title":"pages/shopHome/components/view-more-title/view-more-title","pages/videoPlay/components/video-button-bar":"pages/videoPlay/components/video-button-bar"}[chunkId]||chunkId) + ".wxss";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// run deferred modules from other chunks
/******/ 	checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/runtime.js.map
  