//@ts-ignore
import { ethers, network } from 'hardhat'
import * as fs from 'fs'
import {
  developmentChains,
  FUNC,
  NEW_STORE_VALUE,
  PROPOSALS_FILE,
  PROPOSAL_DESCRIPTION,
  VOTING_DELAY,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'

export async function propose(
  args: any[],
  functionToCall: string,
  proposalDescription: string
) {
  const governor = await ethers.getContract('GovernorContract')
  const box = await ethers.getContract('Box')

  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  )
  console.log(
    `Proposing function ${encodedFunctionCall} \n on address ${box.address} \n with arguments ${args}`
  )
  console.log(`Proposal description: \n ${proposalDescription}`)

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )
  const proposeReceipt = await proposeTx.wait(1)

  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1)
  }

  const proposalId = proposeReceipt.events[0].args.proposalId
  console.log(`Proposed with proposal ID:\n  ${proposalId}`)

  const proposalState = await governor.state(proposalId)
  const proposalSnapShot = await governor.proposalSnapshot(proposalId)
  const proposalDeadline = await governor.proposalDeadline(proposalId)
  console.log(`proposalSnapShot:\n  ${proposalSnapShot}`)
  console.log(`proposalDeadline:\n  ${proposalDeadline}`)

  let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, 'utf8'))
  proposals[network.config.chainId!.toString()].push(proposalId.toString())
  fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals))
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
