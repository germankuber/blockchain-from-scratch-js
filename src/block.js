const ChainUtil = require("../chain-utils");


const DIFFICULTY = 3;
const MINE_RATE = 10000;
class Block {
    timestamp;
    lastHash;
    hash;
    data;
    constructor(timestamp, lastHash, hash, data, nonce, difficulty, processTime) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.processTime = processTime
        
    }

    toString() {

        return `Block - 
        Timestamp ${this.timestamp}
        lastHash ${this.lastHash}
        hash ${this.hash}
        data ${this.data} 
        nonce ${this.nonce}
        difficulty ${this.difficulty}
        processTime ${this.processTime} `;
    }

    static genesis() {
        return new this('Genesis Time', "0".repeat(64), "0".repeat(64), [], 0, DIFFICULTY, 0)
    }

    static mineBlock(lastBlock, data) {

        let hash, timestamp;

        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        let t1 = Date.now();
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, difficulty) != '0'.repeat(difficulty));
        let t2 = Date.now();
        let processTime = t2 - t1;
        return new this(timestamp, lastHash, hash, data, nonce, difficulty, processTime)
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp, lastHash, data, nonce)
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;

        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;

        return difficulty;
    }
}

module.exports = Block;