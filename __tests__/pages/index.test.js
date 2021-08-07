import '../../pages/index/index'
import getRes1 from '../../apis/getRes1'
import getRes2 from '../../apis/getRes2'

jest.mock('../../apis/getRes1')
jest.mock('../../apis/getRes2')

const currentPage = global.wxPageInstance

describe('onLoad、getRes1、getRes2', () => {
  beforeAll(() => {
    getRes1.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          a: 1,
          b: 2
        })
      })
    })
    
    getRes2.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve('res2')
      })
    })

    currentPage.onLoad({
      merchtypeId: 1213131
    })
  })

  test('getRes1 and getRes2 function should be called and returns a valid value', async () => {
    expect(currentPage.data.a).toBe(1)
    expect(currentPage.data.res2).toBe('res2')
    expect(currentPage.data.merchtypeId).toBe(1213131)
  })
})

describe('onRefresh', () => {
  currentPage.onRefresh()
  expect(getApp().globalData.token).toBe('this is token')
})

describe('submit', () => {
  currentPage.submit()

  test('submit', async () => {
    await delay(1000)
    currentPage.submit()
    expect(my.alert).toBeCalledWith({
      content: '请勿重复提交订单'
    })
  })
})
