import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
//@ts-ignore
import { ethers } from 'hardhat'

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })
  log('Governance Token deployed to address: ', governanceToken.address)
  await delegate(governanceToken.address, deployer)
  log('Delegated')
}
const delegate = async function (
  governanceTokenAddress: string,
  delegatedAccount: string
) {
  const governanceToken = await ethers.getContractAt(
    'GovernanceToken',
    governanceTokenAddress
  )
  const trx = await governanceToken.delegate(delegatedAccount)
  await trx.wait(1)
  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  )
}

export default deployGovernanceToken
