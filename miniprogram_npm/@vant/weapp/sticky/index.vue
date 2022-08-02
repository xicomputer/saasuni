<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
    <script module="computed" lang="wxs" src="./index.wxs"></script>

    <view class="custom-class van-sticky" :style="computed.containerStyle({ fixed, height, zIndex })">
        <view :class="utils.bem('sticky-wrap', { fixed })" :style="computed.wrapStyle({ fixed, offsetTop, transform, zIndex })">
            <slot />
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var page_scroll_1 = require('../mixins/page-scroll');

var ROOT_ELEMENT = '.van-sticky';
component_1.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: 'onScroll'
        },
        disabled: {
            type: Boolean,
            observer: 'onScroll'
        },
        container: {
            type: null,
            observer: 'onScroll'
        },
        scrollTop: {
            type: null,
            observer: function (val) {
                this.onScroll({
                    scrollTop: val
                });
            }
        }
    },
    mixins: [
        page_scroll_1.pageScrollMixin(function (event) {
            if (this.data.scrollTop != null) {
                return;
            }

            this.onScroll(event);
        })
    ],
    data: {
        height: 0,
        fixed: false,
        transform: 0
    },
    mounted: function () {
        this.onScroll();
    },
    methods: {
        onScroll: function (_a) {
            var that = this;
            var scrollTop = (_a === void 0 ? {} : _a).scrollTop;
            var _b = this.data;
            var container = _b.container;
            var offsetTop = _b.offsetTop;
            var disabled = _b.disabled;
            if (disabled) {
                this.setDataAfterDiff({
                    fixed: false,
                    transform: 0
                });
                return;
            }

            this.scrollTop = scrollTop || this.scrollTop;

            if (typeof container === 'function') {
                Promise.all([this.getRect(ROOT_ELEMENT), this.getContainerRect()]).then(function (_a) {
                    var root = _a[0];
                    var container = _a[1];
                    if (offsetTop + root.height > container.height + container.top) {
                        that.setDataAfterDiff({
                            fixed: false,
                            transform: container.height - root.height
                        });
                    } else if (offsetTop >= root.top) {
                        that.setDataAfterDiff({
                            fixed: true,
                            height: root.height,
                            transform: 0
                        });
                    } else {
                        that.setDataAfterDiff({
                            fixed: false,
                            transform: 0
                        });
                    }
                });
                return;
            }

            this.getRect(ROOT_ELEMENT).then(function (root) {
                if (offsetTop >= root.top) {
                    that.setDataAfterDiff({
                        fixed: true,
                        height: root.height
                    });
                    that.transform = 0;
                } else {
                    that.setDataAfterDiff({
                        fixed: false
                    });
                }
            });
        },
        setDataAfterDiff: function (data) {
            var that = this;
            uni.nextTick(function () {
                var diff = Object.keys(data).reduce(function (prev, key) {
                    if (data[key] !== that.data[key]) {
                        prev[key] = data[key];
                    }

                    return prev;
                }, {});
                that.setData(diff);
                that.$emit('scroll', {
                    scrollTop: that.scrollTop,
                    isFixed: data.fixed || that.data.fixed
                });
            });
        },
        getContainerRect: function () {
            var nodesRef = this.data.container();
            return new Promise(function (resolve) {
                return nodesRef.boundingClientRect(resolve).exec();
            });
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-sticky {
    position: relative;
}
.van-sticky-wrap--fixed {
    position: fixed;
    right: 0;
    left: 0;
}
</style>
