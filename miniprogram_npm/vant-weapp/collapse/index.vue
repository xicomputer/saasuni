<template>
    <view :class="'custom-class van-collapse ' + (border ? 'van-hairline--top-bottom' : '')">
        <slot />
    </view>
</template>

<script>
import { VantComponent } from '../common/component';
export default {
    data() {
        return {};
    },
    relation: {
        name: 'collapse-item',
        type: 'descendant',

        linked(child) {
            this.children.push(child);
        },

        unlinked(child) {
            this.children = this.children.filter((item) => item !== child);
        }
    },
    props: {
        value: {
            type: null
        },
        accordion: {
            type: Boolean
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    beforeCreate() {
        this.children = [];
    },
    methods: {
        updateExpanded() {
            this.children.forEach((child) => {
                child.updateExpanded();
            });
        },

        switchFun(name, expanded) {
            const { accordion, value } = this;

            if (!accordion) {
                if (expanded) {
                    name = (value || []).concat(name);
                } else {
                    name = (value || []).filter((activeName) => activeName !== name);
                }
            } else {
                if (expanded) {
                    name = name;
                } else {
                    name = '';
                }
            }

            this.$emit('change', name);
            this.$emit('input', name);
        }
    },
    watch: {
        value: {
            handler: function () {
                this.children.forEach((child) => {
                    child.updateExpanded();
                });
            },

            immediate: true
        },

        accordion: {
            handler: function () {
                this.children.forEach((child) => {
                    child.updateExpanded();
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import '../common/index.css';
</style>
