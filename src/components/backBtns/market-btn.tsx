import { defineComponent } from 'vue'
const marketBtn = defineComponent({
  name: 'marketBtn',
  setup(_, { slots }) {
    return () => (
      <>
        <router-link to="/browse">
          <a-button type="primary" size="large" shape="round">
            {slots.default?.() || 'Browse marketplace'}
          </a-button>
        </router-link>
      </>
    )
  }
})

export default marketBtn
