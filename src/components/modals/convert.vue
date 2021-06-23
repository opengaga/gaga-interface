<template>
  <div class="convert-wrap">
    <div class="convert-modal">
      <div class="title">
        <span>Convert</span>
        <img @click="closeConvert" src="@/assets/imgs/close.svg" alt="" />
      </div>
      <div class="pay-num">
        <span class="boldFont">You pay</span> Max amount is
        <format-balance
          :balance="side === 1 ? balance : wethBalance"
          :symbol="side === 1 ? symbol : wrapperSymbol"
        />
      </div>
      <a-input
        v-model:value="amount"
        class="bnb-ipt"
        placeholder="Enter an amount"
        :suffix="side === 1 ? symbol : wrapperSymbol"
      />
      <img
        class="convert-trans"
        src="@/assets/imgs/covert_b.svg"
        @click="side === 1 ? (side = 2) : (side = 1)"
      />
      <div class="boldFont">You receive</div>
      <a-input
        v-model:value="amount"
        class="bnb-ipt"
        placeholder="Enter an amount"
        :suffix="side === 1 ? wrapperSymbol : symbol"
      />
      <enable-button
        shape="round"
        :disabled="!amount"
        size="large"
        class="submit-btn"
        type="primary"
        :loading="loading"
        @click="swap"
      >
        Convert
      </enable-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import EnableButton from '@/components/button/enable-button'
  import { useWethDepositCallback, useWethWithdrawCallback } from '@/hooks/useWeth'
  import { symbol, tokens, wrapperSymbol } from '@/utils/constants'
  import { parseEther } from '@ethersproject/units'
  import { useBalance, useErc20Balance } from '@/hooks/useBalance'
  import { useWallet } from '@/hooks/useWallet'

  export default defineComponent({
    name: 'Convert',
    components: { EnableButton },
    setup(_, context) {
      const amount = ref<string>('')
      const side = ref<1 | 2>(1)
      const loading = ref(false)
      const { deposit } = useWethDepositCallback()
      const { withdraw } = useWethWithdrawCallback()
      const { account } = useWallet()
      const balance = useBalance(account)
      const wethBalance = useErc20Balance(ref(tokens.weth), account)
      const closeConvert = () => {
        context.emit('closeConvert')
      }
      const swap = async () => {
        loading.value = true
        return (
          side.value === 1 ? deposit(Number(amount.value)) : withdraw(parseEther(amount.value))
        ).finally(() => {
          loading.value = false
        })
      }

      return {
        closeConvert,
        amount,
        loading,
        symbol,
        side,
        wrapperSymbol,
        swap,
        balance,
        wethBalance
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .convert-wrap {
      width: 86% !important;
    }
    .convert-wrap * {
      font-size: 14px !important;
    }
    :deep .ant-input-affix-wrapper > input.ant-input {
      font-size: 12px !important;
    }
    .convert-modal .convert-trans {
      width: 24px !important;
      margin: 10px auto !important;
    }
  }
  .boldFont {
    font-size: 20px;
    font-weight: 600;
  }
  .convert-wrap {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .convert-modal {
    width: 100%;
    margin: 10% auto;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 20px;
    text-align: left;
    color: $globalBackground;
    background: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 26px;
      font-weight: 600;
      img {
        width: 26px;
      }
    }
    .pay-num {
      font-size: 16px;
      font-weight: 500;
    }
    .bnb-ipt {
      border-top: none;
      border-left: none;
      border-right: none;
    }
    .convert-trans {
      width: 40px;
      height: 40px;
      margin: 20px auto 30px;
      display: block;

      cursor: pointer;
    }
    &:deep(.submit-btn) {
      font-size: 16px;
      width: 100%;
      margin: 30px auto;
      text-align: center;
    }
  }
</style>
