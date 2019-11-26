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

export function validUserEmail(rule,value,callback){
  if(!value){
    callback(new Error('账号不能为空'));
  }else{
    callback();
  }
}

export function isPassword(rule,value,callback){
  if(value == ''||value==undefined||value==null){
    callback(new Error('请输入密码'));
  }else{
    callback()
  }
} 