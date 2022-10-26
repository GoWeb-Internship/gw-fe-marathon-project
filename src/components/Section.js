import React from 'react';
import Container from './Container';

function Section({ children, styles = '' }) {
  return (
    <section className={`section ${styles}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
