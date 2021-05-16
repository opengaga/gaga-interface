import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ant from './plugins'

router.beforeEach((to: { meta: any }, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title
  }
  next()
})

const app = createApp(App)
app.use(Ant)
app.use(store).use(router).mount('#app')
