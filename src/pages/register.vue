<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="70px" ref="form">
      <el-form-item label="" prop="userAcct">
        <img class="userimg" src="../assets/用户名.png" alt="">
        <el-input v-model="formData.userAcct" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="userPwd">
        <img class="userimg" src="../assets/密码.png" alt="">
        <el-input type="password" v-model="formData.userPwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="confirmPwd">
        <img class="userimg" src="../assets/确认密码.png" alt="">
        <el-input type="password" v-model="formData.confirmPwd" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="phone">
        <img class="userimg" src="../assets/手机.png" alt="">
        <el-input v-model.number="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="userName">
        <img class="userimg" src="../assets/姓名.png" alt="">
        <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="idCard">
        <img class="userimg" src="../assets/身份证.png" alt="">
        <el-input v-model="formData.idCard" placeholder="请输入身份证"></el-input>
      </el-form-item>
      <el-form-item label="" prop="email">
        <img class="userimg" src="../assets/邮箱.png" alt="">
        <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="" prop="storeInvite">
        <img class="userimg" src="../assets/邀请码.png" alt="">
        <el-input v-model="formData.storeInvite" placeholder="请输入邀请码"></el-input>
      </el-form-item>
      <!-- name是接口请求的字段名 -->
      <el-form-item label="" prop="photoPath">
        <img class="userimg" src="../assets/上传头像.png" alt="">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://300217906n.picp.vip/app/uploadImage"
          :limit="1"
          name="file"
          :on-success="handleAvatarSuccess">
          <el-button size="small" type="primary">点击上传头像</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="" prop="sex">
        <img class="userimg" src="../assets/性别 (1).png" alt="">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary"
          @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from '../fetch'
import axios from 'axios'
const qs = require('qs')
export default {
  name: 'register',
  data () {
    return {
      confirmUserPassword: '',
      formData: {
        userAcct: '',
        userName: '',
        confirmPwd: '',
        sex: '',
        phone: '',
        email: '',
        idCard: '',
        userPwd: '',
        photoPath: '',
        storeInvite: ''
      },
      sexOptions: [
        { label: '男', value: '0' },
        { label: '女', value: '1' }
      ]
    }
  },
  methods: {
    register () {
      axios({
        method: 'post',
        url: 'http://300217906n.picp.vip/app/publicAdmin/addCustomer',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        console.log('注册接口返回', data)
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          this.$router.push({path: '/login'})
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    },
    // 此处return的作用可以理解为发现错误，立刻返回，停止函数执行
    submit () {
      if (!this.formData.userAcct) {
        this.$message({type: 'info', showClose: true, message: '用户账号不能为空'})
        return
      }
      if (!this.formData.userPwd) {
        this.$message({type: 'info', showClose: true, message: '请输入密码'})
        return
      }
      if (!this.formData.confirmPwd) {
        this.$message({type: 'info', showClose: true, message: '请您再次输入密码'})
        return
      }
      if (this.formData.userPwd !== this.formData.confirmPwd) {
        this.$message({type: 'info', showClose: true, message: '两次输入的密码不一致，请您重新输入'})
        return
      }
      if (!this.formData.phone) {
        this.$message({type: 'info', showClose: true, message: '手机号不能为空'})
        return
      }
      let phone = /^1\d{10}$/
      if (!phone.test(this.formData.phone)) {
        this.$message({type: 'info', showClose: true, message: '手机号码必须为11位数字'})
        return
      }
      if (!this.formData.userName) {
        this.$message({type: 'info', showClose: true, message: '姓名不能为空'})
        return
      }
      if (!this.formData.idCard) {
        this.$message({type: 'info', showClose: true, message: '身份证号不能为空'})
      }
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      console.log(reg.test(this.formData.idCard))
      if (!reg.test(this.formData.idCard)) {
        this.$message({type: 'info', showClose: true, message: '请输入正确的身份证号！'})
        return
      }
      if (!this.formData.email) {
        this.$message({type: 'info', showClose: true, message: '邮箱不能为空'})
        return
      }
      var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!email.test(this.formData.email)) {
        this.$message({type: 'info', showClose: true, message: '邮箱格式不正确'})
        return
      }
      if (!this.formData.sex) {
        this.$message({type: 'info', showClose: true, message: '请选择性别'})
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.register()
        }
      })
    },
    uploadImage () {
      req('uploadImage', {
        file: this.file
      }).then(data => {
        console.log('图片返回', data)
      })
    },
    // 获取上传成功返回的地址
    handleAvatarSuccess (res) {
      this.formData.photoPath = res.data.url
      console.log(res)
      // console.log(this.dialogFormData.photoPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: rgb(192, 149, 96);
  font-size: 23px;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: rgb(192, 149, 96);
  }
}

.logo {
  width: 60%;
  margin: 0px auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    position: relative;
    .el-input {
       font-size: 14px;
       color: red;
      .input::-webkit-input-placeholder {
        color: rgb(217, 217, 217);
      }
      .el-input__inner {
        width: 150px !important;
        padding: 0px;
      }
    }
  }
}
/deep/ .el-input__inner {
    &::placeholder {
        color: rgb(217, 217, 217);
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }

    &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: rgb(217, 217, 217);
    }

    &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: rgb(217, 217, 217);
    }

    &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: rgb(217, 217, 217);
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color: rgb(217, 217, 217);
    }
}
.el-input::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #ffffff !important;
}
.userimg {
  width: 21px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: -35px;
}
.upload-demo {
  text-align: left;
  .el-upload.el-upload--text {
    .el-button.el-button--primary.el-button--small {
      position: relative;
      width: 230px;
      background-color: #ffffff;
      outline: 0;
      border: 0px;
      text-align: left;
      border-bottom: 1px solid #dddddd;
      // opacity: 0.8;
      // border-radius: 10px;
      font-size: 16px;
      color: rgb(217, 217, 217);
    }
  }
  .el-upload-list.el-upload-list--text {
    position: absolute;
    top: -2px;
    left: 10px;
  }
}
.register-btn {
  // width: 150px;
  // height: 40px;
  // margin-top: 150px;
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 45px;
  border-radius: 10px;
  background: rgb(192, 149, 96);
  border: 0px;
  font-size: 20px;
  margin-top: 30px;
}
</style>
