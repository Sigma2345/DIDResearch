const x = require("./node_modules/hybrid-crypto-js");

var crypt = new x.Crypt();
var rsa = new x.RSA();
var publicKey;
var privateKey;
var encrypted;
var decrypted;
function generateKeys() {
  var rsa = new x.RSA();
  rsa.generateKeyPair(function (keyPair) {
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
  });
  setTimeout(function () {
    console.log("publicKey", publicKey);
    console.log("privateKey", privateKey);
  }, 3000);
}
generateKeys();

function Encryption(message) {
  var entropy = "Testing of RSA algorithm in javascript.";
  var crypt = new x.Crypt({ rsaStandard: "RSA-OAEP", entropy: entropy });
  var rsa = new x.RSA({ entropy: entropy, keySize: 4096 });
  encrypted = crypt.encrypt(publicKey, message);
  return encrypted;
}

function Decryption(encrypted) {
  var entropy = "Testing of RSA algorithm in javascript.";
  var crypt = new x.Crypt({ rsaStandard: "RSA-OAEP", entropy: entropy });
  var rsa = new x.RSA({ entropy: entropy });
  decrypted = crypt.decrypt(privateKey, encrypted);
  return decrypted;
}
function encryptPayload(
  name,
  dob,
  fname,
  mname,
  add_line1,
  add_pin,
  pbiv_face,
  pbiv_fprint,
  pnum,
  status_,
  approvals
) {
  let encryptionTimeStart = new Date();
  var enc_name = Encryption(name);
  var enc_dob = Encryption(dob);
  var enc_fname = Encryption(fname);
  var enc_mname = Encryption(mname);
  var enc_add_line1 = Encryption(add_line1);
  var enc_add_pin = Encryption(add_pin);
  var enc_pbiv_face = Encryption(pbiv_face);
  var enc_pbiv_fprint = Encryption(pbiv_fprint);
  var enc_pnum = Encryption(pnum);
  var status_ = Encryption(status_);
  var approvals = Encryption(approvals);
  let encryptionTimeEnd = new Date();
  console.log(
    `Time taken for ecryption:${encryptionTimeEnd - encryptionTimeStart}`
  );

  var payload = {
    NAME: enc_name,
    DOB: enc_dob,
    FATHER_NAME: enc_fname,
    MOTHER_NAME: enc_mname,
    ADDRESS: {
      LINE1: enc_add_line1,
      PINCODE: enc_add_pin,
    },
    PBIV: {
      FACE: enc_pbiv_face,
      FINGERPRINT: enc_pbiv_fprint,
    },
    PHONE_NUMBER: enc_pnum,
    STATUS: status_,
    APPROVALS: approvals,
  };
  return payload;
}
function decryptPayload(payload) {
  let decryptionTimeStart = new Date();
  var enc_name = Decryption(payload.NAME);
  var enc_dob = Decryption(payload.DOB);
  var enc_fname = Decryption(payload.FATHER_NAME);
  var enc_mname = Decryption(payload.MOTHER_NAME);
  var enc_add_line1 = Decryption(payload.ADDRESS.LINE1);
  var enc_add_pin = Decryption(payload.ADDRESS.PINCODE);
  var enc_pbiv_face = Decryption(payload.PBIV.FACE);
  var enc_pbiv_fprint = Decryption(payload.PBIV.FINGERPRINT);
  var enc_pnum = Decryption(payload.PHONE_NUMBER);
  var status_ = Decryption(payload.STATUS);
  var approvals = Decryption(payload.APPROVALS);
  let decryptionTimeEnd = new Date();
  console.log(
    `Time taken for decryption${decryptionTimeEnd - decryptionTimeStart}`
  );
}
setTimeout(() => {
  var test = encryptPayload(
    "Alice",
    "22-02-2001",
    "Bob",
    "Robin",
    "7454 Wall Street New York",
    "10005",
    "dfghjgfdghgfjuiytdsfyuytfdsguimnvcjnbfgrthkbvfgdrtyujnbmvcgd",
    "jhgjftyuhjftyuhvfjtyuoijlhkgftyuhvghfyuhjkghf",
    "9321485145",
    "ACTIVE",
    "nyhghfdhfvjbdjhbvdsvbhdjskbdkjfs"
  );
  console.log(test);
  console.log(decryptPayload(test));
}, 10000);