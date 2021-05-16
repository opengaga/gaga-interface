import buttonProps, { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import { Button } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { useWallet } from '@/hooks/useWallet'
import { injectedConnector } from '@/connectors'

const EnableButton = defineComponent({
  name: 'EnableButton',
  props: buttonProps(),
  setup(props: ButtonProps, context) {
    const { active, activate } = useWallet()
    const connecting = ref(false)

    const onClick = () => {
      connecting.value = true
      activate?.(injectedConnector).finally(() => {
        connecting.value = false
      })
    }

    return () => (
      <>
        {active?.value ? (
          <Button {...props} {...context.attrs}>
            {context.slots.default?.()}
          </Button>
        ) : (
          <Button {...props} {...context.attrs} loading={connecting.value} onClick={onClick}>
            Connect Wallet
          </Button>
        )}
      </>
    )
  }
})

export default EnableButton
