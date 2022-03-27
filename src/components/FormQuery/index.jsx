import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { isTrue, getObjType } from '@/utils/common';
import * as cfg from './config';
import './index.less';

export default forwardRef(function QForm(props, ref) {
  const formData = getObjType(props.vModel) === 'Object' ? props.vModel : {};
  const config = Object.assign({}, props.formModel);
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    ...form,
    getData() {
      return form.getFieldsValue();
    },
    validate(...args) {
      return form.validateFields(...args);
    },
    setValue
  }));
  function setValue(key, v, vstr) {
    Object.assign(
      formData,
      { [key]: v },
      vstr && typeof vstr === 'string' ? { [key + 'Str']: vstr } : {}
    );
    form.setFieldsValue({
      [key]: v
    });
  }
  function Child(props) {
    const { component, onChange, ...attrs } = props;
    const Component = component || Input;
    const valueKey = attrs.valuekey || 'value';
    const [iValue, setIValue] = useState(form.getFieldValue(props.prop));
    if (iValue !== form.getFieldValue(props.prop)) {
      setIValue(form.getFieldValue(props.prop));
    }
    attrs[valueKey] = iValue;
    return (
      <Component
        {...attrs}
        data={formData}
        form={ref}
        onChange={(value, valStr) => {
          if (!isTrue(value)) value = '';
          const val = value.target ? value.target[valueKey] : value;
          typeof onChange === 'function' && onChange(val);
          setValue(props.prop, val, valStr);
          setIValue(val);
        }}
      ></Component>
    );
  }
  return (
    <Form {...Object.assign({}, cfg.form, props.form)} form={form} initialValues={formData}>
      <Row {...Object.assign({}, cfg.row, props.row)}>
        {Object.entries(config).map(([key, val], index) => (
          <Col {...Object.assign({}, cfg.col, val.col)} key={index}>
            <Form.Item
              shouldUpdate={(p, c) => {
                return p[key] !== c[key];
              }}
              {...Object.assign({}, cfg.formItem, val.formItem)}
              label={val.label}
              name={key}
              rules={val.rules}
            >
              <Child
                {...Object.assign({ component: val.component }, val.attrs)}
                prop={key}
                valuekey={val.valueKey}
              ></Child>
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
});
