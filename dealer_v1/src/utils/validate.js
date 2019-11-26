/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

export function validUserEmail(rule, value, callback) {
  //   const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/; // 邮箱地址
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  if (!value) {
    callback(new Error('账号不能为空'));
  } else {
    callback();
  }
}

export function isPassword(rule, value, callback) {
  if (value == '' || value == undefined || value == null) {
    callback(new Error('请输入密码'));
  } else {
    callback()
  }
} 