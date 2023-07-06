const { network, ethers } = require("hardhat"); 
const { verify } = require('../utils/verify')
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

module.exports = async({
    getNamedAccounts, 
    deployments
}) => {
    const { deploy, log } = deployments; 
    const {deployer} = await getNamedAccounts(); 
    const chainId = network.config.chainId;

    const arguments = []
    console.log(deployer)
    const waitBlockConfirmations = 1;
    const raffle = await deploy("MultiSigDID", {
        from: deployer, 
        args: arguments,
        log: true, 
        waitConfirmations: waitBlockConfirmations
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(raffle.address, arguments)
    }

}
