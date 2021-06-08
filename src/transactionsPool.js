const Transaction = require("./transaction");

class TransactionsPool {
    constructor() {
        this.transactions = [];
    }
    updateOrAddTransaction(transaction) {
        let transactionWithId = this.transactions.find(t => t.id == transaction.id);
        if (transactionWithId) {
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }
    existingTransaction(address) {
        return this.transactions.find(x => x.input.address == address);
    }
    clear(){
        this.transactions = [];
    }
    validTransactions() {
        return this.transactions.filter(t => {
            const outputTotal = t.output.reduce((total, output) => {
                return total + output.amount;
            }, 0);
            if (t.input.amount != outputTotal) {
                console.log("Invalid transaction");
                return;
            }
            if (!Transaction.verifyTransaction(t)) {
                console.log("Invalid signature transaction");
                return;
            }
        })
    }
}
module.exports = TransactionsPool;