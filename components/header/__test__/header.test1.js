const simulate = require('miniprogram-simulate')
const path = require('path')

test('components/header/header', () => {
  // const id = simulate.load(path.resolve(__dirname, '../header'))
  // const comp = simulate.render(id, {
  //   headerContent: 'this is header content'
  // })

  const id = simulate.load({
    template: '<view class="header-container">{{ headerContent }}<view>123</view></view>',
    data: {
      a: 1,
      b: 2,
      list: [1, 2, 3, 4]
    },
    properties: {
      headerContent: {
        type: String,
        value: ''
      }
    }
  })

  const comp = simulate.render(id, {
    headerContent: 'this is header content'
  })

  const parent = document.createElement('parent-wrapper')
  comp.attach(parent)

  const view = comp.querySelector('.header-container')
  expect(view.dom.innerHTML).toBe('this is header content123')
})
