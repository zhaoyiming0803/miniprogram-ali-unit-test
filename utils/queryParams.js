/**
 * 获取url中的参数
 */
export function getUrlParam(key, url = '') {
  const pattern = new RegExp('[?&]' + key + '=([^&]+)', 'g');
  const matcher = pattern.exec(url);
  let items = null;
  if (matcher) {
    try {
      items = decodeURIComponent(matcher[1]);
    } catch (error) {
      items = matcher[1];
    }
  }

  return items;
}
