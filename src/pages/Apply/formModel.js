import { Input, DatePicker, Switch, Checkbox, Select } from 'antd';

export default {
  name: {
    label: '客户',
    component: Input,
    rules: [{ required: true }],
    attrs: {
      allowClear: true,
    },
  },
  time: {
    label: '日期',
    component: DatePicker,
    rules: [{ required: true }],
  },
  type: {
    label: '成交方式',
    component: Select,
    attrs: {
      options: [
        { label: 't6', value: 1 },
        { label: 't7', value: 2 },
        { label: 't8', value: 3 },
      ],
    },
  },
  status: {
    label: '是否收款',
    component: Switch,
    valueKey: 'checked', // valueKey => 组件的取值属性，默认为value
  },
  sex: {
    label: '性别',
    component: Checkbox,
    valueKey: 'checked',
  },
};
