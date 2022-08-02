<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view
        :class="'custom-class ' + (border ? 'van-hairline--top-bottom' : '') + ' ' + utils.bem('tabbar', { fixed, safe: isIPhoneX && safeAreaInsetBottom })"
        :style="zIndex ? 'z-index: ' + zIndex : ''"
    >
        <slot />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
export default {
    data() {
        return {
            isIPhoneX: '',
            safeAreaInsetBottom: ''
        };
    },
    mixins: [safeArea()],
    relation: {
        name: 'tabbar-item',
        type: 'descendant',

        linked(target) {
            this.children.push(target);
            target.parent = this;
            target.updateFromParent();
        },

        unlinked(target) {
            this.children = this.children.filter((item) => item !== target);
            this.updateChildren();
        }
    },
    props: {
        active: {
            type: [Number, String]
        },
        activeColor: {
            type: String
        },
        inactiveColor: {
            type: String
        },
        fixed: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },
    beforeCreate() {
        this.children = [];
    },
    methods: {
        updateChildren() {
            const { children } = this;

            if (!Array.isArray(children) || !children.length) {
                return Promise.resolve();
            }

            return Promise.all(children.map((child) => child.updateFromParent()));
        },

        onChange(child) {
            const index = this.children.indexOf(child);
            const active = child.data.name || index;

            if (active !== this.active) {
                this.$emit('change', active);
            }
        }
    },
    watch: {
        active: {
            handler: function () {
                const { children } = this;

                if (!Array.isArray(children) || !children.length) {
                    return Promise.resolve();
                }

                return Promise.all(children.map((child) => child.updateFromParent()));
            },

            immediate: true
        },

        activeColor: {
            handler: function () {
                const { children } = this;

                if (!Array.isArray(children) || !children.length) {
                    return Promise.resolve();
                }

                return Promise.all(children.map((child) => child.updateFromParent()));
            },

            immediate: true
        },

        inactiveColor: {
            handler: function () {
                const { children } = this;

                if (!Array.isArray(children) || !children.length) {
                    return Promise.resolve();
                }

                return Promise.all(children.map((child) => child.updateFromParent()));
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-tabbar {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #fff;
}
.van-tabbar--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
}
.van-tabbar--safe {
    padding-bottom: 34px;
}
</style>
