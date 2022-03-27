<!-- 使用 FormQuery 组件渲染数据 -->
<script>
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import FormQuery from '@/components/FormQuery';
import formModel from './formModel'; // 配置文件如下
export default function TestForm(props) {
  const form = useRef({})
  const [data, setData] = useState({
    name: 'sb' // 通过 useState 默认值 给表单添加 初始数据
  })
  useEffect(() => {
    console.log(data, props, 99, [setData])
  }, [])
  function getData() {
    console.log(form.current.getData(), 888, data) // 可使用 ref 读取表单数据 => form.current.getData。 如果使用 vModel 绑定了data ,可直接通过 data 获取 表单数据 
    console.log(form.current.validate()) // 表单数据校验， 同 ant form
  }
  function setFormData() {
    setData({ // 异步 全量 更新表单数据 ， 此时表单会重新渲染
      ...data,
      sex: true
    })
  }
  return (
    <div>
      <FormQuery
        ref={form}
        vModel={data} // 表单数据 双向绑定 data 数据，
        formModel={formModel} // 表单配置
      ></FormQuery>
      <Button onClick={getData}>get</Button>
      <Button onClick={setFormData}>set</Button>
    </div>
  )

}
</script>

<!-- formModel 配置文件 -->
<script>
import { Input, DatePicker, Switch, Checkbox } from 'antd';

export default {
  name: {
    label: '客户',
    component: Input,
    rules: [{ required: true }],
    attrs: {
      allowClear: true
    }
  },
  time: {
    label: '日期',
    component: DatePicker,
    rules: [{ required: true }]
  },
  type: {
    label: '成交方式',
    component: QSelect,
    attrs: {
      options: [
        { label: 't6', value: 1 },
        { label: 't7', value: 2 },
        { label: 't8', value: 3 }
      ]
    }
  },
  status: {
    label: '是否收款',
    component: Switch,
    valueKey: 'checked' // valueKey => 组件的取值属性，默认为value
  },
  sex: {
    label: '性别',
    component: Checkbox,
    valueKey: 'checked'
  }
};

</script>

