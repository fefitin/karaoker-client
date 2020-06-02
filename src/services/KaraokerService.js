import io from 'socket.io-client';
import Messages from './KaraokerMessages';

const socket = io(process.env.REACT_APP_KARAOKER_SERVER, {
  transports: ['websocket']
});

const KaraokerService = {
  download: url => {
    return new Promise((resolve, reject) => {
      socket.emit(Messages.DOWNLOAD, url);
      socket.on(Messages.DOWNLOAD_OK, resolve);
      socket.on(Messages.DOWNLOAD_ERROR, reject);
    })
  },
  onFile: callback => {
    socket.on(Messages.FILE, callback);
  }
}

export default KaraokerService;