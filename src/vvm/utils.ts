import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { CallError, OutOfGasError, UserRejectError, ContractError } from './errors'

export async function callMethod(contract: Contract, methodName: string, ...args: any[]) {
  const gasEstimate = await contract.estimateGas[methodName](...args)
    .then((gasEstimate) => {
      return gasEstimate
    })
    .catch((gasError) => {
      console.debug('Gas estimate failed, trying eth_call to extract error')

      return contract.callStatic[methodName](...args)
        .then((result) => {
          console.debug('Unexpected successful call after failed estimate gas', gasError, result)
          return new OutOfGasError(methodName)
        })
        .catch((callError: any) => {
          console.debug('Call threw error', callError)
          console.log(callError?.data?.message)
          return new CallError(methodName, 'Call threw error', callError?.data?.message)
        })
    })

  if (gasEstimate instanceof Error) {
    throw gasEstimate
  }

  return contract[methodName](...args)
    .then((response: TransactionResponse) => {
      return response
    })
    .catch((error: any) => {
      // if the user rejected the tx, pass this along
      if (error?.code === 4001) {
        throw new UserRejectError()
      } else {
        // otherwise, the error was unexpected and we need to convey that
        console.error(`${methodName} failed: ${error.message}`, error, methodName, args)
        throw new ContractError(methodName, `${methodName} failed: ${error.message}`)
      }
    })
}
