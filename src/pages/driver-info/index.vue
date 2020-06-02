<template>
  <div>
    <div class="driver-info" v-for="(item, index) in DriverInfo"
      :key="index">
      <div>
        <img src="../../assets/货车.png" alt="">
        <span>{{item.userName}}</span>
      </div>
      <div>
        <img src="../../assets/手机 (1).png" alt="">
        <span>{{item.phone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import req from '../../api/driver-info.js'
export default {
  name: 'mine',
  data () {
    return {
      DriverInfo: []
    }
  },
  methods: {
    getDriverInfo () {
      req('getDriverInfo', {
      }).then(data => {
        console.log('店长旗下司机信息', data)
        this.DriverInfo = data.data
      })
    }
  },
  mounted () {
    this.getDriverInfo()
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.driver-info {
  background: white;
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px 0;
  box-sizing: border-box;

  div {
    position: relative;
    height: 20px;
    padding: 10px 5px;

    img {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 12px;
      left: 21px;
    }
    img:last-child {
      top: 8px;
    }

    span {
      margin-left: 40px;
      line-height: 20px;
    }
  }
  div:last-child {
    // border-bottom: 1px solid rgb(200 , 200, 200);

    img {
      width: 20px;
      height: 20px;
      left: 20px;
    }
  }
}
</style>
