<template>
    <view :class="'custom-class van-collapse ' + (border ? 'van-hairline--top-bottom' : '')">
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
    relation: {
        name: 'collapse-item',
        type: 'descendant',
        current: 'collapse'
    },
    props: {
        value: {
            type: null,
            observer: 'updateExpanded'
        },
        accordion: {
            type: Boolean,
            observer: 'updateExpanded'
        },
        border: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        updateExpanded: function () {
            this.children.forEach(function (child) {
                child.updateExpanded();
            });
        },
        switch: function (name, expanded) {
            var _a = this.data;
            var accordion = _a.accordion;
            var value = _a.value;
            var changeItem = name;

            if (!accordion) {
                if (expanded) {
                    name = (value || []).concat(name);
                } else {
                    name = (value || []).filter(function (activeName) {
                        return activeName !== name;
                    });
                }
            } else {
                if (expanded) {
                    name = name;
                } else {
                    name = '';
                }
            }

            if (expanded) {
                this.$emit('open', changeItem);
            } else {
                this.$emit('close', changeItem);
            }

            this.$emit('change', name);
            this.$emit('input', name);
        }
    }
});
</script>
<style>
@import '../common/index.css';
</style>
