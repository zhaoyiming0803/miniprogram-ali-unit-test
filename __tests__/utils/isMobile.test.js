import { isMobile } from '../../utils/isMobile'

describe('test mobile', () => {
  test('is mobile number', () => {
    const result0 = isMobile(13090908909)
    expect(result0).toBe(true)
  })
  
  test('is mobile string', () => {
    const result1 = isMobile('130s0908909')
    expect(result1).toBe(false)
  })
})
