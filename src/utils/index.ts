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
