const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    avatar: 'http://p1-tt.byteimg.com/img/mosaic-legacy/febd0000438cd1fb1892~202x450.jpeg',
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    'status|1': ['开启', '关闭', 'deleted'],
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/subscription/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
