import '../../pages/index'
import getRes1 from '../../apis/getRes1'
import getRes2 from '../../apis/getRes2'

jest.mock('../../apis/getRes1')
jest.mock('../../apis/getRes2')

const currentPage = global.wxPageInstance

describe('index page unit testing', () => {
  describe('onLoad', () => {
    describe('正常返回值', () => {
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
  
        currentPage.onLoad()
      })
  
      test('getRes1 and getRes2 function should be called and returns a valid value', async () => {
        expect(currentPage.data.a).toBe(1)
        expect(currentPage.data.res2).toBe('res2')
      })
    })
  
    describe('非正常返回值', () => {
      beforeAll(() => {
        jest.spyOn(my, 'showToast')

        getRes1.mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              b: 2
            })
          })
        })

        // getRes2.mockImplementation(() => {
        //   return new Promise((resolve) => {
        //     resolve()
        //   })
        // })
  
        currentPage.onLoad()
      })
  
      test('getRes1 function should be called and not returns a valid value', async () => {
        expect(my.showToast).toBeCalled()
        expect(currentPage.data.a).toBeUndefined()
        expect(currentPage.data.res2).toBeUndefined()
      })
    })
  })
})
