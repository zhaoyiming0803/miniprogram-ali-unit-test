import { getUrlParam } from '../../utils/queryParams'

test('getUrlParam', () => {
  const url = 'https://www.baidu.com?a=1&b=2&c=3&d=' + encodeURIComponent('https://www.so.com')

  expect(getUrlParam('a', url)).toBe('1')
  expect(getUrlParam('d', url)).toBe('https://www.so.com')
})
