import { RouteConfig } from "vue-router";
import { routes } from "@/router";

interface State {
  routesList: Array<RouteConfig>;
}

const state: State = {
  routesList: routes,
};

const getters = {
  getRoutesList: (state: State) => state.routesList,
};

const mutations = {};

const actions = {};

export default { state, getters, mutations, actions };
