const Block = require('../src/block');
const DIFFICULTY = 2;
describe("block",()=>{
    let data, lastBlock, block;
    beforeEach(()=>{
        data= 'bar';
        lastBlock = Block.genesis();
        block= Block.mineBlock(lastBlock, data);
    })

    it ('Should have the same data that receive by parameter',()=>{
        expect(block.data).toEqual(data);
    })
    it ('Should save the lastHash',()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    })

    // it ('Should generate the hash that match with the difficulty',()=>{
    //     expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
    // })
})