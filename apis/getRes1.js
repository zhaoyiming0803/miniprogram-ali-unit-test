import request from "../utils/request"

export default async function getRes1 () {
  const res = await request()
  return Promise.resolve({
    a: 1,
    b: 2
  })
}