<template>
  <mask-layer title="Place a bid" @closeBid="close" @confirm="submit">
    <div class="pay-num"> You are about to place a bid for {{ name }}</div>
    <div class="boldFont bid-ipt-title">Place a bid</div>
    <div class="bnb-iptwrap">
      <div class="bnb-icon">Your bid</div>
      <a-input v-model:value="price" placeholder="Enter bid" />
      <div class="bnb-icon">{{ wrapperSymbol }}</div>
    </div>
    <div class="bnb-iptwrap">
      <div class="bnb-icon">Quantity</div>
      <a-input v-model:value="amount" placeholder="Enter an amount" />
    </div>
    <div v-if="error" class="warn">{{ error.message }}</div>
    <div class="fee-wrap">
      <div class="fee-item">
        <span>Your balance</span>
        <span class="fee">
          <format-balance :balance="balance" :unit="decimals" :symbol="wrapperSymbol" />
        </span>
      </div>
      <div class="fee-item">
        <span>Your bidding balance</span>
        <span class="fee">
          <format-balance :balance="bidAmount" :unit="decimals" :symbol="wrapperSymbol" />
        </span>
      </div>
      <div class="fee-item">
        <span>Total bid amount</span>
        <span class="fee">
          <format-balance :balance="cost" :unit="decimals" :symbol="wrapperSymbol" />
        </span>
      </div>
    </div>
  </mask-layer>
</template>
<script lang="ts">
  import { BigNumber } from '@ethersproject/bignumber'
  import { computed, defineComponent, ref } from 'vue'
  import maskLayer from './maskLayer.vue'
  import { tokens, wrapperSymbol } from '@/utils/constants'
  import { useWallet } from '@/hooks/useWallet'
  import { useErc20Balance } from '@/hooks/useBalance'
  import { parseUnits } from '@ethersproject/units'
  import { Asset, AssetType } from '@/vvm/types'

  export default defineComponent({
    components: { maskLayer },
    props: {
      name: String
    },
    setup(props, context) {
      const price = ref<string>('600')
      const amount = ref<string>('1')
      const decimals = ref<number>(18)
      const address = ref<string>(tokens.weth)
      const { account } = useWallet()
      const balance = useErc20Balance(address, account)

      const bidAmount = computed(() => parseUnits(price.value, decimals.value))
      const cost = computed(() => {
        return BigNumber.from(amount.value || '0').mul(bidAmount.value)
      })

      const error = computed(() => {
        if (Number(price.value) < 600) {
          return new Error('Min bid is 600')
        }

        if (!amount.value || !amount.value) {
          return new Error('Please input bid and quantity')
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

        const sellAsset: Asset = {
          token: address.value,
          assetType: AssetType.ERC20,
          tokenId: BigNumber.from('0')
        }
        const sellAmount = cost.value
        const buyAmount = BigNumber.from(amount.value)

        context.emit('submit', sellAsset, sellAmount, buyAmount)
      }

      return {
        close,
        wrapperSymbol,
        amount,
        price,
        submit,
        error,
        cost,
        balance,
        decimals,
        bidAmount
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
