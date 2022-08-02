<template>
    <view>
        <van-transition
            :show="show"
            custom-class="van-overlay"
            :custom-style="'z-index: ' + zIndex + '; ' + (mask ? 'background-color: rgba(0, 0, 0, .7);' : '') + '; ' + customStyle"
            :duration="duration"
            @tap.native="onClick"
            @touchmove.native.stop.prevent="noop"
        />
    </view>
</template>

<script>
import vanTransition from '../transition/index';
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    components: {
        vanTransition
    },
    props: {
        show: Boolean,
        mask: Boolean,
        customStyle: String,
        duration: {
            type: [Number, Object],
            default: 300
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        },

        // for prevent touchmove
        noop() {}
    }
};
</script>
<style>
@import '../common/index.css';
.van-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
