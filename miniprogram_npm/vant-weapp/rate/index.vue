<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view class="van-rate custom-class" @touchmove="onTouchMove">
        <view class="van-rate__item" :style="'font-size: ' + size + 'px;'" v-for="(item, index) in count" :key="index">
            <van-icon
                :name="index + 1 <= innerValue ? icon : voidIcon"
                class="van-rate__icon"
                custom-class="icon-class"
                :data-score="index"
                :color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor"
                @click="onSelect($event, { score: index })"
            />

            <van-icon
                v-if="allowHalf"
                :name="index + 0.5 <= innerValue ? icon : voidIcon"
                :class="utils.bem('rate__icon', ['half'])"
                custom-class="icon-class"
                :data-score="index - 0.5"
                :color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
                @click="onSelect($event, { score: index - 0.5 })"
            />
        </view>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
export default {
    components: {
        vanIcon
    },
    data() {
        return {
            innerValue: 0
        };
    },
    field: true,
    classes: ['icon-class'],
    props: {
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
            type: Number,
            default: 20
        },
        icon: {
            type: String,
            default: 'star'
        },
        voidIcon: {
            type: String,
            default: 'star-o'
        },
        color: {
            type: String,
            default: '#ffd21e'
        },
        voidColor: {
            type: String,
            default: '#c7c7c7'
        },
        disabledColor: {
            type: String,
            default: '#bdbdbd'
        },
        count: {
            type: Number,
            default: 5
        }
    },
    watch: {
        value: {
            handler: function (value) {
                if (value !== this.innerValue) {
                    this.set({
                        innerValue: value
                    });
                }
            },

            immediate: true,
            deep: true
        }
    },
    methods: {
        onSelect(event, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---处理dataset end--- */
            const { data } = this;
            const { score } = event.currentTarget.dataset;

            if (!data.disabled && !data.readonly) {
                this.set({
                    innerValue: score + 1
                });
                this.$emit('input', score + 1);
                this.$emit('change', score + 1);
            }
        },

        onTouchMove(event) {
            const { clientX, clientY } = event.touches[0];
            this.getRect('.van-rate__icon', true).then((list) => {
                const target = list
                    .sort((item) => item.right - item.left)
                    .find((item) => clientX >= item.left && clientX <= item.right && clientY >= item.top && clientY <= item.bottom);

                if (target != null) {
                    this.onSelect(
                        Object.assign({}, event, {
                            currentTarget: target
                        })
                    );
                }
            });
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-rate {
    -webkit-user-select: none;
    user-select: none;
}
.van-rate__item {
    position: relative;
    display: inline-block;
    padding: 0 2px;
}
.van-rate__icon {
    display: block;
    height: 1em;
}
.van-rate__icon--half {
    position: absolute;
    top: 0;
    left: 2px;
    width: 0.5em;
    overflow: hidden;
}
</style>
