require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/J7ESyt2a44P4yQSd5GJ_Q6Rrgn3jrrVc',
      accounts: [
        '39390f983e056fc88fbba2d35268c5339c9ab3e044993e78d7fe9ff52bfa6315',
      ],
    },
  },
}
