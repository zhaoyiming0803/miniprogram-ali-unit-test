import '../../pages/index/index'
import request from '../../utils/request'
jest.mock('../../utils/request')

const currentPage = global.pageInstance

describe('onLoad、getRes1、getRes2', () => {
  beforeAll(() => {
    request.mockImplementation(({apiRoot, url}) => {
      if (url === 'getRes1') {
        return Promise.resolve({
          a: 1, 
          b: 222222
        })
      } else if (url === 'getRes2') {
        return Promise.resolve('res2')
      }
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
