import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getCommInfoInEvaluate: {
    url: '/app/appOrder/listGoodsForEvaluate',
    method: 'post'
  },
  addCommEvaluate: {
    url: '/app/appOrder/addGoodsEvaluate',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
