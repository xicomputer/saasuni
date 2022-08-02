<template>
    <view>
        <van-cell center :title="title" :label="label" :border="border" :icon="icon" custom-class="van-switch-cell" :use-label-slot="useLabelSlot">
            <slot slot="icon" name="icon" />
            <slot slot="title" name="title" />
            <slot slot="label" name="label" />
            <van-switch
                :size="size"
                :checked="checked"
                :loading="loading"
                :disabled="disabled"
                :active-color="activeColor"
                :inactive-color="inactiveColor"
                :active-value="activeValue"
                :inactive-value="inactiveValue"
                custom-class="van-switch-cell__switch"
                @change="onChange"
            />
        </van-cell>
    </view>
</template>

<script>
import vanCell from '../cell/index';
import vanSwitch from '../switch/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    components: {
        vanCell,
        vanSwitch
    },
    field: true,
    props: {
        value: null,
        icon: String,
        title: String,
        label: String,
        border: Boolean,
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        useLabelSlot: Boolean,
        size: {
            type: String,
            default: '24px'
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
        onChange(event) {
            this.$emit('change', event.detail);
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-switch-cell {
    padding-top: 9px;
    padding-bottom: 9px;
}
.van-switch-cell__switch {
    vertical-align: middle;
}
</style>
