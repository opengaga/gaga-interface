import { defineComponent, onMounted, ref } from 'vue'

import { update } from 'jdenticon'

const AddressImage = defineComponent({
  name: 'AddressImage',
  props: {
    src: String,
    size: Number
  },
  setup(props) {
    const imgRef = ref<any>()

    onMounted(() => {
      if (imgRef.value) {
        update(imgRef.value, props.src || 'unknown')
      }
    })

    return { imgRef }
  },
  render() {
    return (
      <>
        <svg
          {...this.$attrs}
          ref="imgRef"
          height={this.$props.size ?? 40}
          width={this.$props.size ?? 40}
        />
      </>
    )
  }
})

export default AddressImage
