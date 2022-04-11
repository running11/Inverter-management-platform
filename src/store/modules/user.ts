import { getToken, setToken } from "@/utils/auth";

interface IState {
  token: string;
}

const state: IState = {
    token: getToken() || "",
};

const getters = {
  getTokenValue: (state: IState) => state.token,
};

const mutations = {
  updateTokenValue(state: IState, data: string) {
    setToken(data);
    state.token = data;
  },
};

export default { state, getters, mutations };
