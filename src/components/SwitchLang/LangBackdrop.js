import React, { useEffect } from 'react';

const LangBackdrop = ({ onClose }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code !== 'Escape') return;
      window.removeEventListener('keydown', handleEscape);
      onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-10"
      onClick={onClose}
    ></div>
  );
};

export default LangBackdrop;
