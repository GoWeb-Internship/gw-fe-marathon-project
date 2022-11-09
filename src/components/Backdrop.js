import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Backdrop({ className, handleCloseFunction }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code !== 'Escape') return;
      window.removeEventListener('keydown', handleEscape);
      handleCloseFunction();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleCloseFunction]);

  return <div className={className} onClick={handleCloseFunction}></div>;
}

Backdrop.propTypes = {
  className: PropTypes.string,
  handleCloseFunction: PropTypes.func.isRequired,
};
