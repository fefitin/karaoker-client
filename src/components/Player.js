import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const Player = ({ videoId, audio }) => {
  const audioObject = useRef();
  const [ youtubeObject, setYoutubeObject ] = useState(false);
  const [ audioReady, setAudioReady ] = useState(false);
  const [ canPlay, setCanPlay ] = useState(false);
  const [ playing, setPlaying ] = useState(false);

  useEffect(() => {
    setCanPlay(false);
    setPlaying(false);
    
    //Preload audio
    const player = new Audio(audio);
    player.oncanplay = () => setAudioReady(true);
    player.load();
    audioObject.current = player;
  }, [audio])

  useEffect(() => {
    if(youtubeObject && audioReady) {
      setCanPlay(true);
    }
  }, [youtubeObject, audioReady]);

  const play = () => {
    audioObject.current.play();
    youtubeObject.mute();
    youtubeObject.playVideo();
    setCanPlay(false);
    setPlaying(true);
  }

  const opts = {
    playerVars: {
      autoplay: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },    
  };

  return <>
    <div className="video-container">
      { !canPlay && !playing && <div className="loading"></div> }
      { canPlay && !playing && <div className="play" onClick={play}></div> }
      <YouTube
        className={canPlay || playing ? 'loaded' : ''}
        videoId={videoId}
        opts={opts}
        onReady={event => {
          setYoutubeObject(event.target);
        }}
        onStateChange={({ target, data }) => {
          if(data === 1) {
            audioObject.current.currentTime = youtubeObject.getCurrentTime();
            audioObject.current.play();
            youtubeObject.mute();
          } else {
            audioObject.current.pause();
          }
        }}
      />
    </div>
  </>;
}

export default Player;