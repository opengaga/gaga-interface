<template>
  <div class="profile-container">
    <div class="profile-wrap">
      <div class="profile-left">
        <p class="title">{{ $t('Edit profile') }}</p>
        <p>{{
          $t(
            'You can set preferred display name, create your branded profile URL and manage other personal settings'
          )
        }}</p>
        <div class="form-item">
          <p class="name">{{ $t('Display name') }}</p>
          <input v-model="userModel.username" type="text" placeholder="Enter an amount" />
        </div>
        <div class="form-item">
          <p class="name">{{ $t('Custom URL') }}</p>
          <input
            v-model="userModel.short_url"
            type="text"
            placeholder="www.opengaga.io / enter your custom URL"
          />
        </div>
        <div class="form-item">
          <p class="name">{{ $t('Bio') }}</p>
          <input
            v-model="userModel.desc"
            type="text"
            placeholder="Tell about yourself in few words"
          />
        </div>
        <div class="form-item">
          <p class="name">{{ $t('Personal site or portfolio') }}</p>
          <input v-model="userModel.website" type="text" placeholder="https://" />
        </div>
        <a-button type="primary" shape="round" class="submit-btn" @click="updateUserInfo">{{
          $t('Update profile')
        }}</a-button>
      </div>
      <div class="form-avatar">
        <img v-if="imageUrl" class="avatar" :src="imageUrl" alt="avatar" />
        <img v-else class="avatar" src="@/assets/imgs/collect-avatar.png" alt="avatar" />
        <p>{{ $t('We recommend an image of at least 400x400. Gifs work too.') }}</p>
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button type="primary" shape="round">
            <upload-outlined></upload-outlined>
            {{ $t('Click to upload') }}
          </a-button>
        </a-upload>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { useApi } from '@/hooks/useApi'
  import { EditUserRequest } from '@/api/types'
  import { useWallet } from '@/hooks/useWallet'

  interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
  }

  interface FileInfo {
    file: FileItem
    fileList: FileItem[]
  }

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
  export default defineComponent({
    name: 'profile',

    setup() {
      const fileList = ref([])
      const loading = ref<boolean>(false)
      const imageUrl = ref<string>('')
      const api = useApi()
      const { account } = useWallet()
      const userModel = ref<EditUserRequest>({
        username: '',
        address: '',
        cover: '',
        desc: '',
        short_url: '',
        website: '',
        twitter: '',
        pic: ''
      })

      const handleChange = (info: FileInfo) => {
        if (info.file.status === 'uploading') {
          loading.value = true
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url
            loading.value = false
          })
        }
        if (info.file.status === 'error') {
          loading.value = false
          message.error('upload error')
        }
      }

      const beforeUpload = (file: FileItem) => {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!')
        }
        return isLt2M
      }

      const updateUserInfo = () => {
        api
          .editUserInfo({
            username: userModel.value?.username ?? '',
            address: account?.value ?? '',
            cover: userModel.value?.cover ?? '',
            desc: userModel.value?.desc ?? '',
            short_url: userModel.value?.short_url ?? '',
            website: userModel.value?.website ?? '',
            twitter: userModel.value?.twitter ?? '',
            pic: imageUrl.value
          })
          .then(() => {
            message.success('update success')
          })
          .catch((err) => {
            message.error(err.msg)
          })
      }

      return {
        fileList,
        loading,
        handleChange,
        beforeUpload,
        updateUserInfo,
        userModel,
        imageUrl
      }
    }
  })
</script>
<style scoped lang="scss">
  @import './index.scss';
</style>
