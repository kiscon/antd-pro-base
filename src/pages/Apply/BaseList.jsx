import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { Button, message, Input, Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { queryRule, updateRule, addRule, removeRule } from './service';
import ShowMsg from '@/components/ShowMsg';
import ExportDropdown from '@/components/ExportDropdown';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const BaseList = () => {
  // const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  // const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const intl = useIntl();

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '规则名称',
      dataIndex: 'name',
      render: (val, row) => {
        return (
          <a
            onClick={() => {
              // setCurrentRow(row);
              // setShowDetail(true);
            }}
          >
            {val}
          </a>
        );
      },
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInSearch: true, // 在查询表单中不展示此项
      renderText: (val, row, index) => {
        // 格式数据
        return val;
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
      render: (_, row, index) => {
        // 渲染jsx
        return row.desc;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        // 枚举列表
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      // 搜索表单自定义
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: '请输入异常原因！',
              })}
            />
          );
        }

        return defaultRender(item);
      },
    },
    {
      title: '上次调度日期',
      sorter: true,
      dataIndex: 'updatedAt1',
      valueType: 'date',
      hideInTable: true, // 在 Table 中不展示此列
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, row) => [
        <Button
          type="link"
          key="edit"
          onClick={() => {
            ShowMsg('操作编辑');
            // setCurrentRow(row);
          }}
        >
          编辑
        </Button>,
        <Button type="link" key="show" onClick={() => ShowMsg('操作查看')}>
          查看
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="基础表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            新增
          </Button>,
          <Button icon={<CloudUploadOutlined />} onClick={() => ShowMsg('操作上传')}>
            上传
          </Button>,
          <ExportDropdown onChange={(v) => ShowMsg(`${v}--操作导出`)} />,
          <Button
            disabled={!selectedRowsState.length}
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        beforeSearchSubmit={(params) => {
          // console.log(params);
        }}
      />
    </PageContainer>
  );
};

export default BaseList;
