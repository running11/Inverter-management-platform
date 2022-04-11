import { getLanguage, setLanguage } from "@/utils/language";

interface IState {
  language: string;
}

const state: IState = {
  language: getLanguage() || "",
};

const getters = {
  getLanguageValue: (state: IState) => state.language,
};

const mutations = {
  updateLanguageValue(state: IState, data: string) {
    setLanguage(data);
    state.language = data;
  },
};

export default { state, getters, mutations };
