import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Backdrop({ className, handleCloseFunction, flag }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code !== 'Escape') return;
      if (e.code === 'Escape' && flag) {
        window.removeEventListener('keydown', handleEscape);
        handleCloseFunction();
        console.log(flag);
        console.log('toggle');
      }
      if (e.code === 'Escape' && !flag) {
        console.log(flag);
        console.log('return');
        return;
      }
    };

    if (!flag) {
      window.removeEventListener('keydown', handleEscape);
      console.log('remove');
      return;
    } else {
      window.addEventListener('keydown', handleEscape);
      console.log('add');
    }

    // window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [flag, handleCloseFunction]);

  return <div className={className} onClick={handleCloseFunction}></div>;
}

Backdrop.propTypes = {
  className: PropTypes.string,
  handleCloseFunction: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
};
