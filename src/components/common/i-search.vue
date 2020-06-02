<template>
  <div class="i-search">
    <el-form ref="form" :inline="true" :model="model">
      <slot></slot>

      <el-form-item>
        <el-button @click="search" type="primary">搜索</el-button>
        <el-button @click="reset" type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'i-search',
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    search () {
      this.$emit('search')
    },
    reset () {
      this.$refs.form.resetFields()
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.i-search {
  padding: 10px;

  .el-form {
    .el-form-item {
      margin-bottom: 0;

      // .el-form-item__content {
      // }

      .el-form-item__label {
        width: 80px;
      }
    }
  }
}
</style>
