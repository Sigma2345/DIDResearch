const { ethers } = require("hardhat")

async function updateDID() {
    const accounts = await ethers.getSigners();
    const person = accounts[1]; 
    const DIDdocumentContract = await ethers.getContract("MultiSigDID")
    const DIDdocument = DIDdocumentContract.connect(person)
    const name = await DIDdocument.getInfo(person.address, 1)
    console.log(`NAME: ${name}`); 
}

updateDID()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
