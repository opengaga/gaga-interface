import { computed, defineComponent, ref } from 'vue'

import './index.scss'

const ReadMore = defineComponent({
  name: 'read-more',
  props: {
    length: {
      type: Number,
      default: () => 200
    },
    text: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    const showMore = ref<boolean>(false)

    const textLength = computed(() => {
      return props.text.length
    })

    return { showMore, textLength }
  },
  render() {
    const {
      $props: { text, length },
      textLength,
      showMore
    } = this

    return (
      <>
        {textLength > length ? (
          <div>
            {text.slice(0, length)}

            {showMore && <span>{text.slice(length)}</span>}

            <span
              onClick={() => {
                this.showMore = !showMore
              }}
              class="read-more-btn"
            >
              &nbsp;{showMore ? 'Close' : 'Read more'}
            </span>
          </div>
        ) : (
          <div>{text}</div>
        )}
      </>
    )
  }
})

export default ReadMore
