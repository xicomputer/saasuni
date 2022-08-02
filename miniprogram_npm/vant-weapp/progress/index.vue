<template>
    <script module="getters" lang="wxs" src="./index.wxs"></script>

    <view class="van-progress custom-class">
        <view class="van-progress__portion" :style="'width: ' + percentage + '%; background: ' + (inactive ? '#cacaca' : color)">
            <view
                v-if="showPivot && getters.text(pivotText, percentage)"
                :style="'color: ' + textColor + '; background: ' + (pivotColor ? pivotColor : inactive ? '#cacaca' : color)"
                class="van-progress__pivot"
            >
                {{ getters.text(pivotText, percentage) }}
            </view>
        </view>
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
export default {
    data() {
        return {};
    },
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: BLUE
        },
        textColor: {
            type: String,
            default: '#fff'
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-progress {
    position: relative;
    height: 4px;
    background: #e5e5e5;
    border-radius: 4px;
}
.van-progress__portion {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: inherit;
}
.van-progress__pivot {
    position: absolute;
    top: 50%;
    right: 0;
    min-width: 2em;
    padding: 0 5px;
    font-size: 10px;
    line-height: 1.6;
    text-align: center;
    word-break: keep-all;
    background-color: #e5e5e5;
    border-radius: 1em;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    box-sizing: border-box;
}
</style>
