<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="'custom-class ' + utils.bem('tab__pane', { active, inactive: !active })" :style="shouldShow ? '' : 'display: none;'">
        <slot v-if="shouldRender" />
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
        name: 'tabs',
        type: 'ancestor',
        current: 'tab'
    },
    props: {
        dot: {
            type: Boolean,
            observer: 'update'
        },
        info: {
            type: null,
            observer: 'update'
        },
        title: {
            type: String,
            observer: 'update'
        },
        disabled: {
            type: Boolean,
            observer: 'update'
        },
        titleStyle: {
            type: String,
            observer: 'update'
        },
        name: {
            type: [Number, String],
            value: ''
        }
    },
    data: {
        active: false
    },
    methods: {
        getComputedName: function () {
            if (this.data.name !== '') {
                return this.data.name;
            }

            return this.index;
        },
        updateRender: function (active, parent) {
            var parentData = parent.data;
            this.inited = this.inited || active;
            this.setData({
                active: active,
                shouldRender: this.inited || !parentData.lazyRender,
                shouldShow: active || parentData.animated
            });
        },
        update: function () {
            if (this.parent) {
                this.parent.updateTabs();
            }
        }
    }
});
</script>
<style>
@import '../common/index.css';
:host {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    width: 100%;
}
.van-tab__pane,
:host {
    box-sizing: border-box;
}
.van-tab__pane {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.van-tab__pane--active {
    height: auto;
}
.van-tab__pane--inactive {
    height: 0;
    overflow: visible;
}
</style>
