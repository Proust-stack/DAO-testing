const networkConfig = {
  31337: {
    name: 'localhost',
    ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
    gasLane:
      '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc', // 30 gwei
    mintFee: '10000000000000000', // 0.01 ETH
    callbackGasLimit: '500000', // 500,000 gas
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one is ETH/USD contract on Kovan
  4: {
    name: 'rinkeby',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
    vrfCoordinatorV2: '0x6168499c0cFfCaCD319c818142124B7A15E857ab',
    gasLane:
      '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
    callbackGasLimit: '500000', // 500,000 gas
    mintFee: '10000000000000000', // 0.01 ETH
    subscriptionId: '14332', // add your ID here!
  },
}

const DECIMALS = '18'
const INITIAL_PRICE = '200000000000000000000' // ethers.utils.parseUnits("2000", "ether")
const developmentChains = ['hardhat', 'localhost']
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const MIN_DELAY = 3600
const VOTING_PERIOD = 5
const VOTING_DELAY = 1
const QUORUM_PERCENTAGE = 4
const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
const NEW_STORE_VALUE = 77
const FUNC = 'store'
const PROPOSAL_DESCRIPTION = 'Proposal #1: Store number 77 in the box'
const PROPOSALS_FILE = 'proposals.json'

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_PRICE,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  MIN_DELAY,
  VOTING_PERIOD,
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
  ADDRESS_ZERO,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  PROPOSALS_FILE,
}
