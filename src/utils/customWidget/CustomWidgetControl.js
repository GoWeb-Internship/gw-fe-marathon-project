import React from 'react';
import CMS from 'netlify-cms-app';
import { Component } from 'react';

export class IdControl extends Component {
  render() {
    const DateTimeControl = CMS.getWidget('datetime').control;
    return (
      <div style={{ display: 'none' }}>
        <DateTimeControl {...this.props} />
      </div>
    );
  }
}
