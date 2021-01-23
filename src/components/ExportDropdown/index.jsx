import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const columns = [
  { key: 'curr', label: '导出Excel(当前页)' },
  { key: 'all', label: '导出Excel(全部)' },
]

class ExportDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleMenuSelect = this.handleMenuSelect.bind(this)
  }
  render() {
    return (
      <>
        <Dropdown
          overlay={
            <Menu onClick={this.handleMenuSelect}>
              {
                columns.map(v => <Menu.Item key={v.key}>{v.label}</Menu.Item>)
              }
            </Menu>
          }
        >
          <Button>导出 <DownOutlined /></Button>
        </Dropdown>
      </>
    );
  }
  handleMenuSelect({ key }) {
    this.props.onChange(key);
  }
}
 
export default ExportDropdown;

