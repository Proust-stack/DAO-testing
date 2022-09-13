import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
//@ts-ignore
import { ethers } from 'hardhat'
import { MIN_DELAY } from '../helper-hardhat-config'

const deployTimeLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const timeLock = await deploy('TimeLock', {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    waitConfirmations: 1,
  })
}

export default deployTimeLock
