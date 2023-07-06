const { ethers } = require("hardhat")

async function enterInformation() {
    const accounts = await ethers.getSigners();
    const person = accounts[1]; 
    const deployer = accounts[0];   
    const DIDdocumentContract = await ethers.getContract("MultiSigDID")
    const DIDdocument = DIDdocumentContract.connect(deployer); 
    await DIDdocument.addUser(
        "xxxx",
        "xxxxx",
        "xxxxxx",
        "xxxxxx",
        "xxxxxx",
        "xxxxxx",
        "xxxxxx",
        "xxxxxx",
        "xxxxxx",
        person.address,
    )
    console.log("Info entered")
}

enterInformation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
