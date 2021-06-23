<template>
  <div class="activity-cnt">
    <p class="cnt-title">{{ $t('Activity') }}</p>
    <div class="content">
      <div class="filter-tags">
        <p class="title">{{ $t('Filters') }}</p>
        <div class="tags-wrap">
          <a-button
            v-for="item in tags"
            :key="item.key"
            :class="['tag-btns', selectedTags.includes(item.key) ? 'selected-tag' : '']"
            @click="toggleTags(item.key)"
          >
            <template #icon> <img class="tag-img" src="@/assets/imgs/starB.svg" /> </template>
            {{ item.text }}
          </a-button>
        </div>
      </div>
      <div class="act-list">
        <div class="list-tag">
          <span
            v-for="(item, idx) in ['All', 'My Activity']"
            :key="idx"
            :class="[selectedTab === idx ? 'selected-follower' : '']"
            @click="selectedTab = idx"
            >{{ item }}</span
          >
        </div>
        <div class="no-list" v-if="activities.length < 1">
          <p class="title">{{ $t('Nothing yet') }}</p>
          <p class="desc">{{ $t('Activity will be shown here') }}</p>
          <marketBtn>{{ $t('Explore BlackCat') }}</marketBtn>
        </div>
        <div class="list-items" v-else>
          <div class="list-item" v-for="(item, idx) in activities" :key="idx">
            <div class="item-avatar">
              <token-image class="avatar" :src="item.user_cover" />
              <HeartFilled v-if="false" class="img-icon" />
              <CheckOutlined class="img-icon" />
            </div>
            <div class="item-info">
              <div class="name">{{ item.user_address }}</div>
              <div class="desc">
                {{ $t('like by') }} <img src="@/assets/imgs/b2.png" alt="" />
                <span class="user"> Aello bob </span>
              </div>
              <div class="time">{{ item.ac_time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { HeartFilled, CheckOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref, watchEffect } from 'vue'
  import marketBtn from '@/components/backBtns/market-btn'
  import { useApi } from '@/hooks/useApi'
  import { Activity, ActivityType } from '@/api/types'
  import { useI18n } from 'vue-i18n'
  export default defineComponent({
    name: 'activity',
    components: { HeartFilled, CheckOutlined, marketBtn },
    setup() {
      const { t } = useI18n()

      const tags = ref<{ key: ActivityType; text: string }[]>([
        {
          key: ActivityType.follow,
          text: t('Follows')
        },
        {
          key: ActivityType.like,
          text: t('Likes')
        }
      ])
      const selectedTags = ref<ActivityType[]>([ActivityType.follow])
      const selectedTab = ref<0 | 1>(0)

      const activities = ref<Activity[]>([])

      const toggleTags = (key: ActivityType) => {
        if (selectedTags.value.includes(key)) {
          selectedTags.value = selectedTags.value.filter((_key) => key !== _key)
        } else {
          selectedTags.value.push(key)
        }
      }

      const api = useApi()

      watchEffect(() => {
        api.getActivityList({
          filters: selectedTags.value
        })
      })

      return { tags, selectedTags, toggleTags, selectedTab, activities }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
