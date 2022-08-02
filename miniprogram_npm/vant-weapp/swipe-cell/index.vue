<template>
    <view
        class="van-swipe-cell"
        data-key="cell"
        @tap.stop.prevent="onClick"
        @touchstart="startDrag"
        @touchmove.stop.prevent="parseEventDynamicCode($event, catchMove ? 'noop' : '')"
        @touchmove.capture="onDrag"
        @touchend.stop.prevent="endDrag"
        @touchcancel.stop.prevent="endDrag"
    >
        <view :style="wrapperStyle">
            <view v-if="leftWidth" class="van-swipe-cell__left" data-key="left" @tap.stop.prevent="onClick">
                <slot name="left" />
            </view>
            <slot />
            <view v-if="rightWidth" class="van-swipe-cell__right" data-key="right" @tap.stop.prevent="onClick">
                <slot name="right" />
            </view>
        </view>
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
const THRESHOLD = 0.3;
export default {
    data() {
        return {
            catchMove: false,
            wrapperStyle: ''
        };
    },
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            default: 0
        },
        rightWidth: {
            type: Number,
            default: 0
        },
        asyncClose: Boolean
    },
    mixins: [touch],
    created() {
        this.offset = 0;
    },
    methods: {
        open(position) {
            const { leftWidth, rightWidth } = this;
            const offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
        },

        close() {
            this.swipeMove(0);
        },

        swipeMove(offset = 0) {
            this.offset = offset;
            const transform = `translate3d(${offset}px, 0, 0)`;
            const transition = this.draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.set({
                wrapperStyle: `
      -webkit-transform: ${transform};
      -webkit-transition: ${transition};
      transform: ${transform};
      transition: ${transition};
    `
            });
        },

        swipeLeaveTransition() {
            const { leftWidth, rightWidth } = this;
            const { offset } = this;

            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            } else {
                this.swipeMove(0);
            }

            this.set({
                catchMove: false
            });
        },

        startDrag(event) {
            if (this.disabled) {
                return;
            }

            this.draging = true;
            this.startOffset = this.offset;
            this.firstDirection = '';
            this.touchStart(event);
        },

        noop() {},

        onDrag(event) {
            if (this.disabled) {
                return;
            }

            this.touchMove(event);

            if (!this.firstDirection) {
                this.firstDirection = this.direction;
                this.set({
                    catchMove: this.firstDirection === 'horizontal'
                });
            }

            if (this.firstDirection === 'vertical') {
                return;
            }

            const { leftWidth, rightWidth } = this;
            const offset = this.startOffset + this.deltaX;

            if ((rightWidth > 0 && -offset > rightWidth) || (leftWidth > 0 && offset > leftWidth)) {
                return;
            }

            this.swipeMove(offset);
        },

        endDrag() {
            if (this.disabled) {
                return;
            }

            this.draging = false;
            this.swipeLeaveTransition();
        },

        onClick(event) {
            const { key: position = 'outside' } = event.currentTarget.dataset;
            this.$emit('click', position);

            if (!this.offset) {
                return;
            }

            if (this.asyncClose) {
                this.$emit('close', {
                    position,
                    instance: this
                });
            } else {
                this.swipeMove(0);
            }
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-swipe-cell {
    position: relative;
    overflow: hidden;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
    position: absolute;
    top: 0;
    height: 100%;
}
.van-swipe-cell__left {
    left: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
.van-swipe-cell__right {
    right: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}
</style>
