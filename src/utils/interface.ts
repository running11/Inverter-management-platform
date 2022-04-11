export interface ITheadColums {
  text: string;
  field?: string;
  slot?: boolean | string;
  [propName: string]: any;
}

export interface ITableList {
  [propName: string]: any;
}

export interface IPieChartData {
  name: string;
  value: number;
  [propName: string]: any;
}

export interface ILineChartList {
  name: string;
  type: string;
  data: Array<number>;
  [propName: string]: any;
}

export interface IOption {
  value: string | number;
  label: string;
}
