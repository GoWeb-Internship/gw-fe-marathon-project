import React from 'react';
import CMS from 'netlify-cms-app';

export const CustomWidgetPreview = props => {
  const DateTimePreview = CMS.getWidget('datetime').preview;
  return (
    <div>
      <DateTimePreview {...props} />
    </div>
  );
};
