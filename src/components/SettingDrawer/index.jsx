import React, { Fragment, useState } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { useIntl, connect } from 'umi';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockCheckbox from './BlockCheckbox';

const { Option } = Select;

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

const renderLayoutSettingItem = item => {
  const action = React.cloneElement(item.action, {
    disabled: item.disabled,
  });
  return (
    <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
      <List.Item actions={[action]}>
        <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
      </List.Item>
    </Tooltip>
  );
};


const SettingDrawer = (props) => {
  const { dispatch, settings } = props;
  const { navTheme, primaryColor, layout, colorWeak } = settings;
  const { formatMessage } = useIntl();
  const [ collapse, setCollapse ] = useState(false);
 
  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const togglerContent = () => {
    const isCollapsed = !collapse
    setCollapse(isCollapsed)
    handleMenuCollapse(collapse)
  };

  const changeSetting = (key, value) => {
    const nextState = { ...settings };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'top' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }
    if (dispatch) {
      dispatch({
        type: 'settings/changeSetting',
        payload: nextState
      });
    }
  }

  const getLayoutSetting = (props) => {
    const {
      settings: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
    } = props;
    const { formatMessage } = useIntl();
    return [
      {
        title: formatMessage({ id: 'app.setting.content-width' }),
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {formatMessage({ id: 'app.setting.content-width.fixed' })}
              </Option>
            )}
            <Option value="Fluid">
              {formatMessage({ id: 'app.setting.content-width.fluid' })}
            </Option>
          </Select>
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedheader' }),
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => changeSetting('fixedHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.hideheader' }),
        disabled: !fixedHeader,
        disabledReason: formatMessage({ id: 'app.setting.hideheader.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => changeSetting('autoHideHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedsidebar' }),
        disabled: layout === 'topmenu',
        disabledReason: formatMessage({ id: 'app.setting.fixedsidebar.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  return (
    <>
      <div
        className={styles.handle}
        onClick={togglerContent}
        style={collapse ? { right: '300px' } : { right: '0' }}
      >
        { collapse ? <CloseOutlined /> : <SettingOutlined /> }
      </div>
      <Drawer
        visible={collapse}
        width={300}
        onClose={togglerContent}
        placement="right"
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.content}>
          <Body title={formatMessage({ id: 'app.setting.pagestyle' })}>
            <BlockCheckbox
              list={[
                {
                  key: 'dark',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: formatMessage({ id: 'app.setting.pagestyle.dark' }),
                },
                {
                  key: 'light',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: formatMessage({ id: 'app.setting.pagestyle.light' }),
                },
              ]}
              value={navTheme}
              onChange={value => changeSetting('navTheme', value)}
            />
          </Body>
          {/* <ThemeColor
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
            onChange={color => changeSetting('primaryColor', color)}
          /> */}
          <Divider />
          <Body title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockCheckbox
              list={[
                {
                  key: 'side',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'top',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  title: formatMessage({ id: 'app.setting.topmenu' }),
                },
              ]}
              value={layout}
              onChange={value => changeSetting('layout', value)}
            />
          </Body>  
          <List
            split={false}
            dataSource={getLayoutSetting(props)}
            renderItem={renderLayoutSettingItem}
          />
          <Divider />
          <Body title={formatMessage({ id: 'app.setting.othersettings' })}>
            <List
              split={false}
              renderItem={renderLayoutSettingItem}
              dataSource={[
                {
                  title: formatMessage({ id: 'app.setting.weakmode' }),
                  action: (
                    <Switch
                      size="small"
                      checked={!!colorWeak}
                      onChange={checked => changeSetting('colorWeak', checked)}
                    />
                  ),
                },
              ]}
            />
          </Body>
        </div>
      </Drawer>
    </>
  );
}

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(SettingDrawer);
