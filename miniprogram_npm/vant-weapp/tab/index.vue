<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view
        v-if="animated || inited"
        :class="'custom-class ' + utils.bem('tab__pane', { active, inactive: !active })"
        :style="(animated || active ? '' : 'display: none;') + ' ' + (width ? 'width:' + width + 'px;' : '')"
    >
        <slot />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
export default {
    data() {
        return {
            width: null,
            inited: false,
            active: false,
            animated: false
        };
    },
    relation: {
        name: 'tabs',
        type: 'ancestor'
    },
    props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String
    },
    watch: {
        title: {
            handler: 'update',
            immediate: true,
            deep: true
        },
        disabled: {
            handler: 'update',
            immediate: true,
            deep: true
        },
        dot: {
            handler: 'update',
            immediate: true,
            deep: true
        },
        info: {
            handler: 'update',
            immediate: true,
            deep: true
        },
        titleStyle: {
            handler: 'update',
            immediate: true,
            deep: true
        }
    },
    methods: {
        update() {
            const parent = this.getRelationNodes('../tabs/index')[0];

            if (parent) {
                parent.updateTabs();
            }
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-tab__pane {
    box-sizing: border-box;
    overflow-y: auto;
}
.van-tab__pane--active {
    height: auto;
}
.van-tab__pane--inactive {
    height: 0;
    overflow: visible;
}
</style>
