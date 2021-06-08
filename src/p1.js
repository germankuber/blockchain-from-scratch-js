const Transaction = require("./transaction");
const Wallet = require("./wallet");

const myWallet = new Wallet();
const recipient = "asdadsasd";
const amount = 20;

console.log(myWallet.toString());
const tx = Transaction.newTransaction(myWallet, recipient, amount);
console.log(tx);