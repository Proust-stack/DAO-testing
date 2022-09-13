import { network } from 'hardhat'

export async function moveTime(amount: number) {
  console.log('Moving timestamp...')
  await network.provider.send('evm_increaseTime', [amount])
  console.log(`${amount} seconds have passed`)
}
