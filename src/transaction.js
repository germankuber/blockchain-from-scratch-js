const ChainUtil = require('../chain-utils');
const { MINING_REWARD } = require('../config');

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.output = []
    }

    update(senderWallet, recipient, amount) {
        const senderOutput = this.output.find(x => x.address == senderWallet.publicKey);
        console.log(this.output)
        console.log(senderWallet.publicKey)
        if (amount > senderOutput.amount) {
            console.log("Amount exceeds balance");
            return;
        }
        senderOutput.amount = senderOutput.amount - amount;
        this.output.push({ amount, address: recipient });
        Transaction.signTransaction(this, senderWallet);
    }
    static newTransaction(senderWallet, recipient, amount) {
        const transaction = new this();
        if (amount > senderWallet.balance) {
            console.log("Does no have enough money")
        }
        Transaction.transactionWithoutOutputs(senderWallet,
            [
                { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
                { amount, address: recipient }
            ])
        return Transaction.signTransaction(transaction, senderWallet);
    }

        static rewardTransaction(minerWallet, senderWallet){
            return Transaction.transactionWithoutOutputs(senderWallet,[
                {
                    amount:MINING_REWARD,
                    address: minerWallet.publicKey
                }
            ]);
        }
    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.output))
        }
        return transaction;
    }

    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.output)
        )
    }
    static transactionWithoutOutputs(senderWallet, outputs) {
        const transaction = new this();
        transaction.output.push(...outputs);
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }
}
module.exports = Transaction;