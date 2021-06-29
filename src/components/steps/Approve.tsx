import { useApprove } from '@/hooks/useApprove'
import { Button, Alert } from 'ant-design-vue'
import { defineComponent, inject, Ref, ref, watchEffect } from 'vue'

const ApprovalForAllStep = defineComponent({
  name: 'approval-for-all-step',
  props: {
    step: {
      type: Number,
      required: true
    },
    spender: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const finishStep = inject<Ref<number>>('steps-finished', ref(0))
    const nextStep = inject<() => void>('steps-next')
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const address = ref(props.address)
    const spender = ref(props.spender)
    const { isApproved, approve } = useApprove(address, spender)

    watchEffect(() => {
      address.value = props.address
      spender.value = props.spender
    })

    watchEffect(() => {
      if (isApproved.value && finishStep.value === props.step) {
        nextStep?.()
      }
    })

    return () => (
      <div>
        <div>
          <h3>Approve</h3>
          <p>Checking balance and approving</p>
          {error.value && <Alert message={error.value?.message || 'Error'} showIcon />}
        </div>
        <Button
          size="large"
          type="primary"
          shape="round"
          loading={loading.value}
          disabled={finishStep.value !== props.step}
          onClick={() => {
            loading.value = true
            approve()
              .then((transaction) => transaction.wait())
              .then(() => {
                return isApproved
              })
              .then((success) => {
                if (success) {
                  error.value = null
                  nextStep?.()
                } else {
                  throw new Error('Approval error')
                }
              })
              .catch((err) => {
                error.value = err
                console.error(err)
              })
              .finally(() => {
                loading.value = false
              })
          }}
        >
          {finishStep.value > props.step
            ? 'Done'
            : loading.value
            ? 'In Progress...'
            : error.value
            ? 'Retry'
            : 'Start'}
        </Button>
      </div>
    )
  }
})

export default ApprovalForAllStep
