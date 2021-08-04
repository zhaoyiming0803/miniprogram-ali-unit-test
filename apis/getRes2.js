import request from "../utils/request"

export default async function getRes2 () {
  const res = await request()
  return Promise.resolve('res2')
}