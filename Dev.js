// const Blockchain = require('./src/blockchain');

const Transaction = require("./src/transaction");
const TransactionsPool = require("./src/transactionsPool");
const Wallet = require("./src/wallet");


// const bc = new Blockchain();

// for (let index = 0; index < 10; index++) {
//     console.log(bc.addBlock('Information ' + index));
    
// }

// const Wallet = require('./src/wallet');

// const wallet = new Wallet;

// console.log(wallet.toString());




// const myWallet = new Wallet();
// const recipient = "asdadsasd";
// const amount = 20;

// console.log(myWallet.toString());
// const tx = Transaction.newTransaction(myWallet, recipient, amount);
// console.log(tx);

// const w1 = new Wallet();
// const w2 = new Wallet();
// const amount = 10;

// const tx = Transaction.newTransaction(w1, w1.publicKey, amount);

// tx.update(w1, w1.publicKey, 20);
// tx.update(w1, w1.publicKey, 30);

// console.log(tx);
// console.log(Transaction.verifyTransaction(tx));

// const myWallet = new Wallet();
// const transactionsPool = new TransactionsPool();
// const tx = Transaction.newTransaction(myWallet, 'asdasdasd', 30);
// transactionsPool.updateOrAddTransaction(tx);
// console.log(transactionsPool.transactions);
// const newTx = Transaction.newTransaction(myWallet, 'asdasdasd', 50);
// transactionsPool.updateOrAddTransaction(tx);
// console.log(transactionsPool.transactions);


// const myWallet = new Wallet();
// const myWallet2 = new Wallet();
// const myWallet3 = new Wallet();
// const transactionsPool = new TransactionsPool();
// const tx = myWallet.createTransaction( 'asdasdasd', 30,transactionsPool);
// const tx1 = myWallet2.createTransaction( 'asdasdaasda2ssd', 40,transactionsPool);
// const tx2 = myWallet3.createTransaction( 'asdaskj213hi12jkh3kj1dasd', 50,transactionsPool);

// tx1.input.amount = 10020;

// console.log(tx);
// console.log(tx1);
// console.log(tx2);
// console.log(transactionsPool.validTransactions());


const myWallet = new Wallet();
const tx = Transaction.rewardTransaction(myWallet, Wallet.blockchainWallet());

console.log(tx);