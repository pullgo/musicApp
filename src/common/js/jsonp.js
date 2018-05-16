import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
//没有？就加一个？ 否则就是&
  return new Promise((resolve, reject) => {//resolve不成功
    originJsonp(url, option, (err, data) => {
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
    //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  }
  return url ? url.substring(1) : ''//把第一个&去掉
}