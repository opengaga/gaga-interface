<template>
  <footer class="footers">
    <div class="website-info">
      <div class="email-info">
        <div class="title">
          {{ $t('Get the latest BlackCat updates, highlights and team activities') }}
        </div>
        <div class="email-wrap">
          <input class="email-ipt" v-model="email" placeholder="Your e-mail" />
          <span class="link">{{ $t('iamin') }}</span>
        </div>
      </div>
      <div class="foot-links">
        <p class="title">OpenGaga</p>
        <p>
          <router-link to="browse">{{ $t('Browse') }}</router-link>
        </p>
        <p>
          <router-link to="activity">{{ $t('Activity') }}</router-link>
        </p>
        <p>
          <router-link to="create">{{ $t('Create') }}</router-link>
        </p>
      </div>
      <div class="foot-links">
        <p class="title">{{ $t('Community') }}</p>
        <p
          ><router-link to="about">{{ $t('GAGA Token') }}</router-link>
        </p>
      </div>
      <div class="foot-links">
        <p class="title langue">{{ $t('Language') }}</p>
        <a-dropdown :trigger="['click']">
          <template #overlay>
            <a-menu class="country-select" @click="handleChange">
              <a-menu-item class="country-option" v-for="lan of languages" :key="lan.key">
                <img :src="lan.img" alt="twiter" />
                {{ lan.text }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <img class="select-img" :src="languages[language].img" alt="twiter" />
            {{ languages[language].text }}
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </div>
    <div class="foot-info">
      <span> OpenGaga, Inc. All rights reserved.</span>
      <div class="text"><span>Terms</span> <span>Privacy</span></div>
      <div class="foot-imgs">
        <a href="https://t.me/opengaga"><img src="@/assets/imgs/gaode.svg" alt="telegram" /></a>
        <a href="https://twitter.com/opengaga"
          ><img src="@/assets/imgs/twitter.svg" alt="twiter"
        /></a>
        <a href="https://www.instagram.com/opengaga.nft/"
          ><img src="@/assets/imgs/ins.svg" alt="ins"
        /></a>
        <a href="https://discord.com/channels/856379437544767548/856379437544767551"
          ><img src="@/assets/imgs/games.svg" alt="game"
        /></a>
        <a href="https://www.youtube.com/channel/UChIQ1h4Kw0-y0JNKL0feHxw"
          ><img src="@/assets/imgs/youtube.svg" alt="youtube"
        /></a>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'footer',
    components: { DownOutlined },
    setup() {
      const { locale } = useI18n()

      const language = ref(0)
      const email = ref('')
      const languages = ref([
        {
          key: 'en',
          text: 'English',
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          img: require('@/assets/imgs/america.svg').default
        },
        {
          key: 'zh',
          text: '中文',
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          img: require('@/assets/imgs/china.svg').default
        }
      ])

      const handleChange = (e: any) => {
        language.value = languages.value.findIndex((lan) => lan.key === e.key)
        locale.value = languages.value[language.value].key
      }

      return {
        language,
        email,
        languages,
        handleChange
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
