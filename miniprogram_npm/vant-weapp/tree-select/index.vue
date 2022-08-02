<template>
    <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
    <script module="wxs" lang="wxs" src="./index.wxs"></script>

    <view class="van-tree-select" :style="'height: ' + mainHeight + 'px'">
        <scroll-view scroll-y class="van-tree-select__nav">
            <view
                :class="
                    'van-ellipsis main-item-class ' +
                    utils.bem('tree-select__nitem', { active: mainActiveIndex === index, disabled: item.disabled }) +
                    ' ' +
                    (mainActiveIndex === index ? 'main-active-class' : '') +
                    ' ' +
                    (item.disabled ? 'main-disabled-class' : '')
                "
                :data-index="index"
                @tap="onClickNav"
                v-for="(item, index) in items"
                :key="index"
            >
                {{ item.text }}
            </view>
        </scroll-view>
        <scroll-view scroll-y class="van-tree-select__content" :style="'height: ' + itemHeight + 'px'">
            <view
                :class="
                    'van-ellipsis van-hairline--bottom content-item-class ' +
                    utils.bem('tree-select__item', { active: wxs.isActive(activeId, item.id), disabled: item.disabled }) +
                    ' ' +
                    (wxs.isActive(activeId, item.id) ? 'content-active-class' : '') +
                    ' ' +
                    (item.disabled ? 'content-disabled-class' : '')
                "
                :data-item="item"
                @tap="onSelectItem"
                v-for="(item, index) in subItems"
                :key="item.id"
            >
                {{ item.text }}

                <van-icon v-if="wxs.isActive(activeId, item.id)" name="checked" size="16px" class="van-tree-select__selected" />
            </view>
        </scroll-view>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import { VantComponent } from '../common/component';
const ITEM_HEIGHT = 44;
export default {
    components: {
        vanIcon
    },
    data() {
        return {
            subItems: [],
            mainHeight: 0,
            itemHeight: 0
        };
    },
    classes: ['main-item-class', 'content-item-class', 'main-active-class', 'content-active-class', 'main-disabled-class', 'content-disabled-class'],
    props: {
        items: Array,
        mainActiveIndex: {
            type: Number,
            default: 0
        },
        activeId: {
            type: [Number, String, Array]
        },
        maxHeight: {
            type: Number,
            default: 300
        }
    },
    watch: {
        items: {
            handler: function () {
                this.updateSubItems().then(() => {
                    this.updateMainHeight();
                });
            },

            immediate: true,
            deep: true
        },

        maxHeight: {
            handler: function () {
                this.updateItemHeight(this.subItems);
                this.updateMainHeight();
            },

            immediate: true,
            deep: true
        },

        mainActiveIndex: {
            handler: 'updateSubItems',
            immediate: true,
            deep: true
        }
    },
    methods: {
        // 当一个子项被选择时
        onSelectItem(event) {
            const { item } = event.currentTarget.dataset;

            if (!item.disabled) {
                this.$emit('click-item', item);
            }
        },

        // 当一个导航被点击时
        onClickNav(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.items[index];

            if (!item.disabled) {
                this.$emit('click-nav', {
                    index
                });
            }
        },

        // 更新子项列表
        updateSubItems() {
            const { items, mainActiveIndex } = this;
            const { children = [] } = items[mainActiveIndex] || {};
            this.updateItemHeight(children);
            return this.set({
                subItems: children
            });
        },

        // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
        updateMainHeight() {
            const { items = [], subItems = [] } = this;
            const maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
            this.set({
                mainHeight: Math.min(maxHeight, this.maxHeight)
            });
        },

        // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
        updateItemHeight(subItems) {
            const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.maxHeight);
            return this.set({
                itemHeight
            });
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-tree-select {
    position: relative;
    font-size: 14px;
    -webkit-user-select: none;
    user-select: none;
}
.van-tree-select__nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 35%;
    min-width: 120px;
    background-color: #fafafa;
}
.van-tree-select__nitem {
    position: relative;
    padding: 0 9px 0 15px;
    line-height: 44px;
}
.van-tree-select__nitem--active:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3.6px;
    background-color: #f44;
    content: '';
}
.van-tree-select__nitem--active {
    font-weight: 700;
    background-color: #fff;
}
.van-tree-select__nitem--disabled {
    color: #999;
}
.van-tree-select__content {
    width: 65%;
    padding-left: 15px;
    margin-left: 35%;
    background-color: #fff;
    box-sizing: border-box;
}
.van-tree-select__item {
    position: relative;
    font-weight: 700;
    line-height: 44px;
}
.van-tree-select__item--active {
    color: #f44;
}
.van-tree-select__item--disabled {
    color: #999;
}
.van-tree-select__selected {
    position: absolute;
    top: 0;
    right: 15px;
    bottom: 0;
    height: 24px;
    margin: auto 0;
    line-height: 24px;
}
</style>
