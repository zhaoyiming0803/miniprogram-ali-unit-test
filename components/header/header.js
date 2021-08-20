import { mixinEmitter } from '../../utils/emitter'

Component(mixinEmitter({
  data: {
    headerContent: 'this is headerContent'
  },
  didMount () {
    this.on('changeA', payload => {
      console.log('changeA payload in header component: ', payload)
    })
  },
  methods: {
    changeA () {
      debugger
      this.emit('changeA|page', {
        list: [1, 2, 3, 4]
      })

      this.emit('changeA|app', {
        list: [1, 2, 3, 4]
      })
    }
  }
}))
