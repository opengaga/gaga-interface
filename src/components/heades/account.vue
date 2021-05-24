<template>
  <div class="wallet-modal">
    <div class="account-modal">
      <div class="account-secret">
        <!-- <div v-if="wethBalance.user_name" class="account-secret-username">zyhzzz</div> -->
        <div class="num" id="copyText">{{ account }}</div>
        <img @click="copyText" src="@/assets/imgs/copy.svg" />
      </div>
      <div><a class="act-profile" @click="toConvert('profile')">Set display name</a></div>
      <div class="balance-wrap">
        <div>
          <div class="balance-item">
            <img src="@/assets/imgs/b3.png" alt="twiter" />
            <div class="item-rt">
              <p class="title">Balance</p>
              <p><format-balance :balance="balance" /></p>
            </div>
          </div>
          <div class="balance-item">
            <img src="@/assets/imgs/b3.png" alt="twiter" />
            <div class="item-rt">
              <p class="title">WZTB Balance</p>
              <p><format-balance :balance="wethBalance" symbol="WZTB" :decimal="18" /></p>
            </div>
          </div>
        </div>
        <img src="@/assets/imgs/convert.svg" class="trans-btn" @click="toConvert('')" />
      </div>
      <div class="account-link">
        <router-link to="/myItems"><img src="@/assets/imgs/item.svg" />My items</router-link>
        <router-link to="/profile"><img src="@/assets/imgs/edit.svg" />Edit profile</router-link>
        <!-- <router-link to=""><img src="@/assets/imgs/disconect.svg" />Disconnect</router-link> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import router from '@/router'
  import { BigNumber } from '@ethersproject/bignumber'
  import { useErc20Balance } from '@/hooks/useBalance'
  import { defineComponent, ref, PropType } from 'vue'
  import { tokens } from '@/utils/constants'
  import { useWallet } from '@/hooks/useWallet'
  import { message } from 'ant-design-vue'

  export default defineComponent({
    props: {
      balance: Object as PropType<BigNumber>
    },
    setup(props, context) {
      const { account } = useWallet()
      const weth = ref(tokens.weth)
      const wethBalance = useErc20Balance(weth, account)

      const toConvert = (path: string) => {
        context.emit('closeAccount')
        if (path) {
          router.push(path)
        }
      }
      const copyText = () => {
        const text = document.getElementById('copyText')?.innerText
        const input = document.getElementById('input')! as any
        input.value = text
        input.select()
        document.execCommand('copy')
        message.success('copy success')
      }

      return {
        account,
        toConvert,
        wethBalance,
        copyText
      }
    }
  })
</script>
<style scoped lang="scss">
  .wallet-modal {
    position: absolute;
    right: 20px;
    top: 80px;
    width: 280px;
    border-radius: 4px;
    overflow: hidden;
    color: $globalBackground;
    z-index: 99;
  }
  .account-modal {
    border: 1px solid #ddd;
    background: #fff;
    padding: 20px;
    text-align: left;
    .account-secret {
      &-username {
        font-weight: bold;
        font-size: 14px;
      }
      .num {
        width: 80%;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: bottom;
      }
    }
    .act-profile {
      cursor: pointer;
    }
    .balance-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .balance-item {
        display: flex;
        padding: 10px 0;
        p {
          margin: 0;
          padding: 0;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .item-rt {
          font-size: 12px;
          .title {
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
      .trans-btn {
        width: 36px;
        display: block;
        cursor: pointer;
      }
    }
    .account-link {
      padding: 10px 0 0 30px;
      img {
        width: 20px;
        margin-right: 6px;
      }
      a {
        color: #333;
        display: block;
        font-weight: bold;
        font-size: 14px;
        margin: 6px 0;
      }
    }
  }
</style>
