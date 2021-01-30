import React, { useState, useEffect, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import QueryForm from '@/components/XForm/query';
import { aMapAk } from '@/utils/common';

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
    prop: 'selectDate',
    attrs: {
      transform: (value) => ({
        startTime: value[0],
        endTime: value[1]
      })
    }
  },
  {
    type: 'dateYear',
    label: '年份',
    prop: 'year'
  },
  {
    type: 'dateMonth',
    label: '月份',
    prop: 'month'
  },
  {
    type: 'dateTime',
    label: '时间',
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
  const form = createRef();
  const [formModel, setFormModel] = useState(formList);
  const [map, setMap] = useState(null);

  const initMap = () => {
    const map = new AMap.Map('Map', {
      resizeEnable: true,
      center: [117.000923, 36.675807],
      zoom: 5,
      expandZoomRange: true
    })
    AMap.plugin([
      'AMap.ToolBar',
      'AMap.Scale'
    ], () => {
      map.addControl(new AMap.ToolBar())
      map.addControl(new AMap.Scale())
    })
    setMap(map)
  }

  useEffect(() => {
    aMapAk().then(_ => initMap())
  }, [])


  
  return (
    <PageContainer
      ghost
      header={{
        title: '基础地图',
      }}
    >
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
      <div
        id="Map"
        style={{
          height: 500,
          width: '100%',
          backgroundColor: '#f5f6f8',
          marginTop: 24
        }}
      >
      </div>
    </PageContainer>
  )
}

export default BaseMap;
