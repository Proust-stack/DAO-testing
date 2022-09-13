//@ts-ignore
import { ethers, network } from 'hardhat'
import * as fs from 'fs'
import {
  developmentChains,
  PROPOSALS_FILE,
  VOTING_PERIOD,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'

const proposalIndex = 0

export async function vote(proposalIndex: number) {
  let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, 'utf8'))
  const proposalId = proposals[network.config.chainId!][proposalIndex]
  const voteWay = 1 // 1 = for, 2 = against
  const governor = await ethers.getContract('GovernorContract')
  const reason = 'Some reason'

  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  )
  await voteTxResponse.wait(1)

  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1)
  }

  const proposalState = await governor.state(proposalId)
  console.log('Voted. State: ', proposalState)
}

vote(proposalIndex)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
