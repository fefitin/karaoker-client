import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const Player = ({ videoId, audio }) => {
  const audioObject = useRef();
  const [ youtubeObject, setYoutubeObject ] = useState(false);
  const [ audioReady, setAudioReady ] = useState(false);

  useEffect(() => {
    if(youtubeObject && audioReady) {
      youtubeObject.mute();
      youtubeObject.playVideo();
    }
  }, [youtubeObject, audioReady]);

  const opts = {
    playerVars: {
      autoplay: 1,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },    
  };

  return <>
    <audio ref={audioObject} controls={false} src={audio} onCanPlay={() => setAudioReady(true)}></audio>
    <div className="video-container">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={event => {
          setYoutubeObject(event.target);
        }}
        onStateChange={({ target, data }) => {
          if(data === 1) {
            audioObject.current.currentTime = youtubeObject.getCurrentTime();
            audioObject.current.play();
          } else {
            audioObject.current.pause();
          }
        }}
      />
    </div>
  </>;
}

export default Player;