import React, { PureComponent } from 'react';
import { PROP_TYPES } from '@constants';

import './styles.scss';

class File extends PureComponent {
  render() {
    return (
      <div className="rcw-snippet">
        <h5 className="rcw-snippet-title">
          { this.props.message.get('title') }
        </h5>
        <div className="rcw-file-details">
          <img src={this.props.message.get('link')} />
        </div>
      </div>
    );
  }
}

File.propTypes = {
  message: PROP_TYPES.SNIPPET
};

export default File;
