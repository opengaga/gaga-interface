<template>
  <div class="about-token">
    <img class="about-token-topimg" src="@/assets/imgs/expolre.svg" />
    <p class="about-title">{{$t('About GAGA Token')}}</p>
    <p class="headline">{{$t('Who is eligible to participate in the airdrop?')}}</p>
    <div class="headline-info">
      <list v-for="(item, idx) in arrList" :index="idx + 1" :ants="item" :key="idx" />
    </div>
    <div v-for="(items, idx) in howList" :key="idx">
      <p class="icons-title">{{ $t(items.title) }}</p>
      <div class="get-info" v-if="items.headline">{{ $t(items.headline) }} </div>
      <div class="step-icons">
        <div class="step-item" v-for="(item, idx) in items.imgs" :key="idx"
          ><div class="step-img-wrap"><img :src="item.link" /></div
          ><div class="desc">{{ $t(item.name) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import headMenu from '@/assets/imgs/head-menu.svg'
  import san from '@/assets/imgs/san.svg'
  import hua from '@/assets/imgs/hua.svg'
  import huan from '@/assets/imgs/huan.svg'
  import dimond from '@/assets/imgs/dimond.svg'
  import card from '@/assets/imgs/card.svg'

  import list from '@/components/list/article-list.vue'
  export default defineComponent({
    name: 'TokenInfo',
    components: { list },
    setup() {
      const howList = ref([
        {
          title: 'How you can get GAGA',
          headline:
            'GAGA is not an investment and should be earned by active participation on the platform.75,000 tokens are issued every week,with 50% eseved for buyers, and 50% or sellers.',
          imgs: [
            {
              name: 'Create and sell',
              link: headMenu
            },
            {
              name: 'Collect NFTs',
              link: san
            },
            {
              name: 'Get airdrop as OpenGaga user',
              link: hua
            },
            {
              name: 'Get airdrop as NFT holder',
              link: san
            }
          ]
        },
        {
          title: 'How to use GAGA',
          headline: '',
          imgs: [
            {
              name: 'Hustle in OpenGaga DAO',
              link: huan
            },
            {
              name: 'Vote for platform upgrades',
              link: card
            },
            {
              name: 'Choose featured artworks',
              link: dimond
            },
            {
              name: 'Participate in moderation',
              link: huan
            }
          ]
        }
      ])
      const arrList = ref([
        {
          title: 'Existing OpenGaga users',
          time: '15/07/2020',
          desc: `Active users will receive 2% of the total GAGA supply according to the Liquidity Mining principle: based on the previous volume on BlackCat marketplace. Both buyers and sellers will receive 50%.`
        },
        {
          title: 'Documented NFT holders/buyers',
          time: 'by Monday 20/07/2020',
          desc: `In this stage, 4% will be distributed amoung Ethereum addresses of all NFTs with documented sales on Dune Analytics.`
        },
        {
          title: 'Remaining NFT owners',
          time: 'to be announced',
          desc: `As we believe that Dune Analyticsmighot hold all the datawe introduced the third stage for corrections. Ifyou havent found yourslf otheist,but you knowyou have significant NFT holdings please reach out to us! The second airdrop wave will be announced later.`
        }
      ])
      return { arrList, howList }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
