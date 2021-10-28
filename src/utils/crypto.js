const CryptoJS = require('crypto-js');

const KEY = 'b0996346c63d4734975cc07d6fedaa5c';

/**
 * @desc AES加密
 * @param {String} msg 加密信息
 */
export function aesEncrypt(msg) {
  const keyHex = CryptoJS.enc.Utf8.parse(KEY);
  const srcs = CryptoJS.enc.Utf8.parse(msg);
  const encrypted = CryptoJS.AES.encrypt(srcs, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
