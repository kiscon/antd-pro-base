import React, { useState, createRef, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ShowMsg from '@/components/ShowMsg';
import XForm from '@/components/XForm';

const formList = [
  {
    type: 'input',
    label: '姓名',
    prop: 'pname',
    rules: [
      { required: true, message: '必填项' }
    ]
  },
  {
    type: 'input',
    label: '登录名',
    prop: 'loginName',
    disabled: (v) => {
      // console.log(v);
      return !v.pname
    }
  },
  {
    type: 'input',
    label: '密码',
    prop: 'repassword',
    disabled: true,
    show: (v) => !!v.pname,
    attrs: {}
  },
  {
    type: 'input',
    label: '电子邮箱',
    prop: 'email'
  },
  {
    type: 'input',
    label: '手机号',
    prop: 'mobile',
  },
  {
    type: 'date',
    label: '日期',
    prop: 'createTime'
  },
  {
    type: 'textarea',
    label: '备注',
    prop: 'reamrk'
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    options: [
      { label: '启用', vlaue: 'yes' },
      { label: '禁用', vlaue: 'no' }
    ]
  }
]

const BaseForm = () => {
  let [formModel, setFormModel] = useState(formList);
  const form = createRef();
  // useEffect(() => {
  // }, [])

  return (
    <PageContainer
      ghost
      header={{
        title: '基础表单',
      }}
    >
      <h3>Form</h3>
      <XForm
        ref={form}
        formModel={formModel}
        buttons={[
          {
            label: '提交',
            type: 'primary',
            func: async () => {
              let valid = await form.current.validate();
              console.log(valid);
            }
          },
          {
            label: '重置',
            func: () => form.current?.reset()
          }
        ]}
        options={{
          style: {
            backgroundColor: '#fff',
            padding: 24
          }
        }}
      />
      <h3>ProForm</h3>
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
