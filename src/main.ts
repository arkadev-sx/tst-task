import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import { createPinia } from 'pinia'
import VueObserveVisibility from 'vue3-observe-visibility'

const init = () => {
  const app = createApp(App)
  // app.use(router)
  app.use(createPinia())
  app.use(VueObserveVisibility)
  app.mount('#app')
}
init()
