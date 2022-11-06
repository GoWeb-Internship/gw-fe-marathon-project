import React from 'react';
import PropTypes from 'prop-types';
import { dayButton } from './Button.module.css';

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className={dayButton}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
