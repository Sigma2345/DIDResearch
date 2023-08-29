const crpyto = require('crypto');

async function encryptData(data) {
    const { publicKey, privateKey } = await crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    });

    const encryptedData = await crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data)
    );
    return {encryptedData, privateKey}
}

module.exports = { encryptData };
