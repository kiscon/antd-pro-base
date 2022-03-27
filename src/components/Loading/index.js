import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './index.less';

const Loading = (props) => {
  return (
    <div className="x-loading">
      <Spin {...props}></Spin>
    </div>
  );
};

Loading.propTypes = {
  tip: PropTypes.string,
  size: PropTypes.string,
};

Loading.defaultProps = {
  tip: '加载中...',
  size: 'small',
};

export default Loading;
