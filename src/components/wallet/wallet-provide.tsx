import type { AbstractConnector } from '@web3-react/abstract-connector'
import type { ActivateFunc, ConnectorUpdate, Web3ReactManagerState } from './types'
import type { Provider } from '@ethersproject/providers'

import { Web3Provider } from '@ethersproject/providers'
import { ref, reactive, toRefs } from '@vue/reactivity'
import { computed, defineComponent, onUnmounted, provide, watch } from 'vue'
import warning from 'tiny-warning'
import { augmentConnectorUpdate, StaleConnectorError } from './utils'
import { ConnectorEvent } from './types'
import { defaultProvider } from '@/utils/constants'

let provider: Provider = defaultProvider

export default defineComponent({
  name: 'wallet-provide',
  setup(_, context) {
    const updateBusterRef = ref(-1)
    const state = reactive<Web3ReactManagerState>({
      connector: undefined,
      chainId: undefined,
      account: undefined,
      error: undefined
    })

    const active = computed(() => {
      return (
        state.connector !== undefined &&
        state.chainId !== undefined &&
        state.account !== undefined &&
        !state.error
      )
    })

    const getProvider = () => {
      if (active.value) {
        return provider
      } else {
        return defaultProvider
      }
    }

    const getSigner = () => {
      if (active.value) {
        return (provider as Web3Provider).getSigner()
      } else {
        return null
      }
    }

    const activate: ActivateFunc = async (
      connector: AbstractConnector,
      throwErrors = false
    ): Promise<void> => {
      const updateBusterInitial = updateBusterRef.value
      state.connector = connector

      let activated = false
      try {
        const update = await connector.activate().then(
          (update): ConnectorUpdate => {
            activated = true
            return update
          }
        )

        const augmentedUpdate = await augmentConnectorUpdate(connector, update)

        if (updateBusterRef.value > updateBusterInitial) {
          throw new StaleConnectorError()
        }
        provider = new Web3Provider(augmentedUpdate.provider, 'any')
        state.chainId = augmentedUpdate.chainId
        state.account = augmentedUpdate.account
        state.error = undefined
      } catch (error) {
        state.error = error
        if (error instanceof StaleConnectorError) {
          activated && connector.deactivate()
          warning(false, `Suppressed stale connector activation ${connector}`)
        } else if (throwErrors) {
          activated && connector.deactivate()
          throw error
        } else {
          state.connector = connector
        }
      }
    }

    const handleUpdate = async (update: ConnectorUpdate): Promise<void> => {
      if (!state.connector) {
        throw new Error("This should never happen, it's just so Typescript stops complaining")
      }

      const updateBusterInitial = updateBusterRef.value

      try {
        const augmentedUpdate = await augmentConnectorUpdate(
          state.connector as AbstractConnector,
          update
        )

        if (updateBusterRef.value > updateBusterInitial) {
          throw new StaleConnectorError()
        }
        provider = new Web3Provider(augmentedUpdate.provider, 'any')
        state.chainId = augmentedUpdate.chainId
        state.account = augmentedUpdate.account
        state.error = undefined
      } catch (error) {
        if (error instanceof StaleConnectorError) {
          warning(false, `Suppressed stale connector activation ${state.connector}`)
        } else {
          state.error = error
        }
      }
    }
    const handleError = (error: Error): void => {
      state.error = error
    }
    const handleDeactivate = (): void => {
      state.connector = undefined
      provider = defaultProvider
      state.chainId = undefined
      state.account = undefined
      state.error = undefined
    }

    const stop = watch([() => state.connector], ([connector], _, onInvalidate) => {
      if (connector) {
        connector
          .on(ConnectorEvent.Update, handleUpdate)
          .on(ConnectorEvent.Error, handleError)
          .on(ConnectorEvent.Deactivate, handleDeactivate)
      }

      onInvalidate(() => {
        if (connector) {
          connector
            .off(ConnectorEvent.Update, handleUpdate)
            .off(ConnectorEvent.Error, handleError)
            .off(ConnectorEvent.Deactivate, handleDeactivate)
        }
      })
    })
    onUnmounted(() => {
      const { connector } = state
      connector && connector.deactivate()
      stop()
    })

    provide('wallet-state', toRefs(state))
    provide('wallet-active', active)
    provide('wallet-get-provider', getProvider)
    provide('wallet-get-signer', getSigner)
    provide('wallet-activate', activate)

    return () => <>{context.slots.default?.()}</>
  }
})
