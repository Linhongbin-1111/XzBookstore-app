<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList"
      :key="index">
      <div class="pic-info">
        <img :src="item.photoPath" alt="">
        <div class="star">
          <div>{{item.goodsName}}</div>
          <el-rate
            show-text
            :texts="texts"
            v-model="item.evaluateStart">
          </el-rate>
        </div>
      </div>
      <div class="evaluate-content">
        <div class="title">分享你的使用体验吧</div>
        <el-input
          type="textarea" :rows="4"
          placeholder="请输入您的评价"
          v-model="item.evaluateContent">
        </el-input>
      </div>
    </div>
    <!-- <el-form action="">
      <el-input
        style="display: block;width:95%;margin: 0 auto;"
        type="textarea" :rows="4"
        placeholder="请输入您的评价"></el-input>
      <img src="" alt=""> -->
      <!-- <el-input type="file"></el-input> -->
    <el-button class="submit-btn" type="primary" @click="addCommEvaluate">提交</el-button>
    <!-- </el-form> -->
  </div>
</template>

<script>
import req from '../../api/order-evaluate.js'
import axios from 'axios'
export default {
  name: 'order-evaluate',
  data () {
    return {
      texts: ['失望', '不满意', '一般', '满意', '非常满意'],
      // colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      // colors: [{ 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: 'red' }],
      evaluateList: [],
      orderEvaluateInfo: []
    }
  },
  methods: {
    // 获取订单的里商品详情，显示到订单评价页
    getCommInfoInEvaluate () {
      req('getCommInfoInEvaluate', {
        orderCode: this.$route.query.orderCode
      }).then(data => {
        console.log('评价页商品详情', data)
        this.evaluateList = data.data
      })
    },
    addCommEvaluate () {
      axios({
        method: 'post',
        url: 'http://300217906n.picp.vip' + '/app/appOrder/addGoodsEvaluate',
        data: JSON.stringify({
          orderEvaluateInfo: JSON.stringify({
            orderCode: this.$route.query.orderCode,
            evaluateList: this.evaluateList.map(item => {
              return Object.assign({}, {
                goodsCode: item.goodsCode,
                evaluateContent: item.evaluateContent ? item.evaluateContent : '用户未进行评价，默认好评',
                starClass: parseInt(item.evaluateStart) ? parseInt(item.evaluateStart) : '5'
              })
            })
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message({type: 'success', showClose: true, message: data.data.msg})
          this.$router.push({path: '/order-list'})
        } else {
          this.$message({type: 'error', showClose: true, message: data.data.msg})
        }
      })
      // req('addCommEvaluate', {
      //   orderCode: this.$route.query.orderCode,
      //   evaluateList: this.evaluateList.map(item => {
      //     return Object.assign({}, {
      //       goodsCode: item.goodsCode,
      //       evaluateContent: item.evaluateContent,
      //       starClass: item.evaluateStart
      //     })
      //   })
      // }).then(data => {
      // })
    }
  },
  mounted () {
    this.getCommInfoInEvaluate()
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  .comm {
    width: 100%;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;
    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 110px;
        height: 130px;
      }
      .star {
        width: 220px;
        height: 100px;
        position: relative;
        div {
          margin-bottom: 20px;
        }
        .el-rate__item {
          .el-rate__icon {
            font-size: 25px;
          }
        }
      }
    }
    .evaluate-content {
      width: 100%;
      .title {
        // padding-left: 10px;
        line-height: 40px;
      }
    }
  }
  .el-textarea__inner {
    font-size: 16px !important;
  }
  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
