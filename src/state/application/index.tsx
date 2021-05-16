import { useWallet } from '@/hooks/useWallet'
import { defineComponent, onUnmounted, provide, watchEffect } from 'vue'
import { ref } from '@vue/reactivity'

const ApplicationProvide = defineComponent({
  name: 'ApplicationProvide',
  setup(_, context) {
    const blockNumber = ref<number>(0)
    const { getProvider } = useWallet()

    const blockNumberCallback = (_blockNumber: number) => {
      blockNumber.value = Math.max(_blockNumber, blockNumber.value)
    }

    const stop = watchEffect((onInvalidate) => {
      const provider = getProvider()

      provider.on('block', blockNumberCallback)

      onInvalidate(() => {
        provider.off('block', blockNumberCallback)
      })
    })

    onUnmounted(() => {
      stop()
    })

    provide('application-blockNumber', blockNumber)

    return () => <>{context.slots.default?.()}</>
  }
})

export default ApplicationProvide
