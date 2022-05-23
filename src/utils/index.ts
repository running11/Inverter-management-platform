import CryptoJS from "crypto-js";

/**
 * 递归-----查询 树组件 父节点
 * @param {Object} node      树的源数据
 * @param {Object} name      节点的name
 * @returns {Object} temp    返回的父节点数据
 */
export function queryParentNode(node: any, name: string, temp = undefined) {
  let parentNode = null;
  for (let i = 0; i < node.length; i++) {
    const obj = node[i];
    if (!obj || !obj.children) {
      break;
    }
    // console.log(obj, name);
    if (obj.name === name) {
      temp = obj;
      break;
    } else {
      if (obj.children) {
        parentNode = obj;
        queryParentNode(obj.children, name);
      } else {
        break;
      }
    }
  }
  return parentNode;
}

/**
 * 递归-----查询 树组件 父节点
 * @param {Object} node      树的源数据
 * @param {Object} name      节点的name
 * @returns {Object} temp    返回的父节点数据
 */
export function getTreeItem(node: any, name: string) {
  let result: any = null;
  for (let i = 0; i < node.length; i++) {
    const obj = node[i];
    if (obj.name === name) {
      result = obj;
      return result;
    }else{
      if(obj.children){
        result = getTreeItem(obj.children, name);
        if (result) return result;
      }
    }
  }
  // return result;
}

// 判断是否为数组
const isArr = (origin: any): boolean => {
  const str = "object Array";
  return Object.prototype.toString.call(origin) == str ? true : false;
};

export function deepClone<T>(origin: T, target?: Record<string, any> | T): T {
  const tar = target || {};

  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && typeof origin[key] !== null) {
        tar[key] = isArr(origin[key]) ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar as T;
}

// 根据compyId获取该节点的所有父节点的对象
export function getParentId(list: any, compyId: number|string) {
  for (const i in list) {
      if(list[i].compyId == compyId){
      return [list[i].compyId];
    }
    if(list[i].children){
      const node: any = getParentId(list[i].children, compyId);
      if(node!==undefined){
        return node.concat(list[i].compyId)
      }
    }
  }        
}

const SECRET_KEY = CryptoJS.enc.Utf8.parse("1234123412341234");
const SECRET_IV = CryptoJS.enc.Utf8.parse("1234123412341234");
/** 
 * 加密
 * @param data
 * @returns {string}
 */
export function encrypt(data: any){
  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.log("encrypt error:", error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

/** 
 * 解密
 * @param data
 * @returns {string}
 */
export function decrypt(data: any) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/** 
 * 根据传入的值，返回对应的中文name，常用的地方是表格那里
 * @param {list}      源数据
 * @param {id}        传入的值
 * @returns {string}
 */
export function getLable(list: [], id: number | string, value: any, label: string){
  if(id != '' && Array.isArray(list) && list.length != 0){
    return !list.find(item => item[value] == id) ? id : list.find(item => item[value] == id)![label];
  }else{
    return id;
  }
}

/**
 * 后端返回的[{last_row(vai34): 0,
      last_row(vai35): 0,
      last_row(vai36): 0,
      last_row(vai86): 0}]
 * 返回 [{vai34: 0}, {vai35: 0}, ....]
 * @param {List} node      list
 * @returns {Object} temp   
 */
export function handleArrDimension(list: any){
  const arr: any = [];
  const reg = /[^(][a-zA-Z0-9_]+(?=\))/g;
  for(let i = 0; i < list.length; i++) {
    for(const j in list[i]){
      const key = j.match(reg)![0];
      const obj = {
        key: key,
        value: list[i][j]
      }
      arr.push(obj);
    }
  }
  return arr;
}
