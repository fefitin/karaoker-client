import React, { useState } from 'react';

const Form = ({ download }) => {

  const [ url, setURL ] = useState('');
  const example = process.env.REACT_APP_EXAMPLE_URL;

  const onChange = e => {
    e.preventDefault();
    setURL(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    download(url);
  }

  const loadExample = () => {
    setURL(example);
    download(example);
  }

  return <form className="load-video" onSubmit={onSubmit}>
    <input placeholder="URL de YouTube" type="text" value={url} onChange={onChange} />
    <button type="submit">Cargar</button>
    <p>Ej: <span onClick={loadExample}>{example}</span></p>
  </form>;
};

export default Form;