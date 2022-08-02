<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view
        :class="'custom-class ' + utils.bem('switch', { on: value === activeValue, disabled })"
        :style="'font-size: ' + size + '; ' + ((checked ? activeColor : inactiveColor) ? 'background-color: ' + (checked ? activeColor : inactiveColor) : '')"
        @tap="onClick"
    >
        <view class="van-switch__node node-class">
            <van-loading v-if="loading" size="50%" custom-class="van-switch__loading" />
        </view>
    </view>
</template>

<script>
import vanLoading from '../loading/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {
            value: ''
        };
    },
    components: {
        vanLoading
    },
    field: true,
    classes: ['node-class'],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            default: '30px'
        },
        activeValue: {
            type: null,
            default: true
        },
        inactiveValue: {
            type: null,
            default: false
        }
    },
    watch: {
        checked: {
            handler: function (value) {
                this.set({
                    value
                });
            },

            immediate: true,
            deep: true
        }
    },
    created() {
        this.set({
            value: this.checked
        });
    },
    methods: {
        onClick() {
            const { activeValue, inactiveValue } = this;

            if (!this.disabled && !this.loading) {
                const checked = this.checked === activeValue;
                const value = checked ? inactiveValue : activeValue;
                this.$emit('input', value);
                this.$emit('change', value);
            }
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-switch {
    display: inline-block;
    position: relative;
    width: 2em;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    box-sizing: initial;
    transition: background-color 0.3s;
}
.van-switch,
.van-switch__node {
    height: 1em;
    background-color: #fff;
}
.van-switch__node {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 100%;
    width: 1em;
    z-index: 1;
    transition: 0.3s;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
}
.van-switch__loading {
    top: 25%;
    left: 25%;
    position: absolute !important;
}
.van-switch--on {
    background-color: #1989fa;
}
.van-switch--on .van-switch__node {
    -webkit-transform: translateX(1em);
    transform: translateX(1em);
}
.van-switch--disabled {
    opacity: 0.4;
}
</style>
