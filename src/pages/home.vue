<template>
  <div>
    <el-container>
      <el-header v-show="!meta.headerHide">
        <div class="user-info">
          <span class="iconfont iconzuojiantou" @click="back" v-show="meta.goBackShow"></span>
          <span
            v-for="(item, index) in titleList"
            :key="index"
            @click="toPage(item)"
            :class="{active: item.active }">
            {{item.titleName}}
          </span>
        </div>
      </el-header>

      <el-container>
        <el-main :class="{'main-class1' : meta.headerHide, 'main-class2' : !meta.headerHide}">
          <transition mode="out-in">
            <router-view></router-view>
          <!-- <div class="bottom-div">小东可是有底线的哦(●'◡'●)</div> -->
          </transition>
        </el-main>
      </el-container>

      <el-footer v-show="meta.footerShow">
        <!-- 店长 -->
        <div @click="$router.push({path: '/shop-order'})" v-show="userType === '2'">
          <img v-show="currentPath !== '/shop-order'" src="../assets/u1075.png" alt="">
          <img v-show="currentPath === '/shop-order'" src="../assets/订单 (1).png" alt="">
          <div :style="{color: currentPath === '/shop-order' ? '#C39862' : '#333333'}">订单</div>
        </div>
        <div @click="$router.push({path: '/driver-info'})" v-show="userType === '2'">
          <img v-show="currentPath !== '/driver-info'" src="../assets/u1080.png" alt="">
          <img v-show="currentPath === '/driver-info'" src="../assets/司机信息管理.png" alt="">
          <div :style="{color: currentPath === '/driver-info' ? '#C39862' : '#333333'}">司机</div>
        </div>
        <div @click="$router.push({path: '/mine'})" v-show="userType === '2'">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>
        <!-- 司机 -->
        <div @click="$router.push({path: '/store-info'})" v-show="userType === '3'">
          <img v-show="currentPath !== '/store-info'" src="../assets/home2.png" alt="">
          <img v-show="currentPath === '/store-info'" src="../assets/home.png" alt="">
          <div :style="{color: currentPath === '/store-info' ? '#C39862' : '#333333'}">门店</div>
        </div>
        <div @click="$router.push({path: '/mine'})" v-show="userType === '3'">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>
        <!-- 普通用户 -->
        <div @click="$router.push({path: '/comm-home'})" v-show="userType === '4'">
          <img v-show="currentPath !== '/comm-home'" src="../assets/home2.png" alt="">
          <img v-show="currentPath === '/comm-home'" src="../assets/home.png" alt="">
          <div :style="{color: currentPath === '/comm-home' ? '#C39862' : '#333333'}">首页</div>
        </div>
        <div @click="$router.push({path: '/comm-classify'})" v-show="userType === '4'">
          <img v-show="currentPath !== '/comm-classify'" src="../assets/classify2.png" alt="">
          <img v-show="currentPath === '/comm-classify'" src="../assets/classify.png" alt="">
          <div :style="{color: currentPath === '/comm-classify' ? '#C39862' : '#333333'}">分类</div>
        </div>
        <div @click="$router.push({path: '/shop-car'})" v-show="userType === '4'">
          <img v-show="currentPath !== '/shop-car'" src="../assets/shop_car2.png" alt="">
          <img v-show="currentPath === '/shop-car'" src="../assets/shop_car.png" alt="">
          <div :style="{color: currentPath === '/shop-car' ? '#C39862' : '#333333'}">购物车</div>
        </div>
        <div @click="$router.push({path: '/mine'})" v-show="userType === '4'">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {}
      // transitionName: 'slide-left'
    }
  },
  computed: {
    titleList () {
      return this.$route.meta.title
    },
    goBackBtn () {
      return this.$route.meta.goBack
    },
    meta () {
      return this.$route.meta
    },
    currentPath () {
      return this.$route.path
    },
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  methods: {
    back () {
      this.$router.push({path: this.goBackBtn})
    },
    toPage (data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({path: data.toPath})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-class1 {
  position: absolute;
  top: 0;
  bottom: 60px;
}

.main-class2 {
  position: absolute;
  top: 60px;
  bottom: 60px;
  background: rgb(246, 246, 246);
}
.el-header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 20px;
    width: 100%;
    padding: 0px;

    .iconzuojiantou {
      position: absolute;
      top: 50%;
      left: -20px;
      color: rgb(192, 149, 90);
      transform: translate(0, -50%);
    }

    span {
      letter-spacing: 2px;
      margin: 0 20px;
    }

    .active {
      color: rgb(192, 149, 90);
    }
  }
}
.bottom-div {
  height: 20px;
  line-height: 20px;
  background: rgb(246, 246, 246);
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  color: #dddddd;
}
.el-main {
  padding: 0;
  width: 100%;
}

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  // background: #ffffff;
  border-top: 1px solid rgb(220, 220, 220);

  >div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 27px;
      height: 27px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
}
.fadee-enter{
  opacity: 0;
}
.fadee-enter-active {
  transition: opacity 2s;
}
.fadee-leave {
  opacity: 1;
}
.fadee-leave-active {
  transition: opacity 2s;
}
</style>
