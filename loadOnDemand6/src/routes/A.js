import React from 'react';
import PropTypes from 'prop-types';
import * as reactRedux from 'react-redux';
import BaseContainer from '../../../containers/ReactBaseContainer';

class A extends BaseContainer {
  constructor(props) {
    super(props);
    this.renderCustom = function renderCustom() {
      return (
        <div >
          Hello world In A
        </div>
      );
    };
  }
  render() {
    // 返回父级view
    return super.render();
  }
}

A.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { state };
}

export default reactRedux.connect(mapStateToProps)(A);
