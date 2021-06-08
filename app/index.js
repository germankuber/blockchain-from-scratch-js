const express = require('express');
const Blockchain = require('../src/blockchain');

const P2pServer = require('./p2pServer');
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const bodyParser = require('body-parser');
const Wallet = require('../src/wallet');
const TransactionsPool = require('../src/transactionsPool');
const Miner = require('./miner');
const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const transactionsPool = new TransactionsPool();
const p2pServer = new P2pServer(bc, transactionsPool);
const miner = new Miner(bc, transactionsPool, wallet, p2pServer);
app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
    res.json(bc.chain);
});

app.get("/transactions", (req, res) => {
    res.json(transactionsPool.transactions);
});


app.get("/transact", (req, res) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc, transactionsPool);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');

});

app.get("/public-key", (req, res) => {
    res.json({ publicKey: wallet.publicKey });
});

app.get("/balance", (req, res) => {
    res.json(wallet.calculateBalance(bc, wallet.publicKey));
});

app.post("/address-balance", (req, res) => {
    res.json(wallet.calculateBalance(bc, req.data.address));
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New Block ${block}`);
    p2pServer.syncChains();
    res.json(bc.chain);
})

app.post('/mine-transaction', (req, res) => {
    const block = miner.miner();
    console.log(`New Block ${block}`);
    res.redirect('/block');
})

app.listen(HTTP_PORT, () => {
    console.log("Started");
});

p2pServer.listen();