import { isMobile } from '../../utils/isMobile'

test('is mobile', () => {
  const result0 = isMobile(13090908909)
  expect(result0).toBe(true)

  const result1 = isMobile('130s0908909')
  expect(result1).toBe(false)
})
