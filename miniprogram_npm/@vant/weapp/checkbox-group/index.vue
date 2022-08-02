<template>
    <view>
        <slot />
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox',
        type: 'descendant',
        current: 'checkbox-group',
        linked: function (target) {
            this.updateChild(target);
        }
    },
    props: {
        max: Number,
        value: {
            type: Array,
            observer: 'updateChildren'
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren'
        }
    },
    methods: {
        updateChildren: function () {
            var that = this;
            (this.children || []).forEach(function (child) {
                return that.updateChild(child);
            });
        },
        updateChild: function (child) {
            var _a = this.data;
            var value = _a.value;
            var disabled = _a.disabled;
            child.setData({
                value: value.indexOf(child.data.name) !== -1,
                parentDisabled: disabled
            });
        }
    }
});
</script>
<style>
@import '../common/index.css';
</style>
