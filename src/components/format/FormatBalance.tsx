import { defineComponent, computed, PropType } from 'vue'
import { formatUnits } from '@ethersproject/units'
import { formatDisplay } from './utils'
import { symbol } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'

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
    symbol: String
  },
  setup(props) {
    const display = computed(() => {
      const value = formatUnits(props.balance ?? '0', props.unit)

      return formatDisplay(value, props.decimal)
    })

    return () => (
      <>
        {display.value} {(props.symbol ?? symbol).toUpperCase()}
      </>
    )
  }
})

export default FormatBalance
