import request from "../utils/request"

export async function getRes2 () {
  const res = await request()
  return Promise.resolve('res2')
}