import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class InfoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="detail-list">{this.setLayout()}</div>;
  }

  setLayout() {
    const { list, col } = this.props;
    if (col === '2') {
      return (
        <div className="base-info">
          <ul className="info-list list-left">
            {list.map((v, index) => {
              return index % 2 === 0 ? <li key={v.key}>{this.setListItem(v)}</li> : null;
            })}
          </ul>
          {list.length > 1 ? (
            <div className="list-right">
              <ul className="info-list">
                {list.map((v, index) => {
                  return index % 2 !== 0 ? <li key={v.key}>{this.setListItem(v)}</li> : null;
                })}
              </ul>
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <ul className="info-list">
          {list.map((v, index) => {
            return <li key={v.key}>{this.setListItem(v)}</li>;
          })}
        </ul>
      );
    }
  }

  setListItem(v) {
    return (
      <div className="list-item">
        <div className="t-title">{v.label}</div>
        <div className="t-content">{this.fmtContent(v)}</div>
      </div>
    );
  }

  fmtContent(v) {
    if (v.format) {
      return v.format(v.value);
    } else if (v.render) {
      return v.render(v, v.key);
    } else {
      return v.value;
    }
  }
}

InfoList.propTypes = {
  col: PropTypes.string,
  list: PropTypes.array,
};

InfoList.defaultProps = {
  col: '1',
  list: [],
};

export default InfoList;
