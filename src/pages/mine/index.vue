<template>
  <div>
    <div class="user">
        <div class="img-con">
          <img v-show="userInfo.photoPath" :src="userInfo.photoPath">
          <img v-show="!userInfo.photoPath" src="../../assets/u18.jpg">
        </div>
        <div class="text-con">{{userInfo.userName}}</div>
    </div>
    <div class="express-info" v-show="userInfo.role === '2'">
      <div>
        <img src="../../assets/门店.png" alt="">
        <span>门店：{{userInfo.storeName}}</span>
      </div>
      <div>
        <img src="../../assets/邀请码.png" alt="">
        <span>邀请码：{{userInfo.storeInvite}}</span>
      </div>
      <div>
        <img src="../../assets/定位.png" alt="">
        <span>{{userInfo.address}}</span>
      </div>
    </div>
    <div class="express-info" v-show="userInfo.role === '3'">
    <div>
      <img src="../../assets/货车.png" alt="">
      <span>{{userInfo.userName}}</span>
    </div>
    <div>
      <img src="../../assets/手机 (1).png" alt="">
      <span>{{userInfo.phone}}</span>
    </div>
  </div>
    <div class="content">
        <div
          class="con-item"
          v-show="userInfo.role === '4'"
          @click="toPage('/order-list')">
            <div>
                <img src="../../assets/订单.png" alt="">
            </div>
            <div><span>我的订单</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          v-show="userInfo.role === '4'"
          @click="toPage('/change-password')">
            <div>
                <img src="../../assets/修改密码.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          v-show="userInfo.role === '4'"
          @click="toPage('/change-store-code')">
            <div>
                <img src="../../assets/邀请码.png" alt="">
            </div>
            <div><span>修改店铺邀请码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          v-show="userInfo.role === '4'"
          @click="toPage('/login')">
            <div>
                <img src="../../assets/退出.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <!-- <div>
                <img src="../../assets/右.png" alt="">
            </div> -->
        </div>
        <div
          class="con-item"
          v-show="userInfo.role === '2' || userInfo.role === '3'"
          @click="toPage('/change-password')">
            <div>
                <img src="../../assets/修改密码.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          v-show="userInfo.role === '2' || userInfo.role === '3'"
          @click="toPage('/login')">
            <div>
                <img src="../../assets/退出.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <!-- <div>
                <img src="../../assets/右.png" alt="">
            </div> -->
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mine',
  data () {
    return {
      // conList: [
      //   {
      //     img1: require('../../assets/订单.png'),
      //     label: '我的订单',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/order-list'
      //   }, {
      //     img1: require('../../assets/修改密码.png'),
      //     label: '修改密码',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/change-password'
      //   }, {
      //     img1: require('../../assets/邀请码.png'),
      //     label: '修改店铺邀请码',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/change-store-code'
      //   }, {
      //     img1: require('../../assets/退出.png'),
      //     label: '退出登录',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/login'
      //   }
      // ],
      // conList2: [
      //   {
      //     img1: require('../../assets/修改密码.png'),
      //     label: '修改密码',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/change-password'
      //   },
      //   {
      //     img1: require('../../assets/退出.png'),
      //     label: '退出登录',
      //     img2: require('../../assets/右.png'),
      //     toPath: '/login'
      //   }
      // ]
    }
  },
  methods: {
    toPage (data) {
      if (data === '/login') {
        sessionStorage.clear('userInfo')
        sessionStorage.clear('roleInfo')
        sessionStorage.clear('currentCommInfo')
        // sessionStorage.clear('currentPage')
      }
      this.$router.push({path: data})
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
.user {
    width: 100%;
    display: flex;
    .img-con {
        flex: 1;
        display: flex;
        align-items: center;
        // border-bottom: 1px solid rgb(200, 200, 200);
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: relative;
          left: 45%;
        }
    }
    .text-con {
        flex: 2;
        line-height: 105px;
        font-size: 22px;
        margin-left: 20px;
        // border-bottom: 1px solid rgb(200, 200, 200);
    }
}
.express-info {
  width: 95%;
  margin: 0px auto;
  border-radius: 10px;
  background: #ffffff;
}
.content {
    width: 95%;
    padding: 10px 15px 10px 19px;
    margin: 10px auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    .con-item {
        width: 100%;
        display: flex;
        div:nth-child(1) {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 14px;
                height: 16px;
            }
        }
        div:nth-child(2) {
            flex: 1;
            line-height: 42.5px;
            font-size: 17px;
            span {
                position: relative;
                left: 10px;
            }
        }
        div:nth-child(3) {
            width: 10px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
                height: 14px;
            }
        }
    }
}
.img-spc {
    width: 15px;
    height: 15px;
}
.express-info {
  padding: 5px 0;
  div {
    position: relative;
    height: 20px;
    padding: 10px 5px;

    img {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 12px;
      left: 15px;
    }

    span {
      margin-left: 40px;
      line-height: 20px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  div:last-child {
    // border-bottom: 1px solid rgb(200 , 200, 200);

    img {
      width: 22px;
      height: 22px;
      left: 13px;
      top: 8px;
    }
  }
}
</style>
