import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('Fake test', function () {
  describe('Fake subtest', function () {
    it('should put 2 and 2 together', function () {
      (2 + 2).should.equal(4);
    });
  });
});