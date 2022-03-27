import React, { Component } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import BaseDetail from '@/components/FormDetail';
import InfoList from '@/components/InfoList';

const useMode = [
  {
    value: 'chapter',
    label: '盖章后生效',
  },
];

const configs = [
  {
    label: '签约客户名称',
    key: 'name',
  },
  {
    label: '合同约定生效方式',
    key: 'useMode',
    format: (data, key) => {
      return useMode.find((v) => v.value === data[key]).label;
    },
  },
  {
    label: '附件信息',
    key: 'C',
    render: () => {
      return <Button>按钮</Button>;
    },
  },
];

const dataList = [
  {
    label: '姓名',
    value: 'k',
    key: 'name',
  },
  {
    label: '电话',
    value: '13566668888',
    key: 'telephone',
  },
  {
    label: '年龄',
    value: '18',
    key: 'age',
  },
  {
    label: '性别',
    value: '1',
    key: 'sex',
    format: (v) => {
      return (
        {
          1: '男',
          0: '女',
        }[v] || ''
      );
    },
  },
];

class Detail extends Component {
  state = {
    formData: {
      name: '前端技术',
      useMode: 'chapter',
    },
  };

  render() {
    return (
      <PageContainer
        ghost
        header={{
          title: '基础详情',
        }}
        style={{
          backgroundColor: '#fff',
          padding: 24,
        }}
      >
        <h3>FormDetail</h3>
        <BaseDetail configs={configs} formData={this.state.formData} />
        <h3>InfoList</h3>
        <InfoList list={dataList} col={'2'} />
      </PageContainer>
    );
  }
}

export default Detail;
