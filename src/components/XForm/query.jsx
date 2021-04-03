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
import './query.less';

const ComponetsMap = {
  input: ProFormText,
  select: ProFormSelect,
  radio: ProFormRadio,
  checkbox: ProFormCheckbox,
  date: ProFormDatePicker,
  dateTime: ProFormDateTimePicker,
  dateMonth: ProFormDatePicker.Month,
  dateYear: ProFormDatePicker.Year,
  radioGroup: ProFormRadio.Group,
  checkBoxGroup: ProFormCheckbox.Group,
  dateRange: ProFormDateRangePicker,
  dateTimeRange: ProFormDateTimeRangePicker,
};

class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {
        layout: 'horizontal',
        autoComplete: 'off',
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
      const item = { ...v };
      item.show = typeof item.show !== 'function' ? item.show : () => true;
      item.disabled = item.hasOwnProperty('disabled') || (() => false);
      if (item.render) {
        item.render = item.render.bind(this);
      }
      return item;
    });
    return (
      <div className="query-filter">
        <QueryFilter
          {...formConfig}
          onValuesChange={(curVal, values) => this.handleChange(curVal, values)}
        >
          {formModel.map((v, index) =>
            v.show(this.state.formData, this.props.formModel) ? this.ceateElement(v, index) : null,
          )}
        </QueryFilter>
      </div>
    );
  }

  componentDidMount() {
    this.props.onRef?.(this);
  }

  ceateElement(item, index) {
    const v = { ...item };
    const Com = v.render ? v.render : ComponetsMap[v.type];
    v.disabled = this.setDisabled(v, this.state.formData);
    return (
      <Com
        key={v.prop || index}
        name={v.prop}
        label={v.label}
        rules={v.rules}
        disabled={v.disabled}
        placeholder={this.setPlaceholder(v)}
        {...(v.attrs || {})}
      ></Com>
    );
  }

  handleChange(curVal, values) {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          ...curVal,
        },
      },
      () => {
        this.props.onValuesChange?.(curVal, values);
      },
    );
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
    if (v.type === 'input') {
      return `请输入${v.label}`;
    }
    return (
      {
        select: `请选择${v.label}`,
        date: `请选择${v.label}`,
        dateTime: `请选择${v.label}`,
        dateYear: `请选择${v.label}`,
        dateMonth: `请选择${v.label}`,
        dateRange: [`请选择`, `请选择`],
        dateTimeRange: [`请选择`, `请选择`],
      }[v.type] || '请选择'
    );
  }
}

export default QueryForm;
