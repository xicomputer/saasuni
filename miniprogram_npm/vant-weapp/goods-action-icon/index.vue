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
            <view class="van-goods-action-icon__content van-hairline--right">
                <van-icon size="20px" :name="icon" :info="info" class="van-goods-action-icon__icon" custom-class="icon-class" />
                <text class="text-class">{{ text }}</text>
            </view>
        </van-button>
    </view>
</template>

<script>
import vanIcon from '../icon/index';
import vanButton from '../button/index';
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
export default {
    data() {
        return {
            id: '',
            lang: '',
            openType: '',
            businessId: '',
            sessionFrom: '',
            appParameter: '',
            sendMessageImg: '',
            sendMessagePath: '',
            showMessageCard: '',
            sendMessageTitle: ''
        };
    },
    components: {
        vanIcon,
        vanButton
    },
    classes: ['icon-class', 'text-class'],
    mixins: [link, button, openType],
    props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick(event, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---??????dataset end--- */
            this.$emit('click', event.detail);
            this.jumpLink();
        },

        bindError(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindError ?????????');
        },

        bindContact(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindContact ?????????');
        },

        bindOpenSetting(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindOpenSetting ?????????');
        },

        bindGetUserInfo(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindGetUserInfo ?????????');
        },

        bindGetPhoneNumber(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindGetPhoneNumber ?????????');
        },

        bindLaunchApp(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? bindLaunchApp ?????????');
        }
    }
};
</script>
<style>
@import '../common/index.css';
.van-goods-action-icon {
    width: 50px !important;
    border: none !important;
}
.van-goods-action-icon__content {
    display: -webkit-flex;
    display: flex;
    height: 100%;
    font-size: 10px;
    line-height: 1;
    color: #7d7e80;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
}
.van-goods-action-icon__icon {
    margin-bottom: 4px;
}
</style>
