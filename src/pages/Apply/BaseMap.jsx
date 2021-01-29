import React, { useState, createRef } from 'react';
import QueryForm from '@/components/XForm/query';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

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
    type: 'dateRange',
    label: '日期区间',
    prop: 'selectTime'
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    attrs: {
      valueEnum: {
        yes: '启用',
        no: '禁用',
      }
    }
  },
  {
    type: 'radioGroup',
    label: '查询频度',
    prop: 'freq',
    attrs: {
      options: [
        { label: '每周', value: 'weekly' },
        { label: '每季度', value: 'quarterly' },
        { label: '每月', value: 'monthly' },
        { label: '每年', value: 'yearly' }
      ]
    }
  },
  {
    type: 'checkBoxGroup',
    label: '行业分布',
    prop: 'hyfb',
    attrs: {
      options: [
        { label: '农业', value: 'weekly' },
        { label: '制造业', value: 'quarterly' },
        { label: '互联网', value: 'monthly' }
      ]
    }
  },
  
]

const BaseMap = () => {

  let [formModel, setFormModel] = useState(formList);
  const form = createRef();

  return (
    <div>
      <h3>QueryForm</h3>
      <QueryForm
        ref={form}
        formModel={formModel}
        options={{
          onFinish: async (val) => {
            console.log(val);
          }
        }}
      >
      </QueryForm>
      <h3>QueryFilter</h3>
      <QueryFilter
        labelWidth={120}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText name="name1" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater1" label="创建人" />
        <ProFormSelect
          name="sex"
          label="性别"
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText name="status1" label="应用状态" />
        <ProFormDatePicker name="startdate" label="响应日期" />
        <ProFormDateRangePicker name="create" label="创建时间" />
      </QueryFilter>
    </div>
  )
}

export default BaseMap;
