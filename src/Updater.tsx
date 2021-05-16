import { defineComponent } from 'vue'
import { useEagerConnect } from './hooks'

const EnableButton = defineComponent({
  name: 'Updater',
  setup() {
    useEagerConnect()

    return () => null
  }
})

export default EnableButton
