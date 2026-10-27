(function() {

    if(voltmx.ui.Video)
		return;

    var util = {
        accessorDescriptor: function accessorDescriptor(field, fun) {
            var desc = {
                enumerable: true,
                configurable: true
            };
            desc[field] = fun;
            return desc;
        },
        defineGetter: function defineGetter(obj, prop, get) {
            if (Object.defineProperty) return Object.defineProperty(obj, prop, util.accessorDescriptor("get", get));
            throw new Error("browser does not support getters");
        },
        defineSetter: function defineSetter(obj, prop, set) {
            if (Object.defineProperty) return Object.defineProperty(obj, prop, util.accessorDescriptor("set", set));
            throw new Error("browser does not support setters");
        },
    }

    var MediaController = null;
	var VideoView = null;
	var MediaPlayer = null;
	var Uri = null;
    var Color = null;
    var RelativeLayout = null;
    var RelativeParams = null;
	var ImageView = null;
	var View = null;
	var KonyMain = java.import('com.konylabs.android.KonyMain');
	var appContext =  KonyMain.getAppContext();

    var packageName = appContext.getPackageName();
    var resourcePath = null;

    var Spinner = null;
    var trackList = null;
    var MediaControllerCallbacks = null;
    var selectedTrack = null;


    voltmx.ui.Video = function(bconfig) {
        this.name = "voltmx.ui.Video";
        this.controls = typeof bconfig.controls == "undefined" ? true : bconfig.controls;
        this.id = bconfig.id;

        var defineGetter = util.defineGetter;
        var defineSetter = util.defineSetter;

        var source = bconfig.source;
        if (source && (source.mp4 || source.rawBytes)) {
            this.sourceURI = this.__getSourceURI(source.mp4 || source.rawBytes);
        }

        defineGetter(this, "source", function() {
            return source;
        });
        defineSetter(this, "source", function(val) {
            if (val && (val.mp4 || val.rawBytes)) {
                source = val;
                this.sourceURI = this.__getSourceURI(val.mp4 || val.rawBytes);
            }
        });

        var controls = typeof bconfig.controls == "undefined" ? true : bconfig.controls;
        defineGetter(this, "controls", function() {
            return controls;
        });
        defineSetter(this, "controls", function(val) {
            controls = typeof val == "undefined" ? true : val;

        });
        var poster = bconfig.poster;
        this.__setImageSource(poster);
        defineGetter(this, "poster", function() {
            return poster;
        });
        defineSetter(this, "poster", function(val) {
            this.__setImageSource(val);
            poster = val;
        });

        var volume = typeof bconfig.volume == "undefined" ? 1.0 : bconfig.volume;
        defineGetter(this, "volume", function() {
            return volume;
        });
        defineSetter(this, "volume", function(val) {
            volume = typeof val == "undefined" ? 1.0 : val;
            if(this.mediaPlayer){
                var volFloat = java.newFloat(volume);
                this.mediaPlayer.setVolume(volFloat,volFloat);
            }
        });

        var tracks = typeof bconfig.tracks == "undefined" ? null : bconfig.tracks;
        defineGetter(this, "tracks", function() {
            return tracks;
        });
        defineSetter(this, "tracks", function(val) {
            tracks = typeof val == "undefined" ? null : val; 
            if(tracks != null)
                  this._setTracks(val);           
        });

        var enableCaptions = typeof bconfig.enableCaptions == "undefined" ? false : bconfig.enableCaptions;
        defineGetter(this, "enableCaptions", function() {
            return enableCaptions;
        });
        defineSetter(this, "enableCaptions", function(val) {
            enableCaptions = typeof val == "undefined" ? false : val;  
            if(this.mediaPlayer != null && this.selectedTrack != null){
                if(enableCaptions)
                    this.mediaPlayer.selectTrack(this.selectedTrack);          
                else
                    this.mediaPlayer.deselectTrack(this.selectedTrack);
            }
        });

        this.onPrepared = bconfig.onPrepared;
        this.onError = bconfig.onError;
        this.onCompletion = bconfig.onCompletion;

        //THis is closure variable for nativecontainer.
        var video = this;

        var MyPreparedListener = java.newClass('MyPreparedListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnPreparedListener'], {
            onPrepared: function(mediaPlayer) {
                voltmx.print("On Prepared Listener called : " + video.id);
                if (mediaPlayer.isPlaying()) {
                    mediaPlayer.stop();
					mediaPlayer.reset();
                    mediaPlayer.release();
					if(MediaPlayer == null)
					{
						MediaPlayer = java.import('android.media.MediaPlayer')
					}
					mediaPlayer = new MediaPlayer();
                }
                video.mediaPlayer = mediaPlayer;
                video.prepared = true;

                mediaPlayer.seekTo(1000);
				if(video.tracksList != undefined)
				{
					var item = video.tracksList.get(video.selectedIndex);
					video._updateSelectTrack(item);
				}
                var volFloat = java.newFloat(video.volume);
                mediaPlayer.setVolume(volFloat,volFloat);
                mediaPlayer.setLooping(false);
                if(video.imageView){
					if(View == null)
					{
						View = java.import('android.view.View');
					}
                    video.imageView.setVisibility(View.GONE);
                }
                if(video.onPrepared){
                    video.onPrepared.call(video,video);
                }

            }
        });
         var MyErrorListener = java.newClass('MyErrorListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnErrorListener'], {
            onError: function(mediaPlayer, what, extra) {
                //voltmx.print("Video " +mediaPlayer.getTrackInfo()  +"  load error : " + what + ", extra : " + extra );
				var ret = false;
				try{
					if(video.onError){
						var userRetVal = video.onError.call(video,video,what);
						if (typeof (userRetVal) === "boolean")
							ret = userRetVal;
					} 
					//mediaPlayer.stop();
					mediaPlayer.reset();
					//mediaPlayer.release();
					//video.mediaPlayer = undefined;
				}catch(e){
					voltmx.print("Video onErrorListener error : " + e.message);
				}
                return ret;
            }
        });

        var MyCompletionListener = java.newClass('MyCompletionListener' + this.id, 'java.lang.Object', ['android.media.MediaPlayer$OnCompletionListener'], {
            onCompletion: function(mediaPlayer) {
                if(video.onCompletion){
                    video.onCompletion.call(video,video);
                }
                 voltmx.print(" Video onCompletion end :  " +  video.id );
                return false;
            }
        });
        bconfig["onCreated"] = function() {
            voltmx.print(" Video onCreated for :  " +  video.id );
            var context = KonyMain.getActivityContext();
            if(!context){
                voltmx.print(" Native Container Context is null. ");
                return;
            }
			if(RelativeLayout == null)
			{
				RelativeLayout = java.import('android.widget.RelativeLayout');
				RelativeParams = java.import('android.widget.RelativeLayout$LayoutParams');
			}
            var relParams = new RelativeParams(RelativeParams.MATCH_PARENT, RelativeParams.MATCH_PARENT);
            relParams.addRule(RelativeLayout.CENTER_IN_PARENT);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
            relParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);

			if(VideoView == null)
			{
				VideoView = java.import('android.widget.VideoView');
			}
			var videoView = new VideoView(context);
            video.videoView = videoView;

            videoView.setOnPreparedListener(new MyPreparedListener());
            videoView.setOnErrorListener(new MyErrorListener());
            videoView.setOnCompletionListener(new MyCompletionListener());
			
			if(Color == null)
			{
				var Color = java.import("android.graphics.Color");
			}
            this.setBackgroundColor(Color.TRANSPARENT);
            this.addView(videoView, relParams);

            try {
                video._updateControls(context);
                video._updateDataSource();
                video._setTracks(video.tracks);
            } catch (e) {
                voltmx.print("Video view source update error. : " + e.message);
            }

            if(video.poster){
				if(ImageView == null)
				{
					ImageView = java.import('android.widget.ImageView');
				}
                var imageView = new ImageView(context);
                video.imageView = imageView;
                imageView.setImageResource(video.posterId);
                this.addView(imageView, relParams);
                voltmx.print("video.poster : " + packageName + "   : " +  video.posterId);
            }
        }

        bconfig["onCleanup"] = function() {
                                   voltmx.print('Container view cleaned for : ' + video.id);
                                   video.videoView = undefined;
                                   video.mediaPlayer = undefined;
                                   video.imageView = undefined;
                               };
        bconfig["onOrientationChange"] = function(){
            //TODO: orientation change.
        };
        bconfig["type"] = "voltmx.ui.Video";
        var nativeContainer = new voltmx.ui.NativeContainer(bconfig);
        this.nativeContainer = nativeContainer;
        this.prepareNCProperties(nativeContainer);
    }

    /*
        Video Types:
                1 -- URL
                2 -- Local Resource.
                3 -- Bytes.
    */
    voltmx.ui.Video.prototype.__getSourceURI = function(source){ 
		//voltmx.print("voltmx.type(source) :::::  " + voltmx.type(source));
		//voltmx.print("  Source Instance of voltmx.types.RawBytes:  " + (source instanceof voltmx.types.RawBytes));
		/*if(source instanceof voltmx.types.RawBytes){
			source = source.getResourcePath();
			voltmx.print("  Resource Path:  " + source);
		}else */
		if (typeof source === "string"){
			if(source.indexOf("http") === 0) {
				source =  source;
				//voltmx.print(" HTTP Resource Path:  " );
			}else{
			    if (KonyMain.getAppType() == 0){
			        var index = source.indexOf('.'); //index == -1 if the char is not found
                	if(index > 1)
                	    source = source.substring(0, index);//To remove .(dot) and extenstion when specified in source e.g. movie.mp4 -> movie
			    }
			    if(resourcePath == null)
				{
					resourcePath = voltmx.io.FileSystem.getRawDirectoryPath();
				}

				source =  resourcePath + source;
				//voltmx.print(" NORMAL VIDEO Path:  " );
			}
			
        }else{
			source = source.getResourcePath();
			//voltmx.print(" KONY RAW BYTES  " );
		} 
        try{
			if(Uri == null)
			{
				Uri = java.import('android.net.Uri');
			}
            var path = Uri.parse(source);
            voltmx.print("  Video Path is :  " + path);
        }catch(e){
            voltmx.print(" Error while preparing URI :  " + source + " : " + e.message);
        }
        return path;
    }

    voltmx.ui.Video.prototype.__setImageSource = function(source){
        if(source){
            var index = source.indexOf('.'); //index == -1 if the char is not found
            if(index < 1)
                this.posterSrc = source;
            else
                this.posterSrc = source.substring(0, index);
            this.posterId = appContext.getResources().getIdentifier(this.posterSrc, "drawable", packageName);
        }
    }

    voltmx.ui.Video.prototype._updateDataSource = function (){
        if(this.videoView){
            try{
                voltmx.print("Video Source URI:  " + this.sourceURI);
                var videoView = this.videoView;
                var sourceURI = this.sourceURI;
                var video = this;
                voltmx.runOnMainThread(function(){
					try{
                        if(video.spinner != null){
                            video.getNativeContainer().getContainerView().removeView(video.spinner);
                            video.spinner.setSelection(1);
							video.tracksList = undefined;
                            video.selectedTrack = null; 
                            video.spinner = null;                       
                        }
						videoView.setVideoURI(sourceURI);
					}catch(e){
						voltmx.print("Can't set Video Source URI:  "+e.message);
					}
                }, [] );

            }catch(e){
                voltmx.print(" Error while loading video:  " + this.source  + " : " + e.message);
            }
        }
    }
    voltmx.ui.Video.prototype._updateControls = function (context){
        var self = this;
        voltmx.runOnMainThread(() => {
            if (this.videoView) {
                if(this.controls && this.nativeContainer.isVisible){
                    voltmx.print(" Video with controls.  " +  this.id );
                    if(MediaController == null)
                    {
                        MediaController = java.import('com.konylabs.api.util.KonyMediaController');
                        MediaControllerCallbacks = java.newClass('MediaControllerCallbacks','java.lang.Object',['com.konylabs.api.util.MediaControllerCallbacks'],{
                            show : function(){
                               voltmx.runOnMainThread(function(){
                                        try{
                                            if(self.spinner != undefined && self.spinner != null && self.enableCaptions && self.controls)
                                                self.spinner.setVisibility(0); // 0 => VISIBLE
                                        }catch(e){
                                            voltmx.print("Can't set spinner visibility to VISIBLE "+e.message);
                                        }
                                    }, [self] );
                            },
                            hide : function(){
                                voltmx.runOnMainThread(function(){
                                        try{
                                            if(self.spinner != undefined && self.spinner != null)
                                                self.spinner.setVisibility(4); // 4 => INVISIBLE
                                        }catch(e){
                                            voltmx.print("Can't set spinner visibility to INVISIBLE "+e.message);
                                        }
                                    }, [self] );
                            }
                        });
                    }
                    var mediaControls = new MediaController(context,new MediaControllerCallbacks());                
                    this.videoView.setMediaController(mediaControls);
                }else{
                    this.videoView.setMediaController(null);
                }
            }
        });
    }
    voltmx.ui.Video.prototype._createSpinnerView = function(){
        if(this.Spinner == null)
            Spinner = java.import('android.widget.Spinner');
        var Color = java.import("android.graphics.Color");
        var context = KonyMain.getActivityContext();
        var spinner = new Spinner(context);
        this.spinner = spinner;
        this.TrackInfo = java.import('android.media.MediaPlayer$TrackInfo');
        var video = this;
        var ItemListener = java.newClass('ItemListener' + this.id, 'java.lang.Object', ['android.widget.AdapterView$OnItemSelectedListener'], {
            onItemSelected : function(adapterView, view, i, l){
                if(video.mediaPlayer == null)
                    return;
                var adapter = adapterView.getAdapter();
                var item = adapter.getItem(i);
                               
                if(item === "Off"){
                    video.mediaPlayer.deselectTrack(video.selectedTrack);
                    return;
                }
                video._updateSelectTrack(item);
            }
        });
        var spinnerRelativeParams = new RelativeParams(50,50);
        spinnerRelativeParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
        spinnerRelativeParams.topMargin = 30;
        spinnerRelativeParams.rightMargin = 30;
        spinner.setOnItemSelectedListener(new ItemListener());
        spinner.setBackgroundColor(Color.TRANSPARENT);
        var resId = context.getResources().getIdentifier("calcaption", "drawable", context.getPackageName());
        var drawable = context.getResources().getDrawable(resId);
        spinner.setBackground(drawable);
		spinner.setVisibility(4);//By default INVISIBLE
        voltmx.runOnMainThread(function(){
            try{
                var nc = this.getContainerView();
                nc.addView(spinner, spinnerRelativeParams);
            }catch(e){
                voltmx.print("Can't set Video Source URI:  "+e.message);
            }
        }, [this,spinner,spinnerRelativeParams] );
    }
    voltmx.ui.Video.prototype._updateSelectTrack = function(item){
        var video = this;
        var trackinfos = video.mediaPlayer.getTrackInfo();
        for(var j=0;j<trackinfos.length;j++){
            var trackinfo = trackinfos[j];
            var type = trackinfo.getTrackType();
            if(type == 4){ // type 4 is for subtitle track
                var lang = trackinfo.getLanguage();
                if(lang == item){
                    if(video.selectedTrack != null)
                        video.mediaPlayer.deselectTrack(video.selectedTrack);
                    if(video.enableCaptions)
                        video.mediaPlayer.selectTrack(j);
                    video.selectedTrack = j;
                    break;
                }
            }
        }
    }
    voltmx.ui.Video.prototype.setVisibility = function(visible) {
		this.nativeContainer.setVisibility(visible);
		var context = KonyMain.getActivityContext();
		if(!context){
            voltmx.print(" Native Container Context is null. ");
            return;
        }
		this._updateControls(context);
    };
	
	voltmx.ui.Video.prototype.setEnabled = function(enabled) {
        this.nativeContainer.setEnabled(enabled);
    };

    voltmx.ui.Video.prototype.setSource = function(source) {
        this.source = source;
        this.prepared = false;
        this.mediaPlayer = undefined;
        this._updateDataSource();
    };

    voltmx.ui.Video.prototype.play = function() {
        voltmx.print('Video Start ' );
        var videoView = this.videoView;
        if (videoView) {
            if(this.prepared && !videoView.isPlaying()){
                videoView.start();
            }else if(this.mediaPlayer && !videoView.isPlaying()){
                this.mediaPlayer.prepareAsync();
            }else{
                voltmx.print("Video is not yet prepared.");
            }
            this.paused = false;
        }
    };

    voltmx.ui.Video.prototype.pause = function() {
        voltmx.print('Video pause ');
        var videoView = this.videoView
        if (videoView && videoView.canPause()) {
            videoView.pause();
            this.paused = true;
        }
    };
    voltmx.ui.Video.prototype.resume = function() {
        voltmx.print('Video resume ');
         var videoView = this.videoView;
        if (videoView && !videoView.isPlaying() && this.prepared) {
            videoView.start();
            this.paused = false;
        }
    };
    voltmx.ui.Video.prototype.stop = function() {
        var mediaPlayer = this.mediaPlayer
        if (mediaPlayer && mediaPlayer.isPlaying()) {
             if(mediaPlayer){
                mediaPlayer.stop();
                this.prepared = false;
             }
        }else if(mediaPlayer && this.paused){
           this.seekTo(0);
        }
        voltmx.print('Video stop ');
    };
    voltmx.ui.Video.prototype.seekTo = function(seekTime) {
        voltmx.print('Video seekTo ');
        var videoView = this.videoView
        if (videoView && this.prepared) {
            if((seekTime <= videoView.getCurrentPosition() && videoView.canSeekBackward() )
            || (seekTime > videoView.getCurrentPosition() && videoView.canSeekForward () )){
                voltmx.runOnMainThread(function(){
                    videoView.seekTo(seekTime);
                }, [] );
            }
        }
    };
    voltmx.ui.Video.prototype.isPlaying = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.isPlaying();
        }
        return false;
    };
    voltmx.ui.Video.prototype.getCurrentPosition = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.getCurrentPosition();
        }
        return 0;
    };
    voltmx.ui.Video.prototype.getDuration = function() {
        var videoView = this.videoView
        if (videoView  && this.prepared) {
            return videoView.getDuration();
        }
        return 0;
    };
    voltmx.ui.Video.prototype.getBufferPercentage = function() {
        var videoView = this.videoView
        if (videoView) {
            return videoView.getBufferPercentage();
        }
        return 0;
    };
	
    voltmx.ui.Video.prototype.getNativeContainer = function() {
        return this.nativeContainer;
    };
	
	voltmx.ui.Video.prototype.setTracks = function(tracks){
		this.tracks = tracks;
    };
		

    voltmx.ui.Video.prototype._setTracks = function(tracks){
        if(this.spinner == null)
            this._createSpinnerView();
        var ArrayList = java.import('java.util.ArrayList');
        var list = new ArrayList();
        var selectedIndex = 0;
        list.add("");
        list.add("Off");
        var KonyMain = java.import('com.konylabs.android.KonyMain');
        var appContext =  KonyMain.getAppContext();
        var context = appContext;
        var MediaFormat = java.import("android.media.MediaFormat");
        for(var i=0;i<tracks.length;i++){            
            var track = tracks[i];
            if(track.displayName != undefined && track.displayName != null && track.src != undefined && track.src != null){
                var src = track.src;
                var displayName = track.displayName;
                var fileName = src.replace(".vtt","");
				if(selectedIndex == 0)
					selectedIndex = 2;//If tracks are set then default value will be the first one; 
				//Adding 2 to index is because of we are adding empty and off into the array list while creating.
                selectedIndex = (track.default == true) ? i + 2 : selectedIndex;
                var id = context.getResources().getIdentifier(fileName,"raw", context.getPackageName());
                if(id == 0){
                    throw new Error("No such file or directory");
                }
                var is = context.getResources().openRawResource(id);
                this.videoView.addSubtitleSource(is,MediaFormat.createSubtitleFormat("text/vtt", displayName));
                list.add(displayName);
            }
        }
        this.tracksList = list;
        var ArrayAdapter = java.import('android.widget.ArrayAdapter');
        var arrayAdapter = new ArrayAdapter(context,17367055,list); // 17367055 => is for simple_list_item_single_choice layout. https://developer.android.com/reference/android/R.layout#simple_list_item_single_choice
        arrayAdapter.setDropDownViewResource(17367049); // 17367049 => if for simple_spinner_dropdown_item dropdown layout. https://developer.android.com/reference/android/R.layout#simple_spinner_dropdown_item
        var video = this;
        voltmx.runOnMainThread(function(){
                    try{
                        video.spinner.setAdapter(arrayAdapter);
                        video.trackList = list; 
                        if(video.mediaPlayer != null)
                            video.spinner.setSelection(selectedIndex);
                        else
                            video.selectedIndex = selectedIndex;
                    }catch(e){
                        voltmx.print("runOnMainThread error  "+e.message);
                    }
                }, [] );
    };

    voltmx.ui.Video.prototype.isShowCaptionsEnabled = function(){
        var Context = java.import("android.content.Context");
        var actContext = java.import('com.konylabs.android.KonyMain').getAppContext();
        var captioningManager = actContext.getSystemService(Context.CAPTIONING_SERVICE);
        return captioningManager.isEnabled();
    }

    voltmx.ui.Video.prototype.prepareNCProperties = function(nativeContainer){
        var defineGetter = util.defineGetter;
        var defineSetter = util.defineSetter;

        defineGetter(this, "skin", function() {
            return nativeContainer.skin;
        });
        defineSetter(this, "skin", function(val) {
            nativeContainer.skin = val;
        });

        defineGetter(this, "isVisible", function() {
            return nativeContainer.isVisible;
        });
        defineSetter(this, "isVisible", function(val) {
            nativeContainer.isVisible = val;
            this.setVisibility(val);
        });

        defineGetter(this, "padding", function() {
            return nativeContainer.padding;
        });
        defineSetter(this, "padding", function(val) {
            nativeContainer.padding = val;
        });

        defineGetter(this, "left", function() {
            return nativeContainer.left;
        });
        defineSetter(this, "left", function(val) {
            nativeContainer.left = val;
        });

        defineGetter(this, "right", function() {
            return nativeContainer.right;
        });
        defineSetter(this, "right", function(val) {
            nativeContainer.right = val;
        });

        defineGetter(this, "top", function() {
            return nativeContainer.top;
        });
        defineSetter(this, "top", function(val) {
            nativeContainer.top = val;
        });

        defineGetter(this, "bottom", function() {
            return nativeContainer.bottom;
        });
        defineSetter(this, "bottom", function(val) {
            nativeContainer.bottom = val;
        });

        defineGetter(this, "width", function() {
            return nativeContainer.width;
        });
        defineSetter(this, "width", function(val) {
            nativeContainer.width = val;
        });

        defineGetter(this, "height", function() {
            return nativeContainer.height;
        });
        defineSetter(this, "height", function(val) {
            nativeContainer.height = val;
        });

        defineGetter(this, "minWidth", function() {
            return nativeContainer.minWidth;
        });
        defineSetter(this, "minWidth", function(val) {
            nativeContainer.minWidth = val;
        });

        defineGetter(this, "maxWidth", function() {
            return nativeContainer.maxWidth;
        });
        defineSetter(this, "maxWidth", function(val) {
            nativeContainer.maxWidth = val;
        });

        defineGetter(this, "minHeight", function() {
            return nativeContainer.minHeight;
        });
        defineSetter(this, "minHeight", function(val) {
            nativeContainer.minHeight = val;
        });

        defineGetter(this, "maxHeight", function() {
            return nativeContainer.maxHeight;
        });
        defineSetter(this, "maxHeight", function(val) {
            nativeContainer.maxHeight = val;
        });

        defineGetter(this, "centerX", function() {
            return nativeContainer.centerX;
        });
        defineSetter(this, "centerX", function(val) {
            nativeContainer.centerX = val;
        });

        defineGetter(this, "centerY", function() {
            return nativeContainer.centerY;
        });
        defineSetter(this, "centerY", function(val) {
            nativeContainer.centerY = val;
        });

        defineGetter(this, "zIndex", function() {
            return nativeContainer.zIndex;
        });
        defineSetter(this, "zIndex", function(val) {
            nativeContainer.zIndex = val;
        });
		defineGetter(this, "opacity", function() {
            return nativeContainer.opacity;
        });
        defineSetter(this, "opacity", function(val) {
            nativeContainer.opacity = val;
        });

        defineGetter(this, "parent", function() {
            return nativeContainer.parent;
        }); 
    }

})();
