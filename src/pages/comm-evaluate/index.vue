<template>
  <div class="container">
    <div class="evaluate-title">
      <span @click="all" :class="{active: this.starClass === '0'}">全部评价</span>
      <span @click="good" :class="{active: this.starClass === '4'}">好评</span>
      <span @click="middle" :class="{active: this.starClass === '3'}">中评</span>
      <span @click="bad" :class="{active: this.starClass === '1'}">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in evaluateList" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">用户：{{item.userAcct}}</div>
              <div class="date">{{item.createTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.starClass*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.evaluateContent}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '../../api/comm-evaluate.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      evaluateList: [
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '3',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '2',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // }
      ],
      starClass: '0'
    }
  },
  methods: {
    getCommEvaluateList () {
      req('getCommEvaluateList', {
        starClass: this.starClass,
        goodsCode: this.goodsCode,
        pageSize: 150,
        pageNum: 1
      }).then(data => {
        console.log('评价列表', data)
        if (data.code === 0) {
          // this.$message.success('获取商品评价成功')
          this.evaluateList = data.data.list
        } else {
          this.$message({type: 'error', showClose: true, message: data.msg})
        }
      })
    },
    all () {
      this.starClass = '0'
      this.getCommEvaluateList()
    },
    good () {
      this.starClass = '4'
      this.getCommEvaluateList()
    },
    middle () {
      this.starClass = '3'
      this.getCommEvaluateList()
    },
    bad () {
      this.starClass = '1'
      this.getCommEvaluateList()
    }
  },
  mounted () {
    this.getCommEvaluateList()
  },
  computed: {
    goodsCode () {
      return JSON.parse(sessionStorage.getItem('currentCommInfo')).goodsCode
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246, 246, 246);

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 18px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 5px 10px;
        // border-bottom: 1px solid rgb(217, 217, 217);

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 55px;

          .user-info {
            margin-top: -10px;
            .name {
              font-size: 17px;
              margin-bottom: 5px;
            }
            .date {
              color: #ddd;
              font-size: 13px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
        .msg {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
