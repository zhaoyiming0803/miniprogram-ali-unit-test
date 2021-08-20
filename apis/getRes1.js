import request from "../utils/request"

export async function getRes1 () {
  const res = await request()
  return Promise.resolve({
    a: 1,
    b: 2
  })
}