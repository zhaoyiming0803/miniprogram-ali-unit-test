import { mixinEmitter } from './utils/emitter'
App(mixinEmitter({
  globalData: {
    
  },
  onLaunch(options) {
    console.log('app onLaunch')
    this.on('changeA', payload => {
      console.log('changeA payload in app launch: ', payload)
    })
    // my.call(
    //   'getStartupParams',
    //   {
    //     key: 'spm',
    //   },
    //   res => {
    //     console.log('getStartupParamsSync: ', res)
    //   }
    // );
  },
  onShow(options) {
    console.log('app onshow')
  },
}));
