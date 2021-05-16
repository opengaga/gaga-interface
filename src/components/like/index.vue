<template>
  <div>
    <img
      @click="switchLike"
      v-if="likeData.like_state"
      class="like-icon"
      src="@/assets/imgs/unlike.svg"
    />
    <img @click="switchLike" v-else class="like-icon" src="@/assets/imgs/like.svg" />
    <span>{{ likeData.likes ?? 0 }}</span>
  </div>
</template>
<script lang="ts">
  import { useApi } from '@/hooks/useApi'
  import { message } from 'ant-design-vue'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    props: {
      bidData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const likeData = ref(props.bidData)
      const api = useApi()
      const json = {
        address: likeData.value.own_address,
        token: likeData.value.token,
        state: likeData.value.like_state === '0' ? '1' : '0'
      }

      const switchLike = () => {
        api
          .switchLike(json)
          .then((res: any) => {
            if (res.code === 200) {
              likeData.value.like_state = likeData.value.like_state ? 0 : 1
            }
          })
          .catch((err) => {
            message.error(err.msg)
          })
      }
      return { likeData, switchLike }
    }
  })
</script>
<style scoped lang="scss"></style>
