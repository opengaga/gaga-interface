import { computed, defineComponent } from 'vue'

import { Image } from 'ant-design-vue'
import { ImageProps } from 'ant-design-vue/lib/image'

// erc721 & erc1155 image
// support url protocol: ipfs, http
const TokenImage = defineComponent({
  name: 'TokenImage',
  props: ImageProps,
  setup(props, context) {
    const url = computed(() => {
      if (props.src) {
        if (props.src.startsWith('http')) {
          return props.src
        } else if (props.src.startsWith('ipfs')) {
          return props.src.replace('ipfs://', 'https://ipfs.io/')
        }
      }

      return 'https://oktools.net/ph/300x200?t='
    })

    return () => (
      <>
        <Image {...context.attrs} {...props} src={url.value} />
      </>
    )
  }
})

export default TokenImage
