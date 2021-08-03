export default function request (data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}