import '../../pages/index'

const currentPage = global.wxPageInstance

describe('index page unit testing', () => {
  describe('onLoad', () => {
    beforeAll(() => {
      jest.spyOn(currentPage, 'init')
      currentPage.onLoad()
    })
    it('should init on onLoad lifecycle', () => {
      expect(currentPage.init).toBeCalled()
    })
    it('getRes1 function should be called and returns a valid value', async () => {
      const res1 = await currentPage.getRes1()
      const keys = Object.keys(res1)
      expect(['a', 'b']).toEqual(expect.arrayContaining(keys))
    })
    it('getRes1 function should be called and returns a valid value', async () => {
      await expect(currentPage.getRes2()).resolves.toBe('res2')
    })
    it('test data', () => {
      expect(currentPage.data.res2).toBe('res2')
    })
  })
})
