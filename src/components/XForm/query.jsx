import React, { Component } from 'react';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormCheckbox,
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';

const ComponetsMap = {
  input: ProFormText,
  select: ProFormSelect,
  radio: ProFormRadio,
  checkbox: ProFormCheckbox,
  date: ProFormDatePicker,
  time: ProFormDateTimePicker,
  radioGroup: ProFormRadio.Group,
  checkBoxGroup: ProFormCheckbox.Group,
  dateRange: ProFormDateRangePicker,
  timeRange: ProFormDateTimeRangePicker,
}

class QueryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formConfig: {
        layout: 'horizontal',
        autoComplete: 'off',
      },
      formData: {}
    }
    this.ceateElement = this.ceateElement.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const formConfig = {
      ...this.state.formConfig,
      ...(this.props.options || {})
    }
    let formModel = this.props.formModel || []
    formModel = formModel.map(v => {
      let item = { ...v }
      typeof item.show !== 'function' && (item.show = () => true)
      item.hasOwnProperty('disabled') || (item.disabled = () => false)
      item.render && (item.render = item.render.bind(this))
      return item
    })
    return (
      <QueryFilter
        {...formConfig}
      >
        {
          formModel.map((v, index) => (
            v.show(this.state.formData, this.props.formModel) ? this.ceateElement(v, index) : null
          ))
        }
      </QueryFilter>
    )
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this)
  }

  ceateElement(v, index) {
    const Component = v.render ? v.render : ComponetsMap[v.type]
    v.disabled = this.setDisabled(v, this.state.formData)
    return (
      <Component
        key={v.prop || index}
        name={v.prop}
        label={v.label}
        rules={v.rules}
        disabled={v.disabled}
        placeholder={this.setPlaceholder(v)}
        {...(v.attrs || {})}
        // onChange={($event) => { this.handleChange($event, v) }}
      >
      </Component>
    )
  }

  handleChange($event, v) {
    let value = $event && $event.target ? $event.target.value : $event
    this.setState({
      formData: {
        ...this.state.formData,
        [v.prop]: value
      }
    }, () => {
      v.onChange && v.onChange(value, this.state.formData)
    })
  }

  setDisabled(v, data) {
    if (v.disabled && typeof v.disabled === 'function') {
      return v.disabled(data)
    }
    return !!v.disabled
  }

  setPlaceholder(v) {
    if (v.attrs && v.attrs.hasOwnProperty('placeholder')) {
      return v.attrs.placeholder
    }
    return {
      input: `请输入${v.label}`,
      textarea: `请输入${v.label}`,
      select: `请选择${v.label}`,
      date: `请选择${v.label}`,
      dateRange: [`请选择`, `请选择`],
      timeRange: [`请选择`, `请选择`],
    }[v.type] || ''
  }

}

export default QueryForm;
