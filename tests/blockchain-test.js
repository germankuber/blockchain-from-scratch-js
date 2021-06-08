const Blockchain = require('../src/blockchain');
const Block = require('../src/block');

describe("blockchain", () => {
    let bc;
    let bc2;
    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it('Start with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    })
    it('Should adds new block', () => {
        const data = "data test";
        bc.addBlock(data);
        console.log(bc.chain[bc.chain.length - 1])
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    })

    it('Should a valid chain', () => {
        bc2.addBlock('foo');
        expect(bc2.isValidChain(bc2.chain)).toBe(true);
    })

    it('Should validate a chain with the genesis block', () => {
        bc2.chain[0].data = "data To Test";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })

    it('Should invalid a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = "other data";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    })

    it('Should replace chain with a new chain', () => {
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toBe(bc2.chain);
    })

    it('Should not replace', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toBe(bc2.chain);
    })
})