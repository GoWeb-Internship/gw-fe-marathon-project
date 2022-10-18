import React from 'react';
import Container from './Container';

function Section({ children, styles = '', sectionName = '' }) {
  return (
    <div className={`section ${sectionName} ${styles}`}>
      <Container>{children}</Container>
    </div>
  );
}

export default Section;
