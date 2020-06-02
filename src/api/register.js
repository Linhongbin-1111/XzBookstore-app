import req from '../fetch/index.js'

const config = {
  register: {
    url: 'app/publicAdmin/addCustomer',
    method: 'post'
  },
  uploadImage: {
    url: '/app/uploadImage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
