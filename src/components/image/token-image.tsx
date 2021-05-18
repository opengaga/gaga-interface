import { computed, defineComponent } from 'vue'

import { Image } from 'ant-design-vue'
import { ImageProps } from 'ant-design-vue/lib/image'
import { getIpfsUrl } from '@/utils/ipfs'

// erc721 & erc1155 image
// support url protocol: ipfs, http
const TokenImage = defineComponent({
  name: 'TokenImage',
  props: ImageProps,
  setup(props, context) {
    const url = computed(() => {
      if (props.src) {
        return getIpfsUrl(props.src)
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
