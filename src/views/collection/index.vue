<template>
  <div class="single-wrap">
    <!-- <img class="collect-close" src="@/assets/imgs/close.svg" /> -->
    <div class="collection-title">Collection</div>
    <div class="collection-headline">You pay Max amount is 123456.21</div>
    <div class="form-list">
      <div class="file-selector">
        <div class="upload-file">
          <img :src="formState.file" />
        </div>
        <div class="collect-upload">
          <div class="upload-text">We recommend an image of at least 400x400. Gifs work too.</div>
          <a-upload
            action="http://8.136.212.70/v1/upload/file"
            list-type="picture"
            :show-upload-list="false"
            v-model:file-list="fileList"
            @change="handleChange"
          >
            <a-button type="primary" shape="round">
              <upload-outlined></upload-outlined>
              Choose File
            </a-button>
          </a-upload>
        </div>
      </div>
      <div class="form-item">
        <div class="label">Display name(required)</div>
        <a-input
          class="wallet-input"
          placeholder='Enter token name"'
          type="text"
          v-model:value="formState.Name"
        />
        <div class="opa05">Token name cannot be changed in future</div>
      </div>

      <div class="form-item">
        <div class="label"> Symbol (required)</div>
        <a-input
          class="wallet-input"
          placeholder="Enter token symbol"
          type="text"
          v-model:value="formState.desc"
        />
      </div>

      <div class="form-item">
        <div class="label"> Description (optional)</div>
        <a-input
          class="wallet-input"
          placeholder="Spread some words about your token collection"
          type="text"
          v-model:value="formState.point"
        />
      </div>
      <div class="form-item">
        <div class="label"> Short url</div>
        <a-input
          class="wallet-input"
          placeholder="gaganft.vip/ Enter short url"
          type="text"
          v-model:value="formState.point"
        />
        <div class="opa05">Will be used as public URL</div>
      </div>

      <div class="wallet-create-btn">Create collection</div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'

  import router from '@/router'

  export default defineComponent({
    name: 'Single',
    setup() {
      const fileList = ref([])
      const formState = reactive({
        sale: false,
        price: false,
        purchase: false,
        file: '',
        Name: '',
        desc: '',
        point: ''
      })
      const handleClose = () => {
        formState.file = ''
      }
      const handleChange = (e: any) => {
        if (e.file.response && e.file.response.code === 200) {
          formState.file = e.file.response.path
        }
      }
      const toRouter = (path: string) => {
        router.push(path)
      }
      return {
        toRouter,
        formState,
        fileList,
        handleChange,
        handleClose
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
