import React from 'react';
import Container from './Container';
import PropTypes from 'prop-types';

function Section({ children, styles = '' }) {
  return (
    <section className={`section ${styles}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;

Section.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node.isRequired,
};
