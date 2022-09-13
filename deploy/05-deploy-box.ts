import { HardhatRuntimeEnvironment } from 'hardhat/types'
//@ts-ignore
import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'

const deployBoxContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const box = await deploy('Box', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })

  const timeLock = await ethers.getContract('TimeLock')
  const boxContract = await ethers.getContractAt('Box', box.address)

  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
  await transferOwnerTx.wait(1)
}

export default deployBoxContract
