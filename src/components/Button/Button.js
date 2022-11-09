import React from 'react';
import PropTypes from 'prop-types';
import { dayButton } from './Button.module.css';

const Button = ({ children, ...props }) => {
  return (
    <button className={`${dayButton} dark:hover:border-accent`} {...props}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.string,
  props: PropTypes.object,
};
