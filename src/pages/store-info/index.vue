<template>
  <div>
    <div class="store" v-for="(item, index) in storeInfoData"
    :key="index">
    <div class="search">
      <img src="../../assets/u770.png" alt="">
      <el-input placeholder="请输入搜索关键词"></el-input>
    </div>
    <div class="store-info">
      <div>
        <img src="../../assets/home.png" alt="">
        <span>{{item.storeCode}}</span>
      </div>
      <div>门店：{{item.storeName}}</div>
      <div>地址：{{item.address}}</div>
    </div>
    <div class="shop-info">
      <div>店长：{{item.userName}}</div>
      <div>手机：{{item.phone}}</div>
    </div>
  </div>
  </div>
</template>

<script>
import req from '../../api/store-info'

export default {
  name: 'store-info',
  data () {
    return {
      storeInfoData: []
    }
  },
  methods: {
    getStoreInfo () {
      req('getStoreInfo', {
      }).then(data => {
        console.log('司机负责门店信息', data)
        this.storeInfoData = data.data
        if (data.code === -1) {
          this.$message({type: 'error', showClose: true, message: '获取失败'})
        }
      })
    }
  },
  mounted () {
    this.getStoreInfo()
  }
}
</script>

<style lang="scss" scoped>
.store {
  .search {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 5px;
    line-height: 50px;
    box-sizing: border-box;
    background: rgb(242, 242, 242);

    img {
      width: 32px;
      height: 32px;
      margin-left: 10px;
      margin-top: 10px;
    }
    .el-input {
        width: 80%;
        margin-left: 15px;
    }
  }
  .store-info {
    margin-top: 10px;
    // border-bottom: 1px solid rgb(200, 200, 200);
    // border-top: 1px solid rgb(200, 200, 200);
    width: 95%;
    padding: 10px 15px;
    box-sizing: border-box;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    div {
      position: relative;
      // margin: 15px;
      height: 35px;
      line-height: 35px;
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 5px;
      }
      span {
        margin-left: 30px;
      }
    }
  }
  .shop-info {
    width: 95%;
    margin: 0 auto;
    background: #ffffff;
    margin-top: 10px;
    border-radius: 10px;
    border-bottom: 1px solid rgb(200, 200, 200);
    padding: 10px 15px;
    box-sizing: border-box;
    div {
      width: 90%;
      height: 35px;
      line-height: 35px;
      // margin-top: 5px;
      // margin: 15px 15px;
    }
  }
}
</style>
