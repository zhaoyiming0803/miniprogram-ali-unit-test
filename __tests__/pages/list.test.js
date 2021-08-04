import '../../pages/list/list'

const currentPage = global.wxPageInstance

describe('index page unit testing', () => {
  describe('onLoad', () => {
    beforeAll(() => {
      currentPage.onLoad()
    })

    test('a and b', () => {
      expect(currentPage.data.a).toBe(1000)
      expect(currentPage.data.b).toBe(20000)
    })
  })
})
