import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import 'dotenv/config'
import 'solidity-coverage'
import 'hardhat-deploy'

/** @type import('hardhat/config').HardhatUserConfig */

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //     url: MAINNET_RPC_URL,
      // },
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    //coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ['NFTMarketplace'],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    user1: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
      {
        version: '0.4.24',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.6.12',
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
}
