import '../../pages/index/index'
import request from '../../utils/request'

jest.mock('../../utils/request')

const currentPage = global.pageInstance

describe('非正常返回值', () => {
  beforeAll(() => {
    jest.spyOn(currentPage, 'getRes1')

    request.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          b: 2
        })
      })
    })

    currentPage.onLoad({
      merchtypeId: 1213131
    })
  })

  test('getRes1 function should be called and not returns a valid value', async () => {
    expect(currentPage.getRes1).toBeCalled()
    expect(my.showToast).toBeCalled()
    expect(currentPage.data.a).toBeUndefined()
    expect(currentPage.data.res2).toBe('')
    expect(currentPage.data.merchtypeId).toBe(1213131)
  })
})
