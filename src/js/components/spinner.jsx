import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import spinnerImg from './../../img/robber.gif';



@connect(store => ({
  loading: store.status.loading
}))
export default class Spinner extends React.Component
{
  render ()
  {
    const { loading } = this.props;
    return (
      <div id="loading-message" className={ classnames('message', { active: loading }) }>
        <b>Loading .. </b>
        <img src={ spinnerImg } />
      </div>
    );
  }
}
