//@ts-ignore
import { ethers, network } from 'hardhat'
import * as fs from 'fs'
import {
  developmentChains,
  FUNC,
  MIN_DELAY,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'
import { moveTime } from '../utils/move-time'

export async function queueAndExecute() {
  const args = [NEW_STORE_VALUE]
  const box = await ethers.getContract('Box')
  const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args)
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  )
  const governor = await ethers.getContract('GovernorContract')
  console.log('Queueing...')

  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await queueTx.wait(1)

  if (developmentChains.includes(network.name)) {
    moveTime(MIN_DELAY + 1)
    await moveBlocks(1)
  }

  console.log('Executing')

  const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait(1)

  const boxNewValue = await box.retrieve()
  console.log(`New box value: ${boxNewValue.toString()}`)
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
