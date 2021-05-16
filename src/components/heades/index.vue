<template>
  <header class="header">
    <router-link :to="{ path: '/' }">
      <img class="brand" src="@/assets/imgs/brandLogo.svg" />
    </router-link>

    <div class="ipt-wrap">
      <a-input
        size="large"
        type="text"
        class="head-ipt"
        placeholder="Search by creator, collectible or collection"
        v-model="searchValue"
      >
        <template #prefix>
          <img src="@/assets/imgs/search-icon.svg" />
        </template>
      </a-input>
    </div>
    <ul class="lists">
      <li v-for="(item, index) in headerLists" :key="index">
        <a-dropdown v-if="item.children" :trigger="['click']" placement="bottomRight">
          <a class="ant-dropdown-link">{{ item.name }}<DownOutlined /></a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="({ name, link }, index) in item.children" :key="index">
                <router-link :to="link">{{ name }}</router-link>
              </a-menu-item>
              <!-- <div class="modal-imgs">
                <img src="@/assets/imgs/gaode.svg" />
                <img src="@/assets/imgs/gaode.svg" />
                <img src="@/assets/imgs/gaode.svg" />
                <img src="@/assets/imgs/gaode.svg" />
                <img src="@/assets/imgs/gaode.svg" />
              </div> -->
            </a-menu>
          </template>
        </a-dropdown>
        <router-link v-else active-class="selectedHeaderLink" :to="{ path: item.link }">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div class="btns-wrap">
      <a-space>
        <a-button shape="round" size="large" type="primary" @click="router.push('/create')">
          Create
        </a-button>
        <div v-if="active" class="money-wrap" @click="showAccountModal = !showAccountModal">
          <span><format-balance :balance="balance" /></span>
          <img src="@/assets/imgs/link-icon.svg" />
        </div>
        <a-button shape="round" size="large" v-else-if="error && networkError" type="danger">
          Network Error
        </a-button>
        <a-button shape="round" size="large" v-else type="ghost" @click="connect">
          Connect wallet
        </a-button>
      </a-space>
    </div>

    <div class="menu-lists">
      <a-dropdown :trigger="['click']" key="menu" placement="bottomRight">
        <BarsOutlined class="menu" />
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="(item, index) in headerLists" :key="index">
              <router-link class="link-name" v-if="!item.children" :to="{ path: item.link }">{{
                item.name
              }}</router-link>
            </a-menu-item>
            <a-sub-menu key="test" title="Community">
              <a-menu-item v-for="(item, index) in subMenu[0].children" :key="index">
                <router-link class="link-name" :to="{ path: item.link }">{{
                  item.name
                }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
  <Account :balance="balance" @closeAccount="closeAccount" v-if="showAccountModal" />
</template>
<script lang="ts">
  import { DownOutlined, BarsOutlined } from '@ant-design/icons-vue'

  import { defineComponent, ref, watchEffect, computed } from 'vue'
  import Account from './account.vue'
  import FormatBalance from '@/components/format/FormatBalance'
  import { useWallet } from '@/hooks/useWallet'
  import { useBalance } from '@/hooks/useBalance'
  import { useRouter } from 'vue-router'
  import { injectedConnector } from '@/connectors'
  import { UnsupportedChainIdError } from '../wallet/utils'

  export default defineComponent({
    name: 'header',
    components: {
      Account,
      DownOutlined,
      BarsOutlined,
      FormatBalance
    },
    setup() {
      const router = useRouter()
      const { active, error, activate, account } = useWallet()
      const searchValue = ref<string>('')
      const showAccountModal = ref<boolean>(false)
      const networkError = ref(false)
      const balance = useBalance(account)
      const headerLists: any = ref([
        {
          name: 'Browse',
          link: '/browse'
        },
        {
          name: 'Activity',
          link: '/activity'
        },
        {
          name: 'MyItems',
          link: '/myItems'
        },
        {
          name: 'Fllowing',
          link: '/fllowing'
        },
        {
          name: 'Community',
          children: [
            { link: '/about', name: 'BCAT Token' },
            { link: '/', name: 'Discussion' },
            { link: '/', name: 'Voting' }
          ]
        }
      ])
      const subMenu = computed(() => {
        return headerLists.value.filter((item) => item.children)
      })
      const closeAccount = () => {
        showAccountModal.value = false
      }

      watchEffect(() => {
        if (error?.value) {
          if (error.value instanceof UnsupportedChainIdError) {
            networkError.value = true
          } else {
            networkError.value = false
          }
        } else {
          networkError.value = false
        }
      })

      return {
        searchValue,
        showAccountModal,
        headerLists,
        closeAccount,
        active,
        router,
        activate,
        subMenu,
        error,
        networkError,
        balance
      }
    },
    methods: {
      async connect(): Promise<void> {
        await this.activate?.(injectedConnector)
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
