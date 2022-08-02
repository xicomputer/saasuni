<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="utils.bem('search', { withaction: showAction || useActionSlot }) + ' custom-class'" :style="'background: ' + background">
        <view :class="utils.bem('search__content', [shape])">
            <view class="van-search__label" v-if="label">{{ label }}</view>
            <slot v-else name="label" />

            <van-field
                type="search"
                left-icon="search"
                :focus="focus"
                :error="error"
                :border="false"
                confirm-type="search"
                class="van-search__field field-class"
                :value="value"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                :maxlength="maxlength"
                :input-align="inputAlign"
                input-class="input-class"
                :placeholder="placeholder"
                :placeholder-style="placeholderStyle"
                custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
                @blur="onBlur"
                @focus="onFocus"
                @change="onChange"
                @confirm="onSearch"
                @clear="onClear"
            />
        </view>

        <view v-if="showAction || useActionSlot" class="van-search__action" hover-class="van-search__action--hover" hover-stay-time="70">
            <slot v-if="useActionSlot" name="action" />
            <view v-else @tap="onCancel" class="cancel-class">取消</view>
        </view>
    </view>
</template>

<script>
import vanField from '../field/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {
            value: ''
        };
    },
    components: {
        vanField
    },
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            default: '#ffffff'
        },
        maxlength: {
            type: Number,
            default: -1
        },
        shape: {
            type: String,
            default: 'square'
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onChange(event) {
            this.set({
                value: event.detail
            });
            this.$emit('change', event.detail);
        },

        onCancel() {
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * // https://github.com/youzan/vant-weapp/issues/1768
             */
            setTimeout(() => {
                this.set({
                    value: ''
                });
                this.$emit('cancel');
                this.$emit('change', '');
            }, 200);
        },

        onSearch() {
            this.$emit('search', this.value);
        },

        onFocus() {
            this.$emit('focus');
        },

        onBlur() {
            this.$emit('blur');
        },

        onClear() {
            this.$emit('clear');
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-search {
    padding: 10px 16px;
    -webkit-align-items: center;
    align-items: center;
    box-sizing: border-box;
}
.van-search,
.van-search__content {
    display: -webkit-flex;
    display: flex;
}
.van-search__content {
    padding-left: 10px;
    background-color: #f7f8fa;
    border-radius: 2px;
    -webkit-flex: 1;
    flex: 1;
}
.van-search__content--round {
    border-radius: 17px;
}
.van-search__label {
    padding: 0 5px;
    font-size: 14px;
    line-height: 34px;
    color: #333;
}
.van-search__field {
    -webkit-flex: 1;
    flex: 1;
}
.van-search__field__left-icon {
    color: #999;
}
.van-search--withaction {
    padding-right: 0;
}
.van-search__action {
    padding: 0 10px;
    font-size: 14px;
    line-height: 34px;
    color: #333;
}
.van-search__action--hover {
    background-color: #f2f3f5;
}
</style>
