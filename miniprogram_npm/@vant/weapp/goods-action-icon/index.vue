<template>
    <view>
        <van-button
            square
            :id="id"
            size="large"
            :lang="lang"
            :loading="loading"
            :disabled="disabled"
            :open-type="openType"
            :business-id="businessId"
            custom-class="van-goods-action-icon"
            :session-from="sessionFrom"
            :app-parameter="appParameter"
            :send-message-img="sendMessageImg"
            :send-message-path="sendMessagePath"
            :show-message-card="showMessageCard"
            :send-message-title="sendMessageTitle"
            @click="onClick($event, { tagId: id })"
            @error="bindError($event, { tagId: id })"
            @contact="bindContact($event, { tagId: id })"
            @opensetting="bindOpenSetting($event, { tagId: id })"
            @getuserinfo="bindGetUserInfo($event, { tagId: id })"
            @getphonenumber="bindGetPhoneNumber($event, { tagId: id })"
            @launchapp="bindLaunchApp($event, { tagId: id })"
        >
            <view class="van-goods-action-icon__content">
                <van-icon v-if="icon" size="20px" :name="icon" :dot="dot" :info="info" class="van-goods-action-icon__icon" custom-class="icon-class" />
                <slot name="icon" />
                <text class="text-class">{{ text }}</text>
            </view>
        </van-button>
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';
import vanButton from '../button/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var link_1 = require('../mixins/link');

var button_1 = require('../mixins/button');

var open_type_1 = require('../mixins/open-type');

component_1.VantComponent({
    classes: ['icon-class', 'text-class'],
    mixins: [link_1.link, button_1.button, open_type_1.openType],
    props: {
        text: String,
        dot: Boolean,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function (event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-goods-action-icon {
    border: none !important;
    width: 50px !important;
    width: var(--goods-action-icon-height, 50px) !important;
}
.van-goods-action-icon__content {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
    height: 100%;
    line-height: 1;
    font-size: 10px;
    font-size: var(--goods-action-icon-font-size, 10px);
    color: #646566;
    color: var(--goods-action-icon-text-color, #646566);
}
.van-goods-action-icon__icon {
    margin-bottom: 4px;
}
</style>
