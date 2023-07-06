const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    11155111: {
        name: "sepolia",
    },
    1: {
        name: "mainnet",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

const userObject = {
    name:"", 
    dateOfBirth: "", 
    fatherName: "", 
    motherName: "", 
    address: "", 
    pinCode: "", 
    faceVector: "", 
    fingerPrint: "", 
    phoneNumber: "", 
}


module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    userObject
}