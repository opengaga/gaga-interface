import { ref } from '@vue/reactivity'

export const useSelectFile = () => {
  const file = ref<Blob | null>(null)
  const preview = ref<string | null>(null)

  const onChange = (eventOrBlob: Event | Blob | null) => {
    return new Promise((resolve) => {
      let blob: Blob | null

      if (eventOrBlob instanceof Event) {
        const target = eventOrBlob.target as HTMLInputElement
        if (target.files) {
          eventOrBlob = target.files[0]
          blob = eventOrBlob
        } else {
          blob = null
        }
      } else {
        blob = eventOrBlob
      }

      if (blob) {
        file.value = blob
        preview.value = URL.createObjectURL(blob)
        resolve(preview.value)
      } else {
        file.value = null
        preview.value = null
      }
    })
  }

  return {
    file,
    preview,
    onChange
  }
}
