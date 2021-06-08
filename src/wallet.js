const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-utils');
const Transaction = require('./transaction');
class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.getKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet
        publicKey:     ${this.publicKey}
        balance:     ${this.balance}
        `
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool) {
        this.balance = this.calculateBalance(blockchain, this.publicKey);
        if (amount >= this.balance) {
            console.log("You do not have enough amount");
            return;
        }
        let transaction = transactionPool.existingTransaction(this.publicKey);

        
        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        
        }
        return transaction;
    }
    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'Coinbase-00000x';
        return blockchainWallet;
    }

    calculateBalance(blockchain, address) {
        let balance = this.balance;
        let transactions = [];
        if (blockchain.chain.length <= 1) {
            return balance;
        } else {
            const bcCopy = blockchain.chain.slice(1, blockchain.chain.length);

            bcCopy.forEach(block => { block.data.forEach(transaction => transactions.push(transaction)) });
        }

        const walletInput = transactions.filter(transaction => transaction.input.address == address);
        let startTime = 0;
        if (walletInput.length > 0) {
            const recentInputs = walletInput.reduce((prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current);
            balance = recentInputs.outputs.find(o => o.address == address).amount;
            startTime = recentInputs.input.timestamp;
        }
        transactions.forEach(t => {
            if (t.input.timestamp > startTime) {
                t.outputs.find(o => {
                    if (o.address == address)
                        balance = o.amount;
                })
            }
        });
        return balance;
    }
}
module.exports = Wallet;