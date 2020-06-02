<template>
  <div>
    <div class="content">
        <div class="con-left">新邀请码</div>
        <input type="text"
          placeholder="请输入邀请码"
          v-model="storeInviteCode">
    </div>
    <div class="btn" @click="editStoreInviteCode">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '../../api/change-store-code.js'
export default {
  name: 'change-store-code',
  data () {
    return {
      storeInviteCode: ''
    }
  },
  methods: {
    // 修改邀请码
    editStoreInviteCode () {
      req('editStoreInviteCode', {
        storeInvite: this.storeInviteCode
      }).then(data => {
        if (data.code === 0) {
          this.getUserInfo()
          this.$message({type: 'success', showClose: true, message: data.msg})
          this.$router.push({path: '/mine'})
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    },
    getUserInfo () {
      // 获取个人信息
      req('getUserInfo', {
      }).then(data => {
        console.log('用户信息', data)
        if (data.code === 0) {
          sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto;
      background-color: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      .con-left {
          flex: 1;
          line-height: 80px;
          text-align: center;
      }
      input {
          flex: 2;
          line-height: 80px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(217, 217, 217);
          &::placeholder {
              color: rgb(217, 217, 217);
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
