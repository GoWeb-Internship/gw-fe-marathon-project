import React from 'react';
import PropTypes from 'prop-types';

function Container({ children, styles = '' }) {
  return <div className={`container ${styles}`}>{children}</div>;
}

export default Container;

Container.propTypes = {
  styles: PropTypes.string,
};
