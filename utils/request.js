export function request ({apiRoot, url}) {
  let response = null
  if (url === 'getRes1') {
    response = {
      a: 11,
      b: 2
    }
  } else if (url === 'getRes2') {
    response = 'res2'
  }
  return Promise.resolve(response)
}


export default request