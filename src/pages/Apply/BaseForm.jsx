import React from 'react';
import { Button, Row, Col } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ShowMsg from '@/components/Message';

const BaseForm = () => {
  return (
    <PageContainer
      ghost
      header={{
        title: '基础表单',
      }}
    >
      <ProForm
        labelCol={{ span: 3 }}
        layout="horizontal"
        style={{
          backgroundColor: '#fff',
          padding: 24
        }}
        initialValues={{
          name: '前端技术团队',
          useMode: 'chapter',
        }}
        onFinish={async (params) => {
          console.log(params);
          ShowMsg('提交成功', 'success');
        }}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            resetText: '重置',
            submitText: '提交',
          },
          // 完全自定义整个区域
          render: (props, doms) => {
            return (
              <Row>
                <Col span={3}></Col>
                <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                  提交
                </Button>,
                <Button key="rest" style={{marginLeft: 10}} onClick={() => props.form?.resetFields()}>
                  重置
                </Button>
              </Row>
            )
          },
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker
          transform={(values) => {
            return {
              startTime: values ? values[0] : undefined,
              endTime: values ? values[1] : undefined,
            };
          }}
          width="md"
          name="createTimeRanger"
          label="合同生效时间"
        />
        <ProFormDatePicker width="md" name="expirationTime" label="合同失效时间" />
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="md"
          name="useMode"
          label="合同约定生效方式"
        />
      </ProForm>
    </PageContainer>
  );
};

export default BaseForm;
