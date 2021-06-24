<template>
  <div class="banner-wrap">
    <div class="title">{{ $t('THE LARGEST NFT MARKETPLACE ON ZSC') }}</div>
    <div class="info">{{ $t('buy,sell,and discover rare digital items') }}</div>
    <div class="btn-items">
      <router-link to="browse">{{ $t('Browse') }}</router-link>
      <router-link to="create">{{ $t('Create') }}</router-link>
    </div>
  </div>
  <div class="account-wrap">
    <div class="title">{{ $t('Meet GAGA-OpenGaga Governance Token') }}</div>
    <div class="desc">
      {{
        $t(
          "We think that the best way to align platform development with customers' interests is to empower the ones who actively interact with protocol: creators and collectors"
        )
      }}
    </div>
    <div class="connect-wrap" v-if="!active">
      <span class="text"
        ><span class="cnt-text">{{ $t('Connect your wallet') }}{{ $t('to') }}</span
        >{{ $t('check your eligibility') }}</span
      >
      <span class="link" @click="connect">{{ $t('Connect wallet') }}</span>
    </div>
    <div v-else class="connect-balance">
      <div>
        <span class="title">{{ $t('Your Balance') }}</span>
        <span class="line"></span>
        <span class="num">
          <format-balance :balance="balance" :address="address" />
        </span>
      </div>
      <div>
        <span class="title">{{ $t('Available for claim') }}</span>
        <span class="line"></span>
        <span class="num">
          <format-balance :balance="available" :address="address" />
        </span>
      </div>
      <enable-button size="large" type="primary" @click="claim">Claim</enable-button>
    </div>
    <router-link to="about" class="about-concat">
      {{ $t('Learn more about GAGA Token') }}
      <img class="anticon-right" src="@/assets/imgs/learn-arow.svg" alt="" />
    </router-link>
  </div>
  <convert @closeConvert="showConvert = false" v-if="showConvert" />
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watchEffect } from 'vue'
  import { useWallet } from '@/hooks/useWallet'
  import convert from '@/components/modals/convert.vue'
  import { useApi } from '@/hooks/useApi'
  import { BigNumber } from '@ethersproject/bignumber'
  import { useErc20Balance } from '@/hooks/useBalance'
  import { useVVM } from '@/hooks/useVVM'
  import EnableButton from '@/components/button/enable-button'
  import { injectedConnector } from '@/connectors'

  export default defineComponent({
    name: 'home',
    components: { convert, EnableButton },
    setup() {
      const { active, account, activate } = useWallet()
      const showConvert = ref<boolean>(false)
      const api = useApi()
      const total = ref<BigNumber | null>(null)
      const vvm = useVVM()

      const balance = useErc20Balance(ref(vvm.tokenAddress), account)

      watchEffect(() => {
        const address = account?.value

        if (address) {
          api.getClaim({ address }).then((res) => (total.value = BigNumber.from(res.data.total)))
        }
      })

      const available = computed(() =>
        total.value && balance.value ? total.value.sub(balance.value) : BigNumber.from('0')
      )

      const onSearch = (e: unknown) => {
        console.log(e)
      }

      const claim = async () => {
        const recipient = account?.value
        const value = available.value

        if (recipient && value) {
          const { signature } = await api.getClaimSignature({ address: recipient })

          return vvm.miner.claim(
            [
              {
                recipient,
                value
              }
            ],
            signature
          )
        }
      }

      const connect = () => {
        activate?.(injectedConnector)
      }

      return {
        available,
        balance,
        address: vvm.tokenAddress,
        claim,
        onSearch,
        active,
        showConvert,
        connect
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
