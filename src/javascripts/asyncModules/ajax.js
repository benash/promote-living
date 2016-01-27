var axios = require('axios')

export function json(method, url, data, headers) {
  return axios({
    method,
    url,
    data,
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }, headers)
  })
}
