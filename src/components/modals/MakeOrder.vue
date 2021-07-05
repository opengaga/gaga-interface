<template>
  <mask-layer title="Make order" @closeBid="close" @confirm="submit">
    <div class="pay-num"> You are about to make a order for {{ name }}</div>
    <div class="boldFont bid-ipt-title">Make order</div>
    <div class="bnb-iptwrap">
      <div class="bnb-icon">Price</div>
      <a-input v-model:value="price" placeholder="Enter price" />
      <div class="bnb-icon">{{ symbol }}</div>
    </div>
    <div class="bnb-iptwrap">
      <div class="bnb-icon">Quantity</div>
      <a-input v-model:value="amount" placeholder="Enter an amount" />
    </div>
    <div v-if="error" class="warn">{{ error.message }}</div>
  </mask-layer>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import maskLayer from './maskLayer.vue'
  import { symbol } from '@/utils/constants'

  export default defineComponent({
    components: { maskLayer },
    props: {
      name: String
    },
    setup(props, context) {
      const price = ref<string>('100')
      const amount = ref<string>('1')

      const error = computed(() => {
        if (Number(price.value) < 100) {
          return new Error('Min price is 100')
        }

        if (!amount.value || !amount.value) {
          return new Error('Please input price and quantity')
        }

        if (amount.value.includes('.')) {
          return new Error('Must be integer')
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

        context.emit('submit', price.value, amount.value)
      }

      return {
        close,
        symbol,
        amount,
        price,
        submit,
        error
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
