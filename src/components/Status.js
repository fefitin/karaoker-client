import React, { useState, useEffect } from 'react';

const Status = ({ text, className = 'status' }) => {
  const [ loading, setLoading ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(loading => loading + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  
  const dots = '.'.repeat(loading%4);

  return <p className={className}>{text}{dots}</p>
}

export default Status;