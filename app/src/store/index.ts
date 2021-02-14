import Vue from 'vue';
import Vuex from 'vuex';
import bModule from './modules/bModule'
import mainStateModule from './mainStateModule'

Vue.use(Vuex);

interface SomeSubState {
  name: string,
  value: number | string,
  obj: {
    key: {
      type: string | number
      default: '0'
    },
    value: number | string
  }
}

export default new Vuex.Store(
  {
    ...mainStateModule,
    modules: {
      bModule
    }
  }
)
