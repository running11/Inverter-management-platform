<template>
  <div class="language-wrapper">
    <el-select class="select" v-model="locale" placeholder="请选择" @change="changeLanguage">
      <el-option
        v-for="item in languageList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

interface ILanguage {
  value: string;
  label: string;
}

@Component
export default class SelectLanguage extends Vue {
  @Getter getLanguageValue: any;
  @Mutation updateLanguageValue: any;

  locale = "";
  languageList: ILanguage[] = [
    {
      value: "zh-CN",
      label: "简体中文",
    },
    {
      value: "zh-TW",
      label: "繁体中文",
    },
    {
      value: "en-US",
      label: "English",
    },
    {
      value: 'ja-JP',
      label: '日本語'
    }
  ];

  created() {
    this.locale = this.getLanguageValue || "zh-CN";
  }

  changeLanguage(value: string): void {
    this.updateLanguageValue(value);
    this.$i18n.locale = value;
    window.location.reload();
  }
}
</script>
<style lang="scss" scoped>
.language-wrapper {
  width: 110px;
  margin-right: 15px;
  ::v-deep.el-select,
  ::v-deep.el-input {
    height: $header-height;
  }
  ::v-deep.el-input__inner {
    background: $main-color url('~@/assets/images/icon_map.png') 0 center no-repeat;
    background-size: 20px;
    padding-left: 22px;
    height: $header-height;
    line-height: $header-height;
    border: none;
    color: $white;
    font-size: 15px;
  }
  ::v-deep.el-select .el-input .el-select__caret {
    display: none;
  }
  ::v-deep.el-input--suffix .el-input__inner{
    padding-right: 0;
  }
}
</style>
