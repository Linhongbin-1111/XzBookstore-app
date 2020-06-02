<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px">
      <el-form-item label="" prop="username">
        <img class="userimg" src="../assets/用户名.png" alt="">
        <el-input v-model="formData.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <img class="pwdimg" src="../assets/密码.png" alt="">
        <el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import req from '../api/login.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // login () {
    //   req('login', {
    //     ...this.formData
    //   }).then(data => {
    //     console.log(data)
    //     if (data.code === 0) {
    //       this.$message.success(data.msg)
    //       sessionStorage.setItem('userInfo', JSON.stringify(data.data))
    //       this.$router.push({path: '/home'})
    //     } else {
    //       this.$message.error(data.msg)
    //     }
    //   })
    //   // this.$router.push('./comm-home')
    // }
    login (formData) {
      if (this.formData.username === '') {
        this.$message({type: 'info', showClose: true, message: '用户名不能为空！'})
        return
      }
      if (this.formData.password === '') {
        this.$message({type: 'info', showClose: true, message: '密码不能为空！'})
        return
      }
      axios({
        method: 'post',
        url: 'http://300217906n.picp.vip/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        console.log('登录接口返回', data)
        if (data.data.code === 0) {
          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
          this.getUserInfo()
        } else {
          this.$message({type: 'error', showClose: true, message: data.data.msg})
        }
      })
      // this.$refs[formData].validate((valid) => {
      //   if (valid) {
      //     alert('登录成功！')
      //     this.$router.push('./user-manage')
      //   } else {
      //     console.log('error')
      //     return false
      //   }
      // })
    },
    getUserInfo () {
      // 获取个人信息
      req('getUserInfo', {
      }).then(data => {
        console.log('用户信息', data)
        if (data.code === 0) {
          sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
          if (data.data.role === '2') {
            this.$router.push({path: '/shop-order'})
            this.$message({type: 'success', showClose: true, message: '登录成功'})
          } else if (data.data.role === '3') {
            this.$router.push({path: '/store-info'})
            this.$message({type: 'success', showClose: true, message: '登录成功'})
          } else if (data.data.role === '4') {
            this.$router.push({path: '/home'})
            this.$message({type: 'success', showClose: true, message: '登录成功'})
          } else {
            this.$message({type: 'error', showClose: true, message: '管理员账号不可登录app端'})
            sessionStorage.clear('userInfo')
            sessionStorage.clear('roleInfo')
            sessionStorage.clear('currentCommInfo')
          }
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 70%;
  margin: 70px auto;

  img {
    width: 100%;
  }
}

.el-form.el-form--inline {
  margin-top: 100px;
  height: 110px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    // .el-form-item__label{
    // }
    .el-form-item__content {
      position: relative;
      height: 60px;
      .el-input{
        font-size: 16px;
        .el-input__inner{
          height: 100px;
          border: none;
        }
      }
    }
  }
}
.input:-internal-autofill-selected {
  background-color: white !important;
}
.userimg {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: -35px;
}
.pwdimg {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: -35px;
}
// .el-form {
//   margin-top: 20px;

//   .el-form-item {
//     width: 100%;
//     text-align: center;
//     margin: 0 auto;
//     // /deep/ .el-input__inner {
//     //   background-color: white !important;
//     // }
//   }
// }

.register-btn {
  margin: -10px 50px 60px 0px;
  font-size: 14px;
  text-align: right;
  margin-right: 55px;
  a {
    color: #606266;
  }
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 45px;
  border-radius: 10px;
  background: rgb(192, 149, 96);
  border: 0px;
  font-size: 20px;
  margin-top: 80px;
}
</style>
