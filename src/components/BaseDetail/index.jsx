import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';

class BaseDetail extends Component {
  constructor(props) {
    super(props);
  }

  fmtInfo(v) {
    const data = this.props.formData;
    if (v.format) {
      return v.format(data, v.key);
    } else if (v.render) {
      return v.render(data, v.key);
    } else {
      return data[v.key] || ''
    }
  }

  render() { 
    return (
      <>
        <Form
          layout="horizontal"
        >
          <Row>
            {
              this.props.configs.map(v => {
                return (
                  <Col
                    span={v.span || this.props.colSpan}
                    key={v.key}
                  >
                    <Form.Item label={v.label}>
                      <div>
                        { this.fmtInfo(v) }
                      </div>
                    </Form.Item>
                  </Col>
                )
              })
            }
          </Row>
        </Form>
      </>
    );
  }
}

// 类型检查
BaseDetail.propTypes = {
  colSpan: PropTypes.number,
  configs: PropTypes.array,
  formData: PropTypes.object
}

// 设置默认值
BaseDetail.defaultProps = {
  colSpan: 8,
  formData: {},
  configs: []
}

export default BaseDetail;
