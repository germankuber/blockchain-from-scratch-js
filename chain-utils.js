const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');

const { v4: uuidv4 } = require('uuid');

class ChainUtil{

    static getKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidv4();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey,'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;