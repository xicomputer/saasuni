<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
    <script module="computed" lang="wxs" src="./options.wxs"></script>

    <view :class="utils.bem('share-sheet__options', { border: showBorder })">
        <view class="van-share-sheet__option" :data-index="index" @tap="onSelect" v-for="(item, index) in options" :key="index">
            <image :src="computed.getIconURL(item.icon)" class="van-share-sheet__icon" />

            <view v-if="item.name" class="van-share-sheet__name">{{ item.name }}</view>

            <view v-if="item.description" class="van-share-sheet__option-description">
                {{ item.description }}
            </view>
        </view>
    </view>
</template>

<script>
'use strict';

var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];

                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) {
                            t[p] = s[p];
                        }
                    }
                }

                return t;
            };

        return __assign.apply(this, arguments);
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    props: {
        options: Array,
        showBorder: Boolean
    },
    methods: {
        onSelect: function (event) {
            var index = event.currentTarget.dataset.index;
            var option = this.data.options[index];
            this.$emit(
                'select',
                __assign(__assign({}, option), {
                    index: index
                })
            );
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-share-sheet__options {
    position: relative;
    display: -webkit-flex;
    display: flex;
    padding: 16px 0 16px 8px;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
}
.van-share-sheet__options--border:before {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: 0;
    right: 0;
    left: 16px;
    border-top: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.van-share-sheet__options::-webkit-scrollbar {
    height: 0;
}
.van-share-sheet__option {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-user-select: none;
    user-select: none;
}
.van-share-sheet__option:active {
    opacity: 0.7;
}
.van-share-sheet__icon {
    width: 48px;
    height: 48px;
    margin: 0 16px;
}
.van-share-sheet__name {
    margin-top: 8px;
    padding: 0 4px;
    color: #646566;
    font-size: 12px;
}
.van-share-sheet__option-description {
    padding: 0 4px;
    color: #c8c9cc;
    font-size: 12px;
}
</style>
