import Vue from "vue";
import { routes } from "@/router";
import service from "@/utils/request";
import { Commit, MutationTree } from 'vuex';
import { getTreeItem } from "@/utils";
import { getRouteList, setRouteLIst } from "@/utils/menu";

interface PermissionState {
  routesList: any;
}

const rList = getRouteList() ? JSON.parse(getRouteList() || '0') : null;
const state: PermissionState = {
  routesList: rList|| routes,
};

const getters = {
  getRoutesList: (state: PermissionState) => state.routesList,
};

const mutations: MutationTree<PermissionState> = {
  setDeviceTypeList(state, data: any){
    console.log(routes, 11)
    const obj: any = getTreeItem(routes, 'deviceCenter');
    const list = obj.children || [];
    for (let i = 0, len = list.length; i < len; i++) {
      for (let j = 0, len2 = data.length; j < len2; j++) {
        if (list[i].name === data[j].dictLabel) {
          Vue.set(list[i].meta, 'hidden', false);
          break;
        } else {
          Vue.set(list[i].meta, 'hidden', true);
        }
      }
    }
    // 这个值，刷新的时候没保存下来，所以要存一下
    setRouteLIst(routes);
  }
};

const actions = {
  // 获取当前用户所有设备类型 侧边栏设备中心下的数据
  async getDeviceTypeList({ commit }: { commit: Commit }) {
    try {
      const res = await service.get("/api/business/EmsDevice/deviceTypeList");
      const list = res.data.data || [];
      commit('setDeviceTypeList', list);
    } catch (err) {
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };
