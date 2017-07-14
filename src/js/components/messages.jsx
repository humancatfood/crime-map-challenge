import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';



@connect(store => ({
  error: store.status.error
}))
export default class Messages extends React.Component
{
  render ()
  {
    const { error } = this.props;

    return (
      <div id="error-message" className={ classnames('message', { active: !!error }) }>
        <b>{ error }</b>
      </div>
    );
  }

}
