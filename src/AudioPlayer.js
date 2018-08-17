import {Howl, Howler} from 'howler';

export default class AudioPlayer {

    constructor(onRefreshUI, onPlaybackStartedCallback, onPlayPauseCallback, onPrevCallback, onNextCallback) {
        this.playlist = [];
        this.currentIndex = 0;

        this.onRefreshUI = onRefreshUI;
        this.onPlaybackStartedCallback = onPlaybackStartedCallback;
        this.onPlayPauseCallback = onPlayPauseCallback;
        this.onPrevCallback = onPrevCallback;
        this.onNextCallback = onNextCallback;
    }

    play(index) {
        let self = this;

        let data = self.playlist[index];

        let track;

        if(data.howl) {
            track = data.howl;
        } else {
            track = data.howl = new Howl({
                src: /*'http://localhost:8181/content/music/albums/5b5c82ebb3cdce9faa56ec32/5b5c8362b3cdce9faa56ec34.mp3',*/ self.playlist[index].fileName,
                html5: true,
                onplay: function() {
                    if (typeof self.onPlayPauseCallback == "function") {
                        self.onPlayPauseCallback();
                    }
                    if (typeof self.onRefreshUI == "function") {
                        self.onRefreshUI(data);
                    }
                },
                onload: function() {
                    self.currentIndex = index;
                    if (typeof self.onPlaybackStartedCallback == "function") {
                        self.onPlaybackStartedCallback();
                    }
                    if (typeof self.onRefreshUI == "function") {
                        self.onRefreshUI(data);
                    }
                },
                onend: function() {
                    self.next();
                    if (typeof self.onRefreshUI == "function") {
                        self.onRefreshUI(data);
                    }
                },
                onpause: function() {
                    if (typeof self.onPlayPauseCallback == "function") {
                        self.onPlayPauseCallback();
                    }
                    if (typeof self.onRefreshUI == "function") {
                        self.onRefreshUI(data);
                    }
                },
                onstop: function() {
                    if (typeof self.onRefreshUI == "function") {
                        self.onRefreshUI(data);
                    }
                }
            });
        }

        track.play();
    }

    pause() {
        if(this.playlist[this.currentIndex] !== undefined && this.playlist[this.currentIndex].howl !== undefined) {
            let track = this.playlist[this.currentIndex].howl;

            track.pause();
        }
    }

    resume() {
        if(this.playlist[this.currentIndex] !== undefined && this.playlist[this.currentIndex].howl !== undefined) {
            let track = this.playlist[this.currentIndex].howl;

            return track.play();
        }
    }

    next() {
        this.pause();

        this.currentIndex += 1;

        this.play(this.currentIndex);
    }

    prev() {
        this.pause();

        this.currentIndex -= 1;

        this.play(this.currentIndex);
    }

    get duration() {
        if(this.playlist[this.currentIndex] !== undefined && this.playlist[this.currentIndex].howl !== undefined) {
            let track = this.playlist[this.currentIndex].howl;

            return track.duration();
        }
    }

    get isPlaying() {
        if(this.playlist[this.currentIndex] !== undefined && this.playlist[this.currentIndex].howl !== undefined) {
            return this.playlist[this.currentIndex].howl.playing();
        }

        return false;
    }

    seek() {
        if(this.playlist[this.currentIndex] !== undefined && this.playlist[this.currentIndex].howl !== undefined) {
            let track = this.playlist[this.currentIndex].howl;

            return track.seek();
        }
    }

}