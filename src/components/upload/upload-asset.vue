<template>
  <div class="file-selector">
    <div class="file-selector-type" v-if="!preview">
      <div class="file-types"> PNG, GIF, WEBP, MP4 or MP3. Max 30mb. </div>
      <a-upload
        :action="onChange"
        list-type="picture"
        :show-upload-list="false"
        @change="handleChange"
      >
        <a-button type="primary" shape="round">
          <upload-outlined></upload-outlined>
          Choose File
        </a-button>
      </a-upload>
    </div>
    <div class="file-img" v-else>
      <img @click="handleClose" class="close-icon" src="@/assets/imgs/close.svg" />
      <img class="file-cnt" :src="preview" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSelectFile } from '@/hooks/useSelectFile'

  export default defineComponent({
    name: 'UploadAsset',
    setup(_, context) {
      const { file, preview, onChange } = useSelectFile()
      const handleChange = () => {
        context.emit('file-change', file)
        context.emit('preview-change', preview)
      }

      const handleClose = () => onChange(null)

      return {
        preview,
        handleClose,
        handleChange,
        onChange
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .file-img {
      height: 120px;
      .close-icon {
        right: 10px !important;
        top: 10px !important;
      }
    }
  }
  .file-selector {
    width: 100%;
    height: 170px;
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    color: #8d8d8d;
    border: 1px solid #fff;
    position: relative;
    .file-selector-type {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .file-types {
      margin-bottom: 20px;
    }
  }
  .file-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .close-icon {
      position: absolute;
      right: 30px;
      top: 20px;
      cursor: pointer;
      z-index: 100;
    }
    .file-cnt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: auto;
      z-index: 99;
    }
  }
</style>
