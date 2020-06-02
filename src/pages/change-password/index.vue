<template>
  <div>
    <div class="pwd-con">
      <div class="pwd-item">
            <div class="item-left">原密码</div>
            <input type="password"
              v-model="passwordData.userPwd"
              required="required"
              placeholder="请输入原密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">新密码</div>
            <input type="password"
              v-model="passwordData.userNewPwd"
              required="required"
              placeholder="请输入新密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">确认新密码</div>
            <input type="password"
            v-model="confirmPwd"
            required="required"
            placeholder="请再次输入新密码">
        </div>
    </div>
    <div class="btn" @click="submit">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '../../api/change-password.js'

export default {
  name: 'change-password',
  data () {
    return {
      passwordData: {
        userPwd: '',
        userNewPwd: ''
      },
      confirmPwd: ''
    }
  },
  methods: {
    editUserPassword () {
      req('editUserPassword', {
        version: this.userInfo.version,
        ...this.passwordData
      }).then(data => {
        if (data.code === 0) {
          this.$message({type: 'success', showClose: true, message: data.msg})
          // 清空存放在sessionStorage里的用户信息，并重新登陆
          sessionStorage.clear('userInfo')
          sessionStorage.clear('roleInfo')
          this.$router.push('/login')
        } else {
          this.$message({type: 'error', showClose: true, message: '原密码错误，请重新输入'})
        }
      })
    },
    submit () {
      if (this.passwordData.userPwd === '') {
        this.$message({type: 'info', showClose: true, message: '请输入原密码'})
        return
      }
      if (this.passwordData.userNewPwd === '') {
        this.$message({type: 'info', showClose: true, message: '请输入新密码'})
        return
      }
      if (this.confirmPwd === '') {
        this.$message({type: 'info', showClose: true, message: '请再次输入新密码'})
        return
      }
      if (this.passwordData.userPwd === this.confirmPwd) {
        this.$message({type: 'info', showClose: true, message: '原密码与新密码相同！'})
        return
      }
      if (this.passwordData.userNewPwd !== this.confirmPwd) {
        this.$message({type: 'error', showClose: true, message: '两次输入的密码不一致，请重新输入！'})
        return
      }
      this.editUserPassword()
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(217, 217, 217);
              &::placeholder {
                  color: rgb(217, 217, 217);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 30px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
