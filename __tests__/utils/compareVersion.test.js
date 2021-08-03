import { compareVersion } from '../../utils/compareVersion'

test('compareVersion', () => {
  const result0 = compareVersion('2.1.2', '2.1.2')
  expect(result0).toBe(0)

  const result1 = compareVersion('2.1.0', '2.1.2')
  expect(result1).toBe(-1)

  // 以下 case 是错误的
  const result2 = compareVersion('2.1', '2.1.2')
  expect(result2).toBe(0)
})
