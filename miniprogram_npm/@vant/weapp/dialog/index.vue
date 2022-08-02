<template>
    <view>
        <script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

        <van-popup
            :show="show"
            :z-index="zIndex"
            :overlay="overlay"
            :transition="transition"
            :custom-class="'van-dialog van-dialog--' + theme + ' ' + className"
            :custom-style="'width: ' + utils.addUnit(width) + ';' + customStyle"
            :overlay-style="overlayStyle"
            :close-on-click-overlay="closeOnClickOverlay"
            @close="onClickOverlay"
        >
            <view v-if="title || useTitleSlot" :class="utils.bem('dialog__header', { isolated: !(message || useSlot) })">
                <slot v-if="useTitleSlot" name="title" />
                <block v-else-if="title">{{ title }}</block>
            </view>

            <slot v-if="useSlot" />
            <view v-else-if="message" :class="utils.bem('dialog__message', [theme, messageAlign, { hasTitle: title }])">
                <text class="van-dialog__message-text">{{ message }}</text>
            </view>

            <van-goods-action v-if="theme === 'round-button'" custom-class="van-dialog__footer--round-button">
                <van-goods-action-button
                    v-if="showCancelButton"
                    size="large"
                    :loading="loading.cancel"
                    class="van-dialog__button van-hairline--right"
                    custom-class="van-dialog__cancel"
                    :custom-style="'color: ' + cancelButtonColor"
                    @click="onCancel"
                >
                    {{ cancelButtonText }}
                </van-goods-action-button>
                <van-goods-action-button
                    v-if="showConfirmButton"
                    size="large"
                    class="van-dialog__button"
                    :loading="loading.confirm"
                    custom-class="van-dialog__confirm"
                    :custom-style="'color: ' + confirmButtonColor"
                    :open-type="confirmButtonOpenType"
                    :lang="lang"
                    :business-id="businessId"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    @click="onConfirm"
                    @getuserinfo="bindGetUserInfo"
                    @contact="bindContact"
                    @getphonenumber="bindGetPhoneNumber"
                    @error="bindError"
                    @launchapp="bindLaunchApp"
                    @opensetting="bindOpenSetting"
                >
                    {{ confirmButtonText }}
                </van-goods-action-button>
            </van-goods-action>

            <view v-else class="van-hairline--top van-dialog__footer">
                <van-button
                    v-if="showCancelButton"
                    size="large"
                    :loading="loading.cancel"
                    class="van-dialog__button van-hairline--right"
                    custom-class="van-dialog__cancel"
                    :custom-style="'color: ' + cancelButtonColor"
                    @click="onCancel"
                >
                    {{ cancelButtonText }}
                </van-button>
                <van-button
                    v-if="showConfirmButton"
                    size="large"
                    class="van-dialog__button"
                    :loading="loading.confirm"
                    custom-class="van-dialog__confirm"
                    :custom-style="'color: ' + confirmButtonColor"
                    :open-type="confirmButtonOpenType"
                    :lang="lang"
                    :business-id="businessId"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    @click="onConfirm"
                    @getuserinfo="bindGetUserInfo"
                    @contact="bindContact"
                    @getphonenumber="bindGetPhoneNumber"
                    @error="bindError"
                    @launchapp="bindLaunchApp"
                    @opensetting="bindOpenSetting"
                >
                    {{ confirmButtonText }}
                </van-button>
            </view>
        </van-popup>
    </view>
</template>

<script>
'use strict';
import vanPopup from '../popup/index';
import vanButton from '../button/index';
import vanGoodsAction from '../goods-action//index';
import vanGoodsActionButton from '../goods-action-button/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

var open_type_1 = require('../mixins/open-type');

var color_1 = require('../common/color');

component_1.VantComponent({
    mixins: [button_1.button, open_type_1.openType],
    props: {
        show: {
            type: Boolean,
            observer: function (show) {
                if (!show) {
                    this.stopLoading();
                }
            }
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: 'default'
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2000
        },
        confirmButtonText: {
            type: String,
            value: '确认'
        },
        cancelButtonText: {
            type: String,
            value: '取消'
        },
        confirmButtonColor: {
            type: String,
            value: color_1.RED
        },
        cancelButtonColor: {
            type: String,
            value: color_1.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: true
        },
        overlay: {
            type: Boolean,
            value: true
        },
        transition: {
            type: String,
            value: 'scale'
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false
        }
    },
    methods: {
        onConfirm: function () {
            this.handleAction('confirm');
        },
        onCancel: function () {
            this.handleAction('cancel');
        },
        onClickOverlay: function () {
            this.onClose('overlay');
        },
        handleAction: function (action) {
            var _a;

            if (this.data.asyncClose) {
            }

            this.onClose(action);
        },
        close: function () {
            this.setData({
                show: false
            });
        },
        stopLoading: function () {
            this.setData({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },
        onClose: function (action) {
            if (!this.data.asyncClose) {
                this.close();
            }

            this.$emit('close', action); // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

            this.$emit(action, {
                dialog: this
            });
            var callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];

            if (callback) {
                callback(this);
            }
        }
    }
});
</script>
<style>
@import '../common/index.css';
.van-dialog {
    top: 45% !important;
    overflow: hidden;
    width: 320px;
    width: var(--dialog-width, 320px);
    font-size: 16px;
    font-size: var(--dialog-font-size, 16px);
    border-radius: 16px;
    border-radius: var(--dialog-border-radius, 16px);
    background-color: #fff;
    background-color: var(--dialog-background-color, #fff);
}
@media (max-width: 321px) {
    .van-dialog {
        width: 90%;
        width: var(--dialog-small-screen-width, 90%);
    }
}
.van-dialog__header {
    text-align: center;
    padding-top: 24px;
    padding-top: var(--dialog-header-padding-top, 24px);
    font-weight: 500;
    font-weight: var(--dialog-header-font-weight, 500);
    line-height: 24px;
    line-height: var(--dialog-header-line-height, 24px);
}
.van-dialog__header--isolated {
    padding: 24px 0;
    padding: var(--dialog-header-isolated-padding, 24px 0);
}
.van-dialog__message {
    overflow-y: auto;
    text-align: center;
    -webkit-overflow-scrolling: touch;
    font-size: 14px;
    font-size: var(--dialog-message-font-size, 14px);
    line-height: 20px;
    line-height: var(--dialog-message-line-height, 20px);
    max-height: 60vh;
    max-height: var(--dialog-message-max-height, 60vh);
    padding: 24px;
    padding: var(--dialog-message-padding, 24px);
}
.van-dialog__message-text {
    word-wrap: break-word;
}
.van-dialog__message--hasTitle {
    padding-top: 8px;
    padding-top: var(--dialog-has-title-message-padding-top, 8px);
    color: #646566;
    color: var(--dialog-has-title-message-text-color, #646566);
}
.van-dialog__message--round-button {
    padding-bottom: 16px;
    color: #323233;
}
.van-dialog__message--left {
    text-align: left;
}
.van-dialog__message--right {
    text-align: right;
}
.van-dialog__footer {
    display: -webkit-flex;
    display: flex;
}
.van-dialog__footer--round-button {
    position: relative !important;
    padding: 8px 24px 16px !important;
}
.van-dialog__button {
    -webkit-flex: 1;
    flex: 1;
}
.van-dialog__cancel,
.van-dialog__confirm {
    border: 0 !important;
}
.van-dialog-bounce-enter {
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
}
.van-dialog-bounce-leave-active {
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
    transform: translate3d(-50%, -50%, 0) scale(0.9);
    opacity: 0;
}
</style>
