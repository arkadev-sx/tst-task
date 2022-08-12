import { createApp } from 'vue'
import App from './App.vue'
import VueObserveVisibility from 'vue3-observe-visibility'

const init = () => {
  const app = createApp(App)
  app.use(VueObserveVisibility)
  app.mount('#app')
}
init()
