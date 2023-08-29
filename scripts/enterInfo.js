const { ethers } = require("hardhat")
const encryptData = require("./encryptData")

async function enterInformation() {
    const accounts = await ethers.getSigners();
    console.log(accounts.length);
    const person = accounts[2];
    const deployer = accounts[0];
    const DIDdocumentContract = await ethers.getContract("MultiSigDID")
    const DIDdocument = DIDdocumentContract.connect(deployer);
    const data = {
        name: "Jon Doe",
        dateOfBirth: "22-02-2001",
        fatherName: "John Doe Sr.",
        motherName: "Jane Doe",
        addrLine1: "123, Main Street",
        addrLine2: "Apt 123",
        pinCode: "123456",
        faceVector: "0x46846846541654762323456789",
        fingerPrint: "0x35962562652386523652365382",
        phoneNumber: "4896465464"
    }
    console.log(data.name)
    const transaction = await DIDdocument.addUser({
        data.name,
        data.dateOfBirth,
        data.fatherName,
        user: person.address,
    })
    const transactionReceipt = await transaction.wait(); 
    // console.log(transactionReceipt.logs); 
    console.log("Info entered")
}   

enterInformation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
