import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'umi';
// import { connect, SelectLang } from 'umi';
// import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: (
              <a href="https://umijs.org/zh/guide/umi-ui.html" target="_blank">
                umi ui
              </a>
            ),
            value: 'umi ui',
          },
          {
            label: (
              <a href="https://ant.design/docs/react/introduce-cn" target="_blank">
                Ant Design
              </a>
            ),
            value: 'Ant Design',
          },
          {
            label: (
              <a href="https://protable.ant.design/" target="_blank">
                Pro Table
              </a>
            ),
            value: 'Pro Table',
          },
          {
            label: (
              <a href="https://prolayout.ant.design/" target="_blank">
                Pro Layout
              </a>
            ),
            value: 'Pro Layout',
          },
          {
            label: (
              <a href="https://procomponents.ant.design/components/" target="_blank">
                Pro Components
              </a>
            ),
            value: 'Pro Components',
          },
        ]}
      />
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      {/* <Avatar /> */}
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
