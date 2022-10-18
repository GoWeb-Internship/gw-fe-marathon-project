import React from 'react';

const Button = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-700 rounded border-2 duration-300 border-blue-700 text-white py-4 px-8 hover:text-blue-700 hover:bg-white"
    >
      {text}
    </button>
  );
};

export default Button;
