/**
 * @desc 统一管理系统的缓存设置/获取
 */

import storage from './storage';

// token
export const setToken = (val) => {
  const token = val || '';
  storage.set('token', token);
};

export const getToken = () => {
  return storage.get('token') || '';
};

// 用户信息
export const setUserInfo = (val) => {
  const data = val || '';
  storage.set('userInfo', data);
};

export const getUserInfo = () => {
  return storage.get('userInfo') || {};
};

// 清除缓存
export const clear = () => {
  storage.clear();
  storage.session.clear();
};
