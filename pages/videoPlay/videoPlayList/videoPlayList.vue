<template>
    <!-- pages/videoPlay/videoPlay.wxml -->
    <view class="video_container">
        <scroll-video
            :player-type="playerType"
            :video-list="videoList"
            :fit-type="fitType"
            @swipeDown="swipeDown"
            @swipeUpper="swipeUpper"
            @swipeToStart="swipeToStart"
            @swipeToEnd="swipeToEnd"
        ></scroll-video>
    </view>
</template>

<script>
import scrollVideo from '../components/scroll-video';
const app = getApp();
export default {
    components: {
        scrollVideo
    },
    data() {
        return {
            //测试视频列表
            videoList: [],
            //测试直播地址
            liveList: [],
            playerType: 'video',
            fitType: 'contain',
            currentVid: '',
            shareTitle: ''
        };
    },
    onShow() {
        uni.hideHomeButton(); //隐藏返回首页按钮
    },
    onShareAppMessage() {
        return {
            path: '/pages/videoPlay/videoPlayList/videoPlayList?id=' + this.currentVid,
            title: this.shareTitle
        };
    },
    onShareTimeline() {
        return {
            path: '/pages/videoPlay/videoPlayList/videoPlayList?id=' + this.currentVid,
            title: this.shareTitle
        };
    },
    onLoad: function (option) {
        if (uni.getStorageSync('wx_userinfo_key')) {
            if (option && option.id) {
                this.getVideoList(option.id);
            } else {
                var videolist = uni.getStorageSync('videolist_key');

                if (this.playerType === 'video') {
                    videolist = this.controlVideoPlayer(videolist, 0);
                    this.setData(
                        {
                            videoList: videolist
                        },
                        () => {
                            uni.removeStorage({
                                key: 'videolist_key'
                            });
                        }
                    );
                } else {
                    let _listlist = this.controlVideoPlayer(this.liveList, 0);

                    this.setData({
                        videoList: _listlist
                    });
                }
            }
        } else {
            uni.navigateTo({
                url: '/pages/shopHome/home/home'
            });
        }
    },
    methods: {
        getVideoList(id) {
            app.globalData.sjrequest('/commodity/queryVideoCommodityList').then((res) => {
                if (res && res.data.data) {
                    var list = res.data.data;
                    var firstItem = null;
                    list.forEach((item, index) => {
                        if (item.id == id) {
                            firstItem = list.splice(index, 1)[0];
                        }
                    });
                    list.unshift(firstItem);

                    var _list = this.controlVideoPlayer(list, 0);

                    this.setData({
                        videoList: _list
                    });
                }
            });
        },

        //修改视频属性 保证只有一个video被创建
        controlVideoPlayer: function (list, index) {
            //index=index>=(list.length-1)?0:index;
            if (list.length === 0) {
                return [];
            } else {
                list.forEach((item, i) => {
                    if (index === i) {
                        item.video_is_player = true;
                        this.setData({
                            currentVid: item.id,
                            shareTitle: item.description
                        });
                    } else {
                        item.video_is_player = false;
                    }
                });
                return list;
            }
        },

        //上滑事件
        swipeUpper: function (e) {
            const { newindex } = e.detail;
            let videolist = this.controlVideoPlayer(this.videoList, newindex);
            this.setData({
                videoList: videolist
            });
        },

        //下滑事件
        swipeDown: function (e) {
            const { newindex } = e.detail;
            let videolist = this.controlVideoPlayer(this.videoList, newindex);
            this.setData({
                videoList: videolist
            });
        },

        //下滑到最后一条数据
        swipeToEnd: function (e) {
            //wx.showLoading({ title: '加载中',duration:1000 });
            const { newindex, playerType } = e.detail;
            console.log('playerType', playerType, newindex);
            let list = this.videoList;
            this.setData({
                videoList: this.controlVideoPlayer(list, newindex)
            });
        },

        //上滑到第一条数据
        swipeToStart: function (e) {
            uni.showToast({
                title: '当前第一个视频',
                icon: 'none'
            });
            console.log(e);
        }
    }
};
</script>
<style>
page {
    width: 100%;
    height: 100%;
}
.video_container {
    width: 100%;
    height: 100%;
}
</style>
