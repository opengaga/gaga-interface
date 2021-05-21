<template>
  <mask-layer
    title="Checkout"
    confirmBtn="Proceed to payment"
    cancelBtn="Cancel"
    @closeBid="close"
    @confirm="submit"
  >
    <div class="pay-num">
      You are about to purchase {{ name }} from <small>{{ user }}</small></div
    >
    <div class="bnb-iptwrap">
      <a-input v-model:value="amount" placeholder="Enter an amount" />
    </div>
    <div v-if="error" class="warn">{{ error.message }}</div>
    <div class="fee-wrap">
      <div class="fee-item">
        <span>Total cost</span>
        <span class="fee"><format-balance :balance="cost" :unit="decimals" /></span>
      </div>
      <div class="fee-item">
        <span>Your balance</span>
        <span class="fee"><format-balance :balance="balance" :unit="decimals" /></span>
      </div>
    </div>
  </mask-layer>
</template>
<script lang="ts">
  import { BigNumber } from '@ethersproject/bignumber'
  import { computed, defineComponent, PropType, ref } from 'vue'
  import maskLayer from './maskLayer.vue'
  import { symbol } from '@/utils/constants'
  import { useWallet } from '@/hooks/useWallet'
  import { useBalance } from '@/hooks/useBalance'

  export default defineComponent({
    components: { maskLayer },
    props: {
      name: String,
      user: String,
      price: [String, Object, null] as PropType<string | BigNumber>,
      decimals: {
        type: Number,
        default: () => 18
      }
    },
    setup(props, context) {
      const amount = ref<string>('1')
      const { account } = useWallet()
      const balance = useBalance(account)
      const cost = computed(() => {
        return BigNumber.from(amount.value).mul(BigNumber.from(props.price))
      })

      const error = computed(() => {
        if (!amount.value) {
          return null
        }

        if (amount.value.includes('.')) {
          return new Error('Must be integer')
        }

        if (cost.value.gt(balance.value)) {
          return new Error('Insufficient balance')
        }

        return null
      })

      const close = () => {
        context.emit('close')
      }

      const submit = () => {
        if (error.value) {
          return
        }

        context.emit('submit', amount.value)
      }

      return {
        close,
        symbol,
        amount,
        submit,
        error,
        cost,
        balance
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .bid-wrap * {
      font-size: 14px !important;
    }
  }
  .boldFont {
    font-size: 20px;
    font-weight: 600;
  }

  .pay-num {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    word-break: break-all;

    small {
      color: #db30ff;
    }
  }
  .bid-ipt-title {
    margin: 20px 0 4px;
  }
  .bnb-iptwrap {
    display: flex;
    margin: 40px 0 30px;
    border-bottom: 1px solid #d9d9d9;
    input {
      flex: 1;
      border: none;
      outline: none;
    }
    .bnb-icon {
      font-weight: 600;
      font-size: 18px;
      span {
        margin-left: 6px;
      }
    }
  }
  .fee-wrap {
    margin-bottom: 20px;
    .fee-item {
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
      .fee {
        font-weight: 600;
      }
    }
  }
  .warn {
    color: $warnTip;
  }
</style>
