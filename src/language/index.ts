import Vue from "vue";
import VueI18n from "vue-i18n";
import locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import twLocale from "element-ui/lib/locale/lang/zh-TW";
import jaLocale from "element-ui/lib/locale/lang/ja";
import { getLanguage } from "@/utils/language";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: getLanguage() || "zh-CN",
  messages: {
    "zh-CN": Object.assign(require("@/language/zh.ts"), zhLocale), // 中文语言包
    "zh-TW": Object.assign(require("@/language/tw.ts"), twLocale),
    "en-US": Object.assign(require("@/language/en.ts"), enLocale),
    "ja-JP": Object.assign(require("@/language/ja.ts"), jaLocale),
  },
  silentFallbackWarn: true,
  silentTranslationWarn: true,
});

locale.i18n((key: any, value: any) => i18n.t(key, value));
// Vue.locale = (locale: any) => {};

export default i18n;
