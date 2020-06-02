import React, { useState } from 'react';

const Form = ({ download }) => {

  const [ url, setURL ] = useState('');

  const onChange = e => {
    e.preventDefault();
    setURL(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    download(url);
  }

  return <form className="load-video" onSubmit={onSubmit}>
    <input placeholder="URL de YouTube" type="text" value={url} onChange={onChange} />
    <button type="submit">Cargar</button>
  </form>;
};

export default Form;