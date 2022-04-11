import Vue from "vue";
import Vuex from "vuex";
import permission from "@/store/modules/permission";
import language from "@/store/modules/language";
import auth from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    permission,
    language,
    auth
  },
});
