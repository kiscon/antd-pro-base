import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

const BaseMap = () => {

  return (
    <div>
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
        <ProFormText name="status" label="应用状态" />
        <ProFormDatePicker name="startdate" label="响应日期" />
        <ProFormDateRangePicker name="create" label="创建时间" />
      </QueryFilter>
    </div>
  )
}

export default BaseMap;
