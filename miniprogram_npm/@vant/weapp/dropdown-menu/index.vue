<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
    <script module="computed" lang="wxs" src="./index.wxs"></script>

    <view class="van-dropdown-menu van-dropdown-menu--top-bottom">
        <view :data-index="index" :class="utils.bem('dropdown-menu__item', { disabled: item.disabled })" @tap="onTitleTap" v-for="(item, index) in itemListData" :key="index">
            <view
                :class="item.titleClass + ' ' + utils.bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') })"
                :style="item.showPopup ? 'color:' + activeColor : ''"
            >
                <view class="van-ellipsis">
                    {{ computed.displayTitle(item) }}
                </view>
            </view>
        </view>

        <slot />
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('../common/utils');

var ARRAY = [];
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-item',
        type: 'descendant',
        current: 'dropdown-menu',
        linked: function () {
            this.updateItemListData();
        },
        unlinked: function () {
            this.updateItemListData();
        }
    },
    props: {
        activeColor: {
            type: String,
            observer: 'updateChildrenData'
        },
        overlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData'
        },
        zIndex: {
            type: Number,
            value: 10
        },
        duration: {
            type: Number,
            value: 200,
            observer: 'updateChildrenData'
        },
        direction: {
            type: String,
            value: 'down',
            observer: 'updateChildrenData'
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData'
        },
        closeOnClickOutside: {
            type: Boolean,
            value: true
        }
    },
    data: {
        itemListData: []
    },
    beforeCreate: function () {
        var windowHeight = uni.getSystemInfoSync().windowHeight;
        this.windowHeight = windowHeight;
        ARRAY.push(this);
    },
    destroyed: function () {
        var that = this;
        ARRAY = ARRAY.filter(function (item) {
            return item !== that;
        });
    },
    methods: {
        updateItemListData: function () {
            this.setData({
                itemListData: this.children.map(function (child) {
                    return child.data;
                })
            });
        },
        updateChildrenData: function () {
            this.children.forEach(function (child) {
                child.updateDataFromParent();
            });
        },
        toggleItem: function (active) {
            this.children.forEach(function (item, index) {
                var showPopup = item.data.showPopup;

                if (index === active) {
                    item.toggle();
                } else if (showPopup) {
                    item.toggle(false, {
                        immediate: true
                    });
                }
            });
        },
        close: function () {
            this.children.forEach(function (child) {
                child.toggle(false, {
                    immediate: true
                });
            });
        },
        getChildWrapperStyle: function () {
            var that = this;
            var _a = this.data;
            var zIndex = _a.zIndex;
            var direction = _a.direction;
            return this.getRect('.van-dropdown-menu').then(function (rect) {
                var _a = rect.top;
                var top = _a === void 0 ? 0 : _a;
                var _b = rect.bottom;
                var bottom = _b === void 0 ? 0 : _b;
                var offset = direction === 'down' ? bottom : that.windowHeight - top;
                var wrapperStyle = 'z-index: ' + zIndex + ';';

                if (direction === 'down') {
                    wrapperStyle += 'top: ' + utils_1.addUnit(offset) + ';';
                } else {
                    wrapperStyle += 'bottom: ' + utils_1.addUnit(offset) + ';';
                }

                return wrapperStyle;
            });
        },
        onTitleTap: function (event) {
            var that = this;
            var index = event.currentTarget.dataset.index;
            var child = this.children[index];

            if (!child.data.disabled) {
                ARRAY.forEach(function (menuItem) {
                    if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== that) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-dropdown-menu {
    display: -webkit-flex;
    display: flex;
    -webkit-user-select: none;
    user-select: none;
    height: 50px;
    height: var(--dropdown-menu-height, 50px);
    background-color: #fff;
    background-color: var(--dropdown-menu-background-color, #fff);
}
.van-dropdown-menu__item {
    display: -webkit-flex;
    display: flex;
    -webkit-flex: 1;
    flex: 1;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-width: 0;
}
.van-dropdown-menu__item:active {
    opacity: 0.7;
}
.van-dropdown-menu__item--disabled:active {
    opacity: 1;
}
.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
    color: #969799;
    color: var(--dropdown-menu-title-disabled-text-color, #969799);
}
.van-dropdown-menu__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0 8px;
    padding: var(--dropdown-menu-title-padding, 0 8px);
    color: #323233;
    color: var(--dropdown-menu-title-text-color, #323233);
    font-size: 15px;
    font-size: var(--dropdown-menu-title-font-size, 15px);
    line-height: 18px;
    line-height: var(--dropdown-menu-title-line-height, 18px);
}
.van-dropdown-menu__title:after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border-color: transparent transparent currentcolor currentcolor;
    border-style: solid;
    border-width: 3px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: 0.8;
    content: '';
}
.van-dropdown-menu__title--active {
    color: #1989fa;
    color: var(--dropdown-menu-title-active-text-color, #1989fa);
}
.van-dropdown-menu__title--down:after {
    margin-top: -1px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
}
</style>
