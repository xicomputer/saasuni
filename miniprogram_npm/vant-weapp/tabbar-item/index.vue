<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

    <view :class="utils.bem('tabbar-item', { active }) + ' custom-class'" :style="'color: ' + (active ? activeColor : inactiveColor)" @tap="onClick">
        <view :class="utils.bem('tabbar-item__icon', { dot })">
            <van-icon v-if="icon" :name="icon" customStyle="display: block" />
            <block v-else>
                <slot v-if="active" name="icon-active" />
                <slot v-else name="icon" />
            </block>
            <van-info v-if="info !== null" :info="info" custom-style="margin-top: 2px" />
        </view>
        <view class="van-tabbar-item__text">
            <slot />
        </view>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import vanInfo from '../info/index';
import { VantComponent } from '../common/component';
export default {
    components: {
        vanIcon,
        vanInfo
    },
    data() {
        return {
            active: false,
            activeColor: '',
            inactiveColor: ''
        };
    },
    props: {
        info: null,
        icon: String,
        dot: Boolean,
        name: {
            type: [String, Number]
        }
    },
    relation: {
        name: 'tabbar',
        type: 'ancestor'
    },
    methods: {
        onClick() {
            if (this.parent) {
                this.parent.onChange(this);
            }

            this.$emit('click');
        },

        updateFromParent() {
            const { parent } = this;

            if (!parent) {
                return;
            }

            const index = parent.children.indexOf(this);
            const parentData = parent.data;
            const { data } = this;
            const active = (data.name || index) === parentData.active;
            const patch = {};

            if (active !== data.active) {
                patch.active = active;
            }

            if (parentData.activeColor !== data.activeColor) {
                patch.activeColor = parentData.activeColor;
            }

            if (parentData.inactiveColor !== data.inactiveColor) {
                patch.inactiveColor = parentData.inactiveColor;
            }

            return Object.keys(patch).length > 0 ? this.set(patch) : Promise.resolve();
        }
    }
};
</script>
<style>
@import '../common/index.css';
:host {
    -webkit-flex: 1;
    flex: 1;
}
.van-tabbar-item {
    color: #7d7e80;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    line-height: 1;
    font-size: 12px;
    -webkit-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
}
.van-tabbar-item__icon {
    font-size: 18px;
    margin-bottom: 5px;
    position: relative;
}
.van-tabbar-item__icon--dot:after {
    top: 0;
    right: -8px;
    width: 8px;
    height: 8px;
    content: ' ';
    position: absolute;
    border-radius: 100%;
    background-color: #f44;
}
.van-tabbar-item__icon image {
    width: 30px;
    height: 18px;
    display: block;
}
.van-tabbar-item--active {
    color: #1989fa;
}
</style>
