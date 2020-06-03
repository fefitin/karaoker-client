import React, { useState } from 'react';
import ReactGA from 'react-ga';
import Form from './Form';
import KaraokerService from './../services/KaraokerService';
import Status from './Status';
import Error from './Error';
import Player from './Player';

const Karaoker = () => {

  const [ status, setStatus ] = useState('');
  const [ error, setError ] = useState('');
  const [ videoId, setVideoId ] = useState('');
  const [ file, setFile ] = useState('');

  const download = url => {
    setStatus('Descargando video');
    setError('');
    setVideoId('');
    setFile('');

    //Analytics event
    ReactGA.event({
      category: 'Video',
      action: 'Download',
      label: url
    });
    
    //Download file
    KaraokerService
      .download(url)
      .then(videoId => {
        setStatus('Procesando video, puede demorar unos minutos');
        setVideoId(videoId);
      }).catch(() => {
        setError('Error al descargar video.');
        setStatus('');
      })
  };

  KaraokerService.onFile(file => {
    setFile(file);
    setStatus('');
    setError('');
  });

  return <main id="main">
    <h1>karaokr</h1>
    <Form download={download}></Form>
    { status && <Status text={status}></Status> }
    { error && <Error text={error}></Error> }
    { videoId && file && <Player videoId={videoId} audio={file}></Player> }
  </main>;

};

export default Karaoker;