<template>
    <view>
        <slot />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    field: true,
    relation: {
        name: 'checkbox',
        type: 'descendant',

        linked(target) {
            this.children = this.children || [];
            this.children.push(target);
            this.updateChild(target);
        },

        unlinked(target) {
            this.children = this.children.filter((child) => child !== target);
        }
    },
    props: {
        max: Number,
        value: {
            type: Array
        },
        disabled: {
            type: Boolean
        }
    },
    methods: {
        updateChildren() {
            (this.children || []).forEach((child) => this.updateChild(child));
        },

        updateChild(child) {
            const { value, disabled } = this;
            child.set({
                value: value.indexOf(child.data.name) !== -1,
                disabled: disabled || child.data.disabled
            });
        }
    },
    watch: {
        value: {
            handler: function () {
                (this.children || []).forEach((child) => this.updateChild(child));
            },

            immediate: true,
            deep: true
        },

        disabled: {
            handler: function () {
                (this.children || []).forEach((child) => this.updateChild(child));
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../common/index.css';
</style>
