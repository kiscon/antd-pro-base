import React, { Component } from 'react';
import { Form, Input, Select, Radio, Checkbox, DatePicker, Button } from 'antd';
import './index.less';

const ComponetsMap = {
  input: Input,
  select: Select,
  radio: Radio,
  checkbox: Checkbox,
  date: DatePicker,
  textarea: Input.TextArea,
  radioGroup: Radio.Group,
  checkBoxGroup: Checkbox.Group,
  dateRange: DatePicker.RangePicker,
};
class XForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {
        layout: 'horizontal',
        autoComplete: 'off',
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 7,
        },
      },
      formData: {},
    };
    this.ceateElement = this.ceateElement.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const formConfig = {
      ...this.state.formConfig,
      ...(this.props.options || {}),
    };
    let formModel = this.props.formModel || [];
    formModel = formModel.map((v) => {
      let item = { ...v };
      typeof item.show !== 'function' && (item.show = () => true);
      item.hasOwnProperty('disabled') || (item.disabled = () => false);
      item.render && (item.render = item.render.bind(this));
      return item;
    });
    return (
      <Form {...formConfig} ref={this.formRef}>
        {formModel.map((v, index) =>
          v.show(this.state.formData, this.props.formModel) ? (
            <Form.Item key={v.prop || index} name={v.prop} label={v.label} rules={v.rules}>
              {this.ceateElement(v)}
            </Form.Item>
          ) : null,
        )}
        {this.props.buttons ? this.setButton(this.props.buttons, formConfig) : null}
      </Form>
    );
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  ceateElement(v) {
    const Component = v.render ? v.render : ComponetsMap[v.type];
    v.disabled = this.setDisabled(v, this.state.formData);
    return (
      <Component
        {...(v.attrs || {})}
        disabled={v.disabled}
        placeholder={this.setPlaceholder(v)}
        allowClear={v.hasOwnProperty('allowClear') ? v.allowClear : true}
        onChange={($event) => {
          this.handleChange($event, v);
        }}
      >
        {v.type === 'select' ? this.setOption(v) : null}
      </Component>
    );
  }

  setOption(v) {
    return v.options.map((e, index) => {
      return (
        <Select.Option key={`${index}${e.value}`} value={e.value} disabled={!!e.disabled}>
          {e.label}
        </Select.Option>
      );
    });
  }

  setButton(v, config) {
    return (
      <Form.Item
        wrapperCol={{
          offset: config.labelCol ? config.labelCol.span : 3,
          span: config.wrapperCol ? config.wrapperCol.span : 7,
        }}
      >
        {v.map((e, index) => {
          return (
            <Button
              {...v.attrs}
              key={index}
              type={e.type}
              onClick={e.func && e.func.bind(this, this.formRef, e)}
              style={{
                marginRight: 20,
              }}
            >
              {e.label}
            </Button>
          );
        })}
      </Form.Item>
    );
  }

  handleChange($event, v) {
    let value = $event && $event.target ? $event.target.value : $event;
    this.setState(
      {
        formData: {
          ...this.state.formData,
          [v.prop]: value,
        },
      },
      () => {
        v.onChange && v.onChange(value, this.state.formData);
      },
    );
  }

  validate() {
    return this.formRef.current.validateFields();
  }

  reset() {
    this.setState({
      formData: {},
    });
    this.formRef.current.resetFields();
  }

  setDisabled(v, data) {
    if (v.disabled && typeof v.disabled === 'function') {
      return v.disabled(data);
    }
    return !!v.disabled;
  }

  setPlaceholder(v) {
    if (v.attrs && v.attrs.hasOwnProperty('placeholder')) {
      return v.attrs.placeholder;
    }
    return (
      {
        input: `请输入${v.label}`,
        textarea: `请输入${v.label}`,
        select: `请选择${v.label}`,
        date: `请选择${v.label}`,
      }[v.type] || ''
    );
  }
}

export default XForm;
