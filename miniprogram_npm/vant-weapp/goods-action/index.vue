<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="'custom-class ' + utils.bem('goods-action', { safe: isIPhoneX && safeAreaInsetBottom })">
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
    mixins: [safeArea()]
};
</script>
<style>
@import '../common/index.css';
.van-goods-action {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
}
.van-goods-action--safe {
    padding-bottom: 34px;
}
</style>
