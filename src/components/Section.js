import React from 'react';
import Container from './Container';

function Section({ children, styles = '', sectionName = '' }) {
  return (
    <section className={`section ${sectionName} ${styles}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
