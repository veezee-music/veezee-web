<template>

    <div v-if="track.title != null" class="block">
        <div class="image-container">
            <img :src="track.image"/>
        </div>
        <div class="info-container">
            <div class="titles-container">
                <h5 class="track-title">{{ track.title }}</h5>
                <h6 v-if="track.album" class="album-title">{{ track.album.title }}</h6>
                <small v-if="track.album && track.album.artist" class="artist-name">{{ track.album.artist.name }}</small>
            </div>
            <div class="controls-container">
                <div>
                    <button v-if="isPlaying" class="control copy" type="button" @click="onPlayPause"><img style="width: 3rem; height: 3rem;" src="../assets/icons/pause.svg"></button>
                    <button v-else class="control copy" type="button" @click="onPlayPause"><img style="width: 3rem; height: 3rem;" src="../assets/icons/play.svg"></button>
                </div>
                <div class="base">
                    <span class="time" id="progress">00:00</span>
                    <button class="control" type="button" @click="onPrev"><img style="width: 2rem; height: 2rem;" src="../assets/icons/rewind.svg"></button>
                    <button v-if="isPlaying" class="control center" type="button" @click="onPlayPause"><img style="width: 3rem; height: 3rem;" src="../assets/icons/pause.svg"></button>
                    <button v-else class="control center" type="button" @click="onPlayPause"><img style="width: 3rem; height: 3rem;" src="../assets/icons/play.svg"></button>
                    <button class="control" type="button" @click="onNext"><img style="width: 2rem; height: 2rem;" src="../assets/icons/fast-forward.svg"></button>
                    <span class="time">{{ track.duration }}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    window.updateProgress = function (progress) {
        document.getElementById('progress').innerHTML = progress;
    };

    // @ is an alias to /src
    import AudioPlayer from '../AudioPlayer.js';
    import EventBus from '../bus.js';

    export default {
        name: 'BottomPlayer',
        components: {
        },
        data() {
            return {
                track: {duration: '00:00', progress: '00:00'},
                isPlaying: false,
                progressUpdateIntervalId: null
            }
        },
        created() {
            let self = this;

            if(window.veezee === undefined) {
                window.veezee = {};
                window.veezee.audioPlayer = new AudioPlayer(this.refreshUI);
            } else {
                window.veezee.audioPlayer.onRefreshUI = this.refreshUI;
            }

            EventBus.$on('play-list-with-index', (list, index) => {
                window.veezee.audioPlayer.pause();
                window.veezee.audioPlayer.playlist = list;
                window.veezee.audioPlayer.play(index);
                self.refreshUI(list[index]);
            });
        },
        methods: {
            onPrev() {
                window.veezee.audioPlayer.prev();
            },
            onNext() {
                window.veezee.audioPlayer.next();
            },
            onPlayPause() {
                if(window.veezee.audioPlayer.isPlaying) {
                    window.veezee.audioPlayer.pause();

                    clearInterval(this.progressUpdateIntervalId);
                } else {
                    window.veezee.audioPlayer.resume();
                }
                this.refreshUI(window.veezee.audioPlayer.playlist[window.veezee.audioPlayer.currentIndex]);
            },
            refreshUI(track) {
                let self = this;

                this.track = track;
                track.duration = this.formatSecondsToMinutesAndSeconds(window.veezee.audioPlayer.duration);

                if(!this.isPlaying) {
                    this.progressUpdateIntervalId = setInterval(function () {
                        self.updateProgress(track);
                    }, 1000);
                }

                this.isPlaying = window.veezee.audioPlayer.isPlaying;
            },
            updateProgress() {
                let progress = this.formatSecondsToMinutesAndSeconds(window.veezee.audioPlayer.seek());

                this.track.progress = progress;
                window.updateProgress(progress);
            },
            formatSecondsToMinutesAndSeconds(time) {
                let minutes = Math.floor(time / 60);
                minutes = isNaN(minutes) ? 0 : minutes;
                if(minutes < 10) {
                    minutes = '0' + minutes;
                }
                let seconds = time % 60;
                seconds = isNaN(seconds) ? 0 : seconds;
                if(seconds < 10) {
                    seconds = '0' + seconds;
                }

                return minutes + ':' + seconds.toString().substring(0, 2);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    $regular-container-height: 10rem;
    $mobile-container-height: 5rem;

    .block {
        width: 30rem;
        @media screen and (max-width: 567px) {
            width: 100%;
        }

        /*-webkit-backdrop-filter: blur(30px);*/
        /*backdrop-filter: blur(30px);*/
        background-color: $primary;

        display: flex;
        flex-direction: row;
        height: $regular-container-height;

        @media screen and (max-width: 567px) {
            height: 20vw;
        }
    }

    .image-container {
        //background-color: purple;
        width: $regular-container-height;
        height: $regular-container-height;
        margin-top: -.1rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('../assets/artwork.png');

        border-top: .1rem solid #ffffff;
        border-bottom: .1rem solid #ffffff;

        @media screen and (max-width: 567px) {
            width: 20vw;
            height: 20vw;
            margin-top: 0;

            border-top: none;
            border-bottom: none;
        }

        img {
            width: $regular-container-height;
            height: 100%;
            @media screen and (max-width: 567px) {
                width: inherit;
            }
        }
    }

    .titles-container {
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        text-align: left;
        padding-left: 1rem;
        padding-right: 1rem;

        .track-title, .album-title {
            color: $primary-text-color;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .artist-name {
            color: $primary-text-color;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        @media screen and (max-width: 567px) {
            width: 100vw - 20vw - 20vw;
            height: 100%;
        }
    }

    .info-container {
        height: 100%;
        width: 30rem - $regular-container-height;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 567px) {
            flex-direction: row;
            width: 100vw - 20vw;
        }
    }

    .controls-container {
        height: 40%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        overflow: hidden;

        .time {
            color: #ffffff;
        }

        .control {
            background: transparent;
            border: none;
            padding: 0;
            outline: none;
            cursor: pointer;
        }

        .control.copy {
            display: none;
        }

        .base {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            overflow: hidden;
            height: 100%;
            width: 100%;
        }

        @media screen and (max-width: 567px) {
            height: 100%;
            width: 20vw;
            flex-direction: column;

            .time {
                display: none;
            }

            .control.center {
                display: none;
            }

            .control.copy {
                display: block;
            }
        }
    }
</style>
