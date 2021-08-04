export default function request () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('正常的http请求返回值')
    })
  })
}
