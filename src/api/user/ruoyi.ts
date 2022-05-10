
// 添加日期范围
export function addDateRange(params:any, dateRange:any) {
  const search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && '' != dateRange) {
    search.beginTime = dateRange[0];
    search.endTime = dateRange[1];
  }
  return search;
}

export function ddDateRange2(dateRange:any, index:any) {
      let time = undefined;
      if (null != dateRange && '' != dateRange) {
        if (dateRange.length <= 2) {
          time = dateRange[index];
        }
      }
      return time;
    }
// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str:any) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}
export function praseStrZero(str:any) {
  if (!str || str == "undefined" || str == "null") {
    return 0;
  }
  return str;
}
//导出表格下载
const baseURL = process.env.BASE_URL
export function download(fileName:any) {
  window.open(baseURL+'api' + fileName)
}
