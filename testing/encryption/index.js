// import  'hybrid-crypto-js';
const x = require("./node_modules/hybrid-crypto-js");
// Basic initialization4

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

//Encryption
// setTimeout(function (){
// Encryption
// },5000);
function Encryption(message) {
  // console.log(entropy);
  // console.log(publicKey);
  //   let encryptionTimeStart = new Date();
  //   print('Encry')
  //   var entropy ;
  var entropy = "Testing of RSA algorithm in javascript.";
  var crypt = new x.Crypt({ rsaStandard: "RSA-OAEP", entropy: entropy });
  var rsa = new x.RSA({ entropy: entropy, keySize: 4096 });
  //   var message =
  // "Hello, this is the demo of encryption/decryption in javascript!";
  encrypted = crypt.encrypt(publicKey, message);
  //   console.log("encrypted", encrypted);
  //   let encryptionTimeEnd = new Date();
  //   console.log(
  // `Time taken for ecryption:${encryptionTimeEnd - encryptionTimeStart}`
  //   );
  return encrypted;
//   return JSON.parse(encrypted);
}
// setTimeout(() => {
//   Encryption();
// }, 10000);

function Decryption(encrypted) {
  let decryptionTimeStart = new Date();
  var entropy = "Testing of RSA algorithm in javascript.";
  var crypt = new x.Crypt({ rsaStandard: "RSA-OAEP", entropy: entropy });
  var rsa = new x.RSA({ entropy: entropy });
  decrypted = crypt.decrypt(privateKey, encrypted);
  //   console.log("decrypted", decrypted);
  let decryptionTimeEnd = new Date();
  console.log(
    `Time taken for decryption${decryptionTimeEnd - decryptionTimeStart}`
  );
  return decrypted;
}
// setTimeout(() => {
//   Decryption();
// }, 11000);

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
  // Encryption()
  let encryptionTimeStart = new Date();
  //   print('Encry')
  //   var entropy ;
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

//   console.log(name, enc_name);
  var payload = {
    NAME: enc_name,
    DOB: enc_dob,
    "FATHER NAME": enc_fname,
    "MOTHER NAME": enc_mname,
    ADDRESS: {
      LINE1: enc_add_line1,
      PINCODE: enc_add_pin,
    },
    PBIV: {
      FACE: enc_pbiv_face,
      FINGERPRINT: enc_pbiv_fprint,
    },
    "PHONE NUMBER": enc_pnum,
    STATUS: status_,
    APPROVALS: approvals,
  };
  //   console.log()
  return payload;
}
function decryptPayload(payload) {
  return Decryption(payload);
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
//   console.log(test);
//   console.log(test.length);
//   console.log(JSON.stringify(test));
//   console.log(JSON.stringify(test).length);
//   console.log(test.NAME);
//   console.log(typeof(test.NAME))
//   console.log(decryptPayload(test.NAME));
  // console.log(`Encrypted Payload is${JSON.stringify()}`);
}, 10000);

// setTimeout(()=>{
// console.log(`${decryptPayload()}`)
// },20000);
