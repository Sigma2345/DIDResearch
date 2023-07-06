const { ethers } = require("hardhat")

async function updateDID() {
    const accounts = await ethers.getSigners();
    const person = accounts[1]; 
    const deployer = accounts[0];   
    const DIDdocumentContract = await ethers.getContract("MultiSigDID")
    const DIDdocumentperson = DIDdocumentContract.connect(person)
    const DIDdocumentdeployer = DIDdocumentContract.connect(deployer)
    console.log(person.address); 
    await DIDdocumentperson.approveChange(
        person.address,
        1,
        "yyyy", 
    )
    console.log("CHANGE APPROVED FROM CLIENT SIDE");
    await DIDdocumentdeployer.approveChange(
        person.address,
        1,
        "yyyy", 
    )
    console.log("CHANGE APPROVED FROM SERVER SIDE");

}

updateDID()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
