import { defineComponent, computed, PropType, ref, watchEffect } from 'vue'
import { formatUnits } from '@ethersproject/units'
import { formatDisplay } from './utils'
import { symbol } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ERC20 } from '@/vvm/contracts/ERC20'
import { useWallet } from '@/hooks/useWallet'

const FormatBalance = defineComponent({
  name: 'FormatBalance',
  props: {
    balance: [String, Object, null] as PropType<string | BigNumber>,
    unit: {
      type: Number,
      default: 18
    },
    decimal: {
      type: Number,
      default: 3
    },
    symbol: String,
    address: {
      type: String
    }
  },
  setup(props) {
    const display = computed(() => {
      const value = formatUnits(props.balance ?? '0', props.unit)

      return formatDisplay(value, props.decimal)
    })

    const tokenSymbol = ref<string>('')
    const { getProvider } = useWallet()

    watchEffect(() => {
      const provider = getProvider()
      if (props.address) {
        const erc20 = new ERC20(props.address, provider)
        erc20.isReady.then((erc20) => (tokenSymbol.value = erc20.symbol))
      }
    })

    const displaySymbol = computed((): string => {
      if (props.address) {
        return tokenSymbol.value
      } else {
        return symbol
      }
    })

    return () => (
      <>
        {display.value} {displaySymbol.value.toUpperCase()}
      </>
    )
  }
})

export default FormatBalance
