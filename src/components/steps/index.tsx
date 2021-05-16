import { defineComponent, provide, ref, h } from 'vue'
import { getSlot, isEmptyElement } from '../utils'

const Steps = defineComponent({
  name: 'steps',
  setup(_, context) {
    const finishStep = ref(0)

    const children = context.slots.default?.().filter((vnode) => !isEmptyElement(vnode))
    const count = children?.length

    const nextStep = () => {
      finishStep.value++

      if (finishStep.value === count) {
        context.emit('done')
      }
    }

    provide('steps-finished', finishStep)
    provide('steps-next', nextStep)
  },
  render() {
    const children = getSlot(this)

    return (
      <>
        {children?.map((child, index) => {
          return h(child, {
            step: index,
            key: index,
            ...child.props
          })
        })}
      </>
    )
  }
})

export default Steps
