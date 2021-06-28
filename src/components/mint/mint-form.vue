<template>
  <div class="form-list">
    <div class="file-wraps">
      <div class="title">{{ $t('Upload file') }}</div>
      <upload-asset @file-change="fileChange" @preview-change="previewChange" />
    </div>
    <div class="form-item">
      <div class="form-item-left">
        <div class="title">{{ $t('Put on sale') }}</div>
        <div class="info">{{ $t("You'll receive bids on this item") }}</div>
      </div>
      <div class="form-item-right"><a-switch v-model:checked="formState.sale" /></div>
    </div>
    <!-- <div class="form-item" v-if="formState.sale">
      <div class="form-item-left">
        <div class="title">{{ $t('Instant sale price') }}</div>
        <div class="info">{{ $t('enterPrice') }}</div>
      </div>
      <div class="form-item-right"><a-switch v-model:checked="formState.hasPrice" /></div>
    </div> -->
    <div class="form-item" v-if="formState.sale">
      <div class="form-item-left">
        <div class="title">{{ $t('Price') }}</div>
        <a-input-number
          :min="100"
          class="wallet-input"
          placeholder="Sale Price"
          v-model:value="formState.price"
        />
      </div>
      <div class="form-item-right"></div>
    </div>
    <div class="form-item">
      <div class="form-item-left">
        <div class="title">{{ $t('Unlock once purchased') }}</div>
        <div class="info">{{ $t('Content will be unlocked after successful transaction') }}</div>
      </div>
      <div class="form-item-right"><a-switch v-model:checked="formState.purchase" /></div>
    </div>
    <!--
    <div class="form-item">
      <div class="form-item-left">
        <div>Choose collection</div>
        <router-link class="create-wallet" :to="{ path: 'connect' }"
          ><PlusCircleFilled class="svg" />
          <div class="wallet-title">Create</div>
          <div>ERC-721</div>
        </router-link>
      </div>
      <div class="form-item-right"></div>
    </div>
    -->
    <div class="form-item">
      <div class="form-item-left">
        <div>{{ $t('Name') }}</div>
        <a-input
          class="wallet-input"
          :placeholder="$t('nameplaceholder')"
          type="text"
          v-model:value="formState.name"
        />
      </div>
      <div class="form-item-right"></div>
    </div>
    <div class="form-item">
      <div class="form-item-left">
        <div> {{ $t('Description (Optional)') }}</div>
        <a-input
          class="wallet-input"
          :placeholder="$t('descPlaceholder')"
          type="text"
          v-model:value="formState.desc"
        />
      </div>
      <div class="form-item-right"></div>
    </div>
    <div v-if="isMulti" class="form-item">
      <div class="form-item-left">
        <div>{{ $t('Supply') }}</div>
        <a-input-number
          :min="1"
          class="wallet-input"
          placeholder="Supply"
          v-model:value="formState.supply"
        />
      </div>
      <div class="form-item-right"></div>
    </div>
    <div class="form-item">
      <div class="form-item-left">
        <div>{{ $t('Royalties') }}</div>
        <a-input-number
          :min="0"
          class="wallet-input"
          placeholder='E. g. 10%"'
          v-model:value="formState.point"
        />
      </div>
      <div class="form-item-right"></div>
    </div>
    <div class="form-item">
      <div class="form-item-left">
        <div>{{ $t('Properties (Optional)') }}</div>
        <div
          class="wallet-propeties"
          v-for="(property, index) of formState.properties"
          :key="index"
        >
          <a-input
            class="wallet-input"
            placeholder="E.g.Size"
            type="text"
            v-model:value="property[0]"
          />
          <a-input
            class="wallet-input"
            placeholder="E.g.Size"
            type="text"
            v-model:value="property[1]"
          />
        </div>
      </div>
      <div class="form-item-right"></div>
    </div>
    <enable-button
      class="wallet-create-btn"
      type="primary"
      shape="round"
      size="large"
      @click="$emit('submit')"
    >
      {{ $t('Create item') }}
    </enable-button>
    <span class="wallet-status-btn">{{ $t('unsaved changes') }}</span>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, reactive, watchEffect } from 'vue'
  // import { PlusCircleFilled } from '@ant-design/icons-vue'
  import UploadAsset from '../upload/upload-asset.vue'
  import { FormState } from './types'
  import EnableButton from '../button/enable-button'

  export default defineComponent({
    name: 'MintForm',
    components: { UploadAsset, EnableButton },
    props: {
      isMulti: Boolean,
      state: {
        type: Object as PropType<FormState>,
        required: true
      }
    },
    setup(props) {
      const formState = reactive<FormState>(props.state)

      const fileChange = (file) => {
        formState.file = file
      }

      const previewChange = (preview) => {
        formState.preview = preview
      }

      watchEffect(() => {
        if (
          formState.properties.length > 0 &&
          formState.properties[formState.properties.length - 1].length > 0 &&
          formState.properties[formState.properties.length - 1][0] &&
          formState.properties[formState.properties.length - 1][1]
        ) {
          formState.properties.push(['', ''])
        }
      })

      return {
        formState,
        previewChange,
        fileChange
      }
    }
  })
</script>
<style scoped lang="scss">
  @media screen and (max-width: 750px) {
    .form-list {
      width: auto !important;
    }
  }
  .form-list {
    width: 420px;
    .file-wraps {
      .title {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
    .form-item {
      margin-top: 48px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      .form-item-left {
        width: 330px;
        .title {
          color: $fontIconBtn;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .create-wallet {
          background: #fff;
          color: $globalBackground;
          border-radius: 8px;
          text-align: center;
          padding: 20px 40px;
          margin-top: 10px;
          width: 180px;
          display: block;
          .svg {
            font-size: 38px;
          }
          .wallet-title {
            font-weight: 600;
            margin-top: 10px;
          }
        }
        .wallet-propeties {
          display: flex;
          justify-content: space-between;
          .wallet-input {
            width: 48%;
          }
        }

        .ant-input-number-focused {
          box-shadow: none;
          border-bottom: 1px solid $fontIconBtn !important;
        }
        .wallet-input {
          width: 100%;
          color: #fff;
          margin-top: 10px;
          border-bottom: 1px solid #fff;
          border-top: none;
          border-left: none;
          border-right: none;
          background-color: transparent;
          box-shadow: none;

          &:focus {
            box-shadow: none;
            border-bottom: 1px solid $fontIconBtn;
          }
        }
      }
    }
    :deep(.wallet-create-btn) {
      width: 46%;
      margin-top: 35px;
      margin-right: 40px;
    }
  }
</style>
