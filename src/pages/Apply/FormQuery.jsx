import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import FormQuery from '@/components/FormQuery';
import formModel from './formModel';

export default function TestForm(props) {
  const form = useRef({});
  const [data, setData] = useState({
    name: 'k2', // 通过 useState 默认值 给表单添加 初始数据
  });
  useEffect(() => {
    console.log(data, props, 99, [setData]);
  }, []);
  function getData() {
    console.log(form.current.getData(), 888, data); // 可使用 ref 读取表单数据 => form.current.getData。 如果使用 vModel 绑定了data ,可直接通过 data 获取 表单数据
    console.log(form.current.validate()); // 表单数据校验， 同 ant form
  }
  function setFormData() {
    setData({
      // 异步 全量 更新表单数据 ， 此时表单会重新渲染
      ...data,
      sex: true,
    });
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
  );
}
