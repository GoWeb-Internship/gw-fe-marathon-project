import React from 'react';

function Container({ children, styles = '' }) {
  return <div className={`container ${styles}`}>{children}</div>;
}

export default Container;
