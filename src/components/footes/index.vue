<template>
  <footer class="footers">
    <div class="website-info">
      <div class="email-info">
        <div class="title"> Get the latest OpenGaga updates, highlights and team activities </div>
        <div class="email-wrap">
          <input class="email-ipt" v-model="email" placeholder="Your e-mail" />
          <span class="link">I'm in</span>
        </div>
      </div>
      <div class="foot-links">
        <p class="title">OpenGaga</p>
        <p>
          <router-link to="browse">Browse</router-link>
        </p>
        <p>
          <router-link to="activity">Activity</router-link>
        </p>
        <p>
          <router-link to="create">Create</router-link>
        </p>
      </div>
      <div class="foot-links">
        <p class="title">Community</p>
        <p><router-link to="about">GAGA Token</router-link> </p>
        <!-- <p>Discussion</p>
        <p>Voting</p> -->
      </div>
      <div class="foot-links">
        <p class="title langue">Language</p>
        <a-dropdown :trigger="['click']">
          <template #overlay>
            <a-menu class="country-select" @click="handleChange">
              <a-menu-item class="country-option" key="2">
                <img src="@/assets/imgs/america.svg" alt="twiter" />
                English
              </a-menu-item>
              <!-- <a-menu-item class="country-option" key="1">
                <img src="@/assets/imgs/china.svg" alt="twiter" />
                中文
              </a-menu-item>
              <a-menu-item class="country-option" key="3">
                <img src="@/assets/imgs/korea.svg" alt="twiter" />
                韩文
              </a-menu-item>
              <a-menu-item class="country-option" key="4">
                <img src="@/assets/imgs/japan.svg" alt="twiter" />
                日文
              </a-menu-item>
              <a-menu-item class="country-option" key="5">
                <img src="@/assets/imgs/itlia.svg" alt="twiter" />
                俄文
              </a-menu-item>
              <a-menu-item class="country-option" key="5">
                <img src="@/assets/imgs/singpo.svg" alt="twiter" />
                新加坡文
              </a-menu-item> -->
            </a-menu>
          </template>
          <a-button>
            <img class="select-img" src="@/assets/imgs/america.svg" alt="twiter" />
            English
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </div>
    </div>
    <div class="foot-info">
      <span> OpenGaga, Inc. All rights reserved.</span>
      <div class="text"><span>Terms</span> <span>Privacy</span></div>
      <div class="foot-imgs">
        <a href=""><img src="@/assets/imgs/gaode.svg" alt="gaode" /></a>
        <a href=""><img src="@/assets/imgs/twitter.svg" alt="twiter" /></a>
        <a href=""><img src="@/assets/imgs/ins.svg" alt="ins" /></a>
        <a href=""><img src="@/assets/imgs/games.svg" alt="game" /></a>
        <a href=""><img src="@/assets/imgs/youtube.svg" alt="youtube" /></a>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'footer',
    components: { DownOutlined },
    data() {
      return {
        language: '中文',
        email: ''
      }
    },
    methods: {
      handleChange(e: any) {
        console.log(e)
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
