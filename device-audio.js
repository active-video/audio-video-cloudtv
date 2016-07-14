/**
 * Disclaimer: This file is provided as-is, without warranty.
 *
 * Purpose: The purpose of this is to create a re-usable manner to consume
 *          audio that is already in the matching audio codec + bitrate + samplerate
 *          + channel count + bit depth. If that pre-requisite is met, the audio
 *          will be mixed into the session without requiring any transcoder
 *          resources
 *
 */


(function(global){

    /**
     *
     * @param url - this URL should be small enough in size so as not to consume a lot of memory, this implementation
     *              does not support splitting the file into multiple range requests/array buffers
     * @param opts
     * @param opts.volume {Number} in the range of 0-1
     * @param opts.autoPlay {Boolean=true} defaults to true, whether to auto play
     * @constructor
     */
    function AudioTrack(url, opts) {
        this.init.apply(this);
    }

    AudioTrack.prototype = {
        _audio: null,
        _onComplete: null,
        _shouldPlay: false,
        _loaded: false,
        _loading: false,

        init: function(url, opts){
            this._onComplete = this.onComplet.bind(this);
            this._audio = document.createElement('audio');
            this._audio.addEventListener('ended', this._onComplete);
            this._audio.setAttribute('autoplay','');



            if(opts && opts.volume) {
                this._audio.volume = Math.max(0, Math.min(opts.volume, 1));//squeeze into 0-1 range
            }


            if(!opts || opts.autoPlay !== false){
                this.play();
            }
        },

        //Load the source file
        load: function(){
            this._loading = true;
        },

        //Binary data has been laoded from the source
        onLoad: function(){
            this._loading = false;
            this._loaded = true;

            if(this._shouldPlay) {
                this.play();
            }
        },

        play: function(){
            this._shouldPlay = true;

            if(!this._loaded && !this._loading) {
                this.load();
            } else {
                //attach MediaSource to this._audio and play it

            }
        }

        onComplete: function(){
            this._audio.removeEventListener('ended', this._onComplete);
            this._onComplete = null;
        }
    }

    global.AudioTrack = AudioTrack;
})(window);