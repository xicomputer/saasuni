<template>
    <view>
        <view v-if="title" class="van-cell-group__title">
            {{ title }}
        </view>
        <view :class="'custom-class van-cell-group ' + (border ? 'van-hairline--top-bottom' : '')">
            <slot />
        </view>
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    props: {
        title: String,
        border: {
            type: Boolean,
            default: true
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-cell-group__title {
    font-size: 14px;
    padding: 15px 15px 5px;
    color: #999;
    line-height: 16px;
}
</style>
