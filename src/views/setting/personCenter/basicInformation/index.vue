<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="userInfo"
        ref="userFrom"
        status-icon
        :hide-required-asterisk="isHide"
      >
        <el-form-item
          label="用户名称"
          prop="userName"
          :rules="{
            required: true,
            message: '用户名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="userInfo.userName" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="邮件地址"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="userInfo.email" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phonenumber"
          :rules="[
            {
              required: true,
              trigger: 'blur',
              validator: validPhone,
            },
          ]"
        >
          <el-input v-model="userInfo.phonenumber" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="nickName"
          :rules="{
            required: true,
            message: '请输入角色',
            trigger: 'blur',
          }"
        >
          <el-input v-model="userInfo.nickName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" :offset="3">
      <div class="rightbox">
        <span>头像</span>
        <div class="imgbox">
          <img :src="imageUrl" alt="" />
        </div>
      </div>

      <el-upload
        class="avatar-uploader"
        ref="upload"
        action="#"
        :show-file-list="false"
        :http-request="handelUpload"
        :before-upload="beforeUpload"
      >
         
        <el-button size="small" icon="el-icon-upload2">更换头像</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { isvalidPhone } from "@/utils/validate";
import service from "@/utils/request";

interface user {
  // [key: string]: any;
  userId: number;
  userName: string;
  nickName: string;
  email: string;
  remark: string;
  phonenumber: string;
  sex: number;
}

@Component
export default class basicInformation extends Vue {
  private labelPosition = "top";
  private isHide = true;
  private userInfo: user = {
    userId: 0,
    userName: "",
    nickName: "",
    email: "",
    remark: "",
    phonenumber: "",
    sex: 0,
  };
  private postGroup = ""; //接口返回字段，暂时不知道怎么用
  private roles = []; //接口返回字段，暂时不知道怎么用
  private imageUrl = "";

  mounted(): void {
    this.fetchData();
  }
  get headers() {
    return { token: window.localStorage.getItem("token") };
  }
  //获取用户信息
  fetchData(): void {
    service({
      method: "get",
      url: "/api/system/user/profile",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log("7777", res.data.data);
          this.postGroup = res.data.data.postGroup;
          this.roles = res.data.data.roles;
          this.userInfo.userId = res.data.data.user.userId;
          this.userInfo.userName = res.data.data.user.userName;
          this.userInfo.nickName = res.data.data.user.nickName;
          this.userInfo.email = res.data.data.user.email;
          this.userInfo.remark = res.data.data.user.remark;
          this.userInfo.phonenumber = res.data.data.user.phonenumber;
          this.userInfo.sex = parseInt(res.data.data.user.sex);
          this.imageUrl = res.data.data.user.avatar 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validPhone(rule: any, value: number, callback: any): void {
    if (!value) {
      callback(new Error("请输入手机号码"));
    } else if (!isvalidPhone(value)) {
      callback(new Error("请输入正确的11位手机号码"));
    } else {
      callback();
    }
  }
  //提交修改的用户信息
  submit(): void {
    (this.$refs.userFrom as Form).validate((valid: boolean) => {
      if (valid) {
        alert(valid);

        const paramsData = JSON.stringify(this.userInfo);
        console.log(paramsData, "提交");
        service({
          method: "put",
          url: "/api/system/user/profile",
          params: {},
          data: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              console.log("33333", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // else {
      //   alert("error submit!!");
      //   return false;
      // }
    });
  }

  resetForm(): void {
    (this.$refs.userFrom as Form).resetFields();
  }

  // 上传预处理
  beforeUpload(file: any) {
    if (file.type.indexOf("image/") == -1) {
      alert("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        alert( this.imageUrl)
      };
    }
  }
  handelUpload(file: any) {
  
    console.log("888", file);
    let fileData = new FormData();
    fileData.append("picture", file.file);
    service({
      method: "post",
      url: "/api/system/user/profile/Avatar",
      data: fileData,
        headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        if (res && res.data.code === 200) {
            console.log("11", res.data);
            this.imageUrl= res.data
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style lang="scss" scoped>
.rightbox {
  display: flex;
  flex-direction: column;
  span {
    display: block;
    padding-top: 12px;
    color: $gray;
    margin-bottom: 10px;
  }
  .imgbox {
    width: 200px;
    height: 200px;
    overflow: hidden;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
      
    }
  }
}

</style>
