import React from 'react';
import PropTypes from 'prop-types';

export default function PlusIconComponent({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      fill="#3B82F6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
        fill="#3B82F6"
      ></path>

      <path
        d="M13 9V13M13 13V17M13 13H17M13 13H9M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
        stroke="#E0E7FF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}

PlusIconComponent.propTypes = {
  className: PropTypes.string.isRequired,
};
