import React from 'react';
import CMS from 'netlify-cms-app';

export const IdControl = props => {
  const DateTimeControl = CMS.getWidget('datetime').control;
  return (
    <div style={{ display: 'none' }}>
      <DateTimeControl {...props} />
    </div>
  );
};
