export default function request (data) {
  return new Promise((resolve) => {
    if (data.apiRoot === 'weapp' && data.url === '/address/get') {
      resolve('res2')
    } else {
      resolve(data)
    }
  })
}
