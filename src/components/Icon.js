import React from 'react';
import icons from '../assets/images/sprite.svg';
import PropTypes from 'prop-types';

export default function Icon({ iconId, className }) {
  return (
    <svg className={className}>
      <use href={`${icons}#${iconId}`}></use>
    </svg>
  );
}

Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  className: PropTypes.string,
};
